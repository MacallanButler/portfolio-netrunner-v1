import type { Metadata } from "next";
import { Suspense } from "react";
import CommsClient from "./CommsClient";

export const metadata: Metadata = {
  title: "Establish Connection & Get in Touch | Macallan Butler",
  description: "Get in touch with Macallan Butler to discuss freelance full-stack development, UI design architecture, or new collaborations.",
  alternates: {
    canonical: "https://macallanbutler.com/comms",
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
