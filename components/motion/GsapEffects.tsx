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

        // Headline words rise out of a mask.
        const splits: [HTMLElement, string][] = [];
        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const text = el.textContent ?? "";
          splits.push([el, text]);
          el.setAttribute("aria-label", text);
          el.textContent = "";
          text.split(" ").forEach((word, i, all) => {
            const mask = document.createElement("span");
            mask.setAttribute("aria-hidden", "true");
            mask.className = "inline-block overflow-hidden align-bottom pb-[0.12em] -mb-[0.12em]";
            const inner = document.createElement("span");
            inner.className = "inline-block";
            inner.dataset.splitWord = "";
            inner.textContent = word;
            mask.appendChild(inner);
            el.appendChild(mask);
            if (i < all.length - 1) el.appendChild(document.createTextNode(" "));
          });
          gsap.from(el.querySelectorAll("[data-split-word]"), {
            yPercent: 110,
            rotate: 4,
            duration: 0.9,
            ease: "power4.out",
            stagger: 0.07,
            delay: 0.2,
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-left]").forEach((el) => {
          gsap.from(el, {
            x: -70,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-reveal-right]").forEach((el) => {
          gsap.from(el, {
            x: 70,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        gsap.utils.toArray<HTMLElement>("[data-image-reveal]").forEach((el) => {
          gsap.fromTo(
            el,
            { clipPath: "inset(0% 0% 100% 0%)" },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              duration: 1.3,
              ease: "power4.inOut",
              scrollTrigger: { trigger: el, start: "top 85%", once: true },
              onComplete: () => gsap.set(el, { clearProps: "clipPath" }),
            },
          );
          gsap.from(el.firstElementChild, {
            scale: 1.35,
            duration: 1.8,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });

        // Floating nav tucks away while reading, returns on scroll up.
        const header = document.querySelector<HTMLElement>("header");
        if (header) {
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate(self) {
              const menuOpen = !!document.getElementById("mobile-nav");
              const hide = self.direction === 1 && self.scroll() > 400 && !menuOpen;
              gsap.to(header, {
                yPercent: hide ? -160 : 0,
                duration: 0.4,
                ease: "power3.out",
                overwrite: "auto",
              });
            },
          });
        }

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

        return () => {
          splits.forEach(([el, text]) => {
            el.textContent = text;
            el.removeAttribute("aria-label");
          });
        };
      });

      // Pointer-driven effects (desktop only).
      mm.add(
        "(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)",
        () => {
          const cleanups: (() => void)[] = [];

          gsap.utils.toArray<HTMLElement>("[data-tilt]").forEach((el) => {
            const rx = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });
            const ry = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              const px = (e.clientX - r.left) / r.width - 0.5;
              const py = (e.clientY - r.top) / r.height - 0.5;
              ry(px * 8);
              rx(-py * 8);
            };
            const enter = () => {
              gsap.set(el, { transformPerspective: 900, transition: "box-shadow .5s, translate .5s, border-color .5s" });
            };
            const leave = () => {
              rx(0);
              ry(0);
              gsap.delayedCall(0.5, () => gsap.set(el, { clearProps: "transition" }));
            };
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointerenter", enter);
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });

          gsap.utils.toArray<HTMLElement>("[data-magnetic]").forEach((el) => {
            const mx = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
            const my = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });
            const move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              mx((e.clientX - (r.left + r.width / 2)) * 0.25);
              my((e.clientY - (r.top + r.height / 2)) * 0.35);
            };
            const enter = () => gsap.set(el, { transition: "box-shadow .3s, filter .3s, background-color .3s" });
            const leave = () => {
              mx(0);
              my(0);
              gsap.delayedCall(0.5, () => gsap.set(el, { clearProps: "transition" }));
            };
            el.addEventListener("pointerenter", enter);
            el.addEventListener("pointermove", move);
            el.addEventListener("pointerleave", leave);
            cleanups.push(() => {
              el.removeEventListener("pointerenter", enter);
              el.removeEventListener("pointermove", move);
              el.removeEventListener("pointerleave", leave);
            });
          });

          return () => cleanups.forEach((fn) => fn());
        },
      );

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
