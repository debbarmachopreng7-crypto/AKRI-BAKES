import ProductOrder from "./ProductOrder";

const products = {
  "dark-chocolate-truffle": {
    name: "Dark Chocolate Truffle",
    price1: 800,
    price2: 1500,
    description: "Rich dark chocolate cake layered with smooth chocolate ganache.",
  },
  "lotus-biscoff-cheesecake": {
    name: "Lotus Biscoff Cheesecake",
    price1: 950,
    price2: 1750,
    description: "Creamy cheesecake with a Lotus Biscoff base and topping.",
  },
  tiramisu: {
    name: "Tiramisu",
    price1: 900,
    price2: 1650,
    description: "Classic coffee-soaked dessert with mascarpone cream.",
  },
  "russian-honey-cake": {
    name: "Russian Honey Cake",
    price1: 850,
    price2: 1600,
    description: "Soft honey layers with a smooth cream finish.",
  },
};

export function generateStaticParams() {
  return Object.keys(products).map((slug) => ({ slug }));
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products[slug] ?? products["dark-chocolate-truffle"];

  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">Product Page</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">{product.name}</h1>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-4 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-[#e5e5e5] bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)] shadow-sm" />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#666666]">Premium Cake</p>
            <div className="mt-4 space-y-3 text-[#333333]">
              <p className="text-2xl font-semibold text-[#111111]">₹{product.price1} (1 lb)</p>
              <p className="text-2xl font-semibold text-[#111111]">₹{product.price2} (2 lb)</p>
            </div>
            <p className="mt-6 max-w-xl leading-8 text-[#333333]">{product.description}</p>

            <ProductOrder product={product} />
          </div>
        </div>
      </section>
    </main>
  );
}
