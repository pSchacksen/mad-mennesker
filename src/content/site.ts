/**
 * CENTRAL INDHOLDSKONFIGURATION
 * ─────────────────────────────
 * Alle praktiske oplysninger om restauranten samles her. Felter, der endnu ikke
 * er fastlagt, står som `null`. Hjemmesiden viser så en pæn "følger snart"-
 * tekst i stedet for at opfinde noget. Udfyld felterne, når de er bekræftet,
 * så opdateres forside, kontaktside, footer, SEO og strukturerede data automatisk.
 *
 * Strukturen er bevidst flad og serialiserbar, så den senere kan flyttes til
 * et CMS (fx Payload) uden at komponenterne skal ændres.
 */

export type OpeningHoursEntry = {
  /** Fx "Mandag–torsdag" */
  days: string;
  /** Fx "11.30–22.00" eller "Lukket" */
  hours: string;
};

export type SiteConfig = {
  name: string;
  tagline: string;
  intro: string;
  /** Den offentlige adresse. `street` er null, indtil husnummer mv. er bekræftet. */
  address: {
    street: string | null;
    area: string;
    postalCode: string | null;
    city: string;
  };
  contact: {
    phone: string | null;
    email: string | null;
    /** E-mail til selskaber, hvis den adskiller sig fra den almindelige. */
    eventsEmail: string | null;
  };
  openingHours: OpeningHoursEntry[] | null;
  /** Fx "Vi åbner foråret 2027". null = ingen dato kommunikeres. */
  openingAnnouncement: string | null;
  social: {
    instagram: string | null;
    facebook: string | null;
  };
  /** Bruges til rutevejledning. Opdatér, når den præcise adresse er kendt. */
  mapsQuery: string;
  /** Offentlig URL, når domænet er på plads. Bruges til canonical og OG. */
  url: string;
};

export const site: SiteConfig = {
  name: "Mad & Mennesker",
  tagline: "God dansk mad. Gode mennesker. God tid.",
  intro: "Et nyt samlingssted i hjertet af Randers.",
  address: {
    street: null,
    area: "Slotspladsen",
    postalCode: null,
    city: "Randers",
  },
  contact: {
    phone: null,
    email: null,
    eventsEmail: null,
  },
  openingHours: null,
  openingAnnouncement: null,
  social: {
    instagram: null,
    facebook: null,
  },
  mapsQuery: "Slotspladsen, Randers",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://madogmennesker.dk",
};

/* Hjælpere ─────────────────────────────────────────────── */

export const directionsUrl = () =>
  `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    [site.address.street, site.address.area, site.address.postalCode, site.address.city]
      .filter(Boolean)
      .join(", ") || site.mapsQuery,
  )}`;

export const formatAddressLines = () =>
  [
    site.address.street,
    site.address.street ? null : site.address.area,
    [site.address.postalCode, site.address.city].filter(Boolean).join(" "),
  ].filter(Boolean) as string[];

export const telHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/** Er alle de oplysninger på plads, som kræves for strukturerede restaurantdata? */
export const hasConfirmedBusinessDetails = () =>
  Boolean(site.address.street && site.address.postalCode && site.contact.phone && site.openingHours?.length);

/** Er siden klar til at blive indekseret af søgemaskiner? Styres af miljøvariabel. */
export const isIndexable = process.env.NEXT_PUBLIC_ALLOW_INDEXING === "true";
