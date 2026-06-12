"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";

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

const paymentMethods = ["Pay at Store", "UPI", "PhonePe", "Google Pay", "Paytm"];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, placeOrder, ready } = useCart();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    pickupTime: "3:00 PM",
    notes: "",
  });
  const [payment, setPayment] = useState("Pay at Store");
  const [error, setError] = useState("");

  const update = (field) => (event) => setForm((current) => ({ ...current, [field]: event.target.value }));

  const handlePlaceOrder = () => {
    if (!form.name.trim() || !form.phone.trim() || !form.pickupDate) {
      setError("Please enter your name, phone number, and pickup date.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const order = placeOrder({ ...form, payment });
    router.push(`/order-confirmation?id=${order.orderId}`);
  };

  if (ready && items.length === 0) {
    return (
      <main>
        <section className="flex min-h-[60vh] items-center border-b border-[#e5e5e5] bg-[#fafafa] py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-serif text-4xl font-semibold text-[#111111]">Your cart is empty</h1>
            <p className="mt-4 text-[#333333]">Add a cake to your cart before checking out.</p>
            <Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
              Browse Menu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Checkout</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Pickup Information</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">No account creation. No login. No password. No OTP. Pickup only.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Name</span>
                <input value={form.name} onChange={update("name")} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </label>
              <label className="block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Phone Number</span>
                <input value={form.phone} onChange={update("phone")} inputMode="tel" className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </label>
              <label className="block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Email (Optional)</span>
                <input value={form.email} onChange={update("email")} type="email" className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </label>
              <label className="block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Date</span>
                <input value={form.pickupDate} onChange={update("pickupDate")} type="date" className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </label>
              <label className="block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Pickup Time</span>
                <select value={form.pickupTime} onChange={update("pickupTime")} className="w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]">
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </label>
              <label className="md:col-span-2 block text-sm font-medium text-[#333333]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#666666]">Notes</span>
                <textarea value={form.notes} onChange={update("notes")} className="h-32 w-full rounded-2xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-3 text-[#111111] outline-none focus:border-[#111111]" />
              </label>
            </div>
          </div>

          <div className="space-y-8">
            <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-[#111111]">Payment</h2>
              <p className="mt-3 text-sm leading-7 text-[#333333]">Pay at store or make an advance payment using your preferred method.</p>
              <div className="mt-6 space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => setPayment(method)}
                    className={`block w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                      payment === method
                        ? "border-[#111111] bg-[#111111] text-white"
                        : "border-[#e5e5e5] bg-white text-[#333333]"
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#e5e5e5] bg-[#fafafa] p-8 shadow-sm">
              <h2 className="font-serif text-2xl font-semibold text-[#111111]">Order Summary</h2>
              <div className="mt-5 space-y-3 text-[#333333]">
                {items.map((item) => (
                  <p key={item.id} className="flex items-center justify-between text-sm">
                    <span>{item.name} ({item.size})</span>
                    <span>₹{item.price}</span>
                  </p>
                ))}
                <p className="flex items-center justify-between border-t border-[#e5e5e5] pt-3"><span>Subtotal</span><span>₹{subtotal}</span></p>
                <p className="flex items-center justify-between"><span>Pickup fee</span><span>₹0</span></p>
                <p className="flex items-center justify-between border-t border-[#e5e5e5] pt-3 text-lg font-semibold text-[#111111]"><span>Total</span><span>₹{subtotal}</span></p>
              </div>

              {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

              <button
                type="button"
                onClick={handlePlaceOrder}
                className="mt-6 inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
