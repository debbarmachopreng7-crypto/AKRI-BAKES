"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FadeIn, StaggerContainer, StaggerItem } from "../../components/animations";

const allItems = [
  { title: "Wedding 1", label: "Wedding", image: "/gallery/wedding-1.jpg" },
  { title: "Wedding 2", label: "Wedding", image: "/gallery/wedding-2.jpg" },
  { title: "Birthday 1", label: "Birthday", image: "/gallery/birthday-1.jpg" },
  { title: "Birthday 2", label: "Birthday", image: "/gallery/birthday-2.jpg" },
  { title: "Church 1", label: "Church", image: "/gallery/church-1.jpg" },
  { title: "Seasonal Feature", label: "Gallery", image: "/gallery/seasonal-1.jpg" },
];

const filterTabs = ["All", "Wedding", "Birthday", "Church", "Gallery"];

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
              A visual collection of our cakes, events, and celebration pieces.
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
