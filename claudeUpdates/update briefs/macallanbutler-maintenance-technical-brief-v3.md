# macallanbutler.com — Maintenance Brief v3: Audit-Sourced Fixes

**Type:** Maintenance pass on existing production Next.js site. Sourced from a third-party Lighthouse-backed audit (Copilot AI Analysis, run Sept 1 2026), cross-checked against direct inspection before inclusion here. Two items from that audit were excluded as unverifiable (a referenced "Wrought" project not found anywhere on the live site, and an "MB3FX_0YAH" nav label never observed directly) — do not act on those without confirming they're real first. All Charlotte/NC-specific recommendations from that audit were also excluded outright, since they're now stale — the site is deliberately moving away from a location-anchored identity.

---

## 1. LCP / boot sequence restructure (Critical)

- Mobile LCP measured at 4.9s — well into Google's "Poor" range (>4.0s threshold). Root cause: the hero name's paint is gated behind the JS-driven boot sequence animation completing.
- **Fix:** render the hero name (`MACALLAN_BUTLER` / equivalent) as static HTML immediately on page load. Run the boot sequence animation as a background or overlay element that plays after — or independently of — first paint, rather than blocking it.
- This directly folds into the "Loading Site Engine" copy fix already in progress — same component, now with a structural change alongside the copy change.
- Also flagged: ~117 KiB of unused JavaScript contributing to the delay — worth a pass to tree-shake/trim if the boot sequence component is being touched anyway.

---

## 2. Developer comment labels rendering as visible text (Services page)

- Labels like `// THREE_PILLARS`, `// COMMERCIALS_ONE_TIME`, `// FREQUENT_QUERIES`, `// MONTHLY PLANS`, `// FULL_COMPARISON`, `// OPERATIONS_DEEP_DIVE` are currently rendering as visible page content on `/services` rather than staying as internal code comments.
- **Fix:** convert these to actual HTML comments or remove them from the rendered template entirely. They should never reach the DOM as visible text.

---

## 3. Cryptic ID strings leaked into rendered DOM

- Strings resembling internal record/debug IDs (e.g. `PRV06TV5TY069UV`, `GETVEHWXWXXC`, similar patterns) were flagged as appearing in visible page content across multiple pages.
- **Fix:** locate and remove these from rendered output. If they're needed for internal logic, move them to data attributes or JS state rather than visible DOM text. Confirm exact locations during implementation — not independently re-verified in this pass.

---

## 4. Profile title consistency

- Hero currently reads "Full-Stack Developer"; About page and metadata read "Full-Stack Developer & UI Architect."
- **Fix:** standardize on **"Full-Stack Developer & UI Architect"** everywhere — hero, About, all meta titles. It's the more specific, harder-to-commoditize framing, and it's already the version used in metadata.

---

## 5. Contact page copy contradiction

- Current: "Send a message and I'll respond directly — no forms, no runaround." — sitting directly above an actual form.
- **Fix:** reword to remove the contradiction. Suggested direction: "Send a message directly — no gatekeepers, no ticketing system. I read and respond to every submission personally." (Adjust to match the existing terminal voice if this reads too plain against the surrounding copy.)

---

## 6. Pricing comparison table — ambiguous "not included" symbol

- The Services page pricing comparison table currently uses an em dash (—) to indicate a feature is *not* included in a given tier. At a glance, this can read as visually similar to a checkmark, which risks a visitor misreading what's included on a page where they're actively comparing paid tiers.
- **Fix:** replace the em dash with a clearly distinct "not included" symbol — e.g. ✗ in a muted red or gray, contrasting with a green/bold ✓ for included features.

---

## 7. SYS_UPTIME counter — confirmed non-functional

- Confirmed (via live browser testing in the source audit): `SYS_UPTIME` resets to `0:00` on every page navigation rather than tracking anything persistent. The label implies system/server uptime, which is misleading to the technically literate visitors most likely to notice.
- **Fix — pick one:**
  - Persist the counter via `sessionStorage` across page navigations so it behaves like an actual running session timer, or
  - Relabel it to accurately describe what it measures (e.g. `SESSION_TIME`) if persistence isn't worth the engineering effort right now.

---

## Testing checklist
- [ ] Mobile LCP re-measured after boot sequence restructure — target under 2.5s (or at minimum out of the "Poor" >4.0s range)
- [ ] Hero name visible as static HTML before boot animation completes
- [ ] No `// LABEL_STYLE` developer comments visible in rendered Services page content
- [ ] No cryptic ID strings visible anywhere in rendered page content, across all pages
- [ ] "Full-Stack Developer & UI Architect" used consistently — hero, About, all page metadata
- [ ] Contact page intro no longer contradicts the form directly below it
- [ ] Pricing comparison table uses a clearly distinct symbol for excluded features (not an em dash)
- [ ] SYS_UPTIME either persists correctly across navigation or is relabeled to match actual behavior
