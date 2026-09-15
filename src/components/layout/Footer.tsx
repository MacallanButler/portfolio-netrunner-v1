"use client";

import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

import { trackExternalLinkClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export function Footer({ isContact }: { isContact?: boolean }) {
  return (
    <footer className={cn(
      "w-full border-t border-white/10 bg-surface-dark/40 px-6 md:px-12 lg:px-16 relative z-10",
      isContact ? "py-2.5 md:py-3" : "py-6"
    )}>
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-muted">
        <div>
          &copy; 2026 {BRAND.legalName} &middot; by {BRAND.founder}. All rights reserved.
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={BRAND.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalLinkClick(BRAND.socials.github)}
            className="hover:text-neon-cyan transition-colors"
          >
            [ GITHUB ]
          </a>
          <a
            href={BRAND.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackExternalLinkClick(BRAND.socials.linkedin)}
            className="hover:text-neon-cyan transition-colors"
          >
            [ LINKEDIN ]
          </a>
          <span className="text-white/20">|</span>
          <Link
            href="/privacy"
            className="hover:text-neon-cyan transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="text-white/20">|</span>
          <Link
            href="/terms"
            className="hover:text-neon-cyan transition-colors"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
