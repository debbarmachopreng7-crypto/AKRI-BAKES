"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartContext";
import Breadcrumbs from "../../components/Breadcrumbs";

function ItemDetails({ item }) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-[#26110B]">{item.name}</h2>
      <p className="mt-2 text-sm text-[#8B7355]">{item.size}</p>
      {item.flavor ? (
        <p className="mt-1 text-sm text-[#8B7355]">
          {item.occasion} • {item.flavor} • {item.frosting} • {item.decoration}
        </p>
      ) : null}
      <p className="mt-4 text-sm text-[#26110B]">
        <span className="font-medium text-[#26110B]">Pickup:</span>{" "}
        {item.pickupDate ? item.pickupDate : "Date not set"}
        {item.pickupTime ? `, ${item.pickupTime}` : ""}
      </p>
      {item.message ? (
        <p className="mt-2 text-sm text-[#26110B]">
          <span className="font-medium text-[#26110B]">Custom Message:</span> {item.message}
        </p>
      ) : null}
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, ready } = useCart();
  const [selected, setSelected] = useState(new Set());

  const toggleItem = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const toggleAll = () => {
    if (selected.size === items.length) {
      setSelected(new Set());
    } else {
      setSelected(new Set(items.map((i) => i.id)));
    }
  };

  const removeSelected = () => {
    if (selected.size === 0) return;
    if (!confirm(`Remove ${selected.size} item(s) from cart?`)) return;
    selected.forEach((id) => removeItem(id));
    setSelected(new Set());
  };

  const allSelected = items.length > 0 && selected.size === items.length;
  useEffect(() => { document.title = "Cart — Akri Bakes"; }, []);

  return (
    <main>
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Shopping Cart</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Your Cart</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#26110B]">Pickup or delivery available. Review your cake, then choose pickup or delivery and pay at checkout.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4">
          {ready && items.length === 0 ? (
            <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-12 text-center shadow-sm">
              <h2 className="font-serif text-3xl font-semibold text-[#26110B]">Your cart is empty</h2>
              <p className="mt-4 text-[#26110B]">Browse the menu or build your own cake to get started.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/menu" className="rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#26110B]">
                  Browse Menu
                </Link>
                <Link href="/build-your-cake" className="rounded-full border border-[#26110B] px-6 py-3 font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                  Build Your Cake
                </Link>
              </div>
            </div>
          ) : (
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-sm">
                {items.length > 1 && (
                  <div className="mb-5 flex items-center justify-between border-b border-[#E8E0D8] pb-4">
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#26110B]">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll}
                        className="h-4 w-4 rounded border-[#D0C8B8] text-[#26110B] focus:ring-[#26110B]" />
                      {allSelected ? "Deselect All" : "Select All"}
                    </label>
                    {selected.size > 0 && (
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[#8B7355]">{selected.size} selected</span>
                        <button type="button" onClick={removeSelected}
                          className="text-sm font-medium text-red-600 underline transition hover:text-red-800">
                          Remove Selected
                        </button>
                      </div>
                    )}
                  </div>
                )}
              <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
                <div className="space-y-6">
                  {items.map((item) => {
                    const quantity = item.quantity ?? 1;
                    return (
                      <div key={item.id} className="flex items-start gap-4 border-b border-[#E8E0D8] pb-5 last:border-b-0 last:pb-0">
                        <label className="mt-1 flex shrink-0 cursor-pointer">
                          <input type="checkbox" checked={selected.has(item.id)} onChange={() => toggleItem(item.id)}
                            className="h-4 w-4 rounded border-[#D0C8B8] text-[#26110B] focus:ring-[#26110B]" />
                        </label>
                        <div className="flex flex-1 items-start justify-between">
                          <ItemDetails item={item} />
                          <div className="text-right">
                          <p className="font-medium text-[#26110B]">₹{item.price * quantity}</p>
                          {quantity > 1 ? (
                            <p className="mt-1 text-xs text-[#8B7355]">₹{item.price} each</p>
                          ) : null}
                          <div className="mt-3 flex items-center justify-end gap-3">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E0D8] text-lg text-[#26110B] transition hover:bg-[#EDE8E0]"
                            >
                              −
                            </button>
                            <span className="min-w-[1.5rem] text-center text-sm font-medium text-[#26110B]">{quantity}</span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E0D8] text-lg text-[#26110B] transition hover:bg-[#EDE8E0]"
                            >
                              +
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="mt-3 text-sm font-medium text-[#8B7355] underline transition hover:text-[#26110B]"
                          >
                            Remove
                          </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="rounded-[2rem] border border-[#E8E0D8] bg-[#F9F8F6] p-6">
                  <div className="space-y-3 text-[#26110B]">
                    <p className="flex items-center justify-between"><span>Subtotal</span><span>₹{subtotal}</span></p>
                    <p className="text-sm text-[#8B7355]">Delivery charge (if any) is calculated at checkout based on your area.</p>
                    <p className="flex items-center justify-between border-t border-[#E8E0D8] pt-3 text-lg font-semibold text-[#26110B]"><span>Subtotal</span><span>₹{subtotal}</span></p>
                  </div>
                  <Link href="/checkout" className="mt-6 inline-flex w-full justify-center rounded-full bg-[#26110B] px-6 py-3 font-medium text-white transition hover:bg-[#26110B]">
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
