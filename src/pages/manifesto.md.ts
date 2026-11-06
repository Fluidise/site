import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async () => {
  const manifestoEntries = await getCollection('manifesto');
  const manifestoDoc = manifestoEntries[0];

  const content =
    manifestoDoc?.body ??
    `
# The Fluidise Architectural Manifesto

Every package published under the Fluidise developer experience suite conforms to foundational invariants established in our core specifications.

## Principle 01: Agent-First Invariant
Outputs and telemetry are structured as versioned, machine-readable JSON by default. AI coding agents parse precise byte-range diagnostic spans without error-prone regex or unstructured stdout scraping.

## Principle 02: Strict Unix Philosophy
Each tool serves a precise, singular purpose. Packages remain independently installable, usable, and composable without requiring the adoption of the entire suite or heavy runtime environments.

## Principle 03: Zero Unannounced Mutation
Tools never silently rewrite repository configurations, install unannounced background hooks, or trigger unexpected network requests. Every lifecycle mutation requires explicit user or agent confirmation.
`;

  return new Response(content.trim() + '\n', {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
