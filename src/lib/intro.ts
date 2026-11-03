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
