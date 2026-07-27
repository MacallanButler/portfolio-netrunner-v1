# SiteGrade — Design Brief Update v2: Full Cyberpunk Adoption (Web), Neubrutalism Confined to PDF

This supersedes both prior design updates. The split is now simple:

- **Everything displayed on macallanbutler.com** — the `/sitegrade` page itself and the two site-integration modules — drops neubrutalism entirely and is built using the site's **existing** cyberpunk terminal design system. Not "inspired by," not "a matching palette" — the actual same components, tokens, and conventions already in use elsewhere on the site (nav chrome, bracketed labels, `//` section headers, monospace HUD readouts, existing button styles).
- **The PDF report** is the only surface that keeps the neubrutalist "report card" concept — thick borders, sharp corners, letter grades, light paper palette, red-pen accent — exactly as specified in the original design brief. Nothing in this update changes the PDF.

The reasoning: the web funnel's job is to feel like a native capability of macallanbutler.com, not a visiting product. The PDF's job is to feel like an official, printable, standalone document handed to a client — those are legitimately different jobs, so they get different visual languages.

---

## 1. What Stays Neubrutalist (unchanged)

The **PDF report only**, exactly as defined in the original SiteGrade Design Brief:

- Light/cream paper background, thick black borders, sharp corners, flat grade-band colors (green/amber/orange/red), red-pen accent reserved for deductions and D/F.
- Large blocky letter grade as the dominant visual element.
- Objective categories shown first and biggest, Qualitative Assessment visually separated and clearly secondary.
- The "How to Read This Report" legend section, plain-language, positioned so it can be read independently.
- Monospace used for data readouts (domain, date, audit ID) within the document.

No changes to this surface. Build it exactly as previously specified.

---

## 2. What Changes on the Web (full cyberpunk adoption)

Stop treating the `/sitegrade` page and the two integration modules as their own product with their own visual identity. Instead, build every component using the same design tokens and component patterns already live on the rest of the site — colors, corner treatment (whatever the site actually uses; don't force sharp corners if the site's real components use something else), border weight and style, button styling, and typography hierarchy.

### 2.1 Reuse existing conventions directly

The site already has a working visual language — use it as-is rather than approximating it:

- **Bracketed labels** — the nav already uses this pattern (`[ SEND ]`) for interactive/system elements. Apply it to SiteGrade's own key moments instead of inventing a new "loaded module" framing — e.g., a grade result can be labeled `[ GRADE: B- ]` the same way the email action is labeled `[ SEND ]`.
- **`//` section headers** — Services page sections already use this convention (`// THREE_PILLARS`, `// COMMERCIALS_ONE_TIME`). Any new SiteGrade section on that page should use the same convention (e.g., `// SITEGRADE_DIAGNOSTIC`) rather than a separate panel label style.
- **HUD/status readouts** — the shell already has `SYS_UPTIME`, `EXPLORATION_SYNC0%`, `Status: Online`. The SiteGrade audit-in-progress state should reuse this exact convention instead of a custom loading animation — e.g., an `AUDIT_SYNC` readout that counts up the same way `EXPLORATION_SYNC` does, using the same progress-bar/percentage treatment already built.
- **Category chip pattern** — the live `/sitegrade` page already renders its category list (Performance, Accessibility, Technical SEO, Structured Data) in the site's native inline style. Keep this as-is; it already matches, no change needed here.
- **Buttons and links** — style "Grade My Site," "Send My Full Report," and "Download PDF" using the exact same button/link treatment as "Inquire Package," "Subscribe Plan," and "Get in touch" elsewhere on the site. Do not introduce a new button style for SiteGrade specifically.
- **Forms** — the email-capture input should match whatever input styling the site already uses on its contact/comms flow, not a SiteGrade-specific input design.

### 2.2 Where genuine soft effects are now allowed

Since this is no longer bound by neubrutalist rules on the web side, real soft glow, blur, or scan-line/glitch flourishes are fair game **if the main site already uses them elsewhere** — match what's already there rather than introducing new effects. If the site has no glow/glitch treatment currently, don't invent one just because it's now allowed; stay consistent with the site's actual current restraint level.

### 2.3 Grade reveal moment

The grade is still the payoff moment and should still carry visual weight, but achieve that through the site's existing typographic hierarchy (its largest heading treatment, its accent color for emphasis) rather than a distinct blocky "report card" object. Frame it with the bracketed-label convention (`[ GRADE: B- ]`) rather than a bordered box in a different visual language from the rest of the page.

---

## 3. Site Integration Modules — Updated Framing (v2)

Drop the "loaded module panel" concept from the previous update entirely. These are no longer visually distinct objects at all — they're ordinary content sections built from the same components as everything around them:

- **Services page:** a new `//`-labeled section (e.g., `// SITEGRADE_DIAGNOSTIC`) inserted between Three Pillars and the pricing tables, using the same heading/body/button styling as the rest of the Services page. No panel border, no separate fill color — it should look like it was always part of the page.
- **Homepage:** a section below the hero using the same typographic and spacing conventions as the rest of the homepage, framed with a bracketed or `//` label consistent with the shell's existing system-status language (e.g., `[ RUN_DIAGNOSTIC ]`), not a bordered callout box.
- Both still link to `/sitegrade` and still share one underlying component (copy/label differ by placement) — that requirement from the original integration brief is unchanged, only the visual treatment is.

---

## 4. Definition of Done

1. The `/sitegrade` page uses the site's actual existing design tokens and components throughout — no separate neubrutalist styling remains anywhere on the web side.
2. The audit-in-progress state reuses the site's existing HUD/progress-readout convention rather than a custom loading animation.
3. The grade reveal, category breakdown, email capture, and download confirmation all use existing site typography, button, and label conventions.
4. Both site-integration modules read as ordinary page sections, not as distinct panels or "loaded modules" — same fonts, same spacing, same button style as their surrounding page.
5. The PDF report is unchanged — fully neubrutalist, light palette, exactly as specified in the original design brief.
