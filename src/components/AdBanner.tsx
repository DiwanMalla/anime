"use client";

import { useEffect } from "react";

interface AdBannerProps {
  dataAdSlot: string;
  dataAdFormat?: string;
  dataFullWidthResponsive?: boolean;
}

export default function AdBanner({
  dataAdSlot,
  dataAdFormat = "auto",
  dataFullWidthResponsive = true,
}: AdBannerProps) {
  useEffect(() => {
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (e: any) {
      console.error("AdSense error:", e.message);
    }
  }, []);

  return (
    <div className="w-full flex justify-center my-8 overflow-hidden">
      {/* Container with a placeholder look for development */}
      <div className="w-full max-w-[1200px] min-h-[100px] bg-white/5 border border-dashed border-white/20 flex items-center justify-center relative">
        <span className="absolute top-2 right-2 text-[10px] uppercase tracking-widest text-white/40">Advertisement</span>
        
        {/* AdSense Unit */}
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client="ca-pub-4639608980089431" // This should match pId in GoogleAdsense component
          data-ad-slot={dataAdSlot}
          data-ad-format={dataAdFormat}
          data-full-width-responsive={dataFullWidthResponsive.toString()}
        />

        {process.env.NODE_ENV !== "production" && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-white/20 font-mono text-sm uppercase tracking-widest">Google Ad Slot: {dataAdSlot}</span>
            </div>
        )}
      </div>
    </div>
  );
}
