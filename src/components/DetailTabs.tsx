"use client";

import { useState } from "react";
import { Info as InfoIcon, Layers as LayersIcon, ThumbsUp, PlayCircle, Users } from "lucide-react";

interface Tab {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface DetailTabsProps {
  overview: React.ReactNode;
  episodes: React.ReactNode;
  cast: React.ReactNode;
  related: React.ReactNode;
  recommended: React.ReactNode;
}

export default function DetailTabs({
  overview,
  episodes,
  cast,
  related,
  recommended,
}: DetailTabsProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs: Tab[] = [
    { id: "overview", label: "Overview", icon: <InfoIcon className="w-4 h-4" /> },
    { id: "episodes", label: "Episodes", icon: <PlayCircle className="w-4 h-4" /> },
    { id: "cast", label: "Cast & Staff", icon: <Users className="w-4 h-4" /> },
    { id: "related", label: "Related", icon: <LayersIcon className="w-4 h-4" /> },
    { id: "recommended", label: "Recommended", icon: <ThumbsUp className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-4 font-mono text-sm uppercase tracking-widest transition-all relative whitespace-nowrap ${
              activeTab === tab.id
                ? "text-anime-blue bg-white/5"
                : "text-foreground/40 hover:text-foreground/80 hover:bg-white/2"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-anime-blue shadow-[0_0_10px_rgba(0,243,255,0.5)]" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="transition-all duration-300">
        {activeTab === "overview" && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{overview}</div>}
        {activeTab === "episodes" && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{episodes}</div>}
        {activeTab === "cast" && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{cast}</div>}
        {activeTab === "related" && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{related}</div>}
        {activeTab === "recommended" && <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">{recommended}</div>}
      </div>
    </div>
  );
}
