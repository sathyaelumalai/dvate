# DVATE Website v2: Build Spec

Hand this file to the coding agent in VS Code (plan mode). The agent reads it end to end, writes a plan, waits for approval, then builds. Everything the agent needs is in this file or in this repository.

---

## 0. Rules for the agent

Read these before planning. They apply to code, copy, comments, commit messages and your own reports.

1. **No em dashes anywhere.** Not in page copy, alt text, code comments, commit messages or your status reports. Use commas, periods, colons or parentheses.
2. **No time estimates.** Do not estimate hours, days or effort in the plan or in reports. State sequence and dependencies only.
3. **No invented facts.** Do not invent statistics, testimonials, client names, logos, accreditations, response times, success rates or prices. Every claim on the site must come from Section 3 of this spec. Where real proof belongs later, build the component and keep it switched off (see Section 9).
4. **Plan first.** In plan mode, return: the file tree you will create, the component list, the animation inventory mapped to components, the build phases in order, and any questions. Then stop and wait.
5. **Work in phases** (Section 12). Commit at the end of each phase with a plain message such as `Phase 2: home page sections`.
6. **Accessibility and reduced motion are required, not optional.** Every animation must have a static fallback that shows the final state.
7. When a phase is done, report what changed, what you checked, and anything you could not do. Keep the report short.

---

## 1. What we are building and why

DVATE (Distinguished Vascular Access, Transfusion and Education) sends nurses into care facilities to place PICC lines, midlines and IVs, run non-emergent blood transfusions, deliver infusion therapy and train facility staff. The founders, Amisha Baker (Director of Business Development) and Mike Baker (Director of Clinical Operations), use this site to win facility contracts.

**The site has one job:** make a skilled nursing administrator or director of nursing (DON) think, "I can stop sending residents to the hospital for this," and then request service.

**Who visits:**
- Facility administrators and DONs at skilled nursing, assisted living, LTACH, rehab, home health and hospice. This is the main buyer.
- Physicians and nurse practitioners who round in long-term care.
- Staff development and nurse educators.
- Amisha and Mike themselves, screen-sharing the site during sales calls (see the Facility Briefing page, Section 6.10).

**What sets DVATE apart from competitors** (EPICC Vascular, Dynamic Access, TridentCare): none of them offers bedside transfusion. DVATE covers the line, the blood and the infusion with one team, plus a staff education subscription. The site leads with that.

**v1 already exists** at the repo root (static HTML in `index.html`, `vascular-access.html`, etc.). v2 replaces it with a new design, new motion and a reusable component structure. v1 copy is the starting point for detail pages; improve it, do not discard it.

---

## 2. Tech stack

| Choice | Why |
|---|---|
| **Astro** (latest stable), static output | Shared header and footer as components instead of copy-paste across 10 files. Ships zero JS by default, so the site stays fast. |
| **GSAP + ScrollTrigger** (latest stable, installed from npm) | Scroll-linked and timeline animation. GSAP and all its plugins are free to use. |
| **Plain CSS with custom properties**, one global stylesheet plus scoped component styles | Full control over the look. No Tailwind. |
| **No UI framework** (no React, no Vue) | Nothing on this site needs client-side state beyond small scripts. |
| **Fonts via `@fontsource`** packages (self-hosted) | No Google Fonts request, no layout shift. |
| **GitHub Pages via GitHub Actions** (`withastro/action`) | Free hosting from `github.com/sathyaelumalai/dvate`. |

Astro config: `site: 'https://sathyaelumalai.github.io'`, `base: '/dvate'`. All internal links and asset paths must respect `base` (use `import.meta.env.BASE_URL`). When a custom domain is added later, only `site` and `base` change.

### Repo housekeeping

1. Move the v1 files (`*.html`, `assets/`, `sitemap.xml`, `robots.txt`, `.nojekyll`) into `legacy-v1/` so they stay available for reference. Exclude that folder from the build.
2. Keep `dvatepamphlet/` where it is. It is the source of truth for brand and content.
3. Keep `DVATE_Website_Plan.docx` and `.gitignore` as they are.
4. Create the Astro project at the repo root.

---

## 3. Source content (the only facts you may use)

Read the pamphlet images in `dvatepamphlet/` and the v1 pages in `legacy-v1/`. The facts:

**Name:** DVATE, Distinguished Vascular Access, Transfusion and Education. Said like "deviate." Tagline: **From the Ordinary.**

**Core promise:** No transport. No disruption. No exposure. High-level care brought to the patient's environment.

**Mission:** To DVATE from the ordinary and be the leading force in setting new standards in vascular access, transfusion and education: ensuring every patient receives the right access, the right way, the first time.

**Vision:** To revolutionize vascular access, expand the boundaries of transfusion care and empower nurses through advanced education, so that DVATE-ing from the ordinary becomes the new standard in patient care.

**Culture:** We innovate with precision, where every action is intentional and clinically excellent. Our culture is built on mastery, accuracy and a relentless commitment to continuous improvement. Because excellence is our standard.

**Values:** Excellence (every action is deliberate and rooted in doing things right the first time). Mastery (we pursue deep expertise; growth is our default setting). Improvement (we embrace feedback, challenge assumptions and evolve constantly, because progress is a habit). Integrity (honesty, accountability and respect for patients, peers and ourselves). Collaboration (the best outcomes come from diverse minds working together with shared goals and mutual trust). Transparency (we communicate openly, share information freely and make decisions with clarity).

**Vascular access services:** Ultrasound-guided PICC line, midline and PIV placement. Removal of vascular access devices. Vascular access consultations. Mediport access, de-access and maintenance. De-clotting of vascular access devices. Dressing changes. Blood draws.

**Transfusion:** Non-emergent blood and blood component transfusions, performed at the bedside by trained infusion nurses.

**Advanced infusion therapies** (delivered in coordination with the care team to support recovery and chronic management): IV antibiotics and antivirals. Iron infusions. IVIG/SCIG therapy. Hydration and electrolyte support. Anti-inflammatory and steroid infusions. Wellness IV therapy.

**Education, online through IV Mastery:** yearly subscription for all staff. 17 modules, each with video trainings and tutorials, competency checklists, clinical posters and a certificate of completion. Competency certificate after a skills assessment by a designated facility preceptor. 43 free CEUs with the yearly subscription.

**Education, on-site:** classroom instruction plus practical, hands-on training at the facility, tailored to its operations.

**What DVATE removes for a facility:** transportation costs (procedures done at the facility); hospital infections (no hospital exposure); patient anxiety (care in their own bed); vascular complications (only the highest quality catheters); the high cost of transfusions (at the facility instead of a hospital); CMS penalties (fewer hospital admissions).

**Coverage:** "We Service Nationwide!"

**Contacts:**
- Amisha Baker, Director of Business Development, amisha.b@mschealthcare.org, (772) 867-4818
- Mike Baker, Director of Clinical Operations, mike.b@mschealthcare.org, (772) 867-4737

Put every contact detail in one file, `src/data/site.ts`, so they can be changed in one place. These details are under review and will likely change.

**Content flags (follow exactly):**
- Wellness IV therapy appears only as the last item on the Infusion page. Never on the home page.
- "43 free CEUs" appears on the Education page and in the education section of the home page only. Wrap it in a flag in `site.ts` (`showCeuCount: true`) so it can be switched off in one place.
- "Nationwide" appears as written in the pamphlet. Read it from `site.ts` (`coverageLine`) so it can be changed to a narrower line later.
- Always say "non-emergent" for transfusion, and show "For a medical emergency, call 911" in the footer and on the Transfusion and Contact pages.

---

## 4. Design direction

### 4.1 The idea: "The Line"

Every DVATE service starts with a line: a catheter threaded into a vein. The site is built around one continuous line.

- On load, a catheter line **draws itself** across the hero and ends in the DVATE blood drop, which **fills** with red and gives **one heartbeat pulse**.
- As the visitor scrolls, the same line **keeps threading down the page**, connecting each section like a line running from the arm to the heart. It lights a node at each section.
- The line ends at the final call to action, where the drop pulses once more next to the "Request service" button.

This is the one bold idea. Everything around it stays calm, clean and clinical. Do not add competing decorative effects.

### 4.2 Color

New palette. The pamphlet's red and blue stay recognizable, but deeper and sharper than v1.

| Token | Hex | Use |
|---|---|---|
| `--vein` | `#0B1F3A` | Primary dark. Hero, dark sections, footer. |
| `--vein-2` | `#14325C` | Raised surfaces on dark sections, hover on dark. |
| `--artery` | `#E5322D` | The drop, the line, primary buttons, large display accents. |
| `--artery-text` | `#C42620` | Red text on light backgrounds (passes AA at body size). |
| `--saline` | `#1FB5EA` | The catheter tubing, links on dark, focus rings, data highlights. |
| `--bone` | `#F5F8FB` | Light section background (cool, never cream). |
| `--white` | `#FFFFFF` | Cards and form fields. |
| `--steel` | `#56677F` | Secondary text on light. |
| `--rule` | `#DAE3EE` | Dividers and borders on light. |
| `--mist-on-dark` | `#B8CBE2` | Secondary text on dark. |

Rules:
- `--artery` (`#E5322D`) is for large text, graphics and button backgrounds only. Use `--artery-text` for red text under 24px on light backgrounds.
- Check every text and background pair against WCAG AA. Fix any pair that fails before moving on.
- Dark and light sections alternate in a deliberate rhythm (Section 5). Never stack two dark sections back to back.

### 4.3 Type

| Role | Face | Settings |
|---|---|---|
| Display and headings | **Archivo** (variable, `@fontsource-variable/archivo`) | Width axis set wide (`font-stretch: 112%` to `125%`), weight 750 to 850 for H1 and H2, tight tracking (`-0.02em`). Clinical and industrial, like device labeling. |
| Body, UI, forms | **Atkinson Hyperlegible** (`@fontsource/atkinson-hyperlegible`) | Built by the Braille Institute for legibility. Fits a health audience that skews older. 400 and 700. |
| Numbers in data moments | Archivo with `font-variant-numeric: tabular-nums` | For counters, module counts, step numbers. |

Type scale (fluid with `clamp()`): body 18px, small 15px, H3 24px, H2 40 to 56px, H1 48 to 88px. Body line length capped at 68 characters. Line height 1.6 for body, 1.05 to 1.1 for display.

Do not:
- Put a single word in a headline in a different color or italic.
- Use all-caps labels or small tracked-out eyebrow text above headings.
- Add an arrow character to the end of link or button text.

The one exception to the color rule is the DVATE wordmark, where "DV" is red and "ATE" is blue, as in the logo.

### 4.4 Shape, space, imagery

- Corners: buttons fully rounded (pill). Panels and cards 18px. Inputs 10px. Not one radius for everything.
- Generous space: sections get at least 112px vertical padding on desktop and 72px on mobile.
- No stock photography. Until real photos of DVATE nurses arrive, the visuals are the line, the drop, the anatomy schematic (Section 6.3) and typography.
- Leave one clearly built `<TeamPhoto>` slot in the hero and About page that is hidden until a photo path is set in `site.ts`.
- Logo: use `legacy-v1/assets/img/dvate-badge.png` for the badge. Build a clean SVG wordmark (drop icon plus "DVATE") for the header and favicon.

---

## 5. Site map

| Route | Page | Main call to action |
|---|---|---|
| `/` | Home | Request service |
| `/services/vascular-access` | Vascular access | Request a placement |
| `/services/transfusion` | Transfusion | Request transfusion service |
| `/services/infusion-therapy` | Advanced infusion therapies | Request infusion service |
| `/education` | Education | Ask about education |
| `/who-we-serve` | Who we serve | Check service for your facility |
| `/about` | About | Request service |
| `/contact` | Contact and service request | Send request |
| `/briefing` | Facility Briefing (sales mode, not in main nav) | Request service |
| `/privacy` | Privacy policy | None |
| `404` | Not found | Go to the home page |

**Header:** wordmark left; nav: Services (dropdown with the three service pages, each with a one-line description), Education, Who we serve, About, Contact; red pill button "Request service". The header is transparent over the dark hero and turns solid white with a hairline border once the visitor scrolls past the hero (animated, 200ms). On mobile, a full-screen menu that slides down, with tap-to-call buttons for both directors at the bottom.

**Footer:** dark (`--vein`). Wordmark, one-line description, the three service links, company links, both directors' contact details, the 911 line, copyright with the current year.

**Home page section rhythm:** Hero (dark), Services (light), Old way vs DVATE way (dark), What DVATE removes (light), How a visit works (light, `--bone`), Education (dark), Who we serve (light), Mission (dark, short), Final call to action (light). Adjust if two dark sections end up adjacent.

---

## 6. Pages and sections

### 6.1 Home: Hero

Full viewport height on desktop (min 640px), dark `--vein` background.

- **Left column:** H1: "Vascular access, transfusion and infusion care at the bedside." Below it, the lede: "DVATE nurses come to your facility to place PICC lines, midlines and ultrasound-guided IVs, run non-emergent transfusions and deliver infusion therapy. Your residents stay in their own beds." Then the three-part promise on its own line, large: "No transport. No disruption. No exposure." Then two buttons: "Request service" (red pill) and "See our services" (outline, white).
- **Right column:** the animated line and drop (Section 7, animation A1).
- **Bottom of hero:** a small scroll cue: a short vertical saline-blue line that gently extends and retracts. Hide it after the first scroll.

### 6.2 Home: One team for the line, the blood and the infusion

Heading: "One team for the line, the blood and the infusion."
Lede: "Most facilities call one vendor for a PICC, send residents out for a transfusion and juggle a third for IV therapy. DVATE handles all three at the bedside."

Three service panels side by side (stacked on mobile). Each panel: service name, one-sentence description, the full service list from Section 3, link to its page. Panels are not identical cards: Vascular access gets the widest panel because it has the most services; Transfusion gets a red top edge to mark it as the service most facilities still send residents out for. Do not name competitors or make claims about them on the site.

### 6.3 Home: The old way vs the DVATE way (signature scroll moment)

Dark section. Pinned while the visitor scrolls through it (animation A3).

Heading: "A transfusion should not take a day out of a resident's life."

- **The old way**, shown as a vertical chain of six steps: "Book an ambulance." "Wait for transport." "Wait in the emergency department or infusion center." "The transfusion." "Ride back to the facility." "Watch for a readmission."
- **The DVATE way**, one step: "A DVATE nurse comes to the bedside."

As the visitor scrolls, the six old-way steps collapse into the single DVATE step and the line runs straight through it. End state shows both side by side with the caption: "No transport. No disruption. No exposure."

No numbers, no costs, no times. The visual collapse makes the point.

### 6.4 Home: What DVATE removes

Light section. Heading: "DVATE from the ordinary." with "DV" red and "ATE" blue as in the wordmark. Short line: "Our name is a promise to deviate from the way bedside care usually goes. Here is what a DVATE visit takes off your facility's plate."

Six items in a 3 by 2 grid (2 by 3 on tablet, 1 column on mobile), one per item in Section 3 ("What DVATE removes"). Each item: a bold title (Transport costs, Hospital infections, Patient anxiety, Vascular complications, The high cost of transfusions, CMS penalties) and one sentence. Titles get a red strike line that draws through them as they enter the viewport (animation A5), since these are things DVATE removes.

### 6.5 Home: How a DVATE visit works

`--bone` background. Four numbered steps (this is a real sequence, so numbers are correct here). The page line threads through the four step nodes (animation A6).

1. **Send the order.** Call, email or use the request form. Share the physician order and what the resident needs.
2. **We confirm and schedule.** Our clinical team reviews the order, confirms the right device or therapy and sets a visit time with your staff.
3. **A DVATE nurse comes to the bedside.** The nurse arrives with ultrasound and supplies and performs the procedure in the resident's room.
4. **Hand-off to your team.** We document the procedure for your chart and walk your nurses through care and maintenance.

Beside the steps, a short note: "DVATE provides scheduled, non-emergent care. For a medical emergency, call 911."

### 6.6 Home: Education

Dark section. Heading: "Education that stays with your staff."

Left: one paragraph on IV Mastery and on-site training, and an "Explore education" button. Right: a grid of 17 small tiles, one per module, that fill in sequence when the section enters view, followed by two counters: "17 modules" and "43 free CEUs with the yearly subscription" (counter respects `showCeuCount`). Animation A7.

### 6.7 Home: Who we serve

Light. Heading: "Built for the places residents live and recover." Four rows, each with a facility type and one sentence (copy in `legacy-v1/index.html`). Link to the Who we serve page.

### 6.8 Home: Mission and final call to action

Mission: dark, short section. One large line in white display type: "Every patient receives the right access, the right way, the first time." Small caption: "The DVATE mission."

Final call to action: light. Heading: "Bring DVATE to your facility." One sentence: "Tell us what your residents need and where you are. We will set up a time to talk through services, scheduling and pricing." Buttons: "Request service" and "Call (772) 867-4818". The page line ends here in the drop, which pulses once when this section enters view (animation A1, final beat).

### 6.9 Service pages, Education, Who we serve, About, Contact, Privacy, 404

Start from the v1 copy in `legacy-v1/` and keep its structure: a dark page header with breadcrumb, H1 and lede; then content sections; then the final call to action block.

Additions for v2:

- **Vascular access:** add the **Device Map**, an interactive schematic of a torso and arm (clean line drawing, not realistic anatomy). Four hotspots: Peripheral IV (forearm), Midline (upper arm, catheter tip below the armpit), PICC (upper arm, catheter tip near the heart), Port (upper chest). Tapping or hovering a hotspot draws that device's path along the vein in saline blue and shows a short panel: what it is, typical use (from v1 copy), and the related DVATE services. Keyboard accessible (tab between hotspots, Enter to select). Animation A8.
- **Transfusion:** the four-step transfusion sequence from v1 uses the same threaded-line step component as the home page. Keep the "not for emergencies" panel.
- **Infusion therapy:** six therapies from v1. Wellness IV therapy is last and visually quieter.
- **Education:** the 17-tile module grid and counters (A7) at the top; the four-step "How the online program works" sequence; on-site topics list from v1.
- **Who we serve:** five facility types from v1. Add the **Transfer Calculator** (Section 6.11).
- **About:** mission, vision, culture, the six values, leadership. Values reveal in a staggered sequence once (A4). Leadership cards for Amisha and Mike use initials in colored circles until headshots are set in `site.ts`.
- **Contact:** the service request form from v1 (same fields, same "do not include patient information" notice, same `?service=` pre-select). On successful send, the submit button turns into a drop that fills and a confirmation line appears (A9). Form delivery: post to the endpoint in `site.ts` (`formEndpoint`, for Formspree). If the endpoint is empty, fall back to a `mailto:` to Amisha with the request filled in, as v1 does.
- **Privacy and 404:** carry over from v1, restyled.

### 6.10 Facility Briefing (`/briefing`), the sales tool

This page exists to win contracts. Amisha and Mike open it on a laptop or share their screen during a meeting with a DON and walk through it like a short presentation.

- Not linked in the main nav. Linked in the footer as "Facility briefing."
- Full-screen sections, one idea per screen, that advance with the arrow keys, spacebar, a click on a "Next" button or a swipe. A thin progress line at the top (the DVATE line) fills as they advance.
- Screens, in order:
  1. DVATE wordmark and "From the Ordinary." The line draws and the drop fills.
  2. "Your residents should not leave the building for a line, a transfusion or an infusion."
  3. The old way vs the DVATE way collapse (reuse A3, stepped instead of scrubbed).
  4. Vascular access services.
  5. Transfusion at the bedside.
  6. Advanced infusion therapies.
  7. Education: IV Mastery and on-site.
  8. How a visit works (the four steps).
  9. The Transfer Calculator.
  10. "Let's start with your residents." Both directors' contact details and a "Request service" button.
- Add `?facility=Name` support: when present, screen 1 and screen 10 show "Prepared for [Name]". Sanitize the value and limit it to 60 characters.
- Include a print stylesheet so the briefing prints as a clean leave-behind, one screen per page, no animations.

### 6.11 Transfer Calculator (Who we serve page and Briefing screen 9)

A small tool that uses **the facility's own numbers**. It ships with no default values and no DVATE estimates.

Inputs:
- Residents sent out each month for a line, transfusion or IV therapy (number)
- Your estimated cost per transfer, including transport and staff time (dollars)

Output: "That is about [monthly total] a month and [yearly total] a year spent sending residents out for care DVATE can bring to the bedside." Numbers animate to their value when the result appears.

Below the result, a line: "These figures come from the numbers you entered. Talk with us about pricing for your facility." and a "Request service" button that passes `?service=Not sure yet` to the contact form.

---

## 7. Animation inventory

Use GSAP and ScrollTrigger. Each animation lives in its own small module under `src/scripts/motion/` and runs only on pages that use it.

| ID | Name | Where | Behavior |
|---|---|---|---|
| A1 | Line and drop | Home hero, final CTA, Briefing screen 1 | SVG catheter path draws in with `stroke-dashoffset` (about 1.6s, ease `power2.inOut`). The tubing is saline blue with a lighter inner highlight stroke; the connector hubs fade in at the end. When the line reaches the drop, the drop fills red from bottom to top with a clip-path (0.6s), then one heartbeat scale pulse (1 to 1.06 to 1, then a smaller second beat). Headline lines reveal with a mask slide-up, staggered 0.08s, starting with the line draw. This is the only page-load sequence on the site. |
| A2 | The thread | Home page, full length (desktop only, 1024px and up) | A fixed SVG line in the left gutter whose drawn length is scrubbed to page scroll progress. A node sits at each major section and switches from outline to filled saline blue when its section reaches the middle of the viewport. On smaller screens, replace it with a 3px progress line under the header. |
| A3 | Old way collapse | Home 6.3, Briefing screen 3 | Section pins for about 1.5 viewport heights of scroll. Scrubbed timeline: the six old-way steps slide together and fade to 20% opacity while the single DVATE step scales in and the red line runs straight through it. Unpins at the end state. On Briefing, play the same timeline on "Next" instead of on scroll. |
| A4 | Stagger reveal | About values, Who we serve rows | Items fade up 16px with a 0.06s stagger, once, when the group enters the viewport. Use this sparingly: only these two places. |
| A5 | Strike-through | Home 6.4 | A red line draws through each title (left to right, 0.5s) as the item enters view. |
| A6 | Threaded steps | Home 6.5, Transfusion, Education | The connecting line between step nodes draws as the section scrolls; each node fills as the line reaches it. |
| A7 | Module grid and counters | Home 6.6, Education | The 17 tiles fill one by one (0.04s stagger) when the grid enters view; counters count up to 17 and 43 with `tabular-nums` so the width does not jump. |
| A8 | Device Map | Vascular access | On hotspot selection, the device path draws along the vein (0.7s) and the info panel cross-fades. Previous path retracts. |
| A9 | Form success | Contact | Submit button morphs into a drop that fills red; a confirmation line fades in below. On error, the button shakes once (4px, 3 cycles) and the error text appears. |
| A10 | Header state | All pages | Header background and border fade in after the hero leaves the viewport. |

**Interaction motion (allowed everywhere):** button hover color shift (150ms), focus rings, dropdown open (fade and 6px slide, 150ms), mobile menu slide.

**Not allowed:** fade-in on every section, parallax backgrounds, hover lift-and-shadow on every card, autoplaying carousels, cursor followers, particles, scroll hijacking beyond the A3 pin.

### Reduced motion

When `prefers-reduced-motion: reduce` is set:
- No GSAP timelines run. Every element renders in its final state (lines fully drawn, drop filled, counters at final values, steps all filled, A3 shown in its end state without pinning).
- The Briefing page still advances screen by screen, with an instant change instead of transitions.

### Performance limits

- Load GSAP only on pages that use it, with dynamic imports.
- Animate only `transform`, `opacity`, `stroke-dashoffset` and `clip-path`.
- Lighthouse on the home page (mobile): Performance 90 or higher, Accessibility 100, Best Practices 100, SEO 100. Fix anything below before finishing.
- No layout shift from fonts or animations (CLS under 0.05).

---

## 8. Copy rules

All copy on the site follows these rules.

- Plain verbs: "use," not "utilize"; "help," not "facilitate"; "is," not "serves as."
- Sentence case for headings and buttons.
- Buttons say exactly what happens: "Request service," "Send request," "Call (772) 867-4818."
- Do not use: seamless, robust, holistic, cutting-edge, state-of-the-art, world-class, leverage, empower (except where quoting the DVATE vision), elevate, unlock, journey, navigate (as a metaphor), transformative, game-changer, "in today's fast-paced world."
- No sentences that end with a comma plus an -ing phrase that comments on the sentence.
- No "it's not X, it's Y" constructions.
- No em dashes (Rule 1).
- Every claim traces to Section 3. If a sentence needs a fact that is not there, cut the sentence.

---

## 9. Proof components (built now, switched off)

Facility buyers trust credentials, accreditations, numbers and testimonials. DVATE does not have these on file yet. Build these components and leave them off until real content exists:

- `CredentialsStrip`: certifications and licenses (for example VA-BC, CRNI, state RN licensure).
- `ProofNumbers`: up to four real figures with labels.
- `Testimonials`: quote, name, title, facility type.
- `TeamPhoto`: real photo of DVATE nurses.

Each reads from `site.ts`. When its data array is empty or its path is unset, the component renders nothing and leaves no gap. Add a comment in `site.ts` showing the expected data shape for each. Do not fill any of them with sample content.

---

## 10. SEO, accessibility and housekeeping

- Unique `<title>` and meta description per page (reuse v1 descriptions as a base).
- Open Graph and Twitter tags, with a 1200 by 630 share image in the new palette (generate it as a static asset from an Astro page or design it as an SVG and export).
- `MedicalBusiness` JSON-LD on the home page with name, slogan, phone, email and `areaServed: United States`.
- `sitemap.xml` via `@astrojs/sitemap`; `robots.txt`.
- Semantic landmarks, one H1 per page, skip link, visible focus states, labels on every form field, alt text on every meaningful image, decorative SVGs marked `aria-hidden`.
- Device Map, dropdown, mobile menu and Briefing controls fully usable by keyboard and screen reader.
- Test at 360px, 390px, 768px, 1024px, 1366px and 1920px widths. No horizontal scrolling at any width.

---

## 11. Deployment

1. Add `.github/workflows/deploy.yml` using the official `withastro/action` and `actions/deploy-pages`, triggered on push to `main`.
2. In the README, document: local dev (`npm install`, `npm run dev`), build (`npm run build`), where to change contact details and flags (`src/data/site.ts`), how to connect Formspree (`formEndpoint`), how to switch on the proof components, and how to add a custom domain (CNAME file, DNS, update `site` and `base`).
3. The repo owner turns on GitHub Pages with Source set to "GitHub Actions" in repository settings.

---

## 12. Build phases (in order)

1. **Setup.** Move v1 to `legacy-v1/`, scaffold Astro, install GSAP and fonts, set design tokens, build `site.ts`, base layout, header, footer, buttons. Deploy workflow in place.
2. **Home page.** All sections in Section 6.1 to 6.8, static first, fully responsive, no motion yet.
3. **Motion.** A1, A2, A3, A5, A6, A7, A10 on the home page, with reduced-motion fallbacks.
4. **Inner pages.** Services, Education, Who we serve, About, Contact, Privacy, 404, with the Device Map (A8), form (A9), stagger reveals (A4) and the Transfer Calculator.
5. **Facility Briefing.** The sales page with keyboard and swipe control, `?facility=` support and print stylesheet.
6. **Proof components** (switched off), SEO, share image, JSON-LD, sitemap.
7. **Quality pass.** Lighthouse targets, contrast check, keyboard walk-through, reduced-motion check, all six test widths, every link and the form tested. Report results.

---

## 13. Definition of done

- [ ] Every page in Section 5 builds and deploys to GitHub Pages under `/dvate`.
- [ ] The line draws on load, threads the home page and ends at the final call to action.
- [ ] The old way vs DVATE way collapse works on scroll (home) and on click (Briefing).
- [ ] Device Map works with mouse, touch and keyboard.
- [ ] Transfer Calculator has no default values and shows only the visitor's own numbers.
- [ ] Contact form sends to `formEndpoint` or falls back to email, with the success animation.
- [ ] Briefing advances by keyboard, click and swipe, supports `?facility=`, and prints cleanly.
- [ ] Reduced motion shows every final state with no animation.
- [ ] Lighthouse mobile home page: Performance 90+, Accessibility 100, Best Practices 100, SEO 100.
- [ ] No em dashes anywhere in the repo's site copy, comments or README.
- [ ] No statistic, testimonial, accreditation or claim that is not in Section 3.
- [ ] All contact details and content flags live in `src/data/site.ts`.
