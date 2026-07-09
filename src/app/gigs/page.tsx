"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { SystemBadge } from "@/components/core/SystemBadge";
import { ProjectImage } from "@/components/core/ProjectImage";
import { getTechColor } from "@/lib/techColors";
import { useProjectModal } from "@/context/ProjectModalContext";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

export default function GigsPage() {
  const { openProject } = useProjectModal();

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-2">
            <GlitchText text="PROJECT_ARCHIVE" />
          </h1>
          <p className="text-text-muted font-mono text-sm max-w-xl">
            A curated selection of shipped web applications, platforms, and interactive experiences.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projectsData.map((project) => (
          <motion.div
            key={project.id}
            onClick={() => openProject(project)}
            className="group cursor-pointer relative overflow-hidden rounded-sm border border-white/10 bg-surface-card shadow-lg flex flex-col h-full"
            whileHover={{
              y: -4,
              borderColor: "rgba(0,255,0,0.5)",
              boxShadow: "0 0 20px rgba(0,255,0,0.08)",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            {/* Corner accents */}
            <div className="absolute top-0 left-0 h-2 w-2 border-t-2 border-l-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity z-10" />
            <div className="absolute top-0 right-0 h-2 w-2 border-t-2 border-r-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity z-10" />
            <div className="absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity z-10" />
            <div className="absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-neon-cyan opacity-30 group-hover:opacity-70 transition-opacity z-10" />

            {/* Project Image */}
            <ProjectImage id={project.id} title={project.title} className="h-52" />

            {/* Card Body */}
            <div className="flex flex-col flex-1 p-6 space-y-4">
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <SystemBadge label={project.category} status="neutral" />
              </div>

              <div className="space-y-1 text-sm text-text-muted">
                <p>
                  <span className="text-white/40 font-mono text-xs uppercase">Industry: </span>
                  {project.client}
                </p>
              </div>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map((tech) => {
                  const colors = getTechColor(tech);
                  return (
                    <span
                      key={tech}
                      className="text-[10px] font-mono px-2 py-1 rounded border tracking-wider"
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

              {/* Open hint */}
              <div className="mt-auto pt-2 flex items-center gap-2 font-mono text-[10px] text-text-muted group-hover:text-neon-cyan/60 transition-colors">
                <span className="inline-block w-1 h-1 bg-current rounded-full animate-pulse" />
                CLICK TO EXPAND
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}