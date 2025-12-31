"use client";

import { ThemeProvider } from "next-themes";
import { WatchlistProvider } from "@/context/WatchlistContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <WatchlistProvider>
        {children}
      </WatchlistProvider>
    </ThemeProvider>
  );
}
