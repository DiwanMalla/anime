import React from "react";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface InfoPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function InfoPageLayout({
  title,
  children,
}: InfoPageLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground pb-20 font-sans selection:bg-blue-500/30 selection:text-white">
      {/* Decorative Header Background */}
      <div className="relative h-[35vh] w-full overflow-hidden">
        <div className="absolute top-24 left-4 md:left-12 z-20">
          <Link
            href="/"
            className="flex items-center gap-2 text-slate-300 hover:text-white transition group bg-slate-900/60 backdrop-blur-md px-4 md:px-5 py-2 md:py-2.5 rounded-xl border border-slate-700 hover:border-blue-500/50 shadow-lg"
          >
            <ChevronLeft className="h-4 w-4 md:h-5 md:w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-xs md:text-sm tracking-wide">
              Back to Home
            </span>
          </Link>
        </div>

        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/30 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(59, 130, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        <div className="absolute bottom-10 left-4 md:left-12 right-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-2xl tracking-tight">
            {title}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-emerald-500 mt-5 rounded-full shadow-lg shadow-blue-500/50" />
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-12 relative z-10">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 md:p-12 rounded-2xl mt-8 shadow-2xl">
          <div className="prose prose-invert max-w-none prose-headings:text-slate-100 prose-p:text-slate-300 prose-a:text-blue-400 hover:prose-a:text-blue-300 prose-strong:text-slate-200">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
}
