"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePageTitle } from "../../components/usePageTitle";
import { useSearchParams } from "next/navigation";
import { useCart } from "../../components/CartContext";
import { UPI_CONFIG, UPI_APPS, generateUPILink, buildUPIQuery } from "../../components/upiConfig";
import { isSupabaseConfigured } from "../../lib/supabase";

const STORE_WHATSAPP = "918259917757";

const supabaseLive = isSupabaseConfigured();

function buildOrderMessage(order) {
  const lines = [`🍰 New Order — ${order.orderId}`, ""];
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
  lines.push(`${order.method === "Delivery" ? "Delivery" : "Pickup"} date: ${order.pickupDate}`);
  if (order.pickupTime) lines.push(`Time: ${order.pickupTime}`);
  if (order.method === "Delivery") {
    if (order.deliveryArea) lines.push(`Area: ${order.deliveryArea}`);
    if (order.address) lines.push(`Address: ${order.address}`);
  }
  return lines.join("\n");
}

function Confirmation() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");
  const { orders, ready, cancelOrder } = useCart();
  const [canceling, setCanceling] = useState(false);
  const [cancelError, setCancelError] = useState("");
  const [cancelled, setCancelled] = useState(false);
  const notifiedRef = useRef(false);

  const order = orderId
    ? orders.find((item) => item.orderId === orderId)
    : orders[0];

  // Auto-send WhatsApp notification to store when order is placed
  useEffect(() => {
    if (!order || notifiedRef.current) return;
    notifiedRef.current = true;
    const msg = buildOrderMessage(order);
    const url = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  }, [order]);

  useEffect(() => {
    if (order?.status === "Cancelled") setCancelled(true);
  }, [order?.status]);

  const handleCancelOrder = async () => {
    if (!order || cancelled) return;
    setCanceling(true);
    setCancelError("");
    try {
      await cancelOrder(order.orderId);
      setCancelled(true);
    } catch {
      setCancelError("Could not cancel this order. Please contact the store.");
    } finally {
      setCanceling(false);
    }
  };

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
  const isCancelled = order.status === "Cancelled" || cancelled;
  const canCancel = !["Ready For Pickup", "Completed", "Cancelled"].includes(order.status || "");
  const statusBadgeClasses = isCancelled
    ? "rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-700"
    : isAwaitingPayment
      ? "rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-800"
      : "rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800";

  return (
    <div className="text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Thank You</p>
      <h1 className="mt-5 font-serif text-5xl font-bold text-[#26110B]">Order ID: {order.orderId}</h1>

      {isCancelled ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-red-200 bg-red-50 p-6 text-left">
          <p className="text-sm font-semibold text-red-700">Order Cancelled</p>
          <p className="mt-2 text-sm text-red-700">
            Your order has been cancelled successfully. If this was a mistake, please contact the store on WhatsApp or call <strong>8259917757</strong>.
          </p>
        </div>
      ) : isAwaitingPayment ? (
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
            href={`upi://pay?${buildUPIQuery(order.total, order.orderId)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(generateUPILink(order.total, order.orderId, "upi"), "_blank");
            }}
            className="mt-4 inline-flex w-full justify-center rounded-full bg-[#BC6153] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#A85547]"
          >
            Pay ₹{order.total} via UPI
          </a>
        </div>
      ) : (
        <p className="mt-6 text-lg leading-8 text-[#26110B]/70">
          {order.method === "Delivery"
            ? "Order placed. Your cake will be delivered to your address by Akri Bakes."
            : "Order placed. Your cake has been reserved for pickup at Akri Bakes."}
        </p>
      )}

      {order?.whatsappFallback ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-amber-300 bg-amber-50 p-6 text-left">
          <p className="text-sm font-semibold text-amber-800">
            Order sent via WhatsApp
          </p>
          <p className="mt-2 text-sm leading-6 text-amber-700">
            Our ordering system is temporarily offline, so we sent your order directly to the store on WhatsApp.
            Please press <strong>Send</strong> in the WhatsApp chat that opened. The store will confirm your order by phone.
          </p>
          <a
            href={`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(buildOrderMessage(order))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Open WhatsApp again
          </a>
        </div>
      ) : !supabaseLive ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#BC6153] bg-[#FDF1EE] p-6 text-left">
          <p className="text-sm font-semibold text-[#A85547]">
            One last step — send us your order
          </p>
          <p className="mt-2 text-sm leading-6 text-[#8B7355]">
            Tap the button below to send this order to Akri Bakes on WhatsApp. We only receive
            your order once you send it — the store doesn&rsquo;t see it automatically.
          </p>
          <a
            href={`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(buildOrderMessage(order))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Send order via WhatsApp
          </a>
          <p className="mt-3 text-xs text-[#8B7355]">
            WhatsApp automatically opens with your full order details pre-filled — just press send.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#BC6153] bg-[#FDF1EE] p-6 text-left">
          <p className="text-sm font-semibold text-[#A85547]">
            Your order has been sent to the store
          </p>
          <p className="mt-2 text-sm leading-6 text-[#8B7355]">
            The store has received your order automatically. We&rsquo;ll confirm it with you on
            WhatsApp or by phone. Need to reach us? Call or WhatsApp <strong>8259917757</strong>.
          </p>
        </div>
      )}

      {!isCancelled && canCancel ? (
        supabaseLive ? (
          <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#E8E0D8] bg-white p-6 text-left shadow-sm">
            <p className="text-sm font-medium text-[#26110B]">Need to cancel this order?</p>
            <p className="mt-2 text-sm text-[#8B7355]">
              The store has already received your order. To cancel, message us on WhatsApp with your Order ID — we&rsquo;ll confirm it with you.
            </p>
            <a
              href={`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(`Hi Akri Bakes! I'd like to cancel my order ${order.orderId}.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex w-full justify-center rounded-full border border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100"
            >
              Cancel via WhatsApp
            </a>
          </div>
        ) : (
          <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#E8E0D8] bg-white p-6 text-left shadow-sm">
            <p className="text-sm font-medium text-[#26110B]">Need to cancel this order?</p>
            <p className="mt-2 text-sm text-[#8B7355]">You can cancel this order before it is prepared or picked up. This action will update the order status to Cancelled.</p>
            <button
              type="button"
              onClick={handleCancelOrder}
              disabled={canceling}
              className="mt-4 inline-flex w-full justify-center rounded-full border border-red-200 bg-red-50 px-6 py-3 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {canceling ? "Cancelling…" : "Cancel Order"}
            </button>
            {cancelError ? <p className="mt-3 text-sm text-red-600">{cancelError}</p> : null}
          </div>
        )
      ) : null}

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
          <span className={statusBadgeClasses}>{isCancelled ? "Cancelled" : order.status}</span>
        </p>
      </div>

      {isAwaitingPayment ? (
        <div className="mx-auto mt-6 max-w-md rounded-[20px] border border-[#E8E0D8] bg-white p-6 text-left shadow-sm">
          <p className="text-sm font-medium text-[#26110B]">What happens next?</p>
          <ol className="mt-4 space-y-3 text-sm text-[#26110B]/70">
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">1</span>
              <span>{supabaseLive ? "Your order has been received by the store." : "Send your order to the store on WhatsApp using the button above."}</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">2</span>
              <span>Pay via UPI using the Pay button. Mention your Order ID in the note.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">3</span>
              <span>The store verifies your payment and confirms your order on WhatsApp or by phone.</span>
            </li>
            <li className="flex gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#BC6153] text-xs font-bold text-white">4</span>
              <span>Your cake is prepared for pickup or delivery on your selected date.</span>
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
