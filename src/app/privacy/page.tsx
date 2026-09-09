import type { Metadata } from "next";
import { GlitchText } from "@/components/core/GlitchText";
import { HoloCard } from "@/components/core/HoloCard";
import { BRAND } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${BRAND.legalName}. Learn how we collect, process, and protect your data across our website and diagnostic tools.`,
  alternates: {
    canonical: `${BRAND.siteUrl}/privacy`,
  },
};

export default function PrivacyPage() {
  return (
    <div className="space-y-8 w-full py-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
            LEGAL_OS {"//"} PROTOCOL_PRIVACY
          </span>
          <span className="text-white/20 font-mono text-[10px]">|</span>
          <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            STATUS: Active
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-white mb-2">
          <GlitchText text="PRIVACY_POLICY" />
        </h1>
        <p className="font-mono text-xs text-text-muted">
          Effective Date: January 1, 2026 {"//"} Last Updated: 2026
        </p>
      </div>

      {/* Overview Card */}
      <HoloCard className="p-6 space-y-3">
        <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase block">
          {"// DATA_CONTROLLER_DESIGNATION"}
        </span>
        <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
          This Privacy Policy outlines how <strong className="text-white">{BRAND.legalName}</strong> (&ldquo;MCB Systems&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;), operating <a href={BRAND.siteUrl} className="text-neon-cyan hover:underline">{BRAND.siteUrl}</a>, collects, uses, processes, and safeguards personal information gathered through our website, contact systems, and web auditing services.
        </p>
        <p className="text-xs md:text-sm text-text-muted font-sans leading-relaxed">
          For any questions, requests, or privacy inquiries, contact the data controller directly at{" "}
          <a href={`mailto:${BRAND.contactEmail}`} className="text-neon-cyan hover:underline font-mono">
            {BRAND.contactEmail}
          </a>.
        </p>
      </HoloCard>

      {/* Sections */}
      <div className="space-y-8 text-xs md:text-sm font-sans text-text-muted leading-relaxed">
        {/* Section 1 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">01.</span> Information We Collect
          </h2>
          <p>
            We collect information that you directly provide to us, as well as diagnostic and analytical telemetry generated during your use of our site:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-white/80">
            <li>
              <strong className="text-white">Contact Form Inquiries:</strong> When you submit a transmission via our communications channel (<code className="text-neon-cyan">/contact</code>), we collect your name (operator identification tag), email address, message body, and optional package/service selection.
            </li>
            <li>
              <strong className="text-white">SiteGrade Diagnostic Inputs:</strong> When utilizing our automated website audit utility (<code className="text-neon-cyan">/sitegrade</code>), we process the target URL you provide, the resulting technical performance and SEO metrics, and any recipient email address entered for report delivery.
            </li>
            <li>
              <strong className="text-white">Google Analytics 4 (GA4) Telemetry:</strong> We collect aggregated usage data, device hardware characteristics, browser types, operating systems, session duration, and specific user engagement events, including:
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2 font-mono text-[10px] text-neon-cyan/90 bg-surface-card p-3 rounded border border-white/5">
                <span>&bull; submit_contact</span>
                <span>&bull; inquire_tier</span>
                <span>&bull; cta_click</span>
                <span>&bull; scroll_depth</span>
                <span>&bull; nav_click</span>
                <span>&bull; external_link_click</span>
                <span>&bull; email_click</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">02.</span> Third-Party Processors & Infrastructure
          </h2>
          <p>
            We do not sell, rent, or monetize your personal information. Data collected is transferred solely to verified third-party technical infrastructure essential for delivering our services:
          </p>
          <ul className="list-disc pl-5 space-y-2 font-mono text-xs text-white/80">
            <li>
              <strong className="text-white">Google Analytics 4 (Google LLC):</strong> Web analytics platform utilized for tracking performance, traffic patterns, and conversion telemetry. GA4 processes anonymized IP addresses and usage signals.
            </li>
            <li>
              <strong className="text-white">Resend Inc.:</strong> Transactional email service provider utilized for routing contact inquiries and delivering generated SiteGrade PDF audit reports.
            </li>
            <li>
              <strong className="text-white">Vercel Inc.:</strong> Cloud hosting and edge serverless execution environment that serves our frontend and API endpoints.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">03.</span> Cookies & Tracking Technologies
          </h2>
          <p>
            Our site utilizes first-party cookies and storage identifiers via Google Analytics 4 to distinguish individual visitor sessions and gauge interaction patterns. We do not run third-party advertising networks or behavioral remarketing pixels.
          </p>
          <p>
            You can manage or disable cookies at any time directly through your web browser preferences or by utilizing industry-standard privacy browser extensions.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">04.</span> Data Retention & Rights
          </h2>
          <p>
            We retain contact submissions and client inquiry payloads only for as long as necessary to conduct ongoing business communications, execute contracted development projects, or comply with standard legal recordkeeping requirements. Diagnostic reports and temporary audit caches are periodically pruned.
          </p>
          <p>
            You retain the right to inspect, verify, update, or request the permanent deletion of any personal information we hold concerning you. To execute a data deletion or access request, please contact:
          </p>
          <div className="font-mono text-xs bg-surface-card p-4 rounded border border-white/10 text-white">
            <p className="text-neon-cyan font-bold mb-1">{BRAND.legalName}</p>
            <p>Attention: Privacy Administration</p>
            <p>Email: <a href={`mailto:${BRAND.contactEmail}`} className="text-neon-cyan underline">{BRAND.contactEmail}</a></p>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 border-t border-white/10 pt-6">
          <h2 className="text-lg font-bold font-mono tracking-tight text-white flex items-center gap-2">
            <span className="text-neon-cyan text-xs">05.</span> Security Protocol
          </h2>
          <p>
            We deploy technical safeguards to protect all submitted data, including TLS 1.3 encryption in transit, strict HTTP Content Security Policies (CSP), frame denial protections, and secured environment variables for server credentials.
          </p>
        </section>
      </div>
    </div>
  );
}
