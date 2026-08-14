"use client";

import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { usePageTitle } from "../../components/usePageTitle";
import { useRouter } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { deliveryAreas, getDeliveryCharge } from "../../components/deliveryAreas";
import { UPI_CONFIG, UPI_APPS, generateUPILink, copyUPIId } from "../../components/upiConfig";
import { QRCodeSVG } from "qrcode.react";
import Breadcrumbs from "../../components/Breadcrumbs";

const timeSlots = [
  "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM",
  "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM",
];

export default function CheckoutPage() {
  usePageTitle("Checkout | Akri Bakes");
  const router = useRouter();
  const { items, subtotal, placeOrder, ready } = useCart();

  const [method, setMethod] = useState("Pickup");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    pickupDate: "",
    pickupTime: "3:00 PM",
    area: "",
    address: "",
    notes: "",
  });
  const [payment, setPayment] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [upiPaid, setUpiPaid] = useState(false);
  const [upiRef, setUpiRef] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { document.title = "Checkout — Akri Bakes"; }, []);

  const isDelivery = method === "Delivery";

  const deliveryCharge = useMemo(
    () => (isDelivery ? getDeliveryCharge(form.area) : 0),
    [isDelivery, form.area],
  );
  const total = subtotal + deliveryCharge;

  const update = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
    setFieldErrors((prev) => ({ ...prev, [field]: "" }));
    setError("");
  };

  const inputClass = (field) =>
    `w-full rounded-2xl border bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none transition ${
      fieldErrors[field] ? "border-red-400" : "border-[#E8E0D8] focus:border-[#26110B]"
    }`;

  const selectMethod = (next) => {
    setMethod(next);
    setPayment(null);
    setSelectedApp(null);
    setUpiPaid(false);
    setUpiRef("");
    setCopied(false);
    setFieldErrors({});
    setError("");
  };

  const handleCOD = () => {
    if (!validate()) return;
    placeAndRedirect("cod");
  };

  const handleStore = () => {
    if (!validate()) return;
    placeAndRedirect("store");
  };

  const handleAppTap = (app) => {
    if (!validate()) return;
    setSelectedApp(app);
    setPayment(app.id);
    setUpiPaid(true);
    const ref = `AKRI-${Date.now().toString(36).toUpperCase()}`;
    setUpiRef(ref);
    window.open(generateUPILink(total, ref, app.id), "_blank");
  };

  const handleUPITap = () => {
    if (!validate()) return;
    setPayment("qr");
    setSelectedApp(null);
    setUpiPaid(true);
    setUpiRef(`AKRI-${Date.now().toString(36).toUpperCase()}`);
  };

  const handleQRTap = () => {
    if (!validate()) return;
    setPayment("qr");
    setSelectedApp(null);
    setUpiPaid(true);
    setUpiRef(`AKRI-${Date.now().toString(36).toUpperCase()}`);
  };

  const handleCopyUPI = async () => {
    try {
      await copyUPIId();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Could not copy UPI ID automatically — please note it down.");
    }
  };

  const handleConfirmUPI = async () => {
    setSubmitting(true);
    try {
      const appLabel = selectedApp ? selectedApp.label : "UPI";
      const order = await placeOrder({
        ...form,
        method,
        payment: `${appLabel} (UPI)`,
        deliveryArea: isDelivery ? form.area : "",
        deliveryCharge,
        total,
        status: "Awaiting Payment Confirmation",
      });
      router.push(`/order-confirmation?id=${order.orderId}`);
    } catch (err) {
      setError(err.message || "Could not place order. Please try again.");
      setSubmitting(false);
    }
  };

  const placeAndRedirect = async (type) => {
    setSubmitting(true);
    try {
      const label = type === "cod" ? "Cash on Delivery (COD)" : "Pay at Store";
      const order = await placeOrder({
        ...form,
        method,
        payment: label,
        deliveryArea: isDelivery ? form.area : "",
        deliveryCharge,
        total,
        status: "Pending",
      });
      router.push(`/order-confirmation?id=${order.orderId}`);
    } catch (err) {
      setError(err.message || "Could not place order. Please try again.");
      setSubmitting(false);
    }
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = "Enter your full name";
    }
    const phoneClean = form.phone.replace(/\s+/g, "");
    if (!phoneClean) {
      errs.phone = "Enter your phone number";
    } else if (!/^[6-9]\d{9}$/.test(phoneClean)) {
      errs.phone = "Enter a valid 10-digit Indian phone number";
    }
    if (!form.pickupDate) {
      errs.pickupDate = `Select your ${isDelivery ? "delivery" : "pickup"} date`;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(form.pickupDate + "T00:00:00");
      if (selected < today) {
        errs.pickupDate = "Date cannot be in the past";
      }
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Enter a valid email or leave it empty";
    }
    if (isDelivery) {
      if (!form.area) errs.area = "Select your delivery area";
      if (!form.address.trim()) errs.address = "Enter your delivery address";
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return false;
    }
    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      setError(Object.values(errs)[0]);
      return false;
    }
    setFieldErrors({});
    setError("");
    return true;
  };

  if (ready && items.length === 0) {
    return (
      <main>
        <Breadcrumbs items={[{ label: "Checkout" }]} />
        <section className="flex min-h-[60vh] items-center border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-3xl px-4 text-center">
            <h1 className="font-serif text-4xl font-bold text-[#26110B]">Your cart is empty</h1>
            <p className="mt-4 text-[#26110B]/70">Add a cake to your cart before checking out.</p>
            <Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#BC6153] px-6 py-3 font-medium text-white transition hover:bg-[#A85547]">
              Browse Menu
            </Link>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Breadcrumbs items={[{ label: "Checkout" }]} />
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Checkout</p>
          <h1 className="mt-5 font-serif text-5xl font-bold text-[#26110B]">Order Details</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid gap-8 lg:grid-cols-[1fr_360px]">
          <div className="rounded-[20px] border border-[#E8E0D8] bg-white p-8 shadow-sm">
            {/* Pickup / Delivery */}
            <div className="mb-8">
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">How would you like your order?</span>
              <div className="grid grid-cols-2 gap-3">
                {["Pickup", "Delivery"].map((option) => (
                  <button key={option} type="button" onClick={() => selectMethod(option)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
                      method === option
                        ? "border-[#26110B] bg-[#26110B] text-white"
                        : "border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#EDE8E0]"
                    }`}>
                    {option}
                  </button>
                ))}
              </div>
            </div>

            {/* Customer info */}
            <div className="grid gap-5 md:grid-cols-2">
              <label className="block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Name</span>
                <input value={form.name} onChange={update("name")} className={inputClass("name")} placeholder="Your full name" />
                {fieldErrors.name ? <p className="mt-1 text-xs text-red-500">{fieldErrors.name}</p> : null}
              </label>
              <label className="block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Phone Number</span>
                <input value={form.phone} onChange={update("phone")} inputMode="tel" className={inputClass("phone")} placeholder="10-digit mobile number" />
                {fieldErrors.phone ? <p className="mt-1 text-xs text-red-500">{fieldErrors.phone}</p> : null}
              </label>
              <label className="block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Email (Optional)</span>
                <input value={form.email} onChange={update("email")} type="email" className={inputClass("email")} />
                {fieldErrors.email ? <p className="mt-1 text-xs text-red-500">{fieldErrors.email}</p> : null}
              </label>
              <label className="block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">{isDelivery ? "Delivery Date" : "Pickup Date"}</span>
                <input value={form.pickupDate} onChange={update("pickupDate")} type="date" className={inputClass("pickupDate")} />
                {fieldErrors.pickupDate ? <p className="mt-1 text-xs text-red-500">{fieldErrors.pickupDate}</p> : null}
              </label>
              <label className="block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">{isDelivery ? "Delivery Time" : "Pickup Time"}</span>
                <select value={form.pickupTime} onChange={update("pickupTime")} className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]">
                  {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
                </select>
              </label>

              {isDelivery ? (
                <>
                  <label className="block text-sm font-medium text-[#26110B]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Delivery Area</span>
                    <select value={form.area} onChange={update("area")} className={inputClass("area")}>
                      <option value="">Select your area&hellip;</option>
                      {deliveryAreas.map((area) => <option key={area.name} value={area.name}>{area.name} &mdash; ₹{area.charge}</option>)}
                    </select>
                    {fieldErrors.area ? <p className="mt-1 text-xs text-red-500">{fieldErrors.area}</p> : null}
                  </label>
                  <label className="md:col-span-2 block text-sm font-medium text-[#26110B]">
                    <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Delivery Address</span>
                    <textarea value={form.address} onChange={update("address")} placeholder="House / building, landmark, etc." className={`${inputClass("address")} h-24`} />
                    {fieldErrors.address ? <p className="mt-1 text-xs text-red-500">{fieldErrors.address}</p> : null}
                  </label>
                </>
              ) : null}

              <label className="md:col-span-2 block text-sm font-medium text-[#26110B]">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Notes</span>
                <textarea value={form.notes} onChange={update("notes")} className="h-32 w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-[#26110B] outline-none focus:border-[#26110B]" />
              </label>
            </div>
          </div>

          {/* ── Payment / Summary ─────────────────────────── */}
          <div className="space-y-8">
            <div className="rounded-[20px] border border-[#E8E0D8] bg-white p-7 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#26110B]">Payment Method</h2>

              {error ? <p className="mt-3 text-sm font-medium text-red-600">{error}</p> : null}

              <div className="mt-5 space-y-2">
                {/* COD / Pay at Store */}
                {isDelivery ? (
                  <button type="button" onClick={handleCOD} disabled={submitting}
                    className="flex w-full items-center gap-3 rounded-2xl border border-[#E8E0D8] px-4 py-3.5 text-left text-sm font-medium text-[#26110B] transition hover:bg-[#EDE8E0] disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="text-lg">💵</span>
                    <span>{submitting ? "Placing Order…" : "Cash on Delivery (COD)"}</span>
                  </button>
                ) : (
                  <button type="button" onClick={handleStore} disabled={submitting}
                    className="flex w-full items-center gap-3 rounded-2xl border border-[#E8E0D8] px-4 py-3.5 text-left text-sm font-medium text-[#26110B] transition hover:bg-[#EDE8E0] disabled:opacity-50 disabled:cursor-not-allowed">
                    <span className="text-lg">🏪</span>
                    <span>{submitting ? "Placing Order…" : "Pay at Store"}</span>
                  </button>
                )}

                <p className="pt-4 pb-1 text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Pay Online</p>

                {/* UPI generic */}
                <button type="button" onClick={handleUPITap}
                  className="flex w-full items-center gap-3 rounded-2xl border border-[#E8E0D8] px-4 py-3.5 text-left text-sm font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#812CA1] text-xs font-bold text-white">UPI</span>
                  <span>Pay via UPI QR</span>
                </button>

                {/* Scan QR (desktop fallback) */}
                <button type="button" onClick={handleQRTap}
                  className="flex w-full items-center gap-3 rounded-2xl border border-dashed border-[#BC6153]/60 px-4 py-3.5 text-left text-sm font-medium text-[#BC6153] transition hover:bg-[#BC6153]/5">
                  <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                    <path d="M14 14h3v3h-3z" />
                    <path d="M20 14v3M14 20h3M17 20h3v-3" />
                  </svg>
                  <span>Pay by scanning a QR code</span>
                </button>

                {/* GPay / Paytm / PhonePe / any UPI app */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {UPI_APPS.map((app) => (
                    <button key={app.id} type="button" onClick={() => handleAppTap(app)}
                      className="flex flex-col items-center gap-1.5 rounded-2xl border border-[#E8E0D8] px-3 py-4 text-center text-xs font-medium text-[#26110B] transition hover:bg-[#EDE8E0]">
                      <span className="flex items-center justify-center">{app.icon}</span>
                      <span>{app.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* QR card */}
              {payment === "qr" ? (
                <div className="mt-5 rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] p-6 text-center">
                  <p className="text-sm font-semibold text-[#26110B]">Scan with any UPI app</p>
                  <p className="mt-1 text-xs text-[#8B7355]">Open GPay, PhonePe or Paytm &amp; scan to pay <strong>₹{total}</strong></p>
                  <div className="mx-auto mt-4 inline-block rounded-2xl bg-white p-4 shadow-sm">
                    <QRCodeSVG value={generateUPILink(total, upiRef)} size={180} marginSize={2} />
                  </div>
                  <p className="mt-4 text-xs text-[#8B7355]">Prefer to type it in? Pay to</p>
                  <div className="mt-2 flex items-center justify-center gap-2">
                    <span className="rounded-full border border-[#E8E0D8] bg-white px-4 py-1.5 text-sm font-semibold text-[#26110B]">
                      {UPI_CONFIG.UPI_ID}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyUPI}
                      className="rounded-full bg-[#26110B] px-4 py-1.5 text-xs font-medium text-white transition hover:bg-[#3D2219]"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                  <p className="mt-4 text-xs text-[#8B7355]">
                    After paying, tap <strong>Place Order</strong> below to confirm.
                  </p>
                </div>
              ) : null}

              {/* Message shown after any UPI payment tap */}
              {(payment === "upi" || payment === "qr" || (selectedApp && payment === selectedApp.id)) ? (
                <p className="mt-3 text-xs text-[#8B7355] text-center">
                  Pay ₹{total} in the app, then tap <strong>Place Order</strong> below.
                </p>
              ) : null}
            </div>

            {/* Order Summary */}
            <div className="rounded-[20px] border border-[#E8E0D8] bg-[#F9F8F6] p-7 shadow-sm">
              <h2 className="font-serif text-2xl font-bold text-[#26110B]">Order Summary</h2>
              <div className="mt-5 space-y-3 text-sm text-[#26110B]/80">
                {items.map((item) => {
                  const qty = item.quantity ?? 1;
                  return (
                    <p key={item.id} className="flex items-center justify-between">
                      <span>{item.name} ({item.size}){qty > 1 ? ` × ${qty}` : ""}</span>
                      <span>₹{item.price * qty}</span>
                    </p>
                  );
                })}
                <p className="flex items-center justify-between border-t border-[#E8E0D8] pt-3"><span>Subtotal</span><span>₹{subtotal}</span></p>
                {isDelivery ? (
                  <p className="flex items-center justify-between">
                    <span>Delivery{form.area ? ` (${form.area})` : ""}</span>
                    <span>{form.area ? `₹${deliveryCharge}` : "Select area"}</span>
                  </p>
                ) : <p className="flex items-center justify-between"><span>Pickup</span><span>Free</span></p>}
                <p className="flex items-center justify-between border-t border-[#E8E0D8] pt-3 text-lg font-bold text-[#26110B]"><span>Total</span><span>₹{total}</span></p>
              </div>

              {error ? <p className="mt-4 text-sm font-medium text-red-600">{error}</p> : null}

              {payment === "upi" || payment === "qr" || (selectedApp && payment === selectedApp.id) ? (
                <button type="button" onClick={handleConfirmUPI} disabled={!upiPaid || submitting}
                  className="mt-5 inline-flex w-full justify-center rounded-full bg-[#BC6153] px-6 py-3 font-medium text-white transition hover:bg-[#A85547] disabled:opacity-50 disabled:cursor-not-allowed">
                  {submitting ? "Placing Order…" : "Place Order"}
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
