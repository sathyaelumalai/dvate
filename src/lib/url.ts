/**
 * Every internal link and asset path goes through withBase() so the site works under
 * the GitHub Pages base path (/dvate) and under a custom domain later without edits.
 */
const RAW_BASE = import.meta.env.BASE_URL;
const BASE = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

export function withBase(path = ''): string {
  if (/^(https?:|mailto:|tel:|#)/.test(path)) return path;
  return BASE + path.replace(/^\//, '');
}

/** Route paths, relative to the base. Trailing slashes match GitHub Pages directory output. */
export const routes = {
  home: '',
  vascular: 'services/vascular-access/',
  transfusion: 'services/transfusion/',
  infusion: 'services/infusion-therapy/',
  education: 'education/',
  whoWeServe: 'who-we-serve/',
  about: 'about/',
  contact: 'contact/',
  request: 'contact/#request',
  briefing: 'briefing/',
  privacy: 'privacy/',
} as const;

/** Contact form link with a service pre-selected, for example requestFor('Transfusion'). */
export function requestFor(service: string): string {
  return `contact/?service=${encodeURIComponent(service)}#request`;
}
