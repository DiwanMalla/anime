"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface AnimeCardProps {
  anime: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      large: string;
    };
    averageScore: number;
    genres: string[];
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/anime/${anime.id}`} className="group block relative">
        {/* Sci-Fi Border Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] rounded-sm opacity-0 group-hover:opacity-75 blur transition duration-500" />
        
        <div className="relative bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/10 group-hover:border-transparent transition-colors">
          <div className="relative h-[300px] w-full overflow-hidden">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

            {anime.averageScore && (
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm text-[#00f3ff] text-xs font-mono font-bold px-2 py-1 rounded-sm flex items-center gap-1 border border-[#00f3ff]/30">
                <Star className="h-3 w-3 fill-current" />
                {anime.averageScore}%
              </div>
            )}
          </div>
          
          <div className="p-4 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <h3 className="text-white font-medium truncate group-hover:text-[#00f3ff] transition-colors tracking-wide">
              {title}
            </h3>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {anime.genres?.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] font-mono uppercase text-gray-400 border border-white/10 px-1.5 py-0.5 rounded-sm group-hover:border-[#bc13fe]/30 group-hover:text-[#bc13fe] transition-colors"
                >
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
