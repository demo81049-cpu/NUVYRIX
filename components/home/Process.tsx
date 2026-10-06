"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Section } from "@/components/layout/Section";
import { processSteps } from "@/lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const fillBox = "[transform-box:fill-box]";

function DiscoverArt() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" fill="none" aria-hidden>
      {[...Array(5)].map((_, r) =>
        [...Array(9)].map((_, c) => (
          <circle key={`${r}-${c}`} cx={20 + c * 25} cy={18 + r * 28} r="1.6" fill="#0284c7" opacity="0.25" />
        )),
      )}
      <g stroke="#7c3aed" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="4 5">
        <path d="M52 40 L120 78 L190 34" />
        <path d="M120 78 L168 116" />
      </g>
      {[
        [52, 40],
        [190, 34],
        [168, 116],
      ].map(([x, y], i) => (
        <g key={i}>
          <circle data-ping cx={x} cy={y} r="12" fill="#38bdf8" opacity="0.25" className={`${fillBox} origin-center`} />
          <circle cx={x} cy={y} r="6" fill="#2563eb" />
        </g>
      ))}
      <g data-mag className={`${fillBox}`}>
        <circle cx="116" cy="72" r="24" fill="white" fillOpacity="0.7" stroke="url(#g-disc)" strokeWidth="6" />
        <path d="M134 90 L156 112" stroke="url(#g-disc)" strokeWidth="8" strokeLinecap="round" />
        <path d="M104 66 q6 -10 18 -8" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
      </g>
      <defs>
        <linearGradient id="g-disc" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function DesignArt() {
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" fill="none" aria-hidden>
      <rect x="28" y="20" width="184" height="110" rx="16" fill="white" fillOpacity="0.75" stroke="#0284c7" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="5 6" />
      <circle data-float cx="78" cy="64" r="20" fill="#38bdf8" />
      <rect data-float data-spin x="112" y="46" width="40" height="40" rx="12" fill="#2563eb" className={`${fillBox} origin-center`} />
      <path data-float d="M184 50 L206 90 L162 90 Z" fill="#7c3aed" className={`${fillBox} origin-center`} />
      <rect x="52" y="104" width="64" height="8" rx="4" fill="#0f172a" opacity="0.12" />
      <rect x="124" y="104" width="40" height="8" rx="4" fill="#0f172a" opacity="0.12" />
      <g data-cursor className={fillBox}>
        <path d="M150 96 L150 128 L158 120 L165 134 L172 131 L165 117 L176 117 Z" fill="#0f172a" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function BuildArt() {
  const widths = [90, 120, 70, 104, 56, 84];
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" fill="none" aria-hidden>
      <rect x="22" y="16" width="196" height="118" rx="14" fill="#0b1020" />
      <rect x="22" y="16" width="196" height="24" rx="14" fill="#161c33" />
      <circle cx="40" cy="28" r="4" fill="#f87171" />
      <circle cx="54" cy="28" r="4" fill="#fbbf24" />
      <circle cx="68" cy="28" r="4" fill="#34d399" />
      {widths.map((w, i) => (
        <rect
          key={i}
          data-line
          x={40 + (i % 3 === 1 ? 14 : 0)}
          y={54 + i * 14}
          width={w}
          height="6"
          rx="3"
          fill={["#38bdf8", "#a78bfa", "#60a5fa"][i % 3]}
          className={`${fillBox} origin-left`}
        />
      ))}
      <rect data-caret x="150" y="124" width="6" height="8" rx="1" fill="#e0f2fe" />
    </svg>
  );
}

function GrowArt() {
  const bars = [30, 46, 38, 62, 78];
  return (
    <svg viewBox="0 0 240 150" className="h-full w-full" fill="none" aria-hidden>
      <path d="M30 124 H214" stroke="#0f172a" strokeOpacity="0.15" strokeWidth="2" strokeLinecap="round" />
      {bars.map((h, i) => (
        <rect
          key={i}
          data-bar
          x={42 + i * 34}
          y={124 - h}
          width="22"
          height={h}
          rx="6"
          fill="url(#g-grow)"
          opacity="0.28"
          className={`${fillBox} origin-bottom`}
        />
      ))}
      <path
        data-trend
        pathLength={1}
        d="M52 100 C 80 96 90 84 112 88 S 156 60 186 40"
        stroke="url(#g-grow)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1"
      />
      <g data-rocket className={fillBox}>
        <path d="M186 22 q16 6 16 24 l-10 4 l-12 -12 z" fill="#2563eb" />
        <circle cx="193" cy="34" r="3.5" fill="white" />
        <path d="M178 46 l-8 10 l12 -2 z" fill="#38bdf8" />
        <path d="M188 52 q-4 12 4 18 q8 -6 4 -18 z" fill="#fbbf24" />
      </g>
      <defs>
        <linearGradient id="g-grow" x1="0" y1="1" x2="1" y2="0">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const arts = [DiscoverArt, DesignArt, BuildArt, GrowArt];
const tints = [
  "from-sky-100 to-sky-50",
  "from-blue-100 to-indigo-50",
  "from-slate-200 to-slate-100",
  "from-violet-100 to-sky-50",
];

export function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = q<HTMLElement>("[data-card]");
        const nodes = q<HTMLElement>("[data-node]");
        const layers = q<HTMLElement>("[data-node-fill]");

        gsap.from(cards, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: { trigger: root.current, start: "top 80%", once: true },
          onStart() {
            gsap.set(cards, { transition: "none" });
          },
          onComplete() {
            gsap.set(cards, { clearProps: "transition,opacity,transform" });
          },
        });

        // Rail fills as you scroll; nodes light up as it reaches them.
        gsap.set(layers, { opacity: 0 });
        gsap.set(nodes, { color: "#0284c7", scale: 0.92 });
        const lit = new Set<number>();
        gsap.fromTo(
          q("[data-rail-fill]"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
              end: "bottom 70%",
              scrub: 0.4,
              onUpdate(self) {
                nodes.forEach((node, i) => {
                  const on = self.progress >= i / (nodes.length - 1) - 0.001;
                  if (on === lit.has(i)) return;
                  if (on) lit.add(i);
                  else lit.delete(i);
                  gsap.to(layers[i], { opacity: on ? 1 : 0, duration: 0.3 });
                  gsap.to(node, {
                    color: on ? "#ffffff" : "#0284c7",
                    scale: on ? 1.08 : 0.92,
                    duration: 0.45,
                    ease: "back.out(2)",
                  });
                });
              },
            },
          },
        );

        // Per-card illustration loops — only run while the card is on screen.
        const loop = (card: HTMLElement) => ({
          trigger: card,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play pause resume pause",
        });
        const [c1, c2, c3, c4] = cards;

        const mag = c1.querySelector("[data-mag]");
        gsap.to(mag, {
          keyframes: [
            { x: 46, y: -18 },
            { x: 20, y: 30 },
            { x: -40, y: 12 },
            { x: 0, y: 0 },
          ],
          duration: 6,
          ease: "sine.inOut",
          repeat: -1,
          scrollTrigger: loop(c1),
        });
        gsap.to(c1.querySelectorAll("[data-ping]"), {
          scale: 1.7,
          opacity: 0,
          duration: 1.8,
          ease: "power1.out",
          stagger: 0.5,
          repeat: -1,
          scrollTrigger: loop(c1),
        });

        gsap.to(c2.querySelectorAll("[data-float]"), {
          y: -10,
          duration: 1.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: 0.3,
          scrollTrigger: loop(c2),
        });
        gsap.to(c2.querySelector("[data-spin]"), {
          rotate: 90,
          duration: 5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          scrollTrigger: loop(c2),
        });
        gsap.to(c2.querySelector("[data-cursor]"), {
          keyframes: [
            { x: -78, y: -40 },
            { x: -34, y: -52 },
            { x: 26, y: -48 },
            { x: 0, y: 0 },
          ],
          duration: 5,
          ease: "power2.inOut",
          repeat: -1,
          scrollTrigger: loop(c2),
        });

        gsap
          .timeline({ repeat: -1, repeatDelay: 1.2, scrollTrigger: loop(c3) })
          .from(c3.querySelectorAll("[data-line]"), {
            scaleX: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.3,
          })
          .to(c3.querySelector("[data-caret]"), {
            opacity: 0,
            duration: 0.35,
            repeat: 5,
            yoyo: true,
          })
          .to(c3.querySelectorAll("[data-line]"), {
            scaleX: 0,
            duration: 0.3,
            stagger: 0.05,
          });

        gsap
          .timeline({ repeat: -1, repeatDelay: 1.4, scrollTrigger: loop(c4) })
          .from(c4.querySelectorAll("[data-bar]"), {
            scaleY: 0,
            duration: 0.7,
            ease: "back.out(1.4)",
            stagger: 0.12,
          })
          .fromTo(
            c4.querySelector("[data-trend]"),
            { strokeDashoffset: 1 },
            { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut" },
            0.3,
          )
          .from(
            c4.querySelector("[data-rocket]"),
            { x: -134, y: 78, opacity: 0, duration: 1.3, ease: "power2.inOut" },
            0.3,
          )
          .to(c4.querySelector("[data-rocket]"), {
            y: -6,
            duration: 0.8,
            ease: "sine.inOut",
            yoyo: true,
            repeat: 3,
          });
      });
    },
    { scope: root },
  );

  return (
    <Section
      width="7xl"
      className="bg-gradient-to-b from-muted/50 via-background to-background"
    >
      <div data-reveal className="mx-auto max-w-2xl text-center">
        <p className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white/80 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-primary shadow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Our process
        </p>
        <h2 className="mt-5 text-4xl leading-tight md:text-5xl">
          A calm path to <span className="brand-gradient-text">launch</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
          Four thoughtful stages. Clear communication, visible progress, and no
          surprises along the way.
        </p>
      </div>

      <div ref={root} className="mt-14 md:mt-20">
        {/* Progress rail — desktop */}
        <div className="relative mb-8 hidden grid-cols-4 md:grid" aria-hidden>
          <div className="absolute inset-x-[12.5%] top-1/2 h-1 -translate-y-1/2 overflow-hidden rounded-full bg-border/70">
            <div
              data-rail-fill
              className="brand-gradient h-full origin-left rounded-full"
            />
          </div>
          {processSteps.map((step) => (
            <div key={step.step} className="relative flex justify-center">
              <span
                data-node
                className="relative flex h-14 w-14 items-center justify-center rounded-full border border-primary/30 bg-white font-serif text-xl font-bold text-primary shadow-[0_8px_24px_-10px_rgba(2,132,199,0.5)] ring-4 ring-background"
              >
                <span
                  data-node-fill
                  className="brand-gradient absolute inset-0 rounded-full"
                />
                <span className="relative">{step.step}</span>
              </span>
            </div>
          ))}
        </div>

        <ol className="grid gap-6 md:grid-cols-4 md:gap-6">
          {processSteps.map((step, i) => {
            const Art = arts[i];
            return (
              <li
                key={step.step}
                data-card
                className="group relative overflow-hidden rounded-[2rem] border border-border/60 bg-card shadow-[0_4px_20px_-2px_rgba(2,132,199,0.12)] transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[0_24px_48px_-16px_rgba(37,99,235,0.28)]"
              >
                <div
                  className={`relative h-40 bg-gradient-to-br ${tints[i]} p-3`}
                >
                  <Art />
                  <span className="absolute left-4 top-4 rounded-full bg-white/80 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary shadow-sm backdrop-blur md:hidden">
                    Step {step.step}
                  </span>
                </div>
                <div className="p-6">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.18em] text-primary/70">
                    Step {step.step}
                  </p>
                  <h3 className="mt-1.5 text-2xl font-bold transition-colors group-hover:text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                <span
                  aria-hidden
                  className="brand-gradient absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                />
              </li>
            );
          })}
        </ol>
      </div>
    </Section>
  );
}
