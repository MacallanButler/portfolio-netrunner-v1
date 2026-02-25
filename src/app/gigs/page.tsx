"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { SystemBadge } from "@/components/core/SystemBadge";
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
                            "px-4 py-2 border text-xs font-mono tracking-wider transition-all duration-300 relative overflow-hidden group",
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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                    <HoloCard key={project.id} className="flex flex-col h-full group">
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between items-start gap-2">
                                <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
                                    {project.title}
                                </h3>
                                <SystemBadge
                                    label={project.category}
                                    status="neutral"
                                />
                            </div>

                            <div className="space-y-2 text-sm text-text-muted">
                                <p><span className="text-white/50 font-mono text-xs uppercase">Industry:</span> {project.client}</p>
                                <p>{project.description}</p>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-white/5 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                {project.techStack.map(tech => (
                                    <span key={tech} className="text-[10px] font-mono p-1 px-2 border border-white/10 text-text-muted rounded">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 text-xs font-mono">
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
