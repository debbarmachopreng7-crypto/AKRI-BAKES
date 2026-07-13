import Link from "next/link";

export default function Breadcrumbs({ items }) {
  return (
    <nav className="mx-auto max-w-6xl px-4 pt-8" aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-[#8B7355]">
        <li>
          <Link href="/" className="transition hover:text-[#26110B]">Home</Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-2">
            <span className="text-[#D0C8B8]">/</span>
            {item.href ? (
              <Link href={item.href} className="transition hover:text-[#26110B]">{item.label}</Link>
            ) : (
              <span className="text-[#26110B]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
