"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

const menuItems = [
  { name: "MENU", href: "/menu" },
  { name: "CAKES", href: "/cakes" },
  { name: "BUILD YOUR CAKE", href: "/build-your-cake" },
  { name: "CELEBRATIONS", href: "/gallery" },
  { name: "ABOUT", href: "/about" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const { count, ready } = useCart();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className={`sticky top-0 z-50 border-b border-[#E8E0D8] transition-all duration-300 ${
      scrolled ? "bg-white/80 shadow-sm backdrop-blur-xl" : "bg-white/95"
    }`}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#26110B] text-white">
            <span className="font-serif text-lg font-bold">A</span>
          </div>
          <span className="font-serif text-xl font-bold tracking-tight text-[#26110B]">
            Akri Bakes
          </span>
        </Link>

        {/* Mobile Hamburger */}
        <button type="button" onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-full text-[#26110B] transition hover:bg-[#F9F8F6] md:hidden"
          aria-label="Toggle menu">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {menuOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>

        {/* Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative rounded-full px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
                  isActive
                    ? "text-[#BC6153]"
                    : "text-[#26110B] hover:bg-[#F9F8F6]"
                }`}
              >
                {item.name}
                {isActive ? (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-0.5 left-2 right-2 h-[2px] rounded-full bg-[#BC6153]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        {/* Cart Button */}
        <div className="flex items-center gap-2">
          <Link
            href="/track"
            className={`hidden md:flex items-center gap-1.5 rounded-full border px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] transition-colors ${
              pathname === "/track"
                ? "border-[#BC6153] text-[#BC6153]"
                : "border-[#E8E0D8] text-[#8B7355] hover:bg-[#F9F8F6]"
            }`}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="M12 6v6l4 2" />
            </svg>
            Track
          </Link>
          <motion.div whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>
            <Link
              href="/cart"
              className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#BC6153] text-white transition hover:bg-[#A85547]"
            >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {ready && count > 0 ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -right-1 -top-1 flex min-w-[18px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-[#BC6153]"
              >
                {count}
              </motion.span>
            ) : null}
          </Link>
        </motion.div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="border-t border-[#E8E0D8] bg-white px-4 py-4 md:hidden"
        >
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.15em] transition ${
                    isActive
                      ? "bg-[#26110B] text-white"
                      : "text-[#26110B] hover:bg-[#F9F8F6]"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
            <Link
              href="/track"
              className={`rounded-2xl px-4 py-3 text-sm font-medium uppercase tracking-[0.15em] transition ${
                pathname === "/track"
                  ? "bg-[#26110B] text-white"
                  : "text-[#26110B] hover:bg-[#F9F8F6]"
              }`}
            >
              Track Order
            </Link>
          </div>
        </motion.div>
      )}
    </header>
  );
}
