import { NextResponse } from "next/server";
import { sendContactEmails } from "@/lib/mail";

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

    // Nothing is stored: the email to the team is the record of the inquiry.
    try {
      const { confirmationSent } = await sendContactEmails({
        name,
        email,
        type,
        message,
      });
      return NextResponse.json({ success: true, confirmation_sent: confirmationSent });
    } catch (mailError) {
      const notConfigured =
        mailError instanceof Error && mailError.message === "SMTP is not configured";
      console.error(
        notConfigured
          ? "contact email failed: SMTP_HOST / SMTP_USER / SMTP_PASS are not set on this deployment"
          : "contact email failed:",
        notConfigured ? "" : mailError,
      );
      return NextResponse.json(
        {
          success: false,
          code: notConfigured ? "smtp_not_configured" : "smtp_failed",
          error:
            "We couldn't send your message right now. Please email us directly and we'll reply soon.",
        },
        { status: 503 },
      );
    }
  } catch (error) {
    console.error("contact submit error:", error);
    return NextResponse.json(
      { success: false, error: "Could not submit your message." },
      { status: 500 },
    );
  }
}
