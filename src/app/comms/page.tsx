import type { Metadata } from "next";
import { Suspense } from "react";
import CommsClient from "./CommsClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Establish Connection & Get in Touch",
  description: `Get in touch with ${BRAND.legalName} to discuss full-stack development, UI architecture, or new client projects.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/comms`,
  },
};

export default function CommsPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[50vh] font-mono text-xs text-text-muted">
        LOADING_SECURE_CHANNEL...
      </div>
    }>
      <CommsClient />
    </Suspense>
  );
}
