"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { usePageTitle } from "../../components/usePageTitle";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../../components/animations";
import { ASSET_PREFIX } from "../../lib/cakeImages";

const values = [
  {
    title: "Handcrafted",
    desc: "Every cake is baked to order, by hand, using traditional techniques — never bulk, never shortcuts.",
    icon: (
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    ),
  },
  {
    title: "Real Ingredients",
    desc: "Belgian chocolate, European butter, fresh cream and seasonal fruit. If it isn't good enough for our family table, it isn't going in your cake.",
    icon: (
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    ),
  },
  {
    title: "Made for Moments",
    desc: "Birthdays, weddings, church events, graduations and quiet family dinners — each cake is made for the moment it celebrates.",
    icon: (
      <>
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
      </>
    ),
  },
  {
    title: "Local, Always",
    desc: "From our kitchen in Purana Bazar to pickup points and doorsteps across Dimapur — we keep it local and personal.",
    icon: (
      <>
        <path d="M1 3h15v13H1z" />
        <path d="M16 8h4l3 3v5h-7V8z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </>
    ),
  },
];

const journey = [
  {
    step: "01",
    title: "One Home Kitchen",
    desc: "Akri Bakes began with a single oven and a rule: real ingredients, no shortcuts. Cakes for family first — word spread fast.",
  },
  {
    step: "02",
    title: "Grown by Word of Mouth",
    desc: "Friends became regulars, and regulars became family. Birthdays, anniversaries and every celebration in between.",
  },
  {
    step: "03",
    title: "Weddings Across Dimapur",
    desc: "Couples trusted us with their biggest days — dessert counters, reception cakes and thousands of happy guests.",
  },
  {
    step: "04",
    title: "Today & Beyond",
    desc: "Still in Dimapur, still baked by hand, still one rule. Every order gets the same care we'd give our own family table.",
  },
];

const favourites = [
  { name: "Dark Chocolate Truffle", price: "₹800 – ₹1,600", img: `${ASSET_PREFIX}/products/celebration-10.jpg`, href: "/product/dark-chocolate-truffle" },
  { name: "New York Cheesecake", price: "₹600 – ₹1,400", img: `${ASSET_PREFIX}/products/cake-10.jpg`, href: "/product/classic-new-york-cheesecake" },
  { name: "Mango Mousse", price: "₹1,000 – ₹2,000", img: `${ASSET_PREFIX}/products/stock-16.jpg`, href: "/product/mango-mousse-cake" },
];

const stats = [
  { value: "10,000+", label: "Instagram Family" },
  { value: "30+", label: "Cake Flavours" },
  { value: "Many", label: "Weddings Served" },
  { value: "7–10", label: "Days Advance Order" },
];

export default function AboutPage() {
  usePageTitle("About Us | Akri Bakes");
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-b border-[#E8E0D8] bg-[#F9F8F6] py-24 md:py-32">
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#BC6153]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]"
          >
            Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="mt-5 font-serif text-5xl font-semibold text-[#26110B] md:text-6xl"
          >
            About Akri Bakes
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8B7355]"
          >
            A premium cake and patisserie brand in Nagaland, handcrafting cakes for every
            celebration — from intimate treats to the biggest weddings.
          </motion.p>
        </div>
      </section>

      {/* ── STORY ────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <SlideUp>
              <div className="relative">
                <div className="overflow-hidden rounded-[2rem] border border-[#E8E0D8] shadow-[0_20px_50px_rgba(38,17,11,0.12)]">
                  <img
                    src={`${ASSET_PREFIX}/about/about-bakery.jpg`}
                    alt="A cake handcrafted by Akri Bakes"
                    className="h-full w-full object-cover"
                  />
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -bottom-6 -right-4 rounded-[20px] border border-[#E8E0D8] bg-white px-6 py-4 shadow-xl md:-right-8"
                >
                  <p className="font-serif text-3xl font-bold text-[#BC6153]">100%</p>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">Baked to order</p>
                </motion.div>
              </div>
            </SlideUp>
            <SlideUp delay={0.15}>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">From a Home Kitchen</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-[#26110B]">Where it all began</h2>
              <p className="mt-6 leading-8 text-[#8B7355]">
                Akri Bakes started in a home kitchen in Dimapur with one rule: real ingredients, no shortcuts.
                What began as cakes for family and friends grew into a beloved patisserie — but the way we bake
                hasn&rsquo;t changed one bit.
              </p>
              <p className="mt-4 leading-8 text-[#8B7355]">
                From birthdays and weddings to church events, graduations, Christmas celebrations and family
                gatherings, we create cakes that bring people together.
              </p>
              <p className="mt-4 leading-8 text-[#26110B]">
                Our goal is simple: create beautiful cakes that taste as good as they look — and deliver them
                with care, every single time.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/menu"
                  className="rounded-full bg-[#26110B] px-7 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3D2219] hover:shadow-xl"
                >
                  Explore the Menu
                </Link>
                <Link
                  href="/gallery"
                  className="rounded-full border border-[#BC6153] px-7 py-3 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
                >
                  See Our Work
                </Link>
              </div>
            </SlideUp>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ───────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#26110B] py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-[#BC6153]/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <FadeIn>
            <svg className="mx-auto h-10 w-10 text-[#BC6153]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 7H6a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h1.5a1.5 1.5 0 0 1 1.5 1.5V20a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4v-9a6 6 0 0 1 6-6h4v2zm12 0h-4a3 3 0 0 0-3 3v4a3 3 0 0 0 3 3h1.5a1.5 1.5 0 0 1 1.5 1.5V20a4 4 0 0 1-4 4h-1a4 4 0 0 1-4-4v-9a6 6 0 0 1 6-6h4v2z" transform="translate(2 -2) scale(0.83)" />
            </svg>
            <blockquote className="mx-auto mt-6 max-w-3xl font-serif text-2xl font-medium leading-relaxed text-white md:text-3xl">
              &ldquo;Real ingredients, no shortcuts — that&rsquo;s the only recipe we&rsquo;ve ever needed.
              Whether it&rsquo;s a bento box for one or a dessert counter for three hundred, it gets the
              same love as our own family table.&rdquo;
            </blockquote>
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.3em] text-[#BC6153]">The Family Behind Akri Bakes</p>
          </FadeIn>
        </div>
      </section>

      {/* ── JOURNEY ──────────────────────────────────────────── */}
      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">The Journey</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B] md:text-5xl">From one oven to every celebration</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {journey.map((item) => (
              <StaggerItem key={item.step}>
                <motion.div
                  className="h-full rounded-[20px] border border-[#E8E0D8] bg-[#F9F8F6] p-7 shadow-sm"
                  whileHover={{ y: -6, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <p className="font-serif text-5xl font-bold text-[#BC6153]/25">{item.step}</p>
                  <h3 className="mt-4 font-serif text-lg font-bold text-[#26110B]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#8B7355]">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── VALUES ───────────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">What We Believe</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Crafted With Care</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <motion.div
                  className="h-full rounded-[20px] border border-[#E8E0D8] bg-white p-7 text-center shadow-sm"
                  whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F8F6] text-[#BC6153]">
                    <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      {v.icon}
                    </svg>
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26110B]">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{v.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── SIGNATURE FAVOURITES ─────────────────────────────── */}
      <section className="border-y border-[#E8E0D8] bg-white py-20 md:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Bakers&rsquo; Favourites</p>
                <h2 className="mt-4 font-serif text-4xl font-bold text-[#26110B]">Signature cakes</h2>
              </div>
              <Link href="/cakes" className="text-sm font-medium text-[#BC6153] underline-offset-4 transition hover:text-[#A85547] hover:underline">
                View all cakes &rarr;
              </Link>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-10 grid gap-6 sm:grid-cols-3">
            {favourites.map((item) => (
              <StaggerItem key={item.name}>
                <Link href={item.href} className="group block">
                  <div className="overflow-hidden rounded-[20px] border border-[#E8E0D8] shadow-sm">
                    <div className="aspect-[4/3] overflow-hidden bg-[#E8E0D8]">
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex items-center justify-between p-5">
                      <p className="font-serif text-lg font-bold text-[#26110B]">{item.name}</p>
                      <p className="text-sm font-semibold text-[#BC6153]">{item.price}</p>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────── */}
      <section className="bg-[#26110B] py-14 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#BC6153] py-20 text-white md:py-24">
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-[#26110B]/20 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <FadeIn>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/80">Let&rsquo;s Bake Together</p>
            <h2 className="mt-5 font-serif text-4xl font-bold md:text-5xl">Ready to celebrate?</h2>
            <p className="mx-auto mt-5 max-w-xl text-white/90">
              Pick a cake from our menu, or tell us your vision and we&rsquo;ll bring it to life. Custom cakes
              need 7&ndash;10 days advance notice.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/build-your-cake"
                className="rounded-full bg-white px-8 py-3.5 text-sm font-medium text-[#BC6153] shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Build Your Cake
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-white/70 px-8 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
              >
                Contact Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
