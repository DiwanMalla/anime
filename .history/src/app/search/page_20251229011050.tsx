"use client";

import { useState, useEffect } from "react";
import { fetchAniList, SEARCH_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import { Search, Loader2 } from "lucide-react";

export default function SearchPage() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (search) {
        handleSearch();
      } else {
        setResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const data = await fetchAniList(SEARCH_ANIME_QUERY, {
        search,
        page: 1,
        perPage: 12,
      });
      setResults(data.Page.media);
    } catch (error) {
      console.error("Error searching anime:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-4xl font-bold mb-8">Search Anime</h1>
          <div className="relative w-full max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Type anime name (e.g. Naruto, One Piece...)"
              className="w-full bg-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg shadow-xl transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <section>
          <h2 className="text-2xl font-semibold mb-8 text-gray-300">
            {search ? `Results for "${search}"` : "Popular Suggestions"}
          </h2>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 gap-4">
              <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
              <p className="text-gray-400">Searching the database...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {results.map((anime: any) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
          )}

          {!loading && search && results.length === 0 && (
            <div className="text-center py-20">
              <p className="text-2xl text-gray-500">
                No anime found matching your search.
              </p>
              <p className="text-gray-600 mt-2">
                Try different keywords or check for typos.
              </p>
            </div>
          )}
          {!loading && !search && (
            <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl">
              <Search className="h-16 w-16 text-gray-700 mx-auto mb-4" />
              <p className="text-xl text-gray-600 font-medium">
                Your search results will appear here
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
