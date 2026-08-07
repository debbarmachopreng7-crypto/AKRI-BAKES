"use client";

import { useMemo, useState } from "react";
import { useCart } from "../../components/CartContext";
import { usePageTitle } from "../../components/usePageTitle";
import AdminGate from "../../components/AdminGate";
import Breadcrumbs from "../../components/Breadcrumbs";

const statuses = ["Awaiting Payment Confirmation", "Pending", "Ready For Pickup", "Completed"];

const filters = [
  { id: "all", label: "All Orders" },
  { id: "today", label: "Today's Orders" },
  { id: "awaiting-payment", label: "Awaiting Payment" },
  { id: "Pending", label: "Pending" },
  { id: "Ready For Pickup", label: "Ready For Pickup" },
  { id: "Completed", label: "Completed" },
  { id: "custom", label: "Custom Cakes" },
];

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

function PhotoModal({ src, fileName, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={onClose}>
      <div className="relative max-w-2xl" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt={fileName} className="max-h-[80vh] w-auto rounded-2xl border-4 border-white shadow-2xl" />
        <p className="mt-3 text-center text-sm text-white">{fileName}</p>
        <button type="button" onClick={onClose} className="absolute -right-4 -top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl shadow-lg hover:bg-[#f5f5f5]">&times;</button>
      </div>
    </div>
  );
}

function SettingsPanel() {
  const [show, setShow] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setMessage("Please fill in all fields.");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage("New passwords do not match.");
      return;
    }
    try {
      const stored = localStorage.getItem("akri_admin_password") || "akribakes2026";
      if (currentPassword !== stored) {
        setMessage("Current password is incorrect.");
        return;
      }
      localStorage.setItem("akri_admin_password", newPassword);
      setMessage("Password changed successfully!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Could not save password. Try again.");
    }
  };

  const handleResetToDefault = () => {
    try {
      localStorage.removeItem("akri_admin_password");
      setMessage("Password reset to default: akribakes2026");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      setMessage("Could not reset password.");
    }
  };

  return (
    <div className="mt-12">
      <button type="button" onClick={() => setShow(!show)}
        className="inline-flex items-center gap-2 rounded-full border border-[#E8E0D8] px-5 py-2.5 text-sm font-medium text-[#26110B] transition hover:bg-[#f5f5f5]">
        {show ? "Hide Settings" : "Settings"}
      </button>

      {show ? (
        <div className="mt-6 rounded-[2rem] border border-[#E8E0D8] bg-white p-8 shadow-sm">
          <h3 className="font-serif text-2xl font-semibold text-[#26110B]">Change Password</h3>
          <p className="mt-2 text-sm text-[#8B7355]">
            Default password: <code className="rounded bg-[#f5f5f5] px-2 py-0.5 text-xs">akribakes2026</code>
          </p>

          <div className="mt-6 grid gap-4 max-w-md">
            <input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Current password" autoComplete="current-password"
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#26110B] outline-none focus:border-[#26110B]" />
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)}
              placeholder="New password (min 6 chars)" autoComplete="new-password"
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#26110B] outline-none focus:border-[#26110B]" />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password" autoComplete="new-password"
              className="w-full rounded-2xl border border-[#E8E0D8] bg-[#F9F8F6] px-4 py-3 text-sm text-[#26110B] outline-none focus:border-[#26110B]" />
            <button type="button" onClick={handleChangePassword}
              className="rounded-full bg-[#26110B] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#3D2219]">
              Change Password
            </button>
          </div>

          {message ? (
            <p className={`mt-4 text-sm font-medium ${message.includes("success") || message.includes("reset") ? "text-green-600" : "text-red-600"}`}>
              {message}
            </p>
          ) : null}

          <div className="mt-8 border-t border-[#E8E0D8] pt-6">
            <h4 className="text-sm font-semibold text-[#8B7355]">Forgot Password?</h4>
            <p className="mt-2 text-sm text-[#26110B]">
              Contact the store at <strong>8259917757</strong> to have the password reset, or click below to reset to default.
            </p>
            <button type="button" onClick={handleResetToDefault}
              className="mt-3 rounded-full border border-red-200 px-5 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50">
              Reset to Default Password
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default function AdminPage() {
  usePageTitle("Admin | Akri Bakes");
  const { orders, ready, updateOrderStatus } = useCart();
  const [activeFilter, setActiveFilter] = useState("all");
  const [photoModal, setPhotoModal] = useState(null);

  const filteredOrders = useMemo(() => {
    if (activeFilter === "all") return orders;
    if (activeFilter === "today") return orders.filter((o) => isToday(o.createdAt));
    if (activeFilter === "custom") return orders.filter((o) => o.hasCustomCake);
    if (activeFilter === "awaiting-payment") return orders.filter((o) => o.status === "Awaiting Payment Confirmation");
    return orders.filter((o) => o.status === activeFilter);
  }, [orders, activeFilter]);

  const stats = useMemo(() => {
    return [
      ["Today's Orders", orders.filter((o) => isToday(o.createdAt)).length],
      ["Awaiting Payment", orders.filter((o) => o.status === "Awaiting Payment Confirmation").length],
      ["Pending", orders.filter((o) => o.status === "Pending").length],
      ["Ready For Pickup", orders.filter((o) => o.status === "Ready For Pickup").length],
      ["Completed", orders.filter((o) => o.status === "Completed").length],
      ["Custom Cakes", orders.filter((o) => o.hasCustomCake).length],
    ];
  }, [orders]);

  return (
    <AdminGate>
      <main>
        <Breadcrumbs items={[{ label: "Admin" }]} />
        <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-5xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Staff Area</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Admin Dashboard</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#26110B]">Track today&apos;s orders, custom cake requests, and what is ready for pickup.</p>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
              {stats.map(([title, value]) => (
                <button key={title} type="button" onClick={() => setActiveFilter(title === "Today's Orders" ? "today" : title === "Awaiting Payment" ? "awaiting-payment" : title)}
                  className={`rounded-[2rem] border p-7 text-center shadow-sm transition ${
                    activeFilter === (title === "Today's Orders" ? "today" : title === "Custom Cakes" ? "custom" : title === "Awaiting Payment" ? "awaiting-payment" : title)
                      ? "border-[#26110B] bg-[#26110B] text-white"
                      : "border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#f5f5f5]"
                  }`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em]">{title}</p>
                  <p className={`mt-4 font-serif text-5xl font-semibold ${activeFilter === (title === "Today's Orders" ? "today" : title === "Custom Cakes" ? "custom" : title) ? "text-white" : "text-[#26110B]"}`}>
                    {value}
                  </p>
                </button>
              ))}
            </div>

            <div className="mt-8 mb-8 flex flex-wrap gap-3">
              {filters.map((f) => (
                <button key={f.id} type="button" onClick={() => setActiveFilter(f.id)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                    activeFilter === f.id
                      ? "bg-[#26110B] text-white"
                      : "border border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#f5f5f5]"
                  }`}>
                  {f.label}
                </button>
              ))}
            </div>

            <div>
              <h2 className="font-serif text-3xl font-semibold text-[#26110B]">Orders</h2>

              {!ready ? (
                <div className="mt-6 text-[#26110B]">Loading orders…</div>
              ) : filteredOrders.length === 0 ? (
                <div className="mt-6 rounded-[2rem] border border-[#E8E0D8] bg-white p-10 text-center text-[#26110B] shadow-sm">
                  No orders found for this filter.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {filteredOrders.map((order) => {
                    const hasPhoto = order.items?.some((item) => item.inspirationPhoto);
                    return (
                      <div key={order.orderId} className={`rounded-[2rem] border bg-white p-6 shadow-sm ${
                        hasPhoto ? "border-amber-300" : "border-[#E8E0D8]"
                      }`}>
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-3">
                              <p className="font-serif text-xl font-semibold text-[#26110B]">{order.orderId}</p>
                              <span className={`rounded-full px-3 py-1 text-xs font-medium ${order.method === "Delivery" ? "bg-[#26110B] text-white" : "border border-[#E8E0D8] text-[#26110B]"}`}>
                                {order.method || "Pickup"}
                              </span>
                              {order.hasCustomCake ? (
                                <span className="rounded-full bg-[#26110B] px-3 py-1 text-xs font-medium text-white">Custom Cake</span>
                              ) : null}
                              {hasPhoto ? (
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">Inspo Photo</span>
                              ) : null}
                            </div>
                            <p className="mt-2 text-sm text-[#26110B]">{order.name} • {order.phone}</p>
                            <p className="mt-1 text-sm text-[#8B7355]">
                              {order.method === "Delivery" ? "Delivery" : "Pickup"}: {order.pickupDate} {order.pickupTime} • {order.payment}
                              {order.createdAt ? ` • ${new Date(order.createdAt).toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })}` : ""}
                            </p>
                            {order.method === "Delivery" ? (
                              <p className="mt-1 text-sm text-[#8B7355]">
                                To: {order.deliveryArea} (₹{order.deliveryCharge}) — {order.address}
                              </p>
                            ) : null}
                            <ul className="mt-3 space-y-2 text-sm text-[#26110B]">
                              {order.items.map((item) => {
                                const quantity = item.quantity ?? 1;
                                const isCustom = item.type === "custom";
                                return (
                                  <li key={item.id} className="border-b border-[#f0f0f0] pb-2 last:border-b-0 last:pb-0">
                                    <div className="flex items-start justify-between gap-4">
                                      <div>
                                        <span className="font-medium">{item.name}</span>
                                        {isCustom ? (
                                          <div className="mt-1 text-xs text-[#8B7355]">
                                            {item.occasion} • {item.flavor} • {item.frosting} • {item.decoration}
                                          </div>
                                        ) : null}
                                        <div className="mt-1 text-xs text-[#8B7355]">
                                          ({item.size}){quantity > 1 ? ` × ${quantity}` : ""}
                                          {item.message ? <span className="italic"> — &ldquo;{item.message}&rdquo;</span> : ""}
                                        </div>
                                      </div>
                                      <span className="whitespace-nowrap font-medium">₹{item.price * quantity}</span>
                                    </div>
                                    {item.inspirationPhoto ? (
                                      <button type="button" onClick={() => setPhotoModal({ src: item.inspirationPhoto, fileName: item.photoFileName || "Inspiration photo" })}
                                        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs text-amber-800 transition hover:bg-amber-100">
                                        <span>View Inspiration Photo</span>
                                      </button>
                                    ) : null}
                                  </li>
                                );
                              })}
                            </ul>
                          </div>

                          <div className="text-right">
                            <p className="text-lg font-semibold text-[#26110B]">₹{order.total}</p>
                            <div className="mt-3 flex flex-wrap justify-end gap-2">
                              {statuses.map((status) => (
                                <button
                                  key={status}
                                  type="button"
                                  onClick={() => updateOrderStatus(order.orderId, status)}
                                  className={`rounded-full border px-3 py-1.5 text-xs font-medium transition ${
                                    order.status === status
                                      ? "border-[#26110B] bg-[#26110B] text-white"
                                      : "border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#f5f5f5]"
                                  }`}
                                >
                                  {status}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="border-t border-[#E8E0D8] py-16">
          <div className="mx-auto max-w-6xl px-4">
            <SettingsPanel />
          </div>
        </section>
      </main>

      {photoModal && <PhotoModal src={photoModal.src} fileName={photoModal.fileName} onClose={() => setPhotoModal(null)} />}
    </AdminGate>
  );
}
