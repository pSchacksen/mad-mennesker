"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

/** Kæmpe ordmærke, der glider på plads, når man når bunden af siden. */
export function FooterWordmark() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["-12%", "0%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["12%", "0%"]);
  return (
    <div ref={ref} aria-hidden className="relative mt-24 overflow-hidden px-3 select-none md:mt-32">
      <motion.p
        style={reduce ? undefined : { x: x1 }}
        className="wordmark text-center text-[13vw] leading-[0.82] tracking-[0.02em] text-cream"
      >
        Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
      </motion.p>
      <motion.p
        style={reduce ? undefined : { x: x2 }}
        className="wordmark -mt-[1vw] text-center text-[13vw] leading-[0.82] tracking-[0.02em] text-cream/95"
      >
        Mennesker
      </motion.p>
    </div>
  );
}
