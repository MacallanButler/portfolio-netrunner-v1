import type { Metadata } from "next";
import GigsClient from "./GigsClient";
import projectsData from "@/data/projects.json";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Project Archive & Case Studies",
  description: `Browse the archive of shipped web applications, platforms, and interactive experiences developed by ${BRAND.displayName}.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/gigs`,
  },
};

export default function GigsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Project Archive & Case Studies",
    "description": `Browse the archive of shipped web applications, platforms, and interactive experiences developed by ${BRAND.displayName}.`,
    "url": `${BRAND.siteUrl}/gigs`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": projectsData.length,
      "itemListElement": projectsData.map((project, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "CreativeWork",
          "name": project.title,
          "description": project.description,
          "url": project.liveUrl,
          "genre": project.category,
          "keywords": project.techStack.join(", "),
          "creator": {
            "@type": "Person",
            "name": BRAND.founder
          },
          "publisher": {
            "@type": "Organization",
            "name": BRAND.legalName
          }
        }
      }))
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GigsClient />
    </>
  );
}