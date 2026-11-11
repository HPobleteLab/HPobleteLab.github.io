// src/content.config.ts
import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const teamCollection = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/team' }),
  schema: z.object({
    id: z.string().optional(),
    name: z.string(),
    role: z.string(),
    category: z.enum(['Principal Investigator', 'Postdoc', 'Research Assistant', 'PhD Student', 'Undergraduate Student', 'Alumni']),
    image: z.string().default('/images/team/default.jpg'),
    bio: z.string().optional(),
    orcid: z.string().optional(),
    googleScholar: z.string().url().optional(),
    order: z.number().default(99),
  }),
});

const resourcesCollection = defineCollection({
  loader: glob({ pattern: '**/[^_]*.md', base: "./src/content/resources" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Tutorial', 'Tool']),
    link: z.string().url(),
    actionType: z.enum(['github', 'pdf', 'download', 'link']),
  })
});

export const collections = {
  'team': teamCollection,
  'resources': resourcesCollection,
};

