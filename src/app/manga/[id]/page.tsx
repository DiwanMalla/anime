import { fetchAniList, MANGA_DETAILS_QUERY } from "@/lib/anilist";
import {
  Star,
  Calendar,
  BookOpen,
  Info,
  ChevronLeft,
  Users,
  Layers,
  Hash,
  ExternalLink,
} from "lucide-react";
import MangaCard from "@/components/MangaCard";
import { notFound } from "next/navigation";
import Link from "next/link";
import WatchlistButton from "@/components/WatchlistButton";
import CommunityLayer from "@/components/CommunityLayer";

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

export default async function MangaDetailsPage({ params }: PageProps) {
  const { id } = await params;
  let manga;

  try {
    const data = await fetchAniList(MANGA_DETAILS_QUERY, { id: parseInt(id) });
    manga = data.Media;
  } catch (error) {
    console.error("Error fetching manga details:", error);
    return notFound();
  }

  if (!manga) return notFound();

  const title = manga.title.english || manga.title.romaji;
  const startDate = manga.startDate ? formatDate(manga.startDate) : "TBA";
  const endDate = manga.endDate ? formatDate(manga.endDate) : "Ongoing";

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 font-sans selection:bg-orange-500 selection:text-black">
      <div className="relative h-[50vh] md:h-[60vh] w-full overflow-hidden">
        <div className="absolute top-24 left-4 z-20">
          <Link
            href="/manga"
            className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition group bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 hover:border-orange-500/50"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-mono text-sm uppercase tracking-wider">
              Back to Manga
            </span>
          </Link>
        </div>
        {manga.bannerImage ? (
          <img
            src={manga.bannerImage}
            alt={title}
            className="w-full h-full object-cover opacity-60"
          />
        ) : (
          <div className="w-full h-full bg-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="max-w-[1800px] mx-auto px-4 md:px-12 -mt-48 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="w-full lg:w-[350px] flex-shrink-0 flex flex-col gap-6">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
              <img
                src={manga.coverImage.extraLarge || manga.coverImage.large}
                alt={title}
                className="relative w-64 lg:w-full mx-auto rounded-lg shadow-2xl border border-white/10"
              />
            </div>

            <Link
                href={`/manga/${manga.id}/read`}
                className="flex items-center justify-center gap-2 bg-white text-black w-full py-4 rounded-lg font-bold hover:bg-gray-200 transition text-lg mb-2"
              >
                <BookOpen className="h-5 w-5 fill-current" /> Read Now
            </Link>

            <WatchlistButton
              anime={manga}
              className="w-full py-4 text-lg border-orange-500/30 hover:border-orange-500/50"
            />

            <div className="anime-panel p-6 rounded-xl border border-foreground/5 space-y-6">
              <h3 className="font-mono text-orange-400 text-lg border-b border-orange-500/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                <Info className="h-4 w-4" /> Manga Info
              </h3>
              <div className="space-y-4 text-sm font-mono">
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Format</span>
                  <span className="text-foreground">{manga.format}</span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Chapters</span>
                  <span className="text-foreground">
                    {manga.chapters || "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Volumes</span>
                  <span className="text-foreground">
                    {manga.volumes || "?"}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">Status</span>
                  <span
                    className={`uppercase ${
                      manga.status === "RELEASING"
                        ? "text-orange-400"
                        : "text-foreground"
                    }`}
                  >
                    {manga.status}
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-foreground/5 pb-2">
                  <span className="text-foreground/50 uppercase">
                    Start Date
                  </span>
                  <span className="text-foreground">{startDate}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/50 uppercase">End Date</span>
                  <span className="text-foreground">{endDate}</span>
                </div>
              </div>
            </div>
            {/* External Links */}
            {manga.externalLinks?.length > 0 && (
              <div className="anime-panel border border-foreground/10 p-6 rounded-lg space-y-4">
                <h3 className="font-mono text-orange-400 text-lg border-b border-orange-400/20 pb-2 uppercase tracking-widest flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" /> External Links
                </h3>
                <div className="flex flex-wrap gap-2">
                  {manga.externalLinks.map((link: any) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-1.5 bg-foreground/5 border border-foreground/10 rounded hover:bg-foreground/10 hover:border-orange-500/50 transition-all text-xs font-mono"
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

          <div className="flex-1 pt-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-2 text-foreground leading-tight">
              {title}
            </h1>
            {manga.title.native && (
              <h2 className="text-xl text-foreground/50 font-mono mb-6 tracking-widest opacity-70">
                {manga.title.native}
              </h2>
            )}

            <div className="flex flex-wrap gap-6 mb-8 text-sm font-mono items-center">
              <div className="flex items-center gap-2 text-orange-400 bg-orange-400/10 px-3 py-1 rounded border border-orange-400/20">
                <Star className="h-4 w-4 fill-current" />
                <span className="font-bold">{manga.averageScore}% SCORE</span>
              </div>
              <div className="flex items-center gap-2 text-foreground/50">
                <Users className="h-4 w-4" />
                <span>{manga.popularity?.toLocaleString()} POP</span>
              </div>
              <span className="text-foreground/50">{manga.startDate.year}</span>
            </div>

            <div className="flex flex-wrap gap-3 mb-10">
              {manga.genres.map((genre: string) => (
                <span
                  key={genre}
                  className="text-xs font-mono text-orange-400 border border-orange-400/30 bg-orange-400/5 px-3 py-1 rounded-full uppercase tracking-wider"
                >
                  {genre}
                </span>
              ))}{" "}
              {manga.tags
                ?.filter((t: any) => !t.isMediaSpoiler && t.rank >= 60)
                .slice(0, 5)
                .map((tag: any) => (
                  <span
                    key={tag.id}
                    className="text-xs font-mono text-foreground/50 hover:text-foreground cursor-pointer transition uppercase tracking-wider"
                  >
                    #{tag.name}
                  </span>
                ))}{" "}
            </div>

            <div className="mb-12">
              <h3 className="text-xl font-mono text-foreground/50 mb-4 uppercase tracking-widest">
                Synopsis
              </h3>
              <div
                className="text-foreground/80 leading-relaxed max-w-4xl text-lg font-light"
                dangerouslySetInnerHTML={{ __html: manga.description }}
              />
            </div>

            {manga.relations?.edges?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-orange-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Layers className="h-5 w-5" /> Relations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {manga.relations.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/${edge.node.type.toLowerCase()}/${edge.node.id}`}
                      className="group relative aspect-[2/3] rounded overflow-hidden border border-foreground/10 hover:border-orange-500/50 transition-all"
                    >
                      <img
                        src={edge.node.coverImage.large}
                        alt={edge.node.title.userPreferred}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-80" />
                      <div className="absolute bottom-0 left-0 p-2 w-full">
                        <div className="text-[10px] font-mono text-orange-400 uppercase tracking-tighter mb-1">
                          {edge.relationType.replace(/_/g, " ")}
                        </div>
                        <div className="text-xs font-bold text-foreground truncate">
                          {edge.node.title.userPreferred}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {manga.characters?.edges?.length > 0 && (
              <div className="mb-12">
                <h3 className="text-xl font-mono text-orange-400 mb-6 flex items-center gap-2 uppercase tracking-widest">
                  <Users className="h-5 w-5" /> Characters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {manga.characters.edges.map((char: any) => (
                    <Link
                      key={char.node.id}
                      href={`/character/${char.node.id}`}
                      className="group"
                    >
                      <div className="aspect-[3/4] rounded-lg overflow-hidden border border-foreground/10 mb-2 group-hover:border-orange-500/50 transition-colors">
                        <img
                          src={char.node.image.large}
                          alt={char.node.name.full}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <div className="text-xs font-bold text-foreground truncate group-hover:text-orange-400 transition-colors">
                        {char.node.name.full}
                      </div>
                      <div className="text-[10px] text-foreground/50 uppercase font-mono">
                        {char.role}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Community Section */}
            <CommunityLayer mediaId={manga.id} mediaTitle={title} />
            
            {manga.recommendations?.nodes?.length > 0 && (
              <div>
                <h3 className="text-xl font-mono text-foreground mb-6 uppercase tracking-widest">
                  Recommendations
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {manga.recommendations.nodes.map((rec: any) => (
                    <MangaCard
                      key={rec.mediaRecommendation.id}
                      manga={rec.mediaRecommendation}
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
