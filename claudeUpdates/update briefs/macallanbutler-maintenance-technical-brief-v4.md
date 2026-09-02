# macallanbutler.com — Maintenance Brief v4: Missed Items + Remaining Cleanup

**Type:** Maintenance pass on existing production Next.js site. This covers items scoped in earlier briefs (v2, v3) that a live re-audit confirmed were never implemented, plus one new finding. One additional item (KB Travel's categorization on `/gigs`) is flagged separately at the bottom for confirmation — do not act on it as part of this implementation pass until confirmed.

---

## 1. `/design-system` — full portfolio-language pass (repeat of v2 scope)

This page was scoped in v2 and confirmed live as still unfixed. Apply the same fix already live on `/services`, `/about`, and `/comms`:

- **Header kicker:** remove the `PORTFOLIO_OS` label entirely. `MB_SYSTEMS` wordmark stays, unchanged.
- **Sync status subtext:** "Visit core site sectors to sync **portfolio** data link" → "Visit core site sectors to sync site data link"
- **`og:site_name`:** "Macallan Butler **Portfolio**" → "Macallan Butler"
- **Meta keywords:** remove "Web Developer Portfolio" from the list.
- **Title tag duplication:** current title renders as `"System Build Process | Macallan Butler UI Architect | Macallan Butler"` (site name appended twice). Fix to `"System Build Process | Macallan Butler UI Architect"`, matching the pattern already corrected on `/services`, `/about`, and `/comms`.

Given this exact scope was already specified once and not applied, worth double-checking whether `/design-system` is on a different template/component path than the other pages — if so, that's the actual root cause and should be resolved so it doesn't get missed a third time.

---

## 2. `/sitegrade` — unique metadata

Still inheriting sitewide defaults — title and description are identical to the homepage's, not specific to the diagnostic tool.

- Title: `"Free Website Grade | Macallan Butler"`
- Meta description: `"Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card."`
- `og:title` / `og:description` / `twitter:title` / `twitter:description` should follow the same page-specific values rather than inheriting the sitewide defaults.

---

## 3. Services page — developer comment labels still visible

Still rendering as visible page content: `// THREE_PILLARS`, `// SITEGRADE_DIAGNOSTIC`, `// COMMERCIALS_ONE_TIME`, `// COMMERCIALS_MONTHLY`, `// FULL_COMPARISON`, `// OPERATIONS_DEEP_DIVE`, `// FREQUENT_QUERIES`, plus the inline `// ONE-TIME BUILD` and `// MONTHLY PLANS` labels within the pricing sections.

- **Fix:** convert to actual HTML/JSX comments, or remove from the rendered template entirely. None of these should reach the DOM as visible text.

---

## 4. Services page — pricing comparison table symbol

Still using an em dash (—) to indicate a feature is not included in a given tier, which risks reading as a checkmark at a glance.

- **Fix:** replace the em dash with a clearly distinct "not included" symbol — e.g. ✗ in muted red or gray, contrasting with a green/bold ✓ for included features.

---

## 5. `/gigs` — "Portfolio Builds" section heading

New finding — not scoped in any earlier brief. The page currently groups projects under a `## Portfolio Builds` heading (Ghost of the Mountains, Apex Drop, Blue Horizon, Wrought), separate from a `## Concept Work` section (Café du Monde, KB Travel — see note below on the latter).

- **Fix:** rename "Portfolio Builds" to something that doesn't use the word — suggested: **"Independent Builds"** or **"Self-Directed Work"**, both of which match the existing subhead copy ("Self-directed projects, built end-to-end to demonstrate range across industries").

---

## Flagged for confirmation — not in scope for this implementation pass

**KB Travel's section placement on `/gigs`.** It currently sits under "Concept Work," with copy describing that section as "unsolicited builds, created for specific companies I admire — no affiliation, just proof of what I'd do for them." KB Travel is an active practice client relationship, not unaffiliated speculative work — if that's not intentional, this is a client-relationship accuracy issue, not just a copy fix, and should be corrected (likely by moving it to the "Portfolio Builds" / renamed section, or by writing distinct framing for it) rather than folded into this brief silently. Confirm intent before touching.

---

## Testing checklist
- [ ] `/design-system` — no `PORTFOLIO_OS` kicker, no "portfolio" in sync subtext, `og:site_name` = "Macallan Butler", "Web Developer Portfolio" removed from keywords, title no longer duplicated
- [ ] `/sitegrade` has its own title, description, and OG/Twitter tags — no longer inheriting site defaults
- [ ] No `// LABEL_STYLE` developer comments visible anywhere in rendered Services page content
- [ ] Pricing comparison table uses a distinct ✗/✓ pair instead of an em dash
- [ ] `/gigs` "Portfolio Builds" heading renamed, no "portfolio" language remaining anywhere on the page
- [ ] KB Travel categorization confirmed with Macallan before any change is made to its section or copy
