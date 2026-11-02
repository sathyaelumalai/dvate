# DVATE website (v2)

The website for DVATE (Distinguished Vascular Access, Transfusion and Education), built with [Astro](https://astro.build) and GSAP. It builds to static files and deploys to GitHub Pages.

- Live site: https://sathyaelumalai.github.io/dvate/
- Build spec: [docs/DVATE_Website_v2_Spec.md](docs/DVATE_Website_v2_Spec.md)
- Brand and content source: [dvatepamphlet/](dvatepamphlet/)
- Previous site (reference only, not built): [legacy-v1/](legacy-v1/)

## Run it locally

You need Node.js 22.23 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:4321/dvate/ in a browser. Pages reload as you save.

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
| `src/data/content.ts` | Shared copy: mission, values, steps, what DVATE removes. |
| `src/pages/` | One file per page. `src/pages/services/` holds the three service pages. |
| `src/components/` | Header, footer and every page section. |
| `src/scripts/motion/` | One small module per animation (A1 to A9 in the spec). |
| `src/styles/tokens.css` | Colors, type sizes, radii and spacing. |
| `public/` | Files copied as they are: favicon, share image, robots.txt, the logo badge. |

## Change contact details and flags

Edit `src/data/site.ts`. Every page reads from it.

- `directors`: names, titles, emails and phone numbers for Amisha and Mike.
- `coverageLine`: the coverage line, currently "We Service Nationwide!". Change it to narrow the service area.
- `showCeuCount`: set to `false` to hide "43 free CEUs" everywhere it appears.
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
| `directors.*.headshot` | Headshots on the About page leadership cards (initials show until then) | Put the image in `public/img/team/` and set the path. |
| `credentials` | A strip of certifications and licenses | `{ label: 'VA-BC', detail: 'Vascular Access Board Certified' }` |
| `proofNumbers` | Up to four real figures | `{ value: '1,200', label: 'Lines placed in 2026' }` |
| `testimonials` | Quotes from facility staff, used with permission | `{ quote, name, title, facilityType }` |

Add only real, verified content.

## Deploy

Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site with `withastro/action` and publishes it with `actions/deploy-pages`.

One-time setup in the GitHub repository:

1. The repository must be public (GitHub Pages on a private repository needs a paid plan).
2. Go to **Settings > Pages > Build and deployment** and set **Source** to **GitHub Actions**.

## Add a custom domain

1. Add a file named `CNAME` in `public/` that contains only the domain, for example `www.example.com`.
2. At the domain registrar, add a `CNAME` record for `www` pointing to `sathyaelumalai.github.io`, plus GitHub's four `A` records for the root domain (listed in GitHub's Pages documentation).
3. In `astro.config.mjs`, set `site` to `https://www.example.com` and `base` to `/`. Update the sitemap URL in `public/robots.txt`.
4. In GitHub **Settings > Pages**, enter the domain and turn on **Enforce HTTPS**.

Every internal link goes through `withBase()` in `src/lib/url.ts`, so no other file needs to change.

## Facility briefing

`/briefing/` is a presentation for sales meetings. It is linked in the footer, not the main menu.

- Advance with the arrow keys, the spacebar, the Next button or a swipe.
- Add `?facility=Name` to the address to show "Prepared for Name" on the first and last screens. For example: `https://sathyaelumalai.github.io/dvate/briefing/?facility=Sunrise%20Care`.
- Print it (Cmd+P) for a leave-behind, one screen per page.
