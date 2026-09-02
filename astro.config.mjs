// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// Deployed as a GitHub Pages *project* site: https://cr8297408.github.io/backend-engineering-portfolio/
// `base` is overridable so the same build works on a custom domain (BASE_PATH=/).
const BASE_PATH = process.env.BASE_PATH ?? '/backend-engineering-portfolio';

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL ?? 'https://cr8297408.github.io',
  base: BASE_PATH,
  integrations: [
    react(), // Enable React for islands
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  output: 'static', // Static site generation
  build: {
    inlineStylesheets: 'auto',
  },
});
