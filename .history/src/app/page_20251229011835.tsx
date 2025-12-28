import {
  fetchAniList,
  TRENDING_ANIME_QUERY,
  POPULAR_ANIME_QUERY,
  UPCOMING_ANIME_QUERY,
  TOP_RATED_ANIME_QUERY,
} from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import Link from "next/link";
import { Play, Info, ChevronRight } from "lucide-react";

export default async function Home() {
  const [trendingData, popularData, upcomingData, topRatedData] =
    await Promise.all([
      fetchAniList(TRENDING_ANIME_QUERY, { page: 1, perPage: 20 }),
      fetchAniList(POPULAR_ANIME_QUERY, { page: 1, perPage: 20 }),
      fetchAniList(UPCOMING_ANIME_QUERY, { page: 1, perPage: 20 }),
      fetchAniList(TOP_RATED_ANIME_QUERY, { page: 1, perPage: 20 }),
    ]);

  const trending = trendingData?.Page?.media || [];
  const popular = popularData?.Page?.media || [];
  const upcoming = upcomingData?.Page?.media || [];
  const topRated = topRatedData?.Page?.media || [];

  const heroAnime = trending[0];

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20">
      {/* Hero Section */}
      {heroAnime && (
        <div className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroAnime.bannerImage || heroAnime.coverImage?.large}
              alt={heroAnime.title?.english || heroAnime.title?.romaji}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl z-10">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              {heroAnime.title?.english || heroAnime.title?.romaji}
            </h1>
            <p className="text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow-md">
              {heroAnime.description?.replace(/<[^>]*>/g, "")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href={`/anime/${heroAnime.id}`}
                className="flex items-center gap-2 bg-white text-black px-8 py-3 rounded font-bold hover:bg-gray-200 transition"
              >
                <Play className="h-5 w-5 fill-black" /> Play
              </Link>
              <Link
                href={`/anime/${heroAnime.id}`}
                className="flex items-center gap-2 bg-gray-500/70 text-white px-8 py-3 rounded font-bold hover:bg-gray-500/50 transition backdrop-blur-sm"
              >
                <Info className="h-5 w-5" /> More Info
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-20 -mt-32 space-y-12 px-4 md:px-12">
        <AnimeRow title="Trending Now" items={trending} />
        <AnimeRow title="Popular on AniVerse" items={popular} />
        <AnimeRow title="Top Rated" items={topRated} />
        <AnimeRow title="Upcoming Releases" items={upcoming} />
      </div>
    </main>
  );
}

function AnimeRow({ title, items }: { title: string; items: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <h2 className="text-xl md:text-2xl font-semibold mb-4 text-gray-100 hover:text-white cursor-pointer flex items-center gap-2 group">
        {title}
        <span className="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          Explore All <ChevronRight className="h-4 w-4" />
        </span>
      </h2>
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide scroll-smooth">
          {items.map((anime) => (
            <div key={anime.id} className="flex-none w-[200px] md:w-[240px]">
              <AnimeCard anime={anime} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
