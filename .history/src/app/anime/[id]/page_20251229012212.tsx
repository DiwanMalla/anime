import { fetchAniList, ANIME_DETAILS_QUERY } from "@/lib/anilist";
import { Star, Calendar, Clock, Play, Info, ChevronLeft } from "lucide-react";
import AnimeCard from "@/components/AnimeCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AnimeDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let anime;

  try {
    const data = await fetchAniList(ANIME_DETAILS_QUERY, { id: parseInt(id) });
    anime = data.Media;
  } catch (error) {
    console.error("Error fetching anime details:", error);
    return notFound();
  }

  if (!anime) return notFound();

  const title = anime.title.english || anime.title.romaji;

  return (
    <main className="min-h-screen bg-[#141414] text-white">
      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] w-full">
        <div className="absolute top-24 left-4 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-white transition"
          >
            <ChevronLeft className="h-6 w-6" /> Back to Home
          </Link>
        </div>
        {anime.bannerImage ? (
          <img
            src={anime.bannerImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/40 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-12 -mt-48 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Cover Image */}
          <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.coverImage.extraLarge || anime.coverImage.large}
              alt={title}
              className="w-full rounded shadow-2xl"
            />

            {anime.trailer?.site === "youtube" && (
              <a
                href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-white text-black hover:bg-gray-200 py-3 rounded font-bold transition"
              >
                <Play className="h-5 w-5 fill-current" /> Watch Trailer
              </a>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 pt-8 md:pt-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
            <div className="flex flex-wrap gap-6 mb-8 text-gray-300 text-sm md:text-base font-medium">
              <div className="flex items-center gap-1 text-green-400">
                <span className="font-bold">
                  {anime.averageScore}% Match
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  {anime.seasonYear}
                </span>
              </div>
              <div className="flex items-center gap-1 border border-gray-500 px-1 rounded text-xs">
                <span>
                  {anime.format}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <span>
                  {anime.episodes} Episodes
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="text-sm text-gray-300 hover:text-white cursor-pointer transition"
                >
                  {genre}
                  <span className="mx-2 text-gray-600">•</span>
                </span>
              ))}
            </div>

            <div className="mb-12 max-w-3xl">
              <h3 className="text-xl font-semibold mb-2">Synopsis</h3>
              <div
                className="text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>

            {/* Recommendations */}
            {anime.recommendations?.nodes?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">More Like This</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {anime.recommendations.nodes.map((rec: any) => (
                    <AnimeCard key={rec.mediaRecommendation.id} anime={rec.mediaRecommendation} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
