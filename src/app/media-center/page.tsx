import InfoPageLayout from "@/components/InfoPageLayout";
import { Newspaper, Image, Video, Download } from "lucide-react";

export const metadata = {
  title: "Media Center - AniNexus",
  description: "Press releases, media assets, and news about AniNexus",
};

export default function MediaCenterPage() {
  return (
    <InfoPageLayout title="Media Center">
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-blue-400 mb-8">
          Welcome to the AniNexus Media Center. Find the latest press releases,
          media assets, and company news.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-blue-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Newspaper className="h-6 w-6 text-blue-400" />
              <h3 className="text-xl font-semibold text-slate-100">
                Press Releases
              </h3>
            </div>
            <p className="text-slate-400 mb-4">
              Latest announcements, product launches, and company updates.
            </p>
            <button className="text-blue-400 hover:text-blue-300 font-medium">
              View All Releases →
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-emerald-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Image className="h-6 w-6 text-emerald-400" />
              <h3 className="text-xl font-semibold text-slate-100">
                Media Assets
              </h3>
            </div>
            <p className="text-slate-400 mb-4">
              Download logos, screenshots, and promotional materials.
            </p>
            <button className="text-emerald-400 hover:text-emerald-300 font-medium">
              Access Assets →
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-purple-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Video className="h-6 w-6 text-purple-400" />
              <h3 className="text-xl font-semibold text-slate-100">
                Video Content
              </h3>
            </div>
            <p className="text-slate-400 mb-4">
              Company videos, interviews, and promotional content.
            </p>
            <button className="text-purple-400 hover:text-purple-300 font-medium">
              Watch Videos →
            </button>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-amber-500/50 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <Download className="h-6 w-6 text-amber-400" />
              <h3 className="text-xl font-semibold text-slate-100">
                Press Kit
              </h3>
            </div>
            <p className="text-slate-400 mb-4">
              Complete media kit with company information and assets.
            </p>
            <button className="text-amber-400 hover:text-amber-300 font-medium">
              Download Kit →
            </button>
          </div>
        </div>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Recent News
          </h2>
          <div className="space-y-4">
            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-slate-500 mb-1">January 1, 2026</p>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                AniNexus Reaches 1 Million Users
              </h3>
              <p className="text-slate-400">
                Platform celebrates major milestone with global anime community.
              </p>
            </div>
            <div className="pb-4 border-b border-slate-700">
              <p className="text-sm text-slate-500 mb-1">December 15, 2025</p>
              <h3 className="text-lg font-semibold text-slate-200 mb-2">
                New Features Released
              </h3>
              <p className="text-slate-400">
                Enhanced search, improved recommendations, and PWA support.
              </p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-semibold text-slate-100 mb-2">
            Media Inquiries
          </h3>
          <p className="text-slate-300 mb-3">
            For press inquiries, interviews, or media partnerships, please
            contact:
          </p>
          <p className="text-blue-400 font-medium">press@aninexus.com</p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
