"use client";

import React, { useState, useEffect } from "react";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { cn } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { trackContactSubmit } from "@/lib/analytics";

export default function CommsClient() {
    const searchParams = useSearchParams();
    const packageInterest = searchParams.get("package") ?? "none";
    const domainParam = searchParams.get("domain");
    const gradeParam = searchParams.get("grade");
    const projectParam = searchParams.get("project");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    useEffect(() => {
        if (domainParam && gradeParam) {
            setFormData(prev => ({
                ...prev,
                message: prev.message || `Hi Macallan, I just ran a SiteGrade audit on ${domainParam} (scored Grade ${gradeParam}). I'd like to discuss an optimization / takeover plan to fix these issues.`
            }));
        } else if (projectParam) {
            setFormData(prev => ({
                ...prev,
                message: prev.message || `Hi Macallan, I was reviewing your case study for ${projectParam} and would like to explore building a similar digital system for our business.`
            }));
        }
    }, [domainParam, gradeParam, projectParam]);
    const [status, setStatus] = useState<"IDLE" | "SENDING" | "SUCCESS" | "ERROR">("IDLE");
    const [logs, setLogs] = useState<string[]>([]);

    const addToLog = (msg: string) => {
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("SENDING");
        addToLog("SENDING_MESSAGE...");
        addToLog("ENCRYPTING_PAYLOAD...");

        try {
            const res = await fetch('/api/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                addToLog("DELIVERED.");
                addToLog("STATUS: 200 OK");
                setStatus("SUCCESS");
                setFormData({ name: "", email: "", message: "" });
                trackContactSubmit("email", packageInterest);
            } else {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || "Server rejected connection");
            }
        } catch (error: unknown) {
            const msg = error instanceof Error ? error.message : "DELIVERY_FAILED";
            addToLog(`ERROR: ${msg}`);
            setStatus("ERROR");
        }
    };

    return (
        <div className="flex flex-col justify-center w-full max-w-5xl mx-auto overflow-hidden">
            {/* Unified Page Header */}
            <div className="border-b border-white/10 pb-2 md:pb-3 mb-3 md:mb-4">
                <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase mb-0.5 block font-normal">
                    {"// SECURE_CHANNEL"}
                </span>
                <h1 className="text-2xl md:text-3xl font-bold tracking-tighter text-white">
                    <GlitchText text="GET_IN_TOUCH" />
                </h1>
            </div>

            <div className="grid md:grid-cols-12 gap-4 md:gap-6 items-start w-full mx-auto">
                
                {/* ── LEFT COLUMN: SECURE CONNECTION INFO (Hidden on mobile) ── */}
                <div className="hidden md:block md:col-span-5 space-y-3 md:border-r md:border-white/10 md:pr-5">
                    <p className="text-text-muted font-mono text-xs leading-relaxed">
                        Have a project in mind, or want to collaborate? Send a message directly — no gatekeepers, no ticketing system. I read and respond to every submission personally.
                    </p>

                    {/* Node status details */}
                    <div className="space-y-1 pt-2 border-t border-white/5 font-mono text-[10px] text-text-muted">
                        <div className="flex justify-between">
                           <span>COMMS_PORT:</span>
                           <span className="text-white">PORT_443 (TLS)</span>
                        </div>
                        <div className="flex justify-between">
                           <span>ENCRYPTION:</span>
                           <span className="text-neon-cyan font-semibold">RSA_4096_GCM</span>
                        </div>
                        <div className="flex justify-between">
                           <span>SYS_ROUTING:</span>
                           <span className="text-white">DIRECT_NODE</span>
                        </div>
                    </div>

                    {/* Transmission Logs */}
                    {logs.length > 0 && (
                        <div className="bg-surface-dark/50 border border-white/5 p-2 rounded-sm font-mono text-[9px] space-y-1 max-h-[75px] overflow-y-auto scrollbar-none">
                            {logs.map((log, i) => (
                                <div key={i} className={cn(
                                    "text-text-muted",
                                    log.includes("DELIVERED") ? "text-neon-cyan" : log.includes("ERROR") ? "text-neon-red" : ""
                                )}>
                                    &gt; {log}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── RIGHT COLUMN: CONTACT FORM ── */}
                <div className="md:col-span-7">
                    <HoloCard title="TRANSMIT_MESSAGE_PAYLOAD" className="p-3.5 sm:p-5">
                        <form onSubmit={handleSubmit} className="space-y-2.5 md:space-y-3">
                            <div className="p-2.5 bg-surface-dark/70 border border-white/10 rounded-sm">
                                <p className="text-[11px] font-mono text-white/90 leading-relaxed">
                                    You&apos;re reaching out to <span className="text-neon-cyan font-semibold">MCB Systems LLC</span>. Every inquiry gets a response within 1 business day.
                                </p>
                            </div>
                            
                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Operator Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/35"
                                    placeholder="Provide identification tag..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Routing Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/35"
                                    placeholder="Enter communication address..."
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Message Body
                                </label>
                                <textarea
                                    rows={3}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/35 resize-none scrollbar-none"
                                    placeholder="Enter transmission details..."
                                />
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
                                <p className="text-[10px] font-mono text-text-muted/75">
                                    By transmitting, you acknowledge our{" "}
                                    <Link href="/privacy" className="text-neon-cyan hover:underline">
                                        Privacy Policy
                                    </Link>
                                    .
                                </p>
                                <NeonButton
                                    variant="primary"
                                    type="submit"
                                    disabled={status === "SENDING" || status === "SUCCESS"}
                                    className="w-full sm:w-auto text-xs py-1.5 px-4 flex-shrink-0"
                                >
                                    {status === "SENDING" ? "TRANSMITTING..." : status === "SUCCESS" ? "MESSAGE DELIVERED" : "TRANSMIT MESSAGE"}
                                </NeonButton>
                            </div>
                        </form>
                    </HoloCard>
                </div>

            </div>
        </div>
    );
}
