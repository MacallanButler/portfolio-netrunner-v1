"use client";

import React from "react";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { StatBar } from "@/components/core/StatBar";
import { TerminalPrompt } from "@/components/core/TerminalPrompt";
import { SystemBadge } from "@/components/core/SystemBadge";

export default function DesignSystemPage() {
    return (
        <div className="space-y-12 pb-20">
            <header className="border-b border-white/10 pb-8">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">
                    <GlitchText text="DESIGN_SYSTEM_V1.0" />
                </h1>
                <p className="text-text-muted font-mono text-sm max-w-2xl">
                    Core UI components and design tokens for the Netrunner Portfolio.
                    All elements are designed to be modular, responsive, and thematically consistent.
                </p>
            </header>

            {/* Typography & Colors */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-cyan animate-pulse" />
                    01 // COLORS & TYPOGRAPHY
                </h2>

                <HoloCard title="COLOR_TOKENS">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { name: "neon-cyan", class: "bg-neon-cyan" },
                            { name: "neon-red", class: "bg-neon-red" },
                            { name: "surface-dark", class: "bg-surface-dark border border-white/10" },
                            { name: "surface-card", class: "bg-surface-card border border-white/10" },
                            { name: "text-primary", class: "bg-text-primary" },
                            { name: "text-muted", class: "bg-text-muted" },
                        ].map((color) => (
                            <div key={color.name} className="space-y-2">
                                <div className={`h-12 w-full rouded-sm ${color.class}`} />
                                <p className="text-xs font-mono text-text-muted">--{color.name}</p>
                            </div>
                        ))}
                    </div>
                </HoloCard>
            </section>

            {/* Buttons */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-cyan animate-pulse" />
                    02 // INTERACTIVE ELEMENTS
                </h2>

                <HoloCard title="NEON_BUTTONS">
                    <div className="flex flex-wrap gap-4">
                        <NeonButton variant="primary">Primary Action</NeonButton>
                        <NeonButton variant="secondary">Secondary</NeonButton>
                        <NeonButton variant="danger">Restricted</NeonButton>
                    </div>
                </HoloCard>
            </section>

            {/* Data Display */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-cyan animate-pulse" />
                    03 // DATA_DISPLAY
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                    <HoloCard title="STAT_BARS">
                        <div className="space-y-6">
                            <StatBar label="React / Next.js" value={95} />
                            <StatBar label="TypeScript" value={88} color="text-neon-cyan" />
                            <StatBar label="UI Design" value={75} color="bg-neon-red" />
                        </div>
                    </HoloCard>

                    <HoloCard title="SYSTEM_BADGES">
                        <div className="flex flex-wrap gap-2">
                            <SystemBadge label="React" status="success" />
                            <SystemBadge label="Next.js" status="success" />
                            <SystemBadge label="Legacy Code" status="error" />
                            <SystemBadge label="Beta Feature" status="warning" />
                            <SystemBadge label="Deprecated" status="neutral" />
                        </div>
                    </HoloCard>
                </div>
            </section>

            {/* Terminals */}
            <section className="space-y-6">
                <h2 className="text-xl font-mono text-neon-cyan flex items-center gap-2">
                    <span className="w-2 h-2 bg-neon-cyan animate-pulse" />
                    04 // TERMINAL_OUTPUT
                </h2>

                <HoloCard className="min-h-[200px]">
                    <TerminalPrompt
                        command="npm run build"
                        output={
                            <div className="space-y-1">
                                <p>Creating an optimized beauty build...</p>
                                <p className="text-neon-cyan">√ Compiled successfully</p>
                                <p>Route (app)                              Size     First Load JS</p>
                                <p>┌ ○ /                                    5.3 kB         87.4 kB</p>
                                <p>└ λ /api/comms                           0 kB             0 kB</p>
                            </div>
                        }
                    />
                </HoloCard>
            </section>
        </div>
    );
}
