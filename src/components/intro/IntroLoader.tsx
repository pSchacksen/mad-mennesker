"use client";

import { useEffect, useRef, useState } from "react";
import { defaultLoader, isLoaderId, type LoaderId } from "@/content/design";
import { markIntroLifted } from "@/lib/intro";
import { IntroOverlay } from "./IntroOverlay";

/** Hvor længe introen mindst vises og højst må vente på siden (målt fra sideindlæsning). */
const MIN_MS = 3500;
const MAX_MS = 5500;
export const INTRO_EXIT_MS = 1150;

/**
 * Sidens intro-loader. Vises kun ved første besøg i en session, eller når
 * adressen indeholder `?intro` (evt. `?intro=segl` for en bestemt variant).
 * Vises ikke ved reduceret bevægelse. Markup og animation er ren CSS, så den
 * også virker før JavaScript er indlæst, og en CSS-failsafe fjerner den efter
 * få sekunder, hvis scriptet skulle fejle.
 */
export function IntroLoader() {
  const [variant, setVariant] = useState<LoaderId>(defaultLoader);
  const [phase, setPhase] = useState<"on" | "leaving" | "gone">("on");
  const leaving = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-skip") || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setPhase("gone");
      return;
    }
    const requested = new URLSearchParams(window.location.search).get("intro");
    if (isLoaderId(requested)) setVariant(requested);
    root.classList.remove("intro-swap");
    root.classList.add("intro-active");

    const lift = () => {
      if (leaving.current) return;
      leaving.current = true;
      setPhase("leaving");
      markIntroLifted();
      try {
        sessionStorage.setItem("mm-intro", "1");
      } catch {}
      window.setTimeout(() => {
        root.classList.remove("intro-active");
        setPhase("gone");
      }, INTRO_EXIT_MS);
    };

    // Ved en anden variant end standarden starter scenen først nu.
    const startedAt = isLoaderId(requested) && requested !== defaultLoader ? performance.now() : 0;
    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]);
    // performance.now() regnes fra navigationens start — samme ur som CSS-animationerne.
    ready.then(() => window.setTimeout(lift, Math.max(0, startedAt + MIN_MS - performance.now())));
    const cap = window.setTimeout(lift, Math.max(0, startedAt + MAX_MS - performance.now()));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && lift();
    window.addEventListener("keydown", onKey);
    window.addEventListener("mm-intro-skip", lift);
    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mm-intro-skip", lift);
      root.classList.remove("intro-active");
    };
  }, []);

  if (phase === "gone") return null;
  return (
    <IntroOverlay
      id="intro"
      variant={variant}
      leaving={phase === "leaving"}
      onSkip={() => window.dispatchEvent(new Event("mm-intro-skip"))}
    />
  );
}
