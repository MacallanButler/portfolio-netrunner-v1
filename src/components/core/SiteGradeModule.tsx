"use client";

import React from "react";
import Link from "next/link";
import { NeonButton } from "@/components/core/NeonButton";

export function SiteGradeModule() {
  return (
    <div className="w-full space-y-4">
      {/* SITEGRADE_DIAGNOSTIC */}
      
      {/* Title */}
      <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight leading-tight">
        Not sure where you&apos;re starting?
      </h3>
      
      {/* Body */}
      <p className="text-xs md:text-sm text-text-muted font-sans max-w-2xl leading-relaxed">
        Get a free grade on your current site — performance, SEO, accessibility, and content — before you decide what you need.
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
