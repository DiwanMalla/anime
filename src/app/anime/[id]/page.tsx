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
  Plus,
  Check,
} from "lucide-react";
import AnimeCard from "@/components/AnimeCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";
import CommunityLayer from "@/components/CommunityLayer";
import DetailTabs from "@/components/DetailTabs";
import TrailerButton from "@/components/TrailerButton";
import WatchNowButton from "@/components/WatchNowButton";
import AdBanner from "@/components/AdBanner";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  try {
    const data = await fetchAniList(ANIME_DETAILS_QUERY, { id: parseInt(id) });
    const anime = data.Media;
    if (!anime) return { title: "Anime Not Found" };

    const title = anime.title.english || anime.title.romaji;
    const description = anime.description?.replace(/<[^>]*>?/gm, "").slice(0, 160) || `Watch ${title} on AniVerse.`;

    return {
      title: `${title} - Watch on AniVerse`,
      description,
      openGraph: {
        title: `${title} - Watch on AniVerse`,
        description,
        images: [anime.bannerImage || anime.coverImage.extraLarge || anime.coverImage.large],
        type: "video.tv_show",
      },
      twitter: {
        card: "summary_large_image",
        title: `${title} - Watch on AniVerse`,
        description,
        images: [anime.coverImage.extraLarge || anime.coverImage.large],
      },
    };
  } catch (error) {
    return { title: "AniVerse" };
  }
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TVSeries",
    "name": title,
    "description": anime.description?.replace(/<[^>]*>?/gm, ""),
    "image": anime.coverImage.extraLarge || anime.coverImage.large,
    "genre": anime.genres,
    "startDate": anime.startDate ? `${anime.startDate.year}-${anime.startDate.month}-${anime.startDate.day}` : undefined,
    "numberOfEpisodes": anime.episodes,
    "author": {
      "@type": "Organization",
      "name": anime.studios?.nodes[0]?.name
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": anime.averageScore,
      "bestRating": "100",
      "ratingCount": anime.popularity
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 font-sans selection:bg-[#00f3ff] selection:text-black">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Banner */}
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute top-20 md:top-24 left-4 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-white/80 hover:text-[#00f3ff] transition group bg-black/50 backdrop-blur-sm px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-white/10 hover:border-[#00f3ff]/50"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-xs md:text-sm uppercase tracking-wider">
              Back
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
          <div className="w-full h-full bg-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
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

            <WatchlistButton anime={anime} className="w-full py-4 text-lg" />
            
            <div className="flex flex-col gap-3">
              <WatchNowButton streamingEpisodes={anime.streamingEpisodes} />
              <TrailerButton 
                trailerId={anime.trailer?.id} 
                title={title} 
              />
            </div>

            <div className="anime-panel p-6 rounded-sm space-y-6">
              <h3 className="font-mono text-anime-blue text-lg border-b border-anime-blue/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-4 w-4" /> Data Log
              </h3>
              <div className="space-y-4 text-sm font-mono">
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Format</span>
                  <span className="text-foreground">
                    {anime.format || "TV"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Episodes</span>
                  <span className="text-foreground">
                    {anime.episodes || "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Duration</span>
                  <span className="text-foreground">
                    {anime.duration ? `${anime.duration} min` : "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Status</span>
                  <span
                    className={`uppercase ${
                      anime.status === "RELEASING"
                        ? "text-anime-blue animate-pulse"
                        : "text-foreground"
                    }`}
                  >
                    {anime.status}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">
                    Start Date
                  </span>
                  <span className="text-foreground">{startDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">End Date</span>
                  <span className="text-foreground">{endDate}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Season</span>
                  <span className="text-foreground capitalize">
                    {anime.season
                      ? `${anime.season.toLowerCase()} ${anime.seasonYear}`
                      : "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Source</span>
                  <span className="text-foreground capitalize">
                    {anime.source?.replace(/_/g, " ").toLowerCase() || "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/50 uppercase">Studio</span>
                  <span className="text-anime-purple">
                    {anime.studios?.nodes[0]?.name || "?"}
                  </span>
                </div>
              </div>
            </div>

            {/* Streaming Links */}
            {anime.externalLinks?.length > 0 && (
              <div className="anime-panel p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-anime-blue text-lg border-b border-anime-blue/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <MonitorPlay className="h-4 w-4" /> Stream Source
                </h3>
                <div className="flex flex-col gap-3">
                  {anime.externalLinks.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between gap-3 text-sm text-foreground hover:text-anime-blue transition group bg-anime-dark/50 p-4 rounded border border-foreground/10 hover:border-anime-blue/50 hover:bg-anime-blue/5"
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
              <div className="anime-panel p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-anime-blue text-lg border-b border-anime-blue/20 pb-2 uppercase tracking-widest flex items-center gap-2">
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
              <div className="anime-panel p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-anime-blue text-lg border-b border-anime-blue/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" /> User Stats
                </h3>
                <div className="space-y-3">
                  {anime.stats.statusDistribution.map((stat: any) => (
                    <div key={stat.status} className="space-y-1">
                      <div className="flex justify-between text-[10px] font-mono uppercase">
                        <span className="text-foreground/40">
                          {stat.status.replace(/_/g, " ")}
                        </span>
                        <span className="text-foreground">
                          {stat.amount.toLocaleString()}
                        </span>
                      </div>
                      <div className="h-1 w-full bg-foreground/5 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-anime-blue to-anime-purple"
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
            {/* External Links */}
            {anime.externalLinks?.length > 0 && (
              <div className="anime-panel p-6 rounded-sm space-y-4">
                <h3 className="font-mono text-anime-blue text-lg border-b border-anime-blue/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" /> External Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {anime.externalLinks.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded hover:bg-foreground/10 hover:border-anime-blue/50 transition-all text-xs font-mono"
                      style={{ color: link.color || "inherit" }}
                    >
                      {link.icon && (
                        <img src={link.icon} alt="" className="w-4 h-4" />
                      )}
                      {link.site}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Content */}
          <div className="flex-1 pt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-2 text-foreground leading-tight">
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
              <div className="mb-8 p-4 bg-anime-blue/5 border border-anime-blue/30 rounded-lg flex items-center gap-4 animate-pulse">
                <Clock className="h-6 w-6 text-anime-blue" />
                <div>
                  <div className="text-anime-blue font-mono text-sm uppercase tracking-widest">
                    Next Transmission
                  </div>
                  <div className="text-foreground font-bold">
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

            <DetailTabs
              overview={
                <div className="space-y-12">
                  <div className="relative">
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-anime-blue to-transparent opacity-50" />
                    <h3 className="text-xl font-mono text-foreground/40 mb-4 uppercase tracking-widest">
                      Synopsis Overview
                    </h3>
                    <div
                      className="text-foreground/80 leading-relaxed max-w-4xl text-lg font-light"
                      dangerouslySetInnerHTML={{ __html: anime.description }}
                    />
                  </div>

                  {/* Trailer */}
                  {anime.trailer?.site === "youtube" && (
                    <div className="mt-8">
                      <h3 className="text-xl font-mono text-[#00f3ff] mb-6 flex items-center gap-2 uppercase tracking-widest">
                        <Clapperboard className="h-5 w-5" /> Visual Feed (Trailer)
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
                </div>
              }
              episodes={
                <div className="space-y-8">
                  {anime.streamingEpisodes?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl">
                      {anime.streamingEpisodes.map((ep: any, i: number) => (
                        <a
                          key={i}
                          href={ep.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex gap-4 bg-anime-dark/50 border border-foreground/10 p-2 rounded hover:border-anime-purple/50 transition-all group"
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
                            <div className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[10px] font-mono text-white">
                              {ep.site}
                            </div>
                          </div>
                          <div className="flex flex-col justify-center min-w-0">
                            <div className="text-sm font-bold text-foreground truncate group-hover:text-anime-purple transition-colors">
                              {ep.title}
                            </div>
                            <div className="text-[10px] text-foreground/40 font-mono uppercase mt-1">
                              Streaming Source Available
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="p-12 text-center text-foreground/40 font-mono uppercase tracking-widest border border-dashed border-white/10 rounded max-w-4xl">
                      No streaming sources found on AniList
                    </div>
                  )}

                  {/* If streaming episodes < total episodes, show a hint */}
                  {anime.episodes > (anime.streamingEpisodes?.length || 0) && (
                    <div className="bg-white/5 border border-white/10 p-4 rounded-lg flex items-center gap-4 max-w-4xl">
                      <div className="w-2 h-2 rounded-full bg-anime-blue animate-pulse" />
                      <p className="text-xs font-mono text-foreground/60 uppercase tracking-wider">
                        Total Transmission: {anime.episodes} Episodes. Some metadata might be restricted by source.
                      </p>
                    </div>
                  )}
                </div>
              }
              cast={
                <div className="space-y-12">
                  {anime.characters?.edges?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-mono text-anime-purple mb-6 flex items-center gap-2 uppercase tracking-widest">
                        <Users className="h-5 w-5" /> Characters & Voice Actors
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 max-w-4xl">
                        {anime.characters.edges.map((char: any) => (
                          <div
                            key={char.node.id}
                            className="flex justify-between bg-anime-dark/50 border border-foreground/10 rounded hover:border-anime-purple/50 transition-colors p-2 h-24"
                          >
                            <Link href={`/character/${char.node.id}`} className="flex gap-3 h-full group/char">
                              <img
                                src={char.node.image.large || char.node.image.medium}
                                alt={char.node.name.full}
                                className="w-16 h-full object-cover rounded group-hover/char:opacity-80 transition-opacity"
                              />
                              <div className="flex flex-col justify-center">
                                <div className="text-sm font-bold text-foreground line-clamp-1 leading-tight group-hover/char:text-anime-purple transition-colors">
                                  {char.node.name.full}
                                </div>
                                <div className="text-xs text-foreground/50 font-mono uppercase mt-1">
                                  {char.role}
                                </div>
                              </div>
                            </Link>

                            {char.voiceActors?.[0] && (
                              <Link href={`/staff/${char.voiceActors[0].id}`} className="flex gap-3 h-full text-right group/staff">
                                <div className="flex flex-col justify-center items-end text-right">
                                  <div className="text-sm font-bold text-foreground line-clamp-1 leading-tight group-hover/staff:text-anime-purple transition-colors">
                                    {char.voiceActors[0].name.full}
                                  </div>
                                  <div className="text-[10px] text-foreground/50 font-mono uppercase mt-1">
                                    Japanese
                                  </div>
                                </div>
                                <img
                                  src={char.voiceActors[0].image.large || char.voiceActors[0].image.medium}
                                  alt={char.voiceActors[0].name.full}
                                  className="w-16 h-full object-cover rounded group-hover/staff:opacity-80 transition-opacity"
                                />
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {anime.staff?.edges?.length > 0 && (
                    <div>
                      <h3 className="text-xl font-mono text-foreground mb-6 flex items-center gap-2 uppercase tracking-widest">
                        <Users className="h-5 w-5" /> Core Staff
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 max-w-4xl">
                        {anime.staff.edges.map((staff: any, index: number) => (
                          <Link
                            key={`${staff.node.id}-${staff.role}-${index}`}
                            href={`/staff/${staff.node.id}`}
                            className="flex items-center gap-4 bg-anime-dark/50 border border-foreground/10 p-3 rounded hover:border-anime-purple/30 transition-colors h-20 group"
                          >
                            <img
                              src={staff.node.image.large || staff.node.image.medium}
                              alt={staff.node.name.full}
                              className="w-12 h-full object-cover rounded group-hover:opacity-80 transition-opacity"
                            />
                            <div className="flex flex-col justify-center min-w-0">
                              <div className="text-xs font-bold text-foreground truncate group-hover:text-anime-purple transition-colors">
                                {staff.node.name.full}
                              </div>
                              <div className="text-[10px] text-anime-purple font-mono uppercase mt-1 truncate">
                                {staff.role}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              }
              related={
                anime.relations?.edges?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {anime.relations.edges.map((edge: any) => (
                      <Link
                        key={edge.node.id}
                        href={`/anime/${edge.node.id}`}
                        className="group relative aspect-[2/3] rounded overflow-hidden border border-foreground/10 hover:border-anime-blue/50 transition-all"
                      >
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.userPreferred}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                        <div className="absolute bottom-0 left-0 p-2 w-full">
                          <div className="text-[10px] font-mono text-anime-blue uppercase tracking-tighter mb-1">
                            {edge.relationType.replace(/_/g, " ")}
                          </div>
                          <div className="text-xs font-bold text-white truncate">
                            {edge.node.title.userPreferred}
                          </div>
                          <div className="text-[10px] text-gray-300 uppercase">
                            {edge.node.format} • {edge.node.status}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-foreground/40 font-mono uppercase tracking-widest border border-dashed border-white/10 rounded">
                    No related entries found
                  </div>
                )
              }
              recommended={
                anime.recommendations?.nodes?.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {anime.recommendations.nodes.map((rec: any) => (
                      <AnimeCard
                        key={rec.mediaRecommendation.id}
                        anime={rec.mediaRecommendation}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center text-foreground/40 font-mono uppercase tracking-widest border border-dashed border-white/10 rounded">
                    No recommendations available
                  </div>
                )
              }
            />

            <AdBanner dataAdSlot="1122334455" />

            {/* Community Section (Discuss) - Now below the tabs */}
            <div className="mt-16 pt-16 border-t border-white/10">
              <CommunityLayer mediaId={anime.id} mediaTitle={title} />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
