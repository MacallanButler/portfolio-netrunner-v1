"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { NeonButton } from "@/components/core/NeonButton";
import { cn } from "@/lib/utils";
import {
  Check,
  Cpu,
  Sparkles,
  Zap,
  ArrowRight,
  Database,
  Smartphone,
  ShoppingCart,
  RotateCcw
} from "lucide-react";

interface PlatformType {
  id: string;
  name: string;
  tag: string;
  icon: React.ElementType;
  baseMin: number;
  baseMax: number;
  minWeeks: number;
  maxWeeks: number;
  description: string;
  recommendedStack: string;
}

const PLATFORMS: PlatformType[] = [
  {
    id: "flagship",
    name: "Bespoke Digital Flagship",
    tag: "Next.js · Tailwind · Sub-second LCP",
    icon: Sparkles,
    baseMin: 2000,
    baseMax: 3200,
    minWeeks: 2,
    maxWeeks: 3,
    description: "High-status editorial or brand experience with custom typography, fluid micro-interactions, and instant initial paint.",
    recommendedStack: "Next.js 16 (App Router) + Tailwind CSS + Framer Motion + Vercel Edge",
  },
  {
    id: "ecommerce",
    name: "Headless DTC E-Commerce",
    tag: "Next.js · Stripe / Shopify · Edge Cart",
    icon: ShoppingCart,
    baseMin: 3600,
    baseMax: 5400,
    minWeeks: 3,
    maxWeeks: 5,
    description: "Sub-50ms instant cart, custom product configurators, global currency checkout, and zero bloated template overhead.",
    recommendedStack: "Next.js 16 + Shopify Storefront API / Stripe + Tailwind + Redis Cart",
  },
  {
    id: "webapp",
    name: "Full-Stack Web App / SaaS",
    tag: "Next.js 16 · Supabase · Auth & Edge API",
    icon: Database,
    baseMin: 4500,
    baseMax: 7500,
    minWeeks: 4,
    maxWeeks: 6,
    description: "Multi-tenant dynamic web application with relational Postgres schema, user authentication, and role-based permissions.",
    recommendedStack: "Next.js 16 + Supabase (Postgres & Auth) + Prisma/Drizzle + Edge Functions",
  },
  {
    id: "mobile",
    name: "Cross-Platform Mobile App",
    tag: "React Native · Expo · iOS & Android",
    icon: Smartphone,
    baseMin: 4800,
    baseMax: 8200,
    minWeeks: 4,
    maxWeeks: 6,
    description: "Production iOS and Android application with offline cache, native gesture navigation, and unified TypeScript codebase.",
    recommendedStack: "React Native + Expo SDK + Supabase + Mapbox / Native Device APIs",
  },
  {
    id: "performance",
    name: "Performance & Core Web Vitals Overhaul",
    tag: "Diagnostic · Bundle Optimization · Grade A+",
    icon: Zap,
    baseMin: 1200,
    baseMax: 2200,
    minWeeks: 1,
    maxWeeks: 2,
    description: "Surgical modernization of existing sluggish sites: JavaScript tree-shaking, responsive image CDN, and 95+ Lighthouse.",
    recommendedStack: "Lighthouse CI + Edge Caching + Script Deferral + CSS Trimming",
  },
];

interface ScopeOption {
  id: string;
  label: string;
  multiplier: number;
  extraWeeks: number;
  description: string;
}

const SCOPES: ScopeOption[] = [
  {
    id: "lean",
    label: "Focused Scope (1–3 Views)",
    multiplier: 1.0,
    extraWeeks: 0,
    description: "Punchy, high-impact narrative or single-product launch page.",
  },
  {
    id: "standard",
    label: "Standard Commercial (4–7 Views)",
    multiplier: 1.25,
    extraWeeks: 1,
    description: "Comprehensive multi-page company presence with dedicated case study/service views.",
  },
  {
    id: "enterprise",
    label: "Comprehensive (8+ Views / Deep Architecture)",
    multiplier: 1.55,
    extraWeeks: 2,
    description: "Extensive product catalogs, custom portal views, and multi-tier content taxonomy.",
  },
];

interface AddonModule {
  id: string;
  name: string;
  tag: string;
  minPrice: number;
  maxPrice: number;
  extraDays: number;
  description: string;
}

const ADDONS: AddonModule[] = [
  {
    id: "cms",
    name: "Headless CMS & Content Model",
    tag: "Sanity / Decap / MDX",
    minPrice: 600,
    maxPrice: 900,
    extraDays: 3,
    description: "Enables non-technical team members to edit copy, publish case studies, and upload media with zero code.",
  },
  {
    id: "geo",
    name: "Interactive Geolocation & Maps",
    tag: "Mapbox GL / GeoJSON",
    minPrice: 750,
    maxPrice: 1200,
    extraDays: 4,
    description: "Custom dark-mode vector maps, interactive location clustering, and distance calculation.",
  },
  {
    id: "canvas_3d",
    name: "Custom 3D / WebGL / Canvas FX",
    tag: "Three.js / Shader Animation",
    minPrice: 900,
    maxPrice: 1500,
    extraDays: 5,
    description: "Interactive particle simulations, exploded 3D CAD models, or custom tactile canvas physics.",
  },
  {
    id: "seo_schema",
    name: "Automated SEO & JSON-LD Schema",
    tag: "Rich Snippets & Dynamic OG",
    minPrice: 400,
    maxPrice: 650,
    extraDays: 2,
    description: "Structured Google search data, automated OpenGraph preview image generators, and auto-sitemaps.",
  },
  {
    id: "auth_portal",
    name: "User Auth & Client Dashboard",
    tag: "Supabase / NextAuth",
    minPrice: 950,
    maxPrice: 1600,
    extraDays: 5,
    description: "Encrypted authentication, role-based access control (RBAC), and private member area.",
  },
  {
    id: "payments",
    name: "Stripe Merchant Architecture",
    tag: "Checkout & Subscriptions",
    minPrice: 650,
    maxPrice: 1100,
    extraDays: 3,
    description: "Secure payment processing, customer billing portal, and automated webhook fulfillment.",
  },
];

interface CarePlan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  features: string;
}

const CARE_PLANS: CarePlan[] = [
  {
    id: "none",
    name: "Self-Managed",
    price: 0,
    cadence: "No recurring retainer",
    features: "Clean code handoff, documentation, and 14-day post-launch warranty.",
  },
  {
    id: "growth",
    name: "Growth Care Plan",
    price: 150,
    cadence: "$150 / month",
    features: "Monthly Lighthouse audits, security & dependency patching, 3 hrs monthly dev.",
  },
  {
    id: "partner",
    name: "Partner Care Plan",
    price: 350,
    cadence: "$350 / month",
    features: "Bi-weekly strategy, priority 48hr SLA, Google Analytics insights, 6 hrs monthly dev.",
  },
];

export function ProjectEstimator() {
  const [platformId, setPlatformId] = useState<string>("flagship");
  const [scopeId, setScopeId] = useState<string>("standard");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["cms", "seo_schema"]);
  const [carePlanId, setCarePlanId] = useState<string>("growth");

  const activePlatform = useMemo(
    () => PLATFORMS.find((p) => p.id === platformId) || PLATFORMS[0],
    [platformId]
  );
  const activeScope = useMemo(
    () => SCOPES.find((s) => s.id === scopeId) || SCOPES[1],
    [scopeId]
  );
  const activePlan = useMemo(
    () => CARE_PLANS.find((c) => c.id === carePlanId) || CARE_PLANS[1],
    [carePlanId]
  );

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const resetDefaults = () => {
    setPlatformId("flagship");
    setScopeId("standard");
    setSelectedAddons(["cms", "seo_schema"]);
    setCarePlanId("growth");
  };

  // Computation logic
  const estimation = useMemo(() => {
    let baseMin = activePlatform.baseMin * activeScope.multiplier;
    let baseMax = activePlatform.baseMax * activeScope.multiplier;

    let addonDays = 0;
    for (const addonId of selectedAddons) {
      const addon = ADDONS.find((a) => a.id === addonId);
      if (addon) {
        baseMin += addon.minPrice;
        baseMax += addon.maxPrice;
        addonDays += addon.extraDays;
      }
    }

    // Round to nearest $50 for clean presentation
    const roundedMin = Math.round(baseMin / 50) * 50;
    const roundedMax = Math.round(baseMax / 50) * 50;

    const extraWeeksFromAddons = Math.ceil(addonDays / 5);
    const minWeeks = activePlatform.minWeeks + activeScope.extraWeeks;
    const maxWeeks = activePlatform.maxWeeks + activeScope.extraWeeks + extraWeeksFromAddons;

    return {
      minPrice: roundedMin,
      maxPrice: roundedMax,
      timelineStr: `${minWeeks}–${maxWeeks} Weeks`,
      monthlyRetainer: activePlan.price,
    };
  }, [activePlatform, activeScope, selectedAddons, activePlan]);

  // Construct contact URL with all estimator params
  const contactUrl = useMemo(() => {
    const params = new URLSearchParams({
      service: "estimator",
      type: activePlatform.name,
      scope: activeScope.label,
      addons: selectedAddons.join(","),
      plan: activePlan.name,
      est_min: `$${estimation.minPrice.toLocaleString()}`,
      est_max: `$${estimation.maxPrice.toLocaleString()}`,
      timeline: estimation.timelineStr,
    });
    return `/contact?${params.toString()}`;
  }, [activePlatform, activeScope, selectedAddons, activePlan, estimation]);

  return (
    <div id="estimator" className="space-y-8 w-full">
      {/* Header telemetry badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-neon-cyan tracking-widest uppercase mb-1">
            <Cpu size={12} className="animate-spin" />
            <span>ESTIMATOR_ENGINE // REAL-TIME SCOPE & BUDGET MATRIX</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Interactive Project & Scope Calculator
          </h2>
        </div>
        <button
          onClick={resetDefaults}
          className="flex items-center gap-1.5 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors self-start sm:self-auto"
        >
          <RotateCcw size={13} />
          <span>RESET_DEFAULTS</span>
        </button>
      </div>

      <p className="text-xs text-text-muted font-mono leading-relaxed max-w-3xl">
        Configure your technical parameters below to calculate an instant investment bracket, development sprint timeline, and architectural recommendation. No sales calls required to get transparent figures.
      </p>

      {/* Main Grid: Controls on left, Live Telemetry Card on right */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Form Controls (7 Cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* STEP 1: Platform Type */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-sm bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-mono text-[10px] flex items-center justify-center font-bold">
                01
              </span>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Select Core Platform Architecture
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {PLATFORMS.map((p) => {
                const Icon = p.icon;
                const isSelected = platformId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPlatformId(p.id)}
                    className={cn(
                      "text-left p-3.5 rounded-sm border transition-all duration-200 flex flex-col justify-between gap-3 relative overflow-hidden",
                      isSelected
                        ? "bg-neon-cyan/10 border-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.1)]"
                        : "bg-surface-card border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                    )}
                  >
                    {isSelected && (
                      <div className="absolute top-0 right-0 w-2 h-2 bg-neon-cyan" />
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Icon size={16} className={isSelected ? "text-neon-cyan" : "text-text-muted"} />
                        <span className="font-bold text-xs text-white leading-tight">{p.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-white/50 block">{p.tag}</span>
                    </div>
                    <p className="text-[11px] text-text-muted font-sans leading-relaxed">
                      {p.description}
                    </p>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between font-mono text-[10px]">
                      <span className="text-text-muted">Base Range:</span>
                      <span className={isSelected ? "text-neon-cyan font-semibold" : "text-white/80"}>
                        ${p.baseMin.toLocaleString()} – ${p.baseMax.toLocaleString()}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 2: Scope & Depth */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-sm bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-mono text-[10px] flex items-center justify-center font-bold">
                02
              </span>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Select Scope Volume
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {SCOPES.map((s) => {
                const isSelected = scopeId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setScopeId(s.id)}
                    className={cn(
                      "text-left p-3 rounded-sm border transition-all duration-200 flex flex-col justify-between gap-2 relative",
                      isSelected
                        ? "bg-neon-cyan/10 border-neon-cyan"
                        : "bg-surface-card border-white/10 hover:border-white/20 hover:bg-white/[0.02]"
                    )}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-white">{s.label}</span>
                        {isSelected && <Check size={13} className="text-neon-cyan" />}
                      </div>
                      <p className="text-[11px] text-text-muted font-sans leading-relaxed">
                        {s.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* STEP 3: High-Value Architectural Modules */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-sm bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-mono text-[10px] flex items-center justify-center font-bold">
                03
              </span>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Architectural Modules & Integrations
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {ADDONS.map((a) => {
                const isChecked = selectedAddons.includes(a.id);
                return (
                  <div
                    key={a.id}
                    onClick={() => toggleAddon(a.id)}
                    className={cn(
                      "cursor-pointer p-3 rounded-sm border transition-all duration-200 flex flex-col justify-between gap-2 select-none",
                      isChecked
                        ? "bg-white/[0.04] border-neon-cyan/60"
                        : "bg-surface-card border-white/10 hover:border-white/20"
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-0.5">
                        <span className="font-bold text-xs text-white block">{a.name}</span>
                        <span className="font-mono text-[9px] text-white/50">{a.tag}</span>
                      </div>
                      <div
                        className={cn(
                          "w-4 h-4 rounded-sm border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors",
                          isChecked
                            ? "bg-neon-cyan border-neon-cyan text-surface-dark"
                            : "border-white/30 bg-transparent"
                        )}
                      >
                        {isChecked && <Check size={11} className="stroke-[3]" />}
                      </div>
                    </div>
                    <p className="text-[10px] text-text-muted font-sans leading-relaxed">
                      {a.description}
                    </p>
                    <div className="font-mono text-[10px] text-neon-cyan pt-1 border-t border-white/5 flex justify-between">
                      <span>Investment:</span>
                      <span>+${a.minPrice} – ${a.maxPrice}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* STEP 4: Ongoing Care Retainer */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-sm bg-neon-cyan/10 border border-neon-cyan/40 text-neon-cyan font-mono text-[10px] flex items-center justify-center font-bold">
                04
              </span>
              <h3 className="text-sm font-bold font-mono text-white uppercase tracking-wider">
                Ongoing Care & Infrastructure Retainer
              </h3>
            </div>

            <div className="grid sm:grid-cols-3 gap-3">
              {CARE_PLANS.map((c) => {
                const isSelected = carePlanId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setCarePlanId(c.id)}
                    className={cn(
                      "text-left p-3 rounded-sm border transition-all duration-200 flex flex-col justify-between gap-2 relative",
                      isSelected
                        ? "bg-neon-cyan/10 border-neon-cyan"
                        : "bg-surface-card border-white/10 hover:border-white/20"
                    )}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-white">{c.name}</span>
                        {isSelected && <Check size={13} className="text-neon-cyan" />}
                      </div>
                      <div className="text-sm font-mono font-bold text-neon-cyan mb-1">{c.cadence}</div>
                      <p className="text-[10px] text-text-muted font-sans leading-relaxed">
                        {c.features}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Right Dynamic Telemetry HUD (5 Cols, Sticky) */}
        <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-4">
          <HoloCard title="ESTIMATION_TELEMETRY_HUD">
            <div className="space-y-6">
              
              {/* Top Summary Banner */}
              <div className="bg-surface-dark border border-white/10 p-4 rounded-sm space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-text-muted uppercase">Platform:</span>
                  <span className="font-mono text-xs text-white font-semibold text-right">{activePlatform.name}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-text-muted uppercase">Scope Tier:</span>
                  <span className="font-mono text-xs text-white text-right">{activeScope.label}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] text-text-muted uppercase">Modules Selected:</span>
                  <span className="font-mono text-xs text-neon-cyan font-bold">{selectedAddons.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-text-muted uppercase">Ongoing Retainer:</span>
                  <span className="font-mono text-xs text-white font-semibold">
                    {activePlan.price > 0 ? `$${activePlan.price}/month` : "None"}
                  </span>
                </div>
              </div>

              {/* Big Estimated Figures */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest block">
                    PROJECTED BUILD INVESTMENT:
                  </span>
                  <div className="text-3xl md:text-4xl font-mono font-bold text-white tracking-tight">
                    ${estimation.minPrice.toLocaleString()} – ${estimation.maxPrice.toLocaleString()}
                  </div>
                  {activePlan.price > 0 && (
                    <span className="font-mono text-xs text-neon-cyan/90 block">
                      + ${activePlan.price}/mo ongoing infrastructure maintenance
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-surface-dark/60 border border-white/10 p-3 rounded-sm space-y-0.5">
                    <span className="font-mono text-[9px] text-text-muted uppercase block">Target Sprint:</span>
                    <span className="font-mono text-sm text-white font-bold block">{estimation.timelineStr}</span>
                  </div>
                  <div className="bg-surface-dark/60 border border-white/10 p-3 rounded-sm space-y-0.5">
                    <span className="font-mono text-[9px] text-text-muted uppercase block">Terms:</span>
                    <span className="font-mono text-xs text-white font-semibold block">50% Start / 50% Launch</span>
                  </div>
                </div>
              </div>

              {/* Recommended Stack Readout */}
              <div className="space-y-1.5 pt-2 border-t border-white/10">
                <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                  Recommended Technical Blueprint:
                </span>
                <p className="font-mono text-xs text-white/80 bg-white/5 p-2.5 rounded-sm border border-white/5 leading-relaxed">
                  {activePlatform.recommendedStack}
                </p>
              </div>

              {/* 1-Click Brief Transmission CTA */}
              <div className="space-y-2 pt-2">
                <Link href={contactUrl} className="block w-full">
                  <NeonButton variant="primary" className="w-full text-xs py-3.5 flex items-center justify-center gap-2">
                    <span>LOCK IN SCOPE & TRANSMIT BRIEF</span>
                    <ArrowRight size={14} />
                  </NeonButton>
                </Link>
                <p className="text-[10px] font-mono text-center text-text-muted/70">
                  Transfers configuration to /contact with brief pre-composed. Response within 24 hours.
                </p>
              </div>

            </div>
          </HoloCard>
        </div>

      </div>
    </div>
  );
}
