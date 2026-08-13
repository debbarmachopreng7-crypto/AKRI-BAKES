"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { supabase, isSupabaseConfigured } from "../lib/supabase";

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
      const { error } = await supabase.from("orders").insert(toRow(order));
      if (error) throw new Error("Could not place order. Please try again.");
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
      try {
        await supabase.from("orders").update({ status }).eq("order_id", orderId);
      } catch {
        /* network error: realtime will sync when it reconnects */
      }
      setOrders((current) =>
        current.map((order) => (order.orderId === orderId ? { ...order, status } : order)),
      );
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

    setOrders((current) =>
      current.map((order) => (order.orderId === orderId ? { ...order, status } : order)),
    );
  };

  const cancelOrder = async (orderId) => {
    await updateOrderStatus(orderId, "Cancelled");
    return true;
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
    refreshOrders,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
