import { NextResponse } from "next/server";
import { getRazorpayClient, getRazorpayKeyId } from "@/lib/razorpay";

type CreateOrderBody = {
  amount?: number;
  currency?: string;
  reason?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreateOrderBody;
    const amountPaise = Math.round(Number(body.amount));
    const currency = (body.currency || "INR").toUpperCase();
    const reason = String(body.reason || "").trim();

    if (!Number.isSafeInteger(amountPaise) || amountPaise < 100) {
      return NextResponse.json(
        { error: "Amount must be at least 100 paise (₹1)." },
        { status: 400 },
      );
    }

    if (!reason) {
      return NextResponse.json(
        { error: "Payment reason is required." },
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
    const receipt = `nvx_${Date.now()}`;

    const order = await razorpay.orders.create({
      amount: amountPaise,
      currency,
      receipt,
      notes: {
        reason,
        payer_name: body.name?.trim() || "",
        payer_email: body.email?.trim() || "",
        payer_phone: body.phone?.trim() || "",
      },
    });

    return NextResponse.json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      reason,
      key_id: getRazorpayKeyId(),
    });
  } catch (error) {
    console.error("create-order error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to create order";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
