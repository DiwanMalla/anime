"use client";

import { useState, useEffect } from "react";
import { fetchAniList, AIRING_SCHEDULE_QUERY } from "@/lib/anilist";
import AnimeCard from "@/components/AnimeCard";
import { Loader2, Calendar, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Generate the next 7 days
  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    date.setHours(0, 0, 0, 0);
    return date;
  });

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const startOfDay = new Date(selectedDate);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(selectedDate);
        endOfDay.setHours(23, 59, 59, 999);

        const data = await fetchAniList(AIRING_SCHEDULE_QUERY, {
          page: 1,
          perPage: 50,
          airingAtGreater: Math.floor(startOfDay.getTime() / 1000),
          airingAtLesser: Math.floor(endOfDay.getTime() / 1000),
        });

        setSchedule(data.Page.airingSchedules);
      } catch (error) {
        console.error("Error fetching schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-[#0a0014] text-white pt-24 pb-20 px-4 md:px-12">
      <div className="max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 relative z-10">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Weekly Schedule
            </h1>
            <p className="text-gray-400 text-lg max-w-xl">
              Don't miss the latest episodes airing this week.
            </p>
          </div>
          <div className="flex items-center gap-2 text-white bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-sm font-medium">
            <Clock className="h-4 w-4 text-[#bc13fe]" />
            <span>{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
          </div>
        </div>

        {/* Date Selector */}
        <div className="sticky top-20 z-40 bg-[#0a0014]/80 backdrop-blur-xl border-y border-white/5 -mx-4 md:-mx-12 px-4 md:px-12 py-4 mb-8">
          <div className="max-w-[1800px] mx-auto overflow-x-auto no-scrollbar">
            <div className="flex gap-3 min-w-max">
            {weekDates.map((date) => {
              const isSelected =
                date.toDateString() === selectedDate.toDateString();
              const isToday =
                date.toDateString() === new Date().toDateString();

              return (
                <button
                  key={date.toISOString()}
                  onClick={() => setSelectedDate(date)}
                  className={`flex flex-col items-center justify-center w-16 md:w-24 py-3 rounded-2xl transition-all duration-300 relative group ${
                    isSelected
                      ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)] scale-105"
                      : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className={`text-[10px] md:text-xs font-bold uppercase mb-1 ${isSelected ? "text-gray-500" : ""}`}>
                    {isToday ? "Today" : DAYS[date.getDay()]}
                  </span>
                  <span className="text-lg md:text-2xl font-bold">
                    {date.getDate()}
                  </span>
                </button>
              );
            })}
            </div>
          </div>
        </div>

        {/* Schedule Grid */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center items-center h-96"
            >
              <Loader2 className="h-12 w-12 text-[#bc13fe] animate-spin" />
            </motion.div>
          ) : schedule.length > 0 ? (
            <motion.div
              key={selectedDate.toISOString()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {schedule.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1a0a2e]/50 border border-white/10 rounded-xl overflow-hidden hover:border-[#bc13fe]/50 transition-all group flex"
                >
                  <div className="w-24 flex-shrink-0 relative">
                    <img
                      src={item.media.coverImage.medium}
                      alt={item.media.title.userPreferred}
                      className="w-full h-full object-cover"
                    />
                    {item.media.isAdult && (
                      <div className="absolute top-1 left-1 bg-red-600 text-white text-[10px] font-bold px-1 rounded">
                        18+
                      </div>
                    )}
                  </div>
                  <div className="p-4 flex flex-col justify-center min-w-0">
                    <div className="text-[#00f3ff] text-xs font-mono mb-1 flex items-center gap-2">
                       <Clock className="h-3 w-3" />
                       {new Date(item.airingAt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="font-bold text-white truncate mb-1 group-hover:text-[#bc13fe] transition-colors">
                      {item.media.title.userPreferred}
                    </div>
                    <div className="text-sm text-gray-400">
                      Episode <span className="text-white font-bold">{item.episode}</span>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-32 text-center"
            >
              <Calendar className="h-16 w-16 text-gray-700 mb-6" />
              <h2 className="text-2xl font-bold text-gray-400">No anime airing on this day</h2>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
