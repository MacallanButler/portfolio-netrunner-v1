"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import Link from "next/link";
import { SecureCTA } from "@/components/core/SecureCTA";
import { useAudio } from "@/context/AudioContext";
import {
  Compass,
  Code2,
  FlaskConical,
  Rocket,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PROCESS_STEPS = [
  {
    id: "01",
    label: "ARCHITECTURE",
    title: "Discovery & Architecture",
    icon: Compass,
    color: "#00FFFF",
    description:
      "I start with a focused conversation to understand your goals, followed by mapping out the full structure: information architecture, component hierarchy, data flow, and visual direction.",
    deliverables: ["Project brief & scope", "Tech stack recommendation", "Sitemap & user flow", "Design system tokens"],
  },
  {
    id: "02",
    label: "DEVELOPMENT",
    title: "Build & Development",
    icon: Code2,
    color: "#339933",
    description:
      "This is where I write clean, maintainable, production-grade code. I work in focused sprints and share progress regularly so you're never left guessing.",
    deliverables: ["Staged builds (dev URL)", "Responsive implementation", "Accessible markup", "Progress updates"],
  },
  {
    id: "03",
    label: "QA_REVIEW",
    title: "Testing & Review",
    icon: FlaskConical,
    color: "#F7DF1E",
    description:
      "Every project goes through a thorough review cycle: cross-browser testing, performance audits, accessibility checks, and a structured feedback loop with you.",
    deliverables: ["Lighthouse performance audit", "Cross-browser QA", "Revision rounds", "Final sign-off"],
  },
  {
    id: "04",
    label: "DEPLOYMENT",
    title: "Deployment & Support",
    icon: Rocket,
    color: "#FF8A65",
    description:
      "I handle the full deployment pipeline. You get a live URL and full ownership of your codebase. After launch, I offer support for bug fixes, additions, and monitoring.",
    deliverables: ["Production deployment & DNS", "Codebase handoff & docs", "Bug fix support", "Performance monitoring"],
  },
];

export default function ProcessClient() {
  const { playClick } = useAudio();
  const [openSteps, setOpenSteps] = useState<Record<string, boolean>>({ "1": true });

  const toggleStep = (stepId: string) => {
    playClick();
    setOpenSteps((prev) => ({ ...prev, [stepId]: !prev[stepId] }));
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full py-2 md:py-4 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-10rem)] flex flex-col justify-between overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        {/* Header */}
      <div className="border-b border-white/10 pb-3 md:pb-6">
        <h1 className="text-4xl font-bold tracking-tighter mb-1.5">
          <GlitchText text="BUILD_PROCESS" />
        </h1>
        <p className="text-text-muted font-mono text-xs md:text-sm max-w-xl">
          Every project starts the same way: I&apos;d rather ask an extra question up front than guess and rebuild later. Measure twice, cut once.
        </p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical connector line */}
        <div className="absolute left-[2.25rem] top-8 bottom-8 w-px bg-white/10 hidden md:block" />

        <div className="space-y-2.5 md:space-y-6">
          {PROCESS_STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = !!openSteps[step.id];

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.07, duration: 0.35 }}
              >
                <div
                  className="flex gap-6 cursor-pointer group"
                  onClick={() => toggleStep(step.id)}
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
                        "transition-all duration-300 p-4 md:p-6",
                        isActive ? "border-white/20" : "hover:border-white/15"
                      )}
                      style={{
                        borderColor: isActive ? `${step.color}50` : undefined,
                        boxShadow: isActive ? `0 0 20px ${step.color}10` : undefined,
                      } as React.CSSProperties}
                    >
                      {/* Card Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-center gap-3">
                          <span
                            className="font-mono text-[10px] tracking-[0.3em] font-bold"
                            style={{ color: step.color }}
                          >
                            PROTOCOL_{step.id}
                          </span>
                          <span className="text-white/10">|</span>
                          <h2 className="text-base font-bold text-white group-hover:text-white/90">
                            {step.title}
                          </h2>
                        </div>
                        <div className="flex items-center gap-3">
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
                          className="mt-3 pt-3 border-t border-white/10 grid md:grid-cols-3 gap-6"
                        >
                          <p className="md:col-span-2 text-xs text-text-muted leading-relaxed">
                            {step.description}
                          </p>
                          <div>
                            <p className="text-[9px] font-mono text-text-muted uppercase tracking-wider mb-2">
                              Deliverables
                            </p>
                            <ul className="space-y-1">
                              {step.deliverables.map(d => (
                                <li key={d} className="text-[10px] font-mono text-white/70 flex items-center gap-2">
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
      </div>

      {/* CTA */}
      <SecureCTA />
    </div>
  );
}
