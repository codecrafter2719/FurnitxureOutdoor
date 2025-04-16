import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { CartProvider } from './context/CartContext'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FurnitxureOutdoor",
  description: "Your premium outdoor furniture destination",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Check if the current route is an admin route
  const isAdminRoute = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  return (
    <ClerkProvider>
      <CartProvider>
        <html lang="en">
          <body className={inter.className}>
            {!isAdminRoute && <Navbar />}
            <main className="flex-grow pt-16">
              {children}
            </main>
            {!isAdminRoute && <Footer />}
          </body>
        </html>
      </CartProvider>
    </ClerkProvider>
  );
}

