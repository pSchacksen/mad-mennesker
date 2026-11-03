/**
 * LOADERE — valg af intro-loader
 * ──────────────────────────────
 * Bud på den korte intro, der vises ved første besøg i en session.
 * Seglet er valgt (november 2026); "segl"-gruppen er udgaver af det.
 * Alle kan afprøves i Design Lab (/design-lab/) eller med fx `/?intro=segl`.
 * Den offentlige side bruger `defaultLoader`. Skift den her, når I har valgt.
 */
export const loaderOptions = [
  {
    id: "segl",
    group: "segl",
    label: "Seglet",
    description: "Husets segl stemples i messing med teksten løbende rundt. Seglet zoomer frem, og siden kommer til syne.",
  },
  {
    id: "lak",
    group: "segl",
    label: "Seglet i lak",
    description: "Som et laksegl på en invitation: varm lak flyder ud på creme papir, seglet trykkes i, og kortet glider op.",
  },
  {
    id: "ur",
    group: "segl",
    label: "Seglet som urværk",
    description: "Teksten tegnes rundt som en viser, der går én omgang. Så lægger seglet sig op i hjørnet, hvor logoet sidder.",
  },
  {
    id: "glans",
    group: "segl",
    label: "Seglet i messing",
    description: "Et stort messingsegl træder frem af mørket, og et lysglimt løber hen over det. Siden åbner sig gennem seglet.",
  },
  {
    id: "rul",
    group: "segl",
    label: "Det rullende segl",
    description: "Seglet ruller ind som en mønt og lægger sig til rette. Når siden er klar, ruller det videre og trækker mørket med sig.",
  },
  {
    id: "lampe",
    group: "andre",
    label: "Globelampen",
    description: "En globelampe sænker sig ned i mørket, flimrer og tænder. Navnet træder frem i lyset, og mørket løfter sig som et tæppe.",
  },
  {
    id: "lys",
    group: "andre",
    label: "Levende lys",
    description: "Et stearinlys tændes og varmer rummet op. Til sidst trækker mørket sig sammen om flammen og afslører siden.",
  },
  {
    id: "bordet",
    group: "andre",
    label: "Bordet dækkes",
    description: "På en lys dug tegnes tallerken, kniv og gaffel op. Siden åbner sig ud fra midten af tallerkenen.",
  },
  {
    id: "facade",
    group: "andre",
    label: "Facadeskiltet",
    description: "Bogstaverne i skiltet over døren tænder ét for ét. Så går dørene op, og man træder indenfor.",
  },
  {
    id: "ord",
    group: "andre",
    label: "Tre løfter",
    description: "Lys og typografisk: God dansk mad. Gode mennesker. God tid. Linje for linje på creme, før kortet glider op.",
  },
] as const;

export type LoaderId = (typeof loaderOptions)[number]["id"];

export const defaultLoader: LoaderId = "segl";

export const isLoaderId = (v: unknown): v is LoaderId => loaderOptions.some((o) => o.id === v);
