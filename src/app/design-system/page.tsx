import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: {
    absolute: "System Build Process | Macallan Butler UI Architect",
  },
  description: "Understand the development process at Macallan Butler: discovery, architecture, development, QA review, and deployment protocol details.",
  alternates: {
    canonical: "https://macallanbutler.com/design-system",
  },
  openGraph: {
    title: "System Build Process | Macallan Butler UI Architect",
    description: "Understand the development process at Macallan Butler: discovery, architecture, development, QA review, and deployment protocol details.",
    url: "https://macallanbutler.com/design-system",
    siteName: "Macallan Butler",
  },
  twitter: {
    card: "summary_large_image",
    title: "System Build Process | Macallan Butler UI Architect",
    description: "Understand the development process at Macallan Butler: discovery, architecture, development, QA review, and deployment protocol details.",
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
