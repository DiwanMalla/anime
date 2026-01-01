# 🌌 AniNexus: Technical & Feature Deep Dive

![AniNexus Banner](/logo.png)

AniNexus is a state-of-the-art **Progressive Web App (PWA)** built with **Next.js 15**, designed to provide an unparalleled anime and manga experience. This document covers the full technical architecture, feature set, and implementation details of the project.

---

## 📂 Project Structure

```bash
/src
├── /app               # Next.js App Router (Routes & Layouts)
│   ├── /anime/[id]    # Anime detail pages & trailer integration
│   ├── /manga/[id]    # Manga detail & reading pages
│   ├── /api           # Edge-ready API routes (AI, etc.)
│   ├── /profile       # User stats, history, and community interactions
│   └── /watchlist     # Personal collection management
├── /components        # Atomic & Complex UI Components
│   ├── /MangaReader   # Logic-heavy component for live reading
│   ├── /AniGenie     # AI Chat Interface
│   ├── /NavBar       # Unified navigation with dynamic theme switching
│   └── /Community     # Comment & Review layers
├── /context           # Global State (Watchlist, Reading Progress)
├── /hooks             # Performance hooks (useCommunity, useWatchlist)
└── /lib               # External API Wrappers (AniList, MangaDex, AI)
```

---

## 🧠 Core Systems & Logic

### 1. 🤖 AniGenie: Intelligent Recommendation Engine
AniGenie uses the **NVIDIA Nemotron-70B** model to interpret user intent. 
- **Greeting Layer:** To reduce latency and API costs, a local handler intercepts common greetings (e.g., "hi", "hello") with instant, cached responses.
- **Search Auto-Filtering:** The AI returns structured JSON. Our frontend parses this and can instantly apply filters to the `/search` page, including genres, tags, release years, and formats.
- **Clean Output:** Implemented regex-based sanitization to ensure JSON payloads are extracted cleanly from markdown responses.

### 2. 📖 Advanced Manga Reader
Integrated directly with the **MangaDex API**, the reader is optimized for high-performance viewing.
- **Horizontal & RTL Mode:** Implemented a paging state machine that handles Right-to-Left navigation using keyboard listeners and localized click-zones.
- **Progressive Loading:** Images are optimized for bandwidth, and the reader includes zoom/pan controls via Framer Motion.
- **Position Persistence:** Using `WatchlistContext`, the reader saves your exact `chapterId` and `pageNumber` every time you turn a page, syncing it instantly to `localStorage`.

### 3. 🔔 PWA Notification Engine
The `NotificationManager` component acts as a background worker within the app.
- **Schedule Sync:** Every 5 minutes, it fetches the latest airing schedule from AniList.
- **Intelligent Diffing:** It compares the upcoming airing times against the items in your **Watchlist**.
- **Transmission Link:** If a show is airing within 15 minutes, it triggers a browser-level notification (with image icons) to ensure you never miss a live transmission.

### 4. 🎨 Neon Theme Engine
The UI utilizes CSS Variables and `next-themes` for a dynamic "Live Interface."
- **Multiple Themes:** Support for **light, dark, cyber, sakura,** and **midnight**.
- **CSS Variable Injection:** Each theme defines unique tokens for `--anime-purple`, `--anime-cyan`, etc., which affect the glow intensity and glassmorphism levels.
- **Theme Cycling:** A custom toggle in the NavBar allows users to cycle through all 5 aesthetics instantly.

---

## � API Implementations

### AniList (GraphQL)
- **Queries:** Complex Graph queries for Anime Details, Manga Details, Search (with multi-tag filtering), and the Airing Schedule.
- **Caching:** Implemented aggressive runtime caching for AniList calls to ensure PWA offline capabilities.

### MangaDex (REST)
- **Mapping:** We map AniList IDs to MangaDex IDs using fuzzy title matching across English, Native, and Romaji titles.
- **Image Handling:** Utilizes the MangaDex `data-saver` and CDN system for fast, reliable page loading.

---

## 🛠️ Technical Stack

- **Framework:** Next.js 15 (React 19)
- **Language:** TypeScript
- **State:** React Context + Hooks
- **Styling:** Vanilla Tailwind CSS v4-ready
- **Animations:** Framer Motion (Gestures & Page Transitions)
- **Icons:** Lucide React
- **Deployment:** Optimized for Vercel/Edge

---

## � Key User Workflows

### The "Continue" Loop
1. User starts reading *Chainsaw Man* on a mobile PWA.
2. Closes app at Chapter 12, Page 5.
3. User opens AniNexus on Desktop later.
4. "Continue Reading" row on the home page displays the series.
5. Clicking it loads Chapter 12 and auto-scrolls/pages to Page 5.

### The AI Recommendation Flow
1. User types "I want a sad anime about music in the 90s."
2. AniGenie suggests *Your Lie in April* and *Nana*.
3. User clicks "Apply Search Filters."
4. Search page loads filtered by "Music", "Drama", and 90s/00s years automatically.

---

*This project represents the pinnacle of community-focused anime applications, combining high-speed architecture with experimental AI features.* 🌌🤘
