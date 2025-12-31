"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import AnimeCard from "@/components/AnimeCard";
import { motion } from "framer-motion";
import { Bookmark, Ghost, PlayCircle } from "lucide-react";
import Link from "next/link";

export default function WatchlistPage() {
  const { watchlist } = useWatchlist();

  return (
    <main className="min-h-screen bg-[#0a0014] text-white pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
             <div className="p-4 rounded-2xl bg-[#bc13fe]/10 border border-[#bc13fe]/20 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#bc13fe]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <Bookmark className="h-8 w-8 text-[#bc13fe] relative z-10" />
             </div>
             <div>
                <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-[#bc13fe] to-[#00f3ff] bg-clip-text text-transparent">
                  My Watchlist
                </h1>
                <p className="text-gray-400 font-mono text-sm mt-1">
                  {watchlist.length} {watchlist.length === 1 ? "Protocol" : "Protocols"} Stored in Memory
                </p>
             </div>
          </div>
        </div>

        {watchlist.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-32 text-center"
          >
            <div className="relative w-64 h-64 mb-6">
              <img 
                src="/empty-state.png" 
                alt="Empty Watchlist" 
                className="w-full h-full object-contain drop-shadow-[0_0_50px_rgba(188,19,254,0.3)]"
              />
            </div>
            <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Your List is Empty
            </h2>
            <p className="text-gray-400 mb-8 max-w-sm text-base leading-relaxed">
              Looks like you haven't added any anime yet. exploring the vast universe of anime is just a click away!
            </p>
            <Link
              href="/search"
              className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-full font-bold transition-all flex items-center gap-2 group shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]"
            >
              <PlayCircle className="h-5 w-5 fill-black group-hover:scale-110 transition-transform" />
              Start Exploring
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {watchlist.map((anime) => (
              <AnimeCard key={anime.id} anime={anime as any} />
            ))}
          </motion.div>
        )}
      </div>
    </main>
  );
}
