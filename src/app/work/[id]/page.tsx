import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import NextImage from "next/image";
import { CASE_STUDIES, getCaseStudy } from "@/data/caseStudies";
import { BRAND } from "@/lib/brand";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { getTechColor } from "@/lib/techColors";
import {
  ArrowLeft,
  ExternalLink,
  Code2,
  Cpu,
  Layers,
  Sparkles,
  Zap,
  CheckCircle2,
} from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const ids = Object.keys(CASE_STUDIES);
  const projectIds = Object.values(CASE_STUDIES).map((cs) => cs.id);
  const unique = Array.from(new Set([...ids, ...projectIds]));
  return unique.map((id) => ({ id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const cs = getCaseStudy(id);
  if (!cs) return { title: "Case Study Not Found" };

  return {
    title: `${cs.title} — Case Study | ${BRAND.displayName}`,
    description: `${cs.tagline}. Full-stack architectural breakdown and technical case study by ${BRAND.legalName}.`,
    alternates: {
      canonical: `${BRAND.siteUrl}/work/${id}`,
    },
    openGraph: {
      title: `${cs.title} — Case Study | ${BRAND.displayName}`,
      description: cs.tagline,
      url: `${BRAND.siteUrl}/work/${id}`,
      siteName: BRAND.displayName,
      images: [{ url: cs.heroImage }],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { id } = await params;
  const cs = getCaseStudy(id);

  if (!cs) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: `${cs.title}: ${cs.tagline}`,
    description: cs.overview,
    image: `${BRAND.siteUrl}${cs.heroImage}`,
    author: {
      "@type": "Person",
      name: BRAND.founder,
      worksFor: {
        "@type": "Organization",
        name: BRAND.legalName,
      },
    },
    publisher: {
      "@type": "Organization",
      name: BRAND.legalName,
      url: BRAND.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="space-y-8 md:space-y-12 max-w-5xl mx-auto py-2 md:py-6">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <Link
            href="/gigs"
            className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-neon-cyan transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>RETURN_TO_ARCHIVE</span>
          </Link>
          <div className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
            <span>CASE_STUDY_DOSSIER // {cs.id.toUpperCase()}</span>
          </div>
        </div>

        {/* Header Hero Section */}
        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] tracking-wider uppercase">
            <span className="px-2 py-0.5 rounded border border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan">
              {cs.sector}
            </span>
            <span className="text-white/20">/</span>
            <span className="text-text-muted">{cs.timeline}</span>
            <span className="text-white/20">/</span>
            <span className="text-white/60">{cs.role}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white">
            <GlitchText text={cs.title} />
          </h1>

          <p className="text-lg md:text-xl text-text-muted font-sans max-w-3xl leading-relaxed">
            {cs.tagline}
          </p>

          {/* Tech stack pills */}
          <div className="flex flex-wrap gap-2 pt-2">
            {cs.techStack.map((tech) => {
              const colors = getTechColor(tech);
              return (
                <span
                  key={tech}
                  className="text-xs font-mono px-2.5 py-1 rounded border tracking-wide"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    borderColor: colors.border,
                  }}
                >
                  {tech}
                </span>
              );
            })}
          </div>
        </header>

        {/* Visual Hero Showcase */}
        <div className="relative overflow-hidden rounded-sm border border-neon-cyan/30 bg-surface-card shadow-2xl">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 h-4 w-4 border-t-2 border-l-2 border-neon-cyan z-20" />
          <div className="absolute top-0 right-0 h-4 w-4 border-t-2 border-r-2 border-neon-cyan z-20" />
          <div className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-neon-cyan z-20" />
          <div className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-neon-cyan z-20" />

          <div className="relative h-64 sm:h-96 md:h-[450px] w-full bg-surface-dark">
            <NextImage
              src={cs.heroImage}
              alt={`${cs.title} showcase visual`}
              fill
              className="object-cover object-top"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/80 via-transparent to-transparent z-10" />
          </div>

          {/* Action Bar */}
          <div className="p-4 md:p-6 bg-surface-card border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {cs.liveUrl && (
                <a
                  href={cs.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-mono text-xs tracking-wider uppercase hover:bg-neon-cyan/20 transition-all shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                >
                  <span>LAUNCH LIVE APPLICATION</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {cs.repoUrl && (
                <a
                  href={cs.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 border border-white/15 text-text-muted hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>SOURCE</span>
                </a>
              )}
            </div>

            <Link href={`/contact?package=custom&project=${encodeURIComponent(cs.title)}`}>
              <NeonButton variant="secondary" className="text-xs py-2">
                Inquire Similar Architecture &rarr;
              </NeonButton>
            </Link>
          </div>
        </div>

        {/* Performance Metrics Bar */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cs.performanceMetrics.map((metric, i) => (
            <div
              key={i}
              className="p-5 rounded-sm border border-white/10 bg-surface-card space-y-1 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-3 opacity-10">
                <Zap className="w-8 h-8 text-neon-cyan" />
              </div>
              <p className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                {metric.label}
              </p>
              <p className="text-3xl font-bold font-mono text-neon-cyan">
                {metric.value}
              </p>
              <p className="text-xs text-white/50 font-sans">
                {metric.subtext}
              </p>
            </div>
          ))}
        </section>

        {/* Executive Overview & The Problem */}
        <section className="grid md:grid-cols-2 gap-6 items-start">
          <div className="p-6 rounded-sm border border-white/10 bg-surface-card space-y-3">
            <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>PROJECT_OVERVIEW</span>
            </div>
            <h2 className="text-xl font-bold text-white">The Scope &amp; Objective</h2>
            <p className="text-sm text-text-muted leading-relaxed font-sans">
              {cs.overview}
            </p>
          </div>

          <div className="p-6 rounded-sm border border-white/10 bg-surface-card space-y-3">
            <div className="flex items-center gap-2 text-neon-yellow font-mono text-xs uppercase tracking-wider">
              <Cpu className="w-4 h-4" />
              <span>THE_CHALLENGE</span>
            </div>
            <h2 className="text-xl font-bold text-white">Commercial Friction Point</h2>
            <p className="text-sm text-text-muted leading-relaxed font-sans">
              {cs.challenge}
            </p>
          </div>
        </section>

        {/* Architecture & Engineering Decisions */}
        <section className="p-6 md:p-8 rounded-sm border border-white/10 bg-surface-card space-y-6">
          <div className="border-b border-white/10 pb-4">
            <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest block mb-1">
              {"// SYSTEM_BLUEPRINT"}
            </span>
            <h2 className="text-2xl font-bold text-white">Architectural Rationale</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
            <div className="p-3 bg-surface-dark border border-white/5 rounded">
              <span className="text-white/40 block text-[10px] uppercase">Framework</span>
              <span className="text-white font-medium">{cs.architecture.framework}</span>
            </div>
            <div className="p-3 bg-surface-dark border border-white/5 rounded">
              <span className="text-white/40 block text-[10px] uppercase">Database / State</span>
              <span className="text-white font-medium">{cs.architecture.database}</span>
            </div>
            <div className="p-3 bg-surface-dark border border-white/5 rounded">
              <span className="text-white/40 block text-[10px] uppercase">UI Styling Engine</span>
              <span className="text-white font-medium">{cs.architecture.styling}</span>
            </div>
            <div className="p-3 bg-surface-dark border border-white/5 rounded">
              <span className="text-white/40 block text-[10px] uppercase">Infrastructure</span>
              <span className="text-white font-medium">{cs.architecture.deployment}</span>
            </div>
          </div>

          <p className="text-sm text-text-muted leading-relaxed font-sans pt-2 border-t border-white/5">
            <strong className="text-white font-semibold">Architectural Rationale: </strong>
            {cs.architecture.rationale}
          </p>
        </section>

        {/* Key Features & Technical Innovations */}
        <section className="space-y-4">
          <div className="border-b border-white/10 pb-3">
            <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest block mb-1">
              {"// MODULE_HIGHLIGHTS"}
            </span>
            <h2 className="text-2xl font-bold text-white">Key Engineering Innovations</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {cs.keyFeatures.map((feat, i) => (
              <div
                key={i}
                className="p-5 rounded-sm border border-white/10 bg-surface-card space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-neon-cyan font-mono text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-neon-cyan" />
                    <span>MOD_0{i + 1}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{feat.title}</h3>
                  <p className="text-xs text-text-muted leading-relaxed font-sans">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom Contact CTA */}
        <section className="p-8 md:p-12 rounded-sm border border-neon-cyan/30 bg-surface-card text-center space-y-4 shadow-[0_0_40px_rgba(0,255,255,0.05)]">
          <Sparkles className="w-8 h-8 text-neon-cyan mx-auto animate-pulse" />
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Need a bespoke digital system like {cs.title}?
          </h2>
          <p className="text-xs md:text-sm text-text-muted max-w-xl mx-auto font-sans leading-relaxed">
            MCB Systems LLC partners with businesses to engineer ultra-fast, high-converting web applications, mobile platforms, and digital flagships.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
            <Link href={`/contact?package=custom&project=${encodeURIComponent(cs.title)}`}>
              <NeonButton variant="primary" className="text-xs py-2.5 px-6">
                Scope Your Project &rarr;
              </NeonButton>
            </Link>
            <Link href="/gigs">
              <NeonButton variant="secondary" className="text-xs py-2.5 px-6">
                Explore More Case Studies
              </NeonButton>
            </Link>
          </div>
        </section>
      </article>
    </>
  );
}
