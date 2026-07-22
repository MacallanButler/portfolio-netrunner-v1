"use client";

import React from "react";
import Link from "next/link";

interface SiteGradeModuleProps {
  variant: "services" | "homepage";
}

export function SiteGradeModule({ variant }: SiteGradeModuleProps) {
  const isServices = variant === "services";

  const label = isServices 
    ? "[ MODULE: SITEGRADE.EXE — LOADED ]" 
    : "[ MODULE: RUN_DIAGNOSTIC ]";

  const headline = isServices 
    ? "Not sure where you're starting?" 
    : "Run a diagnostic on your own site.";

  const body = isServices
    ? "Get a free grade on your current site — performance, SEO, accessibility, and content — before you decide what you need."
    : "Free instant grade. No signup required to see your score.";

  return (
    <div className="w-full bg-[#0D0D0D] border-[3px] border-[#00FF00] text-text-primary p-6 md:p-8 rounded-none relative overflow-hidden font-sans shadow-[6px_6px_0px_0px_#00FF00]">
      <div className="flex flex-col space-y-4 items-start">
        {/* Monospace process label */}
        <span className="font-mono text-xs uppercase tracking-wider text-text-muted font-bold">
          {label}
        </span>
        
        {/* Neubrutalist display headline */}
        <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-white leading-tight">
          {headline}
        </h2>
        
        {/* Body Copy */}
        <p className="text-sm md:text-base font-medium text-text-primary max-w-2xl leading-relaxed">
          {body}
        </p>
        
        {/* CTA Button with Hard Glow */}
        <div className="relative inline-block mt-2">
          {/* Offset block (Neon Red) */}
          <div className="absolute inset-0 translate-x-[4px] translate-y-[4px] bg-[#FF003C] border-[3px] border-[#FF003C] pointer-events-none" />
          
          <Link
            href="/sitegrade"
            className="relative z-10 inline-block px-6 py-3 bg-[#00FF00] border-[3px] border-[#00FF00] text-[#0D0D0D] font-extrabold text-xs md:text-sm tracking-wider uppercase rounded-none select-none transition-transform hover:-translate-x-[2px] hover:-translate-y-[2px] active:translate-x-[4px] active:translate-y-[4px]"
          >
            Grade My Site &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
