import { PageHero } from "@/components/shared/PageHero";
import { PaymentForm } from "@/components/shared/PaymentForm";
import { Blob } from "@/components/ui/Blob";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Pay",
  description: `Make a secure payment to ${siteConfig.fullName} via Razorpay.`,
  path: "/payment",
  noIndex: true,
});

export default function PaymentPage() {
  return (
    <>
      <PageHero
        eyebrow="Payments"
        title="Pay securely"
        description="Enter the amount and a short reason for payment. You’ll complete checkout in Razorpay’s secure modal."
      />

      <Section width="6xl" className="relative pt-4 md:pt-8">
        <Blob
          shapeIndex={1}
          className="right-0 top-10 h-64 w-64 opacity-40"
          tone="violet"
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal-left>
            <h2 className="text-3xl">How it works</h2>
            <ol data-stagger className="mt-6 space-y-4 text-muted-foreground">
              <li className="rounded-[1.5rem] rounded-tr-[2.5rem] border border-border/50 bg-card/90 p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.08)] backdrop-blur">
                <span className="font-bold text-primary">1.</span> Enter amount
                in INR and why you’re paying.
              </li>
              <li className="rounded-[1.5rem] rounded-bl-[2.5rem] border border-border/50 bg-card/90 p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.08)] backdrop-blur">
                <span className="font-bold text-primary">2.</span> We create a
                Razorpay order on the server (secret never leaves the backend).
              </li>
              <li className="rounded-[1.5rem] rounded-br-[2.5rem] border border-border/50 bg-card/90 p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.08)] backdrop-blur">
                <span className="font-bold text-primary">3.</span> Pay in the
                checkout modal — we verify the payment and email the team.
              </li>
            </ol>
            <p className="mt-8 text-sm text-muted-foreground">
              Questions? Email{" "}
              <a
                href={`mailto:${siteConfig.email}`}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {siteConfig.email}
              </a>{" "}
              or call{" "}
              <a
                href={siteConfig.phoneHref}
                className="font-semibold text-primary underline-offset-2 hover:underline"
              >
                {siteConfig.phoneDisplay}
              </a>
              .
            </p>
          </div>

          <div data-reveal-right>
            <PaymentForm />
          </div>
        </div>
      </Section>
    </>
  );
}
