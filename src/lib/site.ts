/**
 * Absolute origin for metadata, sitemap and robots.
 *
 * NEXT_PUBLIC_SITE_URL wins once a custom domain exists; otherwise Vercel
 * injects the production domain at build time. Falls back to localhost so
 * `next dev` and `next build` work with no environment at all.
 */
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? `https://${process.env.NEXT_PUBLIC_SITE_URL.replace(/^https?:\/\//, "")}`
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000";
