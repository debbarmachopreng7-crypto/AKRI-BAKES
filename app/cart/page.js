"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCart } from "../../components/CartContext";
import { getCakeImage } from "../../lib/cakeImages";
import Breadcrumbs from "../../components/Breadcrumbs";

const DEFAULT_IMG = "/AKRI-BAKES/products/celebration-04.jpg";

function itemImage(item) {
  if (item.inspirationPhoto) return item.inspirationPhoto;
  return getCakeImage(item.name) || getCakeImage(item.flavor) || DEFAULT_IMG;
}

function ItemThumb({ item }) {
  const [src, setSrc] = useState(() => itemImage(item));
  return (
    <div className="h-24 w-20 shrink-0 overflow-hidden rounded-xl border border-[#E8E0D8] bg-[#EDE8E0]">
      <img
        src={src}
        alt={item.name}
        loading="lazy"
        className="h-full w-full object-cover"
        onError={() => setSrc(DEFAULT_IMG)}
      />
    </div>
  );
}

function CheckIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function RemoveModal({ count, onCancel, onConfirm }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="remove-modal-title"
    >
      <div className="w-full max-w-sm rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-2xl">
        <h2 id="remove-modal-title" className="font-serif text-xl font-semibold text-[#26110B]">
          Remove {count} {count === 1 ? "item" : "items"}?
        </h2>
        <p className="mt-2 text-sm leading-6 text-[#8B7355]">
          This will remove {count} {count === 1 ? "item" : "items"} from your cart. You can&rsquo;t undo this.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-full border border-[#E8E0D8] px-5 py-2.5 text-sm font-medium text-[#26110B] transition hover:bg-[#EDE8E0]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="rounded-full bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function ItemDetails({ item }) {
  return (
    <div>
      <h2 className="font-serif text-lg font-bold text-[#26110B]">{item.name}</h2>
      {item.flavor ? (
        <p className="mt-1 text-sm text-[#8B7355]">
          {[item.occasion, item.flavor, item.frosting, item.decoration].filter(Boolean).join(" · ")}
        </p>
      ) : (
        <p className="mt-1 text-sm text-[#8B7355]">{item.size}</p>
      )}
      <p className="mt-2 text-sm text-[#26110B]">
        <span className="font-medium text-[#26110B]">Pickup:</span>{" "}
        {item.pickupDate ? item.pickupDate : "Date not set"}
        {item.pickupTime ? `, ${item.pickupTime}` : ""}
      </p>
      {item.message ? (
        <p className="mt-1 text-sm text-[#26110B]">
          <span className="font-medium text-[#26110B]">Message:</span>{" "}
          <span className="italic">&ldquo;{item.message}&rdquo;</span>
        </p>
      ) : null}
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal, count, ready } = useCart();
  const [selected, setSelected] = useState(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);

  useEffect(() => { document.title = "Cart — Akri Bakes"; }, []);

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
    selected.forEach((id) => removeItem(id));
    setSelected(new Set());
    setConfirmOpen(false);
  };

  const allSelected = items.length > 0 && selected.size === items.length;

  return (
    <main>
      <Breadcrumbs items={[{ label: "Cart" }]} />
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Shopping Cart</p>
          <h1 className="mt-5 font-serif text-4xl font-semibold text-[#26110B] md:text-5xl">Your Cart</h1>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-[#8B7355]">
            Review your cakes, then choose pickup or delivery and pay at checkout.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          {ready && items.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-[2rem] border border-[#E8E0D8] bg-white p-12 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F9F8F6] text-[#BC6153]">
                <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <h2 className="mt-6 font-serif text-3xl font-semibold text-[#26110B]">Your cart is empty</h2>
              <p className="mt-3 text-[#8B7355]">Browse the menu or build your own cake to get started.</p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link href="/menu" className="rounded-full bg-[#26110B] px-7 py-3 font-medium text-white transition hover:bg-[#3D2219] hover:-translate-y-0.5">
                  Browse Menu
                </Link>
                <Link href="/build-your-cake" className="rounded-full border border-[#26110B] px-7 py-3 font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                  Build Your Cake
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
              {/* ── Items ─────────────────────────────────────── */}
              <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-6 shadow-sm md:p-8">
                {items.length > 1 && (
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-[#E8E0D8] pb-5">
                    <label className="flex cursor-pointer items-center gap-3 text-sm font-medium text-[#26110B]">
                      <input type="checkbox" checked={allSelected} onChange={toggleAll}
                        className="h-4 w-4 rounded border-[#D0C8B8] text-[#BC6153] focus:ring-[#BC6153]" />
                      {allSelected ? "Deselect All" : "Select All"}
                    </label>
                    {selected.size > 0 && (
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[#8B7355]">{selected.size} selected</span>
                        <button
                          type="button"
                          onClick={() => setConfirmOpen(true)}
                          className="text-sm font-medium text-red-600 underline transition hover:text-red-800"
                        >
                          Remove Selected
                        </button>
                      </div>
                    )}
                  </div>
                )}

                <div className="space-y-6">
                  {items.map((item) => {
                    const quantity = item.quantity ?? 1;
                    return (
                      <div key={item.id} className="flex items-start gap-4 border-b border-[#E8E0D8] pb-6 last:border-b-0 last:pb-0">
                        <label className="mt-0.5 flex shrink-0 cursor-pointer pt-1">
                          <input
                            type="checkbox"
                            checked={selected.has(item.id)}
                            onChange={() => toggleItem(item.id)}
                            aria-label={`Select ${item.name}`}
                            className="h-4 w-4 rounded border-[#D0C8B8] text-[#BC6153] focus:ring-[#BC6153]"
                          />
                        </label>
                        <ItemThumb item={item} />
                        <div className="min-w-0 flex-1">
                          <ItemDetails item={item} />
                          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
                            <div className="flex items-center gap-3">
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, -1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E0D8] text-lg text-[#26110B] transition hover:border-[#26110B] hover:bg-[#EDE8E0]"
                              >
                                −
                              </button>
                              <span className="min-w-[1.5rem] text-center text-sm font-semibold text-[#26110B]" aria-live="polite">
                                {quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => updateQuantity(item.id, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E8E0D8] text-lg text-[#26110B] transition hover:border-[#26110B] hover:bg-[#EDE8E0]"
                              >
                                +
                              </button>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="text-sm font-medium text-[#8B7355] underline transition hover:text-red-600"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-serif text-lg font-bold text-[#26110B]">₹{item.price * quantity}</p>
                          {quantity > 1 ? (
                            <p className="mt-0.5 text-xs text-[#8B7355]">₹{item.price} each</p>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Summary ───────────────────────────────────── */}
              <div className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-[2rem] border border-[#E8E0D8] bg-white p-6 shadow-sm md:p-8">
                  <h3 className="font-serif text-xl font-bold text-[#26110B]">Order Summary</h3>
                  <div className="mt-5 space-y-2.5 text-sm">
                    <p className="flex items-center justify-between">
                      <span className="text-[#8B7355]">Subtotal ({count} {count === 1 ? "item" : "items"})</span>
                      <span className="font-semibold text-[#26110B]">₹{subtotal}</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-[#8B7355]">Pickup</span>
                      <span className="font-medium text-[#26110B]">Free</span>
                    </p>
                    <p className="flex items-center justify-between">
                      <span className="text-[#8B7355]">Delivery</span>
                      <span className="font-medium text-[#26110B]">Calculated at checkout</span>
                    </p>
                    <div className="flex items-center justify-between border-t border-[#E8E0D8] pt-4 text-lg font-bold text-[#26110B]">
                      <span>Total</span>
                      <span>₹{subtotal}</span>
                    </div>
                  </div>

                  <Link
                    href="/checkout"
                    className="mt-6 inline-flex w-full justify-center rounded-full bg-[#26110B] px-6 py-3.5 font-medium text-white shadow-lg shadow-[#26110B]/20 transition hover:-translate-y-0.5 hover:bg-[#3D2219] hover:shadow-xl"
                  >
                    Proceed to Checkout
                  </Link>
                  <Link
                    href="/menu"
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#E8E0D8] px-6 py-3 text-sm font-medium text-[#26110B] transition hover:bg-[#F9F8F6]"
                  >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m15 18-6-6 6-6" />
                    </svg>
                    Continue Shopping
                  </Link>

                  <div className="mt-6 space-y-2.5 border-t border-[#E8E0D8] pt-5">
                    {[
                      "Free pickup in Dimapur",
                      "UPI accepted — GPay, Paytm, PhonePe",
                      "Custom cakes need 7–10 days notice",
                    ].map((line) => (
                      <p key={line} className="flex items-start gap-2.5 text-xs text-[#8B7355]">
                        <CheckIcon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#BC6153]" />
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {confirmOpen && (
        <RemoveModal
          count={selected.size}
          onCancel={() => setConfirmOpen(false)}
          onConfirm={removeSelected}
        />
      )}
    </main>
  );
}
