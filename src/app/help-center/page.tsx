import InfoPageLayout from "@/components/InfoPageLayout";

export default function HelpCenterPage() {
  return (
    <InfoPageLayout title="Help Center">
      <div className="space-y-6 text-foreground/80 font-light leading-relaxed">
        <p className="text-xl text-[#00f3ff] font-mono mb-8 uppercase tracking-widest">
          Find answers and troubleshoot your experience.
        </p>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">Quick Links</h2>
          <ul className="list-disc list-inside space-y-2 text-[#bc13fe]">
            <li>How to manage your watchlist</li>
            <li>Enabling notifications</li>
            <li>Customizing your theme</li>
            <li>Account security</li>
          </ul>
        </section>
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-white uppercase tracking-tight">System Status</h2>
          <div className="p-4 bg-[#00f3ff]/10 border border-[#00f3ff]/30 rounded-lg flex items-center gap-3">
            <div className="h-2 w-2 rounded-full bg-[#00f3ff] animate-pulse" />
            <span className="text-sm font-mono text-[#00f3ff] uppercase">All Systems Operational</span>
          </div>
        </section>
      </div>
    </InfoPageLayout>
  );
}
