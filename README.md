# DVATE website

Static website for DVATE (Distinguished Vascular Access, Transfusion and Education). Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies. GitHub Pages can host it straight from this repository.

## Pages

| File | Page |
|---|---|
| `index.html` | Home |
| `vascular-access.html` | Vascular access services |
| `transfusion.html` | Bedside transfusion |
| `infusion-therapy.html` | Advanced infusion therapies |
| `education.html` | IV Mastery online program and on-site education |
| `who-we-serve.html` | Facility types served |
| `about.html` | Mission, vision, culture, values, leadership |
| `contact.html` | Service request form and direct contacts |
| `privacy.html` | Privacy policy |
| `404.html` | Not-found page (GitHub Pages uses it automatically) |

Shared files:

- `assets/css/styles.css` has every style. Brand colors sit at the top as CSS variables (`--navy`, `--blue`, `--red`).
- `assets/js/main.js` runs the mobile menu, the Services dropdown and the request form.
- `assets/img/` has the logo badge cut from the pamphlet, the favicon, the Apple touch icon and the social share image.
- `sitemap.xml`, `robots.txt` and `.nojekyll` are for search engines and GitHub Pages.

The header and footer are repeated in every HTML file. If you change a menu item, phone number or email, use VS Code's Find in Files (Cmd+Shift+F) and replace it across all files.

## Preview locally in VS Code

1. Open this folder in VS Code.
2. Install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and choose **Open with Live Server**.

## Deploy on GitHub Pages

From this folder in the VS Code terminal:

```bash
git init
git add .
git commit -m "DVATE website"
git branch -M main
git remote add origin https://github.com/sathyaelumalai/dvate.git
git push -u origin main
```

If the repo already has commits, run `git pull origin main --allow-unrelated-histories` before pushing.

Then on GitHub: **Settings > Pages > Build and deployment > Source: Deploy from a branch > Branch: main, folder: / (root) > Save**. The site goes live at `https://sathyaelumalai.github.io/dvate/`.

GitHub Pages on a free account requires a public repository. A private repo needs GitHub Pro, Team or Enterprise.

## Make the request form deliver to an inbox

Out of the box, the form opens the visitor's email app with the request filled in, addressed to Amisha. That works with no setup, but it depends on the visitor having an email app configured.

To have submissions land in an inbox directly:

1. Create a free form at https://formspree.io and copy its endpoint (it looks like `https://formspree.io/f/abcdwxyz`).
2. In `contact.html`, find `data-endpoint=""` on the `<form>` tag and paste the endpoint between the quotes.

The form then posts to Formspree and shows a confirmation on the page. A hidden spam trap field (`_gotcha`) is already in place.

## Connect a custom domain

1. Buy the domain (for example a dvate domain) and add a file named `CNAME` at the root of this repo containing only the domain, such as `www.example.com`.
2. At the domain registrar, point DNS to GitHub Pages (a `CNAME` record for `www` to `sathyaelumalai.github.io`, plus GitHub's four `A` records for the root domain).
3. In GitHub **Settings > Pages**, enter the domain and turn on **Enforce HTTPS**.
4. Find and replace `https://sathyaelumalai.github.io/dvate` with the new domain across all files. It appears in canonical tags, social share tags, `sitemap.xml` and `robots.txt`.

## Content to confirm with Amisha and Mike before launch

- Which domain and email addresses the business will use. The pamphlet lists `www.msconsultants.health` and `@mschealthcare.org` emails under the DVATE brand.
- Whether IV Mastery is DVATE's own program or a partner's, and who accredits the 43 CEUs.
- The facility types and service area the site describes.
- Real photos of the team at work, and short bios with credentials for Amisha and Mike.
- Licensure, accreditation and insurance details that can be shown publicly.
