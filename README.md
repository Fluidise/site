<p align="center">
  <img src="public/brand/readme-banner.png" alt="Fluidise Site — glacial peaks above a sea of clouds" width="100%">
</p>

<h1 align="center">Fluidise Site</h1>

<p align="center">
  <strong>The official website and documentation hub for the Fluidise developer experience suite.</strong>
</p>

<p align="center">
  <a href="https://github.com/Fluidise/site/actions/workflows/deploy.yml"><img src="https://github.com/Fluidise/site/actions/workflows/deploy.yml/badge.svg" alt="CI/CD Pipeline"></a>
  <a href="package.json"><img src="https://img.shields.io/badge/version-0.1.0-blue.svg" alt="Version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-amber.svg" alt="License: MIT"></a>
  <a href="https://fluidise.dev"><img src="https://img.shields.io/badge/website-fluidise.dev-8B2635.svg" alt="Website"></a>
</p>

---

## Overview

This repository contains the source code for the official web portal of **Fluidise** ([`fluidise.dev`](https://fluidise.dev)), an agent-first developer experience suite engineered for autonomous AI coding agents and human developers.

The site provides:

- **Suite Catalog**: Centralized discovery and interactive exploration of standalone Fluidise packages, including [`fluidise-clint`](https://github.com/Fluidise/clint) (deterministic commit linter) and [`fluidise-relay`](https://github.com/Fluidise/relay) (agent-first Git hook orchestrator).
- **Dedicated Tool Pages**: Interactive documentation, installation avenues (Homebrew, Cargo, standalone precompiled binaries), and strict CLI execution guarantees per tool.
- **Architectural Manifesto**: Breakdown of our foundational invariants — _Agent-First_ ergonomics, RFC 2119 linting determinism, zero side-effects, and bounded resource consumption.

## Tech Stack

- **Framework**: [Astro](https://astro.build/) (v7 with Content Layer API)
- **UI & Islands**: [React 19](https://react.dev/) + [@astrojs/react](https://docs.astro.build/en/guides/integrations-guide/react/)
- **Styling & Design System**: [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite`) with custom Mineral Nocturne and Copper Dawn palette
- **Icons**: [@tabler/icons-react](https://tabler.io/icons) (tree-shaken named imports)
- **Animations**: [Motion](https://motion.dev/) (`motion/react`)
- **Package Manager & Runtime**: [Bun](https://bun.sh/) 1.4+
- **Production Container**: [Docker](https://www.docker.com/) multi-stage build running unprivileged [Nginx Alpine](https://hub.docker.com/r/nginxinc/nginx-unprivileged)

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) 1.4+ (or Node.js 22+)
- [Docker](https://www.docker.com/) (optional, for testing the production container)

### Local Development (Bun)

```bash
# Install dependencies
bun install

# Start local dev server with hot reload (defaults to http://localhost:4321)
bun run dev

# Run Astro type check and diagnostics
bun run check

# Build production static bundle (dist/)
bun run build

# Preview production build locally
bun run preview
```

### Containerized Execution (Docker)

The repository provides a multi-stage `Dockerfile` packaging the static site into an unprivileged Nginx container (~25MB) with security headers, immutable caching for Astro assets, and an active `/healthz` endpoint:

```bash
# Build the container image
docker build -t fluidise-site .

# Run container on port 8080
docker run -d --name fluidise-site -p 8080:8080 fluidise-site

# Verify endpoint health
curl http://127.0.0.1:8080/healthz
# Response: healthy
```

## Project Structure & Content Architecture

```text
site/
├── .github/
│   └── workflows/
│       ├── deploy.yml           # CI validation & Dokploy production deployment
│       └── pr-triage.yml        # Pull request triage & conventional labeling
├── public/
│   ├── favicon.svg              # Fluidise companion mark
│   └── brand/                   # Official vector and raster brand assets
├── src/
│   ├── components/              # UI components (Hero, InteractiveTerminal, ToolGrid, Navbar)
│   ├── content/
│   │   └── tools/               # Declarative tool specifications
│   │       ├── clint.md         # fluidise-clint specification
│   │       └── relay.md         # fluidise-relay specification
│   ├── content.config.ts        # Content Layer collection schema and validation
│   ├── layouts/
│   │   └── Layout.astro         # Global layout with SEO and atmospheric styles
│   ├── pages/
│   │   ├── index.astro          # Hub landing page
│   │   └── tools/
│   │       └── [id].astro       # Dedicated tool deep-dive pages
│   └── styles/
│       └── global.css           # Tailwind v4 theme and ambient mesh glows
├── astro.config.mjs             # Astro and Vite configuration
├── Dockerfile                   # Multi-stage Bun build + Nginx unprivileged runtime
├── nginx.conf                   # Hardened Nginx configuration (security headers, caching)
├── package.json                 # Project dependencies and scripts
└── tsconfig.json                # TypeScript compiler configuration
```

### Content Layer

Tool specifications are authored declaratively in `src/content/tools/` as Markdown documents validated against an Astro Content Layer schema defined in `src/content.config.ts`. Metadata fields (status, package commands, color palettes, key features) dynamically feed both the interactive home grid and tool detail pages.

## CI/CD & Deployment

- **Automated Validation**: On pull requests and commits to `main`, [.github/workflows/deploy.yml](.github/workflows/deploy.yml) verifies lockfile integrity, executes `bun run check`, builds the static site, and validates Docker image compilation.
- **Production Rollout**: Pushes to `main` notify [Dokploy](https://dokploy.com/) via a secured webhook, triggering instant, zero-downtime container updates on [`fluidise.dev`](https://fluidise.dev).

## License

[MIT](LICENSE) © 2026 Acrazie
