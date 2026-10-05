import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Blob } from "@/components/ui/Blob";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";
import { services } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";
import Link from "next/link";

export const metadata = createPageMetadata({
  title: "Web & App Development Services",
  description:
    "Website development, mobile apps, UI/UX design, and launch support for businesses in Kolkata and across West Bengal from NUVYRIX TECHNOLOGIES.",
  path: "/services",
  keywords: [
    "web development services Kolkata",
    "website design Kolkata",
    "mobile app development West Bengal",
    "UI UX design Kolkata",
    "ecommerce website development Kolkata",
  ],
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything you need to ship"
        description="Whether you’re launching a marketing site or a full product, we cover design, engineering, and the growth that comes after."
      />

      <Section width="7xl" className="pt-8 md:pt-12">
        <Blob
          shapeIndex={1}
          className="left-10 top-40 h-72 w-72 opacity-50"
          tone="mixed"
        />
        <div className="grid gap-8 md:grid-cols-2">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Card
                key={service.title}
                interactive
                radiusIndex={i}
                className="group"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                  <Icon size={28} />
                </div>
                <h2 className="mt-6 text-2xl font-bold">{service.title}</h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {service.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-foreground/80"
                    >
                      <Check
                        size={20}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      {point}
                    </li>
                  ))}
                </ul>
              </Card>
            );
          })}
        </div>
      </Section>

      <Section tone="muted" width="5xl" className="text-center">
        <h2 className="text-3xl md:text-4xl">
          Looking for a web developer in Kolkata?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-muted-foreground">
          Explore how NUVYRIX works with businesses in Kolkata and across West
          Bengal on websites, apps, and digital products.
        </p>
        <Link
          href="/kolkata-web-development"
          className="mt-6 inline-flex items-center gap-2 font-bold text-primary hover:gap-3"
        >
          Web and app development in Kolkata
          <ArrowRight size={18} />
        </Link>
      </Section>

      <FinalCTA />
    </>
  );
}
