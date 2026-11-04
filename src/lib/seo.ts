import type { Metadata } from "next";
import { isIndexable, site } from "@/content/site";

export const defaultKeywords = [
  "restaurant Randers",
  "dansk mad Randers",
  "frokost Randers",
  "smørrebrød Randers",
  "restaurant Slotspladsen",
  "selskaber Randers",
  "Mad & Mennesker",
];

export function pageMetadata({
  title,
  description,
  path,
  image = "facade",
  keywords = [],
}: {
  title?: string;
  description: string;
  path: string;
  image?: "facade" | "dining" | "bar" | "private-corner";
  keywords?: string[];
}): Metadata {
  const fullTitle = title ? `${title} · ${site.name}` : `${site.name} — Klassisk dansk mad på Slotspladsen i Randers`;
  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords],
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "da_DK",
      siteName: site.name,
      url: path,
      title: fullTitle,
      description,
      images: [{ url: `/og/${image}.jpg`, width: 1200, height: 630, alt: `${site.name}, ${site.address.area} i ${site.address.city}` }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [`/og/${image}.jpg`] },
    robots: isIndexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}
