"use client";

import React, { useState } from "react";
import Link from "next/link";
import { HoloCard } from "@/components/core/HoloCard";
import { NeonButton } from "@/components/core/NeonButton";
import { StatBar } from "@/components/core/StatBar";
import { cn } from "@/lib/utils";
import {
  Activity,
  Server,
  Send,
  CheckCircle2,
  HardDrive,
  Globe,
  Lock,
  Terminal,
  ArrowRight
} from "lucide-react";

interface ClientProfile {
  id: string;
  domain: string;
  plan: "GROWTH ($150/mo)" | "PARTNER ($350/mo)";
  planKey: "growth" | "partner";
  uptime: string;
  latencyDfw: number;
  latencyIad: number;
  latencyFra: number;
  latencyNrt: number;
  lcp: string;
  cls: string;
  inp: string;
  lighthouseScore: number;
  hoursUsed: number;
  hoursTotal: number;
  sslExpiresDays: number;
  backupTime: string;
  recentTask: string;
}

const SAMPLE_CLIENTS: ClientProfile[] = [
  {
    id: "wrought",
    domain: "wrought-hardware.com",
    plan: "GROWTH ($150/mo)",
    planKey: "growth",
    uptime: "99.99%",
    latencyDfw: 34,
    latencyIad: 38,
    latencyFra: 48,
    latencyNrt: 86,
    lcp: "1.1s",
    cls: "0.004",
    inp: "38ms",
    lighthouseScore: 99,
    hoursUsed: 0.5,
    hoursTotal: 3.0,
    sslExpiresDays: 62,
    backupTime: "04:00 UTC Today",
    recentTask: "Stripe checkout webhook logging tuned & Redis cart warmed.",
  },
  {
    id: "apexdrop",
    domain: "apexdrop-tours.com",
    plan: "PARTNER ($350/mo)",
    planKey: "partner",
    uptime: "99.98%",
    latencyDfw: 39,
    latencyIad: 42,
    latencyFra: 54,
    latencyNrt: 92,
    lcp: "1.2s",
    cls: "0.008",
    inp: "44ms",
    lighthouseScore: 98,
    hoursUsed: 1.5,
    hoursTotal: 6.0,
    sslExpiresDays: 78,
    backupTime: "04:00 UTC Today",
    recentTask: "Booking calendar time zone drift patched & schema rich snippets updated.",
  },
  {
    id: "ghostmountain",
    domain: "ghostmountain.org",
    plan: "GROWTH ($150/mo)",
    planKey: "growth",
    uptime: "100.0%",
    latencyDfw: 32,
    latencyIad: 36,
    latencyFra: 46,
    latencyNrt: 84,
    lcp: "1.0s",
    cls: "0.002",
    inp: "32ms",
    lighthouseScore: 100,
    hoursUsed: 1.0,
    hoursTotal: 3.0,
    sslExpiresDays: 45,
    backupTime: "04:00 UTC Today",
    recentTask: "Donation page Core Web Vitals audited; LCP compressed by 340ms.",
  },
];

export function ClientCommandCenter() {
  const [selectedClientId, setSelectedClientId] = useState<string>("wrought");
  const [dispatchInput, setDispatchInput] = useState<string>("");
  const [dispatchLogs, setDispatchLogs] = useState<string[]>([]);
  const [isSubmittingDispatch, setIsSubmittingDispatch] = useState<boolean>(false);

  const client = SAMPLE_CLIENTS.find((c) => c.id === selectedClientId) || SAMPLE_CLIENTS[0];

  const handleSimulatedDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dispatchInput.trim()) return;

    setIsSubmittingDispatch(true);
    const timestamp = new Date().toLocaleTimeString();
    const taskSummary = dispatchInput.trim();

    setTimeout(() => {
      setDispatchLogs((prev) => [
        `[${timestamp}] TICKET_CREATED: "${taskSummary.length > 35 ? taskSummary.substring(0, 35) + "..." : taskSummary}"`,
        `[${timestamp}] DISPATCH_ALERT: SMS & notification routed directly to Macallan Butler.`,
        `[${timestamp}] SLA_TIMER_ACTIVE: Guaranteed resolution window open (within 48h).`,
        ...prev,
      ]);
      setDispatchInput("");
      setIsSubmittingDispatch(false);
    }, 500);
  };

  return (
    <div id="portal-demo" className="space-y-8 w-full">
      {/* Header telemetry badge */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] text-neon-cyan tracking-widest uppercase mb-1">
            <Activity size={12} className="animate-pulse" />
            <span>MANAGED_INFRASTRUCTURE // LIVE RETAINER DEMONSTRATION</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
            Client Command Center
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-neon-cyan/10 border border-neon-cyan/30 px-3 py-1.5 rounded-sm font-mono text-[10px] text-neon-cyan">
          <span className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
          <span>PORTAL_ACTIVE · LIVE TELEMETRY</span>
        </div>
      </div>

      <p className="text-xs text-text-muted font-mono leading-relaxed max-w-3xl">
        Text bullets alone can&apos;t show what a care plan feels like. This is an interactive simulation of the dedicated telemetry portal provided with MCB Systems Monthly Care Plans ($150–$350/mo). Toggle active client domains to inspect live metrics.
      </p>

      {/* Client Domain Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider mr-2">
          SIMULATE_DOMAIN:
        </span>
        {SAMPLE_CLIENTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setSelectedClientId(c.id)}
            className={cn(
              "font-mono text-xs px-3.5 py-2 rounded-sm border transition-all duration-200 flex items-center gap-2",
              selectedClientId === c.id
                ? "bg-neon-cyan/10 border-neon-cyan text-white shadow-[0_0_12px_rgba(0,255,255,0.15)]"
                : "bg-surface-card border-white/10 text-white/60 hover:text-white hover:border-white/20"
            )}
          >
            <Server size={13} className={selectedClientId === c.id ? "text-neon-cyan" : "text-text-muted"} />
            <span>{c.domain}</span>
            <span className="text-[9px] text-neon-cyan/80 bg-white/5 px-1.5 py-0.5 rounded">
              {c.planKey.toUpperCase()}
            </span>
          </button>
        ))}
      </div>

      {/* Main Command Center Dashboard */}
      <div className="grid lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Telemetry & Vitals Panel (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Real-time Status Card */}
          <div className="bg-surface-card border border-white/10 p-5 rounded-sm space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-neon-cyan" />
                <span className="font-mono text-xs font-bold text-white uppercase tracking-wider">
                  {client.domain}
                </span>
              </div>
              <span className="font-mono text-[10px] text-neon-cyan font-bold bg-neon-cyan/10 px-2 py-0.5 rounded border border-neon-cyan/30">
                {client.plan}
              </span>
            </div>

            {/* Top Vital Indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
              <div className="bg-surface-dark border border-white/5 p-3 rounded-sm space-y-1">
                <span className="text-[9px] text-text-muted uppercase block">30D UPTIME</span>
                <span className="text-sm font-bold text-neon-green block">{client.uptime}</span>
                <span className="text-[9px] text-white/40 block">0 incidents</span>
              </div>
              <div className="bg-surface-dark border border-white/5 p-3 rounded-sm space-y-1">
                <span className="text-[9px] text-text-muted uppercase block">LIGHTHOUSE</span>
                <span className="text-sm font-bold text-neon-cyan block">{client.lighthouseScore} / 100</span>
                <span className="text-[9px] text-white/40 block">Grade A+</span>
              </div>
              <div className="bg-surface-dark border border-white/5 p-3 rounded-sm space-y-1">
                <span className="text-[9px] text-text-muted uppercase block">LCP SPEED</span>
                <span className="text-sm font-bold text-white block">{client.lcp}</span>
                <span className="text-[9px] text-neon-green block">&lt; 2.5s Target</span>
              </div>
              <div className="bg-surface-dark border border-white/5 p-3 rounded-sm space-y-1">
                <span className="text-[9px] text-text-muted uppercase block">DEV HOURS</span>
                <span className="text-sm font-bold text-white block">
                  {client.hoursTotal - client.hoursUsed}h left
                </span>
                <span className="text-[9px] text-white/40 block">{client.hoursUsed}h of {client.hoursTotal}h used</span>
              </div>
            </div>

            {/* Synthetic Edge Response Latency */}
            <div className="space-y-2 pt-2 border-t border-white/5 font-mono">
              <div className="flex items-center justify-between text-xs text-text-muted">
                <span className="flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                  <Activity size={12} className="text-neon-cyan" />
                  Global Edge Response Latency (Live CDN Ping)
                </span>
                <span className="text-[10px] text-neon-green">Global Average: 45ms</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-2.5 bg-surface-dark/80 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white/60 text-[10px]">DFW (Dallas)</span>
                  <span className="text-neon-cyan font-bold text-[11px]">{client.latencyDfw}ms</span>
                </div>
                <div className="p-2.5 bg-surface-dark/80 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white/60 text-[10px]">IAD (Ashburn)</span>
                  <span className="text-neon-cyan font-bold text-[11px]">{client.latencyIad}ms</span>
                </div>
                <div className="p-2.5 bg-surface-dark/80 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white/60 text-[10px]">FRA (Frankfurt)</span>
                  <span className="text-neon-cyan font-bold text-[11px]">{client.latencyFra}ms</span>
                </div>
                <div className="p-2.5 bg-surface-dark/80 rounded border border-white/5 flex items-center justify-between">
                  <span className="text-white/60 text-[10px]">NRT (Tokyo)</span>
                  <span className="text-white/80 font-bold text-[11px]">{client.latencyNrt}ms</span>
                </div>
              </div>
            </div>

            {/* Core Web Vitals Progress Bars */}
            <div className="space-y-3 pt-2 border-t border-white/5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">
                Google Core Web Vitals Status:
              </span>
              <div className="space-y-2">
                <StatBar label={`Largest Contentful Paint (LCP: ${client.lcp})`} value={96} color="bg-neon-cyan" />
                <StatBar label={`Cumulative Layout Shift (CLS: ${client.cls})`} value={99} color="bg-neon-green" />
                <StatBar label={`Interaction to Next Paint (INP: ${client.inp})`} value={94} color="bg-neon-cyan" />
              </div>
            </div>

            {/* Security & Backup Status Details */}
            <div className="grid sm:grid-cols-2 gap-3 pt-3 border-t border-white/5 font-mono text-xs">
              <div className="flex items-start gap-2.5 p-3 bg-surface-dark/60 rounded border border-white/5">
                <Lock size={15} className="text-neon-green mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-[11px] block">SSL/TLS Active</span>
                  <span className="text-[10px] text-text-muted block">
                    Let&apos;s Encrypt ECDSA · Renews in {client.sslExpiresDays} days
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 bg-surface-dark/60 rounded border border-white/5">
                <HardDrive size={15} className="text-neon-cyan mt-0.5 flex-shrink-0" />
                <div className="space-y-0.5">
                  <span className="font-bold text-white text-[11px] block">Automated Backup Verified</span>
                  <span className="text-[10px] text-text-muted block">
                    Encrypted snapshot verified {client.backupTime}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Right Dispatch & Engineering Ticket Simulation (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <HoloCard title="ENGINEERING_DISPATCH_PORTAL">
            <div className="space-y-4">
              
              {/* Dev Hours Allocation Visual */}
              <div className="p-3.5 bg-surface-dark border border-white/10 rounded-sm space-y-2">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-text-muted uppercase text-[10px]">Monthly Retainer Hours:</span>
                  <span className="text-neon-cyan font-bold">
                    {(client.hoursTotal - client.hoursUsed).toFixed(1)} / {client.hoursTotal.toFixed(1)} hrs available
                  </span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-neon-cyan shadow-[0_0_8px_currentColor] transition-all duration-500"
                    style={{
                      width: `${((client.hoursTotal - client.hoursUsed) / client.hoursTotal) * 100}%`,
                    }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] font-mono text-text-muted/80 pt-1">
                  <span>Priority SLA: 48hr turnaround</span>
                  <span>Overage rate: $75/hr</span>
                </div>
              </div>

              {/* Latest Completed Task Readout */}
              <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm space-y-1">
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-neon-green uppercase">
                  <CheckCircle2 size={11} />
                  <span>Latest Completed Task:</span>
                </div>
                <p className="font-mono text-xs text-white/80 leading-relaxed">
                  {client.recentTask}
                </p>
              </div>

              {/* Interactive Dispatch Form */}
              <form onSubmit={handleSimulatedDispatch} className="space-y-3 pt-2 border-t border-white/10">
                <div className="space-y-1">
                  <label className="font-mono text-[10px] text-neon-cyan uppercase tracking-wider block">
                    Submit Priority Request (Demo):
                  </label>
                  <p className="text-[10px] text-text-muted font-sans leading-relaxed">
                    Test submitting a work ticket as if you were an active client on retainer:
                  </p>
                  <input
                    type="text"
                    value={dispatchInput}
                    onChange={(e) => setDispatchInput(e.target.value)}
                    placeholder="e.g. Update seasonal hero banner, fix link..."
                    className="w-full bg-surface-dark border border-white/10 p-2.5 font-mono text-xs focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/30"
                  />
                </div>

                <NeonButton
                  variant="primary"
                  type="submit"
                  disabled={isSubmittingDispatch || !dispatchInput.trim()}
                  className="w-full text-xs py-2.5 flex items-center justify-center gap-2"
                >
                  <Send size={13} />
                  <span>{isSubmittingDispatch ? "DISPATCHING..." : "DISPATCH ENGINEERING TICKET"}</span>
                </NeonButton>
              </form>

              {/* Simulated Real-Time Dispatch Terminal Log */}
              {dispatchLogs.length > 0 && (
                <div className="p-3 bg-surface-dark/90 border border-white/10 rounded-sm font-mono text-[9px] space-y-1.5 max-h-[140px] overflow-y-auto scrollbar-none">
                  <div className="flex items-center gap-1 text-neon-cyan font-bold border-b border-white/10 pb-1">
                    <Terminal size={10} />
                    <span>DISPATCH_LOG // REAL-TIME DISPATCH CONFIRMATION</span>
                  </div>
                  {dispatchLogs.map((log, i) => (
                    <div key={i} className="text-white/80 leading-relaxed">
                      &gt; {log}
                    </div>
                  ))}
                </div>
              )}

              {/* Direct Link to Subscribe to Retainer */}
              <div className="pt-3 border-t border-white/10 space-y-2">
                <Link href={`/contact?package=${client.planKey}`} className="block w-full">
                  <NeonButton variant="secondary" className="w-full text-xs py-2.5 flex items-center justify-center gap-2">
                    <span>SUBSCRIBE TO {client.planKey.toUpperCase()} CARE PLAN</span>
                    <ArrowRight size={13} />
                  </NeonButton>
                </Link>
                <p className="text-[10px] font-mono text-center text-text-muted/60">
                  Month-to-month flexibility. No long-term contracts.
                </p>
              </div>

            </div>
          </HoloCard>
        </div>

      </div>
    </div>
  );
}
