"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);

const CART_KEY = "akri_cart";
const ORDERS_KEY = "akri_orders";

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

  useEffect(() => {
    setItems(readJSON(CART_KEY, []));
    setOrders(readJSON(ORDERS_KEY, []));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  }, [items, ready]);

  useEffect(() => {
    if (ready) window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
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

  const placeOrder = (details) => {
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

  const updateOrderStatus = (orderId, status) => {
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
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
