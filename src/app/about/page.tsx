import type { Metadata } from "next";
import { GlitchText } from "@/components/core/GlitchText";
import { SecureCTA } from "@/components/core/SecureCTA";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `About ${BRAND.displayName} | Full-Stack Development Studio`,
  },
  description: `Learn about ${BRAND.legalName}, a full-stack web development and UI architecture studio founded by ${BRAND.founder}. Discover our tech stack, projects, and process.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-4 md:space-y-6 w-full py-2 md:py-4 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-10rem)] flex flex-col justify-between overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">ABOUT_OS</span>
              <span className="text-white/20 font-mono text-[10px]">|</span>
              <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                STATUS: Online
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1.5 text-white">
              <GlitchText text="MCB Systems — built by Macallan Butler." />
            </h1>
          </div>
        </div>

        {/* Body Copy */}
        <div className="max-w-[65ch] space-y-3.5 text-xs md:text-sm text-text-muted leading-relaxed font-sans">
          <p>
            MCB Systems LLC is a full-stack development and UI architecture studio founded by Macallan Butler, built on a B.S. in Graphic Information Technology (Full Stack Development emphasis) from Arizona State University. That technical training, paired with deliberate design principles, is what lets me engineer fast, polished web experiences for modern businesses and ambitious client projects.
          </p>
          <p>
            I&apos;m a devout believer in elegance — the ability to marry efficiency, simplicity, and usability into something seamless. That can sound abstract, so in practice it looks like this: tools like React, Next.js, Supabase, and Tailwind, used to build quickly and intuitively rather than getting in my own way. Building user-first and mobile-first lets me start from the core use case and work outward, checking that every component and feature is both necessary and on-brief. Done right, people get exactly what they came for — the booking, the donation, the information — without friction.
          </p>
          <p>
            Recent projects: Blue Horizon, a scuba diving platform with booking, dive sites, and conservation events; Apex, a skydiving site with tiered access from guest to admin, each tier with its own features; and Ghost of the Mountains — a conservation platform educating the public on snow leopard ecology and driving donations toward securing the species&apos; survival.
          </p>
          <p>
            MCB Systems partners with businesses looking for dependable, high-impact web development — whether that&apos;s launching a new digital presence from scratch or taking over ongoing site care.
          </p>
        </div>
      </div>

      {/* CTA */}
      <SecureCTA location="about" title="Ready to start?" description="Have a project in mind? Let's scope it." buttonText="Start inquiry" />
    </div>
  );
}
