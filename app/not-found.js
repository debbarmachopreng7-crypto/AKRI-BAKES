import Link from "next/link";

export const metadata = {
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <main>
      <section className="relative flex min-h-[70vh] items-center overflow-hidden bg-[#F9F8F6] py-20">
        <div className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full bg-[#BC6153]/10 blur-3xl" aria-hidden="true" />
        <div className="relative mx-auto max-w-2xl px-4 text-center">
          <p className="font-serif text-7xl font-bold text-[#BC6153] md:text-8xl">404</p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em] text-[#8B7355]">
            Out of Stock
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[#26110B] md:text-5xl">
            This page baked itself away
          </h1>
          <p className="mx-auto mt-5 max-w-md leading-8 text-[#8B7355]">
            The page you&rsquo;re looking for has been frosted over, hidden in the display case, or
            never left the oven. Let&rsquo;s get you back to something sweet.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/"
              className="rounded-full bg-[#26110B] px-8 py-3.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:bg-[#3D2219] hover:shadow-xl"
            >
              Back to Home
            </Link>
            <Link
              href="/menu"
              className="rounded-full border border-[#BC6153] px-8 py-3.5 text-sm font-medium text-[#BC6153] transition hover:-translate-y-0.5 hover:bg-[#BC6153] hover:text-white"
            >
              Browse the Menu
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
