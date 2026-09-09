"use client";

import React from "react";
import Link from "next/link";
import { BRAND } from "@/lib/brand";

export function Footer() {
  return (
    <footer className="w-full border-t border-white/10 bg-surface-dark/40 py-6 px-6 md:px-12 lg:px-16 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-text-muted">
        <div>
          &copy; 2026 {BRAND.legalName} &middot; by {BRAND.founder}. All rights reserved.
        </div>
        <div className="flex items-center gap-3">
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
