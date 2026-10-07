import { Sparkles } from "lucide-react";

const items = [
  "Next.js",
  "React",
  "React Native",
  "Node.js",
  "TypeScript",
  "Tailwind CSS",
  "Razorpay",
  "SEO",
  "UI / UX",
  "E-commerce",
  "Dashboards",
  "Cloud hosting",
];

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-serif text-2xl font-semibold text-foreground/70 md:text-3xl"
        >
          {item}
          <Sparkles size={18} className="text-primary/50" aria-hidden />
        </li>
      ))}
    </ul>
  );
}

export function TechMarquee() {
  return (
    <section
      aria-label="Technologies we work with"
      className="group/marquee relative overflow-hidden border-y border-border/50 bg-white/60 py-6 backdrop-blur"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div className="animate-marquee flex w-max">
        <Row />
        <div aria-hidden>
          <Row />
        </div>
      </div>
    </section>
  );
}
