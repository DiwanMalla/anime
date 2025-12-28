import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-white px-4">
      <h1 className="text-9xl font-extrabold text-blue-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-8 text-center">
        Oops! This anime seems to be in another dimension.
      </h2>
      <p className="text-gray-400 mb-12 text-center max-w-md">
        The page you are looking for doesn't exist or has been moved to a
        different timeline.
      </p>
      <Link
        href="/"
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all transform hover:scale-105"
      >
        <Home className="h-5 w-5" /> Back to Home
      </Link>
    </div>
  );
}
