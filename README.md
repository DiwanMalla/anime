# Anime Nexus

Anime Nexus is a modern, responsive web application for discovering and exploring anime. Built with Next.js 16 and Tailwind CSS, it leverages the AniList GraphQL API to provide real-time data on trending, popular, and upcoming anime titles.

## Features

- **Home Page**: curated lists of Trending, Popular, Top Rated, and Upcoming anime.
- **Hero Section**: Showcases the top trending anime with a dynamic background and large visuals.
- **Anime Details**: Comprehensive information including score, episodes, studio, genre, characters (with voice actors), staff, trailer, and recommendations.
- **Search**: Real-time search functionality with instant dropdown suggestions.
- **Responsive Design**: Fully optimized for desktop and mobile devices with a custom navigation bar and mobile menu.
- **Modern UI**: sleek dark mode aesthetic featuring glassmorphism, gradients, and smooth transitions.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion](https://www.framer.com/motion/)
- **Data Source**: [AniList GraphQL API](https://anilist.co/graphiql)
- **Utilities**: `tailwind-merge`, `clsx`

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd anime
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── page.tsx         # Home page
│   ├── layout.tsx       # Root layout
│   ├── anime/           # Anime details route
│   │   └── [id]/page.tsx
│   └── search/          # Search results route
├── components/          # Reusable UI components
│   ├── Navbar.tsx       # Navigation bar with search
│   ├── AnimeCard.tsx    # Card component for anime items
│   ├── Footer.tsx       # Application footer
│   └── Skeleton.tsx     # Loading state skeleton
└── lib/                 # Utilities
    └── anilist.ts       # AniList GraphQL API queries and fetcher
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
