import { Container } from "@/components/layout/Container";
import { DarkHero } from "@/components/shared/DarkHero";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Optional words appended to the title in the brand gradient. */
  highlight?: string;
  children?: React.ReactNode;
};

export function PageHero({
  eyebrow,
  title,
  description,
  highlight,
  children,
}: PageHeroProps) {
  return (
    <DarkHero>
      <Container width="4xl" className="text-center">
        <p
          data-hero-item
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-sky-200 backdrop-blur-md"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-sky-300 shadow-[0_0_10px_2px_rgba(125,211,252,0.7)]" />
          {eyebrow}
        </p>
        <h1
          data-hero-item="lcp"
          className="mt-6 text-balance text-4xl leading-[1.08] text-white drop-shadow-[0_4px_30px_rgba(5,7,13,0.8)] md:text-6xl"
        >
          {title}
          {highlight && (
            <>
              {" "}
              <span className="hero-gradient-text">{highlight}</span>
            </>
          )}
        </h1>
        <p
          data-hero-item="lcp"
          className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-white/70"
        >
          {description}
        </p>
        {children && (
          <div data-hero-item className="mt-9">
            {children}
          </div>
        )}
      </Container>
    </DarkHero>
  );
}
