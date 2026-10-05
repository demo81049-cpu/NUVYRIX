import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { MongoServerError } from "mongodb";
import { getDb } from "@/lib/db";

type RazorpayWebhook = {
  event?: string;
  payload?: {
    payment?: {
      entity?: {
        id?: string;
        order_id?: string;
      };
    };
    order?: {
      entity?: {
        id?: string;
      };
    };
  };
};

const paymentEventStatuses: Record<string, "authorized" | "captured" | "failed"> =
  {
    "payment.authorized": "authorized",
    "payment.captured": "captured",
    "payment.failed": "failed",
    "order.paid": "captured",
  };

type PaymentDocument = {
  orderId: string;
  paymentId?: string;
  status: "created" | "authorized" | "captured" | "failed";
  updatedAt: Date;
};

export async function POST(request: Request) {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Payment webhook is not configured." },
        { status: 503 },
      );
    }

    const signature = request.headers.get("x-razorpay-signature");
    const eventId = request.headers.get("x-razorpay-event-id");
    const rawBody = await request.text();

    if (
      !signature ||
      !/^[a-f\d]{64}$/i.test(signature) ||
      !eventId ||
      eventId.length > 255
    ) {
      return NextResponse.json(
        { error: "Invalid webhook headers." },
        { status: 400 },
      );
    }

    const expected = createHmac("sha256", secret).update(rawBody).digest();
    const received = Buffer.from(signature, "hex");
    if (!timingSafeEqual(expected, received)) {
      return NextResponse.json(
        { error: "Invalid webhook signature." },
        { status: 400 },
      );
    }

    const event = JSON.parse(rawBody) as RazorpayWebhook;
    const status = event.event ? paymentEventStatuses[event.event] : undefined;
    if (!event.event || !status) {
      return NextResponse.json({ received: true, ignored: true });
    }

    const orderId =
      event.payload?.payment?.entity?.order_id ??
      event.payload?.order?.entity?.id;
    if (!orderId) {
      return NextResponse.json(
        { error: "Webhook event does not include an order ID." },
        { status: 400 },
      );
    }

    const paymentId = event.payload?.payment?.entity?.id ?? null;
    const db = await getDb();
    const payments = db.collection<PaymentDocument>("payment_records");
    const paymentRecord = await payments.findOne({ orderId });
    if (!paymentRecord) {
      return NextResponse.json(
        { error: "Payment order was not found." },
        { status: 404 },
      );
    }

    try {
      await db
        .collection<{
          _id: string;
          eventType: string;
          receivedAt: Date;
        }>("payment_webhook_events")
        .insertOne({
            _id: eventId,
            eventType: event.event,
            receivedAt: new Date(),
          });
    } catch (error) {
      if (error instanceof MongoServerError && error.code === 11000) {
        return NextResponse.json({ received: true, duplicate: true });
      }
      throw error;
    }

    try {
      const eligibleStatuses: PaymentDocument["status"][] =
        status === "captured"
          ? ["created", "authorized", "failed", "captured"]
          : status === "failed"
            ? ["created", "authorized", "failed"]
            : ["created", "authorized"];

      await payments.updateOne(
        { orderId, status: { $in: eligibleStatuses } },
        {
          $set: {
            status,
            updatedAt: new Date(),
            ...(paymentId ? { paymentId } : {}),
          },
        },
      );
    } catch (error) {
      await db
        .collection<{ _id: string }>("payment_webhook_events")
        .deleteOne({ _id: eventId });
      throw error;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Could not process Razorpay webhook." },
      { status: 500 },
    );
  }
}
