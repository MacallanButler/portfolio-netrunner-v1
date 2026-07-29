# macallanbutler.com — SEO Follow-Up Brief

**Context:** Spot-check of macallanbutler.com's SEO surfaced two items worth addressing. This is a small, targeted brief — not a full audit. Metadata (canonical URLs, OG tags, Twitter Card, meta robots) is already solid and doesn't need touching.

---

## Task 1 — Verify the Ghost of the Mountains Archive Link

On `/gigs` (ARCHIVE), the Ghost of the Mountains project card shows "CLICK TO EXPAND" — the actual outbound link to `ghostofthemountains.org` appears to live inside a modal or expanded state that only renders on interaction.

**Check and fix if needed:**
- Confirm the link to `ghostofthemountains.org` is a real `<a href="https://ghostofthemountains.org">` element — not a `<div>`/`<button>` with an `onClick` handler that navigates via JS only. If it's JS-only, search engines can't crawl it and no link equity passes through, even though a human clicking it works fine.
- If it's currently JS-only, convert it to a proper anchor tag (can still trigger the same expand/modal interaction on click — just needs to be a real `href` underneath so it's crawlable, e.g. use an `<a>` with `onClick={(e) => e.preventDefault()}` pattern only if the modal behavior truly requires intercepting the click, otherwise just let the anchor navigate normally if that's acceptable UX)
- While in there, confirm the same is true for the Apex Drop and Blue Horizon project cards, if they also link out anywhere — same fix applies if any are JS-only

## Task 2 — Add Structured Data (JSON-LD)

No structured data currently exists on the site. Add:

- **Home page (`/`):** `Person` schema for Macallan Butler — `name`, `jobTitle` (e.g. "Full-Stack Developer"), `url`, `sameAs` (link to GitHub profile, and any other public professional profiles), `worksFor` (MCB Industries LLC, if you want the LLC surfaced here — optional)
- **`/gigs` (ARCHIVE):** `CollectionPage` schema wrapping the project listings, with each project card getting `CreativeWork` schema (`name`, `description`, short summary of industry/tech stack — matches the tags already shown on each card: Next.js, React, TypeScript, Tailwind CSS, etc.)
- **`/services`:** `Service` schema if this page lists offerings in a structured way (check current page content before implementing — only add if there's a clear service list to map to schema properties)

Validate all JSON-LD with Google's Rich Results Test before considering this done — malformed structured data does more harm than none at all.

## Task 3 — Verify `robots.txt`

Confirm `macallanbutler.com/robots.txt` exists, returns a 200, and correctly allows crawling of all public pages while pointing to the sitemap. This wasn't independently verifiable during the spot-check — quick confirmation only, no changes expected unless something's actually wrong.

---

## Verification Checklist

- [ ] Ghost of the Mountains card links to `ghostofthemountains.org` via a real, crawlable `<a href>` element
- [ ] Same confirmed for other project cards on `/gigs` that link out
- [ ] JSON-LD present on home and `/gigs`, validates with no errors in Rich Results Test
- [ ] `robots.txt` confirmed live and correctly configured
- [ ] Production build completes clean with no new errors
