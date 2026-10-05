import type { Metadata } from "next";
import { cookies } from "next/headers";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminSignOut } from "@/components/admin/AdminSignOut";
import {
  adminCookieName,
  isAdminConfigured,
  verifyAdminSession,
} from "@/lib/admin-auth";
import { getDb } from "@/lib/db";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  project_type: string;
  message: string;
  created_at: Date | string;
};

type PaymentRecord = {
  order_id: string;
  payment_id: string | null;
  amount_paise: number | string;
  currency: string;
  reason: string;
  status: "created" | "authorized" | "captured" | "failed";
  created_at: Date | string;
  updated_at: Date | string;
};

function formatDate(value: Date | string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

export default async function AdminPage() {
  if (!isAdminConfigured()) {
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16">
        <h1 className="text-3xl font-bold">Admin login isn’t configured</h1>
        <p className="mt-4 leading-7 text-muted-foreground">
          Set the admin username, password, and session secret in your server
          environment before signing in.
        </p>
      </main>
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(adminCookieName)?.value;

  if (!verifyAdminSession(token)) {
    return <AdminLogin />;
  }

  let inquiries: Inquiry[];
  let payments: PaymentRecord[];
  try {
    const sql = getDb();
    [inquiries, payments] = await Promise.all([
      sql`
        SELECT id, name, email, project_type, message, created_at
        FROM contact_inquiries
        ORDER BY created_at DESC
        LIMIT 100
      `,
      sql`
        SELECT
          order_id, payment_id, amount_paise, currency, reason, status,
          created_at, updated_at
        FROM payment_records
        ORDER BY created_at DESC
        LIMIT 100
      `,
    ]) as [Inquiry[], PaymentRecord[]];
  } catch (error) {
    console.error("admin dashboard database query failed:", error);
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-3xl font-bold">Admin dashboard unavailable</h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              We couldn’t load the records. Check the Neon connection and
              confirm that the database schema has been applied.
            </p>
          </div>
          <AdminSignOut />
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-7xl px-5 py-12 md:py-16">
      <header className="flex flex-col justify-between gap-5 border-b border-border/60 pb-8 sm:flex-row sm:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            Private admin
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Inquiries &amp; payments
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Showing the latest 100 records in each section.
          </p>
        </div>
        <AdminSignOut />
      </header>

      <section className="mt-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold">Contact inquiries</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {inquiries.length} recent{" "}
              {inquiries.length === 1 ? "inquiry" : "inquiries"}
            </p>
          </div>
        </div>

        {inquiries.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-border/60 bg-card p-6 text-muted-foreground">
            No inquiries have been submitted yet.
          </p>
        ) : (
          <div className="mt-5 space-y-4">
            {inquiries.map((inquiry) => (
              <article
                key={inquiry.id}
                className="rounded-2xl border border-border/60 bg-card p-5 shadow-sm sm:p-6"
              >
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                  <div>
                    <h3 className="text-lg font-bold">{inquiry.name}</h3>
                    <a
                      href={`mailto:${inquiry.email}`}
                      className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      {inquiry.email}
                    </a>
                  </div>
                  <time
                    dateTime={new Date(inquiry.created_at).toISOString()}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(inquiry.created_at)} IST
                  </time>
                </div>
                <p className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {inquiry.project_type}
                </p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/80">
                  {inquiry.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="mt-14">
        <h2 className="text-2xl font-bold">Payment records</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {payments.length} recent{" "}
          {payments.length === 1 ? "payment" : "payments"}
        </p>

        {payments.length === 0 ? (
          <p className="mt-5 rounded-2xl border border-border/60 bg-card p-6 text-muted-foreground">
            No payment orders have been created yet.
          </p>
        ) : (
          <div className="mt-5 overflow-x-auto rounded-2xl border border-border/60 bg-card">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 font-semibold">Amount</th>
                  <th className="px-5 py-4 font-semibold">Reason</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Order / Payment ID</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {payments.map((payment) => (
                  <tr key={payment.order_id} className="align-top">
                    <td className="whitespace-nowrap px-5 py-4 text-muted-foreground">
                      {formatDate(payment.created_at)} IST
                    </td>
                    <td className="whitespace-nowrap px-5 py-4 font-semibold">
                      {payment.currency}{" "}
                      {(Number(payment.amount_paise) / 100).toFixed(2)}
                    </td>
                    <td className="max-w-xs px-5 py-4">{payment.reason}</td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold capitalize text-primary">
                        {payment.status}
                      </span>
                    </td>
                    <td className="space-y-1 px-5 py-4 font-mono text-xs">
                      <p className="break-all">{payment.order_id}</p>
                      {payment.payment_id && (
                        <p className="break-all text-muted-foreground">
                          {payment.payment_id}
                        </p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
