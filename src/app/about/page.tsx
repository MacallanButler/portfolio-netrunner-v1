import type { Metadata } from "next";
import { GlitchText } from "@/components/core/GlitchText";
import { SecureCTA } from "@/components/core/SecureCTA";

export const metadata: Metadata = {
  title: "About Macallan Butler | Full-Stack Developer & UI Architect",
  description: "Learn about Macallan Butler, a full-stack developer and UI architect based in Charlotte, NC. Discover my tech stack, projects, and process.",
  alternates: {
    canonical: "https://macallanbutler.com/about",
  },
};

export default function AboutPage() {
  return (
    <div className="space-y-4 md:space-y-6 w-full py-2 md:py-4 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-10rem)] flex flex-col justify-between overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">ABOUT_OS</span>
              <span className="text-white/20 font-mono text-[10px]">|</span>
              <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                STATUS: Online
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1.5">
              <GlitchText text="Hi, I'm Macallan." />
            </h1>
          </div>
        </div>

        {/* Body Copy */}
        <div className="max-w-[65ch] space-y-3.5 text-xs md:text-sm text-text-muted leading-relaxed font-sans">
          <p>
            I&apos;m a Full Stack Developer based in Charlotte, NC, with a B.S. in Graphic Information Technology, emphasis in Full Stack Development, from Arizona State University. That technical training, paired with my own design principles, is what lets me build polished web experiences — whether I&apos;m doing it for a full-time team or my own freelance clients.
          </p>
          <p>
            I&apos;m a devout believer in elegance — the ability to marry efficiency, simplicity, and usability into something seamless. That can sound abstract, so in practice it looks like this: tools like React, Next.js, Supabase, and Tailwind, used to build quickly and intuitively rather than getting in my own way. Building user-first and mobile-first lets me start from the core use case and work outward, checking that every component and feature is both necessary and on-brief. Done right, people get exactly what they came for — the booking, the donation, the information — without friction.
          </p>
          <p>
            Recent projects: Blue Horizon, a scuba diving platform with booking, dive sites, and conservation events; Apex, a skydiving site with tiered access from guest to admin, each tier with its own features; and my proudest build, Ghost of the Mountains — a conservation platform educating the public on snow leopard ecology and driving donations toward securing the species&apos; survival.
          </p>
          <p>
            You can usually find me at a coffee shop somewhere in NC, splitting time between freelance work and full-time opportunities. Always looking for the next adventurous project — if your team needs help moving one forward, I&apos;m your guy.
          </p>
        </div>
      </div>

      {/* CTA */}
      <SecureCTA />
    </div>
  );
}
