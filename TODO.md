# Portfolio site — state of play

Last updated: 2026-08-29

**Live: https://dimos-portfolio.vercel.app**
Repo: https://github.com/DimosAndronoudis/dimos-portfolio (public)

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

## Deployed

- [x] Pushed to GitHub — `DimosAndronoudis/dimos-portfolio`, public
- [x] Vercel CLI installed; project `meltemi/dimos-portfolio` linked
- [x] Live at https://dimos-portfolio.vercel.app
- [x] **Push-to-deploy is on** — every push to `master` redeploys production.
      No `vercel --prod` needed; just commit and push.
- [x] `metadataBase` reads `NEXT_PUBLIC_SITE_URL`, else Vercel's injected
      production domain, else localhost. Setting that one env var is the only
      code change a custom domain needs.
- [x] Phone number removed from `src/data/profile.ts` before the first push, so
      it is not in git history. It *is* in the CV PDF, deliberately — the PDF
      goes to employers.
- [x] Root `CV.pdf` gitignored. Only `public/cv/dimos-andronoudis-cv.pdf` is
      served, and it is committed. Re-copy after any CV edit.
- [x] OG image — `src/app/opengraph-image.tsx`, generated at build time in the
      site's own language (ink, bench grid, amber, the delivery-loop strip).
      Fonts read from `assets/*.ttf`, so the build has no CDN dependency.
- [x] Favicon — `src/app/icon.tsx` replaces the Create Next App default.
- [x] Twitter card set to `summary_large_image`.
- [x] `sitemap.xml` and `robots.txt` — `robots` disallows `/cv/`, so the PDF
      stays reachable and linked but does not become its own search result.
      The sitemap lists only `/`; the console panels are URL fragments and a
      crawler does not treat those as separate documents.
- [x] Real 404 page (`src/app/not-found.tsx`), `noindex`, in the site's own
      type and colour, linking back to Home / Projects / CV.
- [x] Origin resolution lives in `src/lib/site.ts` — metadata, sitemap and
      robots all read the same value.

### Verified on the deployed site, not just locally

- `og:image` 200, 1200×630 PNG · `og:url` resolves to the real domain
- `/cv/dimos-andronoudis-cv.pdf` 200
- `/robots.txt` 200 text/plain · `/sitemap.xml` 200 application/xml, both with
  the real domain baked in
- `/nope` returns HTTP 404 with the custom page, not the framework default
- The Spotify link is present in the shipped HTML

## What's left, in rough order of value

- [ ] **A domain.** `dimosandronoudis.com` reads better on an application than
      a `.vercel.app`. Buy it, add it in the Vercel dashboard, then set
      `NEXT_PUBLIC_SITE_URL` — nothing else changes.
- [ ] **Put the URL on** the CV, the LinkedIn profile, and the GitHub profile
      README. The site is worthless if nobody is pointed at it.
- [ ] **GitHub API integration.** Pull stars, primary language and last-commit
      date onto each project row at build time. Proves the repos are alive.
      Cache it; don't call the API per request.
- [ ] **Lighthouse pass** on the deployed URL, mobile profile especially. The
      3D scene is desktop-gated so mobile should already score well — verify.
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
