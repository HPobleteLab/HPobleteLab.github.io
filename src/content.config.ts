// src/content.config.ts
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const team = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    category: z.enum([
      'Principal Investigator',
      'Postdoc',
      'Research Assistant',
      'PhD Student',
      'Undergraduate Student',
      'Alumni',
    ]),
    // Path under /public, e.g. "/images/team/jane-doe.jpg". Omit if there is no photo yet.
    image: z.string().optional(),
    bio: z.string().optional(),
    email: z.string().email().optional(),
    orcid: z.string().optional(),
    googleScholar: z.string().url().optional(),
    github: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    // Position inside the member's category (lower comes first).
    order: z.number().default(99),
  }),
});

export const collections = { team };
