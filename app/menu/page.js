const categories = [
  {
    title: "Celebration Cakes",
    items: [
      "Red Velvet",
      "Dark Chocolate Truffle",
      "Russian Honey Cake",
    ],
  },
  {
    title: "Mousse Cakes",
    items: [
      "Mango Mousse Cake",
      "Chocolate Mousse Cake",
      "Coffee Mousse Cake",
    ],
  },
  {
    title: "Bento Cakes",
    items: [
      "Mini Bento Cake",
      "Photo Bento Cake",
      "Custom Bento Cake",
    ],
  },
  {
    title: "Wedding Cakes",
    items: [
      "Classic Wedding Cake",
      "Floral Wedding Cake",
      "Multi-tier Wedding Cake",
    ],
  },
  {
    title: "Pies & Tarts",
    items: [
      "Fruit Tart",
      "Chocolate Tart",
      "Lemon Pie",
    ],
  },
  {
    title: "Tea House Specials",
    items: [
      "Tiramisu",
      "Chocolate Slice",
      "Butter Cookies",
    ],
  },
  {
    title: "Cheesecakes",
    items: [
      "Lotus Biscoff Cheesecake",
      "Classic New York Cheesecake",
      "Mango Cheesecake",
    ],
  },
];

export const metadata = {
  title: "Menu | Akri Bakes",
};

export default function MenuPage() {
  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            Signature Menu
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            Our Menu
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">
            Browse Celebration Cakes, Cheesecakes, Mousse Cakes, Bento Cakes, Wedding Cakes, Pies & Tarts, and Tea House Specials.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <div key={category.title} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">
                {category.title}
              </p>
              <ul className="mt-6 space-y-4 text-[#333333]">
                {category.items.map((item) => (
                  <li key={item} className="flex items-center justify-between border-b border-[#f0f0f0] pb-3 last:border-b-0 last:pb-0">
                    <span>{item}</span>
                    <span className="text-sm text-[#666666]">Premium</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Dark Chocolate Truffle", "₹800 (1 lb)"],
              ["Lotus Biscoff Cheesecake", "₹950 (1 lb)"],
              ["Tiramisu", "₹900 (1 lb)"],
              ["Russian Honey Cake", "₹850 (1 lb)"],
            ].map(([name, price]) => (
              <div key={name} className="rounded-[2rem] border border-[#e5e5e5] bg-white p-6 shadow-sm">
                <div className="h-44 rounded-[1.5rem] bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)]" />
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#111111]">{name}</h3>
                <p className="mt-2 text-sm text-[#666666]">{price}</p>
                <a href={`/product/${name.toLowerCase().replaceAll(" ", "-")}`} className="mt-5 inline-flex rounded-full bg-[#111111] px-4 py-2 text-sm font-medium text-white">
                  View Product
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}