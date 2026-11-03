"use client";

import { useEffect, useRef, useState } from "react";
import { markIntroLifted } from "@/lib/intro";

/** Hvor længe introen mindst vises og højst må vente på siden (målt fra sideindlæsning). */
const MIN_MS = 3500;
const MAX_MS = 5500;
const EXIT_MS = 1100;

/**
 * Intro-loader: en globelampe sænker sig ned, flimrer og tænder, og navnet
 * træder frem i lyset — så løfter mørket sig som et tæppe og afslører siden.
 *
 * Vises kun ved første besøg i en session (eller med `?intro` i adressen).
 * Ved reduceret bevægelse vises den slet ikke. Markup og animation er ren CSS,
 * så den også virker før JavaScript er indlæst, og har en CSS-failsafe,
 * der fjerner den efter få sekunder, hvis scriptet skulle fejle.
 */
export function IntroLoader() {
  const [phase, setPhase] = useState<"on" | "leaving" | "gone">("on");
  const leaving = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-skip")) {
      setPhase("gone");
      return;
    }
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
      }, EXIT_MS);
    };

    const ready = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      document.readyState === "complete" ? Promise.resolve() : new Promise((r) => window.addEventListener("load", r, { once: true })),
    ]);
    ready.then(() => {
      // performance.now() regnes fra navigationens start — samme ur som CSS-animationerne.
      const wait = Math.max(0, MIN_MS - performance.now());
      window.setTimeout(lift, wait);
    });
    const cap = window.setTimeout(lift, Math.max(0, MAX_MS - performance.now()));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && lift();
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(cap);
      window.removeEventListener("keydown", onKey);
      root.classList.remove("intro-active");
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div id="intro" className={phase === "leaving" ? "is-leaving" : undefined} aria-hidden="true">
      <div className="intro-scene">
        <div className="intro-pool" />
        <div className="intro-lamp">
          <span className="intro-cord" />
          <span className="intro-cap" />
          <span className="intro-globe" />
        </div>
        <p className="intro-wordmark">
          Mad <em>&amp;</em> Mennesker
        </p>
        <p className="intro-tagline">
          <span>God dansk mad.</span> <span>Gode mennesker.</span> <span>God tid.</span>
        </p>
        <span className="intro-line" />
      </div>
      <button
        type="button"
        tabIndex={-1}
        className="intro-skip-btn"
        onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }))}
      >
        Spring over
      </button>
    </div>
  );
}
