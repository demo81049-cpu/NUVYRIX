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
import type { ObjectId } from "mongodb";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

type Inquiry = {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  createdAt: Date;
};

type InquiryDocument = Omit<Inquiry, "id"> & { _id: ObjectId };

function formatDate(value: Date) {
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
  try {
    const db = await getDb();
    const inquiryDocuments = await db
      .collection<InquiryDocument>("contact_inquiries")
      .find()
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray();
    inquiries = inquiryDocuments.map(({ _id, ...inquiry }) => ({
      ...inquiry,
      id: _id.toString(),
    }));
  } catch (error) {
    console.error("admin dashboard database query failed:", error);
    return (
      <main className="mx-auto min-h-[70vh] max-w-4xl px-5 py-16">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-3xl font-bold">Admin dashboard unavailable</h1>
            <p className="mt-4 leading-7 text-muted-foreground">
              We couldn’t load the records. Check the MongoDB connection and
              database user permissions.
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
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">Inquiries</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Showing the latest 100 contact inquiries.
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
                    dateTime={inquiry.createdAt.toISOString()}
                    className="text-xs text-muted-foreground"
                  >
                    {formatDate(inquiry.createdAt)} IST
                  </time>
                </div>
                <p className="mt-4 inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {inquiry.projectType}
                </p>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-6 text-foreground/80">
                  {inquiry.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </section>

    </main>
  );
}
