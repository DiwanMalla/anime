import { fetchAniList, STAFF_DETAILS_QUERY } from "@/lib/anilist";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Users, Calendar, Info, Briefcase } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StaffPage({ params }: PageProps) {
  const { id } = await params;
  let staff;

  try {
    const data = await fetchAniList(STAFF_DETAILS_QUERY, { id: parseInt(id) });
    staff = data.Staff;
  } catch (error) {
    console.error("Error fetching staff details:", error);
    return notFound();
  }

  if (!staff) return notFound();

  return (
    <main className="min-h-screen bg-[#0a0014] text-gray-100 pb-20 pt-24">
      <div className="max-w-[1800px] mx-auto px-4 md:px-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/60 hover:text-[#00f3ff] transition mb-8 group"
        >
          <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Home</span>
        </Link>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Image & Info */}
          <div className="w-full lg:w-[350px] flex-shrink-0">
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={staff.image.large}
                alt={staff.name.full}
                className="w-full aspect-[2/3] object-cover"
              />
            </div>

            <div className="mt-8 space-y-6">
              <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5 text-[#00f3ff]" />
                  Information
                </h3>
                <div className="space-y-4 text-sm">
                  {staff.name.native && (
                    <div>
                      <div className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        Native Name
                      </div>
                      <div className="text-white">{staff.name.native}</div>
                    </div>
                  )}
                  {staff.gender && (
                    <div>
                      <div className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        Gender
                      </div>
                      <div className="text-white">{staff.gender}</div>
                    </div>
                  )}
                  {staff.age && (
                    <div>
                      <div className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        Age
                      </div>
                      <div className="text-white">{staff.age}</div>
                    </div>
                  )}
                  {staff.homeTown && (
                    <div>
                      <div className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        Hometown
                      </div>
                      <div className="text-white">{staff.homeTown}</div>
                    </div>
                  )}
                  {staff.yearsActive?.length > 0 && (
                    <div>
                      <div className="text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                        Years Active
                      </div>
                      <div className="text-white">
                        {staff.yearsActive.join(" - ")}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Media */}
          <div className="flex-1">
            <h1 className="text-5xl font-bold text-white mb-2">
              {staff.name.full}
            </h1>
            {staff.primaryOccupations?.length > 0 && (
              <p className="text-[#bc13fe] text-lg font-mono mb-8 uppercase tracking-wider">
                {staff.primaryOccupations.join(" • ")}
              </p>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-[#ff6b9d] mb-6 flex items-center gap-2">
                <Briefcase className="w-6 h-6" />
                Biography
              </h2>
              <div
                className="text-gray-300 leading-relaxed text-lg max-w-none space-y-4"
                dangerouslySetInnerHTML={{
                  __html: staff.description || "No biography available.",
                }}
              />
            </div>

            {staff.staffMedia?.edges?.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold text-[#00f3ff] mb-8 flex items-center gap-2">
                  <Calendar className="w-6 h-6" />
                  Work History
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {staff.staffMedia.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/anime/${edge.node.id}`}
                      className="group space-y-3"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-[#00f3ff]/50 transition-all">
                        <img
                          src={edge.node.coverImage.large}
                          alt={edge.node.title.userPreferred}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#00f3ff] transition-colors">
                          {edge.node.title.userPreferred}
                        </div>
                        <div className="text-[10px] text-gray-500 uppercase font-bold mt-1">
                          {edge.staffRole}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {staff.characters?.edges?.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-[#bc13fe] mb-8 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Voiced Characters
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {staff.characters.edges.map((edge: any) => (
                    <Link
                      key={edge.node.id}
                      href={`/character/${edge.node.id}`}
                      className="group space-y-3"
                    >
                      <div className="relative aspect-[2/3] rounded-xl overflow-hidden border border-white/10 group-hover:border-[#bc13fe]/50 transition-all">
                        <img
                          src={edge.node.image.large}
                          alt={edge.node.name.full}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white line-clamp-2 group-hover:text-[#bc13fe] transition-colors">
                          {edge.node.name.full}
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
