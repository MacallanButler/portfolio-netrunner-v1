import type { Metadata } from "next";
import { Suspense } from "react";
import CommsClient from "../comms/CommsClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Contact MCB Systems | Start a Project",
  description: `Get in touch with ${BRAND.legalName} to discuss custom web development, UI architecture, or new digital flagship projects.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/contact`,
  },
  openGraph: {
    title: `Contact MCB Systems | Start a Project`,
    description: `Get in touch with ${BRAND.legalName} to discuss custom web development, UI architecture, or new digital flagship projects.`,
    url: `${BRAND.siteUrl}/contact`,
    siteName: BRAND.displayName,
  },
};

export default function ContactPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[50vh] font-mono text-xs text-text-muted">
          LOADING_SECURE_CHANNEL...
        </div>
      }
    >
      <CommsClient />
    </Suspense>
  );
}
