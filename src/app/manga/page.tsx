import {
  fetchAniList,
  TRENDING_MANGA_QUERY,
  POPULAR_MANGA_QUERY,
  TOP_RATED_MANGA_QUERY,
} from "@/lib/anilist";
import MangaCard from "@/components/MangaCard";
import TopMangaList from "@/components/TopMangaList";
import Link from "next/link";
import { Play, Info, ChevronRight, BookOpen } from "lucide-react";

export default async function MangaPage() {
  const [trendingData, popularData, topRatedData] = await Promise.all([
    fetchAniList(TRENDING_MANGA_QUERY, { page: 1, perPage: 20 }),
    fetchAniList(POPULAR_MANGA_QUERY, { page: 1, perPage: 20 }),
    fetchAniList(TOP_RATED_MANGA_QUERY, { page: 1, perPage: 100 }),
  ]);

  const trending = trendingData?.Page?.media || [];
  const popular = popularData?.Page?.media || [];
  const topRated = topRatedData?.Page?.media || [];

  const heroManga = trending[0];

  return (
    <main className="min-h-screen bg-background text-foreground pb-20">
      {/* Hero Section */}
      {heroManga && (
        <div className="relative h-[85vh] w-full overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={heroManga.bannerImage || heroManga.coverImage?.large}
              alt={heroManga.title?.english || heroManga.title?.romaji}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>

          <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl z-10 w-full pr-4">
            <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg leading-tight text-white">
              {heroManga.title?.english || heroManga.title?.romaji}
            </h1>
            <p className="text-sm sm:text-lg text-gray-200 mb-6 line-clamp-3 drop-shadow-md max-w-xl">
              {heroManga.description?.replace(/<[^>]*>/g, "")}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href={`/manga/${heroManga.id}/read`}
                className="flex items-center gap-2 bg-foreground text-background px-6 sm:px-8 py-2 sm:py-3 rounded font-bold hover:opacity-90 transition text-sm sm:text-base"
              >
                <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 fill-background" />{" "}
                Read Now
              </Link>
              <Link
                href={`/manga/${heroManga.id}`}
                className="flex items-center gap-2 bg-foreground/10 text-foreground px-6 sm:px-8 py-2 sm:py-3 rounded font-bold hover:bg-foreground/20 transition backdrop-blur-sm text-sm sm:text-base"
              >
                <Info className="h-4 w-4 sm:h-5 sm:w-5" /> More Info
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="relative z-20 -mt-32 space-y-12 px-4 md:px-12">
        <MangaRow title="Trending Manga" items={trending} />
        <MangaRow title="Popular Manga" items={popular} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <TopMangaList mangaList={topRated} />
        </div>
      </div>
    </main>
  );
}

function MangaRow({ title, items }: { title: string; items: any[] }) {
  if (!items || items.length === 0) return null;

  return (
    <section>
      <h2 className="text-lg md:text-2xl font-semibold mb-4 text-foreground/90 hover:text-foreground cursor-pointer flex items-center gap-2 group">
        {title}
        <span className="text-xs md:text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center">
          Explore All <ChevronRight className="h-4 w-4" />
        </span>
      </h2>
      <div className="relative group">
        <div className="flex gap-4 overflow-x-auto pb-4 scroll-smooth pr-4 md:pr-12 -mr-4 md:-mr-12 hide-scrollbar">
          {items.map((manga) => (
            <div key={manga.id} className="flex-none w-[200px] md:w-[240px]">
              <MangaCard manga={manga} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
