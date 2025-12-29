"use client";

import Link from "next/link";
import { Star, Play, Sparkles, Calendar, Layers } from "lucide-react";
import { motion } from "framer-motion";

interface AnimeCardProps {
  anime: {
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
    episodes?: number;
    status?: string;
    format?: string;
    seasonYear?: number;
    genres?: string[];
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;
  const accentColor = anime.coverImage.color || "#ff6b9d";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className="relative"
    >
      <Link href={`/anime/${anime.id}`} className="block">
        {/* Premium Glow Effect */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-0 hover:opacity-40 blur-2xl transition-all duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #c44eff, #4ecaff)`,
          }}
        />

        {/* Main Card */}
        <div className="relative bg-[#1a0a2e]/80 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500 shadow-2xl">
          {/* Image Section */}
          <div className="relative aspect-[2/3] w-full overflow-hidden">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-1000 hover:scale-110 hover:rotate-1"
            />

            {/* Dynamic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-[#0a0014]/20 to-transparent opacity-80 hover:opacity-60 transition-opacity duration-500" />

            {/* Floating Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-2">
              {anime.format && (
                <div className="bg-black/60 backdrop-blur-md text-white text-[10px] font-black px-2.5 py-1 rounded-lg border border-white/10 uppercase tracking-widest">
                  {anime.format}
                </div>
              )}
            </div>

            {anime.averageScore && (
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-yellow-400" />
                <span className="text-xs font-bold text-white">
                  {anime.averageScore}%
                </span>
              </div>
            )}

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-500 scale-90 hover:scale-100">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-xl border border-white/20 shadow-2xl"
                style={{
                  background: `radial-gradient(circle, ${accentColor}dd, transparent)`,
                }}
              >
                <Play className="h-6 w-6 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Sparkles on Hover */}
            <Sparkles className="absolute bottom-4 right-4 h-5 w-5 text-yellow-300 opacity-0 hover:opacity-100 transition-all duration-700 hover:rotate-12" />
          </div>

          {/* Content Section */}
          <div className="p-4 space-y-3">
            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 hover:text-purple-400 transition-colors duration-300 min-h-[2.5rem]">
              {title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {anime.genres?.slice(0, 2).map((genre) => (
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
                <Calendar className="h-3 w-3" />
                <span className="text-[10px] font-medium">
                  {anime.seasonYear}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Layers className="h-3 w-3" />
                <span className="text-[10px] font-medium">
                  {anime.episodes || "?"} EP
                </span>
              </div>
              <div
                className={`text-[10px] font-bold uppercase tracking-tighter ${
                  anime.status === "RELEASING"
                    ? "text-blue-400"
                    : anime.status === "FINISHED"
                    ? "text-green-400"
                    : "text-purple-400"
                }`}
              >
                {anime.status === "RELEASING"
                  ? "Airing"
                  : anime.status === "FINISHED"
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
