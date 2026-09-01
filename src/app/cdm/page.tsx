"use client";

import React from "react";
import NextImage from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GlitchText } from "@/components/core/GlitchText";
import { SystemBadge } from "@/components/core/SystemBadge";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { trackExternalLinkClick } from "@/lib/analytics";

export default function CDMComparePage() {
  const { playClick } = useAudio();

  const handleLinkClick = (url: string) => {
    playClick();
    trackExternalLinkClick(url);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between py-8 px-4 md:px-8 max-w-6xl mx-auto space-y-12 relative">
      {/* Top HUD Nav */}
      <header className="flex justify-between items-center border-b border-white/10 pb-4 font-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-neon-cyan rounded-full animate-pulse" />
          <span className="text-text-muted">PROJECT // CDM_COMPARE_SUITE</span>
        </div>
        <Link
          href="/gigs"
          onClick={playClick}
          className="flex items-center gap-1.5 text-text-muted hover:text-neon-cyan transition-colors"
        >
          <ArrowLeft size={14} />
          <span>ARCHIVE</span>
        </Link>
      </header>

      {/* Hero Header */}
      <section className="text-center space-y-4 max-w-2xl mx-auto py-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white">
          <GlitchText text="CAFE_DU_MONDE" />
        </h1>
        <p className="font-mono text-xs text-neon-cyan tracking-widest uppercase">
          // DESIGN CONCEPT VARIANT TESTING (A/B)
        </p>
        <p className="text-sm text-text-muted leading-relaxed font-sans">
          An unsolicited design exploration comparing two distinct homepage concepts. Compare the aesthetics, typography, and layout directions below, then click to launch the live prototype nodes.
        </p>
      </section>

      {/* Comparison Grid */}
      <main className="grid md:grid-cols-2 gap-8 md:gap-12 flex-1">
        {/* Variant A (V1) Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="group relative flex flex-col justify-between border border-white/10 bg-surface-card p-6 md:p-8 rounded-sm shadow-xl"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />

          <div className="space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-lg font-bold font-mono tracking-wider text-white">
                NODE_A (V1)
              </h2>
              <SystemBadge label="BRAND HERITAGE" status="neutral" />
            </div>

            {/* Preview Image */}
            <div className="relative aspect-video w-full overflow-hidden border border-white/10 rounded-sm bg-surface-dark">
              <NextImage
                src="/previews/cafe_du_monde_v1.jpg"
                alt="Café Du Monde Concept A preview"
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/70 via-transparent to-transparent z-10 pointer-events-none" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// FRAMING</p>
              <p className="text-sm text-text-muted leading-relaxed font-sans min-h-[60px]">
                Emphasizes Cafe Du Monde's classic French Quarter history. Uses warm, brass-and-coffee color tones, elegant traditional serif typography, and a grid-aligned storytelling editorial layout.
              </p>
              
              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Tailwind CSS", "Framer Motion"].map((tech) => (
                  <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://cdmv1.macallanbutler.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick("https://cdmv1.macallanbutler.com")}
            className="mt-8 flex items-center justify-center gap-2 w-full py-3 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <span>LAUNCH CONCEPT A</span>
            <ExternalLink size={12} />
          </a>
        </motion.div>

        {/* Variant B (V2) Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="group relative flex flex-col justify-between border border-white/10 bg-surface-card p-6 md:p-8 rounded-sm shadow-xl"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 h-3 w-3 border-t-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute top-0 right-0 h-3 w-3 border-t-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute bottom-0 left-0 h-3 w-3 border-b-2 border-l-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />
          <div className="absolute bottom-0 right-0 h-3 w-3 border-b-2 border-r-2 border-neon-cyan opacity-40 group-hover:opacity-100 transition-opacity z-10" />

          <div className="space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h2 className="text-lg font-bold font-mono tracking-wider text-white">
                NODE_B (V2)
              </h2>
              <SystemBadge label="CYBERPUNK NEON" status="neutral" />
            </div>

            {/* Preview Image */}
            <div className="relative aspect-video w-full overflow-hidden border border-white/10 rounded-sm bg-surface-dark">
              <NextImage
                src="/previews/cafe_du_monde_v2.jpg"
                alt="Café Du Monde Concept B preview"
                fill
                priority
                className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/70 via-transparent to-transparent z-10 pointer-events-none" />
            </div>

            {/* Description */}
            <div className="space-y-4">
              <p className="font-mono text-[9px] text-text-muted uppercase tracking-widest">// FRAMING</p>
              <p className="text-sm text-text-muted leading-relaxed font-sans min-h-[60px]">
                Re-imagines Cafe Du Monde as a futuristic, neon-charged experience. Combines an ultra-premium dark-mode design with glowing gold-and-green details, bold modern sans-serif typography, and smooth micro-interactions.
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {["React", "Tailwind CSS", "Framer Motion", "Dark UI"].map((tech) => (
                  <span key={tech} className="text-[9px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/5 text-text-muted">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <a
            href="https://cdmv2.macallanbutler.com"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleLinkClick("https://cdmv2.macallanbutler.com")}
            className="mt-8 flex items-center justify-center gap-2 w-full py-3 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-widest uppercase transition-all duration-200 hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.2)]"
          >
            <span>LAUNCH CONCEPT B</span>
            <ExternalLink size={12} />
          </a>
        </motion.div>
      </main>

      {/* Footer / Pitch Disclaimer */}
      <footer className="border-t border-white/10 pt-4 flex flex-col sm:flex-row justify-between items-center gap-4 font-mono text-[10px] text-text-muted/60">
        <span>// SECURE NODE SYNC COMPLETE</span>
        <span className="text-center sm:text-right italic">
          This is an unsolicited A/B design concept comparison for educational illustration. Cafe Du Monde branding and name belong to their respective owners.
        </span>
      </footer>
    </div>
  );
}
