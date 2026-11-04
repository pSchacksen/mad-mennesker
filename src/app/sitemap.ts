import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export const dynamic = "force-static";

// Design Lab er bevidst udeladt.
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/menukort/", "/om-os/", "/selskaber/", "/besoeg/", "/reservation/"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: p === "/menukort/" ? "weekly" : "monthly",
    priority: p === "/" ? 1 : 0.8,
  }));
}
