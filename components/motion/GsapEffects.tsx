"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Drives all scroll/entrance animation from data attributes so server
 * components stay untouched:
 *   data-hero-item        staggered entrance on page load
 *   data-reveal           fade/slide in when scrolled into view
 *   data-stagger          children reveal one after another
 *   data-parallax="n"     drifts vertically while scrolling (n = px, default 60)
 */
/** Stop CSS transitions fighting GSAP, then hand styling back to CSS. */
const settle = {
  onStart(this: gsap.core.Tween) {
    gsap.set(this.targets(), { transition: "none" });
  },
  onComplete(this: gsap.core.Tween) {
    gsap.set(this.targets(), { clearProps: "transition,opacity,transform" });
  },
};

export function GsapEffects() {
  const pathname = usePathname();
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const hero = gsap.utils.toArray<HTMLElement>("[data-hero-item]");
        if (hero.length) {
          gsap.from(hero, {
            y: 28,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            ...settle,
            stagger: 0.1,
            delay: 0.05,
          });
        }

        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 0.9,
            ease: "power3.out",
            ...settle,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((group) => {
          gsap.from(group.children, {
            y: 48,
            opacity: 0,
            scale: 0.96,
            duration: 0.8,
            ease: "power3.out",
            ...settle,
            stagger: 0.12,
            scrollTrigger: { trigger: group, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const dist = Number(el.dataset.parallax) || 60;
          gsap.fromTo(
            el,
            { y: -dist / 2 },
            {
              y: dist / 2,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            },
          );
        });

        if (bar.current) {
          gsap.to(bar.current, {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              start: 0,
              end: "max",
              scrub: 0.3,
            },
          });
        }
      });

      // Pages change height after navigation/images load.
      const refresh = () => ScrollTrigger.refresh();
      window.addEventListener("load", refresh);
      return () => window.removeEventListener("load", refresh);
    },
    { dependencies: [pathname] },
  );

  return (
    <div
      ref={bar}
      aria-hidden
      className="brand-gradient pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px] origin-left scale-x-0"
    />
  );
}
