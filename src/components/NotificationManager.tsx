"use client";

import { useWatchlist } from "@/context/WatchlistContext";
import { fetchAniList, AIRING_SCHEDULE_QUERY } from "@/lib/anilist";
import { useEffect, useState } from "react";
import { Bell, BellRing, X } from "lucide-react";

export default function NotificationManager() {
  const { watchlist } = useWatchlist();
  const [permission, setPermission] = useState<NotificationPermission>("default");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermission(Notification.permission);
      
      // Show prompt if permission is default and we have items in watchlist
      const dismissed = localStorage.getItem("notification-prompt-dismissed");
      if (Notification.permission === "default" && watchlist.length > 0 && !dismissed) {
        setTimeout(() => setShowPrompt(true), 5000);
      }
    }
  }, [watchlist.length]);

  const requestPermission = async () => {
    if (typeof window !== "undefined" && "Notification" in window) {
      const res = await Notification.requestPermission();
      setPermission(res);
      setShowPrompt(false);
    }
  };

  const dismissPrompt = () => {
    setShowPrompt(false);
    localStorage.setItem("notification-prompt-dismissed", "true");
  };

  useEffect(() => {
    if (permission !== "granted") return;

    const checkSchedule = async () => {
      if (watchlist.length === 0) return;

      const now = Math.floor(Date.now() / 1000);
      const windowEnd = now + 3600; // Check next 1 hour

      try {
        const data = await fetchAniList(AIRING_SCHEDULE_QUERY, {
          airingAtGreater: now,
          airingAtLesser: windowEnd,
          perPage: 50,
        });

        const schedules = data?.Page?.airingSchedules || [];
        const notifiedEpisodes = JSON.parse(localStorage.getItem("notified-episodes") || "[]");

        schedules.forEach((schedule: any) => {
          const isWatched = watchlist.some((item) => item.id === schedule.media.id);
          const alreadyNotified = notifiedEpisodes.includes(schedule.id);

          if (isWatched && !alreadyNotified) {
            const timeUntil = schedule.airingAt - now;
            
            // If airing in less than 15 minutes
            if (timeUntil > 0 && timeUntil <= 900) {
              const title = schedule.media.title.english || schedule.media.title.romaji;
              
              new Notification("Anime Airing Soon! 📡", {
                body: `${title} Episode ${schedule.episode} is airing in ${Math.floor(timeUntil / 60)} minutes!`,
                icon: schedule.media.coverImage.large,
              });
              
              notifiedEpisodes.push(schedule.id);
            }
          }
        });

        // Clean up old notifications from history after 24h
        if (notifiedEpisodes.length > 100) {
            notifiedEpisodes.splice(0, notifiedEpisodes.length - 100);
        }

        localStorage.setItem("notified-episodes", JSON.stringify(notifiedEpisodes));
      } catch (err) {
        console.error("Failed to check airing schedule", err);
      }
    };

    const interval = setInterval(checkSchedule, 1000 * 60 * 5); // Check every 5 minutes
    checkSchedule();

    return () => clearInterval(interval);
  }, [permission, watchlist]);

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-24 right-4 z-[50] flex flex-col items-end gap-2 animate-in slide-in-from-right-10 duration-500">
      <div className="bg-[#1a1a1a] border border-[#00f3ff]/30 p-4 rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.15)] flex flex-col gap-3 max-w-[280px]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#00f3ff]">
            <BellRing className="h-4 w-4" />
            <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Transmission Alert</span>
          </div>
          <button onClick={dismissPrompt} className="text-white/40 hover:text-white transition-colors">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-white/80 leading-relaxed font-light">
          Would you like to receive alerts 15 minutes before your followed series air?
        </p>
        <button
          onClick={requestPermission}
          className="bg-[#00f3ff] text-black py-2 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-[#00d8e4] transition-all shadow-lg shadow-[#00f3ff]/20"
        >
          Establish Uplink
        </button>
      </div>
    </div>
  );
}
