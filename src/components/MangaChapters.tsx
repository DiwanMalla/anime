"use client";

import { useEffect, useState } from "react";
import { searchMangaDex, getMangaChapters } from "@/lib/mangadex";
import { BookOpen, Hash, Clock, ExternalLink } from "lucide-react";
import Link from "next/link";

interface MangaChaptersProps {
  mangaId: number;
  titles: string[];
}

export default function MangaChapters({ mangaId, titles }: MangaChaptersProps) {
  const [chapters, setChapters] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchChapters() {
      try {
        setLoading(true);
        const mdManga = await searchMangaDex(titles, mangaId);
        if (!mdManga) {
          setError("Manga not found on MangaDex");
          return;
        }

        const mdChapters = await getMangaChapters(mdManga.id);

        if (!mdChapters || mdChapters.length === 0) {
          setChapters([]);
          return;
        }

        const formattedChapters = mdChapters
          .map((ch: any) => {
            const group = ch.relationships.find(
              (r: any) => r.type === "scanlation_group"
            );
            return {
              id: ch.id,
              chapter: ch.attributes.chapter,
              title: ch.attributes.title,
              pages: ch.attributes.pages,
              publishAt: ch.attributes.publishAt,
              externalUrl: ch.attributes.externalUrl,
              groupName: group?.attributes?.name || "Unknown Group",
            };
          })
          .filter((ch: any) => {
            const hasContent = ch.pages > 0 || ch.externalUrl;
            return ch.chapter !== null && hasContent;
          })
          .sort((a: any, b: any) => {
            const aNum = parseFloat(a.chapter);
            const bNum = parseFloat(b.chapter);
            if (isNaN(aNum) || isNaN(bNum)) return 0;
            if (bNum !== aNum) return bNum - aNum;
            // If same chapter number, sort by group name
            return a.groupName.localeCompare(b.groupName);
          });

        setChapters(formattedChapters);
      } catch (err) {
        console.error("Error fetching chapters:", err);
        setError("Failed to load chapters");
      } finally {
        setLoading(false);
      }
    }

    fetchChapters();
  }, [mangaId, titles]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
        <p className="text-foreground/50 font-mono animate-pulse">
          Fetching chapters from MangaDex...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-orange-500/10 border border-orange-500/20 p-8 rounded-2xl text-center">
        <p className="text-orange-400 font-mono mb-2">{error}</p>
        <p className="text-foreground/50 text-sm">
          This manga might not be available on MangaDex or has no English
          chapters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {chapters.length > 0 ? (
        chapters.map((ch) => {
          const isExternal = ch.pages === 0 && ch.externalUrl;

          return isExternal ? (
            <a
              key={ch.id}
              href={ch.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10 rounded-xl hover:border-blue-500/50 hover:bg-blue-500/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground group-hover:text-blue-400 transition-colors">
                    Chapter {ch.chapter}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] uppercase tracking-widest text-blue-400/60 font-mono">
                      External Link
                    </div>
                    <span className="text-[10px] text-foreground/30 font-mono">
                      •
                    </span>
                    <div className="text-[10px] text-foreground/40 font-mono truncate max-w-[100px]">
                      {ch.groupName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-foreground/40">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(ch.publishAt).toLocaleDateString()}
                </div>
              </div>
            </a>
          ) : (
            <Link
              key={ch.id}
              href={`/manga/${mangaId}/read?ch=${ch.id}`}
              className="group flex items-center justify-between p-4 bg-foreground/5 border border-foreground/10 rounded-xl hover:border-orange-500/50 hover:bg-orange-500/5 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-foreground group-hover:text-orange-400 transition-colors">
                    Chapter {ch.chapter}
                  </div>
                  <div className="flex items-center gap-2">
                    {ch.title && (
                      <div className="text-xs text-foreground/50 truncate max-w-[150px]">
                        {ch.title}
                      </div>
                    )}
                    {ch.title && (
                      <span className="text-[10px] text-foreground/30 font-mono">
                        •
                      </span>
                    )}
                    <div className="text-[10px] text-foreground/40 font-mono truncate max-w-[100px]">
                      {ch.groupName}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-xs font-mono text-foreground/40">
                <div className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3" />
                  {ch.pages}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(ch.publishAt).toLocaleDateString()}
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <div className="col-span-full py-20 text-center bg-foreground/5 border border-dashed border-foreground/10 rounded-2xl">
          <p className="text-foreground/40 font-mono">
            No readable chapters found for this title.
          </p>
        </div>
      )}
    </div>
  );
}
