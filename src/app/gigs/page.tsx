import type { Metadata } from "next";
import GigsClient from "./GigsClient";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse the archive of shipped web applications, platforms, and interactive experiences developed by Macallan Butler.",
  alternates: {
    canonical: "https://macallanbutler.com/gigs",
  },
};

export default function GigsPage() {
  return <GigsClient />;
}