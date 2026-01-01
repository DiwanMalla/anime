import InfoPageLayout from "@/components/InfoPageLayout";
import { Building2, Users, Globe, Award } from "lucide-react";

export const metadata = {
  title: "Corporate Information - AniNexus",
  description: "Learn more about AniNexus company information and governance",
};

export default function CorporateInformationPage() {
  return (
    <InfoPageLayout title="Developer Details">
      <div className="space-y-8 text-slate-300 leading-relaxed max-w-2xl mx-auto">
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://avatars.githubusercontent.com/u/10268051?v=4"
            alt="Diwan Malla"
            className="w-28 h-28 rounded-full border-4 border-emerald-500 shadow-lg"
          />
          <h1 className="text-3xl font-bold text-slate-100">Diwan Malla</h1>
          <p className="text-emerald-400 font-medium">
            Full Stack Developer & Anime Enthusiast
          </p>
        </div>
        <div className="space-y-2">
          <p>
            <span className="font-semibold text-slate-200">Email:</span>{" "}
            <a
              href="mailto:diwanmallaa@gmail.com"
              className="text-blue-400 hover:underline"
            >
              diwanmalla.vu@gmail.com
            </a>
          </p>
          <p>
            <span className="font-semibold text-slate-200">GitHub:</span>{" "}
            <a
              href="https://github.com/DiwanMalla"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              github.com/DiwanMalla
            </a>
          </p>
          <p>
            <span className="font-semibold text-slate-200">Portfolio:</span>{" "}
            <a
              href="https://diwanmalla.online"
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              diwanmalla.online
            </a>
          </p>
          <p>
            <span className="font-semibold text-slate-200">Location:</span>{" "}
            Sydney, Australia
          </p>
        </div>
        <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mt-6">
          <h2 className="text-xl font-bold text-slate-100 mb-2">About Me</h2>
          <p>
            I am a passionate developer with a love for anime, manga, and
            building modern web applications. I created AniNexus to help fans
            discover, track, and enjoy their favorite series with ease. Always
            learning, always building!
          </p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
