import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { iconSrc, ornamentSrc, type BrandIconName, type OrnamentName } from "@/lib/brand-assets";

type MaskProps = {
  className?: string;
  /** Meningsfuldt navn, hvis ikonet bærer information. Uden label er det dekorativt. */
  label?: string;
  style?: CSSProperties;
};

/**
 * Gengiver en SVG fra designpakken som CSS-maske, så farven følger `currentColor`.
 * Dermed kan de samme messing-tegnede filer bruges på både mørke og lyse flader
 * med korrekt kontrast, uden at filerne skal kopieres eller ændres.
 */
function Mask({ src, className, label, style }: MaskProps & { src: string }) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-block shrink-0 bg-current", className)}
      style={{
        WebkitMaskImage: `url("${src}")`,
        maskImage: `url("${src}")`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}

export function BrandIcon({ name, className, ...rest }: MaskProps & { name: BrandIconName }) {
  return <Mask src={iconSrc(name)} className={cn("size-6", className)} {...rest} />;
}

export function Ornament({ name, className, ...rest }: MaskProps & { name: OrnamentName }) {
  return <Mask src={ornamentSrc(name)} className={cn("size-16", className)} {...rest} />;
}
