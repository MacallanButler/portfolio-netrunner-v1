"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { SystemBadge } from "@/components/core/SystemBadge";
import { StatBar } from "@/components/core/StatBar";
import { TerminalPrompt } from "@/components/core/TerminalPrompt";
import { getTechColor } from "@/lib/techColors";
import { useProjectModal } from "@/context/ProjectModalContext";
import projects from "@/data/projects.json";
import skills from "@/data/skills.json";

export default function DashboardPage() {
  const recentProjects = projects.slice(0, 3);
  const totalProjects = projects.length;
  const { openProject } = useProjectModal();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            <GlitchText text="DASHBOARD" />
          </h1>
          <p className="text-text-muted font-mono text-sm">
            Portfolio overview. All systems operational.
          </p>
        </div>
        <div className="flex gap-4 font-mono text-xs text-text-muted">
          <span>PROJECTS: <span className="text-white">{totalProjects}</span></span>
          <span>STATUS: <span className="text-neon-cyan">AVAILABLE</span></span>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-8">

        {/* ── LEFT: Identity + Bio ── */}
        <div className="lg:col-span-4 space-y-4">

          {/* Identity card */}
          <HoloCard>
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-24 h-24 rounded-full bg-surface-dark border-2 border-neon-cyan flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-neon-cyan/20 animate-pulse group-hover:bg-neon-cyan/40 transition-colors" />
                <span className="font-mono text-3xl font-bold text-neon-cyan relative z-10">MB</span>
              </div>
              <div>
                <h2 className="text-xl font-bold tracking-tight text-white mb-1">Macallan Butler</h2>
                <p className="text-xs font-mono text-neon-cyan tracking-widest uppercase">Full-Stack Developer</p>
                <p className="text-xs font-mono text-text-muted tracking-wider uppercase mt-1">UI Architect</p>
              </div>
              <SystemBadge label="OPEN TO WORK" status="success" />
              <Link href="/comms" className="w-full mt-4">
                <NeonButton variant="primary" className="w-full">Get In Touch</NeonButton>
              </Link>
            </div>
          </HoloCard>

          {/* Bio */}
          <HoloCard title="ABOUT">
            <div className="space-y-3 text-sm text-text-muted leading-relaxed">
              <p>
                Full-stack developer specialising in high-fidelity web interfaces and interactive experiences. I build products that feel as sharp as they look.
              </p>
              <p>
                Comfortable across the stack — from API design to animation systems — with a focus on React, Next.js, and thoughtful UI architecture.
              </p>
            </div>
          </HoloCard>

          {/* Terminal */}
          <HoloCard>
            <TerminalPrompt
              command="whoami --verbose"
              output={
                <div className="space-y-1 text-xs">
                  <p><span className="text-neon-cyan">location:</span> Available remotely</p>
                  <p><span className="text-neon-cyan">focus:</span> React · Next.js · TypeScript</p>
                  <p><span className="text-neon-cyan">status:</span> Open to full-time & contract</p>
                </div>
              }
            />
          </HoloCard>

          {/* Skills */}
          <HoloCard title="NEURAL_LINKS">
            <div className="space-y-1">
              {skills.neural.slice(0, 4).map((skill) => (
                <StatBar
                  key={skill.name}
                  label={skill.name}
                  value={skill.level}
                  color="#00FF00"
                />
              ))}
            </div>
          </HoloCard>
        </div>

        {/* ── RIGHT: Recent Projects ── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2">
              <span className="w-2 h-2 bg-neon-cyan" />
              RECENT_PROJECTS
            </h2>
            <Link href="/gigs" className="text-xs text-text-muted hover:text-neon-cyan transition-colors font-mono">
              VIEW_ALL &rarr;
            </Link>
          </div>

          <div className="space-y-4">
            {recentProjects.map((project) => (
              <motion.div
                key={project.id}
                layoutId={`project-card-${project.id}`}
                onClick={() => openProject(project)}
                className="group cursor-pointer relative overflow-hidden rounded-sm border border-white/10 bg-surface-card p-6 shadow-lg"
                whileHover={{
                  y: -2,
                  borderColor: "rgba(0,255,0,0.5)",
                  boxShadow: "0 0 15px rgba(0,255,0,0.08)",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity" />
                <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity" />

                <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <SystemBadge label={project.category} status="neutral" className="whitespace-normal text-center" />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 flex-wrap">
                    {project.techStack.slice(0, 3).map(tech => {
                      const colors = getTechColor(tech);
                      return (
                        <span
                          key={tech}
                          className="text-[10px] font-mono px-2 py-0.5 rounded border tracking-wider"
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
