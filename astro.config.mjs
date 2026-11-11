import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// The site is served from the root of the organization page.
// If the repository is ever renamed to something other than
// <org>.github.io, add `base: '/<repo-name>'` and prefix internal links.
export default defineConfig({
  site: 'https://hpobletelab.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
