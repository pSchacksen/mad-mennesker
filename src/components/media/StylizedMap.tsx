import { BrandIcon } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { cn } from "@/lib/cn";

/**
 * Stiliseret, illustreret "kort" — IKKE et geografisk præcist kort.
 * Viser stemning og placeringen "Slotspladsen" som ide. Den rigtige vej
 * findes via rutevejledningslinket.
 */
export function StylizedMap({ className }: { className?: string }) {
  return (
    <figure className={cn("relative isolate overflow-hidden bg-linen text-forest", className)}>
      <svg viewBox="0 0 600 600" className="absolute inset-0 h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
        <g fill="none" stroke="#173B30" strokeLinecap="round">
          <path d="M-20 140 C 120 160, 220 90, 330 120 S 520 200, 640 170" strokeWidth="26" opacity=".07" />
          <path d="M-20 420 L 640 360" strokeWidth="14" opacity=".12" />
          <path d="M120 -20 L 210 640" strokeWidth="12" opacity=".12" />
          <path d="M430 -20 C 400 160, 470 300, 420 640" strokeWidth="12" opacity=".12" />
          <path d="M-20 260 L 640 300" strokeWidth="6" opacity=".1" />
          <path d="M300 -20 L 330 640" strokeWidth="5" opacity=".1" />
          <path d="M-20 540 L 640 500" strokeWidth="5" opacity=".1" />
        </g>
        {/* Pladsen */}
        <rect x="235" y="265" width="150" height="110" rx="6" fill="#C3A46B" opacity=".2" />
        <rect x="235" y="265" width="150" height="110" rx="6" fill="none" stroke="#7A5E2C" strokeDasharray="4 6" strokeWidth="1.5" />
        <circle cx="310" cy="320" r="70" fill="none" stroke="#C3A46B" strokeWidth="1" opacity=".6" />
        <circle cx="310" cy="320" r="110" fill="none" stroke="#C3A46B" strokeWidth="1" opacity=".35" />
        <circle cx="310" cy="320" r="150" fill="none" stroke="#C3A46B" strokeWidth="1" opacity=".2" />
        {/* Kompas */}
        <g transform="translate(530 70)" stroke="#7A5E2C" fill="none" strokeWidth="1.5">
          <circle r="26" />
          <path d="M0 -20 L5 0 L0 20 L-5 0 Z" fill="#7A5E2C" opacity=".6" />
        </g>
        <text x="530" y="118" textAnchor="middle" fontSize="13" fill="#7A5E2C" fontFamily="serif" fontStyle="italic">N</text>
      </svg>
      <VectorLayer name="leaf-scatter" className="inset-0 h-full w-full opacity-70" />

      {/* Nål */}
      <div className="absolute top-[53%] left-[51.5%] -translate-x-1/2 -translate-y-full">
        <span className="absolute top-full left-1/2 size-4 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-terracotta/50" />
        <div className="relative flex flex-col items-center">
          <span className="flex size-14 items-center justify-center rounded-full bg-forest text-brass shadow-lg ring-4 ring-cream">
            <BrandIcon name="fork-knife" className="size-7" />
          </span>
          <span className="h-4 w-0.5 bg-forest" />
        </div>
      </div>
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-ivory/85 px-4 py-2 text-xs font-semibold tracking-[0.16em] uppercase backdrop-blur-sm">
        Slotspladsen · Randers <span className="ml-1 font-normal tracking-normal normal-case text-ink-muted">(illustration)</span>
      </figcaption>
    </figure>
  );
}
