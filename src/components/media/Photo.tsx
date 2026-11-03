import type { CSSProperties } from "react";
import photos from "@/content/generated/photos.json";
import { cn } from "@/lib/cn";

export type PhotoName = keyof typeof photos;

/**
 * Konceptvisualiseringer af restauranten (udtrukket fra referencematerialet).
 * Alt-teksterne er samlet her, så de er ens overalt.
 */
export const photoAlt: Record<PhotoName, string> = {
  facade:
    "Visualisering af Mad & Mennesker set udefra om aftenen: mørkegrøn facade med messingbogstaver, globelamper i vinduerne og borde med levende lys på pladsen",
  dining:
    "Visualisering af spisesalen: borde i mørkt træ, grønne og karamelfarvede velourstole, globelamper og masser af grønne planter",
  bar: "Visualisering af baren: buet bardisk i lyst træ med varmt lys, grønne barstole, hylder med glas og flasker og Mad & Mennesker på den grønne væg",
  "private-corner":
    "Visualisering af et hyggeligt hjørne med en lille gruppe gæster om bordet, trappen op til en hems og varmt lys fra globelamperne",
};

type Props = {
  name: PhotoName;
  alt?: string;
  sizes?: string;
  className?: string;
  imgClassName?: string;
  style?: CSSProperties;
  imgStyle?: CSSProperties;
  priority?: boolean;
  /** Dekorativ brug (fx sløret baggrund) — skjules for skærmlæsere. */
  decorative?: boolean;
};

/** Responsivt billede med AVIF/WebP/JPEG, srcset og sløret placeholder. */
export function Photo({
  name,
  alt,
  sizes = "100vw",
  className,
  imgClassName,
  style,
  imgStyle,
  priority,
  decorative,
}: Props) {
  const meta = photos[name];
  const set = (ext: string) => meta.widths.map((w) => `/images/photos/${name}-${w}.${ext} ${w}w`).join(", ");
  const fallback = `/images/photos/${name}-${meta.widths[Math.min(1, meta.widths.length - 1)]}.jpg`;
  return (
    <picture className={cn("block", className)} style={style}>
      <source type="image/avif" srcSet={set("avif")} sizes={sizes} />
      <source type="image/webp" srcSet={set("webp")} sizes={sizes} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={fallback}
        srcSet={set("jpg")}
        sizes={sizes}
        width={meta.width}
        height={meta.height}
        alt={decorative ? "" : (alt ?? photoAlt[name])}
        aria-hidden={decorative || undefined}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        draggable={false}
        className={cn("h-full w-full object-cover", imgClassName)}
        style={{
          backgroundImage: `url(${meta.blur})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          ...imgStyle,
        }}
      />
    </picture>
  );
}
