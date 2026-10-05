import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
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
    if (!status) {
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
    const sql = getDb();
    const [paymentRecord] = await sql`
      SELECT order_id FROM payment_records WHERE order_id = ${orderId}
    `;
    if (!paymentRecord) {
      return NextResponse.json(
        { error: "Payment order was not found." },
        { status: 404 },
      );
    }

    await sql`
      WITH new_event AS (
        INSERT INTO payment_webhook_events (event_id, event_type)
        VALUES (${eventId}, ${event.event})
        ON CONFLICT (event_id) DO NOTHING
        RETURNING event_id
      )
      UPDATE payment_records
      SET
        payment_id = COALESCE(${paymentId}, payment_id),
        status = CASE
          WHEN status = 'captured' AND ${status} <> 'captured' THEN status
          ELSE ${status}
        END,
        updated_at = NOW()
      WHERE order_id = ${orderId}
        AND EXISTS (SELECT 1 FROM new_event)
      RETURNING order_id
    `;

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("razorpay webhook error:", error);
    return NextResponse.json(
      { error: "Could not process Razorpay webhook." },
      { status: 500 },
    );
  }
}
