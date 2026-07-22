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
    <div className="w-full bg-[#F5F1E8] border-[3px] border-[#111111] text-[#111111] p-6 md:p-8 rounded-none relative overflow-hidden font-sans shadow-[6px_6px_0px_0px_#111111]">
      <div className="flex flex-col space-y-4 items-start">
        {/* Monospace process label */}
        <span className="font-mono text-xs uppercase tracking-wider text-[#111111]/70 font-bold">
          {label}
        </span>
        
        {/* Neubrutalist display headline */}
        <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight text-[#111111] leading-tight">
          {headline}
        </h2>
        
        {/* Body Copy */}
        <p className="text-sm md:text-base font-medium text-[#222222] max-w-2xl leading-relaxed">
          {body}
        </p>
        
        {/* CTA Button */}
        <div className="pt-2">
          <Link
            href="/sitegrade"
            className="inline-block px-6 py-3 bg-[#2F60FF] hover:bg-[#1E4ED8] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#111111] transition-all border-[3px] border-[#111111] shadow-[4px_4px_0px_0px_#111111] text-white font-extrabold text-xs md:text-sm tracking-wider uppercase rounded-none select-none"
          >
            Grade My Site &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}
