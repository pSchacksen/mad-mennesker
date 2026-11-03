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
  // Ornamenter
  "ornaments/crossed-cutlery": ["Hero A: emblem, der drejer ind over ordmærket", "Køkken-sektionen: afslutningspanel", "Sidetop på Menukort og Besøg os", "404-siden"],
  "ornaments/round-seal": ["Velkomst: roterende stempel med tekstbane", "Hero B: segl ved billedet", "Footer: roterende segl over afslutningshilsen", "Sidetop på Om os og Reservation"],
  "ornaments/flourish": ["Velkomst: separator under overskriften", "Menukort (bistrokort): under titlen", "Hero B, mobilmenu, Selskaber, Reservation, Tavlen"],
  "ornaments/corner-botanical": ["Menukort (bistrokort): hjørneornamenter", "Selskaber (forside): ved billedet", "Sidetop på Selskaber"],
  "ornaments/four-point-star": ["Køkken: markør på aktiv ret", "Dag/aften: stjerne om aftenen", "Menukort: markør ved retter uden pris", "Footer: messingdetaljer", "Story B: kapitelmarkør"],
  "ornaments/arches": ["Hero C: stort buemotiv bag billederne", "Om os: buemotiv i idé-sektionen"],
  // Vektorbaggrunde
  "vector/globe-lights": ["Hero A + C: hængende globelamper (glød-animation)", "Dag/aften: lamper ved aften", "Footer", "Alle sidetoppe", "Mobilmenu"],
  "vector/botanical-corner": ["Velkomst A: botanisk gren med parallax", "Story B: over det sticky billede"],
  "vector/editorial-circles": ["Mere end et måltid: cirkler med parallax bag collagen", "Hero B: baggrund"],
  "vector/arched-panels": ["Selskaber (forside): buede paneler", "Reservation-siden", "Sidetop på Selskaber"],
  "vector/ornamental-frame": ["Menukort (bistrokort): ramme (border-image)", "Selskaber: ramme om forespørgsel", "Reservation: ramme om preview-kortet"],
  "vector/leaf-scatter": ["Stiliseret kort (forside og Besøg os)"],
  "vector/fine-grain": ["Mørke sektioner: kornstruktur via .grain"],
  // Teksturer
  "textures/ivory-plaster": ["Lyse editorial sektioner: velkomst, menukort, dag/aften (frokost), Om os, Besøg os"],
  "textures/forest-leaf-shadow": ["Mere end et måltid", "Hero C", "Menukort (tavle)", "Sidetoppe", "Pladsholdere i mørk tone"],
  "textures/golden-bokeh": ["Dag/aften: aftenlys", "Footer: varm glød"],
  "textures/linen-cloth": ["Madpladsholdere (dug)", "Menukort (bistrokort)", "Selskaber", "Reservation"],
  "textures/walnut-wood": ["Menukort (tavle): træramme"],
  "textures/olive-branches": ["Stiliseret kort"],
  "textures/forest-tile": ["Køkken-sektionen", "Om os: værdier"],
  // Ikoner
  "icons/fork-knife": ["Ordmærke i header, favicon-motiv, kort-nål, menuknapper"],
  "icons/cloche": ["Menukort: varme klassikere", "Køkken: wienerschnitzel"],
  "icons/wine-glass": ["Menukort: drikke/vin", "Dag/aften-switch: aften"],
  "icons/beer-glass": ["Menukort: øl"],
  "icons/coffee-cup": ["Menukort: kaffe", "Dag/aften-switch: frokost"],
  "icons/glass-toast": ["Menukort: snaps/sodavand", "Selskaber: fejringer", "Dag/aften"],
  "icons/smorrebrod": ["Menukort + køkken: smørrebrød"],
  "icons/plate": ["Køkken: stjerneskud"],
  "icons/chef-hat": ["Køkken + menukort: dagens ret"],
  "icons/heart": ["Menukort: dessert", "Om os"],
  "icons/calendar": ["Alle Reserver bord-knapper", "Reservation-siden"],
  "icons/people": ["Selskaber", "Dag/aften", "Om os"],
  "icons/private-dining": ["Selskaber: firmafrokost"],
  "icons/candle": ["Selskaber", "Dag/aften", "Om os"],
  "icons/location": ["Kontaktlinjer (find os, footer, besøg), mobilmenu"],
  "icons/phone": ["Kontaktlinjer"],
  "icons/envelope": ["Kontaktlinjer, selskabsforespørgsel"],
  "icons/clock": ["Åbningstider", "Reservation"],
  "icons/instagram": ["Footer"],
  "icons/arrow-right": ["Tekstlinks, køkken-swipehint, tavle-indeks"],
  "icons/arrow-up-right": ["Eksterne links (rutevejledning)"],
  "icons/leaf": ["Om os: værdier"],
  "icons/branch": ["Om os: værdier"],
};
