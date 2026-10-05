import { cn } from "@/lib/utils";
import { Container } from "@/components/layout/Container";

const tones = {
  default: "bg-transparent",
  muted: "bg-muted/40",
  accent: "bg-accent/40",
  primary: "bg-primary text-primary-foreground",
  secondary: "bg-secondary text-secondary-foreground",
  dark: "bg-[#05070d] text-white",
} as const;

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  width?: "7xl" | "6xl" | "5xl" | "4xl" | "2xl";
  tone?: keyof typeof tones;
  id?: string;
};

export function Section({
  children,
  className,
  containerClassName,
  width = "7xl",
  tone = "default",
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-24 md:py-32", tones[tone], className)}
    >
      <Container width={width} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}
