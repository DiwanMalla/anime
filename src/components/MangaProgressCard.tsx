"use client";

import Link from "next/link";
import { BookOpen, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface MangaProgressCardProps {
  progress: {
    id: number;
    title?: string;
    chapterTitle?: string;
    chapterId?: string;
    coverImage?: string;
    timestamp: number;
  };
}

export default function MangaProgressCard({ progress }: MangaProgressCardProps) {
  const displayTitle = progress.title || "Unknown Manga";
  const displayChapter = progress.chapterTitle || `Chapter ${progress.chapterId}`;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative flex flex-col gap-3 group"
    >
      <Link href={`/manga/${progress.id}/read?ch=${progress.chapterId}`} className="block relative aspect-[2/3] rounded-xl overflow-hidden shadow-xl border border-white/10 transition-all duration-500 group-hover:border-orange-500/50">
        <img
          src={progress.coverImage || "https://placehold.co/400x600/1a1a1a/white?text=No+Cover"}
          alt={displayTitle}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
        
        {/* Play Icon / Overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/40 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <BookOpen className="h-6 w-6 text-white fill-current" />
            </div>
        </div>

        {/* Progress Badge */}
        <div className="absolute bottom-3 left-3 right-3">
             <div className="bg-orange-500/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-2 shadow-lg">
                <Clock className="w-3 h-3" />
                <span className="truncate">{displayChapter}</span>
             </div>
        </div>
      </Link>
      
      <div className="px-1">
        <h4 className="text-sm font-bold text-foreground line-clamp-1 group-hover:text-orange-400 transition-colors">
            {displayTitle}
        </h4>
        <p className="text-[10px] text-foreground/40 font-mono mt-1 uppercase tracking-widest">
            {new Date(progress.timestamp).toLocaleDateString()}
        </p>
      </div>
    </motion.div>
  );
}
