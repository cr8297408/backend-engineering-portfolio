import preset from '@smart-coder-labs/design-system/tailwind.preset';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  darkMode: 'class',
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    './node_modules/@smart-coder-labs/design-system/dist/**/*.js',
  ],
  theme: {
    extend: {
      // Additional custom styles for React Flow if needed
    },
  },
};
