"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import MangaProgressCard from "./MangaProgressCard";
import { History } from "lucide-react";

export default function ContinueReadingRow() {
  const { progress } = useWatchlist();
  
  // Only show manga (chapterId exists) and filter to recent
  const recentMangaProgress = Object.values(progress)
    .filter(p => p.chapterId) 
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 10);

  if (recentMangaProgress.length === 0) return null;

  return (
    <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h2 className="text-lg md:text-2xl font-bold mb-6 text-orange-400 uppercase tracking-widest flex items-center gap-3">
        <History className="h-6 w-6" />
        Continue Reading
      </h2>
      <div className="relative">
        <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-hide pr-12 -mr-12">
          {recentMangaProgress.map((p) => (
            <div key={p.id} className="flex-none w-[140px] md:w-[180px]">
              <MangaProgressCard progress={p} />
            </div>
          ))}
        </div>
        <div className="absolute top-0 right-0 bottom-6 w-24 bg-gradient-to-l from-background to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
