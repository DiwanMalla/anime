"use client";

import Link from "next/link";
import {
  Search,
  Bell,
  User,
  Menu,
  X,
  Sparkles,
  Star,
  Sun,
  Moon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  fetchAniList,
  SEARCH_ANIME_QUERY,
  getRandomAnime,
} from "@/lib/anilist";
import { useTheme } from "next-themes";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-9 h-9" />;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 text-gray-400 hover:text-[#ff6b9d] transition-colors rounded-xl bg-white/5 border border-white/10"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [isSurprising, setIsSurprising] = useState(false);

  const handleSurpriseMe = async () => {
    if (isSurprising) return;
    setIsSurprising(true);
    try {
      const anime = await getRandomAnime();
      if (anime) {
        router.push(`/anime/${anime.id}`);
      }
    } catch (error) {
      console.error("Error getting random anime:", error);
    } finally {
      setIsSurprising(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 2) {
        try {
          const data = await fetchAniList(SEARCH_ANIME_QUERY, {
            search: searchQuery,
            page: 1,
            perPage: 6,
          });
          setSuggestions(data.Page.media || []);
          setShowSuggestions(true);
        } catch (error) {
          console.error("Error fetching suggestions:", error);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowSuggestions(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#0a0014]/95 backdrop-blur-xl border-b border-[#ff6b9d]/20 shadow-[0_4px_30px_rgba(255,107,157,0.1)]"
          : "bg-gradient-to-b from-[#0a0014]/90 to-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-tighter group relative"
          >
            <span className="text-white group-hover:text-[#00f3ff] transition-colors duration-300">
              ANI
            </span>
            <span className="text-[#00f3ff] group-hover:text-[#bc13fe] transition-colors duration-300">
              NEXUS
            </span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] group-hover:w-full transition-all duration-300" />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/watchlist", label: "Watchlist" },
              { href: "/seasonal", label: "Seasonal" },
              { href: "/schedule", label: "Schedule" },
              { href: "/genres", label: "Genres" },
              { href: "/manga", label: "Manga" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors group"
              >
                <span className="relative z-10">{link.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-[#ff6b9d]/20 to-[#c44eff]/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#ff6b9d] to-[#c44eff] group-hover:w-3/4 transition-all duration-300" />
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#ff6b9d] to-[#c44eff] rounded-full opacity-0 group-focus-within:opacity-50 blur transition-opacity" />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#ff6b9d] transition-colors z-10" />
              <input
                type="text"
                placeholder="Search anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() =>
                  searchQuery.length >= 2 && setShowSuggestions(true)
                }
                className="relative bg-[#1a0a2e]/80 border border-white/10 rounded-full py-2.5 pl-11 pr-4 w-[220px] focus:w-[320px] transition-all duration-300 focus:outline-none focus:border-[#ff6b9d]/50 focus:bg-[#1a0a2e] text-sm text-white placeholder:text-gray-500"
              />
            </form>

            {/* Search Suggestions */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full right-0 mt-3 w-[380px] bg-[#1a0a2e]/98 backdrop-blur-xl border border-[#ff6b9d]/30 rounded-2xl shadow-[0_20px_60px_rgba(255,107,157,0.2)] overflow-hidden">
                <div className="p-3">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#ff6b9d] px-2 pb-2 border-b border-white/10">
                    <Sparkles className="h-3 w-3" />
                    <span>Search Results</span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {suggestions.map((anime) => (
                      <Link
                        key={anime.id}
                        href={`/anime/${anime.id}`}
                        onClick={() => setShowSuggestions(false)}
                        className="flex items-center gap-3 p-2 hover:bg-[#ff6b9d]/10 rounded-xl transition-colors group"
                      >
                        <div className="relative">
                          <img
                            src={anime.coverImage.medium}
                            alt={anime.title.userPreferred}
                            className="w-12 h-16 object-cover rounded-lg border border-white/10 group-hover:border-[#ff6b9d]/50 transition-colors"
                          />
                          {anime.averageScore && (
                            <div className="absolute -top-1 -right-1 bg-[#ffd93d] text-black text-[8px] font-bold px-1 rounded">
                              {anime.averageScore}%
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white group-hover:text-[#ff6b9d] truncate transition-colors">
                            {anime.title.userPreferred}
                          </div>
                          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                            {anime.format && (
                              <span className="text-[#c44eff]">
                                {anime.format}
                              </span>
                            )}
                            {anime.seasonYear && (
                              <>
                                <span className="w-1 h-1 rounded-full bg-gray-600" />
                                <span>{anime.seasonYear}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleSurpriseMe}
              disabled={isSurprising}
              className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#ff6b9d]/10 hover:bg-[#ff6b9d]/20 border border-[#ff6b9d]/30 rounded-xl text-[#ff6b9d] text-sm font-bold transition-all group disabled:opacity-50"
            >
              <Sparkles className={`h-4 w-4 ${isSurprising ? 'animate-spin' : 'group-hover:rotate-12'} transition-transform`} />
              <span>{isSurprising ? 'Finding...' : 'Surprise Me'}</span>
            </button>
            <ThemeToggle />
            <button className="relative p-2 text-gray-400 hover:text-[#ff6b9d] transition-colors group">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#ff6b9d] rounded-full" />
            </button>
            <button className="relative overflow-hidden w-10 h-10 rounded-full bg-gradient-to-br from-[#ff6b9d] to-[#c44eff] p-[2px] hover:shadow-[0_0_20px_rgba(255,107,157,0.5)] transition-shadow">
              <div className="w-full h-full rounded-full bg-[#1a0a2e] flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-gray-400 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00f3ff]/20 p-4 absolute w-full">
          <form onSubmit={handleSearchSubmit} className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search for anime..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/50"
            />
          </form>
          <div className="flex flex-col gap-4 font-mono text-sm">
            {[
              { href: "/", label: "Home" },
              { href: "/watchlist", label: "Watchlist" },
              { href: "/seasonal", label: "Seasonal" },
              { href: "/schedule", label: "Schedule" },
              { href: "/genres", label: "Genres" },
              { href: "/manga", label: "Manga" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => {
                handleSurpriseMe();
                setIsMobileMenuOpen(false);
              }}
              disabled={isSurprising}
              className="flex items-center gap-2 text-[#ff6b9d] uppercase tracking-widest font-bold disabled:opacity-50"
            >
              <Sparkles className={`h-4 w-4 ${isSurprising ? 'animate-spin' : ''}`} />
              <span>{isSurprising ? 'Finding...' : 'Surprise Me'}</span>
            </button>
            <Link
              href="/trending"
              className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Trending
            </Link>
            <Link
              href="/popular"
              className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Popular
            </Link>
            <Link
              href="/upcoming"
              className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Upcoming
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
