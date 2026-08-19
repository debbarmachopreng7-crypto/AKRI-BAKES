import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "";
const EMAILJS_TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "";
const EMAILJS_PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "";

export function isEmailConfigured() {
  return Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);
}

export async function sendOrderConfirmation(order) {
  if (!isEmailConfigured()) return;
  if (!order.email) return;

  const items = (order.items || [])
    .map((item) => {
      const size = item.size ? ` (${item.size})` : "";
      const qty = item.quantity ?? 1;
      return `${item.name}${size} × ${qty} = ₹${item.price * qty}`;
    })
    .join("\n");

  const templateParams = {
    to_email: order.email,
    order_id: order.orderId,
    customer_name: order.name,
    items_list: items,
    total: `₹${order.total}`,
    payment: order.payment,
    method: order.method || "Pickup",
    pickup_date: order.pickupDate || "",
    pickup_time: order.pickupTime || "",
    delivery_area: order.deliveryArea || "",
    address: order.address || "",
    status: order.status,
    store_phone: "8259917757",
  };

  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY,
    );
  } catch {
    // Email failure should not block the order
  }
}
