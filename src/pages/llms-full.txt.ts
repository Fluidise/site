import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const toolEntries = await getCollection('tools');
  const sortedTools = toolEntries.sort((a, b) => a.data.order - b.data.order);
  const manifestoEntries = await getCollection('manifesto');
  const manifestoDoc = manifestoEntries[0];

  const manifestoText =
    manifestoDoc?.body ??
    `
## Principle 01: Agent-First Invariant
Outputs and telemetry are structured as versioned, machine-readable JSON by default.

## Principle 02: Strict Unix Philosophy
Each tool serves a precise, singular purpose. Standalone native binaries with zero heavy runtime overhead.

## Principle 03: Zero Unannounced Mutation
Tools never silently rewrite repository configurations or install unannounced background hooks.
`;

  const toolSections = sortedTools
    .map((tool) => {
      const { data, body = '' } = tool;
      const keyGuarantees = data.keyFeatures.map((f: string) => `- ${f}`).join('\n');
      const installs: string[] = [];
      if (data.brewCommand) installs.push(`Homebrew: ${data.brewCommand}`);
      if (data.cargoCommand) installs.push(`Cargo: ${data.cargoCommand}`);

      let cliInfo = '';
      if (data.cli) {
        cliInfo = `\n### CLI Argument & Execution Contract\n- Binary: \`${data.cli.binary}\`\n`;
        if (data.cli.args.length > 0) {
          cliInfo += `- Arguments: \`${data.cli.args.join(' ')}\`\n`;
        }
        if (data.cli.flags.length > 0) {
          cliInfo +=
            '- Flags:\n' +
            data.cli.flags.map((f) => `  - \`${f.flag}\`: ${f.description}`).join('\n') +
            '\n';
        }
        if (Object.keys(data.cli.exitCodes).length > 0) {
          cliInfo +=
            '- Exit Codes:\n' +
            Object.entries(data.cli.exitCodes)
              .map(([code, desc]) => `  - \`${code}\`: ${desc}`)
              .join('\n') +
            '\n';
        }
      }

      return `---

# Tool Specification: ${data.name}

- **ID**: ${tool.id}
- **Status**: ${data.status} (${data.version ?? 'latest'})
- **Repository**: ${data.repoUrl}
- **Canonical URL**: https://fluidise.dev/tools/${tool.id}
- **Markdown URL**: https://fluidise.dev/tools/${tool.id}.md
- **Installation**: ${installs.join(' | ')}

## Summary & Tagline
${data.tagline}

${data.summary}

## Operational Guarantees
${keyGuarantees}
${cliInfo}
## Detailed Specification
${body.trim()}
`;
    })
    .join('\n\n');

  const fullCorpus = `# Fluidise — Comprehensive Documentation & Agent Context Corpus

> Generated: ${new Date().toISOString()}
> Official Hub: https://fluidise.dev
> Machine Catalog: https://fluidise.dev/tools.json
> Index: https://fluidise.dev/llms.txt

---

# The Fluidise Architectural Manifesto

${manifestoText.trim()}

${toolSections}
`;

  return new Response(fullCorpus, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
