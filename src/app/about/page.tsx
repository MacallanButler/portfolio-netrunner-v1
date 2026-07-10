import type { Metadata } from "next";
import { GlitchText } from "@/components/core/GlitchText";
import { SecureCTA } from "@/components/core/SecureCTA";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Macallan Butler, a full-stack developer and UI architect based in Charlotte, NC. Discover my tech stack, projects, and process.",
  alternates: {
    canonical: "https://macallanbutler.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-8 w-full py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">ABOUT_OS</span>
            <span className="text-white/20 font-mono text-[10px]">|</span>
            <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              STATUS: Online
            </span>
          </div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            <GlitchText text="Hi, I'm Macallan." />
          </h1>
        </div>
      </div>

      {/* Body Copy */}
      <div className="max-w-[65ch] space-y-6 text-sm text-text-muted leading-relaxed font-sans">
        <p>
          I&apos;m a full-stack developer and UI architect based in Charlotte, NC. I graduated from Arizona State University&apos;s Full Stack Web Development program, but the instinct that actually drives my work predates the degree — I care more about how something feels to use than how it looks frozen in a screenshot.
        </p>
        <p>
          That&apos;s why my stack leans on React, Next.js, Supabase, and Tailwind: fast, unopinionated tools that stay out of the way of the actual product. Most of what I build sits at the intersection of motion and clarity — interfaces that respond to the person in front of them instead of just sitting there looking finished.
        </p>
        <p>
          Recent work spans a multi-role skydiving platform (Apex), a scuba dive shop with live booking (Blue Horizon), and a conservation and education site for snow leopards (Ghost of the Mountains) — different industries, same underlying approach: understand the actual user flow before a single component gets built.
        </p>
        <p>
          Right now I&apos;m splitting my time between freelance client work and full-time opportunities. If there&apos;s a project or a role that fits, I&apos;d love to hear from you.
        </p>
      </div>

      {/* CTA */}
      <SecureCTA />
    </div>
  );
}
