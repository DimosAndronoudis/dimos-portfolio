import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /* The CV is public and linked from the page, but it carries a phone
         number and does not need to be a search result of its own. */
      disallow: "/cv/",
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
