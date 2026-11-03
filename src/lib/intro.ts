"use client";

import { useSyncExternalStore } from "react";

/**
 * Lille fælles tilstand for intro-loaderen. `runs` tælles op, når loaderen
 * løfter sig, så sideindholdet kan genstarte sine indgangsanimationer
 * præcis idet det bliver synligt (se app/template.tsx).
 */
let runs = 0;
const listeners = new Set<() => void>();

export function markIntroLifted() {
  runs += 1;
  listeners.forEach((l) => l());
}

export function useIntroRuns() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => runs,
    () => 0,
  );
}

/** Kører før første paint: skjul loaderen, hvis den allerede er set i denne session. */
export const introBootScript = `try{var q=/[?&]intro\\b/.test(location.search);if(!q&&(sessionStorage.getItem("mm-intro")||matchMedia("(prefers-reduced-motion: reduce)").matches))document.documentElement.classList.add("intro-skip");}catch(e){}`;
