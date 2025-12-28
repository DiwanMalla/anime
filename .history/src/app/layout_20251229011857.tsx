import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AniVerse - Watch TV Shows Online, Watch Movies Online",
  description: "AniVerse - Watch TV Shows Online, Watch Movies Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} antialiased bg-[#141414] text-white`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
