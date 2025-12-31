import MangaReader from "@/components/MangaReader";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string; chapterId?: string }>;
}

export default async function MangaReadPage({ params }: PageProps) {
  // In a real app, we would fetch chapter images here.
  // For now, we mock it.
  const { id } = await params;

  // Mock checking if manga exists
  if (!id) return notFound();

  return (
    <MangaReader
        mangaId={id}
        chapterId="1" // Defaulting to 1 for demo
        mangaTitle="Manga Title Demo" 
        hasNext={true}
        hasPrev={false}
    />
  );
}
