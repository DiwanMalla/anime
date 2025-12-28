import Image from "next/image";

interface AnimeCardProps {
  anime: {
    id: number;
    title: {
      romaji: string;
      english: string;
      native: string;
    };
    coverImage: {
      large: string;
    };
    averageScore: number;
    genres: string[];
  };
}

export default function AnimeCard({ anime }: AnimeCardProps) {
  const title = anime.title.english || anime.title.romaji;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <div className="relative h-64 w-full">
        <img
          src={anime.coverImage.large}
          alt={title}
          className="object-cover w-full h-full"
        />
        {anime.averageScore && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
            {anime.averageScore}%
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg line-clamp-2 h-14">
          {title}
        </h3>
        <div className="mt-2 flex flex-wrap gap-1">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
