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
  description = "Have a project in mind, or think I'd be a good fit for your team? Let's talk.",
  buttonText = "Get in touch",
  className,
  hideOnMobile = true,
  location = "general",
}: SecureCTAProps) {
  return (
    <div className={cn(
      "pt-3 border-t border-white/10 w-full",
      hideOnMobile && "hidden sm:block",
      className
    )}>
      <HoloCard className="text-center space-y-4 p-6">
        <p className="text-base font-bold text-white">{title}</p>
        <p className="text-xs text-text-muted font-mono max-w-md mx-auto whitespace-pre-line leading-relaxed">
          {description}
        </p>
        <div className="flex justify-center">
          <Link href="/comms" onClick={() => trackPricingCtaClick(location)}>
            <NeonButton variant="primary" className="text-xs py-2">
              {buttonText}
            </NeonButton>
          </Link>
        </div>
      </HoloCard>
    </div>
  );
}
