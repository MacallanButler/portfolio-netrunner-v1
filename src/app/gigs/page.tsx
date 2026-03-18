"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { SystemBadge } from "@/components/core/SystemBadge";
import { ProjectImage } from "@/components/core/ProjectImage";
import { getTechColor } from "@/lib/techColors";
import projectsData from "@/data/projects.json";
import { cn } from "@/lib/utils";

export default function GigsPage() {
  const [filter, setFilter] = useState("ALL");

  const filteredProjects = projectsData.filter(project => {
    if (filter === "ALL") return true;
    return project.status === filter;
  });

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

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2">
        {["ALL", "COMPLETED", "IN_PROGRESS", "ARCHIVED"].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={cn(
              "px-4 py-2 border text-xs font-mono tracking-wider transition-all duration-300 relative",
              filter === status
                ? "border-neon-cyan text-neon-cyan bg-neon-cyan/10"
                : "border-white/10 text-text-muted hover:border-white/30 hover:text-white"
            )}
          >
            {status.replace("_", " ")}
            {filter === status && (
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_10px_#00FFFF]" />
            )}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <HoloCard key={project.id} className="flex flex-col h-full group p-0 overflow-hidden">
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
                <p className="leading-relaxed">{project.description}</p>
              </div>

              {/* Colored Tech Stack */}
              <div className="flex flex-wrap gap-2 pt-2">
                {project.techStack.map(tech => {
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

              {/* Links */}
              <div className="flex gap-4 text-xs font-mono pt-2 mt-auto">
                {project.repoUrl && (
                  <Link href={project.repoUrl} target="_blank" className="hover:text-neon-cyan transition-colors">
                    [ SOURCE ]
                  </Link>
                )}
                {project.liveUrl && (
                  <Link href={project.liveUrl} target="_blank" className="hover:text-neon-cyan transition-colors">
                    [ LIVE ]
                  </Link>
                )}
              </div>
            </div>
          </HoloCard>
        ))}
      </div>
    </div>
  );
}
