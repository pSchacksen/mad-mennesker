import type { CSSProperties } from "react";
import photos from "@/content/generated/photos.json";
import { cn } from "@/lib/cn";

export type PhotoName = keyof typeof photos;

/**
 * Alle fotos er konceptvisualiseringer (PDF-visualiseringerne og den
 * AI-genererede serie fra november 2026) — ikke dokumentation af de færdige
 * lokaler eller de præcise serveringer. Alt-teksterne er samlet her, så de
 * er ens overalt. Se også src/content/photo-library.ts.
 */
export const photoAlt: Record<PhotoName, string> = {
  "mad-fiskefilet": "Visualisering af smørrebrød med sprødstegt rødspætte, remoulade, radiser, dild og citron på rugbrød",
  "mad-honsesalat": "Visualisering af smørrebrød med hønsesalat, sprød bacon, stegte champignoner og karse på rugbrød",
  "mad-leverpostej": "Visualisering af smørrebrød med lun leverpostej, sprød bacon, svampe og syltede agurker på rugbrød",
  "mad-rullepolse": "Visualisering af smørrebrød med rullepølse, sky, rå løgringe og karse på rugbrød",
  "mad-kartoffel": "Visualisering af kartoffelmad med nye kartofler, mayonnaise, purløg og sprøde løg på rugbrød",
  "dessert-aeblekage": "Visualisering af gammeldags æblekage i glasskål med æblemos, ristet rasp, flødeskum og ribsgelé",
  "dessert-citronfromage": "Visualisering af citronfromage i glasskål med flødeskum, ristede mandler og citronskal",
  "dessert-pandekager": "Visualisering af foldede pandekager med vaniljeis, hjemmelavet syltetøj og friske bær",
  facade:
    "Visualisering af Mad & Mennesker set udefra om aftenen: mørkegrøn facade med messingbogstaver, globelamper i vinduerne og borde med levende lys på pladsen",
  dining:
    "Visualisering af spisesalen: borde i mørkt træ, grønne og karamelfarvede velourstole, globelamper og masser af grønne planter",
  bar: "Visualisering af baren: buet bardisk i lyst træ med varmt lys, grønne barstole, hylder med glas og flasker og Mad & Mennesker på den grønne væg",
  "private-corner":
    "Visualisering af et hyggeligt hjørne med en lille gruppe gæster om bordet, trappen op til en hems og varmt lys fra globelamperne",
  "mad-sild": "Visualisering af smørrebrød med marinerede sild, æg, rødløg og dild på rugbrød, med et glas hvidvin og levende lys i baggrunden",
  "mad-aeg-rejer": "Visualisering af smørrebrød med æg og håndpillede rejer, dild og citron på rugbrød",
  "mad-roastbeef": "Visualisering af smørrebrød med rosa roastbeef, ristede løg, peberrod og karse, med en fadøl i baggrunden",
  "mad-frokostbord": "Visualisering af et frokostbord med flere slags smørrebrød på grønne tallerkener og en kold øl",
  "mad-stjerneskud": "Visualisering af stjerneskud med paneret fisk, rejer, asparges, rogn, dressing og citron",
  "mad-stjerneskud-tomat": "Visualisering af stjerneskud med stegt fisk, rejer, rogn, salat og citron på en hvid tallerken",
  "mad-pariserbof": "Visualisering af pariserbøf på ristet brød med æggeblomme, kapers, rødbeder, peberrod og rå løg",
  "mad-wienerschnitzel": "Visualisering af wienerschnitzel med citron, kapers, ærter, kartofler og brunet smør",
  "mad-wienerschnitzel-ol": "Visualisering af wienerschnitzel med citron, kapers, salat og kartofler, med en fadøl ved siden af",
  "rum-spisesal": "Visualisering af spisesalen med mørkegrønne vægge, globelamper, borde i mørkt træ og planter",
  "rum-bar": "Visualisering af baren med grønne velourbarstole, flasker på hylderne og gæster ved et bord",
  "rum-aftengaester": "Visualisering af en aften i restauranten med gæster ved bordene, levende lys og globelamper",
  "rum-hjorne": "Visualisering af et hyggeligt hjørne med en grøn velourbænk, gæster om bordet og en trappe i baggrunden",
  "bord-opdaekket": "Visualisering af et opdækket bord med hør-dug, bestik, grøn serviet og et fyrfadslys",
  "bord-blomster": "Visualisering af et opdækket bord med hør-dug, markblomster i en messingvase og et fyrfadslys",
  "stemning-lamper": "Stemningsbillede med globelamper, grønne blade og varmt lys mod en grøn væg",
  "stemning-vaeg": "Stemningsbillede af en grøn væg i varmt lys med globelamper og opdækkede borde i baggrunden",
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
