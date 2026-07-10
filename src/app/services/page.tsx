import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Web Services & Maintenance Plans | Macallan Butler Portfolio",
  description: "Professional web development, search engine optimization, performance tuning, and month-to-month care plans by Macallan Butler. Transparent pricing, no contract required.",
  alternates: {
    canonical: "https://macallanbutler.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
