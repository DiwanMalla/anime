"use client";

import { useCommunity } from "@/hooks/useCommunity";
import { useState, useEffect } from "react";
import { 
  Edit2, 
  Save, 
  Camera, 
  MessageSquare, 
  Star, 
  PlayCircle, 
  BookOpen, 
  Clock, 
  CheckCircle2,
  Sparkles,
  Share2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProfilePage() {
  const { user, updateUser, allComments, allReviews } = useCommunity();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(user);
  const [activeTab, setActiveTab] = useState("activity");

  useEffect(() => {
    setEditForm(user);
  }, [user]);

  const handleSave = () => {
    updateUser(editForm);
    setIsEditing(false);
  };

  const userComments = allComments.filter((c) => c.userName === user.name);
  const userReviews = allReviews.filter((r) => r.userId === "local-user");

  return (
    <main className="min-h-screen bg-background text-foreground pt-24 px-4 md:px-12 pb-20 overflow-x-hidden">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* Profile Header */}
        <section className="relative group">
          {/* Subtle Clean Banner */}
          <div className="absolute inset-0 -z-10 bg-white/5 rounded-3xl overflow-hidden border border-white/10 shadow-inner">
             <div className="absolute inset-0 bg-gradient-to-br from-[#bc13fe]/5 to-[#00f3ff]/5" />
          </div>

          <div className="relative pt-16 pb-12 px-8 flex flex-col md:flex-row items-center md:items-end gap-8">
            {/* Avatar Section */}
            <div className="relative">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="w-40 h-40 md:w-48 md:h-48 rounded-3xl overflow-hidden border-2 border-[#00f3ff]/30 shadow-2xl bg-black">
                  <img
                    src="/nano-banana.png"
                    alt="Nano Banana Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                {isEditing && (
                  <button className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-3xl opacity-100 transition-opacity z-20">
                    <Camera className="w-8 h-8 text-white" />
                  </button>
                )}
              </motion.div>
              
              {/* AI Badge */}
              <div className="absolute -bottom-2 -right-2">
                 <div className="flex items-center gap-1.5 bg-background border border-[#00f3ff]/50 px-3 py-1.5 rounded-full shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-[#00f3ff]" />
                    <span className="text-[10px] font-bold text-foreground">Nano Banana AI Beta</span>
                 </div>
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div className="space-y-1">
                <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                  {isEditing ? (
                    <input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="text-4xl md:text-5xl font-bold bg-transparent border-b border-[#00f3ff]/50 focus:border-[#00f3ff] outline-none w-full text-foreground"
                    />
                  ) : (
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                      {user.name}
                    </h1>
                  )}
                </motion.div>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                   <Badge label="Anime Lover" color="bg-pink-500/10 text-pink-400" />
                   <Badge label="Top Reviewer" color="bg-yellow-500/10 text-yellow-500" />
                   <Badge label="Verified Fan" color="bg-green-500/10 text-green-400" />
                </div>
              </div>

              {isEditing ? (
                <textarea
                  value={editForm.bio}
                  onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                  className="text-white/70 bg-white/5 border border-white/10 rounded-xl p-3 outline-none w-full text-sm resize-none"
                  rows={2}
                />
              ) : (
                <p className="max-w-xl text-white/60 text-base md:text-lg">
                  {user.bio}
                </p>
              )}
            </div>

            {/* Header Actions */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                className={`px-8 py-3 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 ${
                  isEditing
                    ? "bg-green-500 text-black hover:bg-green-400"
                    : "bg-[#bc13fe] text-white hover:opacity-90"
                }`}
              >
                {isEditing ? <Save className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
                {isEditing ? "Save Changes" : "Edit Profile"}
              </button>
              <button className="px-8 py-3 rounded-2xl text-white/50 hover:text-white transition-colors flex items-center justify-center gap-2 text-sm font-medium">
                 <Share2 className="w-4 h-4" /> Share Profile
              </button>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
           <StatTile label="Anime Watched" value={user.stats.animeWatched} icon={<PlayCircle className="text-pink-400" />} />
           <StatTile label="Manga Read" value={user.stats.mangaRead} icon={<BookOpen className="text-blue-400" />} />
           <StatTile label="Reviews" value={userReviews.length} icon={<Star className="text-yellow-400" />} />
           <StatTile label="Days Joined" value={Math.floor((new Date().getTime() - new Date(user.joinedDate).getTime()) / (1000 * 3600 * 24))} icon={<Clock className="text-green-400" />} />
        </div>

        {/* Dynamic Content */}
        <div className="space-y-8">
           <div className="flex border-b border-white/10 gap-6">
              {[
                { id: "activity", label: "My Activity" },
                { id: "favorites", label: "Favorites" },
                { id: "ai", label: "Nano Banana AI" }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 text-sm font-bold transition-all relative ${
                    activeTab === tab.id ? "text-[#00f3ff]" : "text-white/40 hover:text-white"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div layoutId="tab-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00f3ff]" />
                  )}
                </button>
              ))}
           </div>

           <AnimatePresence mode="wait">
             <motion.div
               key={activeTab}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               exit={{ opacity: 0, y: -10 }}
               transition={{ duration: 0.2 }}
             >
                {activeTab === "activity" && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Comments */}
                    <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/5">
                      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-pink-400" />
                        My Comments
                      </h2>
                      <div className="space-y-4">
                        {userComments.length > 0 ? (
                          userComments.map((comment) => (
                            <div key={comment.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 hover:border-white/10 transition-all">
                              <p className="text-white/80 text-sm mb-3">{comment.content}</p>
                              <div className="flex justify-between items-center text-[10px] text-white/30 font-medium">
                                <span>Anime ID: {comment.mediaId}</span>
                                <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="py-6 text-white/30 text-center italic text-sm">No comments to show</p>
                        )}
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="bg-white/5 rounded-3xl p-6 md:p-8 border border-white/5">
                      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        My Reviews
                      </h2>
                      <div className="space-y-4">
                        {userReviews.length > 0 ? (
                          userReviews.map((review) => (
                            <div key={review.id} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex gap-0.5">
                                  {[...Array(review.score)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                  ))}
                                  {[...Array(10 - review.score)].map((_, i) => (
                                    <Star key={i} className="w-3 h-3 text-white/5" />
                                  ))}
                                </div>
                                <span className="text-[10px] text-white/30">{new Date(review.createdAt).toLocaleDateString()}</span>
                              </div>
                              {review.content && <p className="text-white/80 text-sm">{review.content}</p>}
                            </div>
                          ))
                        ) : (
                          <p className="py-6 text-white/30 text-center italic text-sm">No reviews yet</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                {activeTab === "favorites" && (
                   <div className="bg-white/5 rounded-3xl p-12 border border-white/5 text-center">
                      <p className="text-white/40">You haven't pinned any favorites yet. Start exploring build your collection!</p>
                   </div>
                )}
                {activeTab === "ai" && (
                   <div className="max-w-3xl mx-auto space-y-6">
                      <div className="bg-gradient-to-br from-[#bc13fe]/10 to-[#00f3ff]/10 rounded-3xl p-8 border border-white/10">
                        <div className="flex items-start gap-4 mb-6">
                           <div className="w-12 h-12 rounded-2xl bg-[#00f3ff]/20 flex items-center justify-center">
                              <Sparkles className="w-6 h-6 text-[#00f3ff]" />
                           </div>
                           <div>
                              <h3 className="text-xl font-bold text-white mb-1">Meet Nano Banana AI</h3>
                              <p className="text-white/40 text-sm">Our lightweight AI model designed to personalize your journey.</p>
                           </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                           <FeatureCard title="Personalized Recs" desc="Nano Banana learns your taste to find your next favorite anime." />
                           <FeatureCard title="Progress Insights" desc="Smart tracking and alerts for returning series." />
                        </div>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5 flex items-center gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                            <CheckCircle2 className="w-4 h-4 text-green-500" />
                         </div>
                         <span className="text-white/60 text-sm font-medium">Nano Banana AI is currently active and syncing with your profile.</span>
                      </div>
                   </div>
                )}
             </motion.div>
           </AnimatePresence>
        </div>
      </div>
    </main>
  );
}

function StatTile({ label, value, icon }: { label: string; value: number | string; icon: React.ReactNode }) {
  return (
    <div className="bg-white/5 rounded-2xl p-6 border border-white/10 transition-all hover:bg-white/10 group">
      <div className="mb-4 group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-3xl font-bold text-white mb-1">{value}</div>
      <div className="text-[10px] font-bold text-white/30 uppercase tracking-wider">{label}</div>
    </div>
  );
}

function Badge({ label, color }: { label: string; color: string }) {
  return (
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${color}`}>
      {label}
    </div>
  );
}

function FeatureCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="bg-black/20 p-4 rounded-xl border border-white/5">
       <div className="font-bold text-white text-sm mb-1">{title}</div>
       <div className="text-white/40 text-[11px] leading-relaxed">{desc}</div>
    </div>
  );
}

