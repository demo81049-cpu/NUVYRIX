import { NextResponse } from "next/server";
import { getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay";

type CreateOrderBody = {
  amount?: number;
  currency?: string;
  name?: string;
  email?: string;
  phone?: string;
  reason?: string;
};

const clean = (value: unknown, max: number) =>
  String(value ?? "")
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, max);

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderBody;
    const amountPaise = Math.round(Number(body.amount));
    const currency = (body.currency || "INR").toUpperCase();

    if (!Number.isSafeInteger(amountPaise) || amountPaise < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1)." },
        { status: 400 },
      );
    }

    if (currency !== "INR") {
      return NextResponse.json(
        { error: "Only INR payments are supported." },
        { status: 400 },
      );
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: "Payment gateway is not configured." },
        { status: 503 },
      );
    }

    const razorpay = getRazorpayClient();
    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency,
      // Payer details ride on the Razorpay order (not our own storage) so the
      // verified-payment emails can include them.
      notes: {
        name: clean(body.name, 120),
        email: clean(body.email, 254),
        phone: clean(body.phone, 30),
        reason: clean(body.reason, 250),
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: getRazorpayKeyId(),
    });
  } catch (error) {
    console.error("create-order error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
