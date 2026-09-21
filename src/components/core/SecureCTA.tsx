"use client";

import React from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { NeonButton } from "@/components/core/NeonButton";
import { cn } from "@/lib/utils";
import { trackPricingCtaClick } from "@/lib/analytics";

interface SecureCTAProps {
  title?: string;
  description?: React.ReactNode;
  buttonText?: string;
  className?: string;
  hideOnMobile?: boolean;
  location?: string;
}

export function SecureCTA({
  title = "Ready to start?",
  description = "Have a project in mind? Let's scope it.",
  buttonText = "Get in touch",
  className,
  hideOnMobile = true,
  location = "general",
}: SecureCTAProps) {
  return (
    <div
      className={cn(
        "pt-8 border-t border-white/10 w-full",
        hideOnMobile && "hidden sm:block",
        className
      )}
    >
      <HoloCard className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center text-center space-y-3 sm:space-y-4">
          <p className="text-base sm:text-lg font-bold text-white tracking-wide">
            {title}
          </p>
          <div className="text-xs sm:text-sm text-text-muted font-mono max-w-lg mx-auto whitespace-pre-line leading-relaxed">
            {description}
          </div>
          <div className="pt-4 sm:pt-6 flex justify-center w-full">
            <Link href="/contact" onClick={() => trackPricingCtaClick(location)}>
              <NeonButton variant="primary" className="text-xs sm:text-sm py-2.5 px-6">
                {buttonText}
              </NeonButton>
            </Link>
          </div>
        </div>
      </HoloCard>
    </div>
  );
}
