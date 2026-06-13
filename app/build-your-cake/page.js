"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

export default function BuildYourCakePage() {
  const router = useRouter();
  const { addItem } = useCart();

  const [occasion, setOccasion] = useState("Birthday");
  const [size, setSize] = useState("2 lb");
  const [flavor, setFlavor] = useState("Red Velvet");
  const [frosting, setFrosting] = useState("Buttercream");
  const [decoration, setDecoration] = useState("None");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("3:00 PM");
  const [message, setMessage] = useState("Happy Birthday Imti");

  const priceBreakdown = useMemo(() => {
    const baseBySize = {
      "1 lb": 800,
      "2 lb": 1500,
      "3 lb": 2200,
      "4 lb": 2900,
      "5 lb": 3600,
      Custom: 0,
    };

    const decorationPrices = {
      None: 0,
      "Photo Cake": 300,
      "Fresh Flowers": 200,
      "Premium Chocolate Decoration": 250,
      "Fondant Theme": 500,
      "Custom Topper": 150,
    };

    const baseCake = baseBySize[size] ?? 0;
    const decorationPrice = decorationPrices[decoration] ?? 0;

    return [
      { label: `Base Cake (${size} ${flavor})`, amount: baseCake },
      { label: decoration, amount: decorationPrice },
      { label: "Pickup service", amount: 0 },
    ];
  }, [size, flavor, decoration]);

  const total = priceBreakdown.reduce((sum, item) => sum + item.amount, 0);

  const handleAddToCart = () => {
    addItem({
      type: "custom",
      name: `Custom ${flavor} Cake`,
      size,
      occasion,
      flavor,
      frosting,
      decoration,
      message,
      pickupDate,
      pickupTime,
      price: total,
    });
    router.push("/cart");
  };

  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Build Your Cake</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Design your cake and see the price update instantly.</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">Pick an occasion, size, flavour, frosting, and decoration. Then choose pickup or delivery and your date and time at checkout.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 1: Occasion</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Birthday",
                    "Wedding",
                    "Anniversary",
                    "Graduation",
                    "Church Event",
                    "Christmas",
                    "Corporate Event",
                    "Other",
                  ].map((item) => (
                    <button key={item} type="button" onClick={() => setOccasion(item)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${occasion === item ? "border-[#111111] bg-[#111111] text-white" : "border-[#e5e5e5] bg-[#fafafa] text-[#222222]"}`}>
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 2: Cake Size</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  {[
                    "1 lb",
                    "2 lb",
                    "3 lb",
                    "4 lb",
                    "5 lb",
                    "Custom",
                  ].map((item) => (
                    <button key={item} type="button" onClick={() => setSize(item)} className={`rounded-full border px-4 py-2 text-sm font-medium transition ${size === item ? "border-[#111111] bg-[#111111] text-white" : "border-[#e5e5e5] bg-white text-[#222222]"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-[#666666]">Base price updates instantly.</p>
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 3: Flavor</p>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {[
                    "Dark Chocolate Truffle",
                    "Red Velvet",
                    "White Forest",
                    "Blueberry",
                    "Tiramisu",
                    "Russian Honey Cake",
                    "Lemon Meringue",
                    "Lotus Biscoff",
                    "New York Cheesecake",
                    "Custom Flavor",
                  ].map((item) => (
                    <button key={item} type="button" onClick={() => setFlavor(item)} className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${flavor === item ? "border-[#111111] bg-[#111111] text-white" : "border-[#e5e5e5] bg-[#fafafa] text-[#222222]"}`}>
                      {item}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-sm text-[#666666]">Pulled directly from your menu.</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 4: Frosting</p>
                  <div className="mt-5 space-y-3">
                    {[
                      "Buttercream",
                      "Fresh Cream",
                      "Cream Cheese Frosting",
                      "Chocolate Ganache",
                      "Fondant",
                    ].map((item) => (
                      <button key={item} type="button" onClick={() => setFrosting(item)} className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${frosting === item ? "border-[#111111] bg-[#111111] text-white" : "border-[#e5e5e5] bg-[#fafafa] text-[#222222]"}`}>
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 5: Decorations</p>
                  <div className="mt-5 space-y-3">
                    {[
                      "None",
                      "Photo Cake",
                      "Fresh Flowers",
                      "Premium Chocolate Decoration",
                      "Fondant Theme",
                      "Custom Topper",
                    ].map((item) => (
                      <button key={item} type="button" onClick={() => setDecoration(item)} className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${decoration === item ? "border-[#111111] bg-[#111111] text-white" : "border-[#e5e5e5] bg-[#fafafa] text-[#222222]"}`}>
                        {item}{item === "None" ? " (+₹0)" : ""}{item === "Photo Cake" ? " (+₹300)" : ""}{item === "Fresh Flowers" ? " (+₹200)" : ""}{item === "Premium Chocolate Decoration" ? " (+₹250)" : ""}{item === "Fondant Theme" ? " (+₹500)" : ""}{item === "Custom Topper" ? " (+₹150)" : ""}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 6: Upload Reference</p>
                <div className="mt-5 rounded-2xl border border-dashed border-[#d9d9d9] bg-[#fafafa] px-4 py-12 text-center text-sm text-[#666666]">
                  Upload Inspiration Image
                </div>
                <p className="mt-4 text-sm text-[#666666]">Customer uploads Pinterest, Instagram, or previous cake references.</p>
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 7: Cake Message</p>
                <input value={message} onChange={(event) => setMessage(event.target.value)} className="mt-5 w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Step 8: Pickup</p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Date</span>
                    <input type="date" value={pickupDate} onChange={(event) => setPickupDate(event.target.value)} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
                  </label>

                  <label className="block text-sm font-medium text-[#333333]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Time</span>
                    <select value={pickupTime} onChange={(event) => setPickupTime(event.target.value)} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]">
                      {[
                        "9:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 PM",
                        "1:00 PM",
                        "2:00 PM",
                        "3:00 PM",
                        "4:00 PM",
                        "5:00 PM",
                        "6:00 PM",
                        "7:00 PM",
                      ].map((item) => (
                        <option key={item} value={item}>{item}</option>
                      ))}
                    </select>
                  </label>
                </div>
                <p className="mt-4 text-sm text-[#666666]">Based on your working hours.</p>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-[2rem] border border-[#e5e5e5] bg-[#111111] p-8 text-white shadow-sm">
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
                  <span>TOTAL</span>
                  <span>₹{total}</span>
                </div>
              </div>

              <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">Summary</p>
                <div className="mt-5 space-y-3 text-sm text-[#333333]">
                  <p><span className="font-medium text-[#111111]">Occasion:</span> {occasion}</p>
                  <p><span className="font-medium text-[#111111]">Flavor:</span> {flavor}</p>
                  <p><span className="font-medium text-[#111111]">Frosting:</span> {frosting}</p>
                  <p><span className="font-medium text-[#111111]">Decoration:</span> {decoration}</p>
                  <p><span className="font-medium text-[#111111]">Pickup:</span> {pickupDate || "Select a date"} {pickupTime}</p>
                  <p><span className="font-medium text-[#111111]">Message:</span> {message}</p>
                </div>

                <button type="button" onClick={handleAddToCart} className="mt-6 inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                  Add to Cart
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
