# HPoblete Lab website

Source of the website of the HPoblete Lab (Bio-nanomaterial Simulations Group), Universidad de Talca, Chile. Built with [Astro](https://astro.build) and Tailwind CSS, and deployed to GitHub Pages as a static site.

## Run it locally

Requires Node.js 22.23.4 or newer (Astro 7).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # production build into dist/
```

## Where things live

```
src/pages/              one file per page (index, research, publications, team, 404)
src/components/         header, footer, home sections, team card
src/content/team/       one JSON file per lab member
src/data/               research lines, funding, publication list (generated) and its exclusion list
src/styles/global.css   typeface, colors and shared styles
public/images/          web-sized photos and renders, served as /images/...
public/fonts/           IBM Plex Sans (self-hosted)
renders-src/            full-resolution renders, not tracked by git
scripts/                update-publications.mjs
```

## Add or edit a team member

Create `src/content/team/first-last.json`:

```json
{
  "name": "First Last",
  "role": "PhD Student",
  "category": "PhD Student",
  "image": "/images/team/first-last.jpg",
  "email": "first.last@utalca.cl",
  "orcid": "0000-0000-0000-0000",
  "bio": "One or two sentences about the project.",
  "order": 5
}
```

`category` must be one of `Principal Investigator`, `Postdoc`, `Research Assistant`, `PhD Student`, `Undergraduate Student`, `Alumni`, and decides the section the member appears in. `order` sorts members inside their section. Every field other than `name`, `role` and `category` is optional; a member without `image` gets the placeholder picture. Photos go in `public/images/team/`, square and at least 200 px wide; they are displayed in black and white automatically (the PI photo stays in colour).

When someone leaves the group, change `category` to `Alumni` and `role` to something like `Former PhD Student (2021-2025)`.

## Edit research lines and funding

Research lines live in `src/data/research.json`: `title`, `summary`, an optional `image` with its `alt` text, and a `papers` array of `{ "title", "venue", "doi" }`. Every line appears on the home page; add `"light": true` when the image has a white background, so it is shown on a white panel instead of as a full-bleed tile.

Funding lives in `src/data/funding.json`, split into `current` (shown on the home page) and `past` (collapsed under "Past funding"). When a grant ends, move it from one list to the other.

## Add an image

Keep the original in `renders-src/` and put a web-sized copy in `public/images/` (JPEG for opaque renders, WebP for transparent ones, around 1600 to 2400 px wide and under 400 kB). Files over 100 MB cannot be pushed to GitHub.

## Update the publication list

The list is fetched from [OpenAlex](https://openalex.org) using the PI's ORCID and stored in `src/data/publications.json`:

```bash
npm run update-pubs
```

Commit the updated file. The deploy workflow also refreshes the list on every run and once a week, falling back to the committed file if OpenAlex is unreachable.

To hide an entry (a duplicate, an erratum, a wrong author match), add its DOI or OpenAlex id to `src/data/publications-exclude.json` and run the command again.

Author names are highlighted by the patterns in `src/utils/textFormatters.ts`; add new members there.

## Deployment

Every push to `main` builds and publishes the site through `.github/workflows/deploy.yml`. One-time setup in the GitHub repository: Settings → Pages → Build and deployment → Source: **GitHub Actions**.

The site URL is set in `astro.config.mjs` (`site`). Internal links assume the site is served from the domain root, which is the case for a repository named `<organization>.github.io` or for a custom domain.
