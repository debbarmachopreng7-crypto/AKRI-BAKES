"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../../components/CartContext";

const timeSlots = [
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
];

export default function ProductOrder({ product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [size, setSize] = useState("1 lb");
  const [message, setMessage] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("3:00 PM");

  const price = size === "2 lb" ? product.price2 : product.price1;

  const handleAddToCart = () => {
    addItem({
      type: "menu",
      name: product.name,
      size,
      message: message.trim(),
      pickupDate,
      pickupTime,
      price,
    });
    router.push("/cart");
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#666666]">Weight</p>
        <div className="mt-4 flex gap-3">
          {["1 lb", "2 lb"].map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                size === option
                  ? "border-[#111111] bg-[#111111] text-white"
                  : "border-[#e5e5e5] bg-white text-[#333333]"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4 rounded-[2rem] border border-[#e5e5e5] bg-white p-6 shadow-sm">
        <label className="block text-sm font-medium text-[#333333]">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Message on Cake</span>
          <input
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder="e.g. Happy Birthday Ato"
            className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]"
          />
        </label>

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block text-sm font-medium text-[#333333]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Date</span>
            <input
              type="date"
              value={pickupDate}
              onChange={(event) => setPickupDate(event.target.value)}
              className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]"
            />
          </label>
          <label className="block text-sm font-medium text-[#333333]">
            <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Time</span>
            <select
              value={pickupTime}
              onChange={(event) => setPickupTime(event.target.value)}
              className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex items-center justify-between rounded-[2rem] border border-[#e5e5e5] bg-[#fafafa] px-6 py-4">
        <span className="text-sm font-semibold uppercase tracking-[0.25em] text-[#666666]">Price</span>
        <span className="text-xl font-semibold text-[#111111]">₹{price}</span>
      </div>

      <button
        type="button"
        onClick={handleAddToCart}
        className="inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]"
      >
        Add to Cart
      </button>
    </div>
  );
}
