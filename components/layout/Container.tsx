import { cn } from "@/lib/utils";

const widths = {
  "7xl": "max-w-7xl",
  "6xl": "max-w-6xl",
  "5xl": "max-w-5xl",
  "4xl": "max-w-4xl",
  "2xl": "max-w-2xl",
} as const;

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  width?: keyof typeof widths;
};

export function Container({
  children,
  className,
  width = "7xl",
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        widths[width],
        className,
      )}
    >
      {children}
    </div>
  );
}
