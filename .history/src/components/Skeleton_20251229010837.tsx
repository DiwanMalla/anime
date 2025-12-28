import { cn } from "@/lib/utils";

export default function Skeleton({ className }: { className?: string }) {
  return (
    <div className={cn("animate-pulse rounded-md bg-gray-800", className)} />
  );
}

export function AnimeCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <Skeleton className="h-72 w-full" />
      <div className="p-4">
        <Skeleton className="h-6 w-3/4 mb-3" />
        <div className="flex gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}
