import nodemailer from "nodemailer";
import { siteConfig } from "@/lib/site";

type MailOptions = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

type Row = [label: string, value: string];

function getTransporter() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const port = Number(process.env.SMTP_PORT || 465);
  const secure = String(process.env.SMTP_SECURE || "true") === "true";

  if (!host || !user || !pass) {
    throw new Error("SMTP is not configured");
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
  });
}

/** Where owner notifications go. */
export function getNotifyEmail() {
  return process.env.NOTIFY_EMAIL || "rishibakshi1234@gmail.com";
}

function getFrom() {
  return (
    process.env.SMTP_FROM ||
    `NUVYRIX TECHNOLOGIES <${process.env.SMTP_USER || "noreply@cirkle.market"}>`
  );
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export async function sendMail(options: MailOptions) {
  return getTransporter().sendMail({
    from: getFrom(),
    to: options.to,
    replyTo: options.replyTo,
    subject: oneLine(options.subject),
    text: options.text,
    html: options.html,
  });
}

function layout(options: {
  heading: string;
  intro?: string;
  rows?: Row[];
  body?: string;
  footer?: string;
}) {
  const rows = (options.rows ?? [])
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;color:#64748b;vertical-align:top">${escapeHtml(k)}</td><td style="padding:8px 0;font-weight:700">${escapeHtml(v)}</td></tr>`,
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;line-height:1.55;color:#0f172a;max-width:600px;margin:0 auto;border:1px solid #e2e8f0;border-radius:16px;overflow:hidden">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#05070d">
        <tr>
          <td style="padding:20px 24px">
            <a href="${siteConfig.url}" style="text-decoration:none">
              <img src="${siteConfig.url}/logo.png" width="56" height="56" alt="NUVYRIX" style="display:inline-block;vertical-align:middle;border-radius:50%;border:0" />
              <span style="display:inline-block;vertical-align:middle;margin-left:12px">
                <span style="display:block;font-family:Georgia,serif;font-size:20px;font-weight:700;letter-spacing:1px;color:#ffffff">NUVYRIX</span>
                <span style="display:block;font-size:10px;letter-spacing:3px;color:#94a3b8">TECHNOLOGIES</span>
              </span>
            </a>
          </td>
        </tr>
      </table>
      <div style="height:4px;background:#2563eb;background-image:linear-gradient(90deg,#38bdf8,#2563eb,#7c3aed)"></div>
      <div style="padding:8px 24px 28px">
      <h2 style="margin:20px 0 8px">${escapeHtml(options.heading)}</h2>
      ${options.intro ? `<p style="margin:0 0 16px;color:#334155">${escapeHtml(options.intro)}</p>` : ""}
      ${rows ? `<table style="border-collapse:collapse;width:100%">${rows}</table>` : ""}
      ${options.body ? `<p style="margin:16px 0 0;white-space:pre-wrap;padding:14px 16px;background:#f1f5f9;border-radius:12px">${escapeHtml(options.body)}</p>` : ""}
      ${options.footer ? `<p style="margin:24px 0 0;color:#64748b;font-size:13px">${escapeHtml(options.footer)}</p>` : ""}
      </div>
      <div style="padding:14px 24px;background:#f8fafc;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
        ${escapeHtml(siteConfig.fullName)} · <a href="${siteConfig.url}" style="color:#2563eb;text-decoration:none">${siteConfig.url.replace("https://", "")}</a>
      </div>
    </div>
  `;
}

function plain(lines: (string | Row)[]) {
  return lines
    .map((l) => (typeof l === "string" ? l : `${l[0]}: ${l[1]}`))
    .join("\n");
}

const SIGN_OFF = "— NUVYRIX Technologies";

export async function sendContactEmails(data: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  const rows: Row[] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Project type", data.type],
  ];

  // Owner notification — the only copy of this inquiry, so failures must surface.
  await sendMail({
    to: getNotifyEmail(),
    replyTo: data.email,
    subject: `New inquiry · ${data.type} · ${data.name}`,
    text: plain([
      "New contact form submission on NUVYRIX.",
      "",
      ...rows,
      "",
      data.message,
    ]),
    html: layout({
      heading: "New project inquiry",
      rows,
      body: data.message,
    }),
  });

  // Confirmation to the sender — best effort.
  let confirmationSent = true;
  try {
    await sendMail({
      to: data.email,
      replyTo: getNotifyEmail(),
      subject: "We received your message · NUVYRIX",
      text: plain([
        `Hi ${data.name},`,
        "",
        "Thanks for reaching out. We've received your message and will reply within 1–2 business days.",
        "",
        "Your message:",
        data.message,
        "",
        SIGN_OFF,
      ]),
      html: layout({
        heading: `Thanks, ${data.name}!`,
        intro:
          "We've received your message and will reply within 1–2 business days.",
        rows: [["Project type", data.type]],
        body: data.message,
        footer: SIGN_OFF,
      }),
    });
  } catch (error) {
    confirmationSent = false;
    console.error("contact confirmation email failed:", error);
  }

  return { confirmationSent };
}

export type PaymentEmailData = {
  orderId: string;
  paymentId: string;
  amount: number; // paise
  currency: string;
  method?: string;
  payerName?: string;
  payerEmail?: string;
  payerPhone?: string;
  reason?: string;
};

export async function sendPaymentEmails(data: PaymentEmailData) {
  const amount = `${data.currency} ${(data.amount / 100).toLocaleString(
    "en-IN",
    { minimumFractionDigits: 2, maximumFractionDigits: 2 },
  )}`;

  const rows: Row[] = [["Amount", amount]];
  if (data.reason) rows.push(["For", data.reason]);
  if (data.payerName) rows.push(["Name", data.payerName]);
  if (data.payerEmail) rows.push(["Email", data.payerEmail]);
  if (data.payerPhone) rows.push(["Phone", data.payerPhone]);
  if (data.method) rows.push(["Method", data.method]);
  rows.push(["Payment ID", data.paymentId], ["Order ID", data.orderId]);

  const owner = sendMail({
    to: getNotifyEmail(),
    replyTo: data.payerEmail,
    subject: `Payment received · ${amount}${data.payerName ? ` · ${data.payerName}` : ""}`,
    text: plain(["Payment received on NUVYRIX.", "", ...rows]),
    html: layout({ heading: "Payment received", rows }),
  });

  const payer = data.payerEmail
    ? sendMail({
        to: data.payerEmail,
        replyTo: getNotifyEmail(),
        subject: `Payment receipt · ${amount} · NUVYRIX`,
        text: plain([
          `Hi ${data.payerName || "there"},`,
          "",
          "Thank you — your payment was successful. Keep this email as your receipt.",
          "",
          ...rows.filter(([k]) => k !== "Email" && k !== "Phone"),
          "",
          `Questions? Just reply to this email.`,
          SIGN_OFF,
        ]),
        html: layout({
          heading: "Payment successful",
          intro: `Thank you${data.payerName ? `, ${data.payerName}` : ""}! Keep this email as your receipt.`,
          rows: rows.filter(([k]) => k !== "Email" && k !== "Phone"),
          footer: `Questions? Just reply to this email. ${SIGN_OFF}`,
        }),
      })
    : Promise.resolve(null);

  const [ownerResult, payerResult] = await Promise.allSettled([owner, payer]);
  if (ownerResult.status === "rejected") {
    console.error("payment owner email failed:", ownerResult.reason);
  }
  if (payerResult.status === "rejected") {
    console.error("payment receipt email failed:", payerResult.reason);
  }
  return {
    ownerSent: ownerResult.status === "fulfilled",
    receiptSent: payerResult.status === "fulfilled" && payerResult.value !== null,
  };
}
