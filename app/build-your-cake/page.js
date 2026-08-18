"use client";

import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePageTitle } from "../../components/usePageTitle";
import { useCart } from "../../components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import { FadeIn, SlideUp, ScaleOnHover } from "../../components/animations";
import Breadcrumbs from "../../components/Breadcrumbs";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

/** ── Cake categories ─────────────────────────── */
const cakeCategories = ["Celebration Cake", "Fresh Cream Cake", "Plain Cake"];

const celebrationBaseBySize = {
  "1 lb": 800, "2 lb": 1500, "3 lb": 2200, "4 lb": 2900, "5 lb": 3600,
};
const freshCreamBaseBySize = {
  "1 lb": 650, "2 lb": 1300, "3 lb": 1950, "4 lb": 2600, "5 lb": 3250,
};

const premiumFlavors = [
  "Dark Chocolate Truffle", "White Chocolate Truffle",
  "Rainbow Cake", "Salted Caramel Fudge",
];

const celebrationFlavorPrices = {
  "Red Velvet": 0, "White Forest": 0, "Blueberry": 0, "Black Forest": 0,
  "Blue Velvet": 0, "Tres Leches (Milk Cake)": 0,
  "Chocolate & Nuts": 0, "Carrot Cake": 0, "Fruit Gateaux": 0,
  "Chocolate World Cake": 0, "Coconut-Lotus Biscoff / Raspberry": 0,
  "Tiramisu": 0, "Lemon Meringue": 0, "Russian Honey Cake": 0,
  "Matcha Strawberry White Chocolate": 0,
  "Dark Chocolate Truffle": 100, "White Chocolate Truffle": 100,
  "Rainbow Cake": 100, "Salted Caramel Fudge": 100,
  "New York Cheesecake": 400, "Lotus Biscoff": 300,
  "Custom Flavor": 0,
};

const freshCreamFlavors = [
  "Classic Vanilla Butter", "Butterscotch Delight", "Lemon Vanilla",
  "Divine Mango Cream", "Strawberry Burst", "Chocolate Fudge",
  "Oreo Chocolate", "Exotic Pineapple", "Classic Coffee",
];

const plainCakes = [
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
];

function getFlavorUpcharge(flavor, size) {
  const base = celebrationFlavorPrices[flavor] ?? 0;
  if (premiumFlavors.includes(flavor) && size === "1 lb") return 0;
  return base;
}

const celebrationFrostingOptions = [
  { name: "Fresh Cream", upcharge: 0 },
  { name: "Cream Cheese Frosting", upcharge: 0 },
  { name: "Chocolate Ganache", upcharge: 0 },
  { name: "Fondant", upcharge: 400 },
];

const freshCreamFrostingOptions = [
  { name: "Fresh Cream", upcharge: 0 },
  { name: "Cream Cheese Frosting", upcharge: 150 },
  { name: "Chocolate Ganache", upcharge: 200 },
];

const decorationPrices = {
  "None": 0, "Photo Cake": 300, "Fresh Flowers": 200,
  "Premium Choc Decoration": 250, "Fondant Theme": 500, "Custom Topper": 150,
};

const occasionColors = {
  "Birthday": "#FF6B6B", "Wedding": "#C9A2C7", "Anniversary": "#E8A87C",
  "Graduation": "#6BCB77", "Church Event": "#4D96FF", "Christmas": "#FF4757",
  "Corporate Event": "#2C3E50", "Other": "#95A5A6",
};

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function BuildYourCakePage() {
  usePageTitle("Build Your Cake | Akri Bakes");
  const router = useRouter();
  const { addItem } = useCart();

  useEffect(() => { document.title = "Build Your Cake — Akri Bakes"; }, []);
  const fileInputRef = useRef(null);

  const [cakeCategory, setCakeCategory] = useState("Celebration Cake");
  const [occasion, setOccasion] = useState("Birthday");
  const [size, setSize] = useState("2 lb");
  const [flavor, setFlavor] = useState("Red Velvet");
  const [plainFlavor, setPlainFlavor] = useState(plainCakes[0].name);
  const [frosting, setFrosting] = useState("Fresh Cream");
  const [decoration, setDecoration] = useState("None");
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("Happy Birthday");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("3:00 PM");
  const [inspirationPhoto, setInspirationPhoto] = useState(null);
  const [photoFileName, setPhotoFileName] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFileName(file.name);
    try {
      const base64 = await toBase64(file);
      setInspirationPhoto(base64);
    } catch {
      setInspirationPhoto(null);
    }
  };

  const clearPhoto = () => {
    setInspirationPhoto(null);
    setPhotoFileName("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const isPlain = cakeCategory === "Plain Cake";
  const isFreshCream = cakeCategory === "Fresh Cream Cake";
  const isCelebration = cakeCategory === "Celebration Cake";
  const currentFrostingOptions = isCelebration ? celebrationFrostingOptions : freshCreamFrostingOptions;

  const unitPrice = useMemo(() => {
    if (isPlain) {
      const plain = plainCakes.find((f) => f.name === plainFlavor);
      const decorationPrice = decorationPrices[decoration] ?? 0;
      return (plain?.price ?? 0) + decorationPrice;
    }
    const baseMap = isFreshCream ? freshCreamBaseBySize : celebrationBaseBySize;
    const baseCake = baseMap[size] ?? 0;
    const flavorUpcharge = getFlavorUpcharge(flavor, size);
    const frostingUpcharge = currentFrostingOptions.find((f) => f.name === frosting)?.upcharge ?? 0;
    const decorationPrice = decorationPrices[decoration] ?? 0;
    return baseCake + flavorUpcharge + frostingUpcharge + decorationPrice;
  }, [isPlain, isFreshCream, size, flavor, plainFlavor, frosting, decoration, currentFrostingOptions]);

  const total = unitPrice * quantity;

  const sizeLabels = useMemo(() => {
    if (isPlain) return [];
    const baseMap = isFreshCream ? freshCreamBaseBySize : celebrationBaseBySize;
    return Object.entries(baseMap).map(([value, price]) => ({
      value, label: `${value} (${value === "1 lb" ? "½ kg" : `${parseInt(value) / 2} kg`})`, price,
    }));
  }, [isPlain, isFreshCream]);

  const priceBreakdown = useMemo(() => {
    if (isPlain) {
      const plain = plainCakes.find((f) => f.name === plainFlavor);
      const decorationPrice = decorationPrices[decoration] ?? 0;
      return [
        { label: `${plainFlavor} (plain cake)`, amount: plain?.price ?? 0 },
        ...(decoration === "None" ? [] : [{ label: decoration, amount: decorationPrice }]),
      ].filter((item) => item.amount >= 0);
    }
    const baseMap = isFreshCream ? freshCreamBaseBySize : celebrationBaseBySize;
    const baseCake = baseMap[size] ?? 0;
    const flavorUpcharge = getFlavorUpcharge(flavor, size);
    const frostingUpcharge = currentFrostingOptions.find((f) => f.name === frosting)?.upcharge ?? 0;
    const decorationPrice = decorationPrices[decoration] ?? 0;
    return [
      { label: `Base Cake (${size})`, amount: baseCake },
      { label: `Flavour (${flavor})`, amount: flavorUpcharge },
      { label: `Frosting (${frosting})`, amount: frostingUpcharge },
      ...(decoration === "None" ? [] : [{ label: decoration, amount: decorationPrice }]),
    ].filter((item) => item.amount >= 0);
  }, [isPlain, isFreshCream, size, flavor, plainFlavor, frosting, decoration, currentFrostingOptions]);

  const handleAddToCart = () => {
    addItem({
      type: "custom",
      name: isPlain ? `Plain ${plainFlavor} Cake` : `Custom ${flavor} Cake`,
      cakeCategory,
      size: isPlain ? "1 lb" : size,
      occasion,
      flavor: isPlain ? plainFlavor : flavor,
      frosting: isPlain ? "None" : frosting,
      decoration,
      message,
      pickupDate,
      pickupTime,
      price: total,
      quantity,
      inspirationPhoto: inspirationPhoto || "",
      photoFileName: photoFileName || "",
    });
    router.push("/cart");
  };

  return (
    <main>
      <Breadcrumbs items={[{ label: "Build Your Cake" }]} />
      <FadeIn>
        <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Build Your Cake</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Design your way — the price updates instantly as you choose</h1>
          </div>
        </section>
      </FadeIn>

      <SlideUp>
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
            <AnimatePresence mode="wait">
            <div className="space-y-6">

              {/* ── Step 1: Cake Category ── */}
              <motion.div key="step-category" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">1) Cake Type</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {cakeCategories.map((cat) => (
                    <ScaleOnHover key={cat}>
                    <button type="button" onClick={() => { setCakeCategory(cat); setFrosting("Fresh Cream"); if (cat === "Plain Cake") setDecoration("None"); }}
                      className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                        cakeCategory === cat
                          ? "border-[#26110B] bg-[#26110B] text-white"
                          : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                      }`}>
                      <div>{cat}</div>
                      <div className="mt-1 text-xs opacity-75">
                        {cat === "Plain Cake" ? "₹380–₹450 fixed" : cat === "Fresh Cream Cake" ? "From ₹650" : "From ₹800"}
                      </div>
                    </button>
                    </ScaleOnHover>
                  ))}
                </div>
              </div>
              </motion.div>

              {/* ── Step 2: Occasion ── */}
              <motion.div key="step-occasion" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">2) Occasion</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {Object.keys(occasionColors).map((item) => (
                    <ScaleOnHover key={item}>
                    <button type="button" onClick={() => setOccasion(item)}
                      className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition flex items-center gap-3 ${
                        occasion === item
                          ? "border-[#26110B] bg-[#26110B] text-white"
                          : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                      }`}>
                      <span className="inline-block h-3 w-3 rounded-full" style={{ backgroundColor: occasionColors[item] }} />
                      {item}
                    </button>
                    </ScaleOnHover>
                  ))}
                </div>
              </div>
              </motion.div>

              {/* ── Step 3: Size (hidden for plain cake) ── */}
              {!isPlain && (
              <motion.div key="step-size" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">3) Cake Size</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {sizeLabels.map((item) => (
                    <ScaleOnHover key={item.value}>
                    <button type="button" onClick={() => setSize(item.value)}
                      className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                        size === item.value
                          ? "border-[#26110B] bg-[#26110B] text-white"
                          : "border-[#E8E0D8] bg-white text-[#26110B]"
                      }`}>
                      <div>{item.label}</div>
                      <div className="mt-1 text-xs opacity-75">₹{item.price}</div>
                    </button>
                    </ScaleOnHover>
                  ))}
                  <ScaleOnHover>
                  <button type="button"
                    className="rounded-2xl border border-dashed border-[#D0C8B8] bg-[#F9F8F6] px-4 py-3 text-center text-sm text-[#8B7355]">
                    Custom (quote)
                  </button>
                  </ScaleOnHover>
                </div>
              </div>
              </motion.div>
              )}

              {/* ── Step 4: Flavor ── */}
              <motion.div key="step-flavor" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{isPlain ? "3" : "4"}) Choose Flavor</p>
                {isPlain ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {plainCakes.map((item) => (
                      <ScaleOnHover key={item.name}>
                      <button type="button" onClick={() => setPlainFlavor(item.name)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          plainFlavor === item.name
                            ? "border-[#26110B] bg-[#26110B] text-white"
                            : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                        }`}>
                        {item.name}
                        <span className="ml-2 text-xs opacity-75">₹{item.price}</span>
                      </button>
                      </ScaleOnHover>
                    ))}
                  </div>
                ) : isFreshCream ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {freshCreamFlavors.map((item) => (
                      <ScaleOnHover key={item}>
                      <button type="button" onClick={() => setFlavor(item)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          flavor === item
                            ? "border-[#26110B] bg-[#26110B] text-white"
                            : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                        }`}>
                        {item}
                        <span className="ml-2 text-xs opacity-75">₹0</span>
                      </button>
                      </ScaleOnHover>
                    ))}
                  </div>
                ) : (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {Object.entries(celebrationFlavorPrices).map(([item, upcharge]) => (
                      <ScaleOnHover key={item}>
                      <button type="button" onClick={() => setFlavor(item)}
                        className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                          flavor === item
                            ? "border-[#26110B] bg-[#26110B] text-white"
                            : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                        }`}>
                        {item}
                        {item === "Custom Flavor" ? null : <span className="ml-2 text-xs opacity-75">{getFlavorUpcharge(item, size) > 0 ? `+₹${getFlavorUpcharge(item, size)}` : "₹0"}</span>}
                      </button>
                      </ScaleOnHover>
                    ))}
                  </div>
                )}
              </div>
              </motion.div>

              {/* ── Step 5: Frosting (hidden for plain cake) ── */}
              {!isPlain && (
              <motion.div key="step-frosting" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">5) Frosting</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {currentFrostingOptions.map((item) => (
                    <ScaleOnHover key={item.name}>
                    <button type="button" onClick={() => setFrosting(item.name)}
                      className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                        frosting === item.name
                          ? "border-[#26110B] bg-[#26110B] text-white"
                          : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                      }`}>
                      {item.name}
                      <span className="ml-1 text-xs opacity-75">{item.upcharge > 0 ? `+₹${item.upcharge}` : "₹0"}</span>
                    </button>
                    </ScaleOnHover>
                  ))}
                </div>
              </div>
              </motion.div>
              )}

              {/* ── Step 6: Decoration ── */}
              <motion.div key="step-decoration" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{isPlain ? "4" : "6"}) Decoration</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {Object.entries(decorationPrices).map(([item, price]) => (
                    <ScaleOnHover key={item}>
                    <button type="button" onClick={() => setDecoration(item)}
                      className={`rounded-2xl border px-4 py-3 text-center text-sm font-medium transition ${
                        decoration === item
                          ? "border-[#26110B] bg-[#26110B] text-white"
                          : "border-[#E8E0D8] bg-[#F9F8F6] text-[#26110B]"
                      }`}>
                      {item}
                      {item === "None" ? null : <span className="ml-1 text-xs opacity-75">{price > 0 ? `(+₹${price})` : "Included"}</span>}
                    </button>
                    </ScaleOnHover>
                  ))}
                </div>
              </div>
              </motion.div>

              {/* ── Step 7: Message ── */}
              <motion.div key="step-message" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{isPlain ? "5" : "7"}) Message on Cake</p>
                <input value={message} onChange={(e) => setMessage(e.target.value)}
                  className="mt-5 w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]" />
              </div>
              </motion.div>

              {/* ── Step 8: Photo ── */}
              <motion.div key="step-photo" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{isPlain ? "6" : "8"}) Inspiration Photo (optional)</p>
                <p className="mt-3 text-sm text-[#8B7355]">Upload a cake photo you love — our bakers will use it as a reference.</p>
                <div className="mt-4">
                  {inspirationPhoto ? (
                    <div className="relative inline-block">
                      <Image src={inspirationPhoto} alt="Inspiration" width={192} height={192} unoptimized className="h-48 w-48 rounded-2xl border border-[#E8E0D8] object-cover shadow-sm" />
                      <p className="mt-2 text-xs text-[#8B7355]">{photoFileName}</p>
                      <button type="button" onClick={clearPhoto} className="mt-2 rounded-full border border-[#E8E0D8] px-3 py-1 text-xs text-[#26110B] hover:bg-[#EDE8E0]">Remove</button>
                    </div>
                  ) : (
                    <button type="button" onClick={() => fileInputRef.current?.click()}
                      className="w-full rounded-2xl border-2 border-dashed border-[#D0C8B8] bg-[#F9F8F6] px-4 py-12 text-center text-sm text-[#8B7355] transition hover:border-[#26110B]">
                      Click to upload inspiration photo
                    </button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
                <p className="mt-3 text-xs text-[#A09080]">PNG, JPG, WEBP — up to 10 MB</p>
              </div>
              </motion.div>

              {/* ── Step 9: Pickup ── */}
              <motion.div key="step-pickup" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#8B7355]">{isPlain ? "7" : "9"}) Pickup Date &amp; Time</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-[#26110B]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Date</span>
                    <input type="date" value={pickupDate} onChange={(e) => setPickupDate(e.target.value)} className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]" />
                  </label>
                  <label className="block text-sm font-medium text-[#26110B]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Time</span>
                    <select value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]">
                      {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                    </select>
                  </label>
                </div>
              </div>
              </motion.div>
            </div>
            </AnimatePresence>

            {/* ── SIDEBAR ────────────────────────────────── */}
            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-[#26110B] p-8 text-white shadow-sm sticky top-28">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Live Price Calculator</p>
                <div className="mt-6 space-y-4 text-sm">
                  {priceBreakdown.map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="text-white/80">{item.label}</span>
                      <span className="font-medium">₹{item.amount}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between border-t border-white/20 pt-4 text-lg font-semibold">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>

                {/* Quantity */}
                <div className="mt-6 border-t border-white/20 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Quantity</p>
                  <div className="mt-3 flex items-center gap-4">
                    <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-lg font-medium text-white transition hover:bg-white/10">
                      &minus;
                    </button>
                    <span className="min-w-8 text-center text-xl font-semibold">{quantity}</span>
                    <button type="button" onClick={() => setQuantity(Math.min(99, quantity + 1))}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-lg font-medium text-white transition hover:bg-white/10">
                      +
                    </button>
                  </div>
                </div>

                <button type="button" onClick={handleAddToCart}
                  className="mt-6 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 font-medium text-[#26110B] transition hover:bg-white/90">
                  Add to Cart — ₹{total}
                </button>
              </div>

              <button type="button" onClick={() => router.push("/cart")}
                className="w-full rounded-full border border-[#E8E0D8] bg-white px-6 py-3 font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                View Cart
              </button>
            </aside>
          </div>
        </div>
      </section>
      </SlideUp>
    </main>
  );
}
