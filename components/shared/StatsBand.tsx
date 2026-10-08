import { projects } from "@/lib/site";

const stats: { value: string; suffix?: string; label: string }[] = [
  { value: String(projects.length), suffix: "+", label: "Live products shipped" },
  { value: "100", suffix: "%", label: "Custom code, no templates" },
  { value: "4", label: "Clear stages, idea to launch" },
  { value: "1–2", label: "Business days to reply" },
];

export function StatsBand() {
  return (
    <div
      data-stagger
      className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="relative overflow-hidden rounded-[1.75rem] border border-border/60 bg-card p-6 text-center shadow-[0_4px_20px_-2px_rgba(2,132,199,0.1)]"
        >
          <div
            aria-hidden
            className="brand-gradient absolute inset-x-0 top-0 h-1 opacity-80"
          />
          <p className="font-serif text-4xl font-bold md:text-5xl">
            <span
              className="brand-gradient-text"
              data-count={/^\d+$/.test(stat.value) ? stat.value : undefined}
            >
              {stat.value}
            </span>
            {stat.suffix && (
              <span className="brand-gradient-text">{stat.suffix}</span>
            )}
          </p>
          <p className="mt-2 text-sm font-semibold text-muted-foreground">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}
