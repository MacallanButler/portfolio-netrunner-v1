import type { Metadata } from "next";
import CDMClient from "./CDMClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `Café Du Monde Homepage Redesign & A/B Prototype | ${BRAND.displayName}`,
  },
  description: "An unsolicited A/B design concept comparison for Café Du Monde, exploring brand heritage versus futuristic neon-charged UI architecture.",
  alternates: {
    canonical: `${BRAND.siteUrl}/cdm`,
  },
  openGraph: {
    title: `Café Du Monde Homepage Redesign & A/B Prototype | ${BRAND.displayName}`,
    description: "An unsolicited A/B design concept comparison for Café Du Monde, exploring brand heritage versus futuristic neon-charged UI architecture.",
    url: `${BRAND.siteUrl}/cdm`,
    siteName: BRAND.displayName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Café Du Monde Homepage Redesign & A/B Prototype | ${BRAND.displayName}`,
    description: "An unsolicited A/B design concept comparison for Café Du Monde, exploring brand heritage versus futuristic neon-charged UI architecture.",
  },
};

export default function CDMPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Café Du Monde Design Concept Comparison",
    "headline": "Café Du Monde Homepage Redesign (A/B Prototype)",
    "description": "An unsolicited A/B design concept comparison for Café Du Monde, exploring brand heritage versus futuristic neon-charged UI architecture.",
    "url": `${BRAND.siteUrl}/cdm`,
    "author": {
      "@type": "Person",
      "name": BRAND.founder,
    },
    "publisher": {
      "@type": "Organization",
      "name": BRAND.legalName,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CDMClient />
    </>
  );
}
