export const metadata = {
  title: "FAQ | Akri Bakes",
};

export default function FAQPage() {
  return (
    <main>

      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            Support
          </p>

          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            Frequently Asked Questions
          </h1>

        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 space-y-8">

          <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-[#111111]">
              How early should I place an order?
            </h3>

            <p className="mt-3 leading-7 text-[#333333]">
              We recommend at least 2–3 days in advance.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-[#111111]">
              Do you make custom cakes?
            </h3>

            <p className="mt-3 leading-7 text-[#333333]">
              Yes. Custom cake orders are available through our Build Your Cake feature.
            </p>
          </div>

          <div className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm">
            <h3 className="font-serif text-xl font-semibold text-[#111111]">
              Is delivery available?
            </h3>

            <p className="mt-3 leading-7 text-[#333333]">
              Currently orders are available for store pickup.
            </p>
          </div>

        </div>
      </section>

    </main>
  );
}
