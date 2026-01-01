"use client";

import { PlayCircle, ExternalLink } from "lucide-react";

interface WatchNowButtonProps {
  streamingEpisodes: {
    url: string;
    site: string;
  }[] | null;
  className?: string;
}

export default function WatchNowButton({ streamingEpisodes, className = "" }: WatchNowButtonProps) {
  if (!streamingEpisodes || streamingEpisodes.length === 0) return null;

  const primarySource = streamingEpisodes[0];

  return (
    <a
      href={primarySource.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center justify-center gap-2 bg-[#00f3ff] text-black py-4 rounded-lg font-bold hover:bg-[#00d8e4] transition shadow-lg shadow-[#00f3ff]/20 group ${className}`}
    >
      <PlayCircle className="h-5 w-5 transition-transform group-hover:scale-110" />
      Watch on {primarySource.site}
      <ExternalLink className="h-3 w-3 opacity-50" />
    </a>
  );
}
