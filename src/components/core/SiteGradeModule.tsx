"use client";

import React from "react";
import Link from "next/link";
import { NeonButton } from "@/components/core/NeonButton";

interface SiteGradeModuleProps {
  variant: "services" | "homepage";
}

export function SiteGradeModule({ variant }: SiteGradeModuleProps) {
  const isServices = variant === "services";

  const label = isServices 
    ? "// SITEGRADE_DIAGNOSTIC" 
    : "[ RUN_DIAGNOSTIC ]";

  const headline = isServices 
    ? "Not sure where you're starting?" 
    : "Run a diagnostic on your own site.";

  const body = isServices
    ? "Get a free grade on your current site — performance, SEO, accessibility, and content — before you decide what you need."
    : "Free instant grade. No signup required to see your score.";

  return (
    <div className="w-full space-y-4">
      {/* Label */}
      {isServices ? (
        <h2 className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
          {label}
        </h2>
      ) : (
        <div className="flex items-center gap-2 mb-1">
          <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full animate-pulse" />
          <span className="text-xs font-mono text-neon-cyan tracking-widest">{label}</span>
        </div>
      )}
      
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
        {headline}
      </h3>
      
      {/* Body */}
      <p className="text-xs md:text-sm text-text-muted font-sans max-w-2xl leading-relaxed">
        {body}
      </p>
      
      {/* CTA Button */}
      <div className="pt-2">
        <Link href="/sitegrade">
          <NeonButton variant="primary" className="text-xs py-2">
            Grade My Site &rarr;
          </NeonButton>
        </Link>
      </div>
    </div>
  );
}
