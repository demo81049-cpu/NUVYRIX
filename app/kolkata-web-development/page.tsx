import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { services, siteConfig } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

const description =
  "Web development, mobile app development, and product design for Kolkata businesses. NUVYRIX works with teams across West Bengal and India.";

export const metadata: Metadata = createPageMetadata({
  title: "Web Development in Kolkata",
  description,
  path: "/kolkata-web-development",
});

const localServiceData = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Web and app development for Kolkata businesses",
  serviceType: [
    "Website development",
    "Web application development",
    "Mobile app development",
    "UI/UX design",
  ],
  description,
  areaServed: [
    {
      "@type": "City",
      name: "Kolkata",
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: "West Bengal",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "West Bengal",
    },
  ],
  provider: {
    "@type": "Organization",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.fullName,
    url: siteConfig.url,
  },
};

const projectFit = [
  "A new business website or landing page",
  "A custom web application or MVP",
  "An iOS and Android app",
  "A product redesign or UX improvement",
  "Ongoing development after launch",
];

export default function KolkataWebDevelopmentPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localServiceData).replace(/</g, "\\u003c"),
        }}
      />

      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-sky-50 via-white to-[#f7f9fc] py-20 md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-sky-300/30 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-8 -z-10 h-80 w-80 rounded-full bg-violet-300/25 blur-[110px]"
        />
        <Container width="5xl" className="relative text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Kolkata · West Bengal · India
          </p>
          <h1 className="mt-6 text-4xl leading-tight sm:text-5xl md:text-6xl">
            Web &amp; app development{" "}
            <span className="brand-gradient-text">for Kolkata</span>
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            NUVYRIX is a freelance digital product studio helping businesses
            turn ideas into thoughtful websites, web apps, and mobile
            experiences. We work with teams in Kolkata, across West Bengal, and
            throughout India.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Discuss your project
              <ArrowRight size={19} />
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View live projects
            </Button>
          </div>
        </Container>
      </section>

      <Section width="7xl" className="bg-gradient-to-b from-[#f7f9fc] to-white">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
            Digital product services
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            From the first plan to launch
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
            Get design and development support for the stage your business is
            at. We agree on project scope together before work begins.
          </p>
        </div>

        <div data-stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={service.title}
                className="rounded-[1.75rem] border border-slate-200/80 bg-white p-6 shadow-[0_16px_48px_-32px_rgba(15,23,42,0.3)]"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Icon size={23} aria-hidden="true" />
                </span>
                <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-primary/70">
                  Service 0{index + 1}
                </p>
                <h3 className="mt-1.5 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>
      </Section>

      <Section tone="muted" width="6xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-primary">
              A practical, clear process
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl">
              Built around your goals
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Whether you are starting from a blank page or improving an
              existing product, the first step is to understand your users,
              priorities, and constraints. From there, we shape a clear scope
              and move through design, development, and launch with regular
              communication.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-border/70 bg-white p-6 shadow-sm sm:p-8">
            <h3 className="text-xl font-bold">
              What are you looking to build?
            </h3>
            <ul className="mt-5 space-y-3">
              {projectFit.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm leading-6 text-foreground/80"
                >
                  <Check
                    size={18}
                    className="mt-0.5 shrink-0 text-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-border/60 pt-5 text-sm leading-6 text-muted-foreground">
              Not sure which service fits?{" "}
              <Link
                href="/contact"
                className="font-semibold text-primary underline-offset-4 hover:underline"
              >
                Tell us what you have in mind
              </Link>{" "}
              and we can discuss a suitable next step.
            </p>
          </div>
        </div>
      </Section>

      <Section width="5xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
            Working with NUVYRIX
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl">
            A freelance development partner for Kolkata businesses
          </h2>
          <p className="mt-5 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            NUVYRIX is a freelance web and app development studio. We work with
            businesses in Kolkata and West Bengal to plan, design, and build
            digital products, and also take on projects from clients across
            India. Project scope, schedule, and communication are discussed
            directly before a project starts.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-semibold text-slate-600">
            <Link className="transition-colors hover:text-primary" href="/about">
              About the studio
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="/services"
            >
              All services
            </Link>
            <Link
              className="transition-colors hover:text-primary"
              href="/portfolio"
            >
              Live portfolio
            </Link>
          </div>
        </div>
      </Section>

      <Section width="5xl">
        <div className="mx-auto max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-secondary">
            Before you get in touch
          </p>
          <h2 className="mt-3 text-center text-3xl sm:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 space-y-4">
            <article className="rounded-2xl border border-border/70 bg-white p-6">
              <h3 className="text-lg font-bold">
                What can NUVYRIX help my business build?
              </h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                Projects include business websites, custom web applications,
                mobile apps, product design, and ongoing development. The right
                scope depends on your goals and requirements.
              </p>
            </article>
            <article className="rounded-2xl border border-border/70 bg-white p-6">
              <h3 className="text-lg font-bold">
                Do you work with clients outside Kolkata?
              </h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                Yes. NUVYRIX works with businesses in Kolkata, across West
                Bengal, and throughout India.
              </p>
            </article>
            <article className="rounded-2xl border border-border/70 bg-white p-6">
              <h3 className="text-lg font-bold">
                How do I start a project discussion?
              </h3>
              <p className="mt-2 leading-7 text-muted-foreground">
                Send a short description of what you want to build through the{" "}
                <Link
                  href="/contact"
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  contact page
                </Link>
                . We can then discuss the requirements and a suitable next
                step.
              </p>
            </article>
          </div>
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
