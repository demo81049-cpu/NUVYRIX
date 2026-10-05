import { Blob } from "@/components/ui/Blob";
import { Container } from "@/components/layout/Container";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-16 md:pb-16 md:pt-24">
      <Blob
        shapeIndex={0}
        className="left-[-8%] top-0 h-56 w-56 md:h-80 md:w-80"
        tone="cyan"
      />
      <Blob
        shapeIndex={2}
        className="right-[-5%] top-20 h-48 w-48 md:h-72 md:w-72"
        tone="violet"
      />
      <Container width="4xl" className="relative text-center">
        <p className="text-xs font-bold uppercase tracking-[0.3em] text-primary">
          {eyebrow}
        </p>
        <h1 className="mt-4 text-4xl md:text-6xl">{title}</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">
          {description}
        </p>
      </Container>
    </section>
  );
}
