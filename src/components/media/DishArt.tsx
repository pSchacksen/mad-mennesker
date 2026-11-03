import { BrandIcon } from "@/components/brand/BrandIcon";
import { Texture } from "@/components/brand/Layers";
import type { BrandIconName } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

/**
 * Udskiftelig pladsholder for madfotos. Viser en stiliseret tallerken på
 * linneddug med rettens ikon fra designpakken. Erstattes automatisk af et rigtigt
 * foto, når `image` udfyldes i content/menu.ts.
 */
export function DishArt({
  icon,
  label,
  className,
  tone = "linen",
}: {
  icon: BrandIconName;
  label: string;
  className?: string;
  tone?: "linen" | "forest";
}) {
  const dark = tone === "forest";
  return (
    <div
      role="img"
      aria-label={`Pladsholder: foto af ${label} følger`}
      className={cn(
        "relative isolate flex items-center justify-center overflow-hidden",
        dark ? "bg-olive text-brass" : "bg-linen text-forest",
        className,
      )}
    >
      <Texture name={dark ? "forest-leaf-shadow" : "linen-cloth"} opacity={dark ? 0.9 : 0.85} blend={dark ? "normal" : "multiply"} />
      {/* Tallerken */}
      <div className="relative aspect-square w-[62%] max-w-[22rem] rounded-full bg-ivory shadow-[0_30px_60px_-25px_rgba(23,59,48,0.55),inset_0_0_0_10px_rgba(244,237,224,1),inset_0_0_0_11px_rgba(195,164,107,0.6)] transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:rotate-[8deg]">
        <div className="absolute inset-[16%] rounded-full border border-brass/40" />
        <BrandIcon name={icon} className="absolute inset-[30%] size-auto text-brass-ink" />
      </div>
      <span className="absolute bottom-4 left-4 rounded-full border border-current/25 bg-ivory/70 px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-forest uppercase backdrop-blur-sm">
        Foto følger
      </span>
    </div>
  );
}
