export const metadata = {
  title: "Reviews | Akri Bakes",
  description: "What our customers say about Akri Bakes — real reviews from weddings, birthdays and celebrations across Dimapur.",
};

const reviews = [
  {
    name: "Esther & Neeraj",
    tag: "Wedding · December 2025",
    text: "Our wedding desserts were the highlight of the evening — guests kept asking who made them. The cake was exactly what we dreamed of, and everything arrived on time.",
  },
  {
    name: "Anung & Joel",
    tag: "Wedding · November 2025",
    text: "The cake looked even better than the reference photos we sent. Fresh, perfectly sweet, and delivery was smooth. Thank you for being part of our big day.",
  },
  {
    name: "Yangthy & Lendi",
    tag: "Wedding · October 2025",
    text: "Our dessert table was stunning — people took photos before they even touched a thing. Beautiful flavours and a team that clearly cares. Highly recommended.",
  },
  {
    name: "Luke Luket Achumi",
    tag: "Google Review",
    text: "Thank you so much, it was really awesome — I loved it. The cake was just amazing, and the package of sweet cookies looks perfectly great and delightful. I would love to make an order again in the coming time.",
    source: "Google",
    href: "https://restaurant-guru.in/Akri-bakes-Dimapur",
  },
  {
    name: "Mikatoli",
    tag: "Google Review",
    text: "Thank you @akri_bakes — making a cake in 11 hours is not that easy, but you made it. For my dad and my birthday, it was spent so well (8th Feb 2022). Loved to order more in the coming days.",
    source: "Google",
    href: "https://restaurant-guru.in/Akri-bakes-Dimapur",
  },
  {
    name: "@the_naga_maiki",
    tag: "Instagram Feature · 825+ likes",
    text: "Akri Bakes is one of the few bakery cafés in Dimapur that offers good quality food and pastry at the most affordable rates. My heart and tummy are full!",
    source: "Instagram",
    href: "https://www.instagram.com/reel/DJ8734JPIeM/",
  },
];

function Stars() {
  return (
    <div className="flex gap-1 text-[#BC6153]" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  return (
    <main>
      <section className="border-b border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Customer Feedback</p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#26110B]">Customer Reviews</h1>
          <div className="mt-8 inline-flex flex-col items-center gap-3 rounded-[2rem] border border-[#E8E0D8] bg-white px-10 py-6 shadow-sm">
            <Stars />
            <p className="font-serif text-2xl font-bold text-[#26110B]">5.0</p>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-[#8B7355]">From our customers</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review) => (
              <div key={review.name} className="flex h-full flex-col rounded-[20px] border border-[#E8E0D8] bg-white p-8 shadow-sm">
                <Stars />
                <p className="mt-5 flex-1 leading-relaxed text-[#26110B]">&ldquo;{review.text}&rdquo;</p>
                <div className="mt-6 border-t border-[#E8E0D8] pt-4">
                  <p className="font-serif text-lg font-semibold text-[#26110B]">{review.name}</p>
                  <div className="mt-0.5 flex items-center gap-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-[#8B7355]">{review.tag}</p>
                    {review.source ? (
                      <a
                        href={review.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-full bg-[#F9F8F6] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#BC6153] transition hover:bg-[#BC6153] hover:text-white"
                      >
                        {review.source} &#8599;
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[#E8E0D8] bg-[#F9F8F6] py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">Tried Us Lately?</p>
          <h2 className="mt-5 font-serif text-4xl font-bold text-[#26110B]">We&rsquo;d love to hear from you</h2>
          <p className="mt-4 leading-7 text-[#8B7355]">
            Tag us in your cake photos on Instagram, or leave us a review — it means the world to a small
            local bakery.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://www.instagram.com/akribakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#26110B] px-8 py-3 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3D2219]"
            >
              Follow @akribakes
            </a>
            <a
              href="/contact"
              className="rounded-full border border-[#BC6153] px-8 py-3 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
