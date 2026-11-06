import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const toolEntries = await getCollection('tools');
  const sortedTools = toolEntries.sort((a, b) => a.data.order - b.data.order);

  const toolLines = sortedTools
    .map(
      (tool) =>
        `- [${tool.data.name}](https://fluidise.dev/tools/${tool.id}.md): ${tool.data.tagline} (Status: ${tool.data.status})`,
    )
    .join('\n');

  const content = `# Fluidise

> Fluidise is an Agent-First developer experience suite providing deterministic, standalone, and high-performance tools designed for AI coding agents and human maintainers.

## Core Documentation & Specifications

- [Architectural Manifesto](https://fluidise.dev/manifesto.md): Core invariants (Agent-First Invariant, Strict Unix Philosophy, Zero Unannounced Mutation).
- [Machine Catalog](https://fluidise.dev/tools.json): Standardized JSON manifest of all tools, versions, installation commands, and CLI argument schemas.
- [Full LLM Context](https://fluidise.dev/llms-full.txt): Complete aggregated documentation corpus for single-prompt LLM ingestion.

## Standalone Tools Catalog

${toolLines}

## Key Agent Invariants

1. **Structured Outputs**: All tools default to structured, versioned JSON on stdout. Do not write regex or regex scrapers for stdout.
2. **Zero Unannounced Mutation**: No tool silently mutates filesystem configurations, installs hidden background hooks, or makes unsolicited network requests.
3. **Deterministic Execution**: Native Rust standalone binaries with stable POSIX exit codes (0 = success, 1 = failure).

## Quick Agent Rules & Integration

### Git Conventional Commits with Clint
When creating or validating Git commits in repos using Fluidise:
\`\`\`bash
# Install via Homebrew
brew install Fluidise/homebrew-tap/fluidise-clint

# Check commit message directly
fluidise-clint "feat: message subject"
\`\`\`

### Git Hook Orchestration with Relay
\`\`\`bash
# Inspect planned hook pipeline without mutating disk
fluidise-relay plan
\`\`\`
`;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
