import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";

/**
 * Små varme lysprikker, der langsomt stiger op i lyset — som støv og gnister
 * i en lun stue. Rent CSS, faste positioner (ingen tilfældighed ved render),
 * og skjult ved reduceret bevægelse.
 */
const motes = [
  [8, 78, 3, 14, 0, 18],
  [17, 60, 2, 11, 3.5, -12],
  [24, 88, 4, 16, 1.2, 10],
  [33, 70, 2, 12, 6, -20],
  [41, 92, 3, 15, 2.4, 14],
  [49, 66, 2, 10, 8, -8],
  [57, 84, 3, 13, 4.6, 22],
  [64, 74, 2, 12, 0.8, -16],
  [71, 90, 4, 17, 5.4, 12],
  [78, 62, 2, 11, 2, -10],
  [85, 80, 3, 14, 7.2, 16],
  [92, 70, 2, 12, 3, -14],
  [13, 95, 2, 13, 9, 8],
  [67, 96, 2, 15, 10, -6],
] as const;

export function Motes({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("motes pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {motes.map(([left, top, size, dur, delay, dx], i) => (
        <span
          key={i}
          className="mote"
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              width: size,
              height: size,
              animationDuration: `${dur}s`,
              animationDelay: `${delay}s`,
              "--dx": `${dx}px`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
