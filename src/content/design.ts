/**
 * LOADERE — valg af intro-loader
 * ──────────────────────────────
 * Seks bud på den korte intro, der vises ved første besøg i en session.
 * Alle kan afprøves i Design Lab (/design-lab/) eller med fx `/?intro=segl`.
 * Den offentlige side bruger `defaultLoader`. Skift den her, når I har valgt.
 */
export const loaderOptions = [
  {
    id: "lampe",
    label: "Globelampen",
    description: "En globelampe sænker sig ned i mørket, flimrer og tænder. Navnet træder frem i lyset, og mørket løfter sig som et tæppe.",
  },
  {
    id: "lys",
    label: "Levende lys",
    description: "Et stearinlys tændes og varmer rummet op. Til sidst trækker mørket sig sammen om flammen og afslører siden.",
  },
  {
    id: "bordet",
    label: "Bordet dækkes",
    description: "På en lys dug tegnes tallerken, kniv og gaffel op. Siden åbner sig ud fra midten af tallerkenen.",
  },
  {
    id: "segl",
    label: "Seglet",
    description: "Husets segl stemples i messing med teksten løbende rundt. Seglet zoomer frem, og siden kommer til syne.",
  },
  {
    id: "facade",
    label: "Facadeskiltet",
    description: "Bogstaverne i skiltet over døren tænder ét for ét. Så går dørene op, og man træder indenfor.",
  },
  {
    id: "ord",
    label: "Tre løfter",
    description: "Lys og typografisk: God dansk mad. Gode mennesker. God tid. Linje for linje på creme, før kortet glider op.",
  },
] as const;

export type LoaderId = (typeof loaderOptions)[number]["id"];

export const defaultLoader: LoaderId = "lampe";

export const isLoaderId = (v: unknown): v is LoaderId => loaderOptions.some((o) => o.id === v);
