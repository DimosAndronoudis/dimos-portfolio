# Portfolio site — state of play

Last updated: 2026-08-29

Personal site for Dimos Andronoudis — AI Engineer / Forward Deployed Engineer.
Run it with `npm run dev`, then open http://localhost:3000

---

## Stack

- Next.js 16.3.3 (App Router, Turbopack) + React 19.2 + TypeScript
- Tailwind CSS v4 (tokens live in `src/app/globals.css` under `@theme inline`)
- Three.js + @react-three/fiber for the background scene only
- No backend. Everything is statically prerendered.

## Design system

- **Colour** — ink `#0b0e14` (deep blue-black, not pure black), amber `#ffb454`
  as the signal colour, cyan `#64d2e0` for machine/live accents. Two accents,
  strict roles. Greys: `line`, `dim`, `muted`, `text`.
- **Type** — Archivo (display), IBM Plex Sans (body), IBM Plex Mono (labels and
  data). The mono `.label` class is the page's utility voice.
- **Motif** — the pipeline strip. Every project shows its real architecture
  (`Docs → Chunk → Embed → Retrieve → Rerank → LLM → Answer`) before any prose.
  This is the thing that convinces engineers; keep it.

## Layout

Centred name → what the site is → CV professional summary → five buttons →
links + contact. Nothing is open until a button is pressed.

Buttons: **Projects · Experience · Education · Research · CV**

Open state lives in the URL hash, so `/#projects` is a shareable deep link, the
browser Back button closes a panel, and the page works before hydration.

---

## Done

- [x] Scaffolded Next.js + TS + Tailwind at the repo root
- [x] Design system: colour tokens, three-font pairing, `.label` utility, bench grid
- [x] Data layer — nothing is hardcoded in components:
      `src/data/profile.ts`, `projects.ts`, `skills.ts`, `experience.ts`
- [x] All content populated from `CV.pdf` (no invented details)
- [x] Three-button console with hash-driven disclosure, then extended to five
- [x] All 8 projects written up with real descriptions, tech and pipelines —
      the four not in the CV were written from their GitHub READMEs
- [x] AI_WAV_Hunter promoted into the top four (LangGraph + Playwright MCP +
      SSE is the strongest forward-deployed signal in the set)
- [x] Meltemi marked shipped, with its live URL (meltemilive.com)
- [x] CV renders inline in the page (iframe) + open-in-tab + download
- [x] Research split out from Experience, flagged as academic work
- [x] Education split into its own button
- [x] Links reduced to GitHub + LinkedIn, plus a Live app section
- [x] Contact: email, "Athens, Greece (willing to relocate)", languages
- [x] 3D background — 320-point lattice, drifts and leans toward the cursor.
      Desktop only (≥768px), never under `prefers-reduced-motion`, so phones
      never download Three.js. Neighbour links computed once, not per frame.
- [x] Accessibility floor: `aria-expanded`/`aria-controls` on the buttons,
      visible focus rings, reduced-motion respected
- [x] `npm run build` and `npm run lint` both clean

---

## Next — deploy to Vercel

This is the whole remaining critical path. Everything below is optional.

1. **Push to GitHub.** The repo is already `git init`-ed but has no commits.
   ```bash
   git add -A
   git commit -m "Personal portfolio site"
   gh repo create dimos-portfolio --public --source=. --push
   ```
2. **Install the CLI** — not currently installed, and it unlocks `vercel env`,
   `vercel deploy` and `vercel logs`:
   ```bash
   npm i -g vercel
   ```
3. **Deploy.**
   ```bash
   vercel          # preview URL
   vercel --prod   # production
   ```
   Zero config needed — Vercel detects Next.js. No environment variables exist,
   so there is nothing to set up.
4. **Domain.** Decide between `dimosandronoudis.com` (or similar) and the free
   `*.vercel.app` subdomain. A real domain reads better on applications.
5. **Put the URL on** the CV, the LinkedIn profile, and the GitHub profile README.

### Before it goes public — check these yourself

- [ ] Open `/#cv` and confirm the PDF iframe renders acceptably in your browser.
      If it looks cramped, say so and it can become a rendered page image.
- [ ] Confirm `public/cv/dimos-andronoudis-cv.pdf` is the CV version you want
      public. It is a copy of `CV.pdf` from the repo root — re-copy after any edit.
- [ ] Decide whether the phone number should appear. It is in
      `src/data/profile.ts` as `profile.phone` but is deliberately not rendered.
- [ ] Read the eight project descriptions once. The four written from READMEs
      are accurate to those READMEs, but you know the projects better.

---

## Optional, in rough order of value

- [ ] **Open Graph image.** Right now a shared link has no preview card. A
      static `opengraph-image.png` (or a generated one) is ~20 minutes and makes
      the link look deliberate when pasted into a message or a job application.
- [ ] **`favicon.ico`** — still the Next.js default.
- [ ] **GitHub API integration.** Pull stars, primary language and last-commit
      date onto each project row at build time. Proves the repos are alive.
      Cache it; don't call the API per request.
- [ ] **Lighthouse pass** on the deployed URL, mobile profile especially. The
      3D scene is desktop-gated so mobile should already score well — verify.
- [ ] **`sitemap.ts` and `robots.ts`** so the site is indexable.
- [ ] **A real 404 page.** Currently the framework default.
- [ ] **Project detail pages** (`/projects/[id]`), if you ever want the
      `fullDescription` and `highlights` fields to be visible — both are
      populated in the data but nothing renders them yet.
- [ ] Consider whether the thesis deserves a PDF or a link on the Research panel.
      `research.links` is an empty array, ready for it.

## Deliberately not doing

- **An "Ask Dimos AI" chatbot.** Dropped on request. If it ever comes back, it
  belongs in a Next.js route handler with the AI SDK, not a separate FastAPI
  service — one deploy instead of two, and no CORS.
- **A heavier 3D scene.** The current one is a single ambient backdrop. Adding
  interactive 3D content would cost mobile performance for no hiring signal.

---

## Files worth knowing

| Path | What it is |
| --- | --- |
| `src/app/page.tsx` | The whole page. The five buttons are defined here. |
| `src/app/globals.css` | Colour tokens, `.label`, the grid, panel animation. |
| `src/data/projects.ts` | All 8 projects + the pipeline definitions per category. |
| `src/data/experience.ts` | Job history, education, thesis. |
| `src/components/console/Console.tsx` | The button/disclosure logic + hash state. |
| `src/components/scene/Lattice.tsx` | The 3D point field. |
| `src/components/scene/SceneBackdrop.tsx` | The desktop/reduced-motion gate. |

**Adding a project** = add one object to the `projects` array in
`src/data/projects.ts`. If it needs a new pipeline shape, add a category to the
`ProjectCategory` union and give it an entry in both `pipelines` and
`categoryLabels` — TypeScript will tell you if you miss one.
