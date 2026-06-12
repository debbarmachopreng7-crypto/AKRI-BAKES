"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../components/CartContext";

function Confirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { orders, ready } = useCart();

  const order = orderId
    ? orders.find((item) => item.orderId === orderId)
    : orders[0];

  if (!ready) {
    return <p className="text-[#333333]">Loading your order…</p>;
  }

  if (!order) {
    return (
      <div>
        <h1 className="font-serif text-4xl font-semibold text-[#111111]">No order found</h1>
        <p className="mt-4 text-[#333333]">We couldn&apos;t find your order. Please place an order first.</p>
        <Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Thank You</p>
      <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">Order ID: {order.orderId}</h1>
      <p className="mt-6 text-lg leading-8 text-[#333333]">
        {order.method === "Delivery"
          ? "Order placed. Your cake will be delivered to your address by Akri Bakes."
          : "Order placed. Your cake has been reserved for pickup at Akri Bakes."}
      </p>

      <div className="mx-auto mt-8 max-w-md space-y-2 rounded-[2rem] border border-[#e5e5e5] bg-white p-8 text-left text-[#333333] shadow-sm">
        <p><span className="font-medium text-[#111111]">Name:</span> {order.name}</p>
        <p><span className="font-medium text-[#111111]">Phone:</span> {order.phone}</p>
        <p><span className="font-medium text-[#111111]">Method:</span> {order.method || "Pickup"}</p>
        {order.method === "Delivery" ? (
          <>
            <p><span className="font-medium text-[#111111]">Delivery Area:</span> {order.deliveryArea}</p>
            <p><span className="font-medium text-[#111111]">Address:</span> {order.address}</p>
            <p><span className="font-medium text-[#111111]">Delivery Date:</span> {order.pickupDate}</p>
            <p><span className="font-medium text-[#111111]">Delivery Time:</span> {order.pickupTime}</p>
          </>
        ) : (
          <>
            <p><span className="font-medium text-[#111111]">Pickup Date:</span> {order.pickupDate}</p>
            <p><span className="font-medium text-[#111111]">Pickup Time:</span> {order.pickupTime}</p>
          </>
        )}
        <p><span className="font-medium text-[#111111]">Payment:</span> {order.payment}</p>
        {order.method === "Delivery" && order.deliveryCharge ? (
          <p><span className="font-medium text-[#111111]">Delivery Charge:</span> ₹{order.deliveryCharge}</p>
        ) : null}
        <p><span className="font-medium text-[#111111]">Total:</span> ₹{order.total}</p>
        <p><span className="font-medium text-[#111111]">Status:</span> {order.status}</p>
      </div>

      <Link href="/" className="mt-8 inline-flex rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
        Back to Home
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <main>
      <section className="flex min-h-[70vh] items-center border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Suspense fallback={<p className="text-center text-[#333333]">Loading…</p>}>
            <Confirmation />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
