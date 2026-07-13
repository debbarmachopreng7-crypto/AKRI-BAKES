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
  },
  twitter: {
    card: "summary_large_image",
    title: "Akri Bakes",
    description: "Premium Cakes & Patisserie in Dimapur, Nagaland.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
      </body>
    </html>
  );
}