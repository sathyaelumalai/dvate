# DVATE website (v2)

The website for DVATE (Distinguished Vascular Access, Transfusion and Education), built with [Astro](https://astro.build) and GSAP. It builds to static files and deploys to GitHub Pages.

- Live site: https://dvate.org/
- Build spec: [docs/DVATE_Website_v2_Spec.md](docs/DVATE_Website_v2_Spec.md)
- Brand and content source: [dvatepamphlet/](dvatepamphlet/)
- Previous site (reference only, not built): [legacy-v1/](legacy-v1/)

## Run it locally

You need Node.js 22.23 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:4321/ in a browser. Pages reload as you save.

To build the production site and preview it:

```bash
npm run build
npm run preview
```

The built site goes to `dist/`.

## Where things live

| Path | What it holds |
|---|---|
| `src/data/site.ts` | Contact details, content flags, the form endpoint and proof content. Start here for most edits. |
| `src/data/services.ts` | The service lists for vascular access, transfusion and infusion therapy. |
| `src/data/content.ts` | Shared copy: mission, values, steps, what DVATE removes, and the education program (modes, topics, formats). |
| `src/pages/` | One file per page. `src/pages/services/` holds the three service pages. |
| `src/components/` | Header, footer and every page section. |
| `src/scripts/motion/` | One small module per animation (A1 to A9 in the spec). |
| `src/styles/tokens.css` | Colors, type sizes, radii and spacing. |
| `public/` | Files copied as they are: favicon, share image, robots.txt, the DVATE logo (`img/brand/`) and leadership headshots (`img/team/`). |

## Change contact details and flags

Edit `src/data/site.ts`. Every page reads from it.

- `directors`: names, titles, emails, phone numbers, headshots and About page biographies for Amisha and Mike.
- `coverageLine`: the coverage line, currently "We Service Nationwide!". Change it to narrow the service area.
- `educatorExperience`: the instructor's experience shown on the Education page, currently "over 40 years".
- `formEndpoint`: see the next section.

## Connect the request form to Formspree

Out of the box, the Contact form opens the visitor's email app with the request filled in, addressed to Amisha. To have requests land in an inbox directly:

1. Create a free form at https://formspree.io and copy its endpoint. It looks like `https://formspree.io/f/abcdwxyz`.
2. Paste it into `formEndpoint` in `src/data/site.ts`.
3. Commit and push. The site rebuilds and the form posts to Formspree.

A hidden spam trap field (`_gotcha`) is already in the form.

## Switch on the proof components

Four components are built but stay hidden until real content exists. Each one renders nothing while its data is empty, and leaves no gap. In `src/data/site.ts`:

| Setting | Shows | What to add |
|---|---|---|
| `teamPhoto` | A real photo of DVATE nurses in the hero and on the About page | Put the image in `public/img/team/` and set `src`, `alt`, `width` and `height`. |
| `directors.*.headshot` | Headshots on the About page leadership cards (set for both directors; empty shows initials) | Put a square image in `public/img/team/` and set the path. |
| `credentials` | A strip of certifications and licenses | `{ label: 'VA-BC', detail: 'Vascular Access Board Certified' }` |
| `proofNumbers` | Up to four real figures | `{ value: '1,200', label: 'Lines placed in 2026' }` |
| `testimonials` | Quotes from facility staff, used with permission | `{ quote, name, title, facilityType }` |

Add only real, verified content.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes it with `actions/deploy-pages`.

One-time setup in the GitHub repository:

1. The repository must be public (GitHub Pages on a private repository needs a paid plan).
2. Go to **Settings > Pages > Build and deployment** and set **Source** to **GitHub Actions**.

## Custom domain (dvate.org)

The site is served at https://dvate.org. DNS is managed in Cloudflare (nameservers `cesar.ns.cloudflare.com` and `reza.ns.cloudflare.com`). Keep the website records on **DNS only** (grey cloud) so GitHub can issue the HTTPS certificate.

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153 (four records) |
| CNAME | www | sathyaelumalai.github.io |
| MX | @ | smtp.google.com (priority 1) |
| TXT | @ | `v=spf1 include:_spf.google.com ~all` |
| TXT | _dmarc | `v=DMARC1; p=none; fo=1` |

`astro.config.mjs` sets `site` to `https://dvate.org` and `base` to `/`. The custom domain itself is set in GitHub **Settings > Pages**, with **Enforce HTTPS** on. No `CNAME` file is needed because the site deploys through GitHub Actions.

Every internal link goes through `withBase()` in `src/lib/url.ts`, so no other file needs to change.

## Facility briefing

`/briefing/` is a presentation for sales meetings. It is linked in the footer, not the main menu.

- Advance with the arrow keys, the spacebar, the Next button or a swipe.
- Add `?facility=Name` to the address to show "Prepared for Name" on the first and last screens. For example: `https://dvate.org/briefing/?facility=Sunrise%20Care`.
- Print it (Cmd+P) for a leave-behind, one screen per page.
