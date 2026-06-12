# Akri Bakes — Pickup-Only Cake Ordering

A Next.js storefront for **Akri Bakes** (Dimapur, Nagaland). Pickup only — no delivery,
no shipping, no Razorpay, no login/accounts.

## Customer flow

Browse Menu → Add to Cart → (optional) Build Your Cake → Choose Pickup Date & Time →
Pay at Store / Advance Payment → Order Confirmation → Pickup at Akri Bakes.

## Features

- **Menu / Cakes** — browse categories and view product pages.
- **Build Your Cake** — pick occasion, size, flavour, frosting, decoration, message, and
  pickup slot, with a **live price calculator** that updates instantly.
- **Cart** — add menu cakes or custom-built cakes, remove items, see the running total.
- **Checkout** — minimal fields only (Name, Phone, Email optional, Pickup Date, Pickup
  Time, Notes). No account, no login, no password, no OTP.
- **Order Confirmation** — shows the generated order ID and pickup details.
- **Admin Dashboard** (`/admin`) — staff view of all orders with live stats
  (Today's / Pending / Ready For Pickup / Completed / Custom Cake Requests) and
  one-click status changes.

Cart and orders are stored in the browser (`localStorage`), so the whole flow works
end-to-end without a backend. Swapping `components/CartContext.js` for a real API later
is straightforward.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Build for production

```bash
npm run build
npm start
```

## Tech

- Next.js 15 (App Router, JavaScript)
- React 19
- Tailwind CSS v4

## Store

Akri Bakes — Zion Hospital Road, Purana Bazar, Dimapur, Nagaland
Phone: 8259917757 · Hours: 9:00 AM – 7:00 PM
