import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
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

    if (!reason || reason.length > 255) {
      return NextResponse.json(
        { error: "Payment reason is required and must be under 256 characters." },
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

    try {
      const sql = getDb();
      await sql`
        INSERT INTO payment_records (
          order_id, amount_paise, currency, reason, status
        )
        VALUES (
          ${order.id}, ${order.amount}, ${order.currency}, ${reason}, 'created'
        )
      `;
    } catch (databaseError) {
      console.error("payment order database insert failed:", databaseError);
      return NextResponse.json(
        {
          error:
            "We couldn’t save this payment order. Please try again shortly.",
        },
        { status: 503 },
      );
    }

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
