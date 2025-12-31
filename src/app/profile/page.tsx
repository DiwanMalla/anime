"use client";

import { useCommunity } from "@/hooks/useCommunity";
import { useState } from "react";
import { Edit2, Save, Camera, MessageSquare, Star } from "lucide-react";

export default function ProfilePage() {
  const { user, updateUser, allComments, allReviews } = useCommunity();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const userComments = allComments.filter((c) => c.userName === user.name); // Simple match for now since ID is static
  const userReviews = allReviews.filter((r) => r.userId === "local-user");

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-12 pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Header */}
        <div className="relative anime-panel rounded-2xl p-8 border border-foreground/5 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-anime-pink/20 to-anime-purple/20" />

          <div className="relative flex flex-col md:flex-row items-end md:items-center gap-6 mt-12">
            <div className="relative group">
              <img
                src={editForm.avatar}
                alt="Profile"
                className="w-32 h-32 rounded-full border-4 border-background shadow-xl object-cover"
              />
              {isEditing && (
                <button className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-8 h-8 text-white" />
                </button>
              )}
            </div>

            <div className="flex-1 space-y-2 mb-2">
              {isEditing ? (
                <input
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                  className="text-3xl font-bold bg-transparent border-b border-foreground/20 focus:border-anime-pink outline-none w-full text-foreground"
                />
              ) : (
                <h1 className="text-3xl font-bold text-foreground">
                  {user.name}
                </h1>
              )}

              {isEditing ? (
                <input
                  value={editForm.bio}
                  onChange={(e) =>
                    setEditForm({ ...editForm, bio: e.target.value })
                  }
                  className="text-foreground/50 bg-transparent border-b border-foreground/20 focus:border-anime-pink outline-none w-full text-sm"
                />
              ) : (
                <p className="text-foreground/50">{user.bio}</p>
              )}
            </div>

            <button
              onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all ${
                isEditing
                  ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                  : "bg-foreground/5 hover:bg-foreground/10 text-foreground border border-foreground/10"
              }`}
            >
              {isEditing ? (
                <>
                  <Save className="w-4 h-4" /> Save
                </>
              ) : (
                <>
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </>
              )}
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard
            label="Anime Watched"
            value={user.stats.animeWatched}
            color="text-blue-400"
          />
          <StatCard
            label="Manga Read"
            value={user.stats.mangaRead}
            color="text-green-400"
          />
          <StatCard
            label="Reviews Written"
            value={userReviews.length}
            color="text-purple-400"
          />
        </div>

        {/* Content Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Comments */}
          <div className="anime-panel rounded-2xl p-6 border border-foreground/5">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <MessageSquare className="w-5 h-5 text-anime-pink" />
              Recent Comments
            </h2>
            <div className="space-y-4">
              {userComments.length > 0 ? (
                userComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="p-4 bg-foreground/5 rounded-xl border border-foreground/5"
                  >
                    <p className="text-foreground/80 text-sm mb-2">
                      {comment.content}
                    </p>
                    <div className="text-xs text-foreground/50 flex justify-between">
                      <span>On Media #{comment.mediaId}</span>
                      <span>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-foreground/50 text-sm">No comments yet.</p>
              )}
            </div>
          </div>

          {/* Recent Reviews */}
          <div className="anime-panel rounded-2xl p-6 border border-foreground/5">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-foreground">
              <Star className="w-5 h-5 text-[#ffd93d]" />
              My Reviews
            </h2>
            <div className="space-y-4">
              {userReviews.length > 0 ? (
                userReviews.map((review) => (
                  <div
                    key={review.id}
                    className="p-4 bg-foreground/5 rounded-xl border border-foreground/5"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex text-[#ffd93d]">
                        {[...Array(review.score)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                      <span className="text-xs text-foreground/50">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.content && (
                      <p className="text-foreground/80 text-sm">
                        {review.content}
                      </p>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-foreground/50 text-sm">No reviews yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="anime-panel p-6 rounded-2xl border border-foreground/5 flex flex-col items-center justify-center text-center">
      <span className={`text-4xl font-black ${color} mb-1`}>{value}</span>
      <span className="text-sm text-foreground/50 uppercase tracking-wider font-medium">
        {label}
      </span>
    </div>
  );
}
