import { menu } from "@/content/menu";
import { hasConfirmedBusinessDetails, site } from "@/content/site";

/**
 * Schema.org Restaurant-data. Udsendes KUN, når adresse, telefon og
 * åbningstider er bekræftet i content/site.ts — så søgemaskiner aldrig får
 * forkerte oplysninger.
 */
export function StructuredData() {
  if (!hasConfirmedBusinessDetails()) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    image: `${site.url}/og/facade.jpg`,
    servesCuisine: ["Dansk", "Smørrebrød"],
    priceRange: "kr.kr.",
    telephone: site.contact.phone,
    email: site.contact.email ?? undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressCountry: "DK",
    },
    hasMenu: `${site.url}/menukort/`,
    menu: menu.map((c) => c.title).join(", "),
    sameAs: [site.social.instagram, site.social.facebook].filter(Boolean),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
