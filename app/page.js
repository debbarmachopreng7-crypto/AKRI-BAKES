import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#666666]">Akri Bakes</p>
            <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-[#111111] md:text-6xl">
              Premium Cakes &amp; Patisserie
              <br />
              for Every Celebration in Nagaland.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#333333]">
              Tea House • Coffee • French Patisserie • Pan-Asian Bakery Style.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="rounded-full bg-[#111111] px-6 py-3 font-medium text-white transition hover:bg-[#333333]">
                Order Online
              </Link>
              <Link href="/build-your-cake" className="rounded-full border border-[#111111] px-6 py-3 font-medium text-[#111111] transition hover:bg-[#f5f5f5]">
                Build Your Cake
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                "Pickup only",
                "Live price calculator",
                "Custom cakes",
              ].map((item) => (
                <div key={item} className="rounded-3xl border border-[#e5e5e5] bg-[#fafafa] px-4 py-4 text-sm font-medium text-[#222222] shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-6 top-10 h-32 w-32 rounded-full bg-black/10 blur-3xl" />
            <div className="absolute -right-4 bottom-8 h-40 w-40 rounded-full bg-black/5 blur-3xl" />
            <img
              src="/about/about-bakery.jpg"
              alt="Akri Bakes bakery"
              className="relative rounded-[2rem] border border-[#e5e5e5] shadow-[0_25px_60px_rgba(0,0,0,0.10)]"
            />
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["AUTHENTIC RECIPES", "Traditional home-style recipes using fresh ingredients."],
              ["BAKED WITH LOVE", "Every recipe is prepared with care and attention to detail."],
              ["HONESTLY PRICED", "Premium quality baked goods at the right prices."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold tracking-[0.3em] text-[#666666] uppercase">{title}</p>
                <p className="mt-4 text-sm leading-7 text-[#333333]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Why Akri Bakes</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-[#111111]">A bakery storefront built around pickup-first ordering.</h2>
              <p className="mt-6 max-w-xl leading-8 text-[#333333]">
                Browse the menu, add to cart, optionally build your own cake, choose pickup date and time, pay at store or in advance, and collect your order from Akri Bakes.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Birthday Cakes", "Celebration-ready cakes for all ages."],
                ["Wedding Cakes", "Elegant designs for your special day."],
                ["Church Events", "Special cakes for church gatherings and programs."],
                ["Graduations", "Proud moments deserve a custom cake."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#111111]">{title}</p>
                  <p className="mt-3 text-sm leading-7 text-[#333333]">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              ["Store Hours", "9:00 AM - 7:00 PM"],
              ["Pickup Only", "No delivery. No shipping."],
              ["Admin Dashboard", "Track today’s orders, pending pickups, and custom requests."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">{title}</p>
                <p className="mt-4 text-sm leading-7 text-[#333333]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Visit Akri Bakes</p>
              <h2 className="mt-4 font-serif text-4xl font-semibold text-[#111111]">Zion Hospital Road, Purana Bazar, Dimapur, Nagaland</h2>
              <p className="mt-6 max-w-xl leading-8 text-[#333333]">Phone: 8259917757<br />Store Hours: 9:00 AM - 7:00 PM</p>
            </div>

            <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
              <div className="space-y-4 text-[#333333]">
                <p><span className="font-medium text-[#111111]">Phone:</span> 8259917757</p>
                <p><span className="font-medium text-[#111111]">Location:</span> Zion Hospital Road, Purana Bazar, Dimapur, Nagaland</p>
                <p><span className="font-medium text-[#111111]">Hours:</span> 9:00 AM - 7:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
