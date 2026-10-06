import nodemailer from "nodemailer";

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

function getNotifyEmail() {
  return process.env.NOTIFY_EMAIL || "rishibakshi1234@gmail.com";
}

function getFrom() {
  return (
    process.env.SMTP_FROM ||
    `NUVYRIX TECHNOLOGIES <${process.env.SMTP_USER || "noreply@cirkle.market"}>`
  );
}

export async function sendMail(options: {
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}) {
  const transporter = getTransporter();
  const info = await transporter.sendMail({
    from: getFrom(),
    to: getNotifyEmail(),
    replyTo: options.replyTo,
    subject: options.subject,
    text: options.text,
    html: options.html,
  });
  return info;
}

export async function sendContactNotification(data: {
  name: string;
  email: string;
  type: string;
  message: string;
}) {
  const subject = `New inquiry · ${data.type} · ${data.name}`;
  const text = [
    "New contact form submission on NUVYRIX.",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Project type: ${data.type}`,
    "",
    data.message,
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;line-height:1.5;color:#0f172a">
      <h2 style="margin:0 0 12px">New project inquiry</h2>
      <table style="border-collapse:collapse;width:100%;max-width:560px">
        <tr><td style="padding:8px 0;color:#64748b">Name</td><td style="padding:8px 0;font-weight:700">${escapeHtml(data.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Email</td><td style="padding:8px 0">${escapeHtml(data.email)}</td></tr>
        <tr><td style="padding:8px 0;color:#64748b">Project type</td><td style="padding:8px 0">${escapeHtml(data.type)}</td></tr>
      </table>
      <p style="margin:16px 0 0;white-space:pre-wrap">${escapeHtml(data.message)}</p>
    </div>
  `;

  return sendMail({
    subject,
    text,
    html,
    replyTo: data.email,
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
