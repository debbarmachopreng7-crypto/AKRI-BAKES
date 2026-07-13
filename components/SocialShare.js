export default function SocialShare({ name }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = `${name} — from Akri Bakes!`;

  const shareLinks = [
    { label: "WhatsApp", href: `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, color: "bg-[#25D366] hover:bg-[#20BD5A]" },
    { label: "Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, color: "bg-[#1877F2] hover:bg-[#166FE5]" },
    { label: "Twitter", href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${url}`)}`, color: "bg-[#000] hover:bg-[#222]" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8B7355]">Share</span>
      {shareLinks.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
          className={`rounded-full px-4 py-1.5 text-xs font-medium text-white transition ${link.color}`}>
          {link.label}
        </a>
      ))}
    </div>
  );
}
