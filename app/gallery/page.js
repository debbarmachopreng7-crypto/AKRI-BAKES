"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/animations";
import { ASSET_PREFIX } from "../../lib/cakeImages";

const celebrationItems = [
  { title: "Black Forest", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-01.jpg` },
  { title: "White Forest", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-02.jpg` },
  { title: "Blueberry", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-03.jpg` },
  { title: "Red Velvet with Cream Cheese", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-04.jpg` },
  { title: "Blue Velvet with Cream Cheese", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-05.jpg` },
  { title: "Tres Leches (Milk Cake)", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-06.jpg` },
  { title: "Rasmalai, Nuts & Rasgula", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-07.jpg` },
  { title: "Chocolate & Nuts", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-08.jpg` },
  { title: "Carrot Cake with Cream Cheese", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-09.jpg` },
  { title: "Dark Chocolate Truffle", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-10.jpg` },
  { title: "Tiramisu with Mascarpone", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-11.jpg` },
  { title: "Matcha Strawberry White Chocolate", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-12.jpg` },
  { title: "Lemon Meringue Cake", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-13.jpg` },
  { title: "Russian Honey Cake", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-14.jpg` },
  { title: "Fruit Gateaux", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-15.jpg` },
  { title: "Coconut-Lotus Biscoff / Raspberry", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-16.jpg` },
  { title: "Chocolate World Cake", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-17.jpg` },
  { title: "White Chocolate Truffle", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-18.jpg` },
  { title: "Rainbow Cake", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-19.jpg` },
  { title: "Salted Nutty Caramel Fudge", label: "Celebration", image: `${ASSET_PREFIX}/products/celebration-20.jpg` },
];

const akriBakesItems = [
  { title: "Chocolate Cake", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-13.jpg` },
  { title: "Cheesecake", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-29.jpg` },
  { title: "Chocolate Mousse", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-24.jpg` },
  { title: "Waffles", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-11.jpg` },
  { title: "Pancakes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-20.jpg` },
  { title: "Cafe Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-12.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-01.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-09.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-06.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-07.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-08.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-10.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-14.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-16.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-17.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-21.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-22.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-23.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-25.jpg` },
  { title: "Bakery Dishes", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-27.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-28.jpg` },
  { title: "Bakery Food", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-31.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-32.jpg` },
  { title: "Bakery Design", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-04.jpg` },
  { title: "Bakery Design", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-18.jpg` },
  { title: "Bakery Design", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-26.jpg` },
  { title: "Interior", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-02.jpg` },
  { title: "Interior", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-05.jpg` },
  { title: "Interior", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-30.jpg` },
  { title: "Bakery Meals", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-03.jpg` },
  { title: "Dumplings", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-19.jpg` },
  { title: "Spaghetti Bolognese", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-15.jpg` },
  { title: "Escargots", label: "Akri Bakes", image: `${ASSET_PREFIX}/gallery/akri-bakes-33.jpg` },
];

const allItems = [
  ...celebrationItems,
  ...akriBakesItems,
  { title: "Wedding 1", label: "Wedding", image: `${ASSET_PREFIX}/gallery/wedding-1.jpg` },
  { title: "Wedding 2", label: "Wedding", image: `${ASSET_PREFIX}/gallery/wedding-2.jpg` },
  { title: "Birthday 1", label: "Birthday", image: `${ASSET_PREFIX}/gallery/birthday-1.jpg` },
  { title: "Birthday 2", label: "Birthday", image: `${ASSET_PREFIX}/gallery/birthday-2.jpg` },
  { title: "Church 1", label: "Church", image: `${ASSET_PREFIX}/gallery/church-1.jpg` },
  { title: "Seasonal Feature", label: "Gallery", image: `${ASSET_PREFIX}/gallery/seasonal-1.jpg` },
];

const filterTabs = ["All", "Celebration", "Akri Bakes", "Wedding", "Birthday", "Church", "Gallery"];

export default function GalleryPage() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => (active === "All" ? allItems : allItems.filter((i) => i.label === active)),
    [active]
  );

  return (
    <main>
      <FadeIn>
        <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Gallery</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Product Showcase</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">
              A visual collection of our cakes, events, and celebration pieces — crafted for weddings, birthdays, church gatherings, and every milestone.
            </p>
          </div>
        </section>
      </FadeIn>

      <FadeIn>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-wrap gap-3 border-b border-[#e5e5e5] pb-6">
            {filterTabs.map((tab) => (
              <motion.button key={tab} type="button" onClick={() => setActive(tab)}
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                  active === tab
                    ? "bg-[#111111] text-white"
                    : "border border-[#e5e5e5] bg-white text-[#333333] hover:bg-[#f5f5f5]"
                }`}>
                {tab}
              </motion.button>
            ))}
          </div>

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <StaggerItem key={item.title}>
              <div className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-white shadow-sm">
                <div className="relative flex h-72 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)]">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div style={{ display: "none" }} className="absolute rounded-full border border-[#d9d9d9] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">
                    {item.label}
                  </div>
                </div>
                <div className="border-t border-[#e5e5e5] p-5">
                  <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#666666]">{item.title}</p>
                </div>
              </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      </FadeIn>
    </main>
  );
}
