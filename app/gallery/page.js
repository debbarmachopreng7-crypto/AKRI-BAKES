const galleryItems = [
  {
    title: "Wedding 1",
    label: "Wedding",
  },
  {
    title: "Wedding 2",
    label: "Wedding",
  },
  {
    title: "Birthday 1",
    label: "Birthday",
  },
  {
    title: "Birthday 2",
    label: "Birthday",
  },
  {
    title: "Church 1",
    label: "Church",
  },
  {
    title: "Seasonal Feature",
    label: "Gallery",
  },
];

export const metadata = {
  title: "Gallery | Akri Bakes",
};

export default function GalleryPage() {
  return (
    <main>
      <section className="border-b border-[#e5e5e5] bg-[#fafafa] py-20">
        <div className="mx-auto max-w-5xl px-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#666666]">
            Gallery
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold text-[#111111]">
            Product Showcase
          </h1>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-[#333333]">
            A visual collection of our cakes, events, and celebration pieces. These placeholders can be swapped with real photos later.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item) => (
            <div key={item.title} className="overflow-hidden rounded-[2rem] border border-[#e5e5e5] bg-white shadow-sm">
              <div className="flex h-72 items-center justify-center bg-[linear-gradient(135deg,#f5f5f5_0%,#ffffff_50%,#ececec_100%)]">
                <div className="rounded-full border border-[#d9d9d9] px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-[#666666]">
                  {item.label}
                </div>
              </div>
              <div className="border-t border-[#e5e5e5] p-5">
                <p className="text-sm font-medium uppercase tracking-[0.25em] text-[#666666]">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}