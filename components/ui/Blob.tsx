import { cn } from "@/lib/utils";

const shapes = [
  "60% 40% 30% 70% / 60% 30% 70% 40%",
  "40% 60% 70% 30% / 40% 50% 60% 50%",
  "70% 30% 50% 50% / 30% 60% 40% 70%",
  "35% 65% 55% 45% / 55% 35% 65% 45%",
  "50% 50% 40% 60% / 45% 55% 45% 55%",
] as const;

type BlobProps = {
  shapeIndex?: number;
  className?: string;
  tone?: "cyan" | "violet" | "mixed";
  animated?: boolean;
};

const tones = {
  cyan: "bg-sky-400/30",
  violet: "bg-violet-500/25",
  mixed: "bg-gradient-to-br from-sky-400/35 via-blue-500/20 to-violet-500/30",
} as const;

export function Blob({
  shapeIndex = 0,
  className,
  tone = "mixed",
  animated = true,
}: BlobProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute -z-10 blur-3xl",
        tones[tone],
        animated && (shapeIndex % 2 === 0 ? "animate-blob-drift" : "animate-blob-drift-slow"),
        className,
      )}
      style={{
        borderRadius: shapes[shapeIndex % shapes.length],
      }}
    />
  );
}
