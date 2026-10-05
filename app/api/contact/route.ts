import { NextResponse } from "next/server";
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

    if (!name || !email || !type || !message) {
      return NextResponse.json(
        { success: false, error: "Please fill in all required fields." },
        { status: 400 },
      );
    }

    try {
      await sendContactNotification({ name, email, type, message });
    } catch (mailError) {
      console.error("contact email failed:", mailError);
      return NextResponse.json(
        {
          success: false,
          error:
            "We couldn’t email your message. Please contact us by WhatsApp or phone.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      success: true,
      email_sent: true,
    });
  } catch (error) {
    console.error("contact submit error:", error);
    return NextResponse.json(
      { success: false, error: "Could not submit your message." },
      { status: 500 },
    );
  }
}
