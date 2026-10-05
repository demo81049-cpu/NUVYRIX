import { NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/mail";
import { saveContact } from "@/lib/storage";

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

    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    const saved = await saveContact({ name, email, type, message });

    let emailSent = false;
    try {
      await sendContactNotification({ name, email, type, message });
      emailSent = true;
    } catch (mailError) {
      console.error("contact email failed:", mailError);
      return NextResponse.json(
        {
          success: false,
          error:
            "Your message was saved, but email delivery failed. Please try WhatsApp or call us.",
          saved_id: saved.id,
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      saved_id: saved.id,
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
