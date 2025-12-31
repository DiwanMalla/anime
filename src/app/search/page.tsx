"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchAniList, SEARCH_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import { Loader2, Filter, X, ChevronDown } from "lucide-react";
import { useInView } from "react-intersection-observer";

const GENRES = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Psychological",
  "Romance",
  "Sci-Fi",
  "Slice of Life",
  "Supernatural",
  "Thriller",
];

const STATUSES = [
  { label: "Airing", value: "RELEASING" },
  { label: "Finished", value: "FINISHED" },
  { label: "Not Yet Released", value: "NOT_YET_RELEASED" },
  { label: "Cancelled", value: "CANCELLED" },
  { label: "Hiatus", value: "HIATUS" },
];

const FORMATS = [
  { label: "TV", value: "TV" },
  { label: "Movie", value: "MOVIE" },
  { label: "OVA", value: "OVA" },
  { label: "ONA", value: "ONA" },
  { label: "Special", value: "SPECIAL" },
  { label: "Music", value: "MUSIC" },
];

const SORTS = [
  { label: "Popularity", value: "POPULARITY_DESC" },
  { label: "Trending", value: "TRENDING_DESC" },
  { label: "Score", value: "SCORE_DESC" },
  { label: "Latest", value: "START_DATE_DESC" },
];

function SearchResults() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const query = searchParams.get("q") || "";
  const genre = searchParams.get("genre") || "";
  const tag = searchParams.get("tag") || "";
  const status = searchParams.get("status") || "";
  const format = searchParams.get("format") || "";
  const sort = searchParams.get("sort") || "POPULARITY_DESC";
  const year = searchParams.get("year") || "";

  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/search?${params.toString()}`);
  };

  // Reset search when filters change
  useEffect(() => {
    setResults([]);
    setPage(1);
    setHasNextPage(true);
  }, [query, genre, tag, status, format, sort, year]);

  useEffect(() => {
    const performSearch = async () => {
      if (page === 1) setLoading(true);
      else setLoadingMore(true);

      try {
        const variables: any = {
          search: query || undefined,
          genre: genre || undefined,
          tag: tag || undefined,
          status: status || undefined,
          format: format || undefined,
          year: year ? parseInt(year) : undefined,
          page: page,
          perPage: 30,
          sort: [sort],
        };

        if (genre) variables.genre = genre;
        if (status) variables.status = status;
        if (format) variables.format = format;
        if (year) variables.year = parseInt(year);

        const data = await fetchAniList(SEARCH_ANIME_QUERY, variables);
        const newMedia = data.Page.media;

        setResults((prev) => (page === 1 ? newMedia : [...prev, ...newMedia]));
        setHasNextPage(
          data.Page.pageInfo?.hasNextPage ?? newMedia.length === 30
        );
      } catch (error) {
        console.error("Error searching anime:", error);
      } finally {
        setLoading(false);
        setLoadingMore(false);
      }
    };
    performSearch();
  }, [query, genre, status, format, sort, year, page]);

  useEffect(() => {
    if (inView && hasNextPage && !loading && !loadingMore) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasNextPage, loading, loadingMore]);

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {query ? `Results for "${query}"` : "Browse Anime"}
        </h1>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-xl transition-all md:hidden"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Filters Bar */}
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 ${
          showFilters ? "block" : "hidden md:grid"
        }`}
      >
        {/* Genre Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Genre
          </label>
          <select
            value={genre}
            onChange={(e) => updateFilters("genre", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
          >
            <option value="">All Genres</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => updateFilters("status", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
          >
            <option value="">All Status</option>
            {STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Format Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Format
          </label>
          <select
            value={format}
            onChange={(e) => updateFilters("format", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
          >
            <option value="">All Formats</option>
            {FORMATS.map((f) => (
              <option key={f.value} value={f.value}>
                {f.label}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Year
          </label>
          <input
            type="number"
            placeholder="e.g. 2024"
            value={year}
            onChange={(e) => updateFilters("year", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50"
          />
        </div>

        {/* Sort Filter */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Sort By
          </label>
          <select
            value={sort}
            onChange={(e) => updateFilters("sort", e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500/50 appearance-none cursor-pointer"
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {results.length > 0 ? (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-8">
                {results.map((anime: any) => (
                  <AnimeCard key={anime.id} anime={anime} />
                ))}
              </div>

              {/* Infinite Scroll Trigger */}
              <div ref={ref} className="flex justify-center items-center py-12">
                {loadingMore && (
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
                )}
              </div>
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">No results found.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-[#141414] text-white">
      <Suspense fallback={<div className="pt-24 text-center">Loading...</div>}>
        <SearchResults />
      </Suspense>
    </main>
  );
}
