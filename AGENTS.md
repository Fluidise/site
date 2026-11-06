# AI Agent Instructions for `Fluidise/site`

## Project Overview

`Fluidise/site` contains the official web hub and documentation portal for the Fluidise developer experience suite.

- **Stack**: Astro 7, React 19, Tailwind CSS v4, Motion (`motion/react`), Tabler Icons, TypeScript, Bun.
- **Language**: All documentation, code comments, and commits must be in English (see `CONTEXT.md` in `core`). Conversations with maintainers may remain in French.
- **Remote**: Targets GitHub (`Fluidise/site`).

## Git & Quality Rules

- **Workflow Guide**: Refer to [`docs/git-workflow.md`](file://docs/git-workflow.md) as the authoritative reference for branching, commit standards, and shipping cadence.
- **Branching**: Trunk-Based development (`main` base; short-lived branches `feat/*`, `fix/*`, `chore/*`, `docs/*`).
- **Shipping Cadence & PRs**: For each completed task unit within a given theme or domain, commit atomically and create a dedicated pull request immediately. Do not delay PR submission or bundle multiple unrelated tasks into a single batch.
- **Commits**: Conventional Commits convention enforced. Dogfooding via `fluidise-clint`.
- **Co-authorship**: Never add `Co-authored-by: Claude` or similar co-author mentions in commit messages.
- **Verification**: Run `bun run check` and `bun run build` before pushing or creating pull requests.
