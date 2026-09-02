# Backend Engineering Portfolio

Astro 5 + React islands portfolio. Each project is a JSON file that drives an interactive
architecture diagram (React Flow) and, where applicable, a live API tester.

## Commands

Dependencies are locked with `package-lock.json` — use npm, not pnpm.

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm ci`          | Install dependencies                          |
| `npm run dev`     | Dev server at `localhost:4321`                |
| `npm run build`   | Static build to `./dist/`                     |
| `npm run preview` | Preview the production build                  |

## Adding a project

Drop a JSON file in `public/data/projects/`. It is picked up automatically by
`src/pages/projects.astro` and `src/pages/projects/[slug].astro` — no registration step.

The shape is `Project` in `src/types/project.ts`:

- `slug` becomes the route (`/projects/<slug>`)
- `featured: true` surfaces it on the home page (first 4 only)
- `diagrams.architecture` renders the interactive diagram; node `icon` values must be one of
  the keys in `iconMap` in `src/components/react/diagram/CustomNodes/ServiceNode.tsx`
- `api` renders the endpoint tester; it requires `diagrams.architecture` because
  `flowVisualization.nodeSequence` references diagram node ids
- `github` and `demo` render as links on the detail page

## Deployment

Pushing to `master` builds and publishes to GitHub Pages via
`.github/workflows/deploy.yml`.

**One-time setup:** the repository must be **public** (GitHub Pages on private repos requires a
paid plan), and Pages must be set to *GitHub Actions* under **Settings → Pages → Source**.

The site is served from a project subpath, so every internal link goes through `withBase()` in
`src/lib/paths.ts` — never hardcode a leading-slash `href`. To move to a custom domain, build
with `BASE_PATH=/ SITE_URL=https://your-domain` and add a `CNAME` file to `public/`.
