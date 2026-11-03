/**
 * DESIGN LAB — standardvarianter
 * Den offentlige forside bruger disse varianter. I Design Lab (/design-lab/) kan
 * man afprøve de andre uden kodeændringer; valget gemmes kun i egen browser.
 * Når I har besluttet jer, ændres standarden her.
 */
export const variantOptions = {
  hero: [
    { id: "cinematic", label: "A — Cinematic Bistro", description: "Fuldskærms facadefoto, markant serif-typografi, langsom zoom og globelamper, der tændes." },
    { id: "editorial", label: "B — Editorial Restaurant", description: "Todelt magasinkomposition: stor typografi, beskåret foto i bue, roterende segl og asymmetri." },
    { id: "immersive", label: "C — Immersive Hospitality", description: "Lagdelte billeder, der skilles ad under scroll, med kæmpe typografi, der glider på tværs." },
  ],
  story: [
    { id: "editorial", label: "A — Editorial split", description: "Asymmetrisk opslag med stort billede, parallax og botanisk gren." },
    { id: "chapters", label: "B — Sticky kapitler", description: "Billedet står fast, mens tre korte kapitler scroller forbi og skifter scenen." },
  ],
  menu: [
    { id: "bistrokort", label: "A — Bistrokort", description: "Et fysisk kort på linned med ramme, kategorifaner og animeret skift." },
    { id: "tavle", label: "B — Tavlen", description: "Mørk, todelt tavle med sticky kategoriindeks og hele kortet på én gang." },
  ],
} as const;

export type VariantKey = keyof typeof variantOptions;
export type Variants = { [K in VariantKey]: (typeof variantOptions)[K][number]["id"] };

export const defaultVariants: Variants = {
  hero: "cinematic",
  story: "editorial",
  menu: "bistrokort",
};
