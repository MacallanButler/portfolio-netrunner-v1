import type { Metadata } from "next";
import BootSequence from "./BootSequence";

export const metadata: Metadata = {
  title: "Macallan Butler | PORTFOLIO_OS Terminal Client",
  description: "Establish a secure node connection to Macallan Butler's systems. Booting portfolio OS, projects database, and interactive shell.",
  alternates: {
    canonical: "https://macallanbutler.com",
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Macallan Butler",
    "jobTitle": "Full-Stack Developer & UI Architect",
    "url": "https://macallanbutler.com",
    "image": "https://macallanbutler.com/icon.svg",
    "sameAs": [
      "https://github.com/MacallanButler"
    ],
    "worksFor": {
      "@type": "Organization",
      "name": "MCB Industries LLC"
    },
    "description": "Macallan Butler is a freelance Full-Stack Developer & UI Architect specializing in high-fidelity React, Next.js, and motion-driven user interfaces."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BootSequence />
    </>
  );
}
