import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const toolEntries = await getCollection('tools');
  const sortedTools = toolEntries.sort((a, b) => a.data.order - b.data.order);

  const payload = {
    $schema: 'https://fluidise.dev/schemas/tools.schema.json',
    version: '1.0.0',
    name: 'Fluidise Developer Experience Suite',
    description:
      'Deterministic, standalone, and high-performance developer tools designed for AI coding agents and human maintainers.',
    updatedAt: new Date().toISOString(),
    tools: sortedTools.map((entry) => ({
      id: entry.id,
      name: entry.data.name,
      tagline: entry.data.tagline,
      summary: entry.data.summary,
      status: entry.data.status,
      version: entry.data.version ?? 'latest',
      repoUrl: entry.data.repoUrl,
      endpoints: {
        html: `https://fluidise.dev/tools/${entry.id}`,
        markdown: `https://fluidise.dev/tools/${entry.id}.md`,
      },
      install: {
        brew: entry.data.brewCommand ?? null,
        cargo: entry.data.cargoCommand ?? null,
      },
      keyFeatures: entry.data.keyFeatures,
      cli: entry.data.cli ?? {
        binary: entry.data.name,
        args: [],
        flags: [],
        exitCodes: {
          '0': 'Execution succeeded',
          '1': 'Execution failed',
        },
      },
    })),
  };

  return new Response(JSON.stringify(payload, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
