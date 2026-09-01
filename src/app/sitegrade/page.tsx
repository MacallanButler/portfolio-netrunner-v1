import type { Metadata } from "next";
import SiteGradeClient from "./SiteGradeClient";

export const metadata: Metadata = {
  title: "Free Website Grade",
  description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
  alternates: {
    canonical: "https://macallanbutler.com/sitegrade",
  },
  openGraph: {
    title: "Free Website Grade | Macallan Butler",
    description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
    url: "https://macallanbutler.com/sitegrade",
    siteName: "Macallan Butler",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Website Grade | Macallan Butler",
    description: "Run a free instant technical, SEO, accessibility, and copywriting audit on your site. No signup, no credentials — just a straight grade card.",
  },
};

export default function SiteGradePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "SiteGrade Diagnostic",
    "url": "https://macallanbutler.com/sitegrade",
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
      "name": "Macallan Butler",
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
