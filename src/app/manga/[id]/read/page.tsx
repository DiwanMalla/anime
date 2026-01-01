"use client";

import MangaReader from "@/components/MangaReader";
import { fetchAniList, MANGA_DETAILS_QUERY } from "@/lib/anilist";
import {
  searchMangaDex,
  getMangaChapters,
  getChapterPages,
} from "@/lib/mangadex";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function MangaReadPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const searchParams = useSearchParams();
  const chapterIdFromUrl = searchParams.get("ch");

  const [manga, setManga] = useState<any>(null);
  const [chapters, setChapters] = useState<any[]>([]);
  const [pages, setPages] = useState<{ id: number; url: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function initReader() {
      try {
        setLoading(true);
        // 1. Get AniList Data
        const aniListData = await fetchAniList(MANGA_DETAILS_QUERY, {
          id: parseInt(id),
        });
        const aniManga = aniListData.Media;
        setManga(aniManga);

        // 2. Search MangaDex with multiple title variants
        const titleVariants = [
          aniManga.title.english,
          aniManga.title.romaji,
          aniManga.title.userPreferred,
          aniManga.title.native,
        ].filter(Boolean) as string[];

        const mdManga = await searchMangaDex(titleVariants, parseInt(id));
        if (!mdManga) {
          setError(
            "Manga not found on MangaDex. We might not have this title in our external database yet."
          );
          return;
        }

        // 3. Get Chapters
        const mdChapters = await getMangaChapters(mdManga.id);
        if (!mdChapters || mdChapters.length === 0) {
          setError(
            "No readable English chapters found on MangaDex. This manga might only be available through external official sites like MangaPlus."
          );
          return;
        }

        const formattedChapters = mdChapters
          .map((ch: any) => ({
            id: ch.id,
            title: `Chapter ${ch.attributes.chapter}${
              ch.attributes.title ? `: ${ch.attributes.title}` : ""
            }`,
            chapterNum: parseFloat(ch.attributes.chapter) || 0,
          }))
          .sort((a: any, b: any) => a.chapterNum - b.chapterNum);

        setChapters(formattedChapters);

        // 4. Get Pages for current chapter
        const currentChapterId = chapterIdFromUrl || formattedChapters[0]?.id;
        if (currentChapterId) {
          const mdPages = await getChapterPages(currentChapterId);
          if (mdPages.length === 0) {
            setError("Failed to load pages for this chapter.");
          } else {
            setPages(
              mdPages.map((url: string, index: number) => ({ id: index, url }))
            );
          }
        }
      } catch (err) {
        console.error("Error initializing reader:", err);
        setError("An unexpected error occurred while loading the reader.");
      } finally {
        setLoading(false);
      }
    }
    initReader();
  }, [id, chapterIdFromUrl]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-anime-pink"></div>
          <p className="text-foreground/60 animate-pulse font-medium">
            Connecting to MangaDex...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-foreground/5 backdrop-blur-xl border border-foreground/10 p-8 rounded-3xl text-center">
          <h2 className="text-2xl font-bold mb-4">Reader Unavailable</h2>
          <p className="text-foreground/60 mb-8 leading-relaxed">{error}</p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-anime-pink rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
            >
              Try Again
            </button>
            <button
              onClick={() => router.back()}
              className="w-full py-3 bg-foreground/10 rounded-xl text-foreground font-bold hover:bg-foreground/20 transition-colors"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!manga) return notFound();

  const currentChapterId = chapterIdFromUrl || chapters[0]?.id;
  const currentChapterIndex = chapters.findIndex(
    (ch) => ch.id === currentChapterId
  );
  const hasNext = currentChapterIndex < chapters.length - 1;
  const hasPrev = currentChapterIndex > 0;

  const handleChapterChange = (newChId: string) => {
    router.push(`/manga/${id}/read?ch=${newChId}`);
  };

  return (
    <MangaReader
      mangaId={id}
      chapterId={currentChapterId}
      chapterTitle={chapters[currentChapterIndex]?.title}
      mangaTitle={manga.title.english || manga.title.romaji}
      coverImage={manga.coverImage.large}
      pages={pages}
      chapters={chapters}
      hasNext={hasNext}
      hasPrev={hasPrev}
      onNextChapter={() =>
        hasNext && handleChapterChange(chapters[currentChapterIndex + 1].id)
      }
      onPrevChapter={() =>
        hasPrev && handleChapterChange(chapters[currentChapterIndex - 1].id)
      }
      onChapterSelect={handleChapterChange}
    />
  );
}
