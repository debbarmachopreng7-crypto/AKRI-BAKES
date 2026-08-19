const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || "";

export function isTelegramConfigured() {
  return Boolean(TELEGRAM_BOT_TOKEN && TELEGRAM_CHAT_ID);
}

export async function sendTelegramMessage(text) {
  if (!isTelegramConfigured()) return;
  try {
    await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text,
          parse_mode: "HTML",
        }),
      },
    );
  } catch {
    // Telegram failure should not block anything
  }
}

export function buildNewOrderAlert(order) {
  const items = (order.items || [])
    .map((item) => {
      const size = item.size ? ` (${item.size})` : "";
      const qty = item.quantity ?? 1;
      return `  • ${item.name}${size} × ${qty}`;
    })
    .join("\n");

  return [
    `🎂 <b>New Order — ${order.orderId}</b>`,
    "",
    `<b>Customer:</b> ${order.name}`,
    `<b>Phone:</b> ${order.phone}`,
    `<b>Payment:</b> ${order.payment}`,
    `<b>Total:</b> ₹${order.total}`,
    `<b>Method:</b> ${order.method || "Pickup"}`,
    `<b>Date:</b> ${order.pickupDate}${order.pickupTime ? " at " + order.pickupTime : ""}`,
    order.deliveryArea ? `<b>Area:</b> ${order.deliveryArea}` : "",
    order.address ? `<b>Address:</b> ${order.address}` : "",
    "",
    "<b>Items:</b>",
    items,
    "",
    `🔗 <a href="https://akribakes.com/admin">View in Dashboard</a>`,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildStatusUpdateAlert(order, newStatus) {
  const statusEmoji = {
    Pending: "🟡",
    "Awaiting Payment Confirmation": "🔵",
    "Ready For Pickup": "🟢",
    Completed: "✅",
    Cancelled: "❌",
  };
  return [
    `${statusEmoji[newStatus] || "📋"} <b>Order ${order.orderId}</b>`,
    `Status updated to: <b>${newStatus}</b>`,
    `Customer: ${order.name} (${order.phone})`,
    `Total: ₹${order.total}`,
  ].join("\n");
}
