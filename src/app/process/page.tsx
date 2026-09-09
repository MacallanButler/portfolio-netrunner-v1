import type { Metadata } from "next";
import ProcessClient from "../design-system/ProcessClient";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: {
    absolute: `System Build Process | ${BRAND.displayName}`,
  },
  description: `Understand the development process at ${BRAND.legalName}: discovery, architecture, development, QA review, and deployment protocol details.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/process`,
  },
  openGraph: {
    title: `System Build Process | ${BRAND.displayName}`,
    description: `Understand the development process at ${BRAND.legalName}: discovery, architecture, development, QA review, and deployment protocol details.`,
    url: `${BRAND.siteUrl}/process`,
    siteName: BRAND.displayName,
  },
  twitter: {
    card: "summary_large_image",
    title: `System Build Process | ${BRAND.displayName}`,
    description: `Understand the development process at ${BRAND.legalName}: discovery, architecture, development, QA review, and deployment protocol details.`,
  },
};

export default function ProcessPage() {
  return <ProcessClient />;
}
