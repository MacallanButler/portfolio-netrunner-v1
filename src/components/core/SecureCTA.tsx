"use client";

import React from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { NeonButton } from "@/components/core/NeonButton";

export function SecureCTA() {
  return (
    <div className="hidden sm:block pt-3 border-t border-white/10 w-full">
      <HoloCard className="text-center space-y-4 p-6">
        <p className="text-base font-bold text-white">Ready to start?</p>
        <p className="text-xs text-text-muted font-mono max-w-md mx-auto">
          Have a project in mind, or think I&apos;d be a good fit for your team? Let&apos;s talk.
        </p>
        <div className="flex justify-center">
          <Link href="/comms">
            <NeonButton variant="primary" className="text-xs py-2">Get in touch</NeonButton>
          </Link>
        </div>
      </HoloCard>
    </div>
  );
}
