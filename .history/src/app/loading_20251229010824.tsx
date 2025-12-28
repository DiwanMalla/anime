import { AnimeCardSkeleton } from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="h-[70vh] bg-gray-800 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="h-10 w-48 bg-gray-800 rounded-lg mb-8 animate-pulse" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <AnimeCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
