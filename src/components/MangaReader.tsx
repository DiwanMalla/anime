"use client";

import { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Settings,
  Maximize,
  ZoomIn,
  ZoomOut,
  ArrowLeft,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useWatchlist } from "@/context/WatchlistContext";

interface MangaReaderProps {
  mangaId: string;
  chapterId: string;
  chapterTitle?: string;
  mangaTitle: string;
  coverImage?: string;
  pages?: { id: number; url: string }[];
  chapters?: { id: string; title: string }[];
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  onChapterSelect?: (id: string) => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function MangaReader({
  mangaId,
  chapterId,
  chapterTitle,
  mangaTitle,
  coverImage,
  pages = [],
  chapters = [],
  onNextChapter,
  onPrevChapter,
  onChapterSelect,
  hasNext,
  hasPrev,
}: MangaReaderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const [showChapterList, setShowChapterList] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [direction, setDirection] = useState<"ltr" | "rtl">("rtl");
  const [readingMode, setReadingMode] = useState<"vertical" | "horizontal">("vertical");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { updateProgress, getProgress } = useWatchlist();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        handlePageChange(direction === "rtl" ? "prev" : "next");
      } else if (e.key === "ArrowLeft") {
        handlePageChange(direction === "rtl" ? "next" : "prev");
      } else if (e.key === "Escape") {
        setShowChapterList(false);
        setShowSettings(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, direction, pages.length]);

  // Restore progress on mount/chapter change
  useEffect(() => {
    const saved = getProgress(parseInt(mangaId));
    if (saved) {
      if (saved.chapterId === chapterId && saved.page !== undefined && saved.page < pages.length) {
        setCurrentPage(saved.page);
      }
    }
  }, [chapterId, pages.length, mangaId]);

  // Save progress on page change
  useEffect(() => {
    if (pages.length > 0) {
      updateProgress(parseInt(mangaId), {
        chapterId,
        page: currentPage,
        chapterTitle: chapterTitle || `Chapter ${chapterId}`,
        title: mangaTitle,
        coverImage: coverImage,
      });
    }
  }, [currentPage, chapterId, mangaId, pages.length, chapterTitle, mangaTitle]);

  // Hide controls on idle
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const resetTimer = () => {
      setShowControls(true);
      clearTimeout(timeout);
      timeout = setTimeout(() => setShowControls(false), 3000);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("click", resetTimer);
    return () => {
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("click", resetTimer);
      clearTimeout(timeout);
    };
  }, []);

  const handlePageChange = (direction: "next" | "prev") => {
    if (direction === "next") {
      if (currentPage < pages.length - 1) {
        setCurrentPage((p) => p + 1);
      } else if (hasNext && onNextChapter) {
        onNextChapter();
        setCurrentPage(0);
      }
    } else {
      if (currentPage > 0) {
        setCurrentPage((p) => p - 1);
      } else if (hasPrev && onPrevChapter) {
        onPrevChapter();
        setCurrentPage(pages.length - 1);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col h-screen w-screen overflow-hidden">
      {/* Top Bar */}
      <div
        className={`absolute top-0 left-0 right-0 bg-background/80 backdrop-blur-md p-4 flex items-center justify-between z-50 transition-transform duration-300 border-b border-foreground/10 ${
          showControls ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="flex items-center gap-4">
          <Link
            href={`/manga/${mangaId}`}
            className="p-2 hover:bg-foreground/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-foreground" />
          </Link>
          <div className="hidden md:block">
            <h1 className="text-foreground font-bold truncate max-w-xs">
              {mangaTitle}
            </h1>
            <p className="text-foreground/50 text-xs">
              {chapterTitle || `Chapter ${chapterId}`}
            </p>
          </div>
          <div className="md:hidden">
            <h1 className="text-foreground font-bold line-clamp-1">
              {mangaTitle}
            </h1>
            <p className="text-foreground/50 text-xs">
              {chapterTitle || `Chapter ${chapterId}`}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowChapterList(!showChapterList)}
            className="p-2 hover:bg-foreground/10 rounded-full text-foreground"
            title="Chapters"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="relative">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-foreground/10 rounded-full text-foreground"
            >
              <Settings className="w-5 h-5" />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-background border border-foreground/10 rounded-xl shadow-2xl p-2 z-[70]">
                <div className="text-[10px] font-bold text-foreground/40 uppercase px-3 py-2">
                  Reading Direction
                </div>
                <button
                  onClick={() => setDirection("ltr")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    direction === "ltr"
                      ? "bg-anime-pink text-white"
                      : "text-foreground hover:bg-foreground/5"
                  }`}
                >
                  Left to Right
                </button>
                <button
                  onClick={() => setDirection("rtl")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    direction === "rtl"
                      ? "bg-anime-pink text-white"
                      : "text-foreground hover:bg-foreground/5"
                  }`}
                >
                  Right to Left (Manga)
                </button>

                <div className="text-[10px] font-bold text-foreground/40 uppercase px-3 py-2 mt-2 border-t border-foreground/5 pt-2">
                  Reading Mode
                </div>
                <button
                  onClick={() => setReadingMode("vertical")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    readingMode === "vertical"
                      ? "bg-anime-pink text-white"
                      : "text-foreground hover:bg-foreground/5"
                  }`}
                >
                  Vertical (Webtoon)
                </button>
                <button
                  onClick={() => setReadingMode("horizontal")}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                    readingMode === "horizontal"
                      ? "bg-anime-pink text-white"
                      : "text-foreground hover:bg-foreground/5"
                  }`}
                >
                  Horizontal (Page)
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Reader Area */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-auto relative flex flex-col items-center py-20 scrollbar-hide"
      >
        {/* Chapter List Sidebar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-foreground/10 z-[60] transition-transform duration-300 shadow-2xl ${
            showChapterList ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="p-4 border-b border-foreground/10 flex items-center justify-between">
            <h2 className="font-bold text-foreground">Chapters</h2>
            <button
              onClick={() => setShowChapterList(false)}
              className="p-1 hover:bg-foreground/10 rounded-full"
            >
              <X className="w-5 h-5 text-foreground" />
            </button>
          </div>
          <div className="overflow-y-auto h-[calc(100%-65px)] p-2 space-y-1">
            {chapters.length > 0 ? (
              chapters.map((ch) => (
                <button
                  key={ch.id}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    ch.id === chapterId
                      ? "bg-anime-pink text-white"
                      : "text-foreground/70 hover:bg-foreground/5"
                  }`}
                  onClick={() => {
                    if (onChapterSelect) {
                      onChapterSelect(ch.id);
                    }
                    setShowChapterList(false);
                  }}
                >
                  <div className="text-sm font-bold">{ch.title}</div>
                </button>
              ))
            ) : (
              <div className="p-4 text-center text-foreground/40 text-sm italic">
                No chapters found
              </div>
            )}
          </div>
        </div>

        <div
          className="w-full max-w-3xl space-y-2 px-2"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          {pages.length > 0 ? (
            readingMode === "vertical" ? (
              <>
                {pages.map((page) => (
                  <img
                    key={page.id}
                    src={page.url}
                    alt={`Page ${page.id + 1}`}
                    className="w-full h-auto shadow-2xl"
                    loading="lazy"
                  />
                ))}
              </>
            ) : (
              /* Horizontal Mode */
              <div className="relative w-full aspect-[2/3] md:aspect-auto md:h-[85vh] flex items-center justify-center">
                {/* Click Zones */}
                <div 
                  className={`absolute top-0 bottom-0 w-1/2 z-10 cursor-pointer`}
                  style={{ [direction === "rtl" ? "right" : "left"]: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageChange("next");
                  }}
                />
                <div 
                  className={`absolute top-0 bottom-0 w-1/2 z-10 cursor-pointer`}
                  style={{ [direction === "rtl" ? "left" : "right"]: 0 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePageChange("prev");
                  }}
                />
                
                <img
                  src={pages[currentPage].url}
                  alt={`Page ${currentPage + 1}`}
                  className="max-h-full max-w-full object-contain shadow-2xl rounded"
                  loading="eager"
                />

                {/* Page Indicator Overlay */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-mono text-white/80 pointer-events-none">
                  {currentPage + 1} / {pages.length}
                </div>
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center py-40 gap-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-anime-pink"></div>
              <p className="text-foreground/40 font-mono">Loading pages...</p>
            </div>
          )}

          {/* Chapter Navigation Footer */}
          <div className="flex justify-center gap-4 py-8">
            <button
              disabled={!hasPrev}
              onClick={onPrevChapter}
              className="px-6 py-3 bg-foreground/10 hover:bg-foreground/20 rounded-full text-foreground font-bold disabled:opacity-50 transition-colors"
            >
              Previous Chapter
            </button>
            <button
              disabled={!hasNext}
              onClick={onNextChapter}
              className="px-6 py-3 bg-anime-pink hover:bg-anime-pink/80 rounded-full text-white font-bold disabled:opacity-50 transition-colors"
            >
              Next Chapter
            </button>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md p-4 flex items-center justify-end z-50 transition-transform duration-300 border-t border-foreground/10 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
            className="text-foreground hover:text-anime-pink transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-foreground text-xs font-mono w-12 text-center">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setScale((s) => Math.min(2, s + 0.1))}
            className="text-foreground hover:text-anime-pink transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
