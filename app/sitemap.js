const BASE = "https://debbarmachopreng7-crypto.github.io/AKRI-BAKES";

const productSlugs = [
  "black-forest",
  "white-forest",
  "blueberry-cake",
  "red-velvet",
  "dark-chocolate-truffle",
  "russian-honey-cake",
  "tiramisu",
  "fruit-gateaux",
  "rainbow-cake",
  "salted-nutty-caramel-fudge",
  "white-chocolate-truffle",
  "lemon-meringue-cake",
  "matcha-strawberry",
  "carrot-cake-cream-cheese",
  "chocolate-world-cake",
  "coconut-lotus-biscoff",
  "lotus-biscoff-cheesecake",
  "classic-new-york-cheesecake",
  "mango-cheesecake",
  "blueberry-cheesecake",
  "chocolate-cheesecake",
  "basque-burnt-cheesecake",
  "japanese-cheesecake",
  "mango-mousse-cake",
  "chocolate-mousse-cake",
  "coffee-mousse-cake",
  "strawberry-mousse",
  "hazelnut-pralin-mousse",
  "banoffee-mousse",
  "young-coconut-mousse",
  "raspberry-white-mousse",
];

const staticPages = [
  { path: "", priority: 1 },
  { path: "menu", priority: 0.9 },
  { path: "cakes", priority: 0.9 },
  { path: "gallery", priority: 0.8 },
  { path: "build-your-cake", priority: 0.8 },
  { path: "about", priority: 0.7 },
  { path: "reviews", priority: 0.7 },
  { path: "contact", priority: 0.7 },
  { path: "faq", priority: 0.6 },
  { path: "terms", priority: 0.3 },
  { path: "privacy", priority: 0.3 },
];

export const dynamic = "force-static";

export default function sitemap() {
  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${BASE}/${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority,
    })),
    ...productSlugs.map((slug) => ({
      url: `${BASE}/product/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    })),
  ];
}
