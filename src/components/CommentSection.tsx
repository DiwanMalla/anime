"use client";

import { useState } from "react";
import { useCommunity } from "@/hooks/useCommunity";
import { Send, ThumbsUp, MessageSquare } from "lucide-react";

export default function CommentSection({ mediaId }: { mediaId: number }) {
  const { user, addComment, getCommentsForMedia } = useCommunity();
  const [newComment, setNewComment] = useState("");
  const comments = getCommentsForMedia(mediaId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    addComment(mediaId, newComment);
    setNewComment("");
  };

  return (
    <div className="anime-panel rounded-xl p-6 border border-foreground/5 space-y-6">
      <h3 className="text-xl font-bold flex items-center gap-2 text-foreground">
        <MessageSquare className="text-anime-pink" />
        Community Discussion
      </h3>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex gap-4">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-10 h-10 rounded-full border border-foreground/10"
        />
        <div className="flex-1 relative">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Share your thoughts..."
            className="w-full bg-foreground/5 border border-foreground/10 rounded-lg py-3 px-4 focus:outline-none focus:border-anime-pink/50 transition-colors text-foreground"
          />
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-anime-pink hover:bg-anime-pink/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* List */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <div className="text-center py-8 text-foreground/50">
            Be the first to start the discussion!
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="flex gap-4 group">
              <img
                src={comment.userAvatar}
                alt={comment.userName}
                className="w-10 h-10 rounded-full border border-foreground/10"
              />
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-foreground/90">
                    {comment.userName}
                  </span>
                  <span className="text-xs text-foreground/50">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-foreground/80 text-sm">{comment.content}</p>
                <div className="flex items-center gap-4 pt-1">
                  <button className="flex items-center gap-1.5 text-xs text-foreground/50 hover:text-anime-pink transition-colors">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    {comment.likes || "Like"}
                  </button>
                  <button className="text-xs text-foreground/50 hover:text-foreground transition-colors">
                    Reply
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
