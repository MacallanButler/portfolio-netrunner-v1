# macallanbutler.com — Maintenance Brief v2: Remaining Portfolio-Language Cleanup + New Findings

**Type:** Maintenance pass on existing production Next.js site. This supersedes the previous technical brief — three pages (`/`, `/services`, `/sitegrade`) already received these fixes; this brief covers what's still outstanding plus newly discovered issues. Locate and modify existing components/pages — do not scaffold new ones unless noted.

**Root cause note:** `/`, `/services`, and `/sitegrade` are already clean, which confirms these fixes are being applied per-page rather than at a shared header/nav/metadata level. Strongly recommend refactoring so all pages consume one shared header component and one shared metadata config, rather than continuing to patch each page individually — otherwise this same drift will recur on the next content pass.

---

## 1. Pages still needing the portfolio-language fix

Apply the following to **`/gigs`, `/about`, `/design-system`, and `/comms`** — these four still have the pre-fix state. Use `/services` as the reference implementation; it already shows the correct end state.

### 1a. Header kicker
- Remove the `PORTFOLIO_OS` label from the header entirely. `MB_SYSTEMS` wordmark remains, unchanged.

### 1b. Sync status subtext
- Current: "Visit core site sectors to sync **portfolio** data link"
- Fix: "Visit core site sectors to sync site data link"

### 1c. `og:site_name`
- Current: "Macallan Butler **Portfolio**"
- Fix: "Macallan Butler"

### 1d. Meta keywords
- Remove "Web Developer Portfolio" from the keywords list on all four pages. Leave the rest intact.

---

## 2. Nav label + completeness fix

- **`/gigs`**: nav currently shows only `PROJECTS, CONTACT, PROCESS` — missing `SERVICES` and `ABOUT`. Fix to render the full nav: `ARCHIVE, SERVICES, ABOUT, PROCESS, CONTACT`.
- **`/about`**: nav is complete (5 links) but labeled `PROJECTS`. Change to `ARCHIVE`.
- **`/comms`**: nav is complete (5 links) but labeled `PROJECTS`. Change to `ARCHIVE`.
- **`/design-system`**: already correct (`ARCHIVE`, full nav) — no change needed, listed here for confirmation only.

This is the clearest case for the shared-component refactor noted above — three different pages have three different nav states right now.

---

## 3. Title tag duplication bug

- **Current state:** `/about`, `/design-system`, and `/comms` all render the site name twice, e.g. `/comms` currently shows: `"Establish Connection & Get in Touch | Macallan Butler | Macallan Butler"`.
- **Root cause:** the metadata template auto-appends `"| Macallan Butler"` to every page title. These three pages also have it hand-written into their manual title string, producing the duplicate. `/services` shows the fixed pattern — its manual title has no trailing site-name suffix, since the template already adds it once.
- **Fix:** remove the redundant manual `"| Macallan Butler"` suffix from the title strings on `/about`, `/design-system`, and `/comms`, matching the `/services` pattern.
  - `/about` → `"About Macallan Butler | Full-Stack Developer & UI Architect"`
  - `/design-system` → `"System Build Process | Macallan Butler UI Architect"`
  - `/comms` → `"Establish Connection & Get in Touch | Macallan Butler"`

---

## 4. About page — location references (time-sensitive: relocating to IL this week)

Two locations to fix, both currently reference Charlotte, NC:

### 4a. Meta description
- Current: "Learn about Macallan Butler, a full-stack developer and UI architect based in Charlotte, NC. Discover my tech stack, projects, and process."
- Fix: "Learn about Macallan Butler, a full-stack developer and UI architect. Discover my tech stack, projects, and process."

### 4b. Bio prose (two sentences)
- Current: "I'm a Full Stack Developer based in Charlotte, NC, with a B.S. in Graphic Information Technology, emphasis in Full Stack Development, from Arizona State University."
- Fix: "I'm a Full Stack Developer with a B.S. in Graphic Information Technology, emphasis in Full Stack Development, from Arizona State University."


- Current: "You can usually find me at a coffee shop somewhere in NC, splitting time between freelance work and full-time opportunities."
- Fix: "You can usually find me at a coffee shop, splitting time between freelance work and full-time opportunities."

---

## 5. `/sitegrade` — unique metadata (new page, not previously scoped)

- Current title and meta description are falling back to site-wide defaults — title is identical to the homepage, description is identical to `/gigs`. This page should have its own metadata reflecting its actual purpose as a lead-gen diagnostic tool.
- Suggested title: `"Free Website Grade | Macallan Butler"`
- Suggested meta description: `"Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card."`
- `og:title` / `og:description` / `twitter:title` / `twitter:description` should follow the same page-specific pattern rather than inheriting the sitewide defaults.

---

## 6. Landing page boot animation — "Loading Portfolio Engine"

- Current: the initial boot/loading animation on the landing page displays the line "Loading Portfolio Engine" (or similar — confirm exact wording in the component) before the site renders.
- Fix: replace with language consistent with the terminal voice, dropping "portfolio" — suggested: **"Loading Site Engine"** (matches the pattern already used elsewhere, e.g. "sync site data").
- Alternative if the line reads better removed than reworded: drop it from the sequence entirely and let the remaining boot lines (if any) carry the loading state.
- **Locate:** likely a `BootSequence`, `LoadingScreen`, or `IntroAnimation` component gating the home page (and confirm whether this same component is shared/triggered on other pages too, or is home-page-only — if shared, this is another candidate for the shared-component consolidation noted above).
- Flag for confirmation: verify whether this loading sequence appears only on `/` or on every page load — if it's global, the fix needs to apply everywhere it renders, not just on the homepage.

---

## 7. Decrypt animation — status unconfirmed

Not verifiable from a static fetch — needs a live browser check. Confirm the following are actually in place (per the original brief, scope unchanged):
- [ ] First project expansion per session plays the full decrypt animation
- [ ] Second+ expansions in the same session render instantly (fast fade, not a hard cut — see Design Brief)
- [ ] New tab/session replays the full animation on first open
- [ ] `prefers-reduced-motion` users never see the decrypt animation

---

## Testing checklist (this pass)
- [ ] `/gigs`, `/about`, `/design-system`, `/comms` — no `PORTFOLIO_OS` kicker, no "portfolio" in sync subtext, `og:site_name` = "Macallan Butler", "Web Developer Portfolio" removed from keywords
- [ ] `/gigs` nav shows all 5 links: `ARCHIVE, SERVICES, ABOUT, PROCESS, CONTACT`
- [ ] `/about` and `/comms` nav label changed from `PROJECTS` to `ARCHIVE`
- [ ] `/about`, `/design-system`, `/comms` titles no longer show "Macallan Butler" twice
- [ ] About page meta description and bio no longer reference Charlotte/NC anywhere
- [ ] `/sitegrade` has its own title, description, and OG/Twitter tags — no longer inheriting site defaults
- [ ] Landing page boot animation no longer reads "Loading Portfolio Engine" — confirmed on every page it renders on, not just `/`
- [ ] Decrypt animation session behavior confirmed live in-browser, across a fresh session and a repeat session
