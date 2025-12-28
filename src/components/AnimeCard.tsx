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
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/anime/${anime.id}`} className="group block">
        <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-blue-500/20 group-hover:ring-2 group-hover:ring-blue-500/50">
          <div className="relative h-72 w-full overflow-hidden">
            <img
              src={anime.coverImage.large}
              alt={title}
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {anime.averageScore && (
              <div className="absolute top-3 right-3 bg-gray-900/80 backdrop-blur-md text-white text-xs font-bold px-2 py-1 rounded-lg flex items-center gap-1 border border-gray-700">
                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                {anime.averageScore}%
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-white font-bold text-base line-clamp-2 h-12 group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {anime.genres.slice(0, 2).map((genre) => (
                <span
                  key={genre}
                  className="text-[10px] uppercase tracking-wider font-bold bg-gray-700/50 text-gray-400 px-2 py-0.5 rounded-md border border-gray-700"
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
