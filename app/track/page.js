"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { usePageTitle } from "../../components/usePageTitle";
import { motion } from "framer-motion";
import Breadcrumbs from "../../components/Breadcrumbs";
import { supabase, isSupabaseConfigured } from "../../lib/supabase";

const statusColors = {
  Pending: "bg-amber-100 text-amber-800",
  "Awaiting Payment Confirmation": "bg-blue-100 text-blue-800",
  "Ready For Pickup": "bg-green-100 text-green-800",
  Completed: "bg-emerald-100 text-emerald-800",
  Cancelled: "bg-red-100 text-red-800",
};

const statusSteps = ["Pending", "Awaiting Payment Confirmation", "Ready For Pickup", "Completed"];

function fromRow(row) {
  return {
    orderId: row.order_id,
    items: row.items || [],
    status: row.status,
    hasCustomCake: row.has_custom_cake,
    createdAt: row.created_at,
    name: row.name,
    phone: row.phone,
    email: row.email || "",
    method: row.method,
    pickupDate: row.pickup_date,
    pickupTime: row.pickup_time,
    deliveryArea: row.delivery_area,
    address: row.address,
    payment: row.payment,
    total: row.total,
    notes: row.notes,
  };
}

function TrackPage() {
  usePageTitle("Track Order | Akri Bakes");
  const [orderId, setOrderId] = useState("");
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [matchedOrders, setMatchedOrders] = useState([]);
  const useSupabase = isSupabaseConfigured();

  const handleSearch = async (e) => {
    e.preventDefault();
    const query = orderId.trim().toUpperCase();
    if (!query) return;
    setLoading(true);
    setSearched(true);

    if (useSupabase) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .ilike("order_id", `%${query}%`)
          .order("created_at", { ascending: false })
          .limit(10);
        if (error) throw error;
        setMatchedOrders((data || []).map(fromRow));
      } catch {
        setMatchedOrders([]);
      }
    } else {
      const raw = window.localStorage.getItem("akri_orders");
      const all = raw ? JSON.parse(raw) : [];
      setMatchedOrders(
        all.filter((o) => o.orderId && o.orderId.toUpperCase().includes(query)),
      );
    }
    setLoading(false);
  };

  return (
    <section className="mx-auto max-w-2xl px-4 py-16">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Track Order" },
        ]}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="font-serif text-4xl font-bold text-[#26110B]"
      >
        Track Your Order
      </motion.h1>
      <p className="mt-3 text-[#8B7355]">
        Enter your order ID (e.g. AKRI-123456) to check the current status.
      </p>

      <form onSubmit={handleSearch} className="mt-8 flex gap-3">
        <input
          type="text"
          value={orderId}
          onChange={(e) => {
            setOrderId(e.target.value);
            setSearched(false);
            setMatchedOrders([]);
          }}
          placeholder="e.g. AKRI-123456"
          className="flex-1 rounded-2xl border border-[#E8E0D8] bg-white px-5 py-3.5 text-[#26110B] outline-none transition placeholder:text-[#B8A898] focus:border-[#26110B]"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-[#26110B] px-8 py-3.5 font-medium text-white transition hover:bg-[#3D2219] disabled:opacity-50"
        >
          {loading ? "Searching..." : "Track"}
        </button>
      </form>

      {searched && !loading && matchedOrders.length === 0 && (
        <div className="mt-12 rounded-[2rem] border border-[#E8E0D8] bg-white p-8 text-center">
          <p className="text-lg font-semibold text-[#26110B]">No orders found</p>
          <p className="mt-2 text-sm text-[#8B7355]">
            No order matched &ldquo;{orderId}&rdquo;. Double-check your order ID and try again.
          </p>
        </div>
      )}

      {!loading && matchedOrders.length > 0 && (
        <div className="mt-8 space-y-6">
          {matchedOrders.map((order) => {
            const currentStep = order.status === "Cancelled"
              ? -1
              : statusSteps.indexOf(order.status);
            return (
              <motion.div
                key={order.orderId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-[2rem] border border-[#E8E0D8] bg-white p-6 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p className="font-serif text-xl font-bold text-[#26110B]">{order.orderId}</p>
                  <span className={`rounded-full px-4 py-1.5 text-xs font-semibold ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                    {order.status}
                  </span>
                </div>

                <p className="mt-2 text-sm text-[#8B7355]">
                  Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>

                {order.status === "Cancelled" ? (
                  <div className="mt-4 rounded-xl bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">This order has been cancelled.</p>
                  </div>
                ) : (
                  <div className="mt-6">
                    <div className="flex items-center justify-between">
                      {statusSteps.map((step, i) => (
                        <div key={step} className="flex flex-1 flex-col items-center">
                          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                            i <= currentStep ? "bg-[#26110B] text-white" : "bg-[#E8E0D8] text-[#8B7355]"
                          }`}>
                            {i <= currentStep ? "✓" : i + 1}
                          </div>
                          <p className={`mt-1.5 text-[10px] font-medium text-center ${
                            i <= currentStep ? "text-[#26110B]" : "text-[#8B7355]"
                          }`}>
                            {step === "Awaiting Payment Confirmation" ? "Payment" : step}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-6 rounded-xl bg-[#F9F8F6] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8B7355]">Items</p>
                  <div className="mt-2 space-y-1">
                    {order.items?.map((item, i) => (
                      <p key={i} className="text-sm text-[#26110B]">
                        {item.name} {item.size ? `(${item.size})` : ""} × {item.quantity ?? 1}
                      </p>
                    ))}
                  </div>
                  <div className="mt-3 border-t border-[#E8E0D8] pt-3">
                    <div className="flex justify-between text-sm font-semibold text-[#26110B]">
                      <span>Total</span>
                      <span>₹{order.total}</span>
                    </div>
                  </div>
                </div>

                {order.status === "Ready For Pickup" && (
                  <div className="mt-4 rounded-xl bg-green-50 p-4">
                    <p className="text-sm font-medium text-green-700">
                      Your order is ready! Please pick it up from Akri Bakes.
                    </p>
                  </div>
                )}

                {order.status === "Awaiting Payment Confirmation" && (
                  <div className="mt-4 rounded-xl bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-700">
                      Payment verification in progress. We&rsquo;ll confirm shortly.
                    </p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-12 text-center">
        <p className="text-sm text-[#8B7355]">
          Need help?{" "}
          <a href="https://wa.me/918259917757" target="_blank" rel="noopener noreferrer" className="font-medium text-[#26110B] underline">
            WhatsApp us
          </a>{" "}
          or call{" "}
          <a href="tel:+918259917757" className="font-medium text-[#26110B] underline">
            8259917757
          </a>
        </p>
      </div>
    </section>
  );
}

export default function TrackPageWrapper() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-2xl px-4 py-16 text-center text-[#8B7355]">Loading...</div>}>
      <TrackPage />
    </Suspense>
  );
}
