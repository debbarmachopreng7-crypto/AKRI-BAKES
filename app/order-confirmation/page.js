"use client";

import { Suspense } from "react";
import Link from "next/link";
import { usePageTitle } from "../../components/usePageTitle";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { UPI_CONFIG, UPI_APPS, generateUPILink } from "../../components/upiConfig";

function Confirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { orders, ready } = useCart();

  const order = orderId
    ? orders.find((item) => item.orderId === orderId)
    : orders[0];

  if (!ready) {
    return <p className="text-[#26110B]/70">Loading your order&hellip;</p>;
  }

  if (!order) {
    return (
      <div>
        <h1 className="font-serif text-4xl font-bold text-[#26110B]">No order found</h1>
        <p className="mt-4 text-[#26110B]/70">We couldn&apos;t find your order. Please place an order first.</p>
        <Link href="/menu" className="mt-8 inline-flex rounded-full bg-[#BC6153] px-6 py-3 font-medium text-white transition hover:bg-[#A85547]">
          Browse Menu
        </Link>
      </div>
    );
  }

  const isAwaitingPayment = order.status === "Awaiting Payment Confirmation";

  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Thank You</p>
      <h1 className="mt-5 font-serif text-5xl font-bold text-[#26110B]">Order ID: {order.orderId}</h1>

      {isAwaitingPayment ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-amber-200 bg-amber-50 p-6 text-left">
          <p className="text-sm font-semibold text-amber-800">Payment Pending</p>
          <p className="mt-2 text-sm text-amber-700">
            Your order has been placed but is awaiting payment confirmation. 
            Pay <strong>₹{order.total}</strong> to the UPI ID below and the store will confirm your order.
          </p>
          <div className="mt-4 rounded-xl border border-amber-200 bg-white px-4 py-3 text-center">
            <p className="font-mono text-lg font-bold text-[#26110B]">{UPI_CONFIG.UPI_ID}</p>
          </div>
          <p className="mt-3 text-xs text-amber-700">
            Mention Order ID <strong>{order.orderId}</strong> in the payment note.
          </p>
          <a
            href={generateUPILink(order.total, order.orderId, "gpay")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full justify-center rounded-full bg-[#BC6153] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A85547]"
          >
            Pay ₹{order.total} via UPI
          </a>
          <p className="mt-3 text-xs text-amber-700">
            Once payment is received, the store will confirm your order. You will not need to do anything else.
          </p>
        </div>
      ) : (
        <p className="mt-6 text-lg leading-8 text-[#26110B]/70">
          {order.method === "Delivery"
            ? "Order placed. Your cake will be delivered to your address by Akri Bakes."
            : "Order placed. Your cake has been reserved for pickup at Akri Bakes."}
        </p>
      )}

      <div className="mx-auto mt-8 max-w-md space-y-2 rounded-[20px] border border-[#E8E0D8] bg-white p-8 text-left text-[#26110B]/80 shadow-sm">
        <p><span className="font-medium text-[#26110B]">Name:</span> {order.name}</p>
        <p><span className="font-medium text-[#26110B]">Phone:</span> {order.phone}</p>
        <p><span className="font-medium text-[#26110B]">Method:</span> {order.method || "Pickup"}</p>
        {order.method === "Delivery" ? (
          <>
            <p><span className="font-medium text-[#26110B]">Delivery Area:</span> {order.deliveryArea}</p>
            <p><span className="font-medium text-[#26110B]">Address:</span> {order.address}</p>
            <p><span className="font-medium text-[#26110B]">Delivery Date:</span> {order.pickupDate}</p>
            <p><span className="font-medium text-[#26110B]">Delivery Time:</span> {order.pickupTime}</p>
          </>
        ) : (
          <>
            <p><span className="font-medium text-[#26110B]">Pickup Date:</span> {order.pickupDate}</p>
            <p><span className="font-medium text-[#26110B]">Pickup Time:</span> {order.pickupTime}</p>
          </>
        )}
        <p><span className="font-medium text-[#26110B]">Payment:</span> {order.payment}</p>
        <p><span className="font-medium text-[#26110B]">Total:</span> ₹{order.total}</p>
        <p>
          <span className="font-medium text-[#26110B]">Status:</span>{" "}
          {isAwaitingPayment ? (
            <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800">Awaiting Payment Confirmation</span>
          ) : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">{order.status}</span>
          )}
        </p>
      </div>

      {isAwaitingPayment ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#E8E0D8] bg-white p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-[#26110B]">What happens next?</p>
          <ol className="mt-4 space-y-3 text-sm text-[#26110B]/70">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">1</span>
              <span>Pay via UPI using the button above. Mention your Order ID in the note.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">2</span>
              <span>The store will receive your payment notification on their UPI app.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">3</span>
              <span>Store staff will confirm your order from the admin dashboard once payment is verified.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">4</span>
              <span>Your cake will be prepared for pickup or delivery on your selected date.</span>
            </li>
          </ol>
          <p className="mt-4 text-xs text-[#8B7355]">
            For any inquiries, call: <strong>8259917757</strong>
          </p>
        </div>
      ) : null}

      <Link href="/" className="mt-8 inline-flex rounded-full bg-[#BC6153] px-6 py-3 font-medium text-white transition hover:bg-[#A85547]">
        Back to Home
      </Link>
    </div>
  );
}

export default function OrderConfirmationPage() {
  usePageTitle("Order Confirmation | Akri Bakes");
  return (
    <main>
      <section className="flex min-h-[70vh] items-center border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-3xl px-4">
          <Suspense fallback={<p className="text-center text-[#26110B]/70">Loading&hellip;</p>}>
            <Confirmation />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
