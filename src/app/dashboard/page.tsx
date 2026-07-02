"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { SystemBadge } from "@/components/core/SystemBadge";
import { getTechColor } from "@/lib/techColors";
import { useProjectModal } from "@/context/ProjectModalContext";
import projects from "@/data/projects.json";

export default function DashboardPage() {
  const recentProjects = projects.slice(0, 3);
  const totalProjects = projects.length;
  const { openProject } = useProjectModal();

  return (
    <div className="space-y-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-1">
            <GlitchText text="DASHBOARD" />
          </h1>
          <p className="text-text-muted font-mono text-xs">
            Portfolio overview. All systems operational.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs text-text-muted">
          <span>PROJECTS: <span className="text-white">{totalProjects}</span></span>
          <span>STATUS: <span className="text-neon-cyan">AVAILABLE</span></span>
        </div>
      </div>

      {/* Three Column Grid for Single Screen Fit */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">

        {/* ── COLUMN 1: Identity ── */}
        <div className="lg:col-span-4 w-full">
          <HoloCard>
            <div className="flex flex-col items-center text-center space-y-4 py-2">
              <div className="w-20 h-20 rounded-full bg-surface-dark border-2 border-neon-cyan flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-cyan/20 animate-pulse group-hover:bg-neon-cyan/40 transition-colors" />
                <span className="font-mono text-2xl font-bold text-neon-cyan relative z-10">MB</span>
              </div>
              <div>
                <h2 className="text-lg font-bold tracking-tight text-white mb-0.5">Macallan Butler</h2>
                <p className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase">// Full-Stack Developer</p>
                <p className="text-[9px] font-mono text-text-muted tracking-wider uppercase mt-0.5">UI Architect</p>
              </div>
              <SystemBadge label="OPEN TO WORK" status="success" className="text-[9px] px-2 py-0.5" />
              <Link href="/comms" className="w-full pt-2">
                <NeonButton variant="primary" className="w-full text-xs py-1.5">Get In Touch</NeonButton>
              </Link>
            </div>
          </HoloCard>
        </div>

        {/* ── COLUMN 2: About ── */}
        <div className="lg:col-span-4 w-full">
          <HoloCard title="ABOUT_OPERATOR">
            <div className="space-y-3 text-xs text-text-muted leading-relaxed font-mono py-1">
              <p>
                Full-stack developer building high-fidelity interfaces and interactive experiences. I work across the stack with a focus on React, Next.js, and motion-driven UI.
              </p>
              <p>
                Specializing in bridging rich styling designs with solid, responsive, and performance-optimized front-end codebases.
              </p>
            </div>
          </HoloCard>
        </div>

        {/* ── COLUMN 3: Recent Projects ── */}
        <div className="lg:col-span-4 w-full space-y-3">
          <div className="flex justify-between items-end pb-1">
            <h2 className="text-xs font-mono text-neon-cyan flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-neon-cyan animate-pulse" />
              RECENT_PROJECTS
            </h2>
            <Link href="/gigs" className="text-[10px] text-text-muted hover:text-neon-cyan transition-colors font-mono">
              VIEW_ALL &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {recentProjects.map((project) => (
              <motion.div
                key={project.id}
                onClick={() => openProject(project)}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-white/10 bg-surface-card p-4 shadow-lg"
                whileHover={{
                  y: -2,
                  borderColor: "rgba(0,255,0,0.5)",
                  boxShadow: "0 0 12px rgba(0,255,0,0.06)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                {/* Corner cyber ticks */}
                <div className="absolute top-0 left-0 h-1.5 w-1.5 border-t-2 border-l-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-0 right-0 h-1.5 w-1.5 border-b-2 border-r-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity" />

                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="text-xs font-bold text-white group-hover:text-neon-cyan transition-colors truncate max-w-[150px]">
                      {project.title}
                    </h3>
                    <SystemBadge label={project.category} status="neutral" className="text-[9px] px-1.5 py-0.2" />
                  </div>
                  <div className="flex gap-1 flex-wrap">
                    {project.techStack.slice(0, 3).map(tech => {
                      const colors = getTechColor(tech);
                      return (
                        <span
                          key={tech}
                          className="text-[9px] font-mono px-1.5 py-0.2 rounded border tracking-wider"
                          style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}
                        >
                          {tech}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}