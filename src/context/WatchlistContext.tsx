"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface Anime {
  id: number;
  title: {
    romaji: string;
    english: string | null;
  };
  coverImage: {
    large: string;
    color?: string;
  };
  averageScore?: number;
  format?: string;
}

interface Progress {
  id: number;
  chapterId?: string;
  page?: number;
  episode?: number;
  timestamp: number;
  title?: string;
  chapterTitle?: string;
  coverImage?: string;
}

interface WatchlistContextType {
  watchlist: Anime[];
  progress: Record<number, Progress>;
  addToWatchlist: (anime: Anime) => void;
  removeFromWatchlist: (id: number) => void;
  isInWatchlist: (id: number) => boolean;
  updateProgress: (id: number, progress: Partial<Progress>) => void;
  getProgress: (id: number) => Progress | undefined;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(
  undefined
);

export function WatchlistProvider({ children }: { children: React.ReactNode }) {
  const [watchlist, setWatchlist] = useState<Anime[]>([]);
  const [progress, setProgress] = useState<Record<number, Progress>>({});

  useEffect(() => {
    const savedWatchlist = localStorage.getItem("watchlist");
    if (savedWatchlist) {
      try {
        setWatchlist(JSON.parse(savedWatchlist));
      } catch (e) {
        console.error("Failed to parse watchlist from localStorage", e);
      }
    }
    const savedProgress = localStorage.getItem("watching-progress");
    if (savedProgress) {
        try {
            setProgress(JSON.parse(savedProgress));
        } catch (e) {
            console.error("Failed to parse progress from localStorage", e);
        }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem("watching-progress", JSON.stringify(progress));
  }, [progress]);

  const addToWatchlist = (anime: Anime) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.id === anime.id)) return prev;
      return [...prev, anime];
    });
  };

  const removeFromWatchlist = (id: number) => {
    setWatchlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWatchlist = (id: number) => {
    return watchlist.some((item) => item.id === id);
  };

  const updateProgress = (id: number, newProgress: Partial<Progress>) => {
    setProgress((prev) => ({
      ...prev,
      [id]: {
        ...(prev[id] || { id, timestamp: Date.now() }),
        ...newProgress,
        timestamp: Date.now(),
      },
    }));
  };

  const getProgress = (id: number) => {
    return progress[id];
  };

  return (
    <WatchlistContext.Provider
      value={{ 
        watchlist, 
        progress, 
        addToWatchlist, 
        removeFromWatchlist, 
        isInWatchlist,
        updateProgress,
        getProgress
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
