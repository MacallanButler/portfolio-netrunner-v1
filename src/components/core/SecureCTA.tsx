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
        "pt-4 border-t border-white/10 w-full",
        hideOnMobile && "hidden sm:block",
        className
      )}
    >
      <HoloCard className="p-3 sm:p-4">
        <div className="flex flex-col items-center justify-center text-center space-y-1.5 sm:space-y-2">
          <p className="text-sm sm:text-base font-bold text-white tracking-wide">
            {title}
          </p>
          <div className="text-xs text-text-muted font-mono max-w-md mx-auto whitespace-pre-line leading-normal">
            {description}
          </div>
          <div className="pt-1.5 sm:pt-2 flex justify-center w-full">
            <Link href="/contact" onClick={() => trackPricingCtaClick(location)}>
              <NeonButton variant="primary" className="text-xs py-1.5 px-4">
                {buttonText}
              </NeonButton>
            </Link>
          </div>
        </div>
      </HoloCard>
    </div>
  );
}
