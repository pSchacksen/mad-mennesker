import { cn } from "@/lib/cn";

/**
 * Hængende globelamper tegnet i CSS — skarpe i enhver opløsning.
 * Inspireret af globelamperne i referencebillederne.
 */
const lamps = [
  { left: "6%", drop: 30, size: 46, delay: "0s" },
  { left: "31%", drop: 70, size: 34, delay: "1.2s" },
  { left: "58%", drop: 22, size: 40, delay: "0.6s" },
  { left: "92%", drop: 84, size: 30, delay: "1.8s" },
];

export function GlobeLamps({ className, count = 4 }: { className?: string; count?: number }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-x-0 top-[4.75rem] md:top-[5.5rem]", className)}>
      {lamps.slice(0, count).map((l) => (
        <span key={l.left} className="absolute top-0 flex origin-top flex-col items-center max-sm:scale-[0.65]" style={{ left: l.left }}>
          <span className="w-px bg-gradient-to-b from-brass/0 via-brass/50 to-brass/80" style={{ height: l.drop }} />
          <span className="-mt-px h-1.5 w-2.5 rounded-t-sm bg-brass/80" />
          <span
            className="animate-glow rounded-full"
            style={{
              width: l.size,
              height: l.size,
              animationDelay: l.delay,
              background: "radial-gradient(circle at 38% 32%, #fffaf0 0%, #ffe9c2 32%, #f2c98a 62%, rgba(195,164,107,0.55) 100%)",
              boxShadow: `0 0 ${l.size * 0.9}px ${l.size * 0.25}px rgba(255,214,150,0.32), 0 0 ${l.size * 2.4}px ${l.size * 0.6}px rgba(255,200,120,0.12)`,
            }}
          />
        </span>
      ))}
    </div>
  );
}
