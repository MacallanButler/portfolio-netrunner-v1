# SiteGrade — Design Brief Update: Dark/Neon Palette

This supersedes the **Color Palette** and related sections of the original SiteGrade Design Brief. The neubrutalist structure (thick solid borders, flat color blocks, sharp corners, no gradients, no soft shadows/blur) stays exactly as specified — only the palette changes, from a light "paper/report-card" scheme to a dark scheme native to the main site's cyberpunk terminal aesthetic. This applies to **both** the SiteGrade page/PDF-adjacent web UI and the two site-integration modules (Services page + homepage), so all three now read as one consistent system instead of two contrasting ones.

One exception, addressed in Section 5: the **PDF report itself stays on the light palette**. Reasoning below.

---

## 1. What's Changing and Why

The original brief treated SiteGrade as a deliberately separate light "report card" product, contrasting against the dark terminal shell. That contrast still works for the *idea* of the modules (a tool loaded into the OS), but doesn't need to extend to *color* — neubrutalism's hard edges and flat fills pair naturally with a dark, neon-accented palette, and keeping the palette dark means SiteGrade stops looking like a foreign object and starts looking like a native capability of the same system.

Net effect: same blocky, high-contrast, no-gradient structure — just recolored to sit on black instead of cream, with neon in place of ink.

---

## 2. Updated Color Palette

- **Background:** near-black, matching the existing terminal shell's base (not a new dark gray — reuse the site's actual background value so there's zero seam between page and module).
- **Borders (replacing "ink"):** thick, solid, sharp-cornered borders in one of the site's existing neon accent colors — this is now the primary structural color, doing the job the near-black ink border did in the original brief. Every block, button, and panel edge uses this treatment.
- **Text:** off-white/light-gray body copy, matching the site's existing terminal text color, for the same legibility reasons as before (findings and recommendations still need to read easily at length).
- **Grade-band colors:** keep the same four-band logic (A/A- green, B amber/gold, C burnt orange, D/F red) but push each to a **saturated neon** version rather than the original muted tone — same semantic mapping, same "reserve true red for D/F and deductions" rule, just tonally native to the rest of the site's neon palette.
- **Monospace/data accent:** previously a subtle bridge element — now promoted to a primary voice throughout, since monospace terminal type is the main site's native register, not just a wink toward it.
- **One interactive accent** (buttons, links, focus states) — carry this over from the main site's existing CTA color rather than introducing a new one, so SiteGrade's buttons look like the same buttons used elsewhere on macallanbutler.com.

Flat fills only — still no gradients anywhere, same as the original brief.

---

## 3. The "Hard Glow" Technique (new)

To get a cyberpunk *feel* without breaking neubrutalist rules (no blur, no soft shadow):

- Use a second, offset solid-color border/block directly behind the primary block — same shape, same sharp corners, shifted a few pixels down and to the right, in a second neon color. This reads as a hard-edged glow/depth effect (like an old CRT double-image or a hard drop-shadow with zero blur) rather than a soft UI shadow.
- Apply this to the grade glyph specifically (the single largest visual element) and to primary CTA buttons — not to every block, or the effect loses impact from overuse.
- Do not use actual `box-shadow` blur, `filter: drop-shadow`, or any softened glow — the offset-solid-block technique is a structural element, built with real duplicated shapes, not a CSS shadow effect.

---

## 4. Component-Level Adjustments

- **Grade glyph:** neon-bordered, flat neon-fill per grade band, hard-glow offset behind it. Still the single largest text element on the page.
- **Category score blocks:** dark fill, neon border, off-white text, small monospace category label.
- **Qualitative Assessment section:** keep the visual distinction from objective categories (still a hard requirement) — achieve this now via a different border color (a secondary neon) rather than a different background tint, since everything shares the same dark base.
- **Findings list:** dark blocks, neon border, severity indicated by a small colored tag using the grade-band neon logic (red-neon for high severity, etc.) rather than a soft color wash.
- **Buttons/inputs:** sharp corners retained, thick neon border, flat fill using the site's existing CTA accent — same interaction states (hover/focus) the main site already uses, for consistency.
- **Legend/glossary section:** keep this plain-language and visually calmer than the scored sections — slightly reduced border weight and a muted (non-neon) neutral border color here specifically, so the one section that's explanatory rather than evaluative doesn't compete for attention with the scored content around it.

---

## 5. The PDF Report Stays Light (recommendation)

Keep the downloadable PDF on the **original light/paper palette** from the first design brief, even though the web experience is moving dark. Reasoning:

- PDFs are frequently printed or viewed against a printer's default white — a dark-background PDF either prints as a near-solid black page (wasting ink) or gets manually inverted by whatever's rendering it, both bad outcomes for something meant to look polished in a client's hands.
- A light, high-contrast "official document" feel reads as more credible and more printable as a report artifact, independent of brand consistency — this is a case where the deliverable's real-world use case (printed or PDF-viewer-read) should win over strict brand matching.
- The web page and the PDF don't need to be visually identical to feel like the same product — they need the same grading logic, structure, and voice, which they already share. A light PDF next to a dark web funnel is a completely normal pattern (e.g., a dark marketing site generating a light printable invoice).

If you'd rather have the PDF match the dark palette anyway for brand consistency, that's a reasonable call too — just flag it and I'll adjust Section 5 of the original technical brief's PDF spec accordingly. Absent that, treat this as the default.

---

## 6. Site Integration Modules — Updated Framing

The two "loaded module" panels (Services page, homepage) no longer need to read as a *contrasting* foreign object, since the palette now matches. Update the framing from the Site Integration Brief as follows:

- Drop the "bled through, deliberately contrasting" language — the panels now blend palette-wise while still being visually distinct through the neubrutalist block structure (sharp corners, thick neon borders, flat fills) against the site's existing softer terminal-window styling.
- Keep the monospace "loaded module" label convention (`[ MODULE: SITEGRADE.EXE — LOADED ]`, `[ MODULE: RUN_DIAGNOSTIC ]`) — this still does the job of signaling "a tool has been invoked here," now reinforced rather than undercut by the shared palette.
- Everything else from the Site Integration Brief (placement, copy, responsive behavior, one-shared-component requirement) is unchanged.

---

## 7. Definition of Done (update)

1. SiteGrade's web UI (the `/sitegrade` page) uses the dark/neon palette specified above, with the same neubrutalist structural rules (sharp corners, flat fills, no gradients, no blur) as the original brief.
2. The two site-integration modules use the same palette and component styling as the SiteGrade page itself — one consistent system, not two.
3. The PDF report remains on the original light/paper palette, unless explicitly changed later.
4. The hard-glow offset-block technique is applied to the grade glyph and primary CTAs only, not universally.
5. Grade-band color logic (green/amber/orange/red mapped to A–F) is preserved, just in saturated neon rather than muted tones.
