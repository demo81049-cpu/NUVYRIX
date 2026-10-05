import { Section } from "@/components/layout/Section";
import { processSteps } from "@/lib/site";

export function Process() {
  return (
    <Section
      width="7xl"
      className="bg-gradient-to-b from-muted/50 via-background to-background"
    >
      <div className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Our process
        </p>
        <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
          A calm path to <span className="brand-gradient-text">launch</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          Four thoughtful stages. Clear communication, visible progress, and no
          surprises along the way.
        </p>
      </div>

      <div className="relative mt-14 md:mt-20">
        <svg
          className="pointer-events-none absolute inset-x-0 top-2 z-0 hidden h-12 w-full text-primary/30 md:block"
          viewBox="0 0 1200 100"
          fill="none"
          aria-hidden
        >
          <path
            d="M150 50 C250 5 350 5 450 50 S650 95 750 50 S950 5 1050 50"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="6 10"
            strokeLinecap="round"
          />
        </svg>

        <ol className="relative grid gap-8 before:absolute before:bottom-8 before:left-7 before:top-8 before:border-l before:border-dashed before:border-primary/25 md:grid-cols-4 md:gap-7 md:before:hidden">
          {processSteps.map((step, index) => (
            <li
              key={step.step}
              className="group relative flex gap-5 md:block"
            >
              <span className="relative z-10 inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-white font-serif text-lg font-bold text-primary shadow-[0_8px_24px_-10px_rgba(2,132,199,0.45)] ring-4 ring-background transition duration-200 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-[0_12px_28px_-10px_rgba(2,132,199,0.55)] md:h-16 md:w-16 md:text-xl">
                {step.step}
              </span>
              <div className="pb-1 md:mt-6">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary/70">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1.5 text-xl font-bold transition-colors group-hover:text-primary">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground md:text-[15px]">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  );
}
