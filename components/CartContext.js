"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_KEY = "akri_cart";
const ORDERS_KEY = "akri_orders";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "").replace(/\/$/, "");
const useBackend = Boolean(API_BASE);

function readJSON(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ready, setReady] = useState(false);

  const refreshOrders = useCallback(async () => {
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
    if (!useBackend && ready) {
      window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    }
  }, [orders, ready]);

  const addItem = (item) => {
    setItems((current) => [
      ...current,
      { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, quantity: 1, ...item },
    ]);
  };

  const removeItem = (id) => setItems((current) => current.filter((item) => item.id !== id));

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
    if (useBackend) {
      const res = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...details, items, total: subtotal }),
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
      total: subtotal,
      status: "Pending",
      hasCustomCake: items.some((item) => item.type === "custom"),
      createdAt: new Date().toISOString(),
      ...details,
    };
    setOrders((current) => [order, ...current]);
    clearCart();
    return order;
  };

  const updateOrderStatus = async (orderId, status) => {
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

  const value = {
    items,
    orders,
    ready,
    addItem,
    removeItem,
    clearCart,
    subtotal,
    count,
    placeOrder,
    updateOrderStatus,
    refreshOrders,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
