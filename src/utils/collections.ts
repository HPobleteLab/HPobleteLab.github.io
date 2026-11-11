// src/utils/collections.ts
import type { CollectionEntry } from 'astro:content';

// 1. ORDENAR PUBLICACIONES (Por año y luego por orden)
export const sortPublications = (publications: CollectionEntry<'publications'>[]) => {
  return publications.sort((a, b) => {
    const yearDiff = parseInt(b.data.year) - parseInt(a.data.year);
    if (yearDiff !== 0) return yearDiff;
    return (a.data.order || 99) - (b.data.order || 99);
  });
};

// 2. EXTRAER CATEGORÍAS ÚNICAS DE PUBLICACIONES
export const getPublicationCategories = (publications: CollectionEntry<'publications'>[]) => {
  return [...new Set(publications.map(pub => pub.data.category || pub.data.year))].sort((a,b) => b.localeCompare(a));
};

// 3. AGRUPAR AL EQUIPO POR ROLES
export function groupTeamByCategory(team) {
  return {
    pi: team.find(m => m.data.category === 'Principal Investigator'),
    postdocs: team.filter(m => m.data.category === 'Postdoc' || m.data.category === 'Postdoctoral Researcher'),
    phdStudents: team.filter(m => m.data.category === 'PhD Student'),
    researchAssistants: team.filter(m => m.data.category === 'Research Assistant'),
    undergraduateStudents: team.filter(m => m.data.category === 'Undergraduate Student'),
    alumni: team.filter(m => m.data.category === 'Alumni' || m.data.category === 'Former Mentee')
  };
}

// 4. ORDENAR GENÉRICO POR VARIABLE "ORDER" (Para Research Lines)
export const sortByOrder = <T extends { data: { order?: number } }>(items: T[]) => {
  return items.sort((a, b) => (a.data.order || 99) - (b.data.order || 99));
};