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

      <Container width="7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div className="relative mb-8 flex h-36 w-36 items-center justify-center overflow-hidden rounded-[40%_60%_55%_45%/50%_40%_60%_50%] bg-[#05070d] shadow-[0_10px_40px_-10px_rgba(124,58,237,0.35)] ring-4 ring-white md:h-44 md:w-44">
            <Image
              src="/logo.png"
              alt={`${siteConfig.fullName} logo`}
              width={176}
              height={176}
              className="scale-125 object-cover object-center"
              priority
            />
          </div>

          <p className="mb-4 text-xs font-bold uppercase tracking-[0.35em] text-muted-foreground">
            Technologies
          </p>

          <h1 className="font-serif text-5xl font-extrabold tracking-tight text-foreground md:text-7xl">
            {siteConfig.name.slice(0, -1)}
            <span className="brand-gradient-text">X</span>
          </h1>

          <p className="mt-4 font-serif text-2xl font-semibold brand-gradient-text md:text-3xl">
            {siteConfig.tagline}
          </p>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            Freelance web and app development for businesses in Kolkata,
            across West Bengal, and throughout India—designed with care,
            shipped with clarity, and built to grow.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Start a project
              <ArrowRight size={20} />
            </Button>
            <Button href="/portfolio" variant="outline" size="lg">
              View our work
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl">
          <div className="relative h-48 overflow-hidden rounded-[2rem] rounded-tr-[4rem] border-4 border-white shadow-[0_10px_40px_-10px_rgba(124,58,237,0.2)] md:h-72 md:-rotate-1">
            <Image
              src="/hero-workspace.jpg"
              alt="Developer workspace building digital products"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 64rem"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/50 to-transparent" />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-full border border-border/60 bg-white/80 px-4 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:text-primary"
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
