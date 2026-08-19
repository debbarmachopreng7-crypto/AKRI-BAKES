import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="border-t border-[#E8E0D8] bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 28,
            padding: 20,
            backgroundColor: "transparent",
          }}
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
            alt="Official PhonePe Logo"
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto object-contain"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
            alt="Official Google Pay India Logo"
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto object-contain"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
            alt="Official Paytm Logo"
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto object-contain"
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
            alt="Official UPI Network Logo"
            width={120}
            height={32}
            unoptimized
            className="h-8 w-auto object-contain"
          />
        </div>

        <p className="mt-5 text-center text-xs text-[#8B7355]">
          We accept all major UPI applications for local deliveries across Dimapur.
        </p>

        <p className="mt-3 text-center text-xs text-[#8B7355]">
          Open Monday – Saturday, 9:00 AM – 7:00 PM &middot; Sunday, 10:00 AM – 4:00 PM
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#8B7355]">
            &copy; {new Date().getFullYear()} Akri Bakes &middot; Zion Hospital Road, Purana Bazar, Dimapur, Nagaland &middot; 8259917757
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/akribakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]"
            >
              Instagram
            </a>
            <Link href="/reviews" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Reviews</Link>
            <Link href="/contact" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Contact</Link>
            <Link href="/terms" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Terms &amp; Refunds</Link>
            <Link href="/privacy" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Privacy</Link>
            <Link href="/admin" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Staff</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
