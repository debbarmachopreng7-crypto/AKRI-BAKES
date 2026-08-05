import Link from "next/link";

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
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/71/PhonePe_Logo.svg"
            alt="Official PhonePe Logo"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
            alt="Official Google Pay India Logo"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/2/24/Paytm_Logo_%28standalone%29.svg"
            alt="Official Paytm Logo"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg"
            alt="Official UPI Network Logo"
            style={{ height: 32, width: "auto", objectFit: "contain" }}
          />
        </div>

        <p className="mt-5 text-center text-xs text-[#8B7355]">
          We accept all major UPI applications for local deliveries across Dimapur.
        </p>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-[#8B7355]">
            &copy; {new Date().getFullYear()} Akri Bakes &middot; Zion Hospital Road, Purana Bazar, Dimapur, Nagaland &middot; 8259917757
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/akri_bakes/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]"
            >
              Instagram
            </a>
            <Link href="/contact" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Contact</Link>
            <Link href="/admin" className="text-sm text-[#8B7355] transition-colors hover:text-[#26110B]">Staff</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
