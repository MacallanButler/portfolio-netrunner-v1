import type { Metadata } from "next";
import GigsClient from "./GigsClient";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Project Archive & Case Studies",
  description: "Browse the archive of shipped web applications, platforms, and interactive experiences developed by Macallan Butler.",
  alternates: {
    canonical: "https://macallanbutler.com/gigs",
  },
};

export default function GigsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Project Archive & Case Studies",
    "description": "Browse the archive of shipped web applications, platforms, and interactive experiences developed by Macallan Butler.",
    "url": "https://macallanbutler.com/gigs",
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
            "name": "Macallan Butler"
          },
          "publisher": {
            "@type": "Organization",
            "name": "MCB Industries LLC"
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