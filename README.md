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
| `/` | Forsiden i fem korte sektioner: hero, historien, klassikerne, frokost/aften, selskaber + find os |
| `/menukort/` | Det fulde menukort |
| `/om-os/` | Koncept og værdier |
| `/selskaber/` | Selskaber og forespørgsel |
| `/besoeg/` | Adresse, åbningstider, kontakt, kort og "godt at vide" |
| `/reservation/` | Bordreservation (preview-tilstand indtil et bookingsystem er valgt) |
| `/design-lab/` | **Internt.** Ikke linket, `noindex`. Intro-loaderne og asset-oversigten |

## Opdatér indhold

Alt indhold, der skal kunne ændres, ligger samlet i `src/content/`. Strukturen er flad og serialiserbar, så den senere kan flyttes til fx Payload CMS.

- **`site.ts`** – adresse, telefon, e-mail, åbningstider, sociale medier, åbningsdato. Felter står som `null`, indtil de er bekræftet; siden viser så "følger snart" i stedet for at opfinde noget. Når adresse, telefon og åbningstider er udfyldt, udsendes strukturerede Schema.org-restaurantdata automatisk.
- **`menu.ts`** – kategorier, retter, beskrivelser og vejledende priser (fra forretningsplanen), dagens ret og retterne på forsiden. Sæt `menuStatus.isPreliminary = false`, når kortet er endeligt. Når der kommer madfotos, lægges de i `assets-src/photos/`, `npm run images` køres, og billednavnet sættes i rettens `image`-felt.
- **`booking.ts`** – se nedenfor.
- **`design.ts`** – de seks intro-loadere og hvilken af dem siden bruger.

## Bordreservation

Der er bevidst **ingen** egen bookingmotor, og siden lader aldrig en gæst tro, at et bord er reserveret. Når et bookingsystem er valgt, ændres kun `src/content/booking.ts`:

```ts
export const booking = { provider: "link", url: "https://…" };          // alle knapper åbner bookingsystemet
export const booking = { provider: "embed", embedUrl: "https://…" };    // /reservation/ indlejrer det
```

## Design Lab

`/design-lab/` er internt (ikke linket, `noindex`). Fanerne er:

- **Loadere**: fem udgaver af Seglet og de øvrige bud, som kan afspilles i en ramme eller i fuld skærm. Se dem på forsiden med fx `/?intro=segl`.
- **Hero**: fire hero-varianter (B Mad & mennesker er standard, A Atmosfære, C Immersive bistro, D Lamperne). Se dem på forsiden med `/?hero=atmosfaere`, `/?hero=bistro` eller `/?hero=lamper`.
- **Køkkenet**: to udgaver af "Det gode danske køkken" (A Retterne skifter er standard, B Fotorulle). Se B på forsiden med `/?koekken=rulle`.
- **Assets**: oversigt over designpakkens filer.

Standarderne vælges med `defaultLoader`, `defaultHero` og `defaultKitchen` i `src/content/design.ts`. Den offentlige forside viser altid standarderne.

## Billeder og brand-assets

- Alle billeder er **konceptuelle AI-visualiseringer** (17 mad-, rum- og stemningsbilleder plus de fire PDF-udtræk). Originalerne ligger tabsfrit i `assets-src/photos/`, og `npm run images` laver AVIF/WebP/JPEG i flere bredder med sløret placeholder. Intet skaleres op. `src/content/photo-library.ts` er den centrale oversigt, og **`docs/BILLEDER.md`** viser præcis hvor hvert billede bruges.
- Designpakke V1 ligger i `public/brand/mad-og-mennesker/`; dokumentationen fra pakken er i `docs/designpakke/`. Se **`docs/ASSETS.md`** for præcis hvor hvert asset bruges.
- Retter vises kun med et billede, der viser netop den ret (`image` i `menu.ts`). Retter uden passende billede vises uden.

## SEO

Metadata, Open Graph-billeder, sitemap og semantisk HTML er på plads. **Preview-builds blokerer søgemaskiner** (`robots.txt` disallow + `noindex`). Ved lancering sættes:

```
NEXT_PUBLIC_SITE_URL=https://jeres-domæne.dk
NEXT_PUBLIC_ALLOW_INDEXING=true
```

## Hosting på Azure Static Web Apps

Siden bygges som ren statisk HTML (`output: "export"`) uden server-funktioner, så den passer direkte til Azure Static Web Apps. `public/staticwebapp.config.json` følger med i build-outputtet og sætter 404-side, cache-headers og `noindex` på Design Lab.

Workflowen `.github/workflows/azure-static-web-apps.yml` bygger siden og udgiver `out/`. Pull requests får hvert deres preview-miljø med egen URL, og push til `main` udgiver til Static Web App'ens hoved-URL. Opsætning (én gang):

1. I Azure-portalen: **Create a resource → Static Web App**. Plan: *Free*. Under *Deployment details* vælges **Other** (ikke GitHub, da workflowen allerede ligger i repoet).
2. Når den er oprettet: **Overview → Manage deployment token** → kopiér tokenet.
3. I GitHub: **Settings → Secrets and variables → Actions → New repository secret**, navn `AZURE_STATIC_WEB_APPS_API_TOKEN`, værdi = tokenet.
4. Kør workflowen igen (eller push en ændring). Preview-URL'en vises i workflow-loggen og som kommentar på PR'en.

Uden secret bygges og tjekkes siden stadig, men intet udgives. Når siden skal i luften på det rigtige domæne, tilknyttes domænet under *Custom domains*, og `NEXT_PUBLIC_SITE_URL` / `NEXT_PUBLIC_ALLOW_INDEXING` sættes som `env` på build-trinnet.

## Intro-loader

Ved første besøg i en session vises en kort intro, før siden kommer til syne (`src/components/intro/`, styling i `src/app/intro.css`). Siden bruger Seglet. Design Lab viser fem udgaver af seglet (Seglet, i lak, som urværk, i messing og det rullende segl) samt de øvrige bud fra første runde. Introen varer cirka 3,5 sekunder, kan springes over med Escape eller "Spring over", og vises ikke ved reduceret bevægelse. Tilføj `?intro` (eller `?intro=<variant>`) til adressen for at se den igen.

## Tilgængelighed og bevægelse

Alle animationer respekterer `prefers-reduced-motion` (indhold vises straks uden bevægelse). Dekorationer er `aria-hidden`, fokus-states er synlige, kontrasten er tjekket mod WCAG AA, og den diskrete cursor-ring på desktop erstatter aldrig systemets cursor.
