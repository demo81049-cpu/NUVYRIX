import { cn } from "@/lib/utils";

type DarkHeroProps = {
  children: React.ReactNode;
  className?: string;
  /** Show the slowly turning orbit rings (decorative, CSS only). */
  rings?: boolean;
};

/**
 * Dark hero band shared by the inner pages — same visual language as the
 * homepage 3D hero, but pure CSS so these pages stay fast.
 */
export function DarkHero({ children, className, rings = true }: DarkHeroProps) {
  return (
    <section
      className={cn(
        // Pulled up under the floating header so the dark band starts at the top.
        "relative isolate -mt-[60px] overflow-hidden bg-[#05070d] pb-36 pt-36 text-white md:pb-44 md:pt-44",
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(55%_60%_at_50%_30%,rgba(37,99,235,0.25),transparent_70%),radial-gradient(35%_45%_at_10%_20%,rgba(56,189,248,0.16),transparent_70%),radial-gradient(35%_45%_at_90%_30%,rgba(124,58,237,0.2),transparent_70%)]"
      />
      <div
        aria-hidden
        className="bg-dot-grid-dark pointer-events-none absolute inset-0 -z-20"
      />

      {rings && (
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-[55%] -z-10 h-[38rem] w-[38rem] -translate-x-1/2 -translate-y-1/2 md:h-[48rem] md:w-[48rem]"
        >
          <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,transparent_58%,rgba(56,189,248,0.10)_72%,rgba(124,58,237,0.18)_100%)] ring-1 ring-sky-300/15" />
          <div className="absolute inset-0 [transform:rotateX(74deg)]">
            <div className="animate-spin-slow h-full w-full rounded-full border border-sky-400/25 border-t-sky-300/70" />
          </div>
          <div className="absolute inset-[8%] [transform:rotateX(70deg)_rotateZ(30deg)]">
            <div className="animate-spin-slower h-full w-full rounded-full border border-violet-400/20 border-b-violet-300/60" />
          </div>
        </div>
      )}

      <div className="relative">{children}</div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-px h-28 bg-gradient-to-b from-transparent to-background"
      />
    </section>
  );
}
