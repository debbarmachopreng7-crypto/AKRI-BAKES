import Navbar from "../components/Navbar";
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
  title: "Akri Bakes",
  description: "Premium Cakes & Patisserie for Every Celebration in Nagaland.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen overflow-x-hidden bg-white text-[#111111] antialiased">
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}