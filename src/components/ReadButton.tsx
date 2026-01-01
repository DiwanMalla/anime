"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import { BookOpen } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface ReadButtonProps {
  mangaId: number;
}

export default function ReadButton({ mangaId }: ReadButtonProps) {
  const { getProgress } = useWatchlist();
  const [lastProgress, setLastProgress] = useState<any>(null);

  useEffect(() => {
    setLastProgress(getProgress(mangaId));
  }, [mangaId, getProgress]);

  const href = lastProgress?.chapterId 
    ? `/manga/${mangaId}/read?ch=${lastProgress.chapterId}`
    : `/manga/${mangaId}/read`;

  return (
    <Link
      href={href}
      className="flex items-center justify-center gap-2 bg-orange-500 text-white w-full py-4 rounded-lg font-bold hover:bg-orange-600 transition text-lg mb-2 shadow-lg shadow-orange-500/20"
    >
      <BookOpen className="h-5 w-5 fill-current" />
      {lastProgress ? "Continue Reading" : "Read Now"}
    </Link>
  );
}
