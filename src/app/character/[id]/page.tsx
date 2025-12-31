import { fetchAniList, CHARACTER_DETAILS_QUERY } from "@/lib/anilist";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, User, Calendar, Info } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CharacterPage({ params }: PageProps) {
  const { id } = await params;
  let character;

  try {
    const data = await fetchAniList(CHARACTER_DETAILS_QUERY, {
      id: parseInt(id),
    });
    character = data.Character;
  } catch (error) {
    console.error("Error fetching character details:", error);
    return notFound();
  }

  if (!character) return notFound();

  return (
    <main className="min-h-screen bg-background text-foreground pb-20 pt-24">
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-[#00f3ff] transition mb-8 group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Image & Info */}
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl">
              <img
                src={character.image.large}
                alt={character.name.full}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            <div className="mt-8 space-y-6">
              <div className="anime-panel p-6 rounded-2xl border border-foreground/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#00f3ff]" />
                  Information
                </h3>
                <div className="space-y-4 text-sm">
                  {character.name.native && (
                    <div>
                      <div className="text-foreground/50 uppercase text-[10px] font-bold tracking-wider">
                        Native Name
                      </div>
                      <div className="text-foreground">
                        {character.name.native}
                      </div>
                    </div>
                  )}
                  {character.gender && (
                    <div>
                      <div className="text-foreground/50 uppercase text-[10px] font-bold tracking-wider">
                        Gender
                      </div>
                      <div className="text-foreground">{character.gender}</div>
                    </div>
                  )}
                  {character.age && (
                    <div>
                      <div className="text-foreground/50 uppercase text-[10px] font-bold tracking-wider">
                        Age
                      </div>
                      <div className="text-foreground">{character.age}</div>
                    </div>
                  )}
                  {character.bloodType && (
                    <div>
                      <div className="text-foreground/50 uppercase text-[10px] font-bold tracking-wider">
                        Blood Type
                      </div>
                      <div className="text-foreground">
                        {character.bloodType}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Media */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-foreground mb-2">
              {character.name.full}
            </h1>
            {character.name.alternative?.length > 0 && (
              <p className="text-foreground/50 text-lg mb-8">
                {character.name.alternative.join(", ")}
              </p>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#ff6b9d] mb-6 flex items-center gap-2">
                <User className="w-6 h-6" />
                Biography
              </h2>
              <div
                className="text-foreground/80 leading-relaxed text-lg max-w-none space-y-4"
                dangerouslySetInnerHTML={{
                  __html: character.description || "No biography available.",
                }}
              />
            </div>

            {character.media?.edges?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#00f3ff] mb-8 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Appearances
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {character.media.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/anime/${edge.node.id}`}
                      className="group space-y-3"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-foreground/10 group-hover:border-[#00f3ff]/50 transition-all">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.userPreferred}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-foreground line-clamp-2 group-hover:text-[#00f3ff] transition-colors">
                          {edge.node.title.userPreferred}
                        </div>
                        <div className="text-[10px] text-foreground/50 uppercase font-bold mt-1">
                          {edge.characterRole}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
