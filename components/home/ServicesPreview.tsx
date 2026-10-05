import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Blob } from "@/components/ui/Blob";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";
import { services } from "@/lib/site";

export function ServicesPreview() {
  return (
    <Section tone="muted" width="7xl">
      <Blob
        shapeIndex={2}
        className="right-0 top-20 h-64 w-64 opacity-70"
        tone="mixed"
      />
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          What we do
        </p>
        <h2 className="mt-3 text-4xl md:text-5xl">
          From first sketch to shipped product
        </h2>
        <p className="mt-4 text-lg text-muted-foreground">
          End-to-end development for founders and teams who need a reliable
          partner—not a revolving door of freelancers.
        </p>
      </div>

      <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => {
          const Icon = service.icon;
          return (
            <Card key={service.title} interactive radiusIndex={i} className="group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                <Icon size={28} />
              </div>
              <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-bold text-primary transition-transform duration-300 hover:gap-3"
        >
          Explore all services
          <ArrowRight size={18} />
        </Link>
      </div>
    </Section>
  );
}
