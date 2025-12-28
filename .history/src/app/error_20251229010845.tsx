'use client';

import { useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-6xl font-extrabold text-red-500 mb-4">Error</h1>
      <h2 className="text-2xl font-bold mb-8 text-center">Something went wrong!</h2>
      <p className="text-gray-400 mb-12 text-center max-w-md">
        We encountered an unexpected error while fetching the data. Please try again.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105 border border-gray-700"
      >
        <RefreshCcw className="h-5 w-5" /> Try Again
      </button>
    </div>
  );
}
