# UPDATE BRIEF — MCB Systems LLC Rebrand
**Target site:** macallanbutler.com (Next.js App Router)
**Type:** Content, metadata, and structural update — not a new build
**Prepared for:** Antigravity
**Context for Antigravity:** This is an existing, deployed site. Every change below is an edit to existing components/pages, not new scaffolding. Preserve all existing layout, animation (decrypt/glitch intro, sessionStorage gating), routing, and design tokens unless a change explicitly says otherwise. Do not regenerate pages from scratch — locate and edit.

---

## 0. WHY THIS CHANGE IS HAPPENING

Macallan is filing **MCB Systems LLC** as the legal entity behind this business. Site direction has shifted: this is no longer a dual-purpose "portfolio + freelance" site hedging toward a full-time hiring audience. **It is now a business-first site for MCB Systems LLC.** Drop hiring-manager/résumé framing wherever it appears. Every page should read like a real company's site, not an individual's freelance portfolio.

---

## 1. SINGLE SOURCE OF TRUTH FOR BRAND STRINGS

Before touching individual pages: locate wherever site metadata is currently defined (this appears to be duplicated per-page via the Next.js Metadata API — `meta-author`, `meta-creator`, `og:site_name` are identical across every page checked). Consolidate into one exported config, e.g.:

```ts
// lib/brand.ts (or wherever site constants currently live)
export const BRAND = {
  legalName: "MCB Systems LLC",
  displayName: "MCB Systems",
  founder: "Macallan Butler",
  siteUrl: "https://macallanbutler.com",
  contactEmail: "macallan@macallanbutler.com",
};
```

Then update every page's metadata export to pull from this object instead of hardcoded "Macallan Butler" strings. This makes the next rebrand (if any) a one-file edit instead of a per-page hunt.

**Specific swaps:**
- `meta-author` → `BRAND.displayName` ("MCB Systems")
- `meta-creator` → `BRAND.displayName`
- `og:site_name` → `BRAND.displayName`
- Page `<title>` tags: keep descriptive per-page titles, but swap the trailing brand suffix from "| Macallan Butler" to "| MCB Systems"
- `meta-keywords`: add "MCB Systems", "Web Development LLC", "Software Development Company" alongside existing keywords (keep "Macallan Butler" — still valid for founder-name searches)

---

## 2. GLOBAL NAV — BRAND MARK

**Current:** Header logo/link reads `MB_SYSTEMS`, links to `/`.

**Change (CONFIRMED):** Update to `MCB_SYSTEMS` site-wide (every page — this is the persistent header element).

Check for any other places `MB_SYSTEMS` appears as a literal string (not just the nav): favicon alt text, any hardcoded aria-labels, loading-state text, console/terminal-flavored copy elsewhere in the codebase referencing "MB" abbreviation specifically.

---

## 3. HOMEPAGE (`/`)

**Current copy issues:**
- `### System status: open to freelance clients and full-time teams. Explore the archive below.` — this is the hiring-manager hedge. Remove the "full-time teams" half entirely.

**New copy direction:**
```
### System status: Open for new client work. Explore the archive below.
```
(Exact wording flexible — Antigravity/Macallan can iterate — but the instruction is: remove any language implying availability for full-time employment. This is a company site now, not a job-seeking portfolio.)

**Hero headline (CONFIRMED CHANGE):** Replace the primary hero headline `MACALLAN_BUTLER` with `MCB_SYSTEMS`. Add a subline beneath it: `Founded by Macallan Butler`. This keeps the company name as the primary entity on the page (matches nav, footer, legal pages) while preserving Macallan's personal-name SEO/recognition rather than dropping it entirely. Update the existing subhead (`Full-Stack Developer & UI Architect`) to describe the company rather than the individual, e.g. `Full-Stack Development & UI Architecture Studio` — exact wording flexible, but it should read as a company descriptor, not a personal job title.

Check whether the hero headline string is reused elsewhere (browser tab title, OG image generation, social preview cards) — if `MACALLAN_BUTLER` is baked into a generated OG image template rather than pulled dynamically from a single source, that template needs the same swap or previews will show stale branding.

---

## 4. ABOUT PAGE (`/about`)

**Current:** First-person personal bio — ASU degree, personal design philosophy, "You can usually find me at a coffee shop... splitting time between freelance work and full-time opportunities."

**Rewrite direction — from personal résumé to company narrative:**

- Cut entirely: *"You can usually find me at a coffee shop, splitting time between freelance work and full-time opportunities. Always looking for the next adventurous project — if your team needs help moving one forward, I'm your guy."* — this is pure job-seeking language and directly contradicts the new direction.
- Reframe the opening from "Hi, I'm Macallan" to something that establishes MCB Systems as the entity doing the work, with Macallan as founder/builder. Example direction (Antigravity should draft full copy, not just patch this line):

```
# MCB Systems — built by Macallan Butler.

MCB Systems LLC is a full-stack development studio founded by Macallan Butler,
built on a B.S. in Graphic Information Technology (Full Stack Development
emphasis) from Arizona State University...
```

- Keep the technical credibility content (stack, design philosophy, recent projects — Blue Horizon, Apex, Ghost of the Mountains) — this is legitimate proof-of-work regardless of framing, just re-anchor it to the company rather than "me, available for hire."
- CTA section ("Ready to start?") — change "Let's talk" framing to client-inquiry framing rather than general "get in touch," e.g. *"Have a project in mind? Let's scope it."*

---

## 5. SERVICES PAGE (`/services`)

Content and pricing tiers are fine structurally — no functional changes needed. Copy-level swap only:

- Hero subhead and section framing should read as MCB Systems offerings, not personal freelance rates. E.g., any implicit "my rates" / "I offer" language → "MCB Systems offers" / "we scope every project..." Use judgment on singular "I" vs. company "we" — see Section 8, this needs Macallan's call on voice (see note below).
- `og:site_name` and meta swaps per Section 1 apply here.

---

## 6. COMMS / CONTACT PAGE (`/comms`)

Page renders client-side (form content not visible in a static fetch — Antigravity should locate the actual form component directly rather than relying on this brief's description of visible copy).

**Add:** A short line near the top of the form establishing who they're contacting, e.g.:
```
You're reaching out to MCB Systems LLC. Every inquiry gets a response within 1 business day.
```

Check whether the form currently has any terms-acceptance checkbox or data-use disclosure. If not, add a minimal one linking to the new Privacy Policy (Section 9) — required now that there's an actual entity and a live GA4 + lead-capture (Sitegrade) pipeline collecting data.

---

## 7. ARCHIVE PAGE (`/gigs`)

No structural changes needed here — "Portfolio Builds" → "Independent Builds" heading fix has already been handled outside this brief. Reframe section intros lightly to company voice if it reads too personal, e.g. "Self-directed projects, built end-to-end to demonstrate range across industries" → fine to leave, already reads studio-neutral. Leave "Concept Work" section as-is.

---

## 8. FOOTER (NEW — site-wide component)

No footer currently exists on any page. Build one, applied globally (likely via the root layout).

**Required content:**
```
© 2026 MCB Systems LLC. All rights reserved.
Privacy Policy   |   Terms of Service
```
- Style should match the existing terminal/system aesthetic (see design-system doc / existing component patterns — don't introduce a generic footer that breaks the site's visual language).
- Links: `/privacy` and `/terms` (see Section 9).

---

## 9. NEW PAGES: PRIVACY POLICY & TERMS OF SERVICE

**`/privacy`** — Standard small-business privacy policy, naming **MCB Systems LLC** as the data controller. Must cover:
- What data is collected: contact form submissions (name, email, message), Sitegrade tool inputs (submitted URL + any contact info collected there), GA4 analytics (page views, events per existing GA4 event taxonomy — `submit_contact`, `inquire_tier`, `cta_click`, `scroll_depth`, `nav_click`, `external_link_click`, `email_click`)
- Third parties data is shared with / processed by: Google Analytics 4, any email service used for form delivery (Resend, per existing stack)
- How long data is retained, how to request deletion, contact email for privacy requests (`macallan@macallanbutler.com`)
- Cookie/tracking disclosure for GA4

**`/terms`** — Standard terms of service for a web development service business under MCB Systems LLC:
- Services described in general terms (web design/development, hosting deployment, ongoing maintenance — consistent with the Services page tiers)
- Payment terms reference (50% deposit / 50% at launch — consistent with existing Scope of Work document)
- IP/ownership terms (client owns codebase upon final payment — consistent with existing SOW template)
- Limitation of liability, governing law (**note: update to Illinois once LLC is finalized** — flagged as an open item in Macallan's business docs already)
- Portfolio display rights (MCB Systems retains right to display completed projects — consistent with existing SOW)

> Use Macallan's existing Scope of Work and Client Onboarding documents as the source of truth for terms language — don't invent new payment/ownership terms that could conflict with the signed client contracts.

Both pages should follow the site's existing page shell/nav/footer pattern — not a stripped-down legal-only layout.

---

## 10. STRUCTURED DATA (JSON-LD)

Cannot verify current schema via static fetch — Antigravity should locate existing schema.org implementation directly.

**Add:** An `Organization` schema entry for MCB Systems LLC:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "MCB Systems LLC",
  "url": "https://macallanbutler.com",
  "founder": {
    "@type": "Person",
    "name": "Macallan Butler"
  },
  "email": "macallan@macallanbutler.com"
}
```
If an existing `Person` schema for Macallan is present, add a `worksFor` or `affiliation` property pointing to this Organization entity rather than replacing the Person schema outright — you want both entities represented, not one overwriting the other.

---

## 11. DECISIONS CONFIRMED

1. **Nav mark:** `MB_SYSTEMS` → `MCB_SYSTEMS`. Confirmed.
2. **Voice:** First-person singular ("I build...") throughout Services/About — this is a solo LLC, "I" is accurate and stays. Do not switch to "we."
3. **Home hero:** `MACALLAN_BUTLER` → `MCB_SYSTEMS`, with "Founded by Macallan Butler" as subline. Confirmed — see Section 3 for full spec.

No open questions remain. Antigravity should flag anything genuinely ambiguous encountered mid-build rather than guessing, but nothing above requires further sign-off before starting.

---

## 12. VERIFICATION CHECKLIST (post-deploy)

Per established pattern on this project — **do not trust Antigravity's completion report alone.** Verify in an incognito browser:
- [ ] Nav mark renders correctly on all pages (mobile + desktop)
- [ ] Footer renders on every page, links resolve to `/privacy` and `/terms`
- [ ] `/privacy` and `/terms` are live, indexed correctly (check `noindex` isn't accidentally applied if that's not desired)
- [ ] View page source on 2–3 pages to confirm `og:site_name` and meta author actually updated (view-source, not just rendered DOM — metadata bugs have hidden here before on this project)
- [ ] JSON-LD validates via Google's Rich Results Test
- [ ] About page no longer contains any "full-time" / "available for hire" language
- [ ] Homepage hero copy confirmed against Section 11, Q3 decision
