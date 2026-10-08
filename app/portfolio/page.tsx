import { FinalCTA } from "@/components/home/FinalCTA";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { DarkHero } from "@/components/shared/DarkHero";
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
      <DarkHero rings={false}>
        <Container width="7xl">
          <div className="flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p
                data-hero-item
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-md"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_2px_rgba(125,211,252,0.7)]" />
                Selected work
              </p>
              <h1
                data-hero-item="lcp"
                className="mt-6 text-5xl leading-[1.04] text-white sm:text-6xl lg:text-7xl"
              >
                Built for the{" "}
                <span className="hero-gradient-text">real world.</span>
              </h1>
            </div>
            <div data-hero-item="lcp" className="max-w-md pb-1 lg:pb-2">
              <p className="text-base leading-7 text-white/70 sm:text-lg sm:leading-8">
                Digital products made to solve real problems. Explore the live
                websites and apps we’ve designed, built, and shipped.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-2">
                {["Websites", "Mobile apps", "E-commerce"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/80 backdrop-blur-md"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div
            data-hero-item
            className="mt-14 grid grid-cols-3 divide-x divide-white/10 rounded-[1.75rem] border border-white/10 bg-white/[0.04] backdrop-blur-md"
          >
            {[
              [String(projects.length), "Live products"],
              ["100%", "Custom built"],
              ["1–2 days", "Reply time"],
            ].map(([value, label]) => (
              <div key={label} className="px-4 py-6 text-center sm:px-8">
                <p className="font-serif text-2xl font-bold text-white sm:text-4xl">
                  {value}
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </DarkHero>

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
