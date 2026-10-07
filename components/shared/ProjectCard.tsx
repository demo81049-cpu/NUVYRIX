import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/site";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index?: number;
  variant?: "home" | "portfolio";
};

export function ProjectCard({
  project,
  index = 0,
  variant = "portfolio",
}: ProjectCardProps) {
  const isHome = variant === "home";

  return (
    <a
      data-tilt
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative block overflow-hidden border border-border/50 bg-card shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(2,132,199,0.18)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2",
        isHome && "hover:rotate-1",
        index % 3 === 0 && "rounded-[2rem] rounded-tr-[4rem]",
        index % 3 === 1 && "rounded-[2rem] rounded-bl-[5rem]",
        index % 3 === 2 && "rounded-[2rem] rounded-tl-[4rem] rounded-br-[3rem]",
      )}
    >
      <div
        className={cn(
          "relative overflow-hidden",
          isHome ? "h-44" : "mx-4 mt-4 h-48 rounded-[1.5rem] border-4 border-white shadow-[0_4px_20px_-2px_rgba(2,132,199,0.15)]",
          !isHome && (index % 2 === 0 ? "-rotate-2" : "rotate-2"),
        )}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-multiply",
            project.gradient,
          )}
        />
      </div>

      <div className="p-7">
        <div className="flex items-start justify-between gap-3">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
            {project.category}
          </p>
          <ArrowUpRight
            size={18}
            className="shrink-0 text-secondary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <h3 className={cn("mt-2 font-bold", isHome ? "text-2xl" : "text-2xl")}>
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.summary}
        </p>
        <p className="mt-4 text-sm font-semibold text-secondary">
          {project.outcome}
        </p>
      </div>
    </a>
  );
}
