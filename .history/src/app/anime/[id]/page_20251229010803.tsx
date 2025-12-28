import { fetchAniList, ANIME_DETAILS_QUERY } from '@/lib/anilist';
import { Star, Calendar, Clock, Play, Info } from 'lucide-react';
import AnimeCard from '@/components/AnimeCard';
import { notFound } from 'next/navigation';

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
    console.error('Error fetching anime details:', error);
    return notFound();
  }

  if (!anime) return notFound();

  const title = anime.title.english || anime.title.romaji;

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      {/* Banner */}
      <div className="relative h-[40vh] md:h-[50vh] w-full">
        {anime.bannerImage ? (
          <img
            src={anime.bannerImage}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-800" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Cover Image */}
          <div className="w-64 flex-shrink-0 mx-auto md:mx-0">
            <img
              src={anime.coverImage.extraLarge || anime.coverImage.large}
              alt={title}
              className="w-full rounded-xl shadow-2xl border-4 border-gray-900"
            />
            
            {anime.trailer?.site === 'youtube' && (
              <a
                href={`https://www.youtube.com/watch?v=${anime.trailer.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-semibold transition"
              >
                <Play className="h-5 w-5 fill-current" /> Watch Trailer
              </a>
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
            <div className="flex flex-wrap gap-4 mb-6 text-gray-300">
              <div className="flex items-center gap-1">
                <Star className="h-5 w-5 text-yellow-500 fill-current" />
                <span className="font-bold text-white">{anime.averageScore}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-5 w-5" />
                <span>{anime.season} {anime.seasonYear}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span>{anime.episodes} Episodes ({anime.duration}m)</span>
              </div>
              <div className="bg-blue-600/20 text-blue-400 px-3 py-1 rounded-full text-sm font-semibold">
                {anime.status}
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {anime.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="bg-gray-800 text-gray-300 px-4 py-1.5 rounded-full text-sm border border-gray-700"
                >
                  {genre}
                </span>
              ))}
            </div>

            <div className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700 mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-500" /> Synopsis
              </h3>
              <div 
                className="text-gray-300 leading-relaxed prose prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Studio</p>
                <p className="font-medium">{anime.studios.nodes[0]?.name || 'N/A'}</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Native Title</p>
                <p className="font-medium">{anime.title.native}</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Format</p>
                <p className="font-medium">TV Series</p>
              </div>
              <div className="bg-gray-800/30 p-4 rounded-xl border border-gray-800">
                <p className="text-gray-500 text-xs uppercase font-bold mb-1">Source</p>
                <p className="font-medium">Manga</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        {anime.recommendations.nodes.length > 0 && (
          <section className="mt-20">
            <h2 className="text-3xl font-bold mb-8">Recommended for You</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {anime.recommendations.nodes.map((rec: any) => (
                <AnimeCard 
                  key={rec.mediaRecommendation.id} 
                  anime={rec.mediaRecommendation} 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
