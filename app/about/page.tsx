import Image from "next/image";
import { PageHero } from "@/components/shared/PageHero";
import { FinalCTA } from "@/components/home/FinalCTA";
import { Blob } from "@/components/ui/Blob";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/layout/Section";
import { values } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "Meet NUVYRIX TECHNOLOGIES, a freelance web and app development studio serving businesses in Kolkata, West Bengal, and across India.",
  path: "/about",
  keywords: [
    "about NUVYRIX Technologies",
    "freelance web development Kolkata",
    "app development studio West Bengal",
  ],
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A studio-sized partner, freelancers who ship"
        description="NUVYRIX is how we help businesses Build. Launch. Grow.—with thoughtful product craft and clear communication."
      />

      <Section width="7xl" className="pt-8 md:pt-12">
        <Blob
          shapeIndex={2}
          className="right-0 top-20 h-80 w-80 opacity-40"
          tone="violet"
        />
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="relative mx-auto w-full max-w-md">
            <div className="organic-mask relative aspect-square overflow-hidden bg-[#05070d] shadow-[0_10px_40px_-10px_rgba(124,58,237,0.3)] ring-4 ring-white">
              <Image
                src="/about-team.jpg"
                alt="Collaborative product team at work"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 28rem"
              />
            </div>
          </div>

          <div>
            <h2 className="text-3xl md:text-4xl">Why NUVYRIX exists</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Too many projects stall between a pretty mockup and a working
              product. We close that gap—designing and developing websites and
              apps end to end, then staying close enough to help you grow after
              launch.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              As freelancers, we keep the process light and personal. As a
              studio brand, we bring the polish, process, and reliability you’d
              expect from a larger team.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="muted" width="6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Values
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl">How we show up</h2>
        </div>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {values.map((value, i) => (
            <Card key={value.title} radiusIndex={i} interactive>
              <h3 className="text-xl font-bold">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.description}
              </p>
            </Card>
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
