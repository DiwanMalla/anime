"use client";

import { useState, useEffect } from "react";
import { fetchAniList, SEARCH_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";

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
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <Link href="/" className="text-4xl font-bold text-blue-500">
          AnimeNext
        </Link>
        <div className="flex-1 max-w-md mx-8">
          <input
            type="text"
            placeholder="Search anime..."
            className="w-full bg-gray-800 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </header>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">
          {search
            ? `Search results for "${search}"`
            : "Start typing to search..."}
        </h2>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {results.map((anime: any) => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        )}

        {!loading && search && results.length === 0 && (
          <p className="text-center text-gray-400 mt-12">
            No anime found matching your search.
          </p>
        )}
      </section>
    </main>
  );
}
