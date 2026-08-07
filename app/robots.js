export const dynamic = "force-static";

import { SITE_URL } from "../lib/siteConfig";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/cart", "/checkout", "/order-confirmation", "/custom-cakes"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
