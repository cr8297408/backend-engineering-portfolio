// @ts-check
import { defineConfig } from 'astro/config';

import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(), // Enable React for islands
    tailwind({
      applyBaseStyles: false, // Use design system's base styles
    }),
  ],
  output: 'static', // Static site generation
  build: {
    inlineStylesheets: 'auto',
  },
});