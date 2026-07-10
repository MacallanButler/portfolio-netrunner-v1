# macallanbutler.com — About Page + Process/CTA Rewrite

Two Antigravity prompts below (Technical Brief, Design Brief), plus the drafted copy that both reference. Site remains portfolio-primary; Process and CTA get folded into that voice rather than split into a separate business site.

---

## DRAFTED CONTENT

### About Page

**Headline:** `Hi, I'm Macallan.`

**Body copy:**

> I'm a full-stack developer and UI architect based in Charlotte, NC. I graduated from Arizona State University's Full Stack Web Development program, but the instinct that actually drives my work predates the degree — I care more about how something feels to use than how it looks frozen in a screenshot.
>
> That's why my stack leans on React, Next.js, Supabase, and Tailwind: fast, unopinionated tools that stay out of the way of the actual product. Most of what I build sits at the intersection of motion and clarity — interfaces that respond to the person in front of them instead of just sitting there looking finished.
>
> Recent work spans a multi-role skydiving platform (Apex), a scuba dive shop with live booking (Blue Horizon), and a conservation and education site for snow leopards (Ghost of the Mountains) — different industries, same underlying approach: understand the actual user flow before a single component gets built.
>
> Right now I'm splitting my time between freelance client work and full-time opportunities. If there's a project or a role that fits, I'd love to hear from you.

**Placement:** New top-level nav item, positioned between Projects and Process.

---

### Process Page (rewritten, first-person)

**Headline:** `How I build.`

**Intro line:**

> Every project starts the same way: I'd rather ask an extra question up front than guess and rebuild later. Measure twice, cut once.

**Phase 1 — Discovery & Scope**

> I start by understanding what the project actually needs to do, not what it should look like. That means scoping pages, features, and integrations, and being explicit about what's in and out before any design work begins. This is also where I flag stack decisions — the right tool for a five-page brochure site is rarely the right tool for a booking platform with live data.

**Phase 2 — Design & Prototype**

> Layout, typography, color, and content hierarchy get locked in before a line of production code is written. I work in low-fidelity first so structural feedback ("this flow doesn't match how people actually book") is cheap to act on, before it's expensive to change.

**Phase 3 — Build & Integrate**

> This is where the stack comes together — frontend components, backend/data layer, third-party services (auth, payments, email, maps, whatever the project calls for), and the interactions that make it feel alive rather than static.

**Phase 4 — Launch & Handoff**

> Testing across devices, performance and accessibility passes, deployment, and a clear handoff — documentation, credentials, and a walkthrough of anything you'll need to maintain going forward.

---

### CTA (site-wide, replacing the agency-voice version)

**Old tone (being replaced):** "Every project begins with a conversation. No commitment, no pressure — just a clear picture of what we can build together."

**New copy:**

> Have a project in mind, or think I'd be a good fit for your team? Let's talk.
>
> [ Get in touch ]

---

## TECHNICAL BRIEF (Antigravity Prompt 1)

**Project:** macallanbutler.com — IA update (add About, revoice Process/CTA)
**Stack:** Next.js (existing Multi-Zones setup), no new dependencies required
**Scope:** Content and copy-level changes only. No new integrations, no new data flows, no new third-party services.

**Pages affected:**

1. **New page: `/about`**
   - Route: standalone page within the root zone (same zone as home/projects, not a portfolio sub-zone)
   - Layout: single-column, max-width ~65ch for body text, consistent with existing PORTFOLIO_OS reading-width conventions
   - Component structure:
     - `<AboutHero>` — headline ("Hi, I'm Macallan.") + optional terminal-style status line matching homepage convention (e.g. `ABOUT_OS · STATUS: Online`)
     - `<AboutBody>` — body copy as provided above, rendered as 4 paragraphs, no additional formatting needed
     - `<AboutCTA>` — reuse the site-wide CTA component (see below), placed at bottom of page
   - Nav: add "About" to primary nav array, positioned between "Projects" and "Process"

2. **Edit existing page: `/process`**
   - No structural changes — same 4-phase layout/section components already in place
   - Copy-only replacement: swap all instances of "we" / "our" / "us" to "I" / "my" / "me" throughout
   - Replace phase copy with the four phases drafted above (Discovery & Scope, Design & Prototype, Build & Integrate, Launch & Handoff) — same number of phases as current implementation, so no schema/component change needed if phases are already rendered from a 4-item array
   - Update intro copy to the "measure twice, cut once" line provided above

3. **Edit shared CTA component** (wherever it's currently defined — likely a shared component used on Process and homepage)
   - Replace copy per "CTA" section above
   - No change to button behavior, styling, or destination (mailto/contact form, whatever currently exists)

**Data flow:** None — this is static copy across existing Next.js pages/components. No Supabase, no new API routes, no new env vars.

**Security:** N/A — no new forms, no new data collection on the About page.

**Explicit instruction to Antigravity:** Do not restructure existing nav order beyond inserting "About." Do not modify the Projects page, homepage hero, or any project subpage content. Do not introduce new component libraries — reuse existing typography, spacing, and terminal/OS-styling primitives already present in the codebase (e.g. whatever component currently renders "PORTFOLIO_OS · STATUS: Online" on the homepage) for the About page's status line.

---

## DESIGN BRIEF (Antigravity Prompt 2)

**Design direction:** Match existing PORTFOLIO_OS / terminal-OS aesthetic exactly. No new colors, fonts, or visual motifs introduced.

**Typography:** Use existing type scale and font stack as-is. About page body copy should use the same paragraph/body text styles already applied on the homepage's descriptive copy blocks — do not introduce a new "long-form article" style.

**Color palette:** Inherit fully from existing design tokens/CSS variables already defined in the codebase. Do not add new colors for the About page or the revoiced Process/CTA content.

**Imagery:** No new imagery required for this pass. About page is text-first — if a headshot or portrait is desired later, leave a placeholder slot in `<AboutHero>` sized consistently with existing hero image treatments elsewhere on the site, but do not source or generate an image as part of this task.

**Content hierarchy (About page):**
1. Headline + status line (terminal-OS convention)
2. Body copy, 4 paragraphs, generous line-height for readability
3. CTA block at page bottom

**Spacing:** Match existing page-level vertical rhythm (section padding, max-width container) used on Projects or Process pages — do not introduce new spacing scale.

**Responsive behavior:** Single-column at all breakpoints (this page has no multi-column content). Body text max-width should collapse to full container width below existing site's tablet breakpoint, consistent with how other text-heavy sections on the site already behave.

**Brand constraint:** The terminal/sci-fi-OS voice (status lines, "SYNC," "STATUS: Online" type framing) should feel earned, not decorative — use it only where it already appears elsewhere on the site (hero/header regions), not as a stylistic flourish sprinkled through body copy.
