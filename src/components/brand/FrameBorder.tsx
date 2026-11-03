import { vectorSrc } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/**
 * Tegner designpakkens `ornamental-frame.svg` som border-image, så rammen
 * strækker sig korrekt til enhver bredde/højde uden at blive forvrænget.
 */
export function FrameBorder({ className, width = 36 }: { className?: string; width?: number }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        borderStyle: "solid",
        borderWidth: width,
        borderImageSource: `url("${vectorSrc("ornamental-frame")}")`,
        borderImageSlice: 60,
        borderImageRepeat: "stretch",
      }}
    />
  );
}
