# AI Agent Instructions for `Fluidise/site`

## Project Overview

`Fluidise/site` contains the official web hub and documentation portal for the Fluidise developer experience suite.

- **Stack**: Astro 7, React 19, Tailwind CSS v4, Motion (`motion/react`), Tabler Icons, TypeScript, Bun.
- **Language**: All documentation, code comments, and commits must be in English (see `CONTEXT.md` in `core`). Conversations with maintainers may remain in French.
- **Remote**: Targets GitHub (`Fluidise/site`).

## Git & Quality Rules

- **Branching**: Trunk-Based development (`main` base; short-lived branches `feat/*`, `fix/*`, `chore/*`, `docs/*`).
- **Commits**: Conventional Commits convention enforced. Dogfooding via `fluidise-clint`.
- **Co-authorship**: Never add `Co-authored-by: Claude` or similar co-author mentions in commit messages.
- **Verification**: Run `bun run check` and `bun run build` before pushing or creating pull requests.
