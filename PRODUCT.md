# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Developers and maintainers working with AI coding agents who need to discover and evaluate independent developer tools, understand their guarantees, and find installation guides and source repositories.

## Product Purpose

Fluidise Site is the official English-language web hub and documentation portal for the Fluidise developer experience suite. Success means visitors can choose the right tool and get started without adopting the entire suite.

## Positioning

Fluidise takes an agent-first approach: structured outputs, deterministic execution, and explicit mutations. Its tools are independent Unix-style building blocks, usable by both agents and human maintainers. These are product commitments, not a substitute for verifying individual tool behavior.

## Operating Context

Visitors discover the suite on the homepage, explore the tool catalog, read dedicated tool pages, and follow installation instructions or links to GitHub. The homepage also provides an interactive terminal demonstration; demonstrations must not be presented as proof of actual tool execution.

## Capabilities and Constraints

- The current catalog presents `fluidise-clint` (Conventional Commits validation) and `fluidise-relay` (Git hook management).
- Preserve independent tool discovery, dedicated documentation, installation guidance, and repository access.
- Preserve the distinction between read-only inspection and explicitly authorized mutation.
- Documentation, code comments, and commits are written in English. Maintainer conversations may remain in French.
- Published versions, release status, installation availability, supported platforms, performance figures, and detailed execution guarantees require verification against their owning sources before being treated as established facts. Existing site copy alone is not proof.
- No additional product-specific accessibility requirement was established during initialization; this does not waive accessible implementation.

## Brand Commitments

Preserve the Fluidise name and its agent-first terminology. Existing brand assets are available in `public/brand/`, `src/assets/brand/`, and `public/favicon.svg`. Initialization does not authorize a visual redesign or establish new visual constraints.

## Evidence on Hand

- `README.md`: repository purpose, routes, and development workflow.
- `src/content/tools/clint.md` and `src/content/tools/relay.md`: current documentation and catalog content; release and capability claims remain subject to verification.
- `src/components/ManifestoSection.astro`: existing statement of suite principles.
- `src/components/InteractiveTerminal.tsx`: interactive demonstration implementation, not runtime verification of the actual tools.
- Existing brand assets listed above.

No verified publication, installation, or benchmark evidence was established during initialization. Do not invent testimonials, customers, adoption metrics, or performance evidence.

## Product Principles

1. Help visitors choose and start with one tool without requiring suite-wide adoption.
2. Make machine-readable contracts understandable to agents and human maintainers.
3. Distinguish inspection from mutation and make required authorization explicit.
4. Keep documentation claims tied to verifiable tool behavior and release evidence.
