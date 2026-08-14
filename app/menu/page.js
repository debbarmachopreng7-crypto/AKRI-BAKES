"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePageTitle } from "../../components/usePageTitle";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../../components/animations";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getCakeImage } from "../../lib/cakeImages";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const categories = [
  {
    title: "Plain Cakes",
    desc: "Fixed price per cake — 1 lb / ½ kg",
    pricing: "piece",
    items: [
      { name: "Butter Cake", price: 380 },
      { name: "Lemon Cake", price: 380 },
      { name: "Orange Raisin", price: 400 },
      { name: "Plum Cake", price: 450 },
      { name: "Banana Cashew", price: 400 },
      { name: "Regular / Black Sticky Rice Cake", price: 400 },
      { name: "Carrot Raisin Butter Cake", price: 400 },
      { name: "Dry Fruits Cake", price: 400 },
      { name: "Orange Caramel Pudding Cake", price: 420 },
      { name: "Almond Cake", price: 400 },
      { name: "Walnut Cake", price: 400 },
      { name: "Chocolate Walnut Cake", price: 420 },
    ],
  },
  {
    title: "Fresh Cream & Buttercream Cakes",
    pricing: "range",
    items: [
      { name: "Classic Vanilla Butter", price1: 650, price2: 1300 },
      { name: "Butterscotch Delight", price1: 650, price2: 1300 },
      { name: "Lemon Vanilla", price1: 650, price2: 1300 },
      { name: "Divine Mango Cream", price1: 650, price2: 1300 },
      { name: "Strawberry Burst", price1: 650, price2: 1300 },
      { name: "Chocolate Fudge", price1: 650, price2: 1300 },
      { name: "Oreo Chocolate", price1: 650, price2: 1300 },
      { name: "Exotic Pineapple", price1: 650, price2: 1300 },
      { name: "Classic Coffee", price1: 650, price2: 1300 },
    ],
  },
  {
    title: "Celebration Cakes",
    pricing: "range",
    premium: true,
    items: [
      { name: "Black Forest", price1: 800, price2: 1500 },
      { name: "White Forest", price1: 800, price2: 1500 },
      { name: "Blueberry", price1: 800, price2: 1500 },
      { name: "Red Velvet with Cream Cheese", price1: 800, price2: 1500 },
      { name: "Blue Velvet with Cream Cheese", price1: 800, price2: 1500 },
      { name: "Tres Leches (Milk Cake) — Plain", price1: 800, price2: 1500 },
      { name: "Rasmalai, Nuts & Rasgula", price1: 700, price2: 1400 },
      { name: "Chocolate & Nuts", price1: 800, price2: 1500 },
      { name: "Carrot Cake with Cream Cheese", price1: 800, price2: 1500 },
      { name: "Dark Chocolate Truffle", price1: 800, price2: 1600 },
      { name: "Tiramisu with Mascarpone", price1: 800, price2: 1500 },
      { name: "Matcha Strawberry White Chocolate", price1: 800, price2: 1500 },
      { name: "Lemon Meringue Cake", price1: 800, price2: 1500 },
      { name: "Russian Honey Cake", price1: 800, price2: 1500 },
      { name: "Fruit Gateaux", price1: 800, price2: 1500 },
      { name: "Coconut-Lotus Biscoff / Raspberry Cake", price1: 800, price2: 1500 },
      { name: "Chocolate World Cake", price1: 800, price2: 1500 },
      { name: "White Chocolate Truffle", price1: 800, price2: 1600 },
      { name: "Rainbow Cake", price1: 800, price2: 1600 },
      { name: "Salted Nutty Caramel Fudge", price1: 800, price2: 1600 },
    ],
  },
  {
    title: "Premium Mousse Cakes",
    pricing: "range",
    items: [
      { name: "Mango Mousse", price1: 1000, price2: 2000 },
      { name: "Young Coconut Mousse", price1: 1000, price2: 2000 },
      { name: "Hazelnut Pralin Mousse", price1: 1000, price2: 2000 },
      { name: "Mandarine Orange Cheese Mousse", price1: 1000, price2: 2000 },
      { name: "Raspberry White Mousse", price1: 1000, price2: 2000 },
      { name: "Banoffee Mousse", price1: 1000, price2: 2000 },
      { name: "Chocolate Kunaffa Pistachio Mousse", price1: 1000, price2: 2000 },
    ],
  },
  {
    title: "Bento Cakes",
    desc: "Individual petite cakes",
    pricing: "piece",
    items: [
      { name: "Coffee", price: 350 },
      { name: "Vanilla", price: 350 },
      { name: "Mango", price: 350 },
      { name: "Strawberry", price: 350 },
      { name: "Lemon", price: 350 },
      { name: "Pineapple", price: 350 },
      { name: "Butterscotch", price: 350 },
      { name: "Red Velvet", price: 400 },
      { name: "Lemon Meringue", price: 400 },
      { name: "Dark Forest", price: 400 },
      { name: "White Forest", price: 400 },
      { name: "Blueberry", price: 400 },
      { name: "Tiramisu", price: 400 },
    ],
  },
  {
    title: "Fondant Cakes",
    pricing: "range",
    items: [
      { name: "Butter Vanilla", price1: 1000, price2: 2000 },
      { name: "Lemon Cake", price1: 1000, price2: 2000 },
      { name: "Butterscotch", price1: 1000, price2: 2000 },
      { name: "Chocolate", price1: 1000, price2: 2000 },
      { name: "Strawberry", price1: 1000, price2: 2200 },
      { name: "Carrot", price1: 1000, price2: 2000 },
      { name: "Earl Grey", price1: 1000, price2: 2200 },
      { name: "Blueberry", price1: 1000, price2: 2000 },
      { name: "Combo Flavour", price1: 1100, price2: 2000 },
      { name: "Red Velvet with Cheesecake", price1: 1000, price2: 2000 },
      { name: "Coconut Biscoff", price1: 1000, price2: 2000 },
      { name: "Mango Pista", price1: 1000, price2: 2000 },
      { name: "Dark Forest", price1: 1000, price2: 2000 },
      { name: "White Forest", price1: 1000, price2: 2000 },
      { name: "Fruit & Nuts", price1: 1000, price2: 2000 },
      { name: "Triple Berries", price1: 1000, price2: 2000 },
      { name: "Chocolate Walnut & Caramel", price1: 1000, price2: 2000 },
      { name: "Coffee Nutty Praline", price1: 1000, price2: 2000 },
    ],
  },
  {
    title: "Cheesecakes",
    pricing: "cheesecake",
    items: [
      { name: "New York Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Blueberry Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Chocolate Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Mango Coconut Sticky Rice Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Lotus Biscoff Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Japanese Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Lemon Meringue Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Raspberry Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Baklava Pista Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Mix Berries Yogurt Crust Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Strawberry Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Basque Burnt Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Red Velvet Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Peach Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
      { name: "Coconut White Chocolate Cheesecake", mini: 600, inch6: 1000, inch75: 1400 },
    ],
  },
  {
    title: "Sugar Free Cakes",
    pricing: "range",
    items: [
      { name: "Vanilla Custard", price1: 900, price2: 1800 },
      { name: "Lemon", price1: 900, price2: 1800 },
      { name: "Fresh Fruit Gateaux", price1: 900, price2: 1800 },
      { name: "Red Velvet", price1: 900, price2: 1800 },
      { name: "Russian Honey", price1: 900, price2: 1800 },
      { name: "Tiramisu", price1: 900, price2: 1800 },
      { name: "Almond Cake", price1: 900, price2: 1800 },
      { name: "Coconut Pista", price1: 900, price2: 1800 },
      { name: "Carrot Cake Cream Cheese", price1: 900, price2: 1800 },
      { name: "Blueberry", price1: 900, price2: 1800 },
    ],
  },
  {
    title: "Pies & Tarts",
    pricing: "pie",
    items: [
      { name: "Key Lime Pie", mini: 70, small: 200, medium: 500, large: 700 },
      { name: "Lemon Meringue Tart", mini: 70, small: 200, medium: 500, large: 700 },
      { name: "Chocolate Tart", mini: 70, small: 200, medium: 500, large: 700 },
      { name: "Salted Caramel Hazelnut", mini: 70, small: 200, medium: 500, large: 700 },
      { name: "Banoffee Pie", mini: 70, small: 200, medium: 500, large: 700 },
    ],
  },
];

function formatPrice(price) {
  return `₹${price}`;
}

function PriceDisplay({ item, pricing }) {
  if (pricing === "piece") {
    return <span>{formatPrice(item.price)}</span>;
  }
  if (pricing === "range") {
    return <span>{formatPrice(item.price1)} &ndash; {formatPrice(item.price2)}</span>;
  }
  if (pricing === "cheesecake") {
    const parts = [];
    if (item.mini) parts.push(`Mini ${formatPrice(item.mini)}`);
    if (item.inch6) parts.push(`6" ${formatPrice(item.inch6)}`);
    if (item.inch75) parts.push(`7.5" ${formatPrice(item.inch75)}`);
    return <span>{parts.join(" · ")}</span>;
  }
  if (pricing === "pie") {
    const parts = [];
    if (item.mini) parts.push(`Mini ${formatPrice(item.mini)}`);
    if (item.small) parts.push(`Small ${formatPrice(item.small)}`);
    if (item.medium) parts.push(`Med ${formatPrice(item.medium)}`);
    if (item.large) parts.push(`Large ${formatPrice(item.large)}`);
    return <span>{parts.join(" · ")}</span>;
  }
  return null;
}

function OrderModal({ category, item, onClose }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(() =>
    category.pricing === "cheesecake" || category.pricing === "pie" ? "Mini" : "1 lb",
  );
  const [message, setMessage] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("3:00 PM");

  const isPiece = category.pricing === "piece";
  const isRange = category.pricing === "range";
  const isCheesecake = category.pricing === "cheesecake";
  const isPie = category.pricing === "pie";

  const price = isPiece
    ? item.price
    : isRange
      ? size === "2 lb" ? item.price2 : item.price1
      : isCheesecake
        ? size === "Mini" ? item.mini : size === "6 inch" ? item.inch6 : item.inch75
        : isPie
          ? size === "Mini" ? item.mini : size === "Small" ? item.small : size === "Medium" ? item.medium : item.large
          : 0;

  const sizeOptions = category.pricing === "cheesecake"
    ? ["Mini", "6 inch", "7.5 inch"]
    : category.pricing === "pie"
    ? ["Mini", "Small", "Medium", "Large"]
    : ["1 lb", "2 lb"];

  const handleAdd = () => {
    addItem({
      type: "menu",
      name: item.name,
      size: isPiece ? "Standard" : size,
      message: message.trim(),
      pickupDate,
      pickupTime,
      price,
    });
    onClose();
    router.push("/cart");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-md rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-2xl font-semibold text-[#26110B]">{item.name}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#8B7355] hover:bg-[#EDE8E0] text-2xl leading-none">&times;</button>
        </div>

        <div className="mt-6 space-y-4">
          {!isPiece ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Size</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {sizeOptions.map((opt) => (
                  <button key={opt} type="button" onClick={() => setSize(opt)}
                    className={`rounded-full border px-4 py-2 text-sm font-medium transition ${size === opt ? "border-[#26110B] bg-[#26110B] text-white" : "border-[#E8E0D8] bg-white text-[#26110B]"}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <label className="block text-sm font-medium text-[#26110B]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Message on Cake</span>
            <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="e.g. Happy Birthday!" className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]" />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <label className="block text-sm font-medium text-[#26110B]">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Pickup Date</span>
              <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]" />
            </label>
            <label className="block text-sm font-medium text-[#26110B]">
              <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Pickup Time</span>
              <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]">
                {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
              </select>
            </label>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between rounded-2xl bg-[#F9F8F6] px-4 py-3">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Total</span>
          <span className="text-xl font-semibold text-[#26110B]">{formatPrice(price)}</span>
        </div>

        <button type="button" onClick={handleAdd} className="mt-4 inline-flex w-full justify-center rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const tabIds = [
  "plain", "fresh-cream", "celebration", "mousse", "bento", "fondant", "cheesecake", "sugar-free", "pies",
];

export default function MenuPage() {
  usePageTitle("Menu | Akri Bakes");
  const [ordering, setOrdering] = useState(null);
  const [activeTab, setActiveTab] = useState("plain");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => { document.title = "Menu — Akri Bakes"; }, []);

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return categories.map((cat) => ({
      ...cat,
      items: cat.items.filter((item) => item.name.toLowerCase().includes(q)),
    })).filter((cat) => cat.items.length > 0);
  }, [searchQuery]);

  const allResults = filteredCategories;

  return (
    <main>
      <Breadcrumbs items={[{ label: "Menu" }]} />
      <FadeIn>
        <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Full Menu &amp; Price List</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Our Menu</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#26110B]">
              Click <strong>Order</strong> on any item to choose your size, add a message, pick a pickup date, and add to cart.
              Want something fully custom? Visit <strong>Build Your Cake</strong>.
            </p>
            <p className="mt-4 text-sm text-[#8B7355]">For enquiries call: <strong className="text-[#26110B]">8259917757</strong></p>
          </div>
        </section>
      </FadeIn>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          {/* ── Search ──────────────────────────────────── */}
          <FadeIn>
          <div className="relative mb-8">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu items…"
              className="w-full rounded-full border border-[#E8E0D8] bg-white px-5 py-3 pl-12 text-sm text-[#26110B] outline-none transition focus:border-[#26110B]" />
            <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            {searchQuery && (
              <button type="button" onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#8B7355] hover:bg-[#EDE8E0]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            )}
          </div>
          </FadeIn>

          {/* ── Tab bar (hide while searching) ──────────────────── */}
          {!searchQuery.trim() && (
          <FadeIn>
            <div className="mb-10 flex gap-2 overflow-x-auto border-b border-[#E8E0D8] pb-6 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
              {categories.map((cat, idx) => (
                <button key={cat.title} type="button" onClick={() => setActiveTab(tabIds[idx])}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition ${
                    activeTab === tabIds[idx]
                      ? "bg-[#26110B] text-white"
                      : "border border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#EDE8E0]"
                  }`}>
                  {cat.title}
                </button>
              ))}
            </div>
          </FadeIn>
          )}

          {/* ── Content ──────────────────────────────────── */}
          {allResults ? (
            allResults.length > 0 ? (
              allResults.map((category) => (
                <motion.div key={category.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                  <motion.div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-sm" whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{category.title}</p>
                    <p className="mt-1 text-xs text-[#8B7355]">{category.items.length} match{category.items.length !== 1 ? "es" : ""}</p>
                    <div className="mt-4 space-y-3">
                      {category.items.map((item) => (
                        <div key={item.name} className="flex items-center justify-between border-b border-[#f0f0f0] pb-3 last:border-b-0 last:pb-0">
                          <span className="text-sm text-[#26110B]">{item.name}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-medium text-[#26110B]">
                              <PriceDisplay item={item} pricing={category.pricing} />
                            </span>
                            <button type="button" onClick={() => setOrdering({ category, item })}
                              className="rounded-full bg-[#26110B] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#3D2219]">
                              Order
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-12 text-center shadow-sm">
                <p className="text-lg font-medium text-[#8B7355]">No menu items match &ldquo;{searchQuery}&rdquo;</p>
                <button type="button" onClick={() => setSearchQuery("")} className="mt-4 rounded-full bg-[#26110B] px-6 py-2 text-sm font-medium text-white transition hover:bg-[#3D2219]">
                  Clear search
                </button>
              </div>
            )
          ) : (
            categories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={activeTab === tabIds[idx] ? "" : "hidden"}
              >
                <motion.div
                  className="rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-sm"
                  whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{category.title}</p>
                  {category.desc ? <p className="mt-2 text-sm text-[#8B7355]">{category.desc}</p> : null}
                  {category.premium ? <p className="mt-2 text-xs text-[#8B7355]">1 lb {formatPrice(800)} &ndash; 2 lb {formatPrice(1500)} &amp; Premium 2 lb {formatPrice(1600)}</p> : null}
                  {category.pricing === "range" && !category.premium ? (
                    <p className="mt-2 text-sm text-[#8B7355]">1 lb {formatPrice(category.items[0]?.price1 ?? 0)} &ndash; 2 lb {formatPrice(category.items[0]?.price2 ?? 0)}</p>
                  ) : null}
                  {category.pricing === "cheesecake" ? (
                    <p className="mt-2 text-sm text-[#8B7355]">Mini {formatPrice(600)} &middot; 6-inch {formatPrice(1000)} &middot; 7.5-inch {formatPrice(1400)}</p>
                  ) : null}
                  {category.pricing === "pie" ? (
                    <p className="mt-2 text-sm text-[#8B7355]">Mini {formatPrice(70)} &middot; Small {formatPrice(200)} &middot; Medium {formatPrice(500)} &middot; Large {formatPrice(700)}</p>
                  ) : null}

                  <div className="mt-6 space-y-3">
                    {category.items.map((item) => (
                      <div key={item.name} className="flex items-center gap-4 border-b border-[#f0f0f0] pb-3 last:border-b-0 last:pb-0">
                        {getCakeImage(item.name) && (
                          <img
                            src={getCakeImage(item.name)}
                            alt={item.name}
                            loading="lazy"
                            className="h-14 w-14 shrink-0 rounded-2xl object-cover"
                            onError={(e) => { e.currentTarget.style.display = "none"; }}
                          />
                        )}
                        <span className="flex-1 text-sm text-[#26110B]">{item.name}</span>
                        <div className="flex items-center gap-4">
                          <span className="text-sm font-medium text-[#26110B]">
                            <PriceDisplay item={item} pricing={category.pricing} />
                          </span>
                          <button type="button" onClick={() => setOrdering({ category, item })}
                            className="rounded-full bg-[#26110B] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#3D2219]">
                            Order
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))
          )}

          {/* ── Additional Charges ──────────────────────────── */}
          <StaggerContainer>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              ["Photo Cake", "₹300 extra on any cake flavour"],
              ["Fondant Design", "Charges vary by complexity"],
              ["Custom / Bulk Orders", "Call 8259917757 for custom sizes & special designs"],
            ].map(([title, desc]) => (
              <StaggerItem key={title}>
                <motion.div
                  className="rounded-[2rem] border border-[#E8E0D8] bg-[#F9F8F6] p-6 text-center shadow-sm"
                  whileHover={{ y: -4, boxShadow: "0 12px 24px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{title}</p>
                  <p className="mt-3 text-sm text-[#26110B]">{desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
          </StaggerContainer>

          <SlideUp>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="/cakes" className="rounded-full bg-[#26110B] px-8 py-3 font-medium text-white transition hover:bg-[#3D2219]">
              Order a Cake
            </Link>
            <Link href="/build-your-cake" className="rounded-full border border-[#26110B] px-8 py-3 font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
              Build Your Cake
            </Link>
          </div>
          </SlideUp>
        </div>
      </section>

      {ordering && <OrderModal category={ordering.category} item={ordering.item} onClose={() => setOrdering(null)} />}
    </main>
  );
}
