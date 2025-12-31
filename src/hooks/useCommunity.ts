"use client";

import { useState, useEffect } from "react";

export interface User {
  name: string;
  avatar: string;
  bio: string;
  joinedDate: string;
  stats: {
    animeWatched: number;
    mangaRead: number;
    reviewsWritten: number;
  };
  favorites: number[]; // IDs of favorite anime/manga
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  createdAt: string;
  likes: number;
  mediaId: number; // The anime/manga ID this comment belongs to
}

export interface Review {
  id: string;
  userId: string;
  mediaId: number;
  score: number;
  content: string;
  createdAt: string;
}

const DEFAULT_USER: User = {
  name: "Guest User",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
  bio: "Just another anime fan experiencing the nexus.",
  joinedDate: new Date().toISOString(),
  stats: {
    animeWatched: 12,
    mangaRead: 5,
    reviewsWritten: 0,
  },
  favorites: [],
};

export function useCommunity() {
  const [user, setUser] = useState<User>(DEFAULT_USER);
  const [comments, setComments] = useState<Comment[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);

  // Load data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const storedUser = localStorage.getItem("aninexus_user");
        const storedComments = localStorage.getItem("aninexus_comments");
        const storedReviews = localStorage.getItem("aninexus_reviews");

        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedComments) setComments(JSON.parse(storedComments));
        if (storedReviews) setReviews(JSON.parse(storedReviews));
      } catch (error) {
        console.error("Failed to load community data:", error);
      }
    };
    loadData();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    const newUser = { ...user, ...updates };
    setUser(newUser);
    localStorage.setItem("aninexus_user", JSON.stringify(newUser));
  };

  const addComment = (mediaId: number, content: string) => {
    const newComment: Comment = {
      id: crypto.randomUUID(),
      userId: "local-user",
      userName: user.name,
      userAvatar: user.avatar,
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      mediaId,
    };
    const newComments = [newComment, ...comments];
    setComments(newComments);
    localStorage.setItem("aninexus_comments", JSON.stringify(newComments));
  };

  const addReview = (mediaId: number, score: number, content: string) => {
    const newReview: Review = {
      id: crypto.randomUUID(),
      userId: "local-user",
      mediaId,
      score,
      content,
      createdAt: new Date().toISOString(),
    };
    const newReviews = [newReview, ...reviews];
    setReviews(newReviews);
    localStorage.setItem("aninexus_reviews", JSON.stringify(newReviews));
    
    // Update stats
    updateUser({
        stats: {
            ...user.stats,
            reviewsWritten: user.stats.reviewsWritten + 1
        }
    })
  };

  const toggleFavorite = (mediaId: number) => {
    const isFav = user.favorites.includes(mediaId);
    let newFavorites;
    if (isFav) {
      newFavorites = user.favorites.filter((id) => id !== mediaId);
    } else {
      newFavorites = [...user.favorites, mediaId];
    }
    updateUser({ favorites: newFavorites });
  };
  
  const getCommentsForMedia = (mediaId: number) => {
      return comments.filter(c => c.mediaId === mediaId);
  }

  const getReviewsForMedia = (mediaId: number) => {
      return reviews.filter(r => r.mediaId === mediaId);
  }

  return {
    user,
    updateUser,
    addComment,
    addReview,
    toggleFavorite,
    getCommentsForMedia,
    getReviewsForMedia,
    allReviews: reviews, // Exporting for profile page
    allComments: comments
  };
}
