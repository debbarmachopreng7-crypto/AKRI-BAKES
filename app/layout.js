import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { CartProvider } from "../components/CartContext";
import "./globals.css";
import { Inter, Playfair_Display } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
  title: {
    template: "%s — Akri Bakes",
    default: "Akri Bakes — Premium Cakes & Patisserie in Dimapur, Nagaland",
  },
  description: "Order custom celebration cakes, cheesecakes, mousse cakes, and more in Dimapur, Nagaland. Pickup or delivery available. Freshly baked with premium ingredients.",
  keywords: ["cakes", "bakery", "Dimapur", "Nagaland", "celebration cakes", "cheesecakes", "mousse cakes", "custom cakes", "Akri Bakes"],
  openGraph: {
    title: "Akri Bakes — Premium Cakes & Patisserie",
    description: "Freshly baked celebration cakes, cheesecakes, mousse & more in Dimapur, Nagaland.",
    url: "https://akribakes.com",
    siteName: "Akri Bakes",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Akri Bakes — premium cakes & patisserie in Dimapur, Nagaland",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akri Bakes",
    description: "Premium Cakes & Patisserie in Dimapur, Nagaland.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://debbarmachopreng7-crypto.github.io/AKRI-BAKES"),
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
  },
  themeColor: "#26110B",
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  themeColor: "#26110B",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-[#F9F8F6] text-[#26110B] antialiased">
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Bakery",
              name: "Akri Bakes",
              description: "Premium cakes & patisserie in Dimapur, Nagaland. Celebration cakes, cheesecakes, mousse cakes, bento cakes, pies & tarts.",
              url: "https://akribakes.com",
              telephone: "+91 82599 17757",
              email: "Akribake2020@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Zion Hospital Road, Purana Bazar",
                addressLocality: "Dimapur",
                addressRegion: "Nagaland",
                addressCountry: "IN",
              },
              priceRange: "₹₹",
              acceptsReservations: "True",
              sameAs: ["https://www.instagram.com/akribakes/"],
            }),
          }}
        />
      </body>
    </html>
  );
}