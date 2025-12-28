import Skeleton from "@/components/Skeleton";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className="h-[50vh] bg-gray-800 animate-pulse" />
      <div className="max-w-7xl mx-auto px-4 -mt-32 relative z-10 pb-20">
        <div className="flex flex-col md:flex-row gap-8">
          <Skeleton className="w-64 h-96 rounded-xl flex-shrink-0 mx-auto md:mx-0" />
          <div className="flex-1">
            <Skeleton className="h-12 w-3/4 mb-4" />
            <div className="flex gap-4 mb-6">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="flex gap-2 mb-8">
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
            </div>
            <Skeleton className="h-64 w-full rounded-2xl" />
          </div>
        </div>
      </div>
    </main>
  );
}
