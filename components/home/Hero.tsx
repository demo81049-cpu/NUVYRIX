import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { RotatingWords } from "@/components/motion/RotatingWords";
import { HeroSceneLazy } from "@/components/three/HeroSceneLazy";
import { projects, siteConfig } from "@/lib/site";

export function Hero() {
  return (
    // Pulled up under the floating header so the dark scene starts at the very top.
    <section className="relative isolate -mt-[60px] overflow-hidden bg-[#05070d] pb-40 pt-36 text-white md:pb-44 md:pt-44">
      {/* Ambient color washes */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(60%_50%_at_50%_35%,rgba(37,99,235,0.28),transparent_70%),radial-gradient(40%_40%_at_15%_20%,rgba(56,189,248,0.18),transparent_70%),radial-gradient(40%_40%_at_85%_30%,rgba(124,58,237,0.22),transparent_70%)]"
      />
      <div
        aria-hidden
        className="bg-dot-grid-dark pointer-events-none absolute inset-0 -z-20"
      />

      {/* 3D orb, particles and orbit rings */}
      <HeroSceneLazy className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] md:h-[56rem]" />

      <Container width="7xl">
        <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
          <div
            data-hero-item
            className="relative mb-8 flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-black shadow-[0_0_60px_-5px_rgba(56,189,248,0.55)] ring-1 ring-white/15 md:h-28 md:w-28"
          >
            <Image
              src="/logo.png"
              alt={`${siteConfig.fullName} logo`}
              width={176}
              height={176}
              className="scale-125 object-cover object-center"
              priority
            />
          </div>

          <p
            data-hero-item
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Kolkata &amp; West Bengal · Taking new projects
          </p>

          <h1
            data-hero-item="lcp"
            className="text-balance font-serif text-4xl font-extrabold leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_30px_rgba(5,7,13,0.8)] sm:text-5xl md:text-7xl"
          >
            <RotatingWords
              className="block"
              words={[
                "Websites & apps",
                "Online stores",
                "Mobile apps",
                "Custom portals",
                "Booking systems",
              ]}
            />
            <span className="hero-gradient-text block">for Kolkata businesses</span>
          </h1>

          <p
            data-hero-item
            className="mt-5 font-serif text-xl font-semibold text-sky-200/90 md:text-2xl"
          >
            {siteConfig.tagline}
          </p>

          <p
            data-hero-item="lcp"
            className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/65 md:text-xl"
          >
            Freelance web and app development for businesses in Kolkata, across
            West Bengal, and throughout India—designed with care, shipped with
            clarity, and built to grow.
          </p>

          <div
            data-hero-item
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button href="/contact" size="lg">
              Start a project
              <ArrowRight size={20} />
            </Button>
            <Button
              href="/portfolio"
              variant="outline"
              size="lg"
              className="border-white/25 bg-white/5 text-white backdrop-blur-md hover:bg-white/10"
            >
              View our work
            </Button>
          </div>
        </div>

        <div data-hero-item className="relative mx-auto mt-20 max-w-5xl">
          <div className="relative">
          {/* Glowing frame */}
          <div className="absolute -inset-px rounded-[2rem] rounded-tr-[4rem] bg-gradient-to-r from-sky-400/60 via-blue-500/40 to-violet-500/60 opacity-70 blur-[2px] md:-rotate-1" />
          <div className="relative h-48 overflow-hidden rounded-[2rem] rounded-tr-[4rem] border border-white/10 shadow-[0_40px_100px_-30px_rgba(37,99,235,0.6)] md:h-80 md:-rotate-1">
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
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070d]/80 via-[#05070d]/20 to-transparent" />
          </div>
          </div>

          <p className="mt-10 text-center text-xs font-bold uppercase tracking-[0.25em] text-white/70">
            Recently shipped
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {projects.map((project) => (
              <a
                key={project.slug}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-4 text-sm font-semibold text-white/85 backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-sky-300/50 hover:bg-white/10 hover:text-white hover:shadow-[0_8px_30px_-8px_rgba(56,189,248,0.6)]"
              >
                {project.title}
                <ArrowUpRight
                  size={14}
                  className="opacity-50 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        </div>
      </Container>

      {/* Blend into the light page below */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-40 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
