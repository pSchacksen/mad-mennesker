# Billeder — hvad bruges hvor

Alle 25 billeder er **konceptuelle AI-visualiseringer**. De viser ikke de færdige lokaler eller de præcise serveringer, og alt-teksterne starter derfor med "Visualisering af …" eller "Stemningsbillede …". Menukortets forstørrede visning skriver også "Visualisering — serveringen kan variere".

Originalerne ligger tabsfrit i `assets-src/photos/` (WebP lossless). `npm run images` laver AVIF, WebP og JPEG i 480, 828 og 1280 px og i kildens egen bredde, plus en sløret placeholder. Intet skaleres op. Den centrale oversigt med motiv, ret og maks. skarp visningsbredde ligger i `src/content/photo-library.ts`.

## Forsiden (anbefalet udgave)

| Sektion | Billeder |
| --- | --- |
| Hero "Mad & mennesker" | `stemning-lamper` (blød baggrund), `rum-aftengaester` (hovedbillede i bue), `mad-stjerneskud` (lagt ind over, med pris) |
| 01 Velkommen | `bord-opdaekket` (portrætbue) |
| 02 Det gode danske køkken | `mad-frokostbord` (Smørrebrød), `mad-stjerneskud`, `mad-pariserbof`, `mad-wienerschnitzel`, `dessert-aeblekage` (Dessert). Dagens ret har bevidst intet foto. |
| 03 Det bedste ved et godt måltid … | `rum-hjorne` (stort), `rum-bar` (bue), `mad-sild` (cirkel) |
| 04 Samme bord, to stemninger | Frokost: `mad-roastbeef` + `mad-aeg-rejer`. Aften: `rum-spisesal` + `bord-blomster` |
| 05 Selskaber / Find os | `stemning-vaeg` (blød, mørklagt baggrund) |

## Hero- og køkkenvarianter (Design Lab og `?hero=` / `?koekken=`)

| Variant | Billeder |
| --- | --- |
| Hero A — Atmosfære | `stemning-lamper` i fuld bredde |
| Hero B — Mad & mennesker (standard) | se forsiden |
| Hero C — Immersive bistro | `stemning-vaeg` (baggrund), bue der skifter mellem `rum-aftengaester`, `rum-hjorne` og `rum-bar`, tallerken der skifter mellem `mad-pariserbof`, `mad-aeg-rejer` og `mad-wienerschnitzel` |
| Hero D — Lamperne (tidligere) | `facade` |
| Køkken A — Retterne skifter (standard) | som forsiden |
| Køkken B — Fotorulle | samme fem madbilleder som store kort |

## Undersider

| Side | Billeder |
| --- | --- |
| Menukort, top | `mad-frokostbord` i bue, `stemning-lamper` som blød baggrund |
| Menukort, Husets klassikere | `mad-stjerneskud`, `mad-pariserbof`, `mad-wienerschnitzel` |
| Menukort, kategoribilleder | Smørrebrød: `mad-frokostbord`. Varme klassikere: `mad-wienerschnitzel-ol`. Dessert: `dessert-pandekager`. Til bordet: `rum-bar`. |
| Menukort, miniaturer (åbner stort) | Æg & rejer `mad-aeg-rejer`, Roastbeef `mad-roastbeef`, Fiskefilet `mad-fiskefilet`, Hønsesalat `mad-honsesalat`, Lun leverpostej `mad-leverpostej`, Rullepølse `mad-rullepolse`, Marinerede sild `mad-sild`, Kartoffelmad `mad-kartoffel`, Stjerneskud `mad-stjerneskud`, Pariserbøf `mad-pariserbof`, Wienerschnitzel `mad-wienerschnitzel`, Gammeldags æblekage `dessert-aeblekage`, Citronfromage `dessert-citronfromage`, Pandekager `dessert-pandekager`. Kun Dagens ret og drikkevarerne er uden billede. |
| Om os | Top: `rum-hjorne` + `stemning-lamper` bagved. Idéen: `rum-spisesal` |
| Selskaber | Top: `rum-aftengaester` + `stemning-vaeg` bagved. Ved formularen: `bord-blomster` |
| Besøg os | Top: `facade` (uændret) + `stemning-vaeg` bagved. Godt at vide: `rum-bar` |
| Reservation | Top: `bord-opdaekket` + `stemning-lamper` bagved |

## Ikke brugt

- `mad-stjerneskud-tomat` ligger som reserve. Anretningen har tomat, som ikke står i rettens beskrivelse, og retter må kun vises med et billede, der passer.
- De gamle PDF-udtræk `dining`, `bar` og `private-corner` vises ikke længere på siderne. De bruges kun stadig som delingsbilleder (Open Graph).

## Kilde → navn

Den vedhæftede `image.png` er `bord-blomster`. De 16 øvrige vedhæftninger er omdøbt efter motiv (`mad-…`, `rum-…`, `bord-…`, `stemning-…`). Anden runde (8 kvadratiske billeder, 1254 × 1254 px) er `mad-fiskefilet`, `mad-honsesalat`, `mad-leverpostej`, `mad-rullepolse`, `mad-kartoffel`, `dessert-aeblekage`, `dessert-citronfromage` og `dessert-pandekager`.

## Opløsning og store skærme

Kildebillederne er 1672 × 941, 1448 × 1086 eller 1254 × 1254 px. De kvadratiske vises højst ca. 660 CSS-px brede. Det er for lidt til et skarpt foto i fuld bredde på 1920–2560 px skærme. Derfor:

- Skarpe fotos vises højst ca. 880 CSS-px brede (1672-billeder) eller 760 CSS-px (1448-billeder), så de også er skarpe på retina-skærme.
- Kun de to stemningsbilleder med naturlig dybdeuskarphed (`stemning-lamper`, `stemning-vaeg`) bruges i fuld bredde, og så som dæmpede, let slørede baggrunde med farvelag over.
- På meget brede skærme holdes indholdet i en fast bredde, og baggrunden fylder ud, i stedet for at billederne strækkes.

Hvis der kommer billeder i 2560 px eller mere, kan hero A og de store sektionsbilleder vises større uden ændringer i koden.
