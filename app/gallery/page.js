"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePageTitle } from "../../components/usePageTitle";
import Link from "next/link";
import { FadeIn } from "../../components/animations";
import { ASSET_PREFIX } from "../../lib/cakeImages";

export const IG_URL = "https://www.instagram.com/akribakes/";

const g = (name) => `${ASSET_PREFIX}/gallery/${name}.jpg`;
const c = (num) => `${ASSET_PREFIX}/products/celebration-${num}.jpg`;
const w = (name) => `${ASSET_PREFIX}/gallery/wedding/${name}`;

const allItems = [
  // Weddings — real moments from @akribakes
  { title: "Anung & Joel", category: "Weddings", video: w("wedding-anung-joel.mp4"), image: w("wedding-anung-joel-poster.jpg"), note: "30 sec" },
  { title: "A Memorable Outdoor Wedding", category: "Weddings", video: w("wedding-reception.mp4"), image: w("wedding-reception-poster.jpg"), note: "30 sec" },
  { title: "A Pink Wedding, 10.01.2025", category: "Weddings", video: w("wedding-pink.mp4"), image: w("wedding-pink-poster.jpg"), note: "30 sec" },
  { title: "An Intimate Fairy-Tale Wedding", category: "Weddings", video: w("wedding-intimate-fairy.mp4"), image: w("wedding-intimate-fairy-poster.jpg"), note: "30 sec" },
  { title: "A Calm & Beautiful Wedding, 20.01.2026", category: "Weddings", video: w("wedding-200126.mp4"), image: w("wedding-200126-poster.jpg"), note: "30 sec" },
  { title: "Yangthy & Lendi Wedding", category: "Weddings", image: w("wedding-dessert-table.jpg") },
  { title: "Wedding Dessert Counter", category: "Weddings", image: w("wedding-guest-desserts.jpg") },
  { title: "Serving Sweetness", category: "Weddings", image: w("wedding-dessert-spread.jpg") },
  { title: "Wedding Dessert Lineup", category: "Weddings", image: w("wedding-dessert-lineup.jpg") },
  // Signature
  { title: "Signature Chocolate Cake", category: "Signature", image: g("signature-chocolate-cake") },
  { title: "Signature Cheesecake", category: "Signature", image: g("signature-cheesecake") },
  // Celebrations — real Akri Bakes cakes
  { title: "Church Celebration", category: "Celebrations", image: g("church-1") },
  { title: "Seasonal Feature", category: "Celebrations", image: g("seasonal-1") },
  { title: "Black Forest", category: "Celebrations", image: c("01") },
  { title: "White Forest", category: "Celebrations", image: c("02") },
  { title: "Blueberry Cake", category: "Celebrations", image: c("03") },
  { title: "Red Velvet with Cream Cheese", category: "Celebrations", image: c("04") },
  { title: "Blue Velvet with Cream Cheese", category: "Celebrations", image: c("05") },
  { title: "Tres Leches (Milk Cake)", category: "Celebrations", image: c("06") },
  { title: "Rasmalai, Nuts & Rasgula", category: "Celebrations", image: c("07") },
  { title: "Chocolate & Nuts", category: "Celebrations", image: c("08") },
  { title: "Carrot Cake with Cream Cheese", category: "Celebrations", image: c("09") },
  { title: "Dark Chocolate Truffle", category: "Celebrations", image: c("10") },
  { title: "Tiramisu with Mascarpone", category: "Celebrations", image: c("11") },
  { title: "Matcha Strawberry White Chocolate", category: "Celebrations", image: c("12") },
  { title: "Lemon Meringue Cake", category: "Celebrations", image: c("13") },
  { title: "Russian Honey Cake", category: "Celebrations", image: c("14") },
  { title: "Fruit Gateaux", category: "Celebrations", image: c("15") },
  { title: "Coconut-Lotus Biscoff Cake", category: "Celebrations", image: c("16") },
  { title: "Chocolate World Cake", category: "Celebrations", image: c("17") },
  { title: "White Chocolate Truffle", category: "Celebrations", image: c("18") },
  { title: "Rainbow Cake", category: "Celebrations", image: c("19") },
  { title: "Salted Nutty Caramel Fudge", category: "Celebrations", image: c("20") },
];

const filterTabs = ["All", "Signature", "Celebrations", "Weddings"];

const featuredVideos = allItems.filter((i) => i.video);
const featuredPhotos = allItems.filter((i) => i.category === "Weddings" && !i.video);

function VideoCard({ item, onOpen, tall = false }) {
  const ref = useRef(null);
  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={() => ref.current && ref.current.play().catch(() => {})}
      onMouseLeave={() => ref.current && ref.current.pause()}
      className={`group relative block w-full overflow-hidden rounded-2xl border border-[#E8E0D8] bg-black text-left shadow-sm transition-shadow hover:shadow-2xl ${
        tall ? "h-full min-h-[420px] lg:min-h-full" : ""
      }`}
    >
      <video
        ref={ref}
        src={item.video}
        poster={item.image}
        muted
        loop
        playsInline
        preload="none"
        className={`w-full object-cover ${tall ? "h-full min-h-[420px] lg:min-h-full" : "aspect-[9/16]"}`}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[#BC6153] group-hover:shadow-lg group-hover:shadow-[#BC6153]/40">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="ml-1">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-16">
        <p className="font-serif text-lg font-semibold text-white">{item.title}</p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">{item.note || item.category}</p>
      </div>
    </button>
  );
}

function InstagramIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function GalleryPage() {
  usePageTitle("Gallery | Akri Bakes");
  const [active, setActive] = useState("All");
  const [lightbox, setLightbox] = useState(null);

  const filtered = active === "All" ? allItems : allItems.filter((i) => i.category === active);
  const current = lightbox !== null ? filtered[lightbox] : null;

  const openItem = (item) => {
    setActive("All");
    setLightbox(allItems.indexOf(item));
  };

  const next = useCallback(() => setLightbox((i) => (i + 1) % filtered.length), [filtered.length]);
  const prev = useCallback(() => setLightbox((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [lightbox, next, prev]);

  return (
    <main>
      {/* ── VIDEO HERO ───────────────────────────────────────── */}
      <section className="relative flex min-h-[82vh] items-center justify-center overflow-hidden bg-[#26110B]">
        <motion.video
          poster={featuredVideos[0].image}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: [1, 1.12] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <source
            src={w("wedding-anung-joel-4k.mp4") + "?v=2"}
            type='video/mp4; codecs="hvc1.1.6.L150.90"'
          />
          <source
            src={w("wedding-anung-joel-1080p.mp4") + "?v=2"}
            type="video/mp4"
          />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#26110B]/85 via-[#26110B]/25 to-[#26110B]/5" />
        <FadeIn>
          <div className="relative z-10 mx-auto max-w-4xl px-4 pb-20 pt-32 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A48F] drop-shadow-lg">Real Weddings &middot; Real Sweetness</p>
            <h1 className="mt-5 font-serif text-5xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-7xl">
              Every celebration starts with a cake.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
              Press play — a peek inside the weddings, receptions and dessert counters we&rsquo;ve had the joy to serve across Dimapur.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-full bg-[#BC6153] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/30 transition hover:-translate-y-0.5 hover:bg-[#A85547] hover:shadow-xl"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow @akribakes
              </a>
              <Link
                href="/menu"
                className="rounded-full border border-white/40 px-8 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Order Online
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── FEATURED WEDDING FILMS ───────────────────────────── */}
      <section className="bg-[#F9F8F6] py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Featured Weddings</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Wedding films, straight from the counter</h2>
              <p className="mx-auto mt-4 max-w-2xl text-[#8B7355]">
                Thirty seconds of real moments — guests, dessert tables and the sweetness that tied it all together. Hover a film to watch.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:row-span-2">
              <VideoCard item={featuredVideos[0]} onOpen={() => openItem(featuredVideos[0])} tall />
            </div>
            {featuredVideos.slice(1).map((v) => (
              <VideoCard key={v.image} item={v} onOpen={() => openItem(v)} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {featuredPhotos.map((photo) => (
              <button
                key={photo.image}
                type="button"
                onClick={() => openItem(photo)}
                className="group relative overflow-hidden rounded-2xl border border-[#E8E0D8] bg-[#E8E0D8] text-left shadow-sm transition-shadow hover:shadow-xl"
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={photo.image}
                    alt={`${photo.title} — Akri Bakes`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                  <p className="text-sm font-medium text-white">{photo.title}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── PHOTO WALL ───────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => {
                  setActive(tab);
                  setLightbox(null);
                }}
                className={`rounded-full px-6 py-2.5 text-sm font-medium transition ${
                  active === tab
                    ? "bg-[#26110B] text-white shadow-lg shadow-[#26110B]/20"
                    : "border border-[#E8E0D8] bg-white text-[#26110B] hover:bg-[#fff] hover:shadow-md"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <FadeIn>
            <div className="mt-12 columns-1 gap-5 sm:columns-2 lg:columns-3">
              {filtered.map((item, i) => (
                <button
                  key={item.image}
                  type="button"
                  onClick={() => setLightbox(i)}
                  className="group relative mb-5 block w-full overflow-hidden rounded-2xl break-inside-avoid border border-[#E8E0D8] bg-[#E8E0D8] text-left shadow-sm transition-shadow hover:shadow-xl"
                >
                  <img
                    src={item.image}
                    alt={`${item.title} — Akri Bakes`}
                    loading="lazy"
                    className="w-full transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextElementSibling.style.display = "flex";
                    }}
                  />
                  <div
                    style={{ display: "none" }}
                    className="absolute inset-0 items-center justify-center bg-[linear-gradient(135deg,#26110B_0%,#3a1c12_100%)]"
                  >
                    <p className="px-6 text-center font-serif text-lg text-white">{item.title}</p>
                  </div>
                  {item.video && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition group-hover:bg-[#BC6153]">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="6 3 20 12 6 21 6 3" />
                        </svg>
                      </span>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-5 pt-16 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-white/70">{item.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INSTAGRAM CTA ────────────────────────────────────── */}
      <section className="border-y border-[#E8E0D8] bg-[#26110B] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#BC6153] text-white shadow-lg shadow-[#BC6153]/30">
            <InstagramIcon className="h-6 w-6" />
          </div>
          <h2 className="mt-6 font-serif text-4xl font-bold text-white">See the full feed on Instagram</h2>
          <p className="mx-auto mt-4 max-w-xl text-white/70">
            Fresh bakes, behind-the-scenes, festive specials and customer cakes — posted daily at <span className="font-semibold text-white">@akribakes</span>.
          </p>
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#26110B] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <InstagramIcon className="h-4 w-4" />
            Follow @akribakes
          </a>
        </div>
      </section>

      {/* ── ORDER CTA ────────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Loved what you saw?</p>
          <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Ready to order yours?</h2>
          <p className="mt-4 text-[#8B7355]">
            Pick from our menu, build your own cake, or message us your inspiration. We bake on advance order for pickup or delivery across Dimapur.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/build-your-cake"
              className="rounded-full bg-[#BC6153] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/20 transition hover:-translate-y-0.5 hover:bg-[#A85547] hover:shadow-xl"
            >
              Build Your Cake
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-[#BC6153] px-8 py-3.5 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
            >
              View Menu &amp; Prices
            </Link>
          </div>
        </div>
      </section>

      {/* ── LIGHTBOX ─────────────────────────────────────────── */}
      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:left-6"
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 md:right-6"
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            <figure className="flex max-h-full flex-col items-center" onClick={(e) => e.stopPropagation()}>
              {current.video ? (
                <video
                  key={current.video}
                  src={current.video}
                  poster={current.image}
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />
              ) : (
                <motion.img
                  key={current.image}
                  src={current.image}
                  alt={`${current.title} — Akri Bakes`}
                  className="max-h-[78vh] max-w-full rounded-2xl object-contain shadow-2xl"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                />
              )}
              <figcaption className="mt-4 text-center">
                <p className="font-serif text-lg text-white">{current.title}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.25em] text-white/60">{current.category}</p>
              </figcaption>
            </figure>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
