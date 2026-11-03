"use client";

import { motion, useInView, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

const presets = {
  up: { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } },
  down: { hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -48 }, show: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 48 }, show: { opacity: 1, x: 0 } },
  fade: { hidden: { opacity: 0 }, show: { opacity: 1 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, show: { opacity: 1, scale: 1 } },
  blur: { hidden: { opacity: 0, filter: "blur(10px)" }, show: { opacity: 1, filter: "blur(0px)" } },
} as const;

export type RevealPreset = keyof typeof presets;

type RevealProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children: ReactNode;
  preset?: RevealPreset;
  delay?: number;
  duration?: number;
  amount?: number;
};

/** Scroll-reveal: animerer ind, når elementet kommer i viewport. */
export function Reveal({ children, preset = "up", delay = 0, duration = 0.9, amount = 0.25, className, ...rest }: RevealProps) {
  const reduce = useReducedMotion();
  const p = presets[preset];
  return (
    <motion.div
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: p.hidden, show: p.show }}
      transition={{ duration, delay, ease: EASE }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Container, der forskyder sine børns reveal-animationer. Brug sammen med <StaggerItem>. */
export function Stagger({
  children,
  className,
  stagger = 0.09,
  delay = 0,
  amount = 0.2,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  amount?: number;
  as?: "div" | "ul" | "ol" | "dl";
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={reduce ? "show" : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Comp>
  );
}

export function StaggerItem({
  children,
  className,
  preset = "up",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  preset?: RevealPreset;
  as?: "div" | "li" | "span";
}) {
  const p = presets[preset];
  const Comp = motion[as];
  return (
    <Comp className={className} variants={{ hidden: p.hidden, show: { ...p.show, transition: { duration: 0.8, ease: EASE } } }}>
      {children}
    </Comp>
  );
}

/**
 * Linjevis tekst-reveal. Hver linje glider op bag en maske.
 * Teksten står i DOM'en som almindelig tekst (SEO og skærmlæsere).
 * Synlighed måles på selve overskriften (ikke de maskerede linjer).
 */
export function RevealLines({
  lines,
  as: Tag = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.11,
  immediate = false,
  id,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p" | "div";
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  /** Animér ved mount i stedet for ved scroll (fx i hero). */
  immediate?: boolean;
  id?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const show = immediate || inView || reduce;
  const MotionTag = motion[Tag] as typeof motion.div;
  return (
    <MotionTag
      ref={ref as React.Ref<HTMLDivElement>}
      className={className}
      id={id}
      initial={reduce ? "show" : "hidden"}
      animate={show ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {lines.map((line, i) => (
        <span key={i} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}>
          <motion.span
            className="block will-change-transform"
            variants={{
              hidden: { y: "105%", rotate: 2 },
              show: { y: "0%", rotate: 0, transition: { duration: 1.1, ease: EASE } },
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
