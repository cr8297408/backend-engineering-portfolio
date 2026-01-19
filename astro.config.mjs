// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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