import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

/**
 * One page. The console panels live in the URL hash, and fragments are not
 * separate documents to a crawler, so listing them here would be noise.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
