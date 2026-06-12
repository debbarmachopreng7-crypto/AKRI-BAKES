export const metadata = {
  title: "About Us | Akri Bakes",
};

export default function AboutPage() {
  return (
    <main>

      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-6xl px-4 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            About Akri Bakes
          </p>

          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            About Akri Bakes
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">
            Akri Bakes is a premium cake and patisserie brand in Nagaland,
            specializing in handcrafted cakes for every celebration.
          </p>

        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4 grid lg:grid-cols-2 gap-16 items-center">

          <div>
            <img
              src="/about/about-bakery.jpg"
              alt="Akri Bakes"
              className="rounded-[2rem] border border-[#e5e5e5] shadow-[0_20px_50px_rgba(0,0,0,0.10)]"
            />
          </div>

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
              Our Story
            </p>

            <h2 className="mt-4 font-serif text-4xl font-semibold text-[#111111]">
              Our Story
            </h2>

            <p className="mt-6 leading-8 text-[#333333]">
              At Akri Bakes, every cake is crafted with passion,
              premium ingredients, and attention to detail.
            </p>

            <p className="mt-4 leading-8 text-[#333333]">
              From birthdays and weddings to church events,
              graduations, Christmas celebrations, and family
              gatherings, we create memorable cakes that bring
              people together.
            </p>

            <p className="mt-4 leading-8 text-[#333333]">
              Our goal is simple:
              create beautiful cakes that taste as good as they look.
            </p>

          </div>

        </div>
      </section>

    </main>
  );
}
