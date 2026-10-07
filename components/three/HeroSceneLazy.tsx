"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

// three.js is heavy — fetched only when we decide to show the 3D scene.
const HeroScene = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);

type Mode = "pending" | "3d" | "css";

function canRun3d() {
  const nav = navigator as Navigator & {
    connection?: { saveData?: boolean };
    deviceMemory?: number;
  };
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  if (!window.matchMedia("(min-width: 768px) and (pointer: fine)").matches) return false;
  if (nav.connection?.saveData) return false;
  if ((nav.hardwareConcurrency ?? 8) < 4) return false;
  if ((nav.deviceMemory ?? 8) < 4) return false;
  return true;
}

/** Static glowing orb — used on phones / low-power devices instead of WebGL. */
function CssOrb() {
  return (
    <div className="absolute left-1/2 top-[20rem] -translate-x-1/2 -translate-y-1/2">
      <div className="h-[19rem] w-[19rem] rounded-full bg-[radial-gradient(circle_at_50%_45%,transparent_55%,rgba(56,189,248,0.14)_70%,rgba(124,58,237,0.28)_86%,rgba(167,139,250,0.4)_100%)] shadow-[0_0_70px_0_rgba(56,189,248,0.16)] ring-1 ring-sky-300/25" />
      <div className="absolute inset-[-2.5rem] rotate-[-18deg] rounded-[50%] border border-sky-400/35 [transform:rotateX(72deg)]" />
      <div className="absolute inset-[-4.5rem] rotate-[24deg] rounded-[50%] border border-violet-400/25 [transform:rotateX(74deg)]" />
    </div>
  );
}

export function HeroSceneLazy({ className }: { className?: string }) {
  const [mode, setMode] = useState<Mode>("pending");

  useEffect(() => {
    if (!canRun3d()) {
      const id = requestAnimationFrame(() => setMode("css"));
      return () => cancelAnimationFrame(id);
    }
    // Wait until the main thread is free so the 3D scene never blocks first paint.
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setMode("3d"), { timeout: 2500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = window.setTimeout(() => setMode("3d"), 1200);
    return () => window.clearTimeout(t);
  }, []);

  if (mode === "3d") return <HeroScene className={className} />;
  if (mode === "css")
    return (
      <div aria-hidden className={cn("overflow-hidden", className)}>
        <CssOrb />
      </div>
    );
  return null;
}
