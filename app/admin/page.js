"use client";

import { useMemo } from "react";
import { useCart } from "../../components/CartContext";
import AdminGate from "../../components/AdminGate";

const statuses = ["Pending", "Ready For Pickup", "Completed"];

function isToday(iso) {
  if (!iso) return false;
  const date = new Date(iso);
  const now = new Date();
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
}

export default function AdminPage() {
  const { orders, ready, updateOrderStatus } = useCart();

  const stats = useMemo(() => {
    return [
      ["Today's Orders", orders.filter((order) => isToday(order.createdAt)).length],
      ["Pending Orders", orders.filter((order) => order.status === "Pending").length],
      ["Ready For Pickup", orders.filter((order) => order.status === "Ready For Pickup").length],
      ["Completed Orders", orders.filter((order) => order.status === "Completed").length],
      ["Custom Cake Requests", orders.filter((order) => order.hasCustomCake).length],
    ];
  }, [orders]);

  return (
    <AdminGate>
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Staff Area</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Admin Dashboard</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">Track today&apos;s orders, custom cake requests, and what is ready for pickup.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
            {stats.map(([title, value]) => (
              <div key={title} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 text-center shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">{title}</p>
                <p className="mt-4 font-serif text-5xl font-semibold text-[#111111]">{value}</p>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h2 className="font-serif text-3xl font-semibold text-[#111111]">Orders</h2>

            {ready && orders.length === 0 ? (
              <div className="mt-6 rounded-[2rem] border border-[#e5e5e5] bg-white p-10 text-center text-[#333333] shadow-sm">
                No orders yet. Orders placed through checkout will appear here.
              </div>
            ) : (
              <div className="mt-6 space-y-4">
                {orders.map((order) => (
                  <div key={order.orderId} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-6 shadow-sm">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <p className="font-serif text-xl font-semibold text-[#111111]">{order.orderId}</p>
                          {order.hasCustomCake ? (
                            <span className="rounded-full bg-[#111111] px-3 py-1 text-xs font-medium text-white">Custom Cake</span>
                          ) : null}
                        </div>
                        <p className="mt-2 text-sm text-[#333333]">{order.name} • {order.phone}</p>
                        <p className="mt-1 text-sm text-[#666666]">Pickup: {order.pickupDate} {order.pickupTime} • {order.payment}</p>
                        <ul className="mt-3 space-y-1 text-sm text-[#333333]">
                          {order.items.map((item) => (
                            <li key={item.id}>
                              {item.name} ({item.size}) — ₹{item.price}
                              {item.message ? ` • “${item.message}”` : ""}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-semibold text-[#111111]">₹{order.total}</p>
                        <div className="mt-3 flex flex-wrap justify-end gap-2">
                          {statuses.map((status) => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => updateOrderStatus(order.orderId, status)}
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                                order.status === status
                                  ? "border-[#111111] bg-[#111111] text-white"
                                  : "border-[#e5e5e5] bg-white text-[#333333] hover:bg-[#f5f5f5]"
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
    </AdminGate>
  );
}
