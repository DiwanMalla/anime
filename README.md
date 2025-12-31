# AniNexus

AniNexus is a high-performance, feature-rich anime and manga discovery platform. Built with **Next.js 16**, **React 19**, and **Tailwind CSS**, it provides a seamless experience for exploring the vast world of Japanese animation and comics using the AniList GraphQL API.

## ✨ Key Features

- **🚀 Discovery Hub**: Real-time lists of Trending, Popular, Top Rated, and Upcoming anime and manga.
- **📅 Airing Schedule**: A weekly calendar view to track when your favorite shows are releasing.
- **🎭 Deep Details**: Comprehensive pages for Anime, Manga, Characters, and Staff members.
- **🔍 Advanced Search**: Powerful search engine with filters for genres, tags, status, format, and release year.
- **🏷️ Genre Explorer**: A visual way to browse anime by specific tags and genres.
- **🎲 Surprise Me**: Instantly discover a random highly-rated anime with a single click.
- **⭐ Watchlist**: Save your favorite titles to a local watchlist for easy access.
- **📱 PWA Ready**: Installable on mobile and desktop for an app-like experience.
- **🌓 Dark Mode**: A sleek, modern aesthetic with glassmorphism and smooth Framer Motion animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Data Source**: [AniList GraphQL API](https://anilist.co/graphiql)
- **State Management**: React Context API (for Watchlist)
- **PWA**: `@ducanh2912/next-pwa`

## 📂 Project Structure

```text
src/
├── app/                 # Next.js App Router (Pages & API)
│   ├── anime/[id]/      # Anime details
│   ├── manga/[id]/      # Manga details
│   ├── character/[id]/  # Character profiles
│   ├── staff/[id]/      # Staff/Voice actor profiles
│   ├── schedule/        # Weekly airing calendar
│   ├── genres/          # Genre & Tag explorer
│   ├── watchlist/       # User's saved titles
│   └── search/          # Advanced search results
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Dynamic navigation with search
│   ├── AnimeCard.tsx    # Reusable media card
│   ├── MangaCard.tsx    # Specialized manga card
│   └── ...              # Layout & UI components
├── context/             # Global state (WatchlistContext)
└── lib/                 # Core logic & API queries
    └── anilist.ts       # GraphQL queries and fetcher
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm / yarn / pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/DiwanMalla/anime.git
   cd anime
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   npm start
   ```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

Built with ❤️ by [Diwan Malla](https://github.com/DiwanMalla)
