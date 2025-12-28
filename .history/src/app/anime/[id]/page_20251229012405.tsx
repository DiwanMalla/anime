import { fetchAniList, ANIME_DETAILS_QUERY } from "@/lib/anilist";
import { Star, Calendar, Clock, Info, ChevronLeft, Users, Clapperboard } from "lucide-react";
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
  const startDate = anime.startDate?.year ? `${anime.startDate.year}` : 'TBA';

  return (
    <main className="min-h-screen bg-[#141414] text-white pb-20">
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

      <div className="max-w-[1600px] mx-auto px-4 md:px-12 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Cover & Details */}
          <div className="w-full lg:w-[300px] flex-shrink-0 flex flex-col gap-6">
            <img
              src={anime.coverImage.extraLarge || anime.coverImage.large}
              alt={title}
              className="w-64 lg:w-full mx-auto rounded shadow-2xl"
            />
            
            <div className="bg-[#1f1f1f] p-6 rounded-lg space-y-4">
              <h3 className="font-semibold text-lg border-b border-gray-700 pb-2">Details</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Format</span>
                  <span>{anime.format || 'TV'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Episodes</span>
                  <span>{anime.episodes || '?'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration</span>
                  <span>{anime.duration ? `${anime.duration} mins` : '?'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span>{anime.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Start Date</span>
                  <span>{startDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Season</span>
                  <span className="capitalize">{anime.season ? `${anime.season.toLowerCase()} ${anime.seasonYear}` : '?'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Source</span>
                  <span className="capitalize">{anime.source?.replace(/_/g, ' ').toLowerCase() || '?'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Studio</span>
                  <span>{anime.studios?.nodes[0]?.name || '?'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 pt-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h1>
            
            <div className="flex flex-wrap gap-6 mb-8 text-gray-300 text-sm md:text-base font-medium items-center">
              <div className="flex items-center gap-1 text-green-400">
                <span className="font-bold">{anime.averageScore}% Match</span>
              </div>
              <span>{anime.seasonYear}</span>
              <span className="border border-gray-500 px-1 rounded text-xs">{anime.format}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map((genre: string) => (
                <span key={genre} className="text-sm text-gray-300 hover:text-white cursor-pointer transition">
                  {genre}<span className="mx-2 text-gray-600">•</span>
                </span>
              ))}
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-semibold mb-3">Synopsis</h3>
              <div 
                className="text-gray-300 leading-relaxed max-w-4xl"
                dangerouslySetInnerHTML={{ __html: anime.description }} 
              />
            </div>

            {/* Trailer Section */}
            {anime.trailer?.site === "youtube" && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Clapperboard className="h-5 w-5" /> Trailer
                </h3>
                <div className="aspect-video w-full max-w-4xl bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={`https://www.youtube.com/embed/${anime.trailer.id}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  />
                </div>
              </div>
            )}

            {/* Characters Section */}
            {anime.characters?.edges?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Users className="h-5 w-5" /> Main Cast
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
                  {anime.characters.edges.map((char: any) => (
                    <div key={char.node.id} className="flex bg-[#1f1f1f] rounded-lg overflow-hidden">
                      <img 
                        src={char.node.image.medium} 
                        alt={char.node.name.full}
                        className="w-16 h-24 object-cover"
                      />
                      <div className="p-3 flex flex-col justify-center text-sm">
                        <div className="font-medium text-white">{char.node.name.full}</div>
                        <div className="text-gray-400 text-xs">{char.role}</div>
                        {char.voiceActors?.[0] && (
                          <div className="mt-1 text-xs text-gray-500">
                            VA: {char.voiceActors[0].name.full}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {anime.recommendations?.nodes?.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold mb-6">More Like This</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {anime.recommendations.nodes.map((rec: any) => (
                    <AnimeCard
                      key={rec.mediaRecommendation.id}
                      anime={rec.mediaRecommendation}
                    />
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
