"use client";

import React, { useState } from "react";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { cn } from "@/lib/utils";
import { trackContactSubmit } from "@/lib/analytics";

export default function CommsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
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
                trackContactSubmit("email");
            } else {
                throw new Error("Server rejected connection");
            }
        } catch (error) {
            addToLog("ERROR: DELIVERY_FAILED");
            setStatus("ERROR");
        }
    };

    return (
        <div className="flex flex-col justify-center min-h-[calc(100vh-8rem)] lg:min-h-[calc(100vh-10rem)] w-full">
            <div className="grid lg:grid-cols-12 gap-8 items-start max-w-6xl w-full mx-auto">
                
                {/* ── LEFT COLUMN: SECURE CONNECTION INFO ── */}
                <div className="lg:col-span-5 space-y-6 border-b border-white/10 pb-6 lg:border-b-0 lg:pb-0 lg:border-r lg:border-white/10 lg:pr-8">
                    <div>
                        <span className="text-[10px] font-mono text-neon-cyan tracking-widest uppercase mb-1 block">
                            // SECURE_CHANNEL
                        </span>
                        <h1 className="text-4xl font-bold tracking-tighter mb-4 text-white">
                            <GlitchText text="GET_IN_TOUCH" />
                        </h1>
                        <p className="text-text-muted font-mono text-xs leading-relaxed">
                            Have a project in mind or want to collaborate? Establish a secure bridge link by transmitting your payload message directly to my system node.
                        </p>
                    </div>

                    {/* Node status details */}
                    <div className="space-y-2 pt-4 border-t border-white/5 font-mono text-[10px] text-text-muted">
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
                        <div className="bg-surface-dark/50 border border-white/5 p-3 rounded-sm font-mono text-[9px] space-y-1 max-h-[110px] overflow-y-auto scrollbar-none">
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
                <div className="lg:col-span-7">
                    <HoloCard title="TRANSMIT_MESSAGE_PAYLOAD">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Operator Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2.5 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/10"
                                    placeholder="Provide identification tag..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Routing Email
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2.5 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/10"
                                    placeholder="Enter communication address..."
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider">
                                    Message Body
                                </label>
                                <textarea
                                    rows={4}
                                    required
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    className="w-full bg-surface-dark border border-white/10 p-2.5 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/10 resize-none scrollbar-none"
                                    placeholder="Enter transmission details..."
                                />
                            </div>

                            <div className="flex justify-end pt-1">
                                <NeonButton
                                    variant="primary"
                                    type="submit"
                                    disabled={status === "SENDING" || status === "SUCCESS"}
                                    className="w-full md:w-auto text-xs"
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
