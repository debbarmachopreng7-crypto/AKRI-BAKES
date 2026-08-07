export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/cart", "/checkout", "/order-confirmation", "/custom-cakes"],
      },
    ],
    sitemap: "https://debbarmachopreng7-crypto.github.io/AKRI-BAKES/sitemap.xml",
  };
}
