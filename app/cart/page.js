"use client";

import Link from "next/link";
import { useCart } from "../../components/CartContext";

function ItemDetails({ item }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-[#111111]">{item.name}</h2>
      <p className="mt-2 text-sm text-[#666666]">{item.size}</p>
      {item.flavor ? (
        <p className="mt-1 text-sm text-[#666666]">
          {item.occasion} • {item.flavor} • {item.frosting} • {item.decoration}
        </p>
      ) : null}
      <p className="mt-4 text-sm text-[#333333]">
        <span className="font-medium text-[#111111]">Pickup:</span>{" "}
        {item.pickupDate ? item.pickupDate : "Date not set"}
        {item.pickupTime ? `, ${item.pickupTime}` : ""}
      </p>
      {item.message ? (
        <p className="mt-2 text-sm text-[#333333]">
          <span className="font-medium text-[#111111]">Custom Message:</span> {item.message}
        </p>
      ) : null}
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, subtotal, ready } = useCart();

  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Shopping Cart</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Your Cart</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">Pickup only. No delivery. No shipping. Review your cake, pickup date, and time before checkout.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          {ready && items.length === 0 ? (
            <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-12 text-center shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-[#111111]">Your cart is empty</h2>
              <p className="mt-4 text-[#333333]">Browse the menu or build your own cake to get started.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/menu" className="rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                  Browse Menu
                </Link>
                <Link href="/build-your-cake" className="rounded-full border border-[#111111] px-6 py-3 font-medium text-[#111111] transition hover:bg-[#f5f5f5]">
                  Build Your Cake
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-start justify-between border-b border-[#f0f0f0] pb-5 last:border-b-0 last:pb-0">
                      <ItemDetails item={item} />
                      <div className="text-right">
                        <p className="font-medium text-[#111111]">₹{item.price}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="mt-3 text-sm font-medium text-[#999999] underline transition hover:text-[#111111]"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="rounded-[2rem] border border-[#e5e5e5] bg-[#fafafa] p-6">
                  <div className="space-y-3 text-[#333333]">
                    <p className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal}</span></p>
                    <p className="flex items-center justify-between"><span>Pickup fee</span><span>₹0</span></p>
                    <p className="flex items-center justify-between border-t border-[#e5e5e5] pt-3 text-lg font-semibold text-[#111111]"><span>Total</span><span>₹{subtotal}</span></p>
                  </div>
                  <Link href="/checkout" className="mt-6 inline-flex w-full justify-center rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                    Checkout
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
