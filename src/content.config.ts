import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const tools = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/tools' }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    summary: z.string(),
    status: z.enum(['released', 'in-progress', 'scoping']),
    version: z.string().optional(),
    color: z.enum(['copper', 'plum', 'emerald']),
    icon: z.string(),
    repoUrl: z.string().refine(
      (url) => {
        try {
          const parsed = new URL(url);
          return parsed.protocol === 'https:';
        } catch {
          return false;
        }
      },
      { message: 'repoUrl must be a valid HTTPS URL' },
    ),
    brewCommand: z.string().optional(),
    cargoCommand: z.string().optional(),
    keyFeatures: z.array(z.string()),
    order: z.number().default(0),
  }),
});

export const collections = { tools };
