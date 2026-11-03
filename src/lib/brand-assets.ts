/**
 * CENTRAL REGISTRERING AF DESIGNPAKKE V1
 * ──────────────────────────────────────
 * Alle stier til grafik fra `public/brand/mad-og-mennesker/` går gennem denne fil.
 * Komponenterne kender kun navnene — aldrig stierne. `usage` dokumenterer, hvor
 * hvert asset bruges på siden, og vises også i Design Lab under "Assets".
 * Kilde: public/brand/mad-og-mennesker/asset-manifest.json
 */

const BASE = "/brand/mad-og-mennesker";

export const brandColors = {
  forest: "#173B30",
  brass: "#C3A46B",
  cream: "#F4EDE0",
  walnut: "#654632",
  terracotta: "#B66F51",
} as const;

export const iconNames = [
  "fork-knife", "cloche", "wine-glass", "beer-glass", "coffee-cup", "calendar", "people",
  "location", "phone", "envelope", "heart", "plate", "leaf", "candle", "chef-hat", "clock",
  "arrow-up-right", "arrow-right", "instagram", "glass-toast", "branch", "private-dining", "smorrebrod",
] as const;
export type BrandIconName = (typeof iconNames)[number];

export const ornamentNames = [
  "flourish", "crossed-cutlery", "round-seal", "corner-botanical", "four-point-star", "arches",
] as const;
export type OrnamentName = (typeof ornamentNames)[number];

export const textureNames = [
  "forest-leaf-shadow", "ivory-plaster", "green-brushstroke", "terracotta-brushstroke", "olive-botanical",
  "aged-brass", "walnut-wood", "forest-tile", "linen-cloth", "golden-bokeh", "olive-branches",
] as const;
export type TextureName = (typeof textureNames)[number];

export const vectorNames = [
  "botanical-corner", "globe-lights", "editorial-circles", "arched-panels", "linen-stripes", "ornamental-frame",
  "leaf-scatter", "fine-grain", "deep-forest", "warm-cream", "dark-olive", "terracotta-wash",
] as const;
export type VectorName = (typeof vectorNames)[number];

export const iconSrc = (name: BrandIconName, format: "svg" | "png" = "svg") => `${BASE}/icons/${format}/${name}.${format}`;
export const ornamentSrc = (name: OrnamentName, format: "svg" | "png" = "svg") =>
  `${BASE}/ornaments/${format}/${name}.${format}`;
/** Teksturer serveres i en web-optimeret 1280px-version (se scripts/optimize-images.mjs). */
export const textureSrc = (name: TextureName, size: "1280" | "full" = "1280") =>
  `${BASE}/backgrounds/textures/${name}${size === "full" ? "" : "-1280"}.webp`;
export const vectorSrc = (name: VectorName) => `${BASE}/backgrounds/vector/${name}.svg`;

/** Hvor hvert asset er anvendt — holdes ajour sammen med komponenterne. */
export const assetUsage: Record<string, string[]> = {
  // Ornamenter (vektor — skarpe i alle størrelser)
  "ornaments/crossed-cutlery": ["Hero A: emblem over ordmærket", "Forside: \"Find os\"-kortet", "Sidetop på Menukort og Besøg os", "404-siden"],
  "ornaments/round-seal": ["Hero B + Story A: roterende segl med tekstbane", "Footer: segl ved ordmærket", "Sidetop på Om os og Reservation"],
  "ornaments/flourish": ["Hero B", "Menukort (bistrokort + tavle): under titlen", "Sidetoppe", "Mobilmenu", "Selskaber", "Reservation"],
  "ornaments/corner-botanical": ["Menukort (bistrokort): hjørneornamenter", "Forside: frokost/aften-sektionen", "Selskaber"],
  "ornaments/four-point-star": ["Klassikerne: skilletegn i retlisten", "Frokost/aften: aftenstjerne", "Story B: kapitelmarkør", "Menukort: markør ved retter uden pris", "Footer"],
  "ornaments/arches": ["Om os: buemotiv i idé-sektionen"],
  // Vektorbaggrunde
  "vector/botanical-corner": ["Story A: botanisk gren ved billedet"],
  "vector/globe-lights": ["Mobilmenu (desktop-lamperne er tegnet i CSS, så de er skarpe i alle opløsninger)"],
  "vector/arched-panels": ["Forside: \"Find os\"-kortet", "Reservation-siden"],
  "vector/ornamental-frame": ["Menukort (bistrokort): ramme (border-image)", "Selskaber: ramme om forespørgsel", "Reservation: ramme om preview-kortet"],
  "vector/leaf-scatter": ["Stiliseret kort (Besøg os)"],
  "vector/fine-grain": ["Mørke sektioner: diskret kornstruktur via .grain"],
  // Ikoner
  "icons/fork-knife": ["Ordmærke i header, favicon-motiv, kort-nål, Klassikerne, Story-kapitel"],
  "icons/cloche": ["Menukort: varme klassikere", "Klassikerne: wienerschnitzel"],
  "icons/wine-glass": ["Menukort: drikke/vin", "Frokost/aften-switch: aften"],
  "icons/beer-glass": ["Menukort: øl"],
  "icons/coffee-cup": ["Menukort: kaffe", "Frokost/aften-switch: frokost"],
  "icons/glass-toast": ["Menukort: snaps/sodavand", "Selskaber: fejringer"],
  "icons/smorrebrod": ["Menukort + Klassikerne: smørrebrød"],
  "icons/plate": ["Klassikerne + menukort: stjerneskud"],
  "icons/chef-hat": ["Klassikerne + menukort: dagens ret"],
  "icons/heart": ["Menukort: dessert", "Om os"],
  "icons/calendar": ["Alle Reserver bord-knapper", "Reservation-siden"],
  "icons/people": ["Selskaber", "Story-kapitel", "Om os"],
  "icons/private-dining": ["Selskaber: firmafrokost"],
  "icons/candle": ["Selskaber", "Story-kapitel", "Om os"],
  "icons/location": ["Kontaktlinjer, Besøg os, mobilmenu"],
  "icons/phone": ["Kontaktlinjer"],
  "icons/envelope": ["Kontaktlinjer, selskabsforespørgsel, reservation"],
  "icons/clock": ["Åbningstider", "Find os", "Reservation"],
  "icons/instagram": ["Footer"],
  "icons/arrow-right": ["Tekstlinks, tavle-indeks"],
  "icons/arrow-up-right": ["Eksterne links (rutevejledning)"],
  "icons/leaf": ["Om os: værdier"],
  "icons/branch": ["Om os: værdier"],
};
