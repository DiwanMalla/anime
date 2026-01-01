"use client";

import Script from "next/script";

interface GoogleAdsenseProps {
  pId: string;
}

export default function GoogleAdsense({ pId }: GoogleAdsenseProps) {
  if (process.env.NODE_ENV !== "production") {
    return null;
  }

  return (
    <Script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
