# Technical Brief — Analytics Event Tracking Integration
**Site:** macallanbutler.com (Next.js / React)
**For:** Antigravity implementation
**Scope:** Extend existing GA4 tracking (gtag.js, no GTM) to capture qualified lead behavior across the site.

---

## ⚠️ Decision point — confirm before implementing

`analytics.ts` already defines `trackContactSubmit` (fires GA4 event `submit_contact`) and `trackProjectView` (fires `view_project`). This brief treats those as the canonical event names and extends them rather than introducing new ones (`contact_form_submitted`, `portfolio_item_click`), to avoid fragmenting data if either is already wired up and live in GA4.

**Confirm:** is `trackContactSubmit` currently called anywhere in the comms page submit handler? If not yet wired, this brief covers wiring it in for the first time. If it's already wired and reporting in GA4, this brief only adds the `package_interest` param on top of it.

---

## 1. Extend `analytics.ts` — add GA4 custom params support

Current `trackEvent` only supports UA-style category/label/value. GA4 needs arbitrary custom parameters (`package_interest`, `tier_name`, etc.) as first-class fields, not stuffed into `label`. Extend without breaking existing calls:

```ts
// analytics.ts

export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number,
  params?: Record<string, string | number | boolean>
) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
      ...params,
    });
  }
};

export const trackProjectView = (projectId: string, projectTitle: string) => {
  trackEvent("view_project", "engagement", `${projectId} (${projectTitle})`);
};

export const trackAudioToggle = (enabled: boolean) => {
  trackEvent("toggle_audio", "interface", enabled ? "unmute" : "mute");
};

export const trackContactSubmit = (method: string, packageInterest?: string) => {
  trackEvent("submit_contact", "conversion", method, undefined, {
    package_interest: packageInterest ?? "none",
  });
};

export const trackTerminalCommand = (command: string) => {
  trackEvent("execute_command", "terminal", command);
};

// --- New helpers below ---

export const trackTierInquireClick = (tierName: string) => {
  trackEvent("inquire_tier", "conversion", tierName, undefined, {
    tier_name: tierName,
  });
};

export const trackPricingCtaClick = (ctaLocation: string) => {
  trackEvent("cta_click", "engagement", ctaLocation, undefined, {
    cta_location: ctaLocation,
  });
};

export const trackScrollDepth = (pagePath: string, depth: number) => {
  trackEvent("scroll_depth", "engagement", `${depth}%`, depth, {
    page_path: pagePath,
  });
};

export const trackNavClick = (navItem: string) => {
  trackEvent("nav_click", "navigation", navItem, undefined, {
    nav_item: navItem,
  });
};

export const trackExternalLinkClick = (destination: string) => {
  trackEvent("external_link_click", "engagement", destination, undefined, {
    destination,
  });
};

export const trackEmailClick = (linkLocation: string) => {
  trackEvent("email_click", "engagement", linkLocation, undefined, {
    link_location: linkLocation,
  });
};
```

All new functions follow the existing file's naming and structure conventions exactly — no architectural changes, just additions.

---

## 2. Event-by-event implementation

### 2.1 `submit_contact` (existing, extend with `package_interest`)

**Location:** Comms page (`/comms`) form submit handler, success branch (existing 200 OK check).

**Add:** capture the `package` query param on page load, pass it into `trackContactSubmit` at submission time.

```ts
// on the comms page component
const searchParams = useSearchParams();
const packageInterest = searchParams.get("package") ?? "none";

// inside the existing 200 OK success branch:
trackContactSubmit("form", packageInterest);
```

- Uses Next's `useSearchParams` (App Router) — if this page is Pages Router, use `router.query.package` instead. Confirm which router this project uses before implementing.
- No redirect involved (confirmed: form shows inline "message delivered" state), so this fires reliably post-success, not on unload.

**GA4 Admin action (manual, not code):** mark `submit_contact` as a key event. Counting method: once per event (per earlier discussion — reliable since it's gated on confirmed 200 response, not just attempt).

---

### 2.2 `inquire_tier` (new)

**Location:** Pricing page, each tier's "Inquire about package" link (Starter / Standard / Custom).

**Two things happen on click:**
1. Fire `trackTierInquireClick(tierName)` — captures click-through interest per tier.
2. Navigate to `/comms?package={tierName}` — carries the tier forward so the eventual `submit_contact` event can be attributed by package.

```tsx
<Link
  href={`/comms?package=${tierSlug}`}
  onClick={() => trackTierInquireClick(tierSlug)}
>
  Inquire about package
</Link>
```

- `tierSlug` values: `starter`, `standard`, `custom` — use consistent lowercase slugs matching whatever identifiers the pricing component already uses internally, if any exist. If none exist yet, these three strings are the canonical set going forward.
- This gives two distinct GA4 metrics: **clicks per tier** (`inquire_tier` event) vs. **actual submitted leads per tier** (`submit_contact` events filtered by `package_interest`) — lets you see drop-off between interest and follow-through per tier.

---

### 2.3 `cta_click` (new)

**Location:** Any "Ready to get started?" or general CTA link that is *not* tier-specific (i.e., doesn't carry a `package` param) — e.g., homepage hero CTA, footer CTA.

```tsx
<Link href="/comms" onClick={() => trackPricingCtaClick("hero")}>
  Ready to get started?
</Link>
```

- `ctaLocation` values should describe placement, not page: `hero`, `footer`, `nav`. Antigravity should identify every instance of this CTA across the site and assign a location string per instance — need the current CTA inventory to finalize this list precisely (see open question at bottom).

---

### 2.4 `view_project` (existing, no changes needed)

Already covers portfolio item clicks. Confirm it's currently wired to the actual portfolio click handlers on the work/portfolio page — if any portfolio items don't currently call `trackProjectView`, wire those in using the existing function as-is.

---

### 2.5 `scroll_depth` (new)

**Location:** Pricing page and Services page (the two pages where "did they get far enough to see the offer" is the actual question worth answering).

**Implementation approach:** IntersectionObserver watching a sentinel element positioned at 75% of page height, fired once per page load (use a ref/flag to prevent duplicate fires on scroll-up-scroll-down).

```ts
useEffect(() => {
  let fired = false;
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !fired) {
        fired = true;
        trackScrollDepth(pathname, 75);
      }
    },
    { threshold: 0 }
  );
  const sentinel = document.getElementById("scroll-75-sentinel");
  if (sentinel) observer.observe(sentinel);
  return () => observer.disconnect();
}, [pathname]);
```

Sentinel element needs to be placed at the 75%-depth point in each target page's markup — Antigravity should calculate/estimate this position per page or use a percentage-based scroll listener as a simpler alternative if sentinel placement is impractical given the page's dynamic content height.

---

### 2.6 `nav_click` (new)

**Location:** Primary navigation component (wherever the site's main nav links live — header/nav component).

```tsx
<Link href="/services" onClick={() => trackNavClick("services")}>
  Services
</Link>
```

Apply to every primary nav item. `navItem` values should match the nav label in lowercase (e.g., `home`, `services`, `work`, `comms`).

---

### 2.7 `external_link_click` (new)

**Location:** Any outbound link — GitHub, LinkedIn, client project links (portfolio items linking to live client sites).

**Implementation approach:** rather than manually tagging every instance, consider a global click handler or a wrapper component that checks `href` against the site's own domain:

```ts
const isExternal = (href: string) => {
  try {
    return new URL(href, window.location.origin).origin !== window.location.origin;
  } catch {
    return false;
  }
};
```

Wire this into a shared `<ExternalLink>` component if one exists, or apply the check + `trackExternalLinkClick(href)` call at each known outbound link site (footer social links, portfolio client links) if a global wrapper isn't feasible without larger refactor.

---

### 2.8 `email_click` (new — requires new footer element first)

**Prerequisite:** add `macallan@macallanbutler.com` as a `mailto:` link in the site footer (currently not present anywhere on the site — flagged during this planning conversation as a gap).

```tsx
<a
  href="mailto:macallan@macallanbutler.com"
  onClick={() => trackEmailClick("footer")}
>
  macallan@macallanbutler.com
</a>
```

---

## 3. GA4 Admin — post-deployment steps (manual, not code)

Once events are live and confirmed firing (via GA4 DebugView), mark as key events:

- `submit_contact` — key event ✅ (primary conversion)
- Everything else (`inquire_tier`, `cta_click`, `scroll_depth`, `nav_click`, `external_link_click`, `email_click`) — leave as regular events, not key events. They're funnel diagnostics, not conversions themselves.

---

## 4. Open questions before Antigravity runs this

1. **Router confirmation:** App Router (`useSearchParams`) or Pages Router (`router.query`)? Changes the exact syntax in 2.1.
2. **Existing tier slugs:** does the pricing component already have internal identifiers for Starter/Standard/Custom, or should Antigravity establish `starter`/`standard`/`custom` as new canonical values?
3. **CTA inventory:** how many distinct "Ready to get started?" style CTAs exist across the site, and where? Needed to finalize `cta_location` values in 2.3.
4. **`trackContactSubmit` wiring status** — per the flag at the top of this doc, confirm whether it's already called in the comms form handler or needs first-time wiring.
