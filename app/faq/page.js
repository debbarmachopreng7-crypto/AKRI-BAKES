export const metadata = {
  title: "FAQ | Akri Bakes",
  description: "Frequently asked questions about ordering, custom cakes, delivery and payment at Akri Bakes, Dimapur.",
};

import FAQAccordion from "../../components/FAQAccordion";

export default function FAQPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Support</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Frequently Asked Questions</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#8B7355]">
            Everything you need to know about ordering from Akri Bakes.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4">
          <FAQAccordion />
        </div>
      </section>

      <section className="border-t border-[#E8E0D8] bg-[#26110B] py-16 text-center text-white">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="font-serif text-3xl font-bold">Still have questions?</h2>
          <p className="mt-3 text-white/70">We&rsquo;re a message away — ask us anything on WhatsApp or Instagram.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://wa.me/918259917757"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#BC6153] px-8 py-3 text-sm font-medium text-white shadow-lg shadow-[#BC6153]/30 transition hover:-translate-y-0.5 hover:bg-[#A85547]"
            >
              Chat on WhatsApp
            </a>
            <a
              href="https://www.instagram.com/akribakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/60 px-8 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Message on Instagram
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
