"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

type RotatingWordsProps = {
  words: string[];
  /** Seconds each word stays on screen. */
  hold?: number;
  className?: string;
};

/**
 * Cycles through `words` with a per-letter slide: the current word's letters
 * roll up and out while the next word's letters roll up from below.
 * All words share one grid cell so the line never changes height or width.
 */
export function RotatingWords({
  words,
  hold = 2.4,
  className,
}: RotatingWordsProps) {
  const root = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const items = gsap.utils.toArray<HTMLElement>("[data-word]");
        if (items.length < 2) return;

        const chars = items.map((el) =>
          Array.from(el.querySelectorAll<HTMLElement>("[data-char]")),
        );
        gsap.set(items.slice(1), { autoAlpha: 0 });

        let current = 0;

        const step = () => {
          const next = (current + 1) % items.length;
          const out = chars[current];
          const inn = chars[next];

          gsap.set(items[next], { autoAlpha: 1 });
          gsap.set(inn, { yPercent: 110, rotate: 6, opacity: 0 });

          const t = gsap.timeline();
          t.to(out, {
            yPercent: -110,
            rotate: -6,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in",
            stagger: 0.025,
          })
            .to(
              inn,
              {
                yPercent: 0,
                rotate: 0,
                opacity: 1,
                duration: 0.7,
                ease: "back.out(1.6)",
                stagger: 0.03,
              },
              0.25,
            )
            .set(items[current], { autoAlpha: 0 });
          current = next;
          return t;
        };

        let call = gsap.delayedCall(hold, function loop() {
          step();
          call = gsap.delayedCall(hold + 1.2, loop);
        });

        return () => call.kill();
      }, root);
    },
    { scope: root },
  );

  return (
    <span ref={root} className={className}>
      {/* Reserve width of the widest word, stack all in one cell. */}
      <span aria-hidden className="inline-grid overflow-hidden px-[0.05em] py-[0.12em] align-bottom">
        {words.map((word) => (
          <span
            key={word}
            data-word
            className="col-start-1 row-start-1 whitespace-nowrap"
          >
            {Array.from(word).map((ch, j) => (
              <span
                key={j}
                data-char
                className="inline-block will-change-transform"
              >
                {ch === " " ? " " : ch}
              </span>
            ))}
          </span>
        ))}
      </span>
      <span className="sr-only">{words[0]}</span>
    </span>
  );
}
