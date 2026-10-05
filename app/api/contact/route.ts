import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { sendContactNotification } from "@/lib/mail";

type ContactBody = {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const type = String(body.type || "").trim();
    const message = String(body.message || "").trim();

    if (
      !name ||
      !email ||
      !type ||
      !message ||
      name.length > 120 ||
      email.length > 254 ||
      type.length > 100 ||
      message.length > 5000 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
      return NextResponse.json(
        {
          success: false,
          error: "Enter a valid email and complete each field within its limit.",
        },
        { status: 400 },
      );
    }

    try {
      const db = await getDb();
      await db.collection("contact_inquiries").insertOne({
        name,
        email,
        projectType: type,
        message,
        createdAt: new Date(),
      });
    } catch (databaseError) {
      console.error("contact database insert failed:", databaseError);
      return NextResponse.json(
        {
          success: false,
          error: "We couldn’t save your message. Please try again shortly.",
        },
        { status: 503 },
      );
    }

    let emailSent = false;
    try {
      await sendContactNotification({ name, email, type, message });
      emailSent = true;
    } catch (mailError) {
      console.error("contact email failed:", mailError);
    }

    return NextResponse.json({
      success: true,
      email_sent: emailSent,
    });
  } catch (error) {
    console.error("contact submit error:", error);
    return NextResponse.json(
      { success: false, error: "Could not submit your message." },
      { status: 500 },
    );
  }
}
