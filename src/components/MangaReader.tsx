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
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock Data for demonstration
const MOCK_PAGES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  url: `https://placehold.co/800x1200/1a1a1a/white?text=Page+${i + 1}`,
}));

interface MangaReaderProps {
  mangaId: string;
  chapterId: string;
  mangaTitle: string;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export default function MangaReader({
  mangaId,
  chapterId,
  mangaTitle,
  onNextChapter,
  onPrevChapter,
  hasNext,
  hasPrev,
}: MangaReaderProps) {
  const [readingMode, setReadingMode] = useState<"vertical" | "horizontal">(
    "vertical"
  );
  const [currentPage, setCurrentPage] = useState(0);
  const [scale, setScale] = useState(1);
  const [showControls, setShowControls] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
      if (currentPage < MOCK_PAGES.length - 1) {
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
        setCurrentPage(MOCK_PAGES.length - 1);
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
            <p className="text-foreground/50 text-xs">Chapter {chapterId}</p>
          </div>
          <div className="md:hidden">
            <h1 className="text-foreground font-bold line-clamp-1">
              {mangaTitle}
            </h1>
            <p className="text-foreground/50 text-xs">Chapter {chapterId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setReadingMode(
                readingMode === "vertical" ? "horizontal" : "vertical"
              )
            }
            className="flex items-center gap-2 px-3 py-1.5 bg-foreground/10 hover:bg-foreground/20 rounded-lg text-xs font-mono text-foreground transition-colors"
          >
            {readingMode === "vertical" ? "Vertical" : "Horizontal"} Mode
          </button>
          <button className="p-2 hover:bg-foreground/10 rounded-full text-foreground">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Reader Area */}
      <div
        ref={scrollContainerRef}
        className={`flex-1 overflow-auto relative ${
          readingMode === "vertical"
            ? "flex flex-col items-center py-20"
            : "flex items-center justify-center"
        } scrollbar-hide`}
        onClick={() => {
            if (readingMode === "horizontal") {
                 // Click left side for next (RTL for manga), right for prev? 
                 // Standard web reader: Click right for next.
                 // Let's implement click zones.
            }
        }}
      >
        {readingMode === "vertical" ? (
          <div
            className="w-full max-w-3xl space-y-2 px-2"
            style={{ transform: `scale(${scale})`, transformOrigin: "top center" }}
          >
            {MOCK_PAGES.map((page) => (
              <img
                key={page.id}
                src={page.url}
                alt={`Page ${page.id + 1}`}
                className="w-full h-auto shadow-2xl"
                loading="lazy"
              />
            ))}
            
            {/* Chapter Navigation Footer */}
             <div className="flex justify-center gap-4 py-8">
                <button 
                    disabled={!hasPrev}
                    onClick={onPrevChapter}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-full text-white font-bold disabled:opacity-50"
                >
                    Previous Chapter
                </button>
                <button 
                     disabled={!hasNext}
                     onClick={onNextChapter}
                     className="px-6 py-3 bg-anime-pink hover:bg-anime-pink/80 rounded-full text-white font-bold disabled:opacity-50"
                >
                    Next Chapter
                </button>
            </div>
          </div>
        ) : (
          /* Horizontal Mode */
          <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* Click Zones */}
            <div 
                className="absolute left-0 top-0 bottom-0 w-1/3 z-10 cursor-w-resize"
                onClick={() => handlePageChange("prev")}
            />
            <div 
                className="absolute right-0 top-0 bottom-0 w-1/3 z-10 cursor-e-resize"
                onClick={() => handlePageChange("next")}
            />
            
            <img
              src={MOCK_PAGES[currentPage].url}
              alt={`Page ${currentPage + 1}`}
              className="max-h-full max-w-full object-contain shadow-2xl"
              style={{ transform: `scale(${scale})` }}
            />
          </div>
        )}
      </div>

      {/* Bottom Progress Bar */}
       <div
        className={`absolute bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md p-4 flex items-center justify-between z-50 transition-transform duration-300 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {readingMode === "horizontal" && (
             <div className="flex-1 flex items-center justify-center gap-4 text-white">
                 <button onClick={() => handlePageChange("prev")} disabled={currentPage === 0}>
                     <ChevronLeft />
                 </button>
                 <span className="font-mono text-sm">
                     Page {currentPage + 1} / {MOCK_PAGES.length}
                 </span>
                 <button onClick={() => handlePageChange("next")} disabled={currentPage === MOCK_PAGES.length - 1}>
                     <ChevronRight />
                 </button>
             </div>
        )}

        <div className="flex items-center gap-4 ml-auto">
            <button onClick={() => setScale(s => Math.max(0.5, s - 0.1))} className="text-white hover:text-anime-pink">
                <ZoomOut className="w-5 h-5" />
            </button>
             <span className="text-white text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
            <button onClick={() => setScale(s => Math.min(2, s + 0.1))} className="text-white hover:text-anime-pink">
                <ZoomIn className="w-5 h-5" />
            </button>
        </div>
      </div>
    </div>
  );
}
