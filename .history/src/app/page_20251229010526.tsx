import { fetchAniList, TRENDING_ANIME_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";

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
    <main className="min-h-screen bg-gray-900 text-white p-8">
      <header className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <h1 className="text-4xl font-bold text-blue-500">AnimeNext</h1>
        <nav>
          <Link
            href="/search"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition"
          >
            Search Anime
          </Link>
        </nav>
      </header>

      <section className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold mb-6">Trending Now</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {trendingAnime.map((anime: any) => (
            <AnimeCard key={anime.id} anime={anime} />
          ))}
        </div>
      </section>
    </main>
  );
}
