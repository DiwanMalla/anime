import InfoPageLayout from "@/components/InfoPageLayout";
import { Shield, Lock, Eye, Database } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - AniNexus",
  description: "How we protect and handle your personal information",
};

export default function PrivacyPage() {
  return (
    <InfoPageLayout title="Privacy Policy">
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-blue-400 mb-8">
          Your privacy and data security are our top priorities. This policy
          explains how we collect, use, and protect your information.
        </p>

        <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl p-6 border border-blue-500/20 mb-8">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
            <p className="text-slate-300">
              <strong className="text-blue-400">Last Updated:</strong> January
              1, 2026. We may update this policy from time to time.
            </p>
          </div>
        </div>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-3">
            <Database className="h-6 w-6 text-emerald-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-3">
                Data Collection
              </h2>
              <p className="mb-3">
                We collect information you provide directly to us when you
                create an account, update your watchlist, or communicate with
                our AI systems. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li>Email address and username</li>
                <li>Profile preferences and settings</li>
                <li>Watchlist and viewing history</li>
                <li>Search queries and interactions</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-3">
            <Lock className="h-6 w-6 text-blue-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-3">
                How We Use Your Information
              </h2>
              <p>
                The information we collect is used to personalize your
                experience, provide customer support, and improve the AniNexus
                recommendation engine. We do not sell your personal data to
                third parties.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <div className="flex items-start gap-3">
            <Eye className="h-6 w-6 text-purple-400 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-slate-100 tracking-tight mb-3">
                Cookie Policy
              </h2>
              <p className="mb-3">
                AniNexus uses cookies to maintain your session and remember your
                theme preferences. Types of cookies we use:
              </p>
              <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
                <li>
                  <strong className="text-slate-300">Essential Cookies:</strong>{" "}
                  Required for basic site functionality
                </li>
                <li>
                  <strong className="text-slate-300">
                    Preference Cookies:
                  </strong>{" "}
                  Remember your settings and choices
                </li>
                <li>
                  <strong className="text-slate-300">Analytics Cookies:</strong>{" "}
                  Help us improve our service
                </li>
              </ul>
              <p className="mt-3">
                You can manage your cookie settings at any time through the
                "Cookie Preferences" link in the footer.
              </p>
            </div>
          </div>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Your Rights
          </h2>
          <p>
            You have the right to access, correct, or delete your personal
            information at any time. Contact us at privacy@aninexus.com to
            exercise these rights.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
