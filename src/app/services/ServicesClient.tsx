"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { ProjectImage } from "@/components/core/ProjectImage";
import { SecureCTA } from "@/components/core/SecureCTA";
import { useProjectModal } from "@/context/ProjectModalContext";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";
import { Check, ChevronDown, ChevronUp, Cpu, ShieldCheck, X, Zap } from "lucide-react";
import Link from "next/link";

const OVERVIEW_PILLARS = [
  {
    title: "Builds",
    icon: Cpu,
    color: "#00FFFF",
    description: "New sites and redesigns — from a simple presence to a fully custom platform with booking, payments, or a CMS you can run yourself.",
  },
  {
    title: "SEO & Performance",
    icon: Zap,
    color: "#339933",
    description: "Sites built to actually get found — clean structure, fast load times, and ongoing monitoring so your search visibility doesn't quietly decay.",
  },
  {
    title: "Ongoing Care",
    icon: ShieldCheck,
    color: "#FF8A65",
    description: "Month-to-month maintenance plans — uptime monitoring, security updates, and a real person keeping your site healthy so you never have to think about it.",
  },
];

const ONE_TIME_TIERS = [
  {
    name: "STARTER",
    price: "$300–$500",
    tag: "Simple presence",
    description: "You need to exist online. Clean, fast, and professional — a place to send people.",
    features: [
      "Up to 4 pages",
      "Contact form",
      "Mobile friendly",
      "Basic SEO setup",
      "Domain connected",
      "1 round of revisions",
      "Gallery or portfolio",
      "Booking integration",
    ],
  },
  {
    name: "STANDARD",
    price: "$500–$800",
    tag: "Polished marketing",
    description: "Best fit for most small businesses. Built to convert visitors, not just look credible.",
    features: [
      "Everything in starter",
      "Up to 6 pages",
      "Gallery or portfolio section",
      "Testimonials section",
      "Booking link embedded",
      "Google Analytics",
      "2 rounds of revisions",
    ],
    highlight: true,
  },
  {
    name: "CUSTOM",
    price: "$800+",
    tag: "Custom build",
    description: "You have specific functionality needs. Quoted after discovery — no surprises.",
    features: [
      "Everything in standard",
      "Online booking or payments",
      "CMS — edit content yourself",
      "Email automations",
      "3 rounds of revisions",
      "Scoped per project",
    ],
  },
];

const MONTHLY_TIERS = [
  {
    name: "BASIC",
    price: "$75 / month",
    tag: "Keep the lights on",
    description: "The essentials. Your site stays live, secure, and up to date — with a little room for small changes.",
    features: [
      { name: "Uptime monitoring", included: true },
      { name: "SSL certificate checks", included: true },
      { name: "Dependency & security updates", included: true },
      { name: "Monthly backup verification", included: true },
      { name: "Domain & hosting renewal reminders", included: true },
      { name: "Up to 1hr of changes per month", included: true },
      { name: "Performance reporting", included: false },
      { name: "Strategy calls", included: false },
    ],
  },
  {
    name: "GROWTH",
    price: "$150 / month",
    tag: "Stay healthy & visible",
    description: "Everything in Basic, plus a monthly check-in on how your site is actually performing — in plain English.",
    features: [
      { name: "Everything in Basic", included: true },
      { name: "Monthly Lighthouse audit", included: true },
      { name: "Google Search Console review", included: true },
      { name: "Plain-English monthly report", included: true },
      { name: "Security headers audit", included: true },
      { name: "Up to 3hrs of work per month", included: true },
      { name: "Quarterly content refresh", included: false },
      { name: "Strategy calls", included: false },
    ],
    highlight: true,
  },
  {
    name: "PARTNER",
    price: "$350 / month",
    tag: "Grow together",
    description: "A real ongoing relationship. Monthly strategy, deeper analytics, and enough hours to keep the site evolving.",
    features: [
      { name: "Everything in Growth", included: true },
      { name: "Monthly strategy call (30 min)", included: true },
      { name: "Google Analytics review & insights", included: true },
      { name: "Quarterly content refresh", included: true },
      { name: "Up to 6hrs of work per month", included: true },
      { name: "Priority turnaround (48hr)", included: true },
    ],
  },
];

const COMPARISON_ROWS = [
  { name: "Uptime monitoring", basic: true, growth: true, partner: true },
  { name: "SSL certificate checks", basic: true, growth: true, partner: true },
  { name: "Dependency & security updates", basic: true, growth: true, partner: true },
  { name: "Monthly backup verification", basic: true, growth: true, partner: true },
  { name: "Domain & hosting renewal reminders", basic: true, growth: true, partner: true },
  { name: "Up to 1hr of changes per month", basic: true, growth: true, partner: true },
  { name: "Monthly Lighthouse performance audit", basic: false, growth: true, partner: true },
  { name: "Google Search Console review", basic: false, growth: true, partner: true },
  { name: "Plain-English monthly report", basic: false, growth: true, partner: true },
  { name: "Security headers & vulnerability audit", basic: false, growth: true, partner: true },
  { name: "Up to 3hrs of work per month", basic: false, growth: true, partner: true },
  { name: "Quarterly content refresh", basic: false, growth: false, partner: true },
  { name: "Monthly strategy call (30 min)", basic: false, growth: false, partner: true },
  { name: "Google Analytics review & insights", basic: false, growth: false, partner: true },
  { name: "Up to 6hrs of work per month", basic: false, growth: false, partner: true },
  { name: "Priority turnaround (48hr)", basic: false, growth: false, partner: true },
];

const DETAIL_ITEMS = [
  {
    title: "Uptime monitoring",
    desc: "I watch your site around the clock. If it goes down, I know before you do and start fixing it immediately.",
  },
  {
    title: "SSL certificate checks",
    desc: "Your site's security certificate needs to renew periodically. I make sure it never lapses — a lapsed SSL certificate flags your site as 'not secure' in every browser.",
  },
  {
    title: "Dependency & security updates",
    desc: "The packages and libraries your site runs on release updates regularly, including security patches. I apply these so your site isn't running on outdated, vulnerable code.",
  },
  {
    title: "Monthly backup verification",
    desc: "I confirm that your site's backup is current and restorable. Not just that a backup exists — that it actually works.",
  },
  {
    title: "Domain & hosting renewal reminders",
    desc: "Domains and hosting plans expire. I track your renewal dates and flag them well in advance so nothing ever goes dark because of a missed invoice.",
  },
  {
    title: "Lighthouse performance audit",
    desc: "Google's Lighthouse tool scores your site on performance, accessibility, SEO, and best practices. I run it monthly and flag anything that's slipped.",
  },
  {
    title: "Google Search Console review",
    desc: "Search Console shows how your site appears in Google — what people search to find you, how often you show up, and whether there are any indexing problems. I review it monthly and flag anything worth acting on.",
  },
  {
    title: "Plain-English monthly report",
    desc: "A short summary of how your site performed that month — uptime, performance score, traffic highlights, and any work done. Written for a business owner, not a developer.",
  },
  {
    title: "Security headers audit",
    desc: "A check of your site's HTTP security headers — a layer of protection that many sites overlook. I identify gaps and fix them.",
  },
  {
    title: "Quarterly content refresh",
    desc: "Four times a year I'll work with you to update your site's content — new photos, updated service descriptions, revised pricing, seasonal changes. Keeps things current without you having to think about it.",
  },
  {
    title: "Monthly strategy call",
    desc: "A 30-minute call to review your site's performance, discuss what's working, and plan any updates or additions. Keeps us aligned and your site moving forward.",
  },
  {
    title: "Google Analytics review",
    desc: "A monthly look at your traffic data — where visitors come from, which pages they spend time on, and where they drop off. I translate it into plain-language recommendations.",
  },
];

const FAQS = [
  {
    q: "Can I change plans later?",
    a: "Yes. You can upgrade, downgrade, or cancel at any time. Changes take effect the following month.",
  },
  {
    q: "What counts toward my monthly hours?",
    a: "Any work I do on your site beyond the standard maintenance tasks — updating copy, adjusting a layout, adding a new section, fixing a bug. I'll always tell you before using hours so there are no surprises.",
  },
  {
    q: "What if I need more hours one month?",
    a: "Additional work beyond your plan's hours is billed at $75/hr. I'll always confirm before going over.",
  },
  {
    q: "Do I need a retainer if you built my site?",
    a: "No — it's optional. But most clients find it valuable because something always comes up, and having a plan in place means it gets handled quickly without negotiating a new quote each time.",
  },
  {
    q: "What if my site breaks outside business hours?",
    a: "Uptime monitoring runs 24/7. If something critical breaks, I'll be notified and triage it as soon as possible. Partner plan clients get priority response within 48 hours.",
  },
];

export default function ServicesClient() {
  const { openProject } = useProjectModal();
  const [openDetails, setOpenDetails] = useState<Record<string, boolean>>({});
  const [openFaq, setOpenFaq] = useState<Record<number, boolean>>({});

  const toggleDetail = (key: string) => {
    setOpenDetails((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFaq = (idx: number) => {
    setOpenFaq((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Split projects based on dynamic brief groupings
  const portfolioBuilds = projectsData.filter((p) =>
    ["ghost_mountain", "apex_drop", "blue_horizon"].includes(p.id)
  );
  const conceptWork = projectsData.filter((p) => p.id === "cafe_du_monde");

  return (
    <div className="space-y-16 w-full py-4 max-w-6xl mx-auto">
      {/* ── HERO ── */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">SERVICES_OS</span>
          <span className="text-white/20 font-mono text-[10px]">|</span>
          <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            SYSTEM: Online
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4 text-white leading-tight">
          <GlitchText text="Websites that work as hard as you do." />
        </h1>
        <p className="text-text-muted font-mono text-sm max-w-2xl leading-relaxed">
          Builds, redesigns, SEO, and ongoing care — scoped honestly, priced transparently, no long-term contracts required.
        </p>
      </div>

      {/* ── THREE PILLARS OVERVIEW ── */}
      <section className="space-y-6">
        <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// THREE_PILLARS</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {OVERVIEW_PILLARS.map((p, idx) => {
            const Icon = p.icon;
            return (
              <HoloCard key={idx} className="flex flex-col gap-3">
                <div
                  className="w-10 h-10 rounded-sm border items-center justify-center flex mb-2"
                  style={{
                    borderColor: `${p.color}40`,
                    backgroundColor: `${p.color}08`,
                  }}
                >
                  <Icon size={20} style={{ color: p.color }} />
                </div>
                <h3 className="text-lg font-bold text-white">{p.title}</h3>
                <p className="text-xs text-text-muted leading-relaxed font-sans">{p.description}</p>
              </HoloCard>
            );
          })}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="space-y-8">
        <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// SHIPPED_PROOFS</h2>

        {/* Portfolio Builds */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Portfolio Builds</h3>
            <p className="text-xs text-text-muted/65 italic font-sans">
              Self-directed projects, built end-to-end to demonstrate range across industries — no clients yet, but built to the same standard I&apos;d bring to yours.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {portfolioBuilds.map((project) => (
              <div
                key={project.id}
                onClick={() => openProject(project as any)}
                className="group cursor-pointer border border-white/10 bg-surface-card rounded-sm overflow-hidden flex flex-col h-full hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.05)] transition-all duration-300"
              >
                <ProjectImage id={project.id} title={project.title} className="h-32" />
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-text-muted font-mono tracking-wider mt-1">{project.category}</p>
                  </div>
                  <span className="font-mono text-[9px] text-text-muted group-hover:text-neon-cyan/60 transition-colors">
                    &gt; DISCOVER
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Work */}
        <div className="space-y-4 pt-4 border-t border-white/5">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Concept Work</h3>
            <p className="text-xs text-text-muted/65 italic font-sans">
              Unsolicited builds, created for specific companies I admire — no affiliation, just proof of what I&apos;d do for them.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {conceptWork.map((project) => (
              <div
                key={project.id}
                onClick={() => openProject(project as any)}
                className="group cursor-pointer border border-white/10 bg-surface-card rounded-sm overflow-hidden flex flex-col h-full hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.05)] transition-all duration-300"
              >
                <ProjectImage id={project.id} title={project.title} className="h-32" />
                <div className="p-4 flex-1 flex flex-col justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-neon-cyan transition-colors">
                      {project.title}
                    </h4>
                    <p className="text-[11px] text-text-muted font-mono tracking-wider mt-1">{project.category}</p>
                  </div>
                  <span className="font-mono text-[9px] text-text-muted group-hover:text-neon-cyan/60 transition-colors">
                    &gt; DISCOVER
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS TEASER ── */}
      <section className="pt-6 border-t border-white/10">
        <div className="bg-surface-card border border-white/10 p-5 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs md:text-sm text-text-muted leading-relaxed max-w-2xl font-sans">
            Every project moves through the same four phases — Discovery & Scope, Design & Prototype, Build & Integrate, Launch & Handoff.
          </p>
          <Link href="/design-system" className="text-xs font-mono text-neon-cyan hover:underline flex-shrink-0">
            See the full process &rarr;
          </Link>
        </div>
      </section>

      {/* ── ONE-TIME BUILDS (FIRST AGAIN!) ── */}
      <section className="space-y-8 pt-6 border-t border-white/10">
        <div className="space-y-2">
          <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// COMMERCIALS_ONE_TIME</h2>
          <h3 className="text-2xl font-bold text-white">One-Time Build Packages</h3>
          <p className="text-xs text-text-muted font-mono leading-relaxed max-w-3xl">
            <strong>MACALLAN BUTLER — WEB DEVELOPMENT</strong><br />
            Simple websites that work as hard as you do.<br />
            Every project starts with a conversation. These tiers are a starting point — your actual quote depends on what you need. Not sure which fits? Pick the one that sounds closest and we&apos;ll figure it out together.
          </p>
        </div>

        <div className="font-mono text-xs font-bold text-neon-cyan tracking-widest mb-4">// ONE-TIME BUILD</div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {ONE_TIME_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={cn(
                "relative overflow-hidden rounded-sm border bg-surface-card p-6 flex flex-col justify-between gap-6 transition-all duration-300",
                tier.highlight
                  ? "border-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.05)]"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-neon-cyan text-surface-dark font-mono text-[9px] px-2 py-0.5 tracking-wider font-semibold rounded-bl-sm">
                  POPULAR
                </div>
              )}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-wider block">
                    {tier.name}
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight">{tier.price}</div>
                  <span className="text-xs font-mono text-white/50 block italic">{tier.tag}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-sans border-t border-white/5 pt-3">
                  {tier.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {tier.features.map((f, fIdx) => (
                    <li key={fIdx} className="text-xs font-mono text-white/70 flex items-start gap-2">
                      <Check size={14} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/comms" className="w-full">
                <NeonButton variant={tier.highlight ? "primary" : "secondary"} className="w-full text-xs">
                  Inquire Package
                </NeonButton>
              </Link>
            </div>
          ))}
        </div>

        {/* A few things to know disclaimer */}
        <div className="border border-white/10 bg-surface-dark/40 p-5 rounded-sm max-w-4xl mx-auto">
          <p className="text-xs text-text-muted font-mono leading-relaxed">
            <strong>A few things to know:</strong> All builds include deployment to a fast, reliable host. Copywriting and logo design are not included but can be quoted separately. A 50% deposit is required to begin — the remaining balance is due at launch. Retainer plans are month-to-month with no long-term commitment.
          </p>
        </div>
      </section>

      {/* ── MONTHLY PLANS (SECOND!) ── */}
      <section className="space-y-8 pt-8 border-t border-white/10">
        <div className="space-y-2">
          <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// COMMERCIALS_MONTHLY</h2>
          <h3 className="text-2xl font-bold text-white">Monthly Care Plans</h3>
          <p className="text-xs text-text-muted font-mono leading-relaxed max-w-3xl">
            <strong>MACALLAN BUTLER — WEB DEVELOPMENT</strong><br />
            Ongoing care for your website.<br />
            Your site isn&apos;t a one-time thing — it needs to stay fast, secure, and up to date. These plans keep it that way so you never have to think about it. All plans are month-to-month with no long-term commitment.
          </p>
        </div>

        <div className="font-mono text-xs font-bold text-neon-cyan tracking-widest mb-4">// MONTHLY PLANS</div>

        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {MONTHLY_TIERS.map((tier, idx) => (
            <div
              key={idx}
              className={cn(
                "relative overflow-hidden rounded-sm border bg-surface-card p-6 flex flex-col justify-between gap-6 transition-all duration-300",
                tier.highlight
                  ? "border-neon-cyan shadow-[0_0_20px_rgba(0,255,255,0.05)]"
                  : "border-white/10 hover:border-white/20"
              )}
            >
              {tier.highlight && (
                <div className="absolute top-0 right-0 bg-neon-cyan text-surface-dark font-mono text-[9px] px-2 py-0.5 tracking-wider font-semibold rounded-bl-sm">
                  POPULAR
                </div>
              )}
              <div className="space-y-4">
                <div className="space-y-1">
                  <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-wider block">
                    {tier.name}
                  </span>
                  <div className="text-3xl font-bold text-white tracking-tight">{tier.price}</div>
                  <span className="text-xs font-mono text-white/50 block italic">{tier.tag}</span>
                </div>
                <p className="text-xs text-text-muted leading-relaxed font-sans border-t border-white/5 pt-3">
                  {tier.description}
                </p>
                <ul className="space-y-2 pt-2 border-t border-white/5">
                  {tier.features.map((f, fIdx) => (
                    <li
                      key={fIdx}
                      className={cn(
                        "text-xs font-mono flex items-start gap-2",
                        f.included ? "text-white/70" : "text-white/20 line-through"
                      )}
                    >
                      {f.included ? (
                        <Check size={14} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                      ) : (
                        <X size={14} className="text-neon-red mt-0.5 flex-shrink-0 opacity-40" />
                      )}
                      <span>{f.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/comms" className="w-full">
                <NeonButton variant={tier.highlight ? "primary" : "secondary"} className="w-full text-xs">
                  Subscribe Plan
                </NeonButton>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── FULL COMPARISON TABLE ── */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <h3 className="text-xl font-bold text-white font-mono tracking-tight text-center md:text-left">
          // FULL_COMPARISON
        </h3>

        {/* Desktop Table View (visible on md+) */}
        <div className="hidden md:block overflow-x-auto border border-white/10 bg-surface-card rounded-sm">
          <table className="w-full text-left border-collapse font-mono text-xs">
            <thead>
              <tr className="border-b border-white/10 bg-white/5">
                <th className="p-4 font-bold text-neon-cyan uppercase tracking-wider">What&apos;s included</th>
                <th className="p-4 font-bold text-white text-center w-28">Basic</th>
                <th className="p-4 font-bold text-white text-center w-28">Growth</th>
                <th className="p-4 font-bold text-white text-center w-28">Partner</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white/80">{row.name}</td>
                  <td className="p-4 text-center">
                    {row.basic ? (
                      <Check size={16} className="text-neon-cyan mx-auto" />
                    ) : (
                      <span className="text-white/10">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.growth ? (
                      <Check size={16} className="text-neon-cyan mx-auto" />
                    ) : (
                      <span className="text-white/10">—</span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {row.partner ? (
                      <Check size={16} className="text-neon-cyan mx-auto" />
                    ) : (
                      <span className="text-white/10">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Accordion/List View (visible below md) */}
        <div className="block md:hidden space-y-4">
          {["Basic", "Growth", "Partner"].map((planName) => {
            const key = planName.toLowerCase() as "basic" | "growth" | "partner";
            return (
              <div key={planName} className="border border-white/10 bg-surface-card p-4 rounded-sm space-y-3">
                <h4 className="font-mono text-xs text-neon-cyan font-bold uppercase tracking-wider">
                  {planName} Plan Features
                </h4>
                <ul className="space-y-2 border-t border-white/5 pt-2">
                  {COMPARISON_ROWS.filter((r) => r[key]).map((row, idx) => (
                    <li key={idx} className="text-[11px] font-mono text-white/70 flex items-start gap-2">
                      <Check size={12} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                      <span>{row.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── WHAT'S ACTUALLY INCLUDED (ACCORDION DETAILS) ── */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div className="space-y-1">
          <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// OPERATIONS_DEEP_DIVE</h2>
          <h3 className="text-xl font-bold text-white">What&apos;s actually included</h3>
          <p className="text-xs text-text-muted/75 font-sans italic">
            These aren&apos;t buzzwords — here&apos;s what each service means in practice.
          </p>
        </div>

        <div className="border border-white/10 bg-surface-card rounded-sm divide-y divide-white/10">
          {DETAIL_ITEMS.map((item, idx) => {
            const isOpen = !!openDetails[item.title];
            return (
              <div key={idx} className="font-mono text-xs">
                <button
                  onClick={() => toggleDetail(item.title)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-white tracking-wider">{item.title}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-neon-cyan" />
                  ) : (
                    <ChevronDown size={16} className="text-text-muted" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-text-muted font-sans text-xs leading-relaxed border-t border-white/5 mt-1 bg-surface-dark/25">
                        {item.desc}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FAQS ── */}
      <section className="space-y-6 pt-8 border-t border-white/10">
        <div className="space-y-1">
          <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">// FREQUENT_QUERIES</h2>
          <h3 className="text-xl font-bold text-white">Common Questions</h3>
        </div>

        <div className="border border-white/10 bg-surface-card rounded-sm divide-y divide-white/10">
          {FAQS.map((item, idx) => {
            const isOpen = !!openFaq[idx];
            return (
              <div key={idx} className="font-mono text-xs">
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors focus:outline-none"
                >
                  <span className="font-bold text-white tracking-wider">{item.q}</span>
                  {isOpen ? (
                    <ChevronUp size={16} className="text-neon-cyan" />
                  ) : (
                    <ChevronDown size={16} className="text-text-muted" />
                  )}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-text-muted font-sans text-xs leading-relaxed border-t border-white/5 mt-1 bg-surface-dark/25">
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <SecureCTA
        title="Ready to get started?"
        description="Ready to get started? macallan@macallanbutler.com"
        buttonText="Get in touch"
        hideOnMobile={false}
      />
    </div>
  );
}
