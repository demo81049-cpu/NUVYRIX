import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Blob } from "@/components/ui/Blob";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { projects, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-16 md:pb-28 md:pt-24">
      <Blob
        shapeIndex={0}
        className="left-[-10%] top-10 h-72 w-72 md:h-[28rem] md:w-[28rem]"
        tone="cyan"
      />
      <Blob
        shapeIndex={1}
        className="right-[-5%] top-32 h-64 w-64 md:h-96 md:w-96"
        tone="violet"
      />

      <div
        aria-hidden
        className="bg-dot-grid pointer-events-none absolute inset-0 -z-10"
      />

      <Container width="7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div data-hero-item className="relative mb-8 flex h-28 w-28 items-center justify-center overflow-hidden rounded-[40%_60%_55%_45%/50%_40%_60%_50%] bg-[#05070d] shadow-[0_10px_40px_-10px_rgba(124,58,237,0.35)] ring-4 ring-white md:h-32 md:w-32">
            <Image
              src="/logo.png"
              alt={`${siteConfig.fullName} logo`}
              width={176}
              height={176}
              className="scale-125 object-cover object-center"
              priority
            />
          </div>

          <p data-hero-item className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            NUVYRIX Technologies · Kolkata &amp; West Bengal
          </p>

          <h1 data-hero-item className="text-balance font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-7xl">
            Websites &amp; apps{" "}
            <span className="brand-gradient-text">for Kolkata businesses</span>
          </h1>

          <p data-hero-item className="mt-5 font-serif text-xl font-semibold brand-gradient-text md:text-2xl">
            {siteConfig.tagline}
          </p>

          <p data-hero-item className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
            Freelance web and app development for businesses in Kolkata,
            across West Bengal, and throughout India—designed with care,
            shipped with clarity, and built to grow.
          </p>

          <div data-hero-item className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Start a project
              <ArrowRight size={20} />
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View our work
            </Button>
          </div>
        </div>

        <div data-hero-item className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative h-48 overflow-hidden rounded-[2rem] rounded-tr-[4rem] border-4 border-white shadow-[0_30px_60px_-20px_rgba(37,99,235,0.35)] md:h-80 md:-rotate-1">
            <div data-parallax="40" className="absolute -inset-y-6 inset-x-0">
            <Image
              src="/hero-workspace.jpg"
              alt="Developer workspace building digital products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 64rem"
              priority
            />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/50 to-transparent" />
          </div>

          <p className="mt-8 text-center text-xs font-bold uppercase tracking-[0.25em] text-muted-foreground">
            Recently shipped
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-border/60 bg-white/80 px-4 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary hover:shadow-soft"
              >
                {project.title}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
