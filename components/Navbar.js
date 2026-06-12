"use client";

import Link from "next/link";
import { useCart } from "./CartContext";

const menuItems = [
  {
    name: "MENU",
    href: "/",
  },
  {
    name: "CAKES",
    href: "/menu",
  },
  {
    name: "BUILD YOUR CAKE",
    href: "/build-your-cake",
  },
  {
    name: "CELEBRATIONS",
    href: "/gallery",
  },
  {
    name: "ABOUT",
    href: "/about",
  },
  {
    name: "CONTACT",
    href: "/contact",
  },
];

export default function Navbar() {
  const { count, ready } = useCart();

  return (
    <header className="sticky top-0 z-50 border-b border-[#e5e5e5] bg-white/95 backdrop-blur">
      <div className="border-b border-[#ececec] bg-[#111111] px-4 py-2 text-center text-xs font-medium tracking-[0.24em] text-white uppercase">
        Premium Cakes & Patisserie for Every Celebration in Nagaland.
      </div>

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="text-xl font-semibold tracking-[0.18em] text-[#111111] uppercase">
          Akri Bakes
        </Link>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium text-[#333333]">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-4 py-2 transition-colors hover:bg-[#f5f5f5] hover:text-[#111111]"
            >
              {item.name}
            </Link>
          ))}

          <Link
            href="/cart"
            className="relative rounded-full bg-[#111111] px-4 py-2 text-white transition-colors hover:bg-[#333333]"
          >
            CART
            {ready && count > 0 ? (
              <span className="ml-2 inline-flex min-w-5 items-center justify-center rounded-full bg-white px-1.5 text-xs font-semibold text-[#111111]">
                {count}
              </span>
            ) : null}
          </Link>
        </nav>
      </div>
    </header>
  );
}
