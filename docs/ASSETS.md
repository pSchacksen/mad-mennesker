# Designpakke V1 — anvendelse på hjemmesiden

Filerne ligger i `public/brand/mad-og-mennesker/` (uændret struktur fra ZIP'en). Al adgang går gennem
`src/lib/brand-assets.ts`, og den levende oversigt med forhåndsvisning findes i **Design Lab → Assets** (`/design-lab/`).

SVG-ikoner og -ornamenter gengives som CSS-masker (`BrandIcon`, `Ornament`), så de messingtegnede filer kan
farves med `currentColor` og holde kontrast på både mørke og lyse flader. Teksturerne serveres i en 1280 px
web-version (`*-1280.webp`, genereret af `npm run images`) med lav opacity.

## Synligt anvendt i første preview (40 af 52 filer)

| Asset | Hvor |
|---|---|
| `ornaments/crossed-cutlery.svg` | Hero A (emblem der drejer ind), køkken-sektionens afslutning, sidetop på Menukort og Besøg os, 404 |
| `ornaments/round-seal.svg` | Velkomst (roterende stempel med tekstbane), Hero B, footer, sidetop på Om os og Reservation |
| `ornaments/flourish.svg` | Separator i velkomst, menukort, Hero B, mobilmenu, Selskaber, Reservation, Tavlen |
| `ornaments/corner-botanical.svg` | Hjørner på menukortet, selskabssektionen, sidetop på Selskaber |
| `ornaments/four-point-star.svg` | Aktiv ret i køkken-sektionen, aftenstjerne i dag/aften, menulinjer, footer, Story B |
| `ornaments/arches.svg` | Hero C, Om os |
| `backgrounds/vector/globe-lights.svg` | Hero A + C (glød-animation), dag/aften om aftenen, footer, alle sidetoppe, mobilmenu |
| `backgrounds/vector/botanical-corner.svg` | Velkomst (parallax), Story B |
| `backgrounds/vector/editorial-circles.svg` | "Mere end et måltid" (parallax), Hero B |
| `backgrounds/vector/arched-panels.svg` | Selskaber, Reservation |
| `backgrounds/vector/ornamental-frame.svg` | Ramme om menukortet, selskabsformularen og reservationskortet |
| `backgrounds/vector/leaf-scatter.svg` | Det stiliserede kort |
| `backgrounds/vector/fine-grain.svg` | Kornstruktur på mørke sektioner (`.grain`) |
| `backgrounds/textures/ivory-plaster.webp` | Lyse editorial sektioner |
| `backgrounds/textures/forest-leaf-shadow.webp` | "Mere end et måltid", Hero C, Tavlen, sidetoppe |
| `backgrounds/textures/golden-bokeh.webp` | Aftenstemning i dag/aften, footer |
| `backgrounds/textures/linen-cloth.webp` | Madpladsholdere, menukort, Selskaber, Reservation |
| `backgrounds/textures/walnut-wood.webp` | Træramme om Tavlen (menuvariant B) |
| `backgrounds/textures/olive-branches.webp` | Det stiliserede kort |
| `backgrounds/textures/forest-tile.webp` | Køkken-sektionen, Om os |
| Alle 23 `icons/svg/*` | Menukort, køkken, dag/aften, selskaber, kontaktlinjer, knapper (se Design Lab for detaljer) |

## Bevidst fravalgt (for nu)

- `textures/green-brushstroke`, `textures/terracotta-brushstroke`, `textures/aged-brass`: for dominerende bag tekst; kan bruges til kampagner/sociale medier.
- `vector/deep-forest`, `vector/warm-cream`, `vector/dark-olive`, `vector/terracotta-wash`: fladefarverne er i stedet design tokens i CSS (lettere og skarpere).
- `vector/linen-stripes`: konkurrerede med linned-teksturen.
- PNG-versionerne ligger klar som fallback, men SVG bruges overalt.
