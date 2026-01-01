import { Github, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 text-sm border-t border-slate-800">
      <div className="max-w-[1200px] mx-auto px-4">
        <div className="flex gap-6 mb-10">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Facebook className="h-6 w-6" />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://github.com/DiwanMalla/anime"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors"
          >
            <Github className="h-6 w-6" />
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <ul className="space-y-3">
            <li className="hover:text-slate-200 transition-colors">
              {/* Audio Description link removed */}
            </li>
            <li className="hover:text-slate-200 transition-colors">
              {/* Investor Relations link removed */}
            </li>
            <li className="hover:text-slate-200 transition-colors">
              {/* Legal Notices link removed */}
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/help-center">Help Center</Link>
            </li>
            <li className="hover:text-slate-200 transition-colors">
              {/* Jobs link removed */}
            </li>
            <li className="hover:text-slate-200 transition-colors">
              {/* Cookie Preferences link removed */}
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:text-slate-200 transition-colors">
              {/* Gift Cards link removed */}
            </li>
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/terms-of-use">Terms of Use</Link>
            </li>
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/corporate-information">Corporate Information</Link>
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/media-center">Media Center</Link>
            </li>
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/privacy">Privacy</Link>
            </li>
            <li className="hover:text-slate-200 transition-colors">
              <Link href="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </div>

        <div className="mb-6">
          <button className="border border-slate-700 px-5 py-2 rounded-md hover:text-slate-200 hover:border-slate-600 hover:bg-slate-900/50 transition-all">
            Service Code
          </button>
        </div>

        <div className="text-xs text-slate-500">
          &copy; {new Date().getFullYear()} AniNexus, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
