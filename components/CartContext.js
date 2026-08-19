"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { sendOrderConfirmation } from "../lib/email";

const STORE_WHATSAPP = "918259917757";

function buildWhatsAppMessage(order) {
  const lines = [`${order.orderId}`, ""];
  lines.push("Items:");
  for (const item of order.items || []) {
    const size = item.size ? ` (${item.size})` : "";
    const qty = item.quantity ?? 1;
    lines.push(`• ${item.name}${size} × ${qty} = ₹${item.price * qty}`);
    if (item.type === "custom" && item.message) lines.push(`   Note: ${item.message}`);
  }
  lines.push("", `Total: ₹${order.total}`, `Payment: ${order.payment}`, "");
  lines.push(`Name: ${order.name}`);
  lines.push(`Phone: ${order.phone}`);
  lines.push(`Method: ${order.method || "Pickup"}`);
  lines.push(`${order.method === "Delivery" ? "Delivery" : "Pickup"}: ${order.pickupDate}`);
  if (order.pickupTime) lines.push(`Time: ${order.pickupTime}`);
  if (order.method === "Delivery") {
    if (order.deliveryArea) lines.push(`Area: ${order.deliveryArea}`);
    if (order.address) lines.push(`Address: ${order.address}`);
  }
  if (order.notes) lines.push(`Notes: ${order.notes}`);
  return lines.join("\n");
}

function buildCustomerConfirmation(order) {
  const lines = [
    `Hi ${order.name}! Your order with Akri Bakes is confirmed.`,
    "",
    `Order ID: ${order.orderId}`,
    "",
    "Items:",
  ];
  for (const item of order.items || []) {
    const size = item.size ? ` (${item.size})` : "";
    const qty = item.quantity ?? 1;
    lines.push(`• ${item.name}${size} × ${qty}`);
  }
  lines.push("", `Total: ₹${order.total}`);
  lines.push(`Payment: ${order.payment}`);
  lines.push(`${order.method === "Delivery" ? "Delivery" : "Pickup"}: ${order.pickupDate}${order.pickupTime ? " at " + order.pickupTime : ""}`);
  if (order.method === "Delivery" && order.deliveryArea) lines.push(`Area: ${order.deliveryArea}`);
  lines.push("", "We'll notify you when your order is ready. Thank you for choosing Akri Bakes!");
  return lines.join("\n");
}

function buildOrderReceivedMessage(order) {
  const phone = order.phone?.replace(/\s+/g, "").replace(/^0/, "") || "";
  const customerWa = phone ? `91${phone}` : null;
  const lines = [
    `Hi ${order.name}, thank you for your order with Akri Bakes!`,
    "",
    `Order ID: ${order.orderId}`,
    `Total: ₹${order.total}`,
    `Payment: ${order.payment}`,
    "",
    "We've received your order and will confirm it shortly.",
    "You can track your order at: akribakes.com/track",
    "",
    "— Akri Bakes, Dimapur",
  ];
  return { message: lines.join("\n"), customerWa };
}

function buildAdminConfirmedMessage(order) {
  const phone = order.phone?.replace(/\s+/g, "").replace(/^0/, "") || "";
  const customerWa = phone ? `91${phone}` : null;
  const lines = [
    `Hi ${order.name}, great news!`,
    "",
    `Your order ${order.orderId} with Akri Bakes is confirmed.`,
    "",
    `${order.method === "Delivery" ? "Delivery" : "Pickup"}: ${order.pickupDate}${order.pickupTime ? " at " + order.pickupTime : ""}`,
    `Total: ₹${order.total}`,
    "",
    order.status === "Ready For Pickup"
      ? "Your order is ready for pickup! Please visit us."
      : "Your order has been confirmed. We'll notify you when it's ready.",
    "",
    "— Akri Bakes, Dimapur",
  ];
  return { message: lines.join("\n"), customerWa };
}

const CartContext = createContext(null);

const CART_KEY = "akri_cart";
const ORDERS_KEY = "akri_orders";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const useBackend = Boolean(API_BASE);
const useSupabase = isSupabaseConfigured();

function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function toRow(order) {
  return {
    order_id: order.orderId,
    name: order.name,
    phone: order.phone,
    method: order.method,
    payment: order.payment,
    pickup_date: order.pickupDate,
    pickup_time: order.pickupTime,
    delivery_area: order.deliveryArea,
    delivery_charge: order.deliveryCharge ?? 0,
    address: order.address,
    notes: order.notes,
    items: order.items,
    total: order.total,
    has_custom_cake: Boolean(order.hasCustomCake),
    status: order.status,
    created_at: order.createdAt,
  };
}

function toOrder(row) {
  return {
    orderId: row.order_id,
    name: row.name,
    phone: row.phone,
    method: row.method,
    payment: row.payment,
    pickupDate: row.pickup_date,
    pickupTime: row.pickup_time,
    deliveryArea: row.delivery_area,
    deliveryCharge: Number(row.delivery_charge) || 0,
    address: row.address,
    notes: row.notes,
    items: row.items ?? [],
    total: Number(row.total) || 0,
    hasCustomCake: Boolean(row.has_custom_cake),
    status: row.status,
    createdAt: row.created_at,
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  const refreshOrders = useCallback(async () => {
    if (useSupabase) {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(500);
        if (!error && data) setOrders(data.map(toOrder));
      } catch {
        /* network error: keep current orders */
      }
      return;
    }
    if (useBackend) {
      try {
        const res = await fetch(`${API_BASE}/orders`, { cache: "no-store" });
        if (res.ok) setOrders(await res.json());
      } catch {
        /* network error: keep current orders */
      }
    } else {
      setOrders(readJSON(ORDERS_KEY, []));
    }
  }, []);

  useEffect(() => {
    setItems(readJSON(CART_KEY, []));
    refreshOrders().finally(() => setReady(true));
  }, [refreshOrders]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  useEffect(() => {
    if (!useSupabase && !useBackend && ready) {
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [orders, ready]);

  useEffect(() => {
    if (!useSupabase) return;
    const channel = supabase
      .channel("akri-orders")
      .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, () => {
        refreshOrders();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [refreshOrders]);

  const addItem = (item) => {
    setItems((current) => {
      const match = current.find(
        (existing) =>
          existing.type === "menu" &&
          item.type === "menu" &&
          existing.name === item.name &&
          existing.size === item.size &&
          (existing.message || "") === (item.message || "") &&
          (existing.pickupDate || "") === (item.pickupDate || "") &&
          (existing.pickupTime || "") === (item.pickupTime || ""),
      );
      if (match) {
        return current.map((existing) =>
          existing.id === match.id
            ? { ...existing, quantity: (existing.quantity ?? 1) + 1 }
            : existing,
        );
      }
      return [
        ...current,
        { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, quantity: 1, ...item },
      ];
    });
  };

  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));

  const updateQuantity = (id, delta) =>
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, (item.quantity ?? 1) + delta) }
            : item,
        )
        .filter((item) => (item.quantity ?? 1) > 0),
    );

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * (item.quantity ?? 1), 0),
    [items],
  );

  const count = useMemo(
    () => items.reduce((sum, item) => sum + (item.quantity ?? 1), 0),
    [items],
  );

  const placeOrder = async (details) => {
    if (useSupabase) {
      const orderId = `AKRI-${String(Date.now()).slice(-6)}${String(
        Math.floor(Math.random() * 90) + 10,
      )}`;
      const order = {
        orderId,
        items,
        status: "Pending",
        hasCustomCake: items.some((item) => item.type === "custom"),
        createdAt: new Date().toISOString(),
        ...details,
        total: details.total ?? subtotal,
      };
      try {
        const { error } = await supabase.from("orders").insert(toRow(order));
        if (error) throw error;
      } catch {
        // Supabase down — fall back to WhatsApp
        const msg = buildWhatsAppMessage(order);
        window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank");
        order.whatsappFallback = true;
      }
      setOrders((current) => [order, ...current]);
      clearCart();
      return order;
    }
    if (useBackend) {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, items, total: details.total ?? subtotal }),
      });
      if (!res.ok) throw new Error("Could not place order. Please try again.");
      const order = await res.json();
      setOrders((current) => [order, ...current]);
      clearCart();
      return order;
    }

    const orderId = `AKRI-${String(26001 + orders.length)}`;
    const order = {
      orderId,
      items,
      status: "Pending",
      hasCustomCake: items.some((item) => item.type === "custom"),
      createdAt: new Date().toISOString(),
      ...details,
      total: details.total ?? subtotal,
    };
      setOrders((current) => [order, ...current]);
      clearCart();
      return order;
  };

  const updateOrderStatus = async (orderId, status) => {
    if (useSupabase) {
      const { error } = await supabase
        .from("orders")
        .update({ status })
        .eq("order_id", orderId);
      if (error) {
        console.error("Failed to update order status:", error);
        throw new Error("Failed to update order. Please try again.");
      }
      setOrders((current) => {
        const updated = current.map((order) => (order.orderId === orderId ? { ...order, status } : order));
        const order = updated.find((o) => o.orderId === orderId);
        // Send WhatsApp to customer when admin confirms
        if (order && ["Ready For Pickup", "Completed"].includes(status)) {
          const { message: confMsg, customerWa } = buildAdminConfirmedMessage(order);
          if (customerWa) window.open(`https://wa.me/${customerWa}?text=${encodeURIComponent(confMsg)}`, "_blank");
        }
        if (order?.email) sendOrderConfirmation({ ...order, status });
        return updated;
      });
      return;
    }
    if (useBackend) {
      try {
        const res = await fetch(`${API_BASE}/orders/${orderId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });
        if (res.ok) {
          const updated = await res.json();
          setOrders((current) =>
            current.map((order) => (order.orderId === orderId ? updated : order)),
          );
        }
      } catch {
        /* network error: leave state unchanged */
      }
      return;
    }

    // Local mode
    setOrders((current) => {
      const updated = current.map((order) => (order.orderId === orderId ? { ...order, status } : order));
      const order = updated.find((o) => o.orderId === orderId);
      if (order && ["Ready For Pickup", "Completed"].includes(status)) {
        const { message: confMsg, customerWa } = buildAdminConfirmedMessage(order);
        if (customerWa) window.open(`https://wa.me/${customerWa}?text=${encodeURIComponent(confMsg)}`, "_blank");
      }
      return updated;
    });
  };

  const cancelOrder = async (orderId) => {
    await updateOrderStatus(orderId, "Cancelled");
    return true;
  };

  const deleteOrder = async (orderId) => {
    if (useSupabase) {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("order_id", orderId);
      if (error) {
        console.error("Failed to delete order:", error);
        throw new Error("Failed to delete order. Please try again.");
      }
    }
    setOrders((current) => current.filter((order) => order.orderId !== orderId));
  };

  const value = {
    items,
    orders,
    ready,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    subtotal,
    count,
    placeOrder,
    updateOrderStatus,
    cancelOrder,
    deleteOrder,
    refreshOrders,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
