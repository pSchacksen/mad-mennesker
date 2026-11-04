"use client";

import { motion, useInView, useReducedMotion, useScroll, useTransform, type MotionStyle } from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

/**
 * Diskret parallax: flytter indholdet `distance` px i forhold til scroll,
 * mens elementet passerer viewporten. Slås fra ved reduceret bevægelse.
 */
export function Parallax({
  children,
  distance = 60,
  className,
  style,
  rotate = 0,
}: {
  children?: ReactNode;
  distance?: number;
  className?: string;
  style?: MotionStyle;
  rotate?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  // Mindre bevægelse på smalle skærme, så lag ikke glider ind over teksten
  const factor = useRef(1);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const set = () => (factor.current = mq.matches ? 0.35 : 1);
    set();
    mq.addEventListener("change", set);
    return () => mq.removeEventListener("change", set);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, (v) => distance * factor.current * (1 - 2 * v));
  const r = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  return (
    <motion.div ref={ref} className={className} style={reduce ? style : { ...style, y, rotate: r }}>
      {children}
    </motion.div>
  );
}

/**
 * Billed-reveal med clip-path-maske og let zoom-ud.
 * Kan bruges om <Photo> eller en pladsholder.
 */
export function ImageReveal({
  children,
  className,
  from = "bottom",
  delay = 0,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  from?: "bottom" | "left" | "right" | "center";
  delay?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });
  // Ved reduceret bevægelse vises billedet straks (SSR-markup starter maskeret).
  const show = immediate || inView || reduce;
  const hidden = {
    bottom: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
    center: "inset(18% 18% 18% 18%)",
  }[from];
  // Bemærk: synlighed måles på en ydre wrapper — IntersectionObserver
  // tager højde for clip-path og ville ellers aldrig se det maskerede element.
  return (
    <div ref={ref} className={className}>
      <motion.div
        className="h-full w-full overflow-hidden"
        initial={{ clipPath: hidden }}
        animate={show ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={reduce ? { duration: 0 } : { duration: 1.4, delay, ease: [0.76, 0, 0.24, 1] }}
      >
        <motion.div
          className="h-full w-full"
          initial={{ scale: 1.18 }}
          animate={show ? { scale: 1 } : undefined}
          transition={reduce ? { duration: 0 } : { duration: 1.8, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
