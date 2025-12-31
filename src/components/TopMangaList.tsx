"use client";

import Link from "next/link";
import { Star, Users, BookOpen, ChevronRight } from "lucide-react";

interface TopMangaListProps {
  mangaList: any[];
}

export default function TopMangaList({ mangaList }: TopMangaListProps) {
  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
        <h2 className="text-2xl md:text-3xl font-bold text-white">
          Top 100 Manga
        </h2>
        <Link
          href="/manga?sort=SCORE_DESC"
          className="flex items-center gap-1 text-sm text-orange-400 hover:text-orange-300 transition-colors font-medium"
        >
          View All <ChevronRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="space-y-2">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">
          <div className="col-span-1">#</div>
          <div className="col-span-5">Manga</div>
          <div className="col-span-2 text-center">Score</div>
          <div className="col-span-2 text-center">Format</div>
          <div className="col-span-2 text-right">Status</div>
        </div>

        {mangaList.map((manga, index) => {
          const title = manga.title.english || manga.title.romaji;
          const rank = index + 1;

          return (
            <Link
              key={manga.id}
              href={`/manga/${manga.id}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-4 items-center bg-[#1a0a2e]/20 hover:bg-[#1a0a2e]/60 border border-white/5 hover:border-orange-500/30 px-4 md:px-6 py-4 rounded-xl transition-all duration-300"
            >
              <div className="col-span-1 flex items-center justify-center md:justify-start">
                <span className="text-2xl font-black text-gray-700 group-hover:text-orange-400 transition-colors">
                  {rank}
                </span>
              </div>

              <div className="col-span-1 md:col-span-5 flex items-center gap-4">
                <div className="relative w-12 h-16 flex-shrink-0 overflow-hidden rounded-md shadow-lg">
                  <img
                    src={manga.coverImage.large}
                    alt={title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                    {title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {manga.genres.slice(0, 3).map((genre: string) => (
                      <span key={genre} className="text-[10px] text-gray-400">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-1">
                <div className="flex items-center gap-1.5 text-orange-400">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="font-bold">{manga.averageScore}%</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Users className="h-3 w-3" />
                  <span>{manga.popularity.toLocaleString()} users</span>
                </div>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center gap-1 text-sm">
                <span className="text-gray-300 font-medium">
                  {manga.format}
                </span>
                <span className="text-xs text-gray-500">
                  {manga.chapters || "?"} chapters
                </span>
              </div>

              <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-end justify-center gap-1 text-xs">
                <span
                  className={`font-bold uppercase tracking-tighter ${
                    manga.status === "RELEASING"
                      ? "text-blue-400"
                      : "text-green-400"
                  }`}
                >
                  {manga.status === "RELEASING" ? "Ongoing" : "Finished"}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
