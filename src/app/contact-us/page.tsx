import InfoPageLayout from "@/components/InfoPageLayout";
import { Mail, MessageSquare, Send, Headphones, Globe } from "lucide-react";

export const metadata = {
  title: "Contact Us - AniNexus",
  description: "Get in touch with the AniNexus support team",
};

export default function ContactUsPage() {
  return (
    <InfoPageLayout title="Contact Us">
      <div className="space-y-8 text-slate-300 leading-relaxed">
        <p className="text-lg text-blue-400 mb-8">
          Need assistance? Our support team is here to help you 24/7.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl group hover:border-blue-500/50 transition-all">
            <Mail className="h-8 w-8 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Email Support
            </h3>
            <p className="text-sm text-blue-400 font-medium">
              support@aninexus.com
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Response within 24 hours
            </p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl group hover:border-emerald-500/50 transition-all">
            <MessageSquare className="h-8 w-8 text-emerald-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">Live Chat</h3>
            <p className="text-sm text-slate-400">
              Available for Premium Members
            </p>
            <p className="text-xs text-slate-500 mt-2">24/7 Availability</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl group hover:border-purple-500/50 transition-all">
            <Headphones className="h-8 w-8 text-purple-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Technical Support
            </h3>
            <p className="text-sm text-purple-400 font-medium">
              dev-support@aninexus.com
            </p>
            <p className="text-xs text-slate-500 mt-2">For API & bug reports</p>
          </div>

          <div className="bg-slate-800/50 border border-slate-700 p-6 rounded-xl group hover:border-amber-500/50 transition-all">
            <Globe className="h-8 w-8 text-amber-400 mb-4" />
            <h3 className="text-xl font-bold text-slate-100 mb-2">
              Business Inquiries
            </h3>
            <p className="text-sm text-amber-400 font-medium">
              business@aninexus.com
            </p>
            <p className="text-xs text-slate-500 mt-2">
              Partnerships & licensing
            </p>
          </div>
        </div>

        <section className="mt-12 space-y-4 bg-slate-800/30 rounded-xl p-6 border border-slate-700">
          <h2 className="text-2xl font-bold text-slate-100 tracking-tight">
            Office Location
          </h2>
          <p className="text-slate-400">
            <strong className="text-slate-200">AniNexus HQ</strong>
            <br />
            123 Anime Street
            <br />
            Tokyo Tower, Japan 105-0011
          </p>
        </section>

        <div className="bg-gradient-to-r from-blue-500/10 to-emerald-500/10 rounded-xl p-6 border border-blue-500/20">
          <p className="text-slate-300">
            <strong className="text-slate-100">Note:</strong> For immediate
            assistance with account issues, please visit our Help Center for
            quick solutions and FAQs.
          </p>
        </div>
      </div>
    </InfoPageLayout>
  );
}
