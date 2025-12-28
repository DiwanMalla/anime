"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchAniList, SEARCH_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import { Loader2 } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      const performSearch = async () => {
        setLoading(true);
        try {
          const data = await fetchAniList(SEARCH_ANIME_QUERY, {
            search: query,
            page: 1,
            perPage: 20,
          });
          setResults(data.Page.media);
        } catch (error) {
          console.error("Error searching anime:", error);
        } finally {
          setLoading(false);
        }
      };
      performSearch();
    }
  }, [query]);

  if (!query) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] text-gray-500">
        <p className="text-xl">
          Type something in the search bar to find anime.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-24">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-white">
        Results for "{query}"
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
      ) : (
        <>
          {results.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-8">
              {results.map((anime: any) => (
                <AnimeCard key={anime.id} anime={anime} />
              ))}
            </div>
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
