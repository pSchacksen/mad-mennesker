import type { CSSProperties } from "react";
import { cn } from "@/lib/cn";
import { textureSrc, vectorSrc, type TextureName, type VectorName } from "@/lib/brand-assets";

/** Tekstur fra designpakken som diskret baggrundslag. Altid dekorativ. */
export function Texture({
  name,
  opacity = 0.35,
  blend = "multiply",
  className,
  style,
}: {
  name: TextureName;
  opacity?: number;
  blend?: CSSProperties["mixBlendMode"];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 bg-cover bg-center", className)}
      style={{ backgroundImage: `url("${textureSrc(name)}")`, opacity, mixBlendMode: blend, ...style }}
    />
  );
}

/** Transparent vektor-overlay fra designpakken. */
export function VectorLayer({
  name,
  className,
  style,
  fit = "cover",
}: {
  name: VectorName;
  className?: string;
  style?: CSSProperties;
  fit?: "cover" | "contain";
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={vectorSrc(name)}
      alt=""
      aria-hidden
      loading="lazy"
      decoding="async"
      draggable={false}
      className={cn("pointer-events-none absolute select-none", className)}
      style={{ objectFit: fit, ...style }}
    />
  );
}
