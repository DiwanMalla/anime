"use client";

import Link from "next/link";
import { Star, Play, Sparkles } from "lucide-react";
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
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;
  const accentColor = anime.coverImage.color || "#ff6b9d";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="anime-card group"
    >
      <Link href={`/anime/${anime.id}`} className="block relative">
        {/* Glow Effect */}
        <div
          className="absolute -inset-2 rounded-xl opacity-0 group-hover:opacity-60 blur-xl transition-opacity duration-500"
          style={{
            background: `linear-gradient(135deg, ${accentColor}, #c44eff)`,
          }}
        />

        {/* Card Container */}
        <div className="relative bg-[#1a0a2e] rounded-xl overflow-hidden border-2 border-white/10 group-hover:border-[#ff6b9d]/50 transition-all duration-300">
          {/* Image Container */}
          <div className="relative h-[280px] w-full overflow-hidden">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-transparent to-transparent opacity-90" />

            {/* Play Button on Hover */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-16 h-16 rounded-full bg-[#ff6b9d]/90 flex items-center justify-center backdrop-blur-sm transform scale-0 group-hover:scale-100 transition-transform duration-300">
                <Play className="h-8 w-8 text-white fill-white ml-1" />
              </div>
            </div>

            {/* Format Badge */}
            {anime.format && (
              <div className="absolute top-3 left-3 bg-[#c44eff]/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                {anime.format}
              </div>
            )}

            {/* Sparkle Decorations */}
            <Sparkles className="absolute bottom-16 right-4 h-4 w-4 text-[#ffd93d] opacity-0 group-hover:opacity-100 transition-opacity sparkle" />
          </div>

          {/* Content */}
          <div className="p-4 relative">
            {/* Decorative Line */}
            <div
              className="absolute top-0 left-4 right-4 h-0.5 rounded-full opacity-50"
              style={{
                background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
              }}
            />

            <h3 className="text-white font-bold text-base truncate group-hover:text-[#ff6b9d] transition-colors mt-1">
              {title}
            </h3>

            <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
              {anime.seasonYear && (
                <span className="text-[#4ecaff]">{anime.seasonYear}</span>
              )}
              {anime.episodes && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span>{anime.episodes} EP</span>
                </>
              )}
              {anime.status && (
                <>
                  <span className="w-1 h-1 rounded-full bg-gray-600" />
                  <span
                    className={
                      anime.status === "RELEASING"
                        ? "text-[#4ecaff]"
                        : anime.status === "FINISHED"
                        ? "text-[#ffd93d]"
                        : "text-[#ff6b9d]"
                    }
                  >
                    {anime.status === "RELEASING"
                      ? "Airing"
                      : anime.status === "FINISHED"
                      ? "Completed"
                      : anime.status === "NOT_YET_RELEASED"
                      ? "Upcoming"
                      : anime.status}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
