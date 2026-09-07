import type { Metadata } from "next";
import { GlitchText } from "@/components/core/GlitchText";
import { HoloCard } from "@/components/core/HoloCard";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${BRAND.legalName}. Information on web development services, project scopes, payment milestones, codebase ownership, and care plans.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="space-y-8 w-full py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            LEGAL_OS {"//"} PROTOCOL_TERMS
          </span>
          <span className="text-white/20 font-mono text-[10px]">|</span>
          <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            STATUS: Active
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
          <GlitchText text="TERMS_OF_SERVICE" />
        </h1>
        <p className="font-mono text-xs text-text-muted">
          Effective Date: January 1, 2026 {"//"} Governing Jurisdiction: State of {BRAND.governingState}
        </p>
      </div>

      {/* Overview Card */}
      <HoloCard className="p-6 space-y-3">
        <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase block">
          {"// SERVICE_AGREEMENT_FOUNDATION"}
        </span>
        <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
          These Terms of Service (&ldquo;Terms&rdquo;) govern all website design, web application development, deployment, and ongoing care services provided by <strong className="text-white">{BRAND.legalName}</strong> (&ldquo;MCB Systems&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) to clients and visitors (&ldquo;Client&rdquo;, &ldquo;you&rdquo;).
        </p>
        <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
          Individual client engagements are executed pursuant to a formal Scope of Work (&ldquo;SOW&rdquo;) or service proposal, which incorporates and is governed by these Terms.
        </p>
      </HoloCard>

      {/* Sections */}
      <div className="space-y-8 text-xs md:text-sm font-sans text-text-muted leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">01.</span> Services & Scope of Work
          </h2>
          <p>
            MCB Systems provides professional web development, UI/UX architecture, performance optimization, and maintenance services across standard packages and bespoke contracts:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-white/80">
            <li>
              <strong className="text-white">One-Time Builds:</strong> Custom digital presences, marketing web builds, and bespoke web applications (including Starter, Standard, and Custom tiers). Each project includes agreed page architecture, mobile responsiveness, SEO foundations, and production hosting deployment.
            </li>
            <li>
              <strong className="text-white">Monthly Care Plans:</strong> Ongoing maintenance retainers (Basic, Growth, and Partner tiers) covering uptime monitoring, SSL certificate verification, dependency updates, search visibility reporting, and designated support hours.
            </li>
            <li>
              <strong className="text-white">Diagnostic Tools:</strong> Automated utilities such as SiteGrade, offered to evaluate website performance, technical SEO, and accessibility metrics.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">02.</span> Payment Terms & Billing Milestones
          </h2>
          <p>
            Consistent with our standard Scope of Work and client onboarding agreements, payment terms are structured as follows:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-white/80">
            <li>
              <strong className="text-white">Project Deposit:</strong> A 50% non-refundable deposit is required prior to project kick-off to secure development scheduling and initiate architecture.
            </li>
            <li>
              <strong className="text-white">Final Balance:</strong> The remaining 50% balance is due upon completion of development and QA sign-off, prior to final DNS cutover and codebase handoff.
            </li>
            <li>
              <strong className="text-white">Care Plans:</strong> Monthly maintenance plans are billed automatically on a month-to-month subscription basis. There are no long-term contracts; clients may cancel or adjust tiers at any time with notice prior to the upcoming billing cycle. Additional work requested beyond designated monthly hours is billed at our standard rate ($75/hr) with prior client approval.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">03.</span> Intellectual Property & Codebase Ownership
          </h2>
          <p>
            We believe in total client transparency and asset freedom:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-white/80">
            <li>
              <strong className="text-white">Client Ownership:</strong> Upon receipt of final payment in full, the client owns 100% of the custom codebase, design assets, copy, and visual deliverables created specifically for the project.
            </li>
            <li>
              <strong className="text-white">Third-Party & Open Source:</strong> Components built on open-source libraries (e.g., React, Next.js, Tailwind CSS) remain subject to their respective open-source licenses (MIT, Apache, etc.).
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">04.</span> Portfolio & Promotional Display Rights
          </h2>
          <p>
            Consistent with standard industry practice and our client agreements, MCB Systems retains the perpetual, worldwide right to display completed project deliverables, screenshots, URLs, and case study descriptions within our online portfolio, project archive, and promotional marketing channels, unless an explicit Non-Disclosure Agreement (NDA) has been signed in advance.
          </p>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">05.</span> Client Cooperation & Materials
          </h2>
          <p>
            Timely completion of projects depends on prompt communication. The Client is responsible for supplying necessary text copy, brand imagery, vector logos, and third-party account credentials required to fulfill the Scope of Work. Delays in client feedback or asset delivery may extend project launch dates accordingly.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">06.</span> Warranties & Limitation of Liability
          </h2>
          <p>
            All development work is executed with professional diligence, modern security standards, and thorough QA testing across major modern browsers.
          </p>
          <p>
            Except as expressly provided in a signed contract, services and digital tools are provided &ldquo;as is.&rdquo; To the fullest extent permitted by applicable law, MCB Systems LLC shall not be liable for any indirect, incidental, punitive, or consequential damages, loss of profits, data corruption, or downtime caused by third-party hosting, DNS outages, or upstream provider failures.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">07.</span> Governing Law & Contact
          </h2>
          <p>
            These Terms, along with any related project agreements, shall be governed by and construed in accordance with the laws of the <strong className="text-white">State of {BRAND.governingState}</strong>, without regard to its conflict of laws principles.
          </p>
          <div className="font-mono text-xs bg-surface-card p-4 rounded border border-white/10 text-white">
            <p className="text-neon-cyan font-bold mb-1">{BRAND.legalName}</p>
            <p>Direct Inquiries: <a href={`mailto:${BRAND.contactEmail}`} className="text-neon-cyan underline">{BRAND.contactEmail}</a></p>
            <p>Web: <a href={BRAND.siteUrl} className="text-neon-cyan underline">{BRAND.siteUrl}</a></p>
          </div>
        </section>
      </div>
    </div>
  );
}
