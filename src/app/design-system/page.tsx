import type { Metadata } from "next";
import ProcessClient from "./ProcessClient";

export const metadata: Metadata = {
  title: "System Build Process | Macallan Butler UI Architect",
  description: "Understand the development process at Macallan Butler: discovery, architecture, development, QA review, and deployment protocol details.",
  alternates: {
    canonical: "https://macallanbutler.com/design-system",
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
