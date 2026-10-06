import { FinalCTA } from "@/components/home/FinalCTA";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { projects } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Portfolio",
  description:
    "Explore live websites and apps built by NUVYRIX TECHNOLOGIES for businesses in Kolkata, West Bengal, and across India.",
  path: "/portfolio",
});

export default function PortfolioPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden border-b border-slate-200/70 bg-gradient-to-b from-sky-50 via-white to-[#f7f9fc] pb-16 pt-16 md:pb-20 md:pt-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 top-0 -z-10 h-80 w-80 rounded-full bg-sky-300/30 blur-[100px]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-8 -z-10 h-80 w-80 rounded-full bg-violet-300/25 blur-[110px]"
        />
        <Container width="7xl" className="relative">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary shadow-sm backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Selected work
              </p>
              <h1 className="mt-6 text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
                Built for the{" "}
                <span className="brand-gradient-text">real world.</span>
              </h1>
            </div>
            <div className="max-w-md pb-1 lg:pb-2">
              <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Digital products made to solve real problems. Explore the live
                websites and apps we’ve designed, built, and shipped.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {["Websites", "Mobile apps", "E-commerce"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-slate-200/80 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-slate-600"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-12 flex items-center gap-4 border-t border-slate-200/80 pt-5 text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            <span>{String(projects.length).padStart(2, "0")} live projects</span>
            <span className="h-1 w-1 rounded-full bg-primary/60" />
            <span>Explore the work</span>
          </div>
        </Container>
      </section>

      <Section
        width="7xl"
        className="bg-gradient-to-b from-[#f7f9fc] to-white py-16 md:py-24"
      >
        <div data-reveal className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-secondary">
              From idea to impact
            </p>
            <h2 className="mt-2 text-3xl sm:text-4xl">The project lineup</h2>
          </div>
          <p className="pb-1 font-mono text-xs font-semibold tracking-widest text-muted-foreground">
            01 — {String(projects.length).padStart(2, "0")}
          </p>
        </div>
        <div
          data-stagger
          aria-label="Selected portfolio projects"
          className="grid items-stretch gap-6 sm:grid-cols-2 sm:gap-7 lg:gap-8"
        >
          {projects.map((project, i) => (
            <ProjectCard
              key={project.slug}
              project={project}
              index={i}
              variant="portfolio"
            />
          ))}
        </div>
      </Section>

      <FinalCTA />
    </>
  );
}
