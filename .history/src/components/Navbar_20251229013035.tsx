'use client';

import Link from 'next/link';
import { Search, PlayCircle, Bell, User, X } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect, useRef } from 'react';
import { fetchAniList, SEARCH_ANIME_QUERY } from '@/lib/anilist';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim().length > 2) {
        try {
          const data = await fetchAniList(SEARCH_ANIME_QUERY, {
            search: searchQuery,
            page: 1,
            perPage: 5,
          });
          setSuggestions(data.Page.media);
          setShowDropdown(true);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowDropdown(false);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
        isScrolled 
          ? 'bg-[#050505]/90 backdrop-blur-xl border-[#00f3ff]/20 shadow-[0_0_15px_rgba(0,243,255,0.1)]' 
          : 'bg-gradient-to-b from-black/90 to-transparent'
      )}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative">
                <PlayCircle className="h-8 w-8 text-[#00f3ff] fill-current group-hover:scale-110 transition-transform drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]" />
                <div className="absolute inset-0 bg-[#00f3ff] blur-lg opacity-20 group-hover:opacity-40 transition-opacity" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tighter font-mono">
                ANI<span className="text-[#00f3ff]">VERSE</span>
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-8">
              {['Home', 'Trending', 'Popular', 'Upcoming'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-400 hover:text-[#00f3ff] transition-colors uppercase tracking-widest relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#00f3ff] transition-all group-hover:w-full" />
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative hidden sm:block group" ref={searchRef}>
              <form onSubmit={handleSearch} className="relative z-10">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-focus-within:text-[#00f3ff] transition-colors" />
                <input
                  type="text"
                  placeholder="SEARCH DATABASE..."
                  className="bg-black/50 border border-gray-800 text-white text-xs font-mono rounded-none pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-[#00f3ff] focus:bg-black/80 transition-all placeholder:text-gray-600 uppercase tracking-wider"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => searchQuery.length > 2 && setShowDropdown(true)}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => { setSearchQuery(''); setShowDropdown(false); }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </form>

              {/* Search Dropdown */}
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-[#0a0a0a] border border-[#00f3ff]/30 shadow-[0_0_20px_rgba(0,243,255,0.1)] backdrop-blur-xl">
                  <div className="absolute -top-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#00f3ff] to-transparent opacity-50" />
                  {suggestions.map((anime) => (
                    <Link
                      key={anime.id}
                      href={`/anime/${anime.id}`}
                      onClick={() => setShowDropdown(false)}
                      className="flex items-center gap-3 p-3 hover:bg-[#00f3ff]/10 transition-colors border-b border-gray-900 last:border-0 group"
                    >
                      <img
                        src={anime.coverImage.medium}
                        alt={anime.title.english || anime.title.romaji}
                        className="w-10 h-14 object-cover rounded-sm"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-200 group-hover:text-[#00f3ff] truncate transition-colors">
                          {anime.title.english || anime.title.romaji}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <span className="text-[#00f3ff]">{anime.averageScore}%</span>
                          <span>•</span>
                          <span className="truncate">{anime.genres?.[0]}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                  <Link
                    href={`/search?q=${encodeURIComponent(searchQuery)}`}
                    onClick={() => setShowDropdown(false)}
                    className="block p-3 text-center text-xs font-mono text-[#00f3ff] hover:bg-[#00f3ff]/10 transition-colors uppercase tracking-wider"
                  >
                    View All Results
                  </Link>
                </div>
              )}
            </div>

            <button className="text-gray-400 hover:text-[#00f3ff] transition">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 bg-gradient-to-br from-[#00f3ff] to-[#bc13fe] p-[1px] clip-path-polygon">
              <div className="h-full w-full bg-black flex items-center justify-center hover:bg-transparent transition-colors cursor-pointer">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
