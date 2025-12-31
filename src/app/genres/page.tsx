"use client";

import { useEffect, useState } from "react";
import { fetchAniList, GENRES_QUERY } from "@/lib/anilist";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, Hash, ArrowRight } from "lucide-react";

const GENRE_GRADIENTS: Record<string, string> = {
  Action: "from-red-600 to-orange-600",
  Adventure: "from-green-600 to-teal-600",
  Comedy: "from-yellow-500 to-orange-500",
  Drama: "from-purple-600 to-pink-600",
  Ecchi: "from-pink-500 to-rose-500",
  Fantasy: "from-emerald-600 to-cyan-600",
  Horror: "from-gray-800 to-red-900",
  Mahou_Shoujo: "from-pink-400 to-purple-400",
  Mecha: "from-blue-700 to-cyan-400",
  Music: "from-indigo-600 to-purple-600",
  Mystery: "from-slate-700 to-slate-900",
  Psychological: "from-neutral-700 to-neutral-900",
  Romance: "from-pink-600 to-rose-600",
  Sci_Fi: "from-cyan-600 to-blue-600",
  Slice_of_Life: "from-lime-600 to-green-600",
  Sports: "from-blue-600 to-indigo-600",
  Supernatural: "from-violet-700 to-fuchsia-700",
  Thriller: "from-stone-800 to-red-900",
};

export default function GenresPage() {
  const [genres, setGenres] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getGenres = async () => {
      try {
        const data = await fetchAniList(GENRES_QUERY);
        setGenres(data.GenreCollection);
      } catch (error) {
        console.error("Failed to fetch genres", error);
      } finally {
        setLoading(false);
      }
    };
    getGenres();
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#bc13fe] to-[#00f3ff] bg-clip-text text-transparent">
            Genre Explorer
          </h1>
          <p className="text-foreground/50 font-mono text-sm max-w-xl">
            Dive into specific categories. From adrenaline-pumping action to
            heartwarming romance.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="h-12 w-12 text-[#bc13fe] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {genres.map((genre, index) => {
              const gradient =
                GENRE_GRADIENTS[genre.replace(/ /g, "_")] ||
                "from-gray-800 to-gray-900";

              return (
                <Link
                  key={genre}
                  href={`/search?genre=${genre}`}
                  className="group relative h-32 rounded-xl overflow-hidden border border-foreground/10 hover:border-foreground/30 transition-all hover:scale-[1.02]"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-60 group-hover:opacity-80 transition-opacity`}
                  />
                  <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20" />

                  <div className="absolute inset-0 p-6 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold uppercase tracking-wider drop-shadow-lg text-white">
                        {genre}
                      </div>
                      <div className="h-1 w-8 bg-white/50 rounded-full mt-2 group-hover:w-16 transition-all" />
                    </div>
                    <ArrowRight className="h-6 w-6 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-white" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
