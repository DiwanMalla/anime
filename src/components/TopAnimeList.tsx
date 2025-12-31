"use client";

import Link from "next/link";
import { Star, Users, Play, ChevronRight } from "lucide-react";

interface TopAnimeListProps {
  animeList: any[];
}

export default function TopAnimeList({ animeList }: TopAnimeListProps) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8 border-b border-foreground/10 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
          Top 100 Anime
        </h2>
        <Link
          href="/search?sort=SCORE_DESC"
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors font-medium"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-2">
        {/* Header Row */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Anime</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Format</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {animeList.map((anime, index) => {
          const title = anime.title.english || anime.title.romaji;
          const rank = index + 1;

          return (
            <Link
              key={anime.id}
              href={`/anime/${anime.id}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-anime-dark/20 hover:bg-anime-dark/60 border border-foreground/5 hover:border-blue-500/30 px-4 md:px-6 py-4 rounded-xl transition-all duration-300"
            >
              {/* Rank */}
              <div className="col-span-1 flex items-center justify-center md:justify-start">
                <span className="text-2xl font-black text-foreground/30 group-hover:text-blue-400 transition-colors">
                  {rank}
                </span>
              </div>

              {/* Anime Info */}
              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md shadow-lg">
                  <img
                    src={anime.coverImage.large}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-foreground group-hover:text-blue-400 transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.slice(0, 3).map((genre: string) => (
                      <span key={genre} className="text-[10px] text-gray-400">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Score & Users */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1.5 text-blue-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold">{anime.averageScore}%</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Users className="h-3 w-3" />
                  <span>{anime.popularity.toLocaleString()} users</span>
                </div>
              </div>

              {/* Format & Episodes */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-1 text-sm">
                <span className="text-foreground/80 font-medium">
                  {anime.format === "TV" ? "TV Show" : anime.format}
                </span>
                <span className="text-xs text-gray-500">
                  {anime.episodes} episodes
                </span>
              </div>

              {/* Season & Status */}
              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-end justify-center gap-1 text-xs">
                <span className="text-gray-400 capitalize">
                  {anime.season} {anime.seasonYear}
                </span>
                <span
                  className={`font-bold ${
                    anime.status === "FINISHED"
                      ? "text-green-400"
                      : "text-yellow-400"
                  }`}
                >
                  {anime.status === "FINISHED"
                    ? "Finished"
                    : anime.status.replace(/_/g, " ")}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
