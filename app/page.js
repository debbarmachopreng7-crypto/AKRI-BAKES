"use client";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { motion, animate, useInView } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../components/animations";
import { ASSET_PREFIX } from "../lib/cakeImages";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const categories = [
  { title: "Celebration Cakes", desc: "Black Forest, Red Velvet, Tiramisu & more", from: 800, href: "/cakes?tab=celebration", img: `${ASSET_PREFIX}/products/celebration-01.jpg` },
  { title: "Cheesecakes", desc: "New York, Lotus Biscoff, Basque Burnt & more", from: 600, href: "/cakes?tab=cheesecake", img: `${ASSET_PREFIX}/products/cake-10.jpg` },
  { title: "Plain Cakes", desc: "Butter, Lemon, Carrot, Walnut & more", from: 380, href: "/menu", img: `${ASSET_PREFIX}/products/stock-69.jpg` },
  { title: "Bento Cakes", desc: "Petite individual cakes in many flavours", from: 350, href: "/menu", img: `${ASSET_PREFIX}/products/stock-27.jpg` },
  { title: "Mousse Cakes", desc: "Mango, Hazelnut, Banoffee & more", from: 1000, href: "/cakes?tab=mousse", img: `${ASSET_PREFIX}/products/stock-16.jpg` },
  { title: "Pies & Tarts", desc: "Key Lime, Lemon Meringue, Banoffee & more", from: 70, href: "/menu", img: `${ASSET_PREFIX}/products/stock-25.jpg` },
];

const IG_URL = "https://www.instagram.com/akribakes/";
const PHONE = "8259917757";

const showcaseVideos = [
  {
    src: `${ASSET_PREFIX}/gallery/wedding/wedding-anung-joel.mp4`,
    poster: `${ASSET_PREFIX}/gallery/wedding/wedding-anung-joel-poster.jpg`,
    title: "Anung & Joel",
    tag: "Wedding · 2,300+ likes",
    autoplay: true,
  },
  {
    src: `${ASSET_PREFIX}/gallery/wedding/wedding-reception.mp4`,
    poster: `${ASSET_PREFIX}/gallery/wedding/wedding-reception-poster.jpg`,
    title: "A Memorable Outdoor Wedding",
    tag: "Reception film",
  },
  {
    src: `${ASSET_PREFIX}/gallery/wedding/wedding-pink.mp4`,
    poster: `${ASSET_PREFIX}/gallery/wedding/wedding-pink-poster.jpg`,
    title: "A Pink Wedding, 10.01.2025",
    tag: "Wedding film",
  },
  {
    src: `${ASSET_PREFIX}/gallery/wedding/wedding-intimate-fairy.mp4`,
    poster: `${ASSET_PREFIX}/gallery/wedding/wedding-intimate-fairy-poster.jpg`,
    title: "An Intimate Fairy-Tale Wedding",
    tag: "Wedding film",
  },
  {
    src: `${ASSET_PREFIX}/gallery/wedding/wedding-200126.mp4`,
    poster: `${ASSET_PREFIX}/gallery/wedding/wedding-200126-poster.jpg`,
    title: "A Calm & Beautiful Wedding",
    tag: "Wedding film",
  },
];

const showcasePhotos = [
  { src: `${ASSET_PREFIX}/gallery/wedding/wedding-dessert-table.jpg`, label: "Yangthy & Lendi" },
  { src: `${ASSET_PREFIX}/gallery/wedding/wedding-guest-desserts.jpg`, label: "Dessert Counter" },
  { src: `${ASSET_PREFIX}/gallery/wedding/wedding-dessert-spread.jpg`, label: "Serving Sweetness" },
  { src: `${ASSET_PREFIX}/gallery/wedding/wedding-dessert-lineup.jpg`, label: "Wedding Desserts" },
];

const feedPhotos = [
  { src: `${ASSET_PREFIX}/gallery/signature-chocolate-cake.jpg`, label: "Signature Chocolate" },
  { src: `${ASSET_PREFIX}/products/celebration-01.jpg`, label: "Black Forest" },
  { src: `${ASSET_PREFIX}/products/celebration-04.jpg`, label: "Red Velvet" },
  { src: `${ASSET_PREFIX}/products/celebration-10.jpg`, label: "Dark Chocolate Truffle" },
  { src: `${ASSET_PREFIX}/products/celebration-19.jpg`, label: "Rainbow Cake" },
  { src: `${ASSET_PREFIX}/products/celebration-16.jpg`, label: "Coconut-Lotus Biscoff" },
  { src: `${ASSET_PREFIX}/products/cake-04.jpg`, label: "Lotus Biscoff Cheesecake" },
  { src: `${ASSET_PREFIX}/gallery/signature-cheesecake.jpg`, label: "Signature Cheesecake" },
];

const testimonials = [
  {
    quote:
      "Our wedding desserts were the highlight of the evening — guests kept asking who made them. The cake was exactly what we dreamed of, and everything arrived on time.",
    name: "Esther & Neeraj",
    tag: "Wedding · December 2025",
  },
  {
    quote:
      "The cake looked even better than the reference photos we sent. Fresh, perfectly sweet, and delivery was smooth. Thank you for being part of our big day.",
    name: "Anung & Joel",
    tag: "Wedding · November 2025",
  },
  {
    quote:
      "Our dessert table was stunning — people took photos before they even touched a thing. Beautiful flavours and a team that clearly cares. Highly recommended.",
    name: "Yangthy & Lendi",
    tag: "Wedding · October 2025",
  },
];

const marqueeItems = [
  "Black Forest",
  "Red Velvet",
  "New York Cheesecake",
  "Lotus Biscoff",
  "Mango Mousse",
  "Tiramisu",
  "Basque Burnt Cheesecake",
  "Dark Chocolate Truffle",
  "Hazelnut Praline Mousse",
  "Key Lime Pie",
  "Rainbow Cake",
  "Tres Leches",
  "Bento Cakes",
  "Fondant Cakes",
];

const bestsellers = [
  {
    name: "Dark Chocolate Truffle",
    price: "₹800 – ₹1,600",
    tag: "Best Seller",
    img: `${ASSET_PREFIX}/products/celebration-10.jpg`,
    href: "/product/dark-chocolate-truffle",
  },
  {
    name: "New York Cheesecake",
    price: "₹600 – ₹1,400",
    tag: "Classic",
    img: `${ASSET_PREFIX}/products/cake-10.jpg`,
    href: "/product/classic-new-york-cheesecake",
  },
  {
    name: "Mango Mousse",
    price: "₹1,000 – ₹2,000",
    tag: "Premium",
    img: `${ASSET_PREFIX}/products/stock-16.jpg`,
    href: "/product/mango-mousse-cake",
  },
  {
    name: "Lotus Biscoff Cheesecake",
    price: "₹600 – ₹1,400",
    tag: "Most Loved",
    img: `${ASSET_PREFIX}/products/cake-04.jpg`,
    href: "/product/lotus-biscoff-cheesecake",
  },
];

function ShowcaseVideo({ src, poster, title, tag, autoplay = false }) {
  const ref = useRef(null);
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-white/10 bg-black">
      <video
        ref={ref}
        src={src}
        poster={poster}
        autoPlay={autoplay}
        muted
        loop
        playsInline
        preload={autoplay ? "auto" : "none"}
        onMouseEnter={() => {
          if (!autoplay) ref.current?.play().catch(() => {});
        }}
        onMouseLeave={() => {
          if (!autoplay) ref.current?.pause();
        }}
        className="aspect-[9/16] w-full object-cover"
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition duration-300 group-hover:scale-110 group-hover:bg-[#BC6153] group-hover:shadow-lg group-hover:shadow-[#BC6153]/40">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
            <polygon points="6 3 20 12 6 21 6 3" />
          </svg>
        </span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 pt-16">
        <p className="font-serif text-lg font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.2em] text-white/70">{tag}</p>
      </div>
    </div>
  );
}

function PhoneIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
    </svg>
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

function Icon({ name, className = "h-6 w-6" }) {
  const paths = {
    layers: (
      <>
        <path d="M12 2 2 7l10 5 10-5-10-5z" />
        <path d="m2 17 10 5 10-5" />
        <path d="m2 12 10 5 10-5" />
      </>
    ),
    confirm: (
      <>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <path d="m9 10 2 2 4-4" />
      </>
    ),
    bake: (
      <>
        <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z" />
        <path d="M10 7h4" />
      </>
    ),
    delivery: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
    handcrafted: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
    ingredients: (
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    ),
    design: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
  };
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  );
}

function Counter({ to, prefix = "", suffix = "", duration = 1.6 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration,
      ease: "easeOut",
      onUpdate: (v) => setVal(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {val.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function HomePage() {
  return (
    <main>
      {/* ── CINEMATIC VIDEO HERO ─────────────────────────────── */}
      <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-[#26110B]">
        <motion.video
          poster={showcaseVideos[0].poster}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          fetchPriority="high"
          aria-hidden="true"
          tabIndex={-1}
          className="absolute inset-0 h-full w-full object-cover"
          animate={{ scale: [1, 1.12] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        >
          <source
            src={`${ASSET_PREFIX}/gallery/wedding/wedding-anung-joel-4k.mp4?v=2`}
            type='video/mp4; codecs="hvc1.1.6.L150.90"'
          />
          <source
            src={`${ASSET_PREFIX}/gallery/wedding/wedding-anung-joel-1080p.mp4?v=2`}
            type="video/mp4"
          />
        </motion.video>
        <div className="absolute inset-0 bg-gradient-to-t from-[#26110B]/85 via-[#26110B]/25 to-[#26110B]/5" />
        <motion.div
          className="relative z-10 mx-auto max-w-4xl px-4 pb-24 pt-32 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p variants={heroItem} className="text-xs font-semibold uppercase tracking-[0.35em] text-[#F2A48F] drop-shadow-lg">
            Premium Cakes &amp; Patisserie &middot; Dimapur, Nagaland
          </motion.p>
          <motion.h1 variants={heroItem} className="mt-5 font-serif text-5xl font-bold leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.6)] md:text-7xl">
            Akri Bakes
          </motion.h1>
          <motion.p variants={heroItem} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] md:text-xl">
            Cakes &amp; desserts for the moments that matter — from intimate treats to the biggest weddings.
          </motion.p>
          <motion.div variants={heroItem} className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/menu"
              className="rounded-full bg-[#BC6153] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/30 transition hover:bg-[#A85547] hover:shadow-xl hover:shadow-[#BC6153]/40 hover:-translate-y-0.5 active:scale-95"
            >
              Order Online
            </Link>
            <Link
              href="/build-your-cake"
              className="rounded-full border border-white/60 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 hover:-translate-y-0.5 active:scale-95"
            >
              Build Your Cake
            </Link>
            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 hover:-translate-y-0.5"
            >
              <PhoneIcon className="h-4 w-4" />
              {PHONE}
            </a>
          </motion.div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="pointer-events-none absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-white/70"
          aria-hidden="true"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[scroll-cue_1.8s_ease-in-out_infinite]">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </motion.div>
      </section>

      {/* ── FLAVOUR MARQUEE ─────────────────────────────────── */}
      <section className="overflow-hidden border-y border-[#26110B]/30 bg-[#1a0b06] py-4" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex shrink-0 items-center gap-5 px-3 text-xs font-medium uppercase tracking-[0.3em] text-white/60">
              {item}
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#BC6153">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            </span>
          ))}
        </div>
      </section>

      {/* ── SOCIAL PROOF BAND ────────────────────────────────── */}
      <section className="border-b border-[#E8E0D8] bg-white py-10">
        <StaggerContainer className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {[
            { stat: <Counter to={10000} suffix="+" />, label: "Instagram Family" },
            { stat: <Counter to={30} suffix="+" />, label: "Cake Flavours" },
            { stat: <Counter to={10} prefix="7–" />, label: "Days Advance Notice" },
            { stat: "Dimapur", label: "Pickup &amp; Delivery" },
          ].map((s) => (
            <StaggerItem key={s.label}>
              <p className="font-serif text-3xl font-bold text-[#26110B]">{s.stat}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">{s.label}</p>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ── WEDDINGS SHOWCASE ────────────────────────────────── */}
      <section className="bg-[#26110B] py-20 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#BC6153]">Real Weddings &middot; Real Sweetness</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-white md:text-5xl">The weddings we&rsquo;ve been part of</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                Thirty seconds of real moments — dessert counters, guests and the sweetness that tied it all together. Hover a film to watch.
              </p>
            </div>
          </FadeIn>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="sm:col-span-2 lg:row-span-2">
              <ShowcaseVideo {...showcaseVideos[0]} />
            </div>
            {showcaseVideos.slice(1).map((v) => (
              <ShowcaseVideo key={v.src} {...v} />
            ))}
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 lg:grid-cols-4">
            {showcasePhotos.map((photo) => (
              <a
                key={photo.src}
                href="/gallery"
                className="group relative block overflow-hidden rounded-2xl border border-white/10"
              >
                <div className="aspect-[4/5] overflow-hidden bg-[#3a1c12]">
                  <img
                    src={photo.src}
                    alt={`${photo.label} — wedding desserts by Akri Bakes`}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 pt-12">
                  <p className="text-sm font-medium text-white">{photo.label}</p>
                </div>
              </a>
            ))}
          </div>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[#BC6153] px-8 py-3 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow @akribakes
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BUILD YOUR CAKE ──────────────────────────────────── */}
      <SlideUp>
        <section className="bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <div className="overflow-hidden rounded-[24px] bg-white shadow-xl">
              <div className="grid items-stretch md:grid-cols-2">
                <div className="relative min-h-[320px]">
                  <img
                    src={`${ASSET_PREFIX}/products/celebration-04.jpg`}
                    alt="Custom celebration cake by Akri Bakes"
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#26110B]/40 to-transparent" />
                </div>
                <div className="p-10 md:p-14">
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Made Your Way</p>
                  <h2 className="mt-5 font-serif text-3xl font-bold text-[#26110B] md:text-4xl">Build Your Cake</h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-[#8B7355]">
                    Design your own cake from scratch — choose the occasion, size, flavour, frosting and decorations.
                    Watch the price update instantly, upload an inspiration photo, and reserve your pickup.
                  </p>
                  <Link
                    href="/build-your-cake"
                    className="mt-8 inline-flex rounded-full bg-[#BC6153] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/20 transition hover:bg-[#A85547] hover:shadow-xl hover:shadow-[#BC6153]/30 hover:-translate-y-0.5 active:scale-95"
                  >
                    Start Designing &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </SlideUp>

      {/* ── HOW IT WORKS ─────────────────────────────────────── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Simple &amp; Personal</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">How ordering works</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { step: "01", title: "Choose", desc: "Pick from our menu or design your own custom cake.", icon: "layers" },
              { step: "02", title: "Confirm", desc: "Place your order online or message us your vision.", icon: "confirm" },
              { step: "03", title: "We bake", desc: "Handcrafted fresh to order — 2 to 3 days advance.", icon: "bake" },
              { step: "04", title: "Enjoy", desc: "Pickup in Dimapur or delivery across the city.", icon: "delivery" },
            ].map((item) => (
              <StaggerItem key={item.step}>
                <div className="rounded-[20px] border border-[#E8E0D8] bg-[#F9F8F6] p-7 text-center shadow-sm">
                  <p className="font-serif text-4xl font-bold text-[#BC6153]/30">{item.step}</p>
                  <div className="mx-auto mt-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#26110B] text-white">
                    <Icon name={item.icon} className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26110B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8B7355]">{item.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SIGNATURE & BESTSELLERS ─────────────────────────── */}
      <section className="bg-[#26110B] py-20 text-white md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#BC6153]">Bakers&rsquo; Favourites</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-white md:text-5xl">Signature &amp; bestsellers</h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/70">
                The cakes our regulars come back for. Order any of these directly — or build your own from scratch.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bestsellers.map((item) => (
              <StaggerItem key={item.name}>
                <motion.div
                  className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 bg-white text-[#26110B] shadow-lg"
                  whileHover={{ y: -6, boxShadow: "0 24px 48px rgba(0,0,0,0.35)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#3a1c12]">
                    <img
                      src={item.img}
                      alt={item.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute left-3 top-3 rounded-full bg-[#BC6153] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-white shadow">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-serif text-lg font-bold text-[#26110B]">{item.name}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#BC6153]">{item.price}</p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#26110B] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#3D2219]"
                    >
                      Order This Cake
                    </Link>
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── OUR MENU ─────────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <h2 className="font-serif text-4xl font-bold text-[#26110B]">Our Menu</h2>
              <p className="mt-3 text-sm text-[#8B7355]">
                Fresh baked daily &middot; Order for pickup or delivery across Dimapur
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat) => (
              <StaggerItem key={cat.title}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    href={cat.href}
                    className="group block overflow-hidden rounded-[20px] border border-[#E8E0D8] bg-white shadow-sm"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E0D8]">
                      <img
                        src={cat.img}
                        alt={cat.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 pt-12">
                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/80">
                          FROM &#8377;{cat.from}
                        </p>
                      </div>
                    </div>
                    <div className="p-7">
                      <h3 className="font-serif text-xl font-bold text-[#26110B] group-hover:underline">{cat.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[#8B7355]">{cat.desc}</p>
                    </div>
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.4}>
            <div className="mt-12 text-center">
              <Link
                href="/menu"
                className="inline-flex rounded-full border border-[#BC6153] px-8 py-3 text-sm font-medium text-[#BC6153] transition hover:bg-[#BC6153] hover:text-white hover:-translate-y-0.5 active:scale-95"
              >
                View Full Menu &amp; Prices
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Why Akri Bakes</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Crafted With Care</h2>
              <p className="mx-auto mt-6 max-w-2xl leading-relaxed text-[#8B7355]">
                Akri Bakes started in a home kitchen in Dimapur with one rule: real
                ingredients, no shortcuts. From classic cheesecakes to custom celebration
                cakes, every order still gets the same care we&rsquo;d give our own family table.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Handcrafted", desc: "Every cake is baked to order, by hand, using traditional techniques and real ingredients.", icon: "handcrafted" },
              { title: "Premium Ingredients", desc: "Belgian chocolate, European butter, fresh cream, and seasonal fruits — never any shortcuts.", icon: "ingredients" },
              { title: "Custom Designs", desc: "Upload a photo, describe your vision, and our bakers will bring it to life.", icon: "design" },
              { title: "Local Delivery", desc: "Free pickup in Dimapur or affordable delivery across the city. We make it easy.", icon: "delivery" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="rounded-[20px] border border-[#E8E0D8] bg-white p-7 text-center shadow-sm"
                  whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F8F6] text-[#BC6153]">
                    <Icon name={item.icon} className="h-7 w-7" />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26110B]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FRESH FROM THE FEED ──────────────────────────────── */}
      <section className="border-y border-[#E8E0D8] bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Fresh From Our Kitchen</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Real Cakes, Real Moments</h2>
              <p className="mx-auto mt-3 max-w-xl text-[#8B7355]">
                A glimpse of the cakes leaving our kitchen every week. Follow @akribakes on Instagram for the full feed.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {feedPhotos.map((photo) => (
              <StaggerItem key={photo.src}>
                <Link href="/gallery" className="group block overflow-hidden rounded-[20px] border border-[#E8E0D8] shadow-sm">
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E8E0D8]">
                    <img
                      src={photo.src}
                      alt={`${photo.label} — Akri Bakes`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <p className="text-sm font-medium text-white">{photo.label}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/gallery"
                className="rounded-full bg-[#26110B] px-8 py-3 text-sm font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-[#3a1c12] hover:shadow-xl"
              >
                View Full Gallery
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────── */}
      <section className="bg-[#26110B] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#BC6153]">From the People We Serve</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-white">Loved by couples, cherished by guests</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="flex h-full flex-col rounded-[20px] border border-white/10 bg-white/5 p-8 backdrop-blur">
                  <div className="flex gap-1 text-[#BC6153]">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="mt-5 flex-1 leading-relaxed text-white/80">&ldquo;{t.quote}&rdquo;</p>
                  <div className="mt-6 border-t border-white/10 pt-4">
                    <p className="font-serif text-lg font-semibold text-white">{t.name}</p>
                    <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-white/50">{t.tag}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── FINAL CTA ────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#BC6153] py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#26110B]/20 blur-3xl" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Your Table Awaits</p>
            <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">
              Ready to order your dream cake?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-white/90">
              Cakes need 2&ndash;3 days advance notice. For bulk orders &amp; events, give us 7&ndash;10 days. The sooner you tell us your vision, the sweeter the result.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#BC6153] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Order Online
              </Link>
              <Link
                href="/build-your-cake"
                className="inline-flex items-center gap-2 rounded-full border border-white/70 px-8 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                Build Your Cake
              </Link>
              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/70 px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white/10 hover:-translate-y-0.5"
              >
                <PhoneIcon className="h-4 w-4" />
                {PHONE}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INFO / CONTACT ───────────────────────────────────── */}
      <section className="bg-[#1a0b06] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Visit Us</p>
              <p className="mt-4 text-lg font-medium">Dimapur, Nagaland</p>
              <p className="mt-2 text-sm text-white/60">Zion Hospital Road, Purana Bazar<br />Pickup by appointment · Delivery across Dimapur</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Hours</p>
              <p className="mt-4 text-lg font-medium">Order in Advance</p>
              <p className="mt-2 text-sm text-white/60">2&ndash;3 days notice for cakes<br />7&ndash;10 days for bulk orders &amp; events</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Get in Touch</p>
              <p className="mt-4 text-lg font-medium">{PHONE}</p>
              <p className="mt-2 text-sm text-white/60">Akribake2020@gmail.com</p>
              <div className="mt-4 flex gap-3">
                <a href={`tel:${PHONE}`} className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">Call</a>
                <a href={`https://wa.me/91${PHONE}`} target="_blank" rel="noopener noreferrer" className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">WhatsApp</a>
                <a href="mailto:Akribake2020@gmail.com" className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
