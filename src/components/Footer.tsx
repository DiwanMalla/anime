import { Github, Twitter, Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-10 text-sm border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="flex gap-4 justify-center md:justify-start">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-blue-400 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-pink-400 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-sky-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="https://github.com/DiwanMalla/anime"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-emerald-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <button className="border border-slate-700 px-4 py-1.5 rounded-md hover:text-slate-200 hover:border-slate-600 hover:bg-slate-900/50 transition-all text-xs">
              Service Code
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-8">
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/help-center"
                  className="hover:text-slate-200 transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-use"
                  className="hover:text-slate-200 transition-colors"
                >
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/corporate-information"
                  className="hover:text-slate-200 transition-colors"
                >
                  Corporate Information
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="hover:text-slate-200 transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="hover:text-slate-200 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              {/* Add more links or info here if needed */}
            </ul>
          </div>
        </div>

        <div className="text-center text-xs text-slate-500 pt-4 border-t border-slate-800">
          &copy; {new Date().getFullYear()} AniNexus, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
