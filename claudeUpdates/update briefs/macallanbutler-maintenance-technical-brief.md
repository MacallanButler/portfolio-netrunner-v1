# macallanbutler.com — Maintenance Brief: Technical

**Type:** Maintenance pass on existing production Next.js site. Locate and modify existing components/pages — do not scaffold new ones unless explicitly noted.

---

## 1. Remove "Portfolio" framing

### 1a. Header kicker
- Currently: a `PORTFOLIO_OS` label rendered in the persistent site header, above/alongside the `MB_SYSTEMS` wordmark, present on all pages (home, /gigs, /about, /services, /design-system, /comms).
- **Action:** Remove the `PORTFOLIO_OS` kicker element entirely. The `MB_SYSTEMS` wordmark remains as the sole header brand element, unchanged in styling.
- **Locate:** shared header/nav component (likely `Header.tsx`, `Nav.tsx`, or `layout.tsx` — used across all routes).
- See Design Brief for spacing follow-up after removal.

### 1b. Sync status subtext
- Currently: "Visit core site sectors to sync portfolio data link" (appears near the `EXPLORATION_SYNC` / `SYS_UPTIME` indicators, all pages).
- **Action:** Replace with "Visit core site sectors to sync site data link" (adjust wording slightly if it reads awkward in the live layout — keep it in the existing terminal voice, see Design Brief).

### 1c. `og:site_name` meta tag
- Currently: "Macallan Butler Portfolio" on all pages.
- **Action:** Change to "Macallan Butler" sitewide. Likely a single source of truth in a global metadata config (e.g. `app/layout.tsx` metadata export) — update once if so.

### 1d. Home page title + meta description
- Current title: `Macallan Butler | PORTFOLIO_OS Terminal Client`
- Current meta description: "Establish a secure node connection to Macallan Butler's systems. Booting portfolio OS, projects database, and interactive shell."
- **Action:**
  - New title: `Macallan Butler | Full-Stack Developer & UI Architect`
  - New meta description: "Establish a secure node connection to Macallan Butler's systems. Booting site systems, project database, and interactive shell."

### 1e. Services page title
- Current: `Web Services & Maintenance Plans | Macallan Butler Portfolio | Macallan Butler`
- **Action:** `Web Services & Maintenance Plans | Macallan Butler`
- Note: this title has "Macallan Butler" appearing twice (once mid-string, once as trailing site-name suffix) — check whether this is a metadata template appending the site name automatically on top of a manually-written title. If so, this may be a small template bug worth fixing beyond just the word "Portfolio."

### 1f. Meta keywords
- Currently includes "Web Developer Portfolio" in the keywords list on all pages.
- **Action:** Remove that phrase from the keywords list. Leave the rest intact.

---

## 2. Nav consistency fix

Current state — the primary nav differs by page:
- Home, `/design-system`: `ARCHIVE, SERVICES, ABOUT, PROCESS, CONTACT`
- `/about`, `/services`, `/comms`: `PROJECTS, SERVICES, ABOUT, PROCESS, CONTACT`
- `/gigs`: `PROJECTS, CONTACT, PROCESS` only — **`SERVICES` and `ABOUT` links are missing**

**Action:**
- Standardize the nav label to **`ARCHIVE`** across every page (this is a previously locked copy decision — do not use `PROJECTS`).
- Fix `/gigs` to render the full 5-link nav (`ARCHIVE, SERVICES, ABOUT, PROCESS, CONTACT`), matching every other page.
- Likely root cause: `/gigs` is rendering its own local nav array/component instead of consuming the shared layout nav. If so, refactor `/gigs` to use the same shared nav component/config as the other five pages so this doesn't drift again — patching just this page's local copy will leave the underlying duplication in place.

---

## 3. About page — location reference

- Current bio sentence: "I'm a Full Stack Developer based in Charlotte, NC, with a B.S. in Graphic Information Technology..."
- **Action:** Remove "based in Charlotte, NC" from this sentence. Location shouldn't appear in prose copy — it's handled separately via the OS-style status tag elsewhere on-page.
  - Revised: "I'm a Full Stack Developer with a B.S. in Graphic Information Technology, emphasis in Full Stack Development, from Arizona State University."
- Also update the closing line: "You can usually find me at a coffee shop somewhere in NC, splitting time between freelance work and full-time opportunities." Strip the location reference entirely (not generalized — removed).
  - Revised: "You can usually find me at a coffee shop, splitting time between freelance work and full-time opportunities."

---

## 4. Decrypt/reveal animation — session-scoped

Current: the full decrypt/glitch reveal animation plays every time a project card is expanded ("CLICK TO EXPAND"), for every project, every time.

**Target behavior:**
- First project card expansion in a browser session plays the full decrypt animation at its current length, unchanged.
- Every subsequent project expansion within that same session renders effectively instantly (see Design Brief for the exact fallback treatment — not a hard cut).
- Persist via `sessionStorage` (not `localStorage` — this should reset per new session/tab, not persist indefinitely across visits). Suggested flag: `mb_decrypt_played`, set to `true` on first play, checked before triggering the animation on subsequent opens.
- Respect `prefers-reduced-motion: reduce` — if set, skip the decrypt animation entirely (even on first open) and go straight to the instant-reveal state, regardless of session state.
- **Locate:** likely a shared `ProjectCard` or `ProjectModal` component consumed by `/gigs` for each of the three projects (Apex Drop, Blue Horizon, Ghost of the Mountains).

---

## Testing checklist
- [ ] `PORTFOLIO_OS` kicker no longer renders on any page
- [ ] `MB_SYSTEMS` wordmark unaffected in position/styling after kicker removal
- [ ] Sync subtext no longer contains "portfolio"
- [ ] `og:site_name`, home title/description, services title, meta keywords updated sitewide
- [ ] All 6 pages show an identical 5-link nav: `ARCHIVE, SERVICES, ABOUT, PROCESS, CONTACT`
- [ ] `/gigs` nav specifically includes `SERVICES` and `ABOUT` (previously missing)
- [ ] About page bio no longer references Charlotte/NC in the "based in" sentence
- [ ] First project expansion per session plays the full decrypt animation
- [ ] Second+ project expansions in the same session render instantly
- [ ] New tab/new session replays the full animation on first open again
- [ ] `prefers-reduced-motion` users never see the decrypt animation, first open or not
