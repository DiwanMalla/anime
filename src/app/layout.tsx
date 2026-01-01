import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Providers } from "@/components/Providers";
import { Analytics } from "@vercel/analytics/next";
import AniGenie from "@/components/AniGenie";
import NotificationManager from "@/components/NotificationManager";
import GoogleAdsense from "@/components/GoogleAdsense";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AniVerse - Stream Anime & Manga Online | Your Ultimate Anime Hub",
  description:
    "Watch your favorite anime and read manga online at AniVerse. Discover trending series, track your watchlist, and stay updated with the airing schedule. The most premium anime streaming experience.",
  keywords: [
    "anime",
    "manga",
    "streaming",
    "watch anime",
    "read manga",
    "aniverse",
    "anime database",
    "airing schedule",
  ],
  authors: [{ name: "AniVerse Team" }],
  creator: "AniVerse",
  publisher: "AniVerse",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  other: {
    "google-adsense-account": "ca-pub-4639608980089431",
  },
  metadataBase: new URL("https://www.aninexus.store"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AniVerse - Stream Anime & Manga Online",
    description: "The most premium anime and manga community platform.",
    url: "https://www.aninexus.store",
    siteName: "AniVerse",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/aninexus.png",
        width: 1200,
        height: 630,
        alt: "AniVerse Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AniVerse - Stream Anime & Manga Online",
    description: "The most premium anime and manga community platform.",
    images: ["/aninexus.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#141414",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased transition-colors duration-300`}
      >
        <GoogleAdsense pId="ca-pub-4639608980089431" />
        <Providers>
          <Navbar />
          <NotificationManager />
          <main className="flex-1 overflow-x-hidden">{children}</main>
          <AniGenie />
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
