"use client";

import dynamic from "next/dynamic";

// three.js is ~150 kB — load it after the page is interactive, client-only.
export const HeroSceneLazy = dynamic(
  () => import("@/components/three/HeroScene").then((m) => m.HeroScene),
  { ssr: false },
);
