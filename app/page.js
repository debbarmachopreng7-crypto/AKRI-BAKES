"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeIn, SlideUp, StaggerContainer, StaggerItem } from "../components/animations";

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
  { title: "Celebration Cakes", desc: "Black Forest, Red Velvet, Tiramisu & more", from: 800, href: "/cakes?tab=celebration" },
  { title: "Cheesecakes", desc: "New York, Lotus Biscoff, Basque Burnt & more", from: 600, href: "/cakes?tab=cheesecake" },
  { title: "Plain Cakes", desc: "Butter, Lemon, Carrot, Walnut & more", from: 380, href: "/menu" },
  { title: "Bento Cakes", desc: "Petite individual cakes in many flavours", from: 350, href: "/menu" },
  { title: "Mousse Cakes", desc: "Mango, Hazelnut, Banoffee & more", from: 1000, href: "/cakes?tab=mousse" },
  { title: "Pies & Tarts", desc: "Key Lime, Lemon Meringue, Banoffee & more", from: 70, href: "/menu" },
];

export default function HomePage() {
  return (
    <main>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#8B7E74] py-24 md:py-32">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{
            backgroundImage: "radial-gradient(circle at 30% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)",
            backgroundSize: "200% 200%",
          }}
        />
        <motion.div className="mx-auto max-w-4xl px-4 text-center" variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1 variants={heroItem} className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl">
            Akri Bakes
          </motion.h1>
          <motion.p variants={heroItem} className="mt-4 text-sm font-medium uppercase tracking-[0.3em] text-white/80">
            Premium Cakes &amp; Patisserie for Every Celebration in Nagaland.
          </motion.p>
          <motion.p variants={heroItem} className="mt-6 text-sm text-white/60">
            Tea House &middot; Coffee &middot; French Patisserie &middot; Pan-Asian Bakery Style
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
          </motion.div>
        </motion.div>
      </section>

      {/* ── BUILD YOUR CAKE ──────────────────────────────────── */}
      <SlideUp>
        <section className="bg-[#F9F8F6] py-20">
          <div className="mx-auto max-w-6xl px-4">
            <motion.div
              className="rounded-[24px] bg-[#26110B] p-10 md:p-14"
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
              <div className="grid items-center gap-10 md:grid-cols-2">
                <div>
                  <h2 className="font-serif text-3xl font-bold text-white md:text-4xl">
                    Build Your Cake
                  </h2>
                  <p className="mt-5 max-w-lg leading-relaxed text-white/70">
                    Design your own cake from scratch — choose the occasion, size, flavor, 
                    frosting and decorations. Watch the price update instantly, upload an 
                    inspiration photo, and reserve your pickup. The standout feature that 
                    sets Akri Bakes apart.
                  </p>
                  <Link
                    href="/build-your-cake"
                    className="mt-8 inline-flex rounded-full bg-[#BC6153] px-8 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/20 transition hover:bg-[#A85547] hover:shadow-xl hover:shadow-[#BC6153]/30 hover:-translate-y-0.5 active:scale-95"
                  >
                    Start Designing &rarr;
                  </Link>
                </div>
                <motion.div
                  className="flex items-center justify-center"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-8xl md:text-9xl">🎂</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </SlideUp>

      {/* ── OUR MENU ─────────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] pb-20">
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
                    className="group block rounded-[20px] border border-[#E8E0D8] bg-white p-7 shadow-sm"
                  >
                    <h3 className="font-serif text-xl font-bold text-[#26110B] group-hover:underline">{cat.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#8B7355]">{cat.desc}</p>
                    <p className="mt-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#BC6153]">
                      FROM &rsquo;{cat.from}
                    </p>
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

      {/* ── OUR STORY ────────────────────────────────────────── */}
      <SlideUp>
        <section className="border-y border-[#E8E0D8] bg-white py-20">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Our Story</p>
            <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Homemade, Heartmade</h2>
            <p className="mx-auto mt-6 max-w-3xl leading-relaxed text-[#26110B]">
              Akri Bakes started in the kitchen of our home in Dimapur, driven by a love 
              for baking and a desire to bring truly exceptional cakes to Nagaland. Every 
              cake is made from scratch using real ingredients — no premixes, no shortcuts. 
              From classic cheesecakes to custom celebration cakes, each order receives the 
              same care and attention we&rsquo;d give our own family table.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-8 text-sm">
              <div>
                <p className="text-2xl font-bold text-[#BC6153]">30+</p>
                <p className="mt-1 text-[#8B7355]">Cake Flavours</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#BC6153]">7&ndash;10</p>
                <p className="mt-1 text-[#8B7355]">Days Advance Order</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#BC6153]">Dimapur</p>
                <p className="mt-1 text-[#8B7355]">Pickup &amp; Delivery</p>
              </div>
            </div>
          </div>
        </section>
      </SlideUp>

      {/* ── WHY CHOOSE US ────────────────────────────────────── */}
      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <FadeIn>
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Why Akri Bakes</p>
              <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Crafted With Care</h2>
            </div>
          </FadeIn>
          <StaggerContainer className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Handcrafted", desc: "Every cake is baked to order, by hand, using traditional techniques and real ingredients.", icon: "🥄" },
              { title: "Premium Ingredients", desc: "Belgian chocolate, European butter, fresh cream, and seasonal fruits — never any shortcuts.", icon: "🧈" },
              { title: "Custom Designs", desc: "Upload a photo, describe your vision, and our bakers will bring it to life.", icon: "🎨" },
              { title: "Local Delivery", desc: "Free pickup in Dimapur or affordable delivery across the city. We make it easy.", icon: "🛵" },
            ].map((item) => (
              <StaggerItem key={item.title}>
                <motion.div
                  className="rounded-[20px] border border-[#E8E0D8] bg-white p-7 text-center shadow-sm"
                  whileHover={{ y: -4, boxShadow: "0 16px 32px rgba(0,0,0,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="text-4xl">{item.icon}</div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-[#26110B]">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{item.desc}</p>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ── INFO / CONTACT ───────────────────────────────────── */}
      <section className="bg-[#26110B] py-20 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Visit Us</p>
              <p className="mt-4 text-lg font-medium">Dimapur, Nagaland</p>
              <p className="mt-2 text-sm text-white/60">Pickup by appointment<br />Delivery available across Dimapur</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Hours</p>
              <p className="mt-4 text-lg font-medium">Order in Advance</p>
              <p className="mt-2 text-sm text-white/60">We require 7&ndash;10 days notice<br />for all custom cake orders</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/50">Get in Touch</p>
              <p className="mt-4 text-lg font-medium">8259917757</p>
              <p className="mt-2 text-sm text-white/60">Akribake2020@gmail.com</p>
              <div className="mt-4 flex gap-3">
                <a href="tel:8259917757" className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">Call</a>
                <a href="mailto:Akribake2020@gmail.com" className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white transition hover:bg-white/20">Email</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
