"use client";

import { X, Maximize2, Minimize2 } from "lucide-react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  trailerId: string;
  title: string;
}

export default function TrailerModal({ isOpen, onClose, trailerId, title }: TrailerModalProps) {
  const [isCinemaMode, setIsCinemaMode] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className={`relative w-full transition-all duration-500 ease-out shadow-[0_0_100px_rgba(0,243,255,0.15)] ${
            isCinemaMode ? "max-w-none h-full" : "max-w-6xl aspect-video"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="absolute -top-12 left-0 right-0 flex items-center justify-between text-white/60">
            <h3 className="font-mono text-sm uppercase tracking-[0.3em] truncate pr-8">
              Visual Feed: <span className="text-[#00f3ff] font-bold">{title}</span>
            </h3>
            <div className="flex items-center gap-4">
               <button 
                  onClick={() => setIsCinemaMode(!isCinemaMode)}
                  className="hover:text-white transition-colors"
                  title={isCinemaMode ? "Exit Cinema Mode" : "Cinema Mode"}
               >
                  {isCinemaMode ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
               </button>
               <button onClick={onClose} className="hover:text-white transition-colors">
                  <X className="h-6 w-6" />
               </button>
            </div>
          </div>

          {/* Player Container */}
          <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-white/10 group relative">
            <div className="absolute inset-0 border-[10px] border-white/5 pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
            <iframe
              src={`https://www.youtube.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title} Trailer`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          {/* Scanline Overlay Effect */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%]" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
