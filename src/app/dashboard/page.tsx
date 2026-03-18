"use client";

import React from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { SystemBadge } from "@/components/core/SystemBadge";
import { TerminalPrompt } from "@/components/core/TerminalPrompt";
import { getTechColor } from "@/lib/techColors";
import projects from "@/data/projects.json";

export default function DashboardPage() {
    const recentProjects = projects.slice(0, 3);
    const totalProjects = projects.length;
    const completedProjects = projects.filter(p => p.status === "COMPLETED").length;

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

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column: Identity & Stats */}
                <div className="space-y-8 lg:col-span-1">
                    {/* Identity Card */}
                    <HoloCard className="relative overflow-visible">
                        <div className="absolute -top-3 -right-3 z-20">
                            <SystemBadge label="OPEN TO WORK" status="success" />
                        </div>

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

                            <div className="w-full h-px bg-white/10" />

                            <p className="text-sm text-text-muted leading-relaxed text-left">
                                I build high-quality web applications with a focus on immersive user experiences, clean architecture, and performance. Specializing in React, Next.js, and modern frontend systems.
                            </p>

                            <div className="w-full h-px bg-white/10" />

                            <div className="w-full grid grid-cols-2 gap-4 text-left">
                                <div className="space-y-1">
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Stack</p>
                                    <p className="font-mono text-sm font-bold text-white">React / Next.js</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] text-text-muted uppercase tracking-wider">Focus</p>
                                    <p className="font-mono text-sm font-bold text-neon-cyan">Frontend</p>
                                </div>
                            </div>

                            <Link href="/comms" className="w-full">
                                <NeonButton variant="primary" className="w-full">Get In Touch</NeonButton>
                            </Link>
                        </div>
                    </HoloCard>

                    {/* Quick Stats */}
                    <HoloCard title="METRICS">
                        <div className="space-y-4">
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/5">
                                <span className="text-xs font-mono text-text-muted">TOTAL_PROJECTS</span>
                                <span className="text-xl font-bold text-white">{totalProjects}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/5">
                                <span className="text-xs font-mono text-text-muted">SHIPPED</span>
                                <span className="text-xl font-bold text-white">{completedProjects}</span>
                            </div>
                            <div className="flex justify-between items-center bg-white/5 p-3 rounded border border-white/5">
                                <span className="text-xs font-mono text-text-muted">PRIMARY_STACK</span>
                                <span className="text-sm font-bold text-neon-cyan font-mono">Next.js + Tailwind</span>
                            </div>
                        </div>
                    </HoloCard>
                </div>

                {/* Right Column: Recent Activity & Terminal */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Terminal */}
                    <HoloCard className="min-h-[150px]">
                        <TerminalPrompt
                            command="./scan_projects.sh --recent"
                            output={
                                <div className="space-y-1 mt-2">
                                    <p>Scanning project database...</p>
                                    <p className="text-neon-cyan">Found {projects.length} projects.</p>
                                    {recentProjects.map(p => (
                                        <p key={p.id} className="text-text-muted ml-2">
                                            - <span className="text-white">{p.title}</span> [{p.status}]
                                        </p>
                                    ))}
                                    <p className="animate-pulse">Awaiting input_</p>
                                </div>
                            }
                        />
                    </HoloCard>

                    {/* Recent Projects */}
                    <div>
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
                                <HoloCard key={project.id} className="group hover:border-neon-cyan/50 transition-colors">
                                    <div className="flex flex-col md:flex-row gap-4 justify-between md:items-center">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-lg font-bold text-white group-hover:text-neon-cyan transition-colors">{project.title}</h3>
                                                <SystemBadge
                                                    label={project.category}
                                                    status="neutral"
                                                />
                                            </div>
                                            <p className="text-sm text-text-muted max-w-xl">{project.description}</p>
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
                                </HoloCard>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
