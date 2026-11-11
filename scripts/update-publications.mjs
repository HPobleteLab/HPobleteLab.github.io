#!/usr/bin/env node
// Refreshes src/data/publications.json from OpenAlex, using the PI's ORCID.
//
//   npm run update-pubs
//
// The site builds from the committed JSON, so a failed or unreachable API never
// breaks a deploy: on any error this script exits non-zero and leaves the file untouched.
//
// To hide an entry (duplicate, erratum, wrong author match), add its DOI or
// OpenAlex id to src/data/publications-exclude.json and run the script again.
//
// Optional: set OPENALEX_API_KEY in the environment if OpenAlex requires a key.

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const ORCID = '0000-0003-2650-3565'; // Horacio Poblete
const OUT = fileURLToPath(new URL('../src/data/publications.json', import.meta.url));
const EXCLUDE = fileURLToPath(new URL('../src/data/publications-exclude.json', import.meta.url));

const stripTags = (text) => text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

async function fetchAllWorks() {
  const works = [];
  let cursor = '*';
  while (cursor) {
    const url = new URL('https://api.openalex.org/works');
    url.searchParams.set('filter', `author.orcid:https://orcid.org/${ORCID}`);
    url.searchParams.set('sort', 'publication_date:desc');
    url.searchParams.set('per-page', '200');
    url.searchParams.set('cursor', cursor);
    if (process.env.OPENALEX_API_KEY) url.searchParams.set('api_key', process.env.OPENALEX_API_KEY);

    const response = await fetch(url);
    if (!response.ok) throw new Error(`OpenAlex responded ${response.status} ${response.statusText}`);
    const page = await response.json();
    works.push(...(page.results ?? []));
    cursor = page.results?.length ? page.meta?.next_cursor : null;
  }
  return works;
}

function normalize(work) {
  const { first_page, last_page, volume } = work.biblio ?? {};
  return {
    id: work.id,
    title: stripTags(work.title ?? ''),
    authors: (work.authorships ?? []).map((a) => a.author?.display_name).filter(Boolean),
    journal: work.primary_location?.source?.display_name ?? null,
    year: work.publication_year ?? null,
    date: work.publication_date ?? null,
    volume: volume ?? null,
    pages: first_page ? (last_page && last_page !== first_page ? `${first_page}-${last_page}` : first_page) : null,
    doi: work.doi ? work.doi.replace('https://doi.org/', '') : null,
    type: work.type ?? null,
  };
}

const excluded = new Set(JSON.parse(await readFile(EXCLUDE, 'utf8')).map((s) => s.toLowerCase()));
const isExcluded = (pub) =>
  excluded.has(pub.id?.toLowerCase()) || (pub.doi && excluded.has(pub.doi.toLowerCase()));

const seen = new Set();
const publications = (await fetchAllWorks())
  .map(normalize)
  .filter((pub) => pub.title && pub.year && !isExcluded(pub))
  .filter((pub) => {
    // The same paper can appear twice (e.g. preprint + journal version with one DOI).
    const key = pub.doi?.toLowerCase() ?? pub.title.toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

if (publications.length === 0) throw new Error('OpenAlex returned no publications; keeping the existing file.');

await writeFile(OUT, JSON.stringify(publications, null, 2) + '\n');
console.log(`Wrote ${publications.length} publications to src/data/publications.json`);
