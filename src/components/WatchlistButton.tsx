"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import { Plus, Check } from "lucide-react";

interface WatchlistButtonProps {
  anime: any;
  className?: string;
}

export default function WatchlistButton({
  anime,
  className = "",
}: WatchlistButtonProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const isAdded = isInWatchlist(anime.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) {
      removeFromWatchlist(anime.id);
    } else {
      addToWatchlist(anime);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all duration-300 border ${
        isAdded
          ? "bg-green-500/20 border-green-500/50 text-green-400 hover:bg-green-500/30"
          : "bg-white/10 border-white/10 text-white hover:bg-white/20 hover:border-white/30"
      } ${className}`}
    >
      {isAdded ? (
        <>
          <Check className="h-5 w-5" />
          <span>In Watchlist</span>
        </>
      ) : (
        <>
          <Plus className="h-5 w-5" />
          <span>Add to Watchlist</span>
        </>
      )}
    </button>
  );
}
