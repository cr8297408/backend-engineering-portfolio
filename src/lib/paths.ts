/**
 * Prefixes a site-absolute path with Astro's configured `base`.
 *
 * Required for GitHub Pages project sites, which are served from
 * `/<repo-name>/` instead of the domain root. Works in .astro files and in
 * React islands alike — Vite inlines `import.meta.env.BASE_URL` at build time.
 */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

/**
 * True when `pathname` points at the site root, accounting for `base`.
 */
export function isHomePath(pathname: string): boolean {
  const home = withBase('/');
  return pathname === home || pathname === home.replace(/\/$/, '');
}
