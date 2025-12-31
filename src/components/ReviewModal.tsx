"use client";

import { useState } from "react";
import { useCommunity } from "@/hooks/useCommunity";
import { Star, X } from "lucide-react";

interface ReviewModalProps {
  mediaId: number;
  isOpen: boolean;
  onClose: () => void;
  mediaTitle: string;
}

export default function ReviewModal({
  mediaId,
  isOpen,
  onClose,
  mediaTitle,
}: ReviewModalProps) {
  const { addReview } = useCommunity();
  const [score, setScore] = useState(0);
  const [content, setContent] = useState("");
  const [hoveredScore, setHoveredScore] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (score === 0) return;
    addReview(mediaId, score, content);
    onClose();
    // Reset form
    setScore(0);
    setContent("");
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-background border border-foreground/10 w-full max-w-lg rounded-2xl p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground/50 hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h2 className="text-2xl font-bold mb-1 text-foreground">
          Write a Review
        </h2>
        <p className="text-foreground/50 text-sm mb-6 truncate">{mediaTitle}</p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Score Selector */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <button
                  key={num}
                  type="button"
                  onMouseEnter={() => setHoveredScore(num)}
                  onMouseLeave={() => setHoveredScore(0)}
                  onClick={() => setScore(num)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-6 h-6 ${
                      num <= (hoveredScore || score)
                        ? "fill-[#ffd93d] text-[#ffd93d]"
                        : "text-foreground/20"
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-sm font-medium text-[#ffd93d]">
              {hoveredScore || score}/10
            </span>
          </div>

          {/* Text Area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="What did you think about this title? (Optional)"
            className="w-full h-32 bg-foreground/5 border border-foreground/10 rounded-xl p-4 resize-none focus:outline-none focus:border-anime-pink/50 transition-colors text-sm text-foreground"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-foreground/50 hover:text-foreground transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={score === 0}
              className="px-6 py-2 bg-gradient-to-r from-anime-pink to-anime-purple text-white text-sm font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
