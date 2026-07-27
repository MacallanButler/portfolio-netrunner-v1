# SiteGrade — Site Integration Brief (Antigravity Scaffolding Prompt)

This is a supplement to the SiteGrade briefs. It adds two discoverability touchpoints on the main site (`portfolio-netrunner-v1`) so visitors can find `/sitegrade` without needing to know the URL. **No new nav item** — SiteGrade stays a funnel component, not a peer destination to Services/About/Contact.

Both placements should be built as a distinct **"loaded module" panel** — a visual break from the surrounding cyberpunk terminal chrome, styled with SiteGrade's own neubrutalist language (thick solid border, flat fill, sharp corners, monospace label). Treat it like a separate program the terminal OS is running inline, not a reskinned CTA trying to match the cyberpunk theme. This contrast is intentional — it should read as "a tool has been loaded here," not as a native site section.

---

## 1. Services Page Placement (primary)

**Location:** Directly after the `// THREE_PILLARS` section, before `// COMMERCIALS_ONE_TIME` begins. This puts it right after the visitor has read what you offer and right before they see pricing — the diagnostic naturally primes the pricing tables that follow.

**Component: "Loaded Module" panel**

- Full-width bordered block, thick solid border (matching SiteGrade's border weight, not the site's existing thin terminal-style dividers), flat off-white/cream fill inside the panel so it visually separates from the dark terminal background around it.
- Small monospace label at the top-left of the panel, styled like a system process being invoked: `[ MODULE: SITEGRADE.EXE — LOADED ]` or similar terminal-flavored label — this is the bridge element between the two aesthetics.
- Headline inside the panel (bold, neubrutalist display type, not the terminal font): "Not sure where you're starting?"
- One line of body copy: "Get a free grade on your current site — performance, SEO, accessibility, and content — before you decide what you need."
- CTA button inside the panel, styled per SiteGrade's own button treatment (sharp corners, thick border, flat accent fill): "Grade My Site →" — links to `/sitegrade`.
- Panel width: full content width of the page (matching the width of the Three Pillars section above it), with clear vertical spacing (margin) above and below so it doesn't crowd into the pillars or the pricing section.

**Responsive behavior:** Stacks naturally — on mobile the label, headline, copy, and button all remain full-width and stacked vertically, same panel treatment just narrower.

---

## 2. Homepage Placement (secondary)

**Location:** Below the hero/intro section, positioned as its own discrete section before (or alongside) the project archive content — a visitor should encounter it as one of the first few things after landing, without it competing with the hero's primary CTA (the email/contact action).

**Component: "RUN_DIAGNOSTIC" module**

- Same "loaded module" panel treatment as the Services page version, for visual consistency between the two placements.
- Label: `[ MODULE: RUN_DIAGNOSTIC ]` — framed as a system capability the visitor can invoke, consistent with the PORTFOLIO_OS conceit already running on the page (`SYS_UPTIME`, `EXPLORATION_SYNC`, `Status: Online`, etc.).
- Headline: "Run a diagnostic on your own site." (keep this shorter/punchier than the Services page version — homepage visitors are colder and scanning faster)
- One line of body copy: "Free instant grade. No signup required to see your score."
- CTA button: "Grade My Site →" — same styling and destination as the Services page version.
- This section should feel like a discoverable "easter egg" capability of the OS — present but not competing for primary visual weight against the hero's main contact CTA.

**Responsive behavior:** Same stacking approach as the Services page version.

---

## 3. Consistency Requirements

- Both panels must use identical typography, border weight, color fill, and button styling — this is one component (e.g. `<SiteGradeModule variant="services" | "homepage" />`) with only the label/headline/copy swapped per placement, not two independently built components.
- Do not attempt to theme the panel into cyberpunk colors (neon/dark) — the contrast against the surrounding terminal UI is the point. The panel should look like SiteGrade "bled through" into the main site, reinforcing that it's a real, separate tool and not just another page section.
- Both CTAs link to `/sitegrade` — no query params or special entry state needed; the visitor lands on the same funnel entry point already built.

---

## 4. Definition of Done

1. No SiteGrade entry exists in primary site navigation.
2. A "loaded module" panel appears on `/services`, positioned between the Three Pillars section and the pricing tables, linking to `/sitegrade`.
3. A "loaded module" panel appears on the homepage, positioned below the hero and before/alongside the project archive content, linking to `/sitegrade`.
4. Both panels share one component with only copy/label differences, and both visually contrast against the surrounding cyberpunk terminal styling rather than blending into it.
