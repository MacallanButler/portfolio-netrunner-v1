import type { Metadata } from "next";
import SiteGradeClient from "./SiteGradeClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `Free Website Grade | ${BRAND.displayName}`,
  },
  description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
  alternates: {
    canonical: `${BRAND.siteUrl}/sitegrade`,
  },
  openGraph: {
    title: `Free Website Grade | ${BRAND.displayName}`,
    description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
    url: `${BRAND.siteUrl}/sitegrade`,
    siteName: BRAND.displayName,
  },
  twitter: {
    card: "summary_large_image",
    title: `Free Website Grade | ${BRAND.displayName}`,
    description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
  },
};

export default function SiteGradePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SiteGrade Diagnostic",
    "url": `${BRAND.siteUrl}/sitegrade`,
    "description": "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "All",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
    },
    "creator": {
      "@type": "Person",
      "name": BRAND.founder,
    },
    "provider": {
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
      <SiteGradeClient />
    </>
  );
}
