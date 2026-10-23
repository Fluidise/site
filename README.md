<p align="center">
  <img src="public/brand/banner.png" alt="Fluidise Site — burgundy lunar landscape with copper light and an ivory crescent" width="100%">
</p>

<h1 align="center">Fluidise Site</h1>

<p align="center">
  <strong>The official website and tool hub for the Fluidise developer experience suite.</strong>
</p>

---

## Overview

This repository hosts the official web hub for **Fluidise** ([`fluidise.dev`](https://fluidise.dev)), showcasing:
- **Suite Catalog**: Centralized discovery for standalone packages ([`fluidise-clint`](https://github.com/Fluidise/clint), [`fluidise-relay`](https://github.com/Fluidise/relay)).
- **Dedicated Tool Pages**: Interactive documentation, installation guides, and CLI execution guarantees per tool.
- **Architectural Manifesto**: Detailed breakdown of our *Agent-First* invariants and strict *Unix Philosophy*.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (v7 with Content Layer API)
- **UI & Islands**: [React 19](https://react.dev/) + [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) + Custom Mineral Nocturne & Copper Dawn palette
- **Icons**: [@tabler/icons-react](https://tabler.io/icons) (tree-shaken named imports)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Package Manager**: [Bun](https://bun.sh/)

## Project Structure

```text
site/
├── .github/
│   └── workflows/
│       └── ci.yml               # Build verification CI
├── public/
│   ├── favicon.svg              # Fluidise companion mark
│   └── brand/                   # Official vector and raster brand assets
├── src/
│   ├── components/              # UI components (Hero, Terminal, ToolCard, Navbar)
│   ├── content/
│   │   └── tools/               # Markdown specifications per tool
│   │       ├── clint.md         # fluidise-clint specification
│   │       └── relay.md         # fluidise-relay specification
│   ├── content.config.ts        # Content Layer collection schema
│   ├── layouts/
│   │   └── Layout.astro         # Global layout with SEO and atmospheric styles
│   ├── pages/
│   │   ├── index.astro          # Hub landing page
│   │   └── tools/
│   │       └── [id].astro       # Dedicated tool deep-dive pages
│   └── styles/
│       └── global.css           # Tailwind v4 theme and custom mesh glows
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.1+ (or Node.js 22+)

### Local Development

```bash
# Install dependencies
bun install

# Start local dev server
bun run dev

# Run Astro type check
bun run check

# Build production bundle
bun run build
```

## License

[MIT](LICENSE) © 2026 Acrazie
