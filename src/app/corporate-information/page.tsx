import InfoPageLayout from "@/components/InfoPageLayout";
import { Building2, Users, Globe, Award } from "lucide-react";

export const metadata = {
  title: "Corporate Information - AniNexus",
  description: "Learn more about AniNexus company information and governance",
};

export default function CorporateInformationPage() {
  return (
    <InfoPageLayout title="Corporate Information">
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-blue-400 mb-8">
          AniNexus is a leading anime and manga discovery platform, committed to
          bringing the best of Japanese animation to fans worldwide.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <Building2 className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Company Overview
            </h3>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-300">Founded:</strong> 2020
              </p>
              <p>
                <strong className="text-slate-300">Headquarters:</strong> Tokyo,
                Japan
              </p>
              <p>
                <strong className="text-slate-300">CEO:</strong> Diwan Malla
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <Users className="h-8 w-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Our Team
            </h3>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-300">Employees:</strong> 50+
              </p>
              <p>
                <strong className="text-slate-300">Engineers:</strong> 25
              </p>
              <p>
                <strong className="text-slate-300">Support Staff:</strong> 15
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <Globe className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Global Reach
            </h3>
            <div className="space-y-2 text-slate-400">
              <p>
                <strong className="text-slate-300">Users:</strong> 1M+ worldwide
              </p>
              <p>
                <strong className="text-slate-300">Countries:</strong> 50+
              </p>
              <p>
                <strong className="text-slate-300">Languages:</strong> 15
              </p>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <Award className="h-8 w-8 text-amber-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-100 mb-2">
              Awards
            </h3>
            <div className="space-y-2 text-slate-400">
              <p>Best Anime Platform 2024</p>
              <p>Innovation in Streaming</p>
              <p>User Choice Award</p>
            </div>
          </div>
        </div>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Mission Statement
          </h2>
          <p>
            Our mission is to make anime and manga accessible to everyone,
            everywhere. We believe in the power of storytelling to connect
            people across cultures and create meaningful experiences.
          </p>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Corporate Governance
          </h2>
          <p>
            AniNexus maintains the highest standards of corporate governance,
            ensuring transparency, accountability, and ethical business
            practices. Our board of directors includes industry veterans and
            anime enthusiasts committed to sustainable growth.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
