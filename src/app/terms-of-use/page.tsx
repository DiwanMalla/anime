import InfoPageLayout from "@/components/InfoPageLayout";
import { FileText, Shield, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Use - AniNexus",
  description: "Terms and conditions for using AniNexus services",
};

export default function TermsOfUsePage() {
  return (
    <InfoPageLayout title="Terms of Use">
      <div className="space-y-6 text-slate-300 leading-relaxed">
        <p className="text-lg text-blue-400 mb-8">
          Please read these Terms of Use carefully before using AniNexus
          services.
        </p>

        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-xl p-6 border border-amber-500/20 mb-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-slate-300">
              <strong className="text-amber-400">Last Updated:</strong> January
              1, 2026. By using our service, you agree to these terms.
            </p>
          </div>
        </div>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using AniNexus, you agree to be bound by these Terms
            of Use and all applicable laws and regulations. If you do not agree
            with any of these terms, you are prohibited from using or accessing
            this site.
          </p>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            2. Use License
          </h2>
          <p>
            Permission is granted to temporarily view the materials on AniNexus
            for personal, non-commercial transitory viewing only. This is the
            grant of a license, not a transfer of title, and under this license
            you may not:
          </p>
          <ul className="list-disc list-inside space-y-2 text-slate-400 ml-4">
            <li>Modify or copy the materials</li>
            <li>Use the materials for commercial purposes</li>
            <li>Attempt to reverse engineer any software</li>
            <li>Remove any copyright or proprietary notations</li>
          </ul>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            3. User Conduct
          </h2>
          <p>
            Users are expected to respect fellow anime fans. Harassment, hate
            speech, or the distribution of malicious software is strictly
            prohibited and will result in immediate termination of access.
          </p>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            4. Privacy
          </h2>
          <p>
            Your use of AniNexus is also governed by our Privacy Policy. Please
            review our Privacy Policy to understand our practices.
          </p>
        </section>

        <section className="space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            5. Content Rights
          </h2>
          <p>
            All anime content, including but not limited to videos, images, and
            metadata, is the property of their respective copyright holders.
            AniNexus does not claim ownership of any third-party content.
          </p>
        </section>
      </div>
    </InfoPageLayout>
  );
}
