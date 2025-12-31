"use client";

import { useState } from "react";
import CommentSection from "@/components/CommentSection";
import ReviewModal from "@/components/ReviewModal";
import { Star, MessageSquare } from "lucide-react";
import { useCommunity } from "@/hooks/useCommunity";

interface CommunityLayerProps {
  mediaId: number;
  mediaTitle: string;
}

export default function CommunityLayer({
  mediaId,
  mediaTitle,
}: CommunityLayerProps) {
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const { getReviewsForMedia } = useCommunity();
  
  const reviews = getReviewsForMedia(mediaId);
  const userReview = reviews.find(r => r.userId === 'local-user');

  return (
    <div className="space-y-8 mb-12">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-mono text-foreground uppercase tracking-widest border-l-4 border-anime-pink pl-4">
          Community
        </h3>
        <button
          onClick={() => setIsReviewOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-anime-pink/10 text-anime-pink border border-anime-pink/30 rounded-lg hover:bg-anime-pink/20 transition-colors font-bold text-sm"
        >
          <Star className="w-4 h-4" />
          {userReview ? "Edit Review" : "Rate & Review"}
        </button>
      </div>

      <CommentSection mediaId={mediaId} />

      <ReviewModal
        mediaId={mediaId}
        mediaTitle={mediaTitle}
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
      />
    </div>
  );
}
