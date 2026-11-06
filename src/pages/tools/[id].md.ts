import type { APIRoute, InferGetStaticPropsType } from 'astro';
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const tools = await getCollection('tools');
  return tools.map((tool) => ({
    params: { id: tool.id },
    props: { tool },
  }));
}

type Props = InferGetStaticPropsType<typeof getStaticPaths>;

export const GET: APIRoute = async ({ props }) => {
  const { tool } = props as Props;
  const { data, body = '' } = tool;

  const keyGuarantees = data.keyFeatures.map((f: string) => `- ${f}`).join('\n');
  const installSections: string[] = [];
  if (data.brewCommand) {
    installSections.push(`\`\`\`bash\n# Homebrew (macOS & Linux)\n${data.brewCommand}\n\`\`\``);
  }
  if (data.cargoCommand) {
    installSections.push(`\`\`\`bash\n# Cargo (Rust)\n${data.cargoCommand}\n\`\`\``);
  }

  let cliGuidance =
    'This binary is deterministic and intended for zero-prompt-overhead CI/CD and local agent runs.\n';
  if (data.cli) {
    cliGuidance += `\n- **Binary**: \`${data.cli.binary}\`\n`;
    if (data.cli.args.length > 0) {
      cliGuidance += `- **Default Arguments**: \`${data.cli.binary} ${data.cli.args.join(' ')}\`\n`;
    }
    if (data.cli.flags.length > 0) {
      cliGuidance += '- **Available Flags**:\n';
      for (const flag of data.cli.flags) {
        cliGuidance += `  - \`${flag.flag}\`: ${flag.description}\n`;
      }
    }
    if (Object.keys(data.cli.exitCodes).length > 0) {
      cliGuidance += '- **Exit Codes**:\n';
      for (const [code, desc] of Object.entries(data.cli.exitCodes)) {
        cliGuidance += `  - \`${code}\`: ${desc}\n`;
      }
    }
  }

  const synthesizedMarkdown = `# ${data.name}

> **Status**: ${data.status} (${data.version ?? 'latest'})
> **Distribution**: Standalone Native Binary
> **Repository**: ${data.repoUrl}
> **Canonical HTML**: https://fluidise.dev/tools/${tool.id}

## Tagline & Overview
${data.tagline}

${data.summary}

## Quick Installation
${installSections.join('\n\n')}

## Operational Guarantees
${keyGuarantees}

## Agent & Automation Guidance
${cliGuidance}

## Full Specification & Usage
${body.trim()}
`;

  return new Response(synthesizedMarkdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
