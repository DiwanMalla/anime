import { fetchAniList, ANIME_DETAILS_QUERY } from "@/lib/anilist";
import {
  Star,
  Calendar,
  Clock,
  Info,
  ChevronLeft,
  Users,
  Clapperboard,
  MonitorPlay,
  Layers,
  PlayCircle,
  BarChart3,
  Hash,
  ExternalLink,
} from "lucide-react";
import AnimeCard from "@/components/AnimeCard";
import { notFound } from "next/navigation";
import Link from "next/link";

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatDate(date: { year: number; month: number; day: number }) {
  if (!date.year) return "TBA";
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  return `${monthNames[date.month - 1] || "?"} ${date.day || "?"}, ${
    date.year
  }`;
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
  const startDate = anime.startDate ? formatDate(anime.startDate) : "TBA";
  const endDate = anime.endDate ? formatDate(anime.endDate) : "Ongoing";

  return (
    <main className="min-h-screen bg-[#050505] text-gray-100 pb-20 font-sans selection:bg-[#00f3ff] selection:text-black">
      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute top-24 left-4 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-[#00f3ff] transition group bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-[#00f3ff]/50"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Back to Base
            </span>
          </Link>
        </div>
        {anime.bannerImage ? (
          <img
            src={anime.bannerImage}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-[#0a0a0a]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Cover & Details */}
          <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <img
                src={anime.coverImage.extraLarge || anime.coverImage.large}
                alt={title}
                className="relative w-64 lg:w-full mx-auto rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            <div className="sci-fi-border p-6 rounded-sm space-y-6">
              <h3 className="font-mono text-[#00f3ff] text-lg border-b border-[#00f3ff]/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-4 w-4" /> Data Log
              </h3>
              <div className="space-y-4 text-sm font-mono">
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Format</span>
                  <span className="text-white">{anime.format || "TV"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Episodes</span>
                  <span className="text-white">{anime.episodes || "?"}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Duration</span>
                  <span className="text-white">
                    {anime.duration ? `${anime.duration} min` : "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Status</span>
                  <span
                    className={`uppercase ${
                      anime.status === "RELEASING"
                        ? "text-[#00f3ff] animate-pulse"
                        : "text-white"
                    }`}
                  >
                    {anime.status}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Start Date</span>
                  <span className="text-white">{startDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">End Date</span>
                  <span className="text-white">{endDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Season</span>
                  <span className="text-white capitalize">
                    {anime.season
                      ? `${anime.season.toLowerCase()} ${anime.seasonYear}`
                      : "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                  <span className="text-gray-500 uppercase">Source</span>
                  <span className="text-white capitalize">
                    {anime.source?.replace(/_/g, " ").toLowerCase() || "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 uppercase">Studio</span>
                  <span className="text-[#bc13fe]">
                    {anime.studios?.nodes[0]?.name || "?"}
                  </span>
                </div>
              </div>
            </div>

            {/* Streaming Links */}
            {anime.externalLinks?.length > 0 && (
              <div className="sci-fi-border p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-[#00f3ff] text-lg border-b border-[#00f3ff]/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <MonitorPlay className="h-4 w-4" /> Stream Source
                </h3>
                <div className="flex flex-col gap-3">
                  {anime.externalLinks.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm text-white hover:text-[#00f3ff] transition group bg-[#0a0a0a] p-4 rounded border border-white/10 hover:border-[#00f3ff]/50 hover:bg-[#00f3ff]/5"
                    >
                      <div className="flex items-center gap-3">
                        {link.icon && (
                          <img
                            src={link.icon}
                            alt=""
                            className="w-6 h-6 rounded object-contain"
                          />
                        )}
                        <span className="font-bold text-base">{link.site}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-[#00f3ff] opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Synonyms */}
            {anime.synonyms?.length > 0 && (
              <div className="sci-fi-border p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-[#00f3ff] text-lg border-b border-[#00f3ff]/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <Hash className="h-4 w-4" /> Aliases
                </h3>
                <div className="flex flex-col gap-2">
                  {anime.synonyms.map((syn: string, i: number) => (
                    <div
                      key={i}
                      className="text-xs text-gray-400 font-mono border-l-2 border-[#bc13fe]/30 pl-2 py-1"
                    >
                      {syn}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Status Distribution */}
            {anime.stats?.statusDistribution && (
              <div className="sci-fi-border p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-[#00f3ff] text-lg border-b border-[#00f3ff]/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> User Stats
                </h3>
                <div className="space-y-3">
                  {anime.stats.statusDistribution.map((stat: any) => (
                    <div key={stat.status} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono uppercase">
                        <span className="text-gray-400">
                          {stat.status.replace(/_/g, " ")}
                        </span>
                        <span className="text-white">
                          {stat.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#00f3ff] to-[#bc13fe]"
                          style={{
                            width: `${(stat.amount / anime.popularity) * 100}%`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 pt-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
              {title}
            </h1>
            {anime.title.native && (
              <h2 className="text-xl text-gray-500 font-mono mb-6 tracking-widest opacity-70">
                {anime.title.native}
              </h2>
            )}

            <div className="flex flex-wrap gap-6 mb-8 text-sm md:text-base font-medium items-center font-mono">
              <div className="flex items-center gap-2 text-[#00f3ff] bg-[#00f3ff]/10 px-3 py-1 rounded border border-[#00f3ff]/20">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{anime.averageScore}% SYNC</span>
              </div>
              <div className="flex items-center gap-2 text-[#bc13fe] bg-[#bc13fe]/10 px-3 py-1 rounded border border-[#bc13fe]/20">
                <Users className="h-4 w-4" />
                <span>{anime.popularity?.toLocaleString()} POP</span>
              </div>
              <div className="flex items-center gap-2 text-[#00f3ff] bg-[#00f3ff]/10 px-3 py-1 rounded border border-[#00f3ff]/20">
                <Star className="h-4 w-4" />
                <span>{anime.favourites?.toLocaleString()} FAV</span>
              </div>
              <span className="text-gray-400">{anime.seasonYear}</span>
              <span className="border border-gray-600 px-2 py-0.5 rounded text-xs text-gray-400 uppercase tracking-wider">
                {anime.format}
              </span>
            </div>

            {anime.nextAiringEpisode && (
              <div className="mb-8 p-4 bg-[#00f3ff]/5 border border-[#00f3ff]/30 rounded-lg flex items-center gap-4 animate-pulse">
                <Clock className="h-6 w-6 text-[#00f3ff]" />
                <div>
                  <div className="text-[#00f3ff] font-mono text-sm uppercase tracking-widest">
                    Next Transmission
                  </div>
                  <div className="text-white font-bold">
                    Episode {anime.nextAiringEpisode.episode} airing in{" "}
                    {Math.ceil(anime.nextAiringEpisode.timeUntilAiring / 86400)}{" "}
                    days
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-3 mb-10 items-center">
              {anime.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="text-xs font-mono text-[#bc13fe] border border-[#bc13fe]/30 bg-[#bc13fe]/5 px-3 py-1 rounded-full hover:bg-[#bc13fe]/20 cursor-pointer transition uppercase tracking-wider"
                >
                  {genre}
                </span>
              ))}
              {anime.tags
                ?.filter((t: any) => !t.isMediaSpoiler && t.rank >= 60)
                .slice(0, 5)
                .map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-xs font-mono text-gray-500 hover:text-white cursor-pointer transition uppercase tracking-wider"
                  >
                    #{tag.name}
                  </span>
                ))}
            </div>

            <div className="mb-12 relative">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-[#00f3ff] to-transparent opacity-50" />
              <h3 className="text-xl font-mono text-gray-400 mb-4 uppercase tracking-widest">
                Synopsis
              </h3>
              <div
                className="text-gray-300 leading-relaxed max-w-4xl text-lg font-light"
                dangerouslySetInnerHTML={{ __html: anime.description }}
              />
            </div>

            {/* Relations Section */}
            {anime.relations?.edges?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-[#00f3ff] mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Layers className="h-5 w-5" /> Related Seasons & Spin-offs
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {anime.relations.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/anime/${edge.node.id}`}
                      className="group relative aspect-[2/3] rounded overflow-hidden border border-white/10 hover:border-[#00f3ff]/50 transition-all"
                    >
                      <img
                        src={edge.node.coverImage.large}
                        alt={edge.node.title.userPreferred}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-2 w-full">
                        <div className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-tighter mb-1">
                          {edge.relationType.replace(/_/g, " ")}
                        </div>
                        <div className="text-xs font-bold text-white truncate">
                          {edge.node.title.userPreferred}
                        </div>
                        <div className="text-[10px] text-gray-400 uppercase">
                          {edge.node.format} • {edge.node.status}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Episode List */}
            {anime.streamingEpisodes?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-[#bc13fe] mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <PlayCircle className="h-5 w-5" /> Episodes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
                  {anime.streamingEpisodes.map((ep: any, i: number) => (
                    <a
                      key={i}
                      href={ep.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex gap-4 bg-[#0a0a0a] border border-gray-800 p-2 rounded hover:border-[#bc13fe]/50 transition-all group"
                    >
                      <div className="relative w-32 h-20 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={ep.thumbnail}
                          alt={ep.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <PlayCircle className="h-8 w-8 text-white" />
                        </div>
                      </div>
                      <div className="flex flex-col justify-center min-w-0">
                        <div className="text-sm font-bold text-white truncate group-hover:text-[#bc13fe] transition-colors">
                          {ep.title}
                        </div>
                        <div className="text-xs text-gray-500 font-mono uppercase mt-1">
                          {ep.site}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Trailer Section */}
            {anime.trailer?.site === "youtube" && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-[#00f3ff] mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Clapperboard className="h-5 w-5" /> Visual Feed
                </h3>
                <div className="aspect-video w-full max-w-4xl bg-black rounded-lg overflow-hidden border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] relative group">
                  <div className="absolute inset-0 border border-[#00f3ff]/20 pointer-events-none z-10 rounded-lg" />
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
                <h3 className="text-xl font-mono text-[#bc13fe] mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Users className="h-5 w-5" /> Characters
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl">
                  {anime.characters.edges.map((char: any) => (
                    <div
                      key={char.node.id}
                      className="flex bg-[#0a0a0a] border border-gray-800 hover:border-[#bc13fe]/50 transition-colors rounded overflow-hidden group"
                    >
                      <img
                        src={char.node.image.medium}
                        alt={char.node.name.full}
                        className="w-16 h-24 object-cover transition-all duration-500"
                      />
                      <div className="p-3 flex flex-col justify-center text-sm">
                        <div className="font-medium text-white group-hover:text-[#bc13fe] transition-colors">
                          {char.node.name.full}
                        </div>
                        <div className="text-gray-500 text-xs font-mono uppercase mt-1">
                          {char.role}
                        </div>
                        {char.voiceActors?.[0] && (
                          <div className="mt-2 text-xs text-gray-600 flex items-center gap-1">
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            {char.voiceActors[0].name.full}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Staff Section */}
            {anime.staff?.edges?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-white mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Users className="h-5 w-5" /> Core System Architects
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl">
                  {anime.staff.edges.map((staff: any, index: number) => (
                    <div
                      key={`${staff.node.id}-${staff.role}-${index}`}
                      className="flex items-center gap-3 bg-[#0a0a0a] border border-gray-800 p-3 rounded hover:border-white/30 transition-colors"
                    >
                      <img
                        src={staff.node.image.medium}
                        alt={staff.node.name.full}
                        className="w-12 h-12 rounded-full object-cover transition-all"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-white">
                          {staff.node.name.full}
                        </span>
                        <span className="text-xs text-gray-500 font-mono uppercase">
                          {staff.role}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recommendations */}
            {anime.recommendations?.nodes?.length > 0 && (
              <div>
                <h3 className="text-2xl font-mono text-white mb-8 uppercase tracking-widest border-l-4 border-[#00f3ff] pl-4">
                  Recommendations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
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
