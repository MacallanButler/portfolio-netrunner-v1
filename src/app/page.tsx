import type { Metadata } from "next";
import BootSequence from "./BootSequence";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `${BRAND.displayName} | Full-Stack Development & UI Architecture Studio`,
  },
  description: `${BRAND.legalName} is a bespoke web development and UI architecture studio founded by ${BRAND.founder}. We engineer fast, high-converting digital flagships and full-stack software for modern businesses and ambitious brands.`,
  alternates: {
    canonical: BRAND.siteUrl,
  },
};

export default function Page() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${BRAND.siteUrl}/#organization`,
        "name": BRAND.legalName,
        "url": BRAND.siteUrl,
        "founder": {
          "@type": "Person",
          "@id": `${BRAND.siteUrl}/#founder`,
          "name": BRAND.founder
        },
        "email": BRAND.contactEmail
      },
      {
        "@type": "Person",
        "@id": `${BRAND.siteUrl}/#founder`,
        "name": BRAND.founder,
        "jobTitle": "Founder & Lead Developer",
        "url": BRAND.siteUrl,
        "image": `${BRAND.siteUrl}/icon.svg`,
        "sameAs": [
          "https://github.com/MacallanButler"
        ],
        "worksFor": {
          "@type": "Organization",
          "@id": `${BRAND.siteUrl}/#organization`,
          "name": BRAND.legalName
        },
        "description": `${BRAND.founder} is the founder of ${BRAND.legalName}, a development studio specializing in high-fidelity React, Next.js, and bespoke web software.`
      }
    ]
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
