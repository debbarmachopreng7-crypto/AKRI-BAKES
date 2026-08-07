export const metadata = {
  title: "About Us | Akri Bakes",
  description: "The story of Akri Bakes — a premium cake and patisserie in Dimapur, Nagaland, handcrafting celebration cakes, cheesecakes and more.",
};

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

const stats = [
  { value: "10,000+", label: "Instagram Family" },
  { value: "30+", label: "Cake Flavours" },
  { value: "100s", label: "Weddings Served" },
  { value: "7–10", label: "Days Advance Order" },
];

function ValueIcon({ children }) {
  return (
    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F9F8F6] text-[#BC6153]">
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {children}
      </svg>
    </div>
  );
}

export default function AboutPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Our Story</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">About Akri Bakes</h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#8B7355]">
            Akri Bakes is a premium cake and patisserie brand in Nagaland, handcrafting cakes
            for every celebration — from intimate treats to the biggest weddings.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <img
                src={`${ASSET_PREFIX}/about/about-bakery.jpg`}
                alt="A cake handcrafted by Akri Bakes"
                className="rounded-[2rem] border border-[#E8E0D8] object-cover shadow-[0_20px_50px_rgba(38,17,11,0.12)]"
              />
            </div>
            <div>
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
                <a
                  href="/menu"
                  className="rounded-full bg-[#26110B] px-7 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3D2219] hover:shadow-xl"
                >
                  Explore the Menu
                </a>
                <a
                  href="/gallery"
                  className="rounded-full border border-[#BC6153] px-7 py-3 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
                >
                  See Our Work
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">What We Believe</p>
            <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Crafted With Care</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-[20px] border border-[#E8E0D8] bg-[#F9F8F6] p-7 text-center shadow-sm">
                <ValueIcon>{v.icon}</ValueIcon>
                <h3 className="mt-5 font-serif text-lg font-bold text-[#26110B]">{v.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#8B7355]">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E8E0D8] bg-[#26110B] py-12 text-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-serif text-3xl font-bold text-white">{s.value}</p>
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Let&rsquo;s Bake Together</p>
          <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">Ready to celebrate?</h2>
          <p className="mt-4 leading-7 text-[#8B7355]">
            Pick a cake from our menu, or tell us your vision and we&rsquo;ll bring it to life. Custom cakes
            need 7&ndash;10 days advance notice.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a href="/build-your-cake" className="rounded-full bg-[#BC6153] px-8 py-3 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/30 transition hover:-translate-y-0.5 hover:bg-[#A85547]">
              Build Your Cake
            </a>
            <a href="/contact" className="rounded-full border border-[#26110B] px-8 py-3 text-sm font-medium text-[#26110B] transition hover:-translate-y-0.5 hover:bg-[#EDE8E0]">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
