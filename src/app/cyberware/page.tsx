"use client";

import React from "react";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { StatBar } from "@/components/core/StatBar";
import skillsData from "@/data/skills.json";

export default function CyberwarePage() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">
                    <GlitchText text="SKILL_MATRIX" />
                </h1>
                <p className="text-text-muted font-mono text-sm max-w-xl">
                    Technical proficiency breakdown. Languages, tools, and core competencies.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Languages */}
                <div className="space-y-4">
                    <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-neon-cyan animate-pulse" />
                        LANGUAGES
                    </h2>
                    <HoloCard>
                        <div className="space-y-6">
                            {skillsData.neural.map(skill => (
                                <StatBar
                                    key={skill.name}
                                    label={skill.name}
                                    value={skill.level}
                                    color={skill.level > 90 ? "bg-neon-cyan" : "bg-white/50"}
                                />
                            ))}
                        </div>
                    </HoloCard>
                </div>

                {/* Tools & Frameworks */}
                <div className="space-y-4">
                    <h2 className="text-xl font-mono text-neon-red flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-neon-red animate-pulse" />
                        TOOLS & FRAMEWORKS
                    </h2>
                    <HoloCard>
                        <div className="space-y-6">
                            {skillsData.chrome.map(skill => (
                                <StatBar
                                    key={skill.name}
                                    label={skill.name}
                                    value={skill.level}
                                    color={skill.level > 90 ? "bg-neon-red" : "bg-white/50"}
                                />
                            ))}
                        </div>
                    </HoloCard>
                </div>

                {/* Core Competencies */}
                <div className="space-y-4 md:col-span-2">
                    <h2 className="text-xl font-mono text-text-primary flex items-center gap-2 mb-4">
                        <span className="w-2 h-2 bg-white animate-pulse" />
                        CORE COMPETENCIES
                    </h2>
                    <HoloCard>
                        <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                            {skillsData.firmware.map(skill => (
                                <StatBar
                                    key={skill.name}
                                    label={skill.name}
                                    value={skill.level}
                                    color="bg-white"
                                />
                            ))}
                        </div>
                    </HoloCard>
                </div>
            </div>
        </div>
    );
}
