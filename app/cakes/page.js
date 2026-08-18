"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePageTitle } from "../../components/usePageTitle";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../../components/animations";
import Breadcrumbs from "../../components/Breadcrumbs";
import { getCakeImage } from "../../lib/cakeImages";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

const tabs = [
  { id: "celebration", label: "Celebration Cakes" },
  { id: "cheesecake", label: "Cheesecakes" },
  { id: "mousse", label: "Mousse Cakes" },
];

const cakeData = {
  celebration: {
    title: "Celebration Cakes",
    pricing: "Prices vary — see each item",
    items: [
      { name: "Black Forest", price1: 800, price2: 1500 },
      { name: "White Forest", price1: 800, price2: 1500 },
      { name: "Blueberry", price1: 800, price2: 1500 },
      { name: "Red Velvet with Cream Cheese", price1: 800, price2: 1500 },
      { name: "Blue Velvet with Cream Cheese", price1: 800, price2: 1500 },
      { name: "Tres Leches (Milk Cake) — Plain", price1: 800, price2: 1500 },
      { name: "Rasmalai, Nuts & Rasgula", price1: 800, price2: 1500 },
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
  cheesecake: {
    title: "Cheesecakes",
    pricing: "Mini ₹600 · 6-inch ₹1,000 · 7.5-inch ₹1,400",
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
  mousse: {
    title: "Mousse Cakes",
    pricing: "1 lb ₹1,000 — 2 lb ₹2,000",
    items: [
      { name: "Mango Mousse", price1: 1000, price2: 2000 },
      { name: "Young Coconut Mousse", price1: 1000, price2: 2000 },
      { name: "Hazelnut Praline Mousse", price1: 1000, price2: 2000 },
      { name: "Mandarin Orange Cheese Mousse", price1: 1000, price2: 2000 },
      { name: "Raspberry White Mousse", price1: 1000, price2: 2000 },
      { name: "Banoffee Mousse", price1: 1000, price2: 2000 },
      { name: "Chocolate Kunaffa Pistachio Mousse", price1: 1000, price2: 2000 },
    ],
  },
};

function OrderModal({ cake, onClose }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState(cake.price1 ? "1 lb" : "Mini");
  const [message, setMessage] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("3:00 PM");

  const hasLb = cake.price1 != null;
  const price = hasLb
    ? (size === "2 lb" ? cake.price2 : cake.price1)
    : size === "Mini" ? cake.mini
    : size === "6 inch" ? cake.inch6
    : cake.inch75;

  const sizeOptions = hasLb
    ? ["1 lb", "2 lb"]
    : ["Mini", "6 inch", "7.5 inch"];

  const handleAdd = () => {
    addItem({
      type: "menu",
      name: cake.name,
      size,
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
          <h2 className="font-serif text-2xl font-semibold text-[#26110B]">{cake.name}</h2>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-[#8B7355] hover:bg-[#EDE8E0] text-2xl leading-none">&times;</button>
        </div>
        <div className="mt-6 space-y-4">
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
          <span className="text-xl font-semibold text-[#26110B]">₹{price}</span>
        </div>
        <button type="button" onClick={handleAdd} className="mt-4 inline-flex w-full justify-center rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#3D2219]">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

function formatPrice(p) { return `₹${p}`; }

function CakesContent() {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("celebration");
  const [ordering, setOrdering] = useState(null);

  useEffect(() => { document.title = "Our Cakes — Akri Bakes"; }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");
    if (tab && tabs.some((t) => t.id === tab)) setActiveTab(tab);
  }, [pathname]);

  const currentCategory = cakeData[activeTab];

  return (
    <main>
      <Breadcrumbs items={[{ label: "Cakes" }]} />
      <FadeIn>
        <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Order Online</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Our Cakes</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#26110B]">
              Pick your cake, choose the size, add a message and pickup date — then checkout directly.
              Or build a fully custom cake with your choice of flavor, frosting, and decoration.
            </p>
          </div>
        </section>
      </FadeIn>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="mb-10 flex justify-center gap-3 overflow-x-auto border-b border-[#E8E0D8] pb-6 scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none]">
              {tabs.map((tab) => (
                <button key={tab.id} type="button" onClick={() => setActiveTab(tab.id)}
                  className={`shrink-0 rounded-full px-6 py-3 text-sm font-medium transition ${activeTab === tab.id ? "bg-[#26110B] text-white" : "border border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#EDE8E0]"}`}>
                  {tab.label}
                </button>
              ))}
            </div>
          </FadeIn>

          <p className="mb-8 text-center text-sm text-[#8B7355]">{currentCategory.pricing}</p>

          <StaggerContainer key={activeTab}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {currentCategory.items.map((cake) => (
              <StaggerItem key={cake.name}>
                <motion.div
                  className="rounded-[2rem] border border-[#E8E0D8] bg-white p-6 shadow-sm"
                  whileHover={{ y: -6, boxShadow: "0 16px 32px rgba(0,0,0,0.12)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="h-48 overflow-hidden rounded-[1.5rem] bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)]">
                    {getCakeImage(cake.name) && (
                      <img
                        src={getCakeImage(cake.name)}
                        alt={cake.name}
                        loading="lazy"
                        className="h-full w-full object-cover"
                        onError={(e) => { e.currentTarget.style.display = "none"; }}
                      />
                    )}
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-[#26110B]">{cake.name}</h3>
                  <p className="mt-2 text-sm text-[#8B7355]">
                    {cake.price1
                      ? `${formatPrice(cake.price1)} — ${formatPrice(cake.price2)}`
                      : `Mini ${formatPrice(cake.mini)} · 6" ${formatPrice(cake.inch6)} · 7.5" ${formatPrice(cake.inch75)}`}
                  </p>
                  <button type="button" onClick={() => setOrdering(cake)}
                    className="mt-5 inline-flex w-full justify-center rounded-full bg-[#26110B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3D2219]">
                    Order This Cake
                  </button>
                </motion.div>
              </StaggerItem>
            ))}
          </div>
          </StaggerContainer>

          <SlideUp>
          <div className="mt-16 text-center border-t border-[#E8E0D8] pt-12">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#8B7355]">Looking for More?</p>
            <p className="mt-3 text-[#26110B]">Plain Cakes, Fondant Cakes, Bento Cakes, Pies &amp; more</p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link href="/menu" className="rounded-full bg-[#26110B] px-8 py-3 font-medium text-white transition hover:bg-[#3D2219]">
                View Full Menu &amp; Prices
              </Link>
              <Link href="/build-your-cake" className="rounded-full border border-[#26110B] px-8 py-3 font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                Build Your Cake
              </Link>
            </div>
          </div>
          </SlideUp>
        </div>
      </section>

      {ordering && <OrderModal cake={ordering} onClose={() => setOrdering(null)} />}
    </main>
  );
}

export default function CakesPage() {
  usePageTitle("Cakes & Pastries | Akri Bakes");
  return <CakesContent />;
}
