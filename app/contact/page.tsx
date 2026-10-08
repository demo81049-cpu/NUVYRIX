import { Mail, MessageSquare, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/layout/Section";
import { siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact NUVYRIX TECHNOLOGIES about website development, mobile apps, or product design for your business in Kolkata or West Bengal.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Tell us what"
        highlight="you’re building"
        description="Share a few details and we’ll reply with next steps. Prefer email, call, or WhatsApp? Reach us anytime."
      />

      <Section width="6xl" className="pt-4 md:pt-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal-left>
            <h2 className="text-3xl">Let’s talk</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Websites, mobile apps, redesigns, or ongoing support—if it helps
              you build, launch, and grow, we’re interested.
            </p>

            <div data-stagger className="mt-10 space-y-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.1)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <Mail size={22} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-muted-foreground">
                    Email
                  </span>
                  <span className="font-bold text-foreground">
                    {siteConfig.email}
                  </span>
                </span>
              </a>

              <a
                href={siteConfig.phoneHref}
                className="group flex items-center gap-4 rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.1)] transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary/10 text-secondary transition-colors group-hover:bg-secondary group-hover:text-white">
                  <Phone size={22} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-muted-foreground">
                    Phone / WhatsApp
                  </span>
                  <span className="font-bold text-foreground">
                    {siteConfig.phoneDisplay}
                  </span>
                </span>
              </a>

              <div className="flex items-center gap-4 rounded-[1.5rem] border border-border/50 bg-card p-5 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.1)]">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <MessageSquare size={22} />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-muted-foreground">
                    Typical reply
                  </span>
                  <span className="font-bold text-foreground">
                    Within 1–2 business days
                  </span>
                </span>
              </div>

              <Button href={siteConfig.whatsappHref} variant="secondary" size="lg" className="w-full sm:w-auto">
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          <div data-reveal-right>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
