"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import Link from "next/link";
import {
  Search,
  Compass,
  Code2,
  FlaskConical,
  Rocket,
  Headphones,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    id: "01",
    label: "DISCOVERY",
    title: "Discovery & Consultation",
    icon: Search,
    duration: "1–2 days",
    color: "#00FFFF",
    description:
      "We start with a focused conversation to understand your goals, audience, and constraints. I'll ask the right questions, challenge assumptions where needed, and leave with a clear picture of what success looks like for your project.",
    deliverables: ["Project brief", "Scope definition", "Timeline estimate", "Tech stack recommendation"],
  },
  {
    id: "02",
    label: "ARCHITECTURE",
    title: "Design & Architecture",
    icon: Compass,
    duration: "3–5 days",
    color: "#BB4B8F",
    description:
      "Before a single line of code is written, I map out the full structure: information architecture, component hierarchy, data flow, and visual direction. You'll see exactly what's being built before it's built.",
    deliverables: ["Sitemap / user flow", "Component wireframes", "Design system tokens", "Tech architecture doc"],
  },
  {
    id: "03",
    label: "DEVELOPMENT",
    title: "Build & Development",
    icon: Code2,
    duration: "1–4 weeks",
    color: "#339933",
    description:
      "This is where I write clean, maintainable, production-grade code. I work in focused sprints and share progress regularly so you're never left guessing. The stack is always chosen for your use case, not my convenience.",
    deliverables: ["Staged builds (dev URL)", "Progress updates", "Responsive implementation", "Accessible markup"],
  },
  {
    id: "04",
    label: "QA & REVIEW",
    title: "Testing & Review",
    icon: FlaskConical,
    duration: "2–3 days",
    color: "#F7DF1E",
    description:
      "Every project goes through a thorough review cycle: cross-browser testing, performance audits (Lighthouse), accessibility checks, and a structured feedback loop with you. Nothing ships until it's right.",
    deliverables: ["Lighthouse audit", "Cross-browser QA", "Revision rounds", "Final sign-off"],
  },
  {
    id: "05",
    label: "LAUNCH",
    title: "Deployment & Handoff",
    icon: Rocket,
    duration: "1 day",
    color: "#FF8A65",
    description:
      "I handle the full deployment pipeline — domain config, environment variables, CI/CD setup, and a production build verification. You get a live URL and full ownership of your codebase, with nothing locked behind proprietary systems.",
    deliverables: ["Production deployment", "Domain / DNS setup", "Codebase handoff", "Documentation"],
  },
  {
    id: "06",
    label: "SUPPORT",
    title: "Post-Launch Support",
    icon: Headphones,
    duration: "Ongoing",
    color: "#9B9EFF",
    description:
      "Shipping is the beginning, not the end. I offer retainer-based support for bug fixes, feature additions, and performance monitoring. You'll always have a direct line to the developer who built it.",
    deliverables: ["Bug fix SLA", "Feature requests", "Analytics review", "Performance monitoring"],
  },
];

export default function ProcessPage() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">
          <GlitchText text="THE_PROCESS" />
        </h1>
        <p className="text-text-muted font-mono text-sm max-w-xl">
          How we go from idea to shipped product. Six protocols, zero surprises.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-white/10 hidden md:block" />

        <div className="space-y-6">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
              >
                <div
                  className="flex gap-6 cursor-pointer group"
                  onClick={() => setActiveStep(isActive ? null : step.id)}
                >
                  {/* Step Icon */}
                  <div
                    className="hidden md:flex flex-shrink-0 w-[4.5rem] h-[4.5rem] rounded-sm border-2 items-center justify-center relative z-10 transition-all duration-300"
                    style={{
                      borderColor: isActive ? step.color : "rgba(255,255,255,0.1)",
                      backgroundColor: isActive ? `${step.color}18` : "var(--surface-card)",
                      boxShadow: isActive ? `0 0 20px ${step.color}30` : "none",
                    }}
                  >
                    <Icon
                      size={24}
                      style={{ color: isActive ? step.color : "rgba(255,255,255,0.3)" }}
                      className="transition-colors duration-300"
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1">
                    <HoloCard
                      className={cn(
                        "transition-all duration-300",
                        isActive ? "border-white/20" : "hover:border-white/15"
                      )}
                      style={{
                        borderColor: isActive ? `${step.color}50` : undefined,
                        boxShadow: isActive ? `0 0 20px ${step.color}10` : undefined,
                      } as React.CSSProperties}
                    >
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-xs tracking-[0.3em] font-bold"
                            style={{ color: step.color }}
                          >
                            PROTOCOL_{step.id}
                          </span>
                          <span className="text-white/10">|</span>
                          <h3 className="text-lg font-bold text-white group-hover:text-white/90">
                            {step.title}
                          </h3>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] font-mono text-text-muted border border-white/10 px-2 py-1">
                            EST: {step.duration}
                          </span>
                          <span
                            className="font-mono text-xs"
                            style={{ color: step.color }}
                          >
                            {isActive ? "▲" : "▼"}
                          </span>
                        </div>
                      </div>

                      {/* Expanded content */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.25 }}
                          className="mt-4 pt-4 border-t border-white/10 grid md:grid-cols-3 gap-6"
                        >
                          <p className="md:col-span-2 text-sm text-text-muted leading-relaxed">
                            {step.description}
                          </p>
                          <div>
                            <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mb-2">
                              Deliverables
                            </p>
                            <ul className="space-y-1">
                              {step.deliverables.map(d => (
                                <li key={d} className="text-xs font-mono text-white/70 flex items-center gap-2">
                                  <span style={{ color: step.color }}>›</span>
                                  {d}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </HoloCard>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* CTA */}
      <div className="pt-4 border-t border-white/10">
        <HoloCard className="text-center space-y-4">
          <p className="text-lg font-bold text-white">Ready to start?</p>
          <p className="text-sm text-text-muted font-mono max-w-md mx-auto">
            Every project begins with a conversation. No commitment, no pressure — just a clear picture of what we can build together.
          </p>
          <div className="flex justify-center">
            <Link href="/comms">
              <NeonButton variant="primary">Start a Conversation</NeonButton>
            </Link>
          </div>
        </HoloCard>
      </div>
    </div>
  );
}
