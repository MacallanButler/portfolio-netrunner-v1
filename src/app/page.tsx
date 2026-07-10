import type { Metadata } from "next";
import BootSequence from "./BootSequence";

export const metadata: Metadata = {
  title: "Macallan Butler | PORTFOLIO_OS Terminal Client",
  description: "Establish a secure node connection to Macallan Butler's systems. Booting portfolio OS, projects database, and interactive shell.",
  alternates: {
    canonical: "https://macallanbutler.com",
  },
};

export default function Page() {
  return <BootSequence />;
}
