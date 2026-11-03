/**
 * MENUKORT — struktureret indhold
 * ───────────────────────────────
 * Retter og priser tager udgangspunkt i forretningsplanens forslag til menukort
 * (oktober 2026). Priserne er VEJLEDENDE og kan ændres her ét sted.
 * De enkelte smørrebrødsstykker og desserter er redaktionelle forslag inden
 * for planens prisramme og skal godkendes af køkkenet.
 *
 * Hver ret kan have et `image` (nøgle i src/content/generated/photos.json).
 * Uden billede vises en designet pladsholder med et ikon fra designpakken,
 * indtil der foreligger rigtige madfotos.
 */
import type { BrandIconName } from "@/lib/brand-assets";

export type Price = number | { from: number; to?: number } | null;

export type MenuItem = {
  id: string;
  name: string;
  description?: string;
  price: Price;
  /** Kort note, fx "Skifter dagligt" */
  note?: string;
  /** Fremhæves som husets klassiker / dagens ret */
  highlight?: boolean;
  image?: string;
  icon?: BrandIconName;
};

export type MenuCategory = {
  id: string;
  title: string;
  /** Kursiv undertitel i menukortet */
  kicker: string;
  intro?: string;
  icon: BrandIconName;
  items: MenuItem[];
};

/** Vises på menukortet, så ingen tror, at kortet er endeligt. */
export const menuStatus = {
  isPreliminary: true,
  note: "Foreløbigt menukort. Retter og priser er vejledende og kan ændre sig inden åbning.",
};

/** Dagens ret. Sæt `name` og `description`, når køkkenet har valgt dagens ret. */
export const dailySpecial: { name: string | null; description: string; price: Price } = {
  name: null,
  description:
    "Hver dag laver køkkenet en klassisk dansk ret efter årstiden og det, der er godt lige nu. Spørg os, eller kig på tavlen.",
  price: 179,
};

export const menu: MenuCategory[] = [
  {
    id: "smorrebrod",
    title: "Smørrebrød",
    kicker: "Fra middagsbordets klassikere",
    intro: "Smurt med omhu på godt rugbrød og franskbrød. Tag to eller tre stykker — eller del med bordet.",
    icon: "smorrebrod",
    items: [
      { id: "aeg-rejer", name: "Æg & rejer", description: "Håndpillede rejer, skiveskåret æg, mayonnaise, dild og citron", price: 145 },
      { id: "roastbeef", name: "Roastbeef", description: "Rosa roastbeef, remoulade, revet peberrod, agurkesalat og ristede løg", price: 125 },
      { id: "fiskefilet", name: "Fiskefilet", description: "Sprødstegt rødspætte, hjemmelavet remoulade og citron", price: 125 },
      { id: "honsesalat", name: "Hønsesalat", description: "Med sprød bacon, champignon og frisk karse", price: 115 },
      { id: "leverpostej", name: "Lun leverpostej", description: "Husets postej med bacon, svampe og syltede agurker", price: 115 },
      { id: "rullepolse", name: "Rullepølse", description: "Med sky, rå løg og karse", price: 105 },
      { id: "sild", name: "Marinerede sild", description: "Rødløg, kapers, karrysalat og rugbrød", price: 95 },
      { id: "kartoffel", name: "Kartoffelmad", description: "Nye kartofler, mayonnaise, purløg og sprøde løg", price: 95 },
    ],
  },
  {
    id: "klassikere",
    title: "Varme klassikere",
    kicker: "Retter, man kommer tilbage efter",
    intro: "Det danske køkken, som vi kender det — lavet ordentligt, serveret uden dikkedarer.",
    icon: "cloche",
    items: [
      {
        id: "stjerneskud",
        name: "Stjerneskud",
        description: "Dampet og paneret rødspætte på ristet brød med rejer, asparges, dressing og citron",
        price: 189,
        highlight: true,
        icon: "plate",
      },
      {
        id: "pariserbof",
        name: "Pariserbøf",
        description: "Hakket bøf på ristet brød med kapers, peberrod, rødbeder, rå løg og æggeblomme",
        price: 179,
        highlight: true,
        icon: "fork-knife",
      },
      {
        id: "wienerschnitzel",
        name: "Wienerschnitzel",
        description: "Paneret kalveschnitzel med brasekartofler, ærter, brunet smør og klassisk garniture",
        price: 229,
        highlight: true,
        icon: "cloche",
      },
      {
        id: "dagens",
        name: "Dagens danske ret",
        description: "Hjemmelavet og efter årstiden. Spørg os, hvad køkkenet har lavet i dag",
        price: 179,
        note: "Skifter dagligt",
        icon: "chef-hat",
      },
    ],
  },
  {
    id: "dessert",
    title: "Dessert",
    kicker: "Fordi der altid er plads til lidt mere",
    icon: "heart",
    items: [
      { id: "aeblekage", name: "Gammeldags æblekage", description: "Æblemos, ristet rasp, makroner, flødeskum og ribsgelé", price: 89 },
      { id: "citronfromage", name: "Citronfromage", description: "Let og frisk, med flødeskum og ristede mandler", price: 79 },
      { id: "pandekager", name: "Pandekager", description: "Med vaniljeis og hjemmelavet syltetøj", price: 95 },
    ],
  },
  {
    id: "drikke",
    title: "Til bordet",
    kicker: "Øl, vin, snaps og en god kop kaffe",
    intro: "Vi skænker et udvalg af øl, vin og snaps, der passer til maden, samt sodavand og kaffe. Det fulde drikkekort følger.",
    icon: "wine-glass",
    items: [
      { id: "ol", name: "Øl", description: "Fadøl og et udvalg på flaske", price: null, icon: "beer-glass" },
      { id: "vin", name: "Vin", description: "Hvid, rød og bobler — på glas og flaske", price: null, icon: "wine-glass" },
      { id: "snaps", name: "Snaps", description: "Selvfølgelig. Det hører sig til", price: null, icon: "glass-toast" },
      { id: "sodavand", name: "Sodavand & saft", description: "Til dem, der kører, og dem, der er små", price: null, icon: "glass-toast" },
      { id: "kaffe", name: "Kaffe", description: "Til desserten eller den lange eftermiddag", price: null, icon: "coffee-cup" },
    ],
  },
];

/** Retterne, der præsenteres i forsidens "Det gode danske køkken". */
export const featuredDishes: Array<{
  id: string;
  name: string;
  line: string;
  story: string;
  price: Price;
  icon: BrandIconName;
  image?: string;
}> = [
  {
    id: "smorrebrod",
    name: "Smørrebrød",
    line: "Rugbrød, smør og alt det gode ovenpå",
    story: "Klassiske stykker, smurt med omhu. Bestil et par stykker til dig selv — eller fyld bordet og del.",
    price: { from: 95, to: 145 },
    icon: "smorrebrod",
  },
  {
    id: "stjerneskud",
    name: "Stjerneskud",
    line: "Den store frokostklassiker",
    story: "Dampet og stegt rødspætte, rejer, asparges og dressing. En ret, der ser ud som en fest — og smager som en.",
    price: 189,
    icon: "plate",
  },
  {
    id: "pariserbof",
    name: "Pariserbøf",
    line: "Med alt tilbehøret, som det skal være",
    story: "Saftig bøf på ristet brød med kapers, peberrod, rødbeder, løg og en blank æggeblomme på toppen.",
    price: 179,
    icon: "fork-knife",
  },
  {
    id: "wienerschnitzel",
    name: "Wienerschnitzel",
    line: "Gylden, sprød og større end tallerkenen",
    story: "Paneret kalv, brasekartofler, ærter og brunet smør. Med garniture, så klart.",
    price: 229,
    icon: "cloche",
  },
  {
    id: "dagens",
    name: "Dagens danske ret",
    line: "Hvad køkkenet har lyst til i dag",
    story: "Hjemmelavet efter årstiden. Måske frikadeller, måske noget helt femte. Spørg os — eller kig på tavlen.",
    price: 179,
    icon: "chef-hat",
  },
];

export const formatPrice = (price: Price): string | null => {
  if (price === null) return null;
  if (typeof price === "number") return `${price}`;
  return price.to ? `${price.from}–${price.to}` : `fra ${price.from}`;
};
