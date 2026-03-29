"use client";

import React, { useState } from "react";
import { HoloCard } from "@/components/core/HoloCard";
import { GlitchText } from "@/components/core/GlitchText";
import { NeonButton } from "@/components/core/NeonButton";
import { cn } from "@/lib/utils";

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
            } else {
                throw new Error("Server rejected connection");
            }
        } catch (error) {
            addToLog("ERROR: DELIVERY_FAILED");
            setStatus("ERROR");
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="border-b border-white/10 pb-6">
                <h1 className="text-4xl font-bold tracking-tighter mb-2">
                    <GlitchText text="GET_IN_TOUCH" />
                </h1>
                <p className="text-text-muted font-mono text-sm max-w-xl">
                    Have a project in mind or want to collaborate? Send a message below.
                </p>
            </div>

            <div className="max-w-2xl">
                {/* Contact Form */}
                <HoloCard title="MESSAGE">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full bg-surface-dark border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/20"
                                placeholder="Your name..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-surface-dark border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/20"
                                placeholder="you@example.com"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-mono text-neon-cyan uppercase tracking-wider">
                                Message
                            </label>
                            <textarea
                                rows={5}
                                required
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                className="w-full bg-surface-dark border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/20 resize-none"
                                placeholder="What can I help you with?"
                            />
                        </div>

                        <div className="flex justify-end">
                            <NeonButton
                                variant="primary"
                                type="submit"
                                disabled={status === "SENDING" || status === "SUCCESS"}
                                className="w-full md:w-auto"
                            >
                                {status === "SENDING" ? "SENDING..." : status === "SUCCESS" ? "MESSAGE SENT" : "SEND MESSAGE"}
                            </NeonButton>
                        </div>
                    </form>
                </HoloCard>
            </div>
        </div>
    );
}
