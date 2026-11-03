# Mad & Mennesker

Hjemmeside for restauranten **Mad & Mennesker** på Slotspladsen i Randers.
*God dansk mad. Gode mennesker. God tid.*

Next.js 16 (App Router, statisk eksport) · TypeScript · Tailwind CSS v4 · Motion · selvhostede skrifttyper (Cormorant + DM Sans).

## Kom i gang

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # statisk side i ./out
npm start          # server ./out lokalt
npm run check:assets   # efter build: tjek at alle billed-/brandstier findes
npm run images     # genskab optimerede fotos, teksturer og OG-billeder
```

## Sider

| Sti | Indhold |
|---|---|
| `/` | Forsiden: hero, velkomst, køkkenet (horisontal fortælling), mere end et måltid, frokost/aften-switch, menukort, selskaber, find os |
| `/menukort/` | Det fulde menukort |
| `/om-os/` | Koncept og værdier |
| `/selskaber/` | Selskaber og forespørgsel |
| `/besoeg/` | Adresse, åbningstider, kontakt, kort og "godt at vide" |
| `/reservation/` | Bordreservation (preview-tilstand indtil et bookingsystem er valgt) |
| `/design-lab/` | **Internt.** Ikke linket, `noindex`. Skift mellem designvarianter og se asset-oversigten |

## Opdatér indhold

Alt indhold, der skal kunne ændres, ligger samlet i `src/content/`. Strukturen er flad og serialiserbar, så den senere kan flyttes til fx Payload CMS.

- **`site.ts`** – adresse, telefon, e-mail, åbningstider, sociale medier, åbningsdato. Felter står som `null`, indtil de er bekræftet; siden viser så "følger snart" i stedet for at opfinde noget. Når adresse, telefon og åbningstider er udfyldt, udsendes strukturerede Schema.org-restaurantdata automatisk.
- **`menu.ts`** – kategorier, retter, beskrivelser og vejledende priser (fra forretningsplanen), dagens ret og retterne på forsiden. Sæt `menuStatus.isPreliminary = false`, når kortet er endeligt. Når der kommer madfotos, lægges de i `assets-src/photos/`, `npm run images` køres, og billednavnet sættes i rettens `image`-felt.
- **`booking.ts`** – se nedenfor.
- **`design.ts`** – hvilke designvarianter den offentlige side bruger.

## Bordreservation

Der er bevidst **ingen** egen bookingmotor, og siden lader aldrig en gæst tro, at et bord er reserveret. Når et bookingsystem er valgt, ændres kun `src/content/booking.ts`:

```ts
export const booking = { provider: "link", url: "https://…" };          // alle knapper åbner bookingsystemet
export const booking = { provider: "embed", embedUrl: "https://…" };    // /reservation/ indlejrer det
```

## Design Lab

Åbn `/design-lab/` for at sammenligne 3 hero-varianter, 2 storytelling-varianter og 2 menukort-varianter. Valget gemmes i din egen browser og slår igennem på forsiden og menukortet, så de kan ses i sammenhæng (en lille terrakotta-label viser, at du ser en ikke-standard variant). Man kan også dele et link som `/?hero=editorial&menu=tavle`. Når der er truffet en beslutning, ændres `defaultVariants` i `src/content/design.ts`.

## Billeder og brand-assets

- Restaurantbillederne er udtrukket i original opløsning fra de fire PDF-visualiseringer (`assets-src/photos/`), beskåret for kanter og konverteret til AVIF/WebP/JPEG i flere bredder med sløret placeholder. De er **konceptvisualiseringer**, og siden præsenterer dem som sådan.
- Designpakke V1 ligger i `public/brand/mad-og-mennesker/`; dokumentationen fra pakken er i `docs/designpakke/`. Se **`docs/ASSETS.md`** for præcis hvor hvert asset bruges.
- Madfotos mangler endnu; retterne vises med designede, udskiftelige pladsholdere ("Foto følger").

## SEO

Metadata, Open Graph-billeder, sitemap og semantisk HTML er på plads. **Preview-builds blokerer søgemaskiner** (`robots.txt` disallow + `noindex`). Ved lancering sættes:

```
NEXT_PUBLIC_SITE_URL=https://jeres-domæne.dk
NEXT_PUBLIC_ALLOW_INDEXING=true
```

## Hosting på Azure Static Web Apps

Siden bygges som ren statisk HTML (`output: "export"`) uden server-funktioner, så den passer direkte til Azure Static Web Apps. `public/staticwebapp.config.json` følger med i build-outputtet og sætter 404-side, cache-headers og `noindex` på Design Lab.

Når I er klar (intet er oprettet eller deployet endnu):

1. Opret en **Static Web App** i Azure-portalen (Free-planen rækker), vælg *GitHub* som kilde, repo `pSchacksen/mad-mennesker` og branch `main`.
2. Vælg build-preset **Custom** og angiv:
   - App location: `/`
   - Output location: `out`
   - (API location: tom)
3. Azure opretter selv en GitHub Actions-workflow og en deployment-token som repo-secret. Workflowen bygger med `npm run build` og udgiver `out/`.
4. Sæt evt. `NEXT_PUBLIC_SITE_URL` og `NEXT_PUBLIC_ALLOW_INDEXING` som miljøvariabler i workflowen, når siden skal i luften på det rigtige domæne, og tilknyt domænet under *Custom domains*.

Pull requests får automatisk deres egen preview-URL fra Azure, så nye ændringer kan ses, før de merges til `main`.

## Tilgængelighed og bevægelse

Alle animationer respekterer `prefers-reduced-motion` (indhold vises straks uden bevægelse). Dekorationer er `aria-hidden`, fokus-states er synlige, kontrasten er tjekket mod WCAG AA, og den diskrete cursor-ring på desktop erstatter aldrig systemets cursor.
