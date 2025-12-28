"use client";

import Link from "next/link";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { fetchAniList, SEARCH_ANIME_QUERY } from "@/lib/anilist";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search for suggestions
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.length >= 3) {
        try {
          const data = await fetchAniList(SEARCH_ANIME_QUERY, {
            search: searchQuery,
            page: 1,
            perPage: 5,
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
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-md border-b border-[#00f3ff]/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]"
          : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-12 py-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-12">
          <Link href="/" className="text-2xl md:text-3xl font-bold tracking-tighter group relative">
            <span className="text-white group-hover:text-[#00f3ff] transition-colors duration-300">ANI</span>
            <span className="text-[#00f3ff] group-hover:text-[#bc13fe] transition-colors duration-300">NEXUS</span>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] group-hover:w-full transition-all duration-300" />
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-300">
            <Link href="/" className="hover:text-[#00f3ff] transition-colors uppercase tracking-widest text-xs">Home</Link>
            <Link href="/trending" className="hover:text-[#00f3ff] transition-colors uppercase tracking-widest text-xs">Trending</Link>
            <Link href="/popular" className="hover:text-[#00f3ff] transition-colors uppercase tracking-widest text-xs">Popular</Link>
            <Link href="/upcoming" className="hover:text-[#00f3ff] transition-colors uppercase tracking-widest text-xs">Upcoming</Link>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden md:block" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-[#00f3ff] transition-colors" />
              <input
                type="text"
                placeholder="Search for anime..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => searchQuery.length >= 3 && setShowSuggestions(true)}
                className="bg-black/50 border border-white/10 rounded-full py-2 pl-10 pr-4 w-[200px] focus:w-[300px] transition-all duration-300 focus:outline-none focus:border-[#00f3ff]/50 focus:bg-black/80 text-sm text-white placeholder:text-gray-600 font-mono"
              />
            </form>

            {/* Search Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full right-0 mt-2 w-[350px] bg-[#0a0a0a]/95 backdrop-blur-xl border border-[#00f3ff]/30 rounded-lg shadow-[0_0_30px_rgba(0,243,255,0.15)] overflow-hidden">
                <div className="p-2">
                  <div className="text-[10px] font-mono text-[#00f3ff] uppercase tracking-widest px-2 py-1 mb-1 border-b border-[#00f3ff]/20">
                    Search Results
                  </div>
                  {suggestions.map((anime) => (
                    <Link
                      key={anime.id}
                      href={`/anime/${anime.id}`}
                      onClick={() => setShowSuggestions(false)}
                      className="flex items-center gap-3 p-2 hover:bg-[#00f3ff]/10 rounded transition-colors group"
                    >
                      <img
                        src={anime.coverImage.medium}
                        alt={anime.title.userPreferred}
                        className="w-10 h-14 object-cover rounded border border-white/10 group-hover:border-[#00f3ff]/50 transition-colors"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-200 group-hover:text-[#00f3ff] truncate transition-colors">
                          {anime.title.userPreferred}
                        </div>
                        <div className="text-xs text-gray-500 font-mono flex items-center gap-2">
                          <span>{anime.format || "Unknown"}</span>
                          {anime.seasonYear && (
                            <>
                              <span className="w-1 h-1 bg-gray-600 rounded-full" />
                              <span>{anime.seasonYear}</span>
                            </>
                          )}
                          {anime.averageScore && (
                            <>
                              <span className="w-1 h-1 bg-gray-600 rounded-full" />
                              <span className={anime.averageScore >= 75 ? "text-green-400" : "text-gray-400"}>
                                {anime.averageScore}%
                              </span>
                            </>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 text-gray-300">
            <Bell className="h-5 w-5 hover:text-[#00f3ff] cursor-pointer transition-colors" />
            <div className="h-8 w-8 rounded bg-gradient-to-br from-[#00f3ff] to-[#bc13fe] p-[1px] cursor-pointer hover:shadow-[0_0_10px_rgba(188,19,254,0.5)] transition-shadow">
              <div className="h-full w-full rounded bg-black flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>

          <button 
            className="md:hidden text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black/95 backdrop-blur-xl border-t border-[#00f3ff]/20 p-4 absolute w-full">
          <div className="flex flex-col gap-4 font-mono text-sm">
            <Link href="/" className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest">Home</Link>
            <Link href="/trending" className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest">Trending</Link>
            <Link href="/popular" className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest">Popular</Link>
            <Link href="/upcoming" className="text-gray-300 hover:text-[#00f3ff] uppercase tracking-widest">Upcoming</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
