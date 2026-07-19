# Antigravity Prompt — Hero Copy & Archive Terminology Unification

## Context
Next.js + React + TypeScript + Tailwind CSS + Framer Motion portfolio/business site (macallanbutler.com). Terminal/OS-themed design system ("PORTFOLIO_OS"). This is a targeted content and label edit across existing components — no new pages, no new routes, no structural or layout changes. Preserve all existing animations, motion behavior, and visual styling exactly as-is; only touch copy strings and the affected nav label.

## Objective
1. Add a new subhead line to the homepage hero.
2. Rename "View Project" button to "View Archive."
3. Rename "PROJECTS" nav item to "ARCHIVE" — globally, across every page's nav instance.

## Task 1 — Homepage Hero
Locate the homepage hero section (likely `app/page.tsx` or a `Hero` component). Current structure:

```
H1: Macallan Butler
H2: Full-Stack Developer
[View Project button] [Contact button]
```

Insert a new line between H2 and the button row. Recommend an `h3` or `p` tag depending on existing semantic hierarchy — inspect current heading levels before choosing, don't skip a level.

New copy (exact string):
```
System status: open to freelance clients and full-time teams. Explore the archive below.
```

Styling: match the site's existing terminal/system-status typographic treatment already used elsewhere on the page (e.g. the `SYS_UPTIME`, `Status: Online` UI elements) — reuse existing type scale/weight/color tokens for this line rather than introducing new ones. This line should read as part of the existing system-status visual language, not as a new UI pattern.

## Task 2 — Hero Button Label
Find the button currently labeled "View Project" (routes to `/gigs`). Change label text to:
```
View Archive
```
No change to route, styling, hover states, or click behavior — text content only.

## Task 3 — Global Nav Label
Find the nav item currently labeled "PROJECTS" (routes to `/gigs`) — this appears in the shared nav component used across all pages (`/`, `/gigs`, `/services`, `/about`, `/design-system`, `/comms`). Change label text to:
```
ARCHIVE
```
Since this is in a shared/global nav component, this single change should propagate to every page automatically — confirm it does, and confirm nav still renders identically otherwise (same 5 links, same order, same styling) on every route after the change.

## Explicitly Out of Scope
- Do not touch `/services`, `/design-system`, or `/comms` copy — those pages use their own internal vocabulary (Commercials, Protocols) and are intentionally unchanged.
- Do not rename the `/gigs` route itself or the on-page `PROJECT_ARCHIVE` header — only the nav label and hero button/subhead.
- Do not alter any animation timing, Framer Motion transitions, or the terminal boot-sequence behavior.
- Do not touch meta tags, og:title, or og:description.

## Verification
After changes, confirm:
- Hero renders H1 → H2 → new subhead → button row, in that order, on `/`.
- Both hero buttons ("View Archive" / "Contact") retain original routes and styles.
- Nav reads "ARCHIVE" (not "PROJECTS") on all 6 pages, with no layout shift from the label length change.
