import { cn } from "@/lib/utils";

const radiusVariants = [
  "rounded-[2rem]",
  "rounded-[2rem] rounded-tl-[4rem]",
  "rounded-[2rem] rounded-tr-[5rem]",
  "rounded-[2rem] rounded-br-[4rem]",
  "rounded-[2rem] rounded-bl-[5rem]",
  "rounded-tl-[4rem] rounded-tr-[2rem] rounded-br-[4rem] rounded-bl-[2rem]",
] as const;

type CardProps = {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  radiusIndex?: number;
};

export function Card({
  children,
  className,
  interactive = false,
  radiusIndex = 0,
}: CardProps) {
  const radius = radiusVariants[radiusIndex % radiusVariants.length];

  return (
    <div
      className={cn(
        "relative border border-border/50 bg-card p-8 shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)] transition-all duration-500",
        radius,
        interactive &&
          "hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(2,132,199,0.18)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
