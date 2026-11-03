# Designpakke V1 — anvendelse på hjemmesiden

Filerne ligger i `public/brand/mad-og-mennesker/` (uændret struktur fra ZIP'en). Al adgang går gennem
`src/lib/brand-assets.ts`, og den levende oversigt med forhåndsvisning findes i **Design Lab → Assets** (`/design-lab/`).

## Princip: kun skarpe assets

Siden bruger udelukkende grafik, der er skarp på alle skærme:

- **Vektor (SVG)** til ornamenter, ikoner og baggrundsmotiver. Ikoner og ornamenter gengives som CSS-masker
  (`BrandIcon`, `Ornament`), så de kan farves med `currentColor` og holde kontrast på mørke og lyse flader.
- **Fotos vises aldrig større end deres kildeopløsning.** Visualiseringerne fra PDF'erne er ca. 1.240–1.320 px
  brede, så de vises i buer, cirkler og kort på højst ca. 30 rem (480 px CSS = 960 px på retina) i stedet for fuld skærmbredde.
- **Globelamperne** i sidetoppe og hero er tegnet i CSS (radiale gradienter), så de er knivskarpe i enhver opløsning.

## Synligt anvendt (35 filer + 4 fotos)

| Asset | Hvor |
|---|---|
| `ornaments/crossed-cutlery.svg` | Hero A (emblem), "Find os"-kortet, sidetop på Menukort og Besøg os, 404 |
| `ornaments/round-seal.svg` | Hero B og Story A (roterende segl med tekstbane), footer, sidetop på Om os og Reservation |
| `ornaments/flourish.svg` | Hero B, menukort (begge varianter), sidetoppe, mobilmenu, Selskaber, Reservation |
| `ornaments/corner-botanical.svg` | Hjørner på menukortet, frokost/aften-sektionen, Selskaber |
| `ornaments/four-point-star.svg` | Skilletegn i Klassikerne, aftenstjerne, Story B, menulinjer, footer |
| `ornaments/arches.svg` | Om os |
| `backgrounds/vector/botanical-corner.svg` | Story A |
| `backgrounds/vector/globe-lights.svg` | Mobilmenuen |
| `backgrounds/vector/arched-panels.svg` | "Find os"-kortet, Reservation |
| `backgrounds/vector/ornamental-frame.svg` | Ramme om menukortet, selskabsformularen og reservationskortet |
| `backgrounds/vector/leaf-scatter.svg` | Det stiliserede kort på Besøg os |
| `backgrounds/vector/fine-grain.svg` | Diskret kornstruktur på mørke sektioner (`.grain`) |
| 23 `icons/svg/*` | Menukort, Klassikerne, frokost/aften, selskaber, kontaktlinjer, knapper |
| Fotos: facade, dining, bar, private-corner | Hero-varianterne, Story, frokost/aften, sidetoppe (beskåret og optimeret til AVIF/WebP/JPEG) |

## Bevidst fravalgt

- **Alle 11 rasterteksturer** (`backgrounds/textures/*`): de er leveret i for lav opløsning til at blive strakt over
  hele skærmbredder og så slørede ud på store skærme. Fladerne er i stedet rene farver fra paletten plus vektorgrafik.
  Teksturerne kan fint bruges på sociale medier eller i tryk i små formater.
- `vector/editorial-circles`, `vector/linen-stripes`: fyldte uden at tilføre noget i det strammere layout.
- `vector/deep-forest`, `vector/warm-cream`, `vector/dark-olive`, `vector/terracotta-wash`: fladefarverne er design tokens i CSS.
- PNG-versionerne ligger klar som fallback, men SVG bruges overalt.
