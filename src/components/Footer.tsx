import { Github, Twitter, Facebook, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground/50 py-12 text-sm border-t border-foreground/5">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex gap-6 mb-8">
          <Facebook className="h-6 w-6 hover:text-foreground cursor-pointer" />
          <Instagram className="h-6 w-6 hover:text-foreground cursor-pointer" />
          <Twitter className="h-6 w-6 hover:text-foreground cursor-pointer" />
          <Github className="h-6 w-6 hover:text-foreground cursor-pointer" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">
              Audio Description
            </li>
            <li className="hover:underline cursor-pointer">
              Investor Relations
            </li>
            <li className="hover:underline cursor-pointer">Legal Notices</li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Help Center</li>
            <li className="hover:underline cursor-pointer">Jobs</li>
            <li className="hover:underline cursor-pointer">
              Cookie Preferences
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Gift Cards</li>
            <li className="hover:underline cursor-pointer">Terms of Use</li>
            <li className="hover:underline cursor-pointer">
              Corporate Information
            </li>
          </ul>
          <ul className="space-y-3">
            <li className="hover:underline cursor-pointer">Media Center</li>
            <li className="hover:underline cursor-pointer">Privacy</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>

        <div className="mb-4">
          <button className="border border-gray-400 px-4 py-1 hover:text-white hover:border-white transition">
            Service Code
          </button>
        </div>

        <div className="text-xs">
          &copy; {new Date().getFullYear()} AetherStream, Inc.
        </div>
      </div>
    </footer>
  );
}
