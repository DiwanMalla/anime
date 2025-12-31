"use client";

import Link from "next/link";
import {
  Star,
  BookOpen,
  Sparkles,
  Calendar,
  Layers,
  Plus,
  Check,
} from "lucide-react";
import { motion } from "framer-motion";
import { useWatchlist } from "@/context/WatchlistContext";

interface MangaCardProps {
  manga: {
    id: number;
    title: {
      romaji: string;
      english: string | null;
    };
    coverImage: {
      large: string;
      color?: string;
    };
    averageScore?: number;
    chapters?: number;
    status?: string;
    format?: string;
    genres?: string[];
  };
}

export default function MangaCard({ manga }: MangaCardProps) {
  const { addToWatchlist, removeFromWatchlist, isInWatchlist } = useWatchlist();
  const title = manga.title.english || manga.title.romaji;
  const accentColor = manga.coverImage.color || "#ff6b9d";
  const isAdded = isInWatchlist(manga.id);

  const handleWatchlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdded) {
      removeFromWatchlist(manga.id);
    } else {
      addToWatchlist(manga as any);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <Link href={`/manga/${manga.id}`} className="block">
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 hover:opacity-40 blur-2xl transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #c44eff, #4ecaff)`,
          }}
        />

        <div className="relative bg-[#1a0a2e]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <img
              src={manga.coverImage.large}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-1000 hover:scale-110 hover:rotate-1"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/20 to-transparent opacity-80 hover:opacity-60 transition-opacity duration-500" />

            <div className="absolute top-3 left-3 flex flex-col gap-2 z-30">
              {manga.format && (
                <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                  {manga.format}
                </div>
              )}
              <button
                onClick={handleWatchlist}
                className={`w-8 h-8 rounded-lg flex items-center justify-center backdrop-blur-md border transition-all duration-300 ${
                  isAdded
                    ? "bg-green-500/20 border-green-500/50 text-green-400"
                    : "bg-black/60 border-white/10 text-white hover:bg-white/20"
                }`}
              >
                {isAdded ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Plus className="h-4 w-4" />
                )}
              </button>
            </div>

            {manga.averageScore && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">
                  {manga.averageScore}%
                </span>
              </div>
            )}

            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500 scale-90 hover:scale-100">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
                style={{
                  background: `radial-gradient(circle, ${accentColor}dd, transparent)`,
                }}
              >
                <BookOpen className="h-6 w-6 text-white fill-white" />
              </div>
            </div>
          </div>

          <div className="p-4 space-y-3">
            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 hover:text-purple-400 transition-colors duration-300 min-h-[2.5rem]">
              {title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {manga.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-white/5 text-gray-400 border border-white/5"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-1.5 text-gray-500">
                <BookOpen className="h-3 w-3" />
                <span className="text-[10px] font-medium">
                  {manga.chapters || "?"} CH
                </span>
              </div>
              <div
                className={`text-[10px] font-bold uppercase tracking-tighter ${
                  manga.status === "RELEASING"
                    ? "text-blue-400"
                    : manga.status === "FINISHED"
                    ? "text-green-400"
                    : "text-purple-400"
                }`}
              >
                {manga.status === "RELEASING"
                  ? "Ongoing"
                  : manga.status === "FINISHED"
                  ? "Done"
                  : "Soon"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
