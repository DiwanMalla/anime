'use client';

import Link from 'next/link';
import { Search, PlayCircle, Bell, User } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-300',
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-lg' : 'bg-gradient-to-b from-black/80 to-transparent'
      )}
    >
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2 group">
              <PlayCircle className="h-8 w-8 text-red-600 fill-current group-hover:scale-110 transition-transform" />
              <span className="text-2xl font-bold text-white tracking-tighter">
                AniVerse
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="/" className="text-sm font-medium text-white hover:text-gray-300 transition">Home</Link>
              <Link href="/#trending" className="text-sm font-medium text-gray-300 hover:text-white transition">Trending</Link>
              <Link href="/#popular" className="text-sm font-medium text-gray-300 hover:text-white transition">Popular</Link>
              <Link href="/#upcoming" className="text-sm font-medium text-gray-300 hover:text-white transition">Upcoming</Link>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <form onSubmit={handleSearch} className="relative hidden sm:block group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-focus-within:text-white transition-colors" />
              <input
                type="text"
                placeholder="Titles, people, genres"
                className="bg-black/40 border border-gray-600 text-white text-sm rounded-full pl-10 pr-4 py-1.5 w-64 focus:outline-none focus:border-white focus:bg-black/60 transition-all placeholder:text-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
            <button className="text-gray-300 hover:text-white transition">
              <Bell className="h-5 w-5" />
            </button>
            <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-white transition">
              <User className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
