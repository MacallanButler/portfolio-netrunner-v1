import type { Metadata } from "next";
import CommsClient from "./CommsClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Macallan Butler to discuss freelance full-stack development, UI design architecture, or new collaborations.",
  alternates: {
    canonical: "https://macallanbutler.com/comms",
  },
};

export default function CommsPage() {
  return <CommsClient />;
}
