import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { ProjectCard } from "@/components/shared/ProjectCard";
import { projects } from "@/lib/site";

export function FeaturedWork() {
  return (
    <Section tone="accent" width="7xl">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-secondary">
            Selected work
          </p>
          <h2 className="mt-3 text-4xl md:text-5xl">Products we’ve helped grow</h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Live websites and apps shipped for real businesses—tap any card to
            visit the product.
          </p>
        </div>
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 font-bold text-primary transition-transform duration-300 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 rounded-full"
        >
          Full portfolio
          <ArrowRight size={18} />
        </Link>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={i}
            variant="home"
          />
        ))}
      </div>
    </Section>
  );
}
