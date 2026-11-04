"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Diskret messingring, der følger musen på desktop og vokser over links og
 * billeder. Den ERSTATTER IKKE systemets cursor (tilgængelighed), og vises
 * kun på enheder med fin pointer og uden ønske om reduceret bevægelse.
 */
export function Cursor() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"idle" | "link" | "media">("idle");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    setEnabled(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  useEffect(() => {
    if (!enabled || reduce) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest("a, button, [role=tab], label, select")) setMode("link");
      else if (t?.closest("[data-cursor=media]")) setMode("media");
      else setMode("idle");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;
  const size = mode === "link" ? 54 : mode === "media" ? 88 : 22;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-[90] mix-blend-difference"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-brass-light text-[0.6rem] font-semibold tracking-[0.2em] text-brass-light uppercase"
        animate={{ width: size, height: size, opacity: visible ? 1 : 0, backgroundColor: mode === "link" ? "rgba(220,196,149,0.15)" : "rgba(0,0,0,0)" }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        {mode === "media" && <span>Kig</span>}
      </motion.div>
    </motion.div>
  );
}
