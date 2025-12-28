import { fetchAniList, TRENDING_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";
import { TrendingUp, ChevronRight } from "lucide-react";

export default async function Home() {
  let trendingAnime = [];
  try {
    const data = await fetchAniList(TRENDING_ANIME_QUERY, {
      page: 1,
      perPage: 12,
    });
    trendingAnime = data.Page.media;
  } catch (error) {
    console.error("Error fetching trending anime:", error);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={
              trendingAnime[0]?.bannerImage ||
              "https://images.unsplash.com/photo-1578632292335-df3abbb0d586?auto=format&fit=crop&q=80&w=2000"
            }
            alt="Hero Banner"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Explore the World of Anime
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover trending series, search for your favorites, and stay
            updated with the latest releases.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/search"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 flex items-center gap-2"
            >
              Start Exploring <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section id="trending" className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex items-center gap-2 mb-8">
          <TrendingUp className="h-6 w-6 text-blue-500" />
          <h2 className="text-3xl font-bold">Trending Now</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingAnime.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </main>
  );
}
