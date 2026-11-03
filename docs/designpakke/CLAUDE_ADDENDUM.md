# TILFØJELSE TIL CLAUDE CODE-PROMPT — DESIGNPAKKE V1

Jeg vedhæfter også ZIP-filen `Mad_og_Mennesker_Designpakke.zip`. Den indeholder INDIVIDUELLE grafiske assets, ikke et collageark. Brug disse filer allerede i den ALLERFØRSTE implementerede iteration — ikke kun som inspiration til en fremtidig iteration.

## 1. Import og gennemgang
- Udpak pakken i projektets assets-mappe, fx `public/brand/mad-og-mennesker/`, og bevar de logiske undermapper eller dokumentér nye stier.
- Læs `README.md` og `asset-manifest.json` først. Gennemse alle filer, og identificer deres stil, størrelse, transparens og anvendelighed.
- Brug de oprindelige restaurant-PDF'er som fotokilder efter behov; ZIP'en er supplerende brand-grafik, ikke en erstatning for interiørbilleder.
- Beskær aldrig det gamle genererede moodboard. Alle aktiver i ZIP'en er allerede selvstændige filer.

## 2. Designsystem og genbrug
- Opret et lille `BrandAsset`- eller `BrandIcon`-interface samt en central registrering af assets fra manifestet. Undgå hardcodede, spredte filstier.
- Brug farverne fra manifestet som udgangspunkt for Tailwind/CSS-tokens. Respekter den aftalte brandretning med mørkegrøn, creme, messing og valnød.
- Transparente SVG-ikoner skal gengives skarpt i alle størrelser, med ensartet optisk størrelse og tilstrækkelig kontrast.
- Foretræk SVG-vektoroverlays som dekorative lag; tekstur-WebP'erne bruges sparsomt og med lav opacity.

## 3. Krav til første iteration
Brug mindst følgende elementer synligt i det første fungerende preview:
1. `ornaments/svg/crossed-cutlery.svg` eller `round-seal.svg` i hero/brandintro (IKKE som uafklaret officielt logo).
2. `backgrounds/vector/globe-lights.svg` i en mørk stemningssektion eller hero som subtilt overlay.
3. `backgrounds/vector/botanical-corner.svg` i velkomst-/storytellingsektionen.
4. `backgrounds/textures/ivory-plaster.webp` i et lyst editorial område med meget diskret opacity.
5. `backgrounds/textures/forest-leaf-shadow.webp` eller `golden-bokeh.webp` i en mørk eller sanselig overgang.
6. `icons/svg/fork-knife.svg`, `cloche.svg` og `wine-glass.svg` ved relevante mad-/menupunkter.
7. `icons/svg/calendar.svg` ved reservation, `people.svg` ved selskaber og `location.svg` ved besøg/kontakt.
8. `ornaments/svg/flourish.svg` som diskret indholdsseparator, ikke som generisk gentaget pynt.
9. `backgrounds/vector/editorial-circles.svg` eller `arched-panels.svg` til at give mindst én sektion en særlig original visuel komposition.

Brug gerne flere relevante assets, men ikke nødvendigvis alle. Asset-anvendelsen skal være meningsfuld og professionel. Der skal være tydelig visuel sammenhæng med restaurantens fire PDF-referencer.

## 4. Animationer
- De dekorative botanical-, circles- og globe-elementer må få subtile GSAP/Motion-animationer: svag parallax, langsom drift, scale eller fade.
- Bevar tekstens læsbarhed. Sørg for at pointer events ikke blokeres af overlays.
- Respekter `prefers-reduced-motion`; undgå autoplay af tunge effekter.
- Brug CSS-transform/opacity og optimer til mobil.

## 5. Responsivitet og kontrol
- Tjek alle anvendte assetstier i preview, og sikr at der ikke er 404-fejl, brutte billeder eller hvide rektangler omkring illustrationerne.
- Brug `aria-hidden=true` på ren dekoration; giv funktionelle ikoner meningsfulde navne via knap/link.
- Sørg for at teksturer ikke mudrer baggrund eller kontrast.
- Kontrollér mobil, tablet og desktop samt dark/cream sektioner.
- Design Lab-varianter skal genbruge samme brand-assetsystem og må ikke være afhængige af et enkelt baggrundsfoto.

## 6. Acceptkriterium
Første preview er IKKE færdigt, hvis designpakken kun er kopieret ind i repository. Det første preview skal rent faktisk vise mindst 10 forskellige assets fra pakken på strategiske steder, og du skal i din afsluttende status liste præcis hvilke filer der er brugt og hvor. Et asset tæller kun, hvis det rendres synligt i hjemmesiden. Dokumentér eventuelle bevidste fravalg.

Lav ændringer i preview/udviklingsmiljø og deploy ikke til produktion uden min godkendelse.
