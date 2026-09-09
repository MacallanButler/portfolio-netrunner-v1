export interface CaseStudy {
  id: string;
  title: string;
  tagline: string;
  client: string;
  sector: string;
  timeline: string;
  role: string;
  techStack: string[];
  heroImage: string;
  overview: string;
  challenge: string;
  architecture: {
    framework: string;
    database: string;
    styling: string;
    deployment: string;
    rationale: string;
  };
  keyFeatures: {
    title: string;
    description: string;
    codeSnippetOrTech?: string;
  }[];
  performanceMetrics: {
    label: string;
    value: string;
    subtext: string;
  }[];
  liveUrl: string | null;
  repoUrl: string | null;
}

export const CASE_STUDIES: Record<string, CaseStudy> = {
  wrought: {
    id: "proj_wrought",
    title: "Wrought",
    tagline: "Custom DTC Hardware Flagship & Interactive Product Configurator",
    client: "Wrought (DTC Kitchenware Concept)",
    sector: "Consumer Hardware & DTC E-Commerce",
    timeline: "July 2026",
    role: "Lead Full-Stack Developer & UI Architect",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Framer Motion"],
    heroImage: "/previews/proj_wrought.webp",
    overview: "Wrought is a bespoke digital flagship engineered for a modular, dual-zone panini press. Rejecting standard, slow off-the-shelf templates, Wrought proves how custom software engineering and motion design elevate consumer hardware into an immersive brand experience.",
    challenge: "Generic e-commerce platforms struggle to communicate multi-component industrial design and technical product benefits without degrading load speed and mobile responsiveness.",
    architecture: {
      framework: "Next.js 16 (App Router) + React 19",
      database: "Supabase (PostgreSQL with Row-Level Security)",
      styling: "Tailwind CSS v4 + Framer Motion spring physics",
      deployment: "Vercel Edge Network + Stripe Checkout API",
      rationale: "Next.js static site generation with edge dynamic routes provides sub-second initial page loads while enabling instant Stripe checkout sessions and Supabase inventory syncing."
    },
    keyFeatures: [
      {
        title: "Interactive Exploded Component Diagram",
        description: "A custom interactive CAD-style component breakdown allowing buyers to inspect the dual-zone cast iron plates, floating hinge mechanism, and thermal heating elements with fluid micro-interactions."
      },
      {
        title: "Real-Time Temperature & Cook Simulator",
        description: "Interactive dual-dial temperature controls that visually demonstrate sear zones, cheese melt thresholds, and precision temperature regulation."
      },
      {
        title: "Dynamic Product Configuration & Stripe Cart",
        description: "A seamless cart drawer and single-page checkout flow integrated with Stripe test payment elements, eliminating third-party checkout redirects."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse Performance", value: "99/100", subtext: "Near-instant mobile FCP & LCP" },
      { label: "Checkout Initiation", value: "< 400ms", subtext: "Direct API session creation" },
      { label: "Core Web Vitals", value: "0.00 CLS", subtext: "Zero layout shift during animation" }
    ],
    liveUrl: "https://wrought.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  },
  apex_drop: {
    id: "apex_drop",
    title: "Apex Altitude",
    tagline: "Tiered Adventure Tourism Platform & Role-Based Booking Engine",
    client: "Apex Altitude",
    sector: "Adventure Tourism & Aviation Booking",
    timeline: "February 2026",
    role: "Full-Stack Developer & Systems Architect",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Stripe", "Zustand", "Supabase"],
    heroImage: "/previews/apex_drop.webp",
    overview: "Apex is a high-adrenaline skydiving booking and manifest operations platform. It combines transparent tiered pricing with a multi-step booking wizard, weather telemetry indicators, and guest-to-admin role access.",
    challenge: "Adventure tourism businesses face high checkout drop-off due to hidden fees, confusing equipment upsells, and fragmented booking software that forces customers offsite.",
    architecture: {
      framework: "Next.js App Router + TypeScript",
      database: "Supabase Postgres + Rails API integration",
      styling: "Tailwind CSS v4 + Radix UI Primitives",
      deployment: "Vercel + Stripe Payment Elements",
      rationale: "Zustand provides lightweight, multi-step booking wizard state management across jumps, equipment rentals, and jumpmaster scheduling without re-render thrash."
    },
    keyFeatures: [
      {
        title: "Multi-Step Booking & Manifest Wizard",
        description: "A streamlined step-by-step reservation system guiding customers through altitude selection (14,000ft vs 18,000ft HALO), media packages, and jump times."
      },
      {
        title: "Tiered Access & Operations Portal",
        description: "Differentiated role experiences spanning public guests, registered skydivers tracking logbooks, and jumpmaster admin manifests."
      },
      {
        title: "Transparent Dynamic Price Calculator",
        description: "Real-time fee transparency updating totals as video packages, weight accommodations, and seasonal slots are adjusted."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse Best Practices", value: "100/100", subtext: "Strict CSP and semantic markup" },
      { label: "Booking Wizard Completion", value: "3 Steps", subtext: "Frictionless checkout path" },
      { label: "State Hydration", value: "< 80ms", subtext: "Zero-latency step transitions" }
    ],
    liveUrl: "https://apex.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  },
  ghost_mountain: {
    id: "ghost_mountain",
    title: "Ghost of the Mountains",
    tagline: "Interactive Conservation Storytelling & Geo-Cartography Platform",
    client: "Conservation / Non-Profit Initiative",
    sector: "Environmental Non-Profit & Education",
    timeline: "February 2026",
    role: "Front-End Architect & Creative Engineer",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "D3-geo", "React-Simple-Maps", "Recharts", "Framer Motion"],
    heroImage: "/previews/ghost_mountain.webp",
    overview: "An immersive digital conservation experience educating the public on snow leopard ecology in the Himalayas. Features interactive branching narratives, geographic telemetry, and gamified educational micro-mechanics.",
    challenge: "Non-profit donations and educational content frequently suffer from static, uninspiring PDFs and text dumps that fail to engage modern digital donors.",
    architecture: {
      framework: "Next.js App Router + TypeScript",
      database: "Serverless JSON GeoJSON stores",
      styling: "Tailwind CSS + Framer Motion choreographies",
      deployment: "Vercel Edge Network",
      rationale: "Combining D3-geo with lightweight React-Simple-Maps SVG layers gives high-performance interactive cartography of Central Asian mountain ranges without the heavy overhead of WebGL."
    },
    keyFeatures: [
      {
        title: "Branching Snow Leopard Journey",
        description: "Interactive narrative following Khangri, a snow leopard traversing treacherous mountain corridors, where user choices impact survival outcomes."
      },
      {
        title: "Himalayan Habitat & Corridor Heatmaps",
        description: "Custom SVG geographic map layers showing territorial ranges, human-wildlife conflict zones, and protected sanctuary borders."
      },
      {
        title: "Integrated Donation & Adoption Funnel",
        description: "Direct conversion touchpoints embedded at pivotal emotional narrative moments, driving non-profit donor engagement."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse SEO & Accessibility", value: "100/100", subtext: "Full screen reader semantic ARIA" },
      { label: "SVG Render Latency", value: "60 FPS", subtext: "Silky smooth vector animations" },
      { label: "Narrative Engagement", value: "5 Chapters", subtext: "Branching choice tree structure" }
    ],
    liveUrl: "https://ghostmountain.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  },
  drive: {
    id: "drive",
    title: "Drive",
    tagline: "Cross-Platform Native Mobile Application for Automotive Culture",
    client: "Automotive Community & Social Concept",
    sector: "Native Mobile & Automotive Navigation",
    timeline: "August 2026",
    role: "Mobile Architect & Full-Stack Developer",
    techStack: ["React Native", "Expo", "TypeScript", "Mapbox GL", "Supabase", "Reanimated"],
    heroImage: "/previews/drive.png",
    overview: "Drive is a dark-mode, high-octane native mobile application designed for car enthusiasts. Built around positive cruise culture, scenic route discovery, and automotive community rather than street racing or toxicity.",
    challenge: "Mainstream navigation tools like Google Maps optimize strictly for fastest highway transit, ignoring winding scenic roads, elevation changes, and convoy cruise coordination.",
    architecture: {
      framework: "React Native (Expo SDK) + TypeScript",
      database: "Supabase (PostgreSQL, Auth, Realtime Channels)",
      styling: "Dynamic theme token engine (Asphalt Dark + Accent Glows)",
      deployment: "iOS & Android native application targets via EAS",
      rationale: "Mapbox Native (@rnmapbox/maps) delivers smooth vector tile rendering with custom dark map styles and custom route overlays at native 60fps."
    },
    keyFeatures: [
      {
        title: "Scenic Route Discovery & Curated Cruise Paths",
        description: "Community-rated driving routes featuring elevation profiles, twisty canyon ratings, pavement quality indicators, and scenic lookout waypoints."
      },
      {
        title: "Automotive Theming System",
        description: "A vehicle-unlocked theme architecture where users unlock customized design skins (JDM Akihabara neon, Euro precision silver, American Muscle amber) based on their garage."
      },
      {
        title: "Real-Time Convoy & Cruise Telemetry",
        description: "Supabase Realtime channels allow cruise leaders to coordinate group waypoints and member proximity without public broadcast."
      }
    ],
    performanceMetrics: [
      { label: "Native Map FPS", value: "60 FPS", subtext: "Hardware-accelerated Mapbox rendering" },
      { label: "Cross-Platform Codebase", value: "95% Shared", subtext: "Single codebase for iOS & Android" },
      { label: "Theme Switch Overhead", value: "0ms", subtext: "CSS variable token swap engine" }
    ],
    liveUrl: null,
    repoUrl: "https://github.com/MacallanButler"
  },
  blue_horizon: {
    id: "blue_horizon",
    title: "Blue Horizon",
    tagline: "Marine Conservation & Scuba Diving Intelligence Platform",
    client: "Marine & Dive Industry Concept",
    sector: "Adventure Tourism & Ocean Intelligence",
    timeline: "February 2026",
    role: "Full-Stack Developer & UI Architect",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Radix UI", "Zustand", "Zod", "Framer Motion"],
    heroImage: "/previews/blue_horizon.webp",
    overview: "A conservation-first dive booking and ocean intelligence platform. Features real-time marine life sighting heatmaps, crowd forecasting at popular reefs, and dynamic gear rental cost calculators.",
    challenge: "Reef preservation requires controlling dive traffic and educating divers on local marine habitats before booking, rather than treating dive excursions as commodity tourism.",
    architecture: {
      framework: "Next.js App Router + TypeScript",
      database: "Supabase Postgres + REST APIs",
      styling: "Tailwind CSS + Radix UI Primitives",
      deployment: "Vercel Edge Network",
      rationale: "React Hook Form paired with Zod validation enables robust multi-diver gear selection, certification verification, and booking calculations with zero hydration issues."
    },
    keyFeatures: [
      {
        title: "Marine Life Sighting & Reef Heatmaps",
        description: "Predictive sighting indicators for sea turtles, manta rays, and whale sharks based on seasonal ocean currents and water temperatures."
      },
      {
        title: "Dynamic Gear Rental Calculator",
        description: "Instant cost modeling for BCDs, regulators, wetsuit thicknesses, and nitrox tanks customized to diver skill levels."
      },
      {
        title: "Crowd Forecast & Conservation Impact Score",
        description: "Helps conscious divers choose quieter off-peak reef sessions to reduce environmental stress on vulnerable coral beds."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse Performance", value: "98/100", subtext: "Sub-second visual completion" },
      { label: "Form Validation Latency", value: "< 16ms", subtext: "Instant Zod client-side schema checks" },
      { label: "Accessibility Score", value: "100/100", subtext: "High-contrast ocean palette" }
    ],
    liveUrl: "https://bluehorizon.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  },
  proj_mom: {
    id: "proj_mom",
    title: "KB Travel",
    tagline: "Boutique Editorial Travel Planning Platform & Bespoke Itineraries",
    client: "KB Travel",
    sector: "Luxury Travel & Editorial Hospitality",
    timeline: "July 2026",
    role: "Full-Stack Developer & Brand Designer",
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase", "Leaflet", "Resend", "Framer Motion"],
    heroImage: "/previews/kb_card.webp",
    overview: "KB Travel is a calm, editorial travel planning platform featuring warm vintage motifs, a custom interactive compass cursor, destination mapping, and a bespoke itinerary request wizard.",
    challenge: "In an era of generic AI travel aggregators, human luxury travel planners need a digital presence that feels deeply personal, discerning, and high-touch.",
    architecture: {
      framework: "Next.js 16 + React 19",
      database: "Supabase (PostgreSQL with itinerary tables)",
      styling: "Tailwind CSS + Custom typography tokens",
      deployment: "Vercel + Resend Email API",
      rationale: "Leaflet interactive maps provide lightweight vintage destination cartography without the cookie tracking or billing weight of Google Maps."
    },
    keyFeatures: [
      {
        title: "Interactive Itinerary Consultation Wizard",
        description: "A tailored multi-step inquiry flow capturing travel styles, preferred pacing, culinary interests, and budget expectations."
      },
      {
        title: "Custom Compass Cursor & Micro-Interactions",
        description: "A delightful, bespoke compass needle cursor that responds to mouse velocity and directional travel themes."
      },
      {
        title: "The 'Why Human Over AI' Value Proposition",
        description: "Strategic storytelling highlighting the irreplaceable nuance of personal hotel relationships, off-menu dining reservations, and stress-free crisis support."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse Best Practices", value: "100/100", subtext: "Clean modern web standards" },
      { label: "Inquiry Completion Rate", value: "Sub-2 min", subtext: "Warm conversational form layout" },
      { label: "Email Dispatch", value: "< 1s", subtext: "Instant Resend confirmation delivery" }
    ],
    liveUrl: "https://kbtravel.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  },
  cafe_du_monde: {
    id: "cafe_du_monde",
    title: "Café Du Monde",
    tagline: "Heritage Brand Digital Modernization & A/B Design Direction Showcase",
    client: "Café Du Monde (Speculative Redesign)",
    sector: "Historic Hospitality & Food & Beverage",
    timeline: "March 2026",
    role: "Lead UI Architect & Front-End Developer",
    techStack: ["Next.js", "React", "Tailwind CSS", "Framer Motion"],
    heroImage: "/previews/cafe_du_monde_v1.webp",
    overview: "A speculative digital overhaul for New Orleans' iconic 160-year-old coffee and beignet institution. Delivers two distinct production-ready design directions: Concept A (moody, atmospheric French Quarter night) and Concept B (warm daylight French Market heritage).",
    challenge: "Legendary historic brands often have outdated 1990s-era websites that look neglected on modern smartphones, hurting their merchandise sales and brand prestige.",
    architecture: {
      framework: "Next.js + React",
      database: "Static asset pipeline + menu models",
      styling: "Tailwind CSS + custom French Quarter color palettes",
      deployment: "Vercel Edge Network",
      rationale: "Static generation allows instant sub-300ms page transitions between French Market history, mail-order chicory coffee orders, and location directories."
    },
    keyFeatures: [
      {
        title: "Dual A/B Design Direction Architecture",
        description: "Parallel implementations allowing brand stakeholders to toggle between dark atmospheric French Quarter night and sun-drenched French Market morning."
      },
      {
        title: "Editorial Visual Storytelling & Typography",
        description: "Custom serif typography paired with high-resolution photography showcasing beignet dusting and steaming chicory café au lait."
      },
      {
        title: "Merchandise & Mail-Order Showcase",
        description: "Clean product merchandising highlighting famous yellow coffee cans, beignet mix boxes, and vintage brand apparel."
      }
    ],
    performanceMetrics: [
      { label: "Lighthouse SEO", value: "100/100", subtext: "Structured recipe and local business JSON-LD" },
      { label: "Mobile LCP", value: "0.9s", subtext: "Ultra-optimized WebP asset pipeline" },
      { label: "A/B Switch Latency", value: "Instant", subtext: "Zero-rebuild parallel routes" }
    ],
    liveUrl: "https://cdm.macallanbutler.com",
    repoUrl: "https://github.com/MacallanButler"
  }
};

export function getCaseStudy(id: string): CaseStudy | undefined {
  // Direct match or normalized key
  if (CASE_STUDIES[id]) return CASE_STUDIES[id];
  const normalizedKey = id.replace(/^proj_/, "");
  if (CASE_STUDIES[normalizedKey]) return CASE_STUDIES[normalizedKey];
  return Object.values(CASE_STUDIES).find(cs => cs.id === id || cs.id === `proj_${id}`);
}
