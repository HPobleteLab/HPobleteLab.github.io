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

// Shown for members who have no photo yet.
export const NO_IMAGE = '/images/team/no-image.jpg';

// Contact and profile links for a member, in display order.
export const memberLinks = (data: Member['data']) =>
  [
    data.email && { label: 'Email', href: `mailto:${data.email}` },
    data.orcid && { label: 'ORCID', href: `https://orcid.org/${data.orcid}` },
    data.googleScholar && { label: 'Google Scholar', href: data.googleScholar },
    data.github && { label: 'GitHub', href: data.github },
    data.linkedin && { label: 'LinkedIn', href: data.linkedin },
  ].filter(Boolean) as { label: string; href: string }[];
