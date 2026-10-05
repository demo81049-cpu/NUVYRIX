import { createHmac, timingSafeEqual } from "crypto";
import { NextResponse } from "next/server";
import { sendPaymentNotification } from "@/lib/mail";
import { getRazorpayClient } from "@/lib/razorpay";

type VerifyBody = {
  razorpay_order_id?: string;
  razorpay_payment_id?: string;
  razorpay_signature?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as VerifyBody;
    const orderId = body.razorpay_order_id;
    const paymentId = body.razorpay_payment_id;
    const signature = body.razorpay_signature;

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, error: "Missing payment verification fields." },
        { status: 400 },
      );
    }

    if (!/^[a-f\d]{64}$/i.test(signature)) {
      return NextResponse.json(
        { success: false, error: "Invalid payment signature." },
        { status: 400 },
      );
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json(
        { success: false, error: "Payment gateway is not configured." },
        { status: 503 },
      );
    }

    const expected = createHmac("sha256", secret)
      .update(`${orderId}|${paymentId}`)
      .digest();
    const received = Buffer.from(signature, "hex");

    if (!timingSafeEqual(expected, received)) {
      return NextResponse.json(
        { success: false, error: "Payment signature mismatch." },
        { status: 400 },
      );
    }

    const razorpay = getRazorpayClient();
    const [order, payment] = await Promise.all([
      razorpay.orders.fetch(orderId),
      razorpay.payments.fetch(paymentId),
    ]);

    if (payment.order_id !== order.id || payment.order_id !== orderId) {
      return NextResponse.json(
        { success: false, error: "Payment does not belong to this order." },
        { status: 400 },
      );
    }

    if (!payment.captured || payment.status !== "captured") {
      return NextResponse.json(
        { success: false, error: "Razorpay has not captured this payment." },
        { status: 400 },
      );
    }

    if (
      Number(payment.amount) !== Number(order.amount) ||
      payment.currency !== order.currency
    ) {
      return NextResponse.json(
        { success: false, error: "Payment amount or currency does not match." },
        { status: 400 },
      );
    }

    const amountPaise = Number(payment.amount);
    const currency = payment.currency;
    const reason = String(order.notes?.reason || "Payment").trim();
    const name = String(order.notes?.payer_name || "").trim();
    const email = String(order.notes?.payer_email || "").trim();
    const phone = String(order.notes?.payer_phone || "").trim();
    const amountInr = (amountPaise / 100).toFixed(2);

    let emailSent = false;
    try {
      await sendPaymentNotification({
        amountInr,
        currency,
        reason: reason || "Payment",
        orderId,
        paymentId,
        name,
        email,
        phone,
      });
      emailSent = true;
    } catch (mailError) {
      console.error("payment email failed:", mailError);
    }

    return NextResponse.json({
      success: true,
      order_id: orderId,
      payment_id: paymentId,
      email_sent: emailSent,
    });
  } catch (error) {
    console.error("verify-payment error:", error);
    return NextResponse.json(
      { success: false, error: "Payment verification failed." },
      { status: 500 },
    );
  }
}
