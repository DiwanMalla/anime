"use client";

import { useState, useEffect } from "react";
import { fetchAniList, SEASONAL_ANIME_QUERY } from "@/lib/anilist";
import { getCurrentSeason } from "@/lib/utils";
import AnimeCard from "@/components/AnimeCard";
import { Loader2, Calendar } from "lucide-react";
import { useInView } from "react-intersection-observer";

export default function SeasonalPage() {
  const { season, year } = getCurrentSeason();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const fetchSeasonal = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const data = await fetchAniList(SEASONAL_ANIME_QUERY, {
          season,
          year,
          page,
          perPage: 30,
        });
        const newMedia = data.Page.media;
        setResults((prev) => (page === 1 ? newMedia : [...prev, ...newMedia]));
        setHasNextPage(data.Page.pageInfo.hasNextPage);
      } catch (error) {
        console.error("Error fetching seasonal anime:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    fetchSeasonal();
  }, [page, season, year]);

  useEffect(() => {
    if (inView && hasNextPage && !loading && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage, loading, loadingMore]);

  return (
    <main className="min-h-screen bg-[#141414] text-white pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-[1920px] mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Calendar className="h-6 w-6 text-purple-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold capitalize">
              {season.toLowerCase()} {year} Anime
            </h1>
            <p className="text-gray-400 text-sm">
              Discover the hottest releases of the current season
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 text-purple-600 animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-8">
              {results.map((anime) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>

            <div ref={ref} className="flex justify-center items-center py-12">
              {loadingMore && (
                <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
