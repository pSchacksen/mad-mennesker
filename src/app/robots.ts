import type { MetadataRoute } from "next";
import { isIndexable, site } from "@/content/site";

export const dynamic = "force-static";

/** Preview-builds blokerer søgemaskiner. Sæt NEXT_PUBLIC_ALLOW_INDEXING=true ved lancering. */
export default function robots(): MetadataRoute.Robots {
  if (!isIndexable) return { rules: { userAgent: "*", disallow: "/" } };
  return { rules: { userAgent: "*", allow: "/", disallow: "/design-lab/" }, sitemap: `${site.url}/sitemap.xml` };
}
