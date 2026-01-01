"use client";

import { Play, Clapperboard } from "lucide-react";
import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface TrailerButtonProps {
  trailerId: string | null;
  title: string;
  className?: string;
}

export default function TrailerButton({ trailerId, title, className = "" }: TrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!trailerId) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-center gap-2 bg-[#bc13fe] text-white py-4 rounded-lg font-bold hover:bg-[#a111db] transition shadow-lg shadow-[#bc13fe]/20 group ${className}`}
      >
        <div className="relative">
            <Clapperboard className="h-5 w-5 transition-transform group-hover:scale-110" />
            <Play className="h-2 w-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fill-white text-white opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        Watch Trailer
      </button>

      <TrailerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        trailerId={trailerId}
        title={title}
      />
    </>
  );
}
