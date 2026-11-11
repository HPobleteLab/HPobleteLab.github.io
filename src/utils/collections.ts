// src/utils/collections.ts
import type { CollectionEntry } from 'astro:content';

type Member = CollectionEntry<'team'>;

const byOrder = (a: Member, b: Member) =>
  a.data.order - b.data.order || a.data.name.localeCompare(b.data.name);

// Groups team members by category, each group sorted by `order`.
export function groupTeamByCategory(team: Member[]) {
  const of = (category: Member['data']['category']) =>
    team.filter((m) => m.data.category === category).sort(byOrder);

  return {
    pi: of('Principal Investigator')[0],
    postdocs: of('Postdoc'),
    phdStudents: of('PhD Student'),
    researchAssistants: of('Research Assistant'),
    undergraduateStudents: of('Undergraduate Student'),
    alumni: of('Alumni'),
  };
}

// "Eduardo Cubillos Llantén" -> "EC"
export const initials = (name: string) =>
  name
    .replace(/^Dr\.?\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
