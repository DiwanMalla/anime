"use client";

import { useState, useMemo } from "react";
import { Info, Hash, Layers, Users, Star } from "lucide-react";
import MangaChapters from "./MangaChapters";
import MangaCard from "./MangaCard";
import CommunityLayer from "./CommunityLayer";
import Link from "next/link";

interface MangaDetailsTabsProps {
  manga: any;
  title: string;
}

export default function MangaDetailsTabs({
  manga,
  title,
}: MangaDetailsTabsProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "chapters">(
    "overview"
  );

  const titleVariants = useMemo(
    () =>
      [
        manga.title.english,
        manga.title.romaji,
        manga.title.userPreferred,
        manga.title.native,
      ].filter(Boolean) as string[],
    [manga.title]
  );

  return (
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

      {/* Tabs Navigation */}
      <div className="flex gap-8 border-b border-foreground/10 mb-8">
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-4 font-mono uppercase tracking-widest text-sm transition-all relative ${
            activeTab === "overview"
              ? "text-orange-400"
              : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Overview
          {activeTab === "overview" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("chapters")}
          className={`pb-4 font-mono uppercase tracking-widest text-sm transition-all relative ${
            activeTab === "chapters"
              ? "text-orange-400"
              : "text-foreground/50 hover:text-foreground"
          }`}
        >
          Chapters
          {activeTab === "chapters" && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-400" />
          )}
        </button>
      </div>

      {activeTab === "overview" ? (
        <div className="space-y-12">
          <div className="flex flex-wrap gap-3">
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

          <div>
            <h3 className="text-xl font-mono text-foreground/50 mb-4 uppercase tracking-widest">
              Synopsis
            </h3>
            <div
              className="text-foreground/80 leading-relaxed max-w-4xl text-lg font-light"
              dangerouslySetInnerHTML={{ __html: manga.description }}
            />
          </div>

          {manga.relations?.edges?.length > 0 && (
            <div>
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
            <div>
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
      ) : (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-mono text-orange-400 uppercase tracking-widest flex items-center gap-2">
              <Hash className="h-5 w-5" /> Chapter List
            </h3>
            <div className="text-xs font-mono text-foreground/40">
              Powered by MangaDex
            </div>
          </div>
          <MangaChapters mangaId={manga.id} titles={titleVariants} />
        </div>
      )}
    </div>
  );
}
