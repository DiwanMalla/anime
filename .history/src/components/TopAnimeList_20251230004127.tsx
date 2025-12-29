"use client";

import Link from "next/link";
import { Star, Users, Play, ChevronRight } from "lucide-react";

interface TopAnimeListProps {
  animeList: any[];
}

export default function TopAnimeList({ animeList }: TopAnimeListProps) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Top 100 Anime
        </h2>
        <Link
          href="/search?sort=SCORE_DESC"
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors group"
        >
          View All{" "}
          <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      <div className="space-y-4">
        {animeList.map((anime, index) => {
          const title = anime.title.english || anime.title.romaji;
          const rank = index + 1;

          return (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="group flex items-center gap-4 bg-[#1a0a2e]/40 hover:bg-[#1a0a2e]/80 border border-white/5 hover:border-purple-500/30 p-4 rounded-xl transition-all duration-300"
            >
              {/* Rank */}
              <div className="w-12 text-center">
                <span className="text-2xl font-black text-gray-600 group-hover:text-purple-400 transition-colors">
                  #{rank}
                </span>
              </div>

              {/* Image */}
              <div className="relative w-16 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                <img
                  src={anime.coverImage.large}
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Info */}
              <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div className="md:col-span-1">
                  <h3 className="font-bold text-white group-hover:text-purple-400 transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {anime.genres.slice(0, 2).map((genre: string) => (
                      <span
                        key={genre}
                        className="text-[10px] text-gray-400 bg-white/5 px-2 py-0.5 rounded-full"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center gap-1">
                  <div className="flex items-center gap-1.5 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="font-bold">{anime.averageScore}%</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Users className="h-3 w-3" />
                    <span>{anime.popularity.toLocaleString()} users</span>
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-center gap-1 text-sm text-gray-300">
                  <span className="font-medium">{anime.format}</span>
                  <span className="text-xs text-gray-500">
                    {anime.episodes} episodes
                  </span>
                </div>

                <div className="hidden md:flex flex-col items-end gap-1 text-sm">
                  <span className="text-blue-400 capitalize">
                    {anime.season} {anime.seasonYear}
                  </span>
                  <span
                    className={`text-xs ${
                      anime.status === "FINISHED"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {anime.status.replace(/_/g, " ")}
                  </span>
                </div>
              </div>

              {/* Play Button */}
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
