# Designpakke V1 — anvendelse på hjemmesiden

Filerne ligger i `public/brand/mad-og-mennesker/` (uændret struktur fra ZIP'en). Al adgang går gennem
`src/lib/brand-assets.ts`, og den levende oversigt med forhåndsvisning findes i **Design Lab → Assets** (`/design-lab/`).

## Princip: kun skarpe assets

Siden bruger udelukkende grafik, der er skarp på alle skærme:

- **Vektor (SVG)** til ornamenter, ikoner og baggrundsmotiver. Ikoner og ornamenter gengives som CSS-masker
  (`BrandIcon`, `Ornament`), så de kan farves med `currentColor` og holde kontrast på mørke og lyse flader.
- **Fotos vises aldrig større end deres kildeopløsning.** De 17 AI-visualiseringer er 1.448–1.672 px brede, så skarpe
  fotos vises højst ca. 760–880 px CSS brede. Kun de bløde stemningsbilleder (`stemning-lamper`, `stemning-vaeg`) bruges
  i fuld bredde, dæmpet og let sløret. Se **`docs/BILLEDER.md`** for præcis hvilket billede der bruges hvor.
- **Globelamperne** i sidetoppe og hero er tegnet i CSS (radiale gradienter), så de er knivskarpe i enhver opløsning.
- **Intro-loaderne** (lampe, stearinlys, tallerken og bestik, dørene) er tegnet i CSS og SVG af samme grund.

## Synligt anvendt (35 filer + 17 fotos)

| Asset | Hvor |
|---|---|
| `ornaments/crossed-cutlery.svg` | Hero A (emblem), "Find os"-kortet, sidetop på Menukort og Besøg os, 404 |
| `ornaments/round-seal.svg` | Velkomst (roterende segl med tekstbane), loaderen "Seglet", footer, sidetop på Om os og Reservation |
| `ornaments/flourish.svg` | Menukortet, loaderen "Tre løfter", sidetoppe, mobilmenu, Selskaber, Reservation |
| `ornaments/corner-botanical.svg` | Hjørner på menukortet, frokost/aften-sektionen, Selskaber |
| `ornaments/four-point-star.svg` | Skilletegn i Klassikerne, aftenstjerne, menulinjer, footer |
| `ornaments/arches.svg` | Om os |
| `backgrounds/vector/botanical-corner.svg` | Velkomstsektionen |
| `backgrounds/vector/globe-lights.svg` | Mobilmenuen |
| `backgrounds/vector/arched-panels.svg` | "Find os"-kortet, Reservation |
| `backgrounds/vector/ornamental-frame.svg` | Ramme om menukortet, selskabsformularen og reservationskortet |
| `backgrounds/vector/leaf-scatter.svg` | Det stiliserede kort på Besøg os |
| `backgrounds/vector/fine-grain.svg` | Diskret kornstruktur på mørke sektioner og intro-loaderne |
| 23 `icons/svg/*` | Menukort, Klassikerne, frokost/aften, selskaber, kontaktlinjer, knapper |
| 17 fotos (mad, rum, bord, stemning) + facade | Se `docs/BILLEDER.md`. Optimeret til AVIF/WebP/JPEG i flere bredder |

## Bevidst fravalgt

- **Alle 11 rasterteksturer** (`backgrounds/textures/*`): de er leveret i for lav opløsning til at blive strakt over
  hele skærmbredder og så slørede ud på store skærme. Fladerne er i stedet rene farver fra paletten plus vektorgrafik.
  Teksturerne kan fint bruges på sociale medier eller i tryk i små formater.
- `vector/editorial-circles`, `vector/linen-stripes`: fyldte uden at tilføre noget i det strammere layout.
- `vector/deep-forest`, `vector/warm-cream`, `vector/dark-olive`, `vector/terracotta-wash`: fladefarverne er design tokens i CSS.
- PNG-versionerne ligger klar som fallback, men SVG bruges overalt.
