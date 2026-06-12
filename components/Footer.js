import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-[#e5e5e5] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-[#666666] sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Akri Bakes · Zion Hospital Road, Purana Bazar, Dimapur, Nagaland · 8259917757</p>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="transition-colors hover:text-[#111111]">
            Contact
          </Link>
          <a
            href="/admin/index.html"
            className="transition-colors hover:text-[#111111]"
          >
            Staff
          </a>
        </div>
      </div>
    </footer>
  );
}
