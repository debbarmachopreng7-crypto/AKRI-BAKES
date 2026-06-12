export const metadata = {
  title: "Reviews | Akri Bakes",
};

const reviews = [
  {
    name: "Customer",
    text: "Beautiful cake and amazing taste.",
  },
  {
    name: "Customer",
    text: "Best birthday cake in Nagaland.",
  },
  {
    name: "Customer",
    text: "Excellent service and customization.",
  },
];

export default function ReviewsPage() {
  return (
    <main>

      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">

          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            Customer feedback
          </p>

          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            Customer Reviews
          </h1>

        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 grid gap-8">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="rounded-[2rem] border border-[#e5e5e5] bg-white p-8 shadow-sm"
            >
              <h3 className="font-serif text-xl font-semibold text-[#111111]">
                {review.name}
              </h3>

              <p className="mt-3 leading-7 text-[#333333]">
                {review.text}
              </p>
            </div>
          ))}

        </div>
      </section>

    </main>
  );
}
