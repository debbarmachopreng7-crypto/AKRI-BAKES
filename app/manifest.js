export const dynamic = "force-static";

export default function manifest() {
  return {
    name: "Akri Bakes",
    short_name: "Akri Bakes",
    description: "Premium cakes & patisserie in Dimapur, Nagaland. Handcrafted celebration cakes, cheesecakes, mousse cakes & more.",
    start_url: "/",
    display: "standalone",
    background_color: "#F9F8F6",
    theme_color: "#26110B",
    icons: [
      { src: "/AKRI-BAKES/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/AKRI-BAKES/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
