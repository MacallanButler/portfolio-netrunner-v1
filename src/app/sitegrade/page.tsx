'use client';

import React, { useState, useEffect, useRef } from "react";
import { GlitchText } from "@/components/core/GlitchText";
import { HoloCard } from "@/components/core/HoloCard";
import { NeonButton } from "@/components/core/NeonButton";

type AppState = "idle" | "loading" | "teaser" | "capturing" | "delivered" | "error";

interface TeaserData {
  grade: string;
  headline_category: string;
  headline_score: number;
}

export default function SiteGradePage() {
  const [appState, setAppState] = useState<AppState>("idle");
  const [urlInput, setUrlInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  
  // Auditing states
  const [auditId, setAuditId] = useState("");
  const [auditDomain, setAuditDomain] = useState("");
  const [rawPhase, setRawPhase] = useState("");
  const [statusPhase, setStatusPhase] = useState("Initializing audit...");
  const [teaserData, setTeaserData] = useState<TeaserData | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

  // Sync animation progress bar state
  const [auditProgress, setAuditProgress] = useState(0);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  // Helper to extract clean domain from input
  const getCleanDomain = (rawUrl: string): string => {
    let clean = rawUrl.trim().toLowerCase();
    clean = clean.replace(/^(https?:\/\/)?(www\.)?/, "");
    return clean.split("/")[0] || rawUrl;
  };

  // Phase message mapping based on what backend orchestrator returns
  const getPhaseMessage = (phase: string): string => {
    const messages: Record<string, string> = {
      "initializing": "Preparing audit task...",
      "checking_url": "Validating domain & checking SSRF...",
      "fetching_website": "Connecting to server and fetching HTML...",
      "analyzing_performance": "Running PageSpeed Core Web Vitals checks...",
      "analyzing_structure": "Parsing Technical SEO and semantic code...",
      "analyzing_content": "Gemini: Assessing copywriting & brand context..."
    };
    return messages[phase] || "Analyzing technical indicators...";
  };

  // Sync progress bar timer
  useEffect(() => {
    if (appState === "loading") {
      setAuditProgress(5);
      const timer = setInterval(() => {
        setAuditProgress(prev => {
          if (prev < 95) {
            const diff = Math.random() * 8 + 2;
            return Math.min(Math.round(prev + diff), 95);
          }
          return prev;
        });
      }, 800);
      return () => clearInterval(timer);
    } else if (["teaser", "capturing", "delivered"].includes(appState)) {
      setAuditProgress(100);
    } else if (appState === "idle") {
      setAuditProgress(0);
      setRawPhase("");
    }
  }, [appState]);

  // Adjust progress bar min caps based on actual backend phase updates
  useEffect(() => {
    if (appState === "loading" && rawPhase) {
      const phaseMinProgress: Record<string, number> = {
        "initializing": 10,
        "checking_url": 25,
        "fetching_website": 40,
        "analyzing_performance": 60,
        "analyzing_structure": 75,
        "analyzing_content": 90
      };
      
      const targetMin = phaseMinProgress[rawPhase] || 10;
      setAuditProgress(prev => Math.max(prev, targetMin));
    }
  }, [rawPhase, appState]);

  // 1. Submit website URL for audit
  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!urlInput.trim()) {
      setErrorMessage("Please enter a website URL.");
      return;
    }

    setAppState("loading");
    setStatusPhase("Initiating audit request...");
    const domainName = getCleanDomain(urlInput);
    setAuditDomain(domainName);

    try {
      const res = await fetch("/api/sitegrade/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlInput })
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to trigger website audit.");
        setAppState("idle");
        return;
      }

      const data = await res.json();
      setAuditId(data.audit_id);
      
      // Start polling
      startStatusPolling(data.audit_id);

    } catch (err) {
      console.error(err);
      setErrorMessage("Network connection error. Please try again.");
      setAppState("idle");
    }
  };

  // 2. Poll audit status
  const startStatusPolling = (id: string) => {
    if (pollingRef.current) clearInterval(pollingRef.current);

    pollingRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/sitegrade/audit/${id}/status`);
        if (!res.ok) return;

        const data = await res.json();
        setRawPhase(data.phase);
        setStatusPhase(getPhaseMessage(data.phase));

        // If objective complete, show teaser result early
        if (["objective_complete", "complete"].includes(data.status) && data.teaser) {
          setTeaserData(data.teaser);
          setAppState("teaser");
          
          // If completely finished, clear polling
          if (data.status === "complete") {
            if (pollingRef.current) clearInterval(pollingRef.current);
          }
        } else if (data.status === "failed") {
          setErrorMessage("Website audit engine encountered an error parsing this site.");
          setAppState("idle");
          if (pollingRef.current) clearInterval(pollingRef.current);
        }
      } catch (err) {
        console.error("Status polling error:", err);
      }
    }, 3000);
  };

  // Clean up polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, []);

  // 3. Submit email to unlock full PDF
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!emailInput.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmittingEmail(true);
    setAppState("capturing");

    try {
      const res = await fetch("/api/sitegrade/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audit_id: auditId,
          email: emailInput
        })
      });

      if (!res.ok) {
        const data = await res.json();
        setErrorMessage(data.error || "Failed to generate report.");
        setIsSubmittingEmail(false);
        setAppState("teaser");
        return;
      }

      const data = await res.json();
      setDownloadUrl(data.pdf_url);
      setAppState("delivered");

      // Auto download in browser
      window.location.href = data.pdf_url;

    } catch (err) {
      console.error(err);
      setErrorMessage("Failed to deliver report. Please check your credentials.");
      setIsSubmittingEmail(false);
      setAppState("teaser");
    }
  };

  // Helper to map grade to specific saturated neon text colors
  const getGradeColorClass = (grade: string) => {
    const letter = grade.charAt(0).toUpperCase();
    if (letter === "A") return "text-[#00FF00]";   // Neon Green
    if (letter === "B") return "text-[#FFFF00]";   // Neon Yellow
    if (letter === "C") return "text-[#FF6600]";   // Neon Orange
    return "text-[#FF003C]";                      // Neon Red
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full py-2 md:py-4 min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-10rem)] flex flex-col justify-between overflow-hidden">
      <div className="space-y-4 md:space-y-6">
        
        {/* Cyberpunk Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-2.5 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">SITEGRADE_OS</span>
              <span className="text-white/20 font-mono text-[10px]">|</span>
              <span className="font-mono text-[10px] text-neon-cyan uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                DIAGNOSTIC: Active
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-1.5">
              <GlitchText text="SITEGRADE DIAGNOSTIC" />
            </h1>
          </div>
        </div>

        {/* Audit Form & Result States */}
        <div className="max-w-2xl mx-auto w-full pt-4">
          
          {/* IDLE STATE */}
          {appState === "idle" && (
            <HoloCard className="p-6 md:p-8 space-y-6">
              <div className="space-y-2 text-left">
                <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase">
                  What&apos;s your site actually scoring?
                </h2>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans">
                  Enter your URL below to run an instant technical, SEO, accessibility, and copywriting grade card audit.
                </p>
              </div>

              <form onSubmit={handleUrlSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 items-stretch">
                  <input
                    type="text"
                    className="flex-1 bg-surface-dark border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/35"
                    placeholder="Enter target URL (e.g. yoursite.com)..."
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                  />
                  <NeonButton
                    type="submit"
                    variant="primary"
                    className="text-xs"
                  >
                    Grade My Site
                  </NeonButton>
                </div>
                <div className="text-[10px] font-mono text-text-muted">
                  * DIAGNOSTIC RUNTIME: ~30 SECONDS. NO AUTHORIZATION CREDENTIALS REQUIRED.
                </div>
              </form>

              {errorMessage && (
                <div className="border border-neon-red/30 bg-neon-red/5 p-3 text-xs text-neon-red font-mono flex items-center gap-2">
                  <span>[ ERROR ]</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Category chips */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                <span className="font-mono text-[10px] text-text-muted border border-white/10 px-2 py-1 bg-white/5 uppercase tracking-wider">Performance</span>
                <span className="font-mono text-[10px] text-text-muted border border-white/10 px-2 py-1 bg-white/5 uppercase tracking-wider">Accessibility</span>
                <span className="font-mono text-[10px] text-text-muted border border-white/10 px-2 py-1 bg-white/5 uppercase tracking-wider">Technical SEO</span>
                <span className="font-mono text-[10px] text-text-muted border border-white/10 px-2 py-1 bg-white/5 uppercase tracking-wider">Structured Data</span>
              </div>
            </HoloCard>
          )}

          {/* LOADING STATE */}
          {appState === "loading" && (
            <HoloCard className="p-8 text-center space-y-6">
              {/* HUD / Status progress readout */}
              <div className="space-y-6 max-w-md mx-auto text-left font-mono">
                <div>
                  <div className="flex justify-between text-xs text-text-muted mb-2">
                    <span>[ AUDIT_SYNC ]</span>
                    <span>{auditProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-surface-overlay/50 relative overflow-hidden border border-white/10">
                    {/* Background Grid/Tick marks */}
                    <div className="absolute inset-0 w-full h-full bg-[linear-gradient(90deg,transparent_2px,rgba(0,0,0,1)_2px)] bg-[size:4px_100%] opacity-20 z-10" />
                    <div 
                      className="h-full bg-neon-cyan relative shadow-[0_0_10px_var(--neon-cyan)] transition-all duration-300" 
                      style={{ width: `${auditProgress}%`, backgroundColor: "var(--neon-cyan)" }} 
                    />
                  </div>
                </div>

                <div className="space-y-2 border-t border-white/5 pt-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">TASK_STATUS:</span>
                    <span className="text-neon-cyan animate-pulse">EXECUTING</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">DIAGNOSTIC_PHASE:</span>
                    <span className="text-white uppercase">{statusPhase}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-muted">SYSTEM_TARGET:</span>
                    <span className="text-white uppercase">{auditDomain}</span>
                  </div>
                </div>
              </div>
              
              <p className="text-xs text-text-muted max-w-sm mx-auto font-sans leading-relaxed pt-2">
                Fetching network layers, assessing accessibility tags, and compiling metrics. Please stand by.
              </p>
            </HoloCard>
          )}

          {/* TEASER & CAPTURING STATE */}
          {(appState === "teaser" || appState === "capturing") && teaserData && (
            <HoloCard className="p-6 md:p-8 space-y-6">
              <div className="text-center space-y-4">
                <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                  AUDIT TARGET: {auditDomain.toUpperCase()}
                </div>
                
                {/* Monospace Bracketed Grade Reveal */}
                <div className="flex flex-col items-center justify-center space-y-1">
                  <div className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    OVERALL DIAGNOSTIC RATING
                  </div>
                  <div className="text-4xl md:text-5xl font-bold tracking-tighter font-mono py-2">
                    <span className="text-white/30">[ </span>
                    <span className={getGradeColorClass(teaserData.grade)}>GRADE: {teaserData.grade}</span>
                    <span className="text-white/30"> ]</span>
                  </div>
                </div>
              </div>

              {/* Cyberpunk Category breakdown block */}
              <div className="border border-white/10 bg-surface-dark p-4 flex justify-between items-center font-mono">
                <div>
                  <h3 className="text-xs text-neon-cyan uppercase tracking-wider font-bold">
                    // {teaserData.headline_category.toUpperCase()}_SCORE
                  </h3>
                  <p className="text-[10px] text-text-muted mt-1 leading-normal font-sans">
                    Initial automated speed metrics readout.
                  </p>
                </div>
                <div className="text-2xl font-bold text-white tracking-tight">
                  {teaserData.headline_score}/100
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-text-muted font-sans max-w-md mx-auto leading-relaxed border-t border-b border-white/5 py-4">
                  🔍 This is a partial teaser. Your full report covers 7 categories, including structured data, local readiness, and AI-assisted copywriting recommendations.
                </p>
              </div>

              {/* Email gate form */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-[10px] font-mono text-neon-cyan uppercase tracking-wider block">
                    [ ENTER COMMUNICATIONS ROUTING EMAIL ]
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-surface-dark border border-white/10 p-3 font-mono text-sm focus:border-neon-cyan focus:outline-none focus:bg-neon-cyan/5 transition-colors text-white placeholder-white/35"
                    placeholder="you@yourbusiness.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={isSubmittingEmail}
                    required
                  />
                </div>

                <div className="flex">
                  <NeonButton
                    type="submit"
                    className="w-full text-xs"
                    disabled={isSubmittingEmail}
                    variant="primary"
                  >
                    {isSubmittingEmail ? "Generating Report..." : "Send My Full Report"}
                  </NeonButton>
                </div>
              </form>

              {errorMessage && (
                <div className="border border-neon-red/30 bg-neon-red/5 p-3 text-xs text-neon-red font-mono flex items-center gap-2">
                  <span>[ ERROR ]</span>
                  <span>{errorMessage}</span>
                </div>
              )}
            </HoloCard>
          )}

          {/* DELIVERED / SUCCESS STATE */}
          {appState === "delivered" && (
            <HoloCard className="p-8 text-center space-y-6">
              <div className="text-4xl md:text-5xl mb-2">📬</div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tight text-white uppercase">
                  Report Delivered!
                </h2>
                <p className="text-xs md:text-sm text-text-muted leading-relaxed font-sans max-w-sm mx-auto">
                  Your comprehensive PDF report has been generated and sent to <span className="text-white font-mono">{emailInput}</span>.
                </p>
              </div>

              <div className="flex pt-2">
                <a href={downloadUrl} className="w-full">
                  <NeonButton variant="primary" className="w-full text-xs">
                    Download PDF Report
                  </NeonButton>
                </a>
              </div>

              <div className="pt-6 border-t border-white/5">
                <NeonButton
                  onClick={() => {
                    setAppState("idle");
                    setUrlInput("");
                    setEmailInput("");
                    setTeaserData(null);
                    setAuditId("");
                    setIsSubmittingEmail(false);
                  }}
                  variant="secondary"
                  className="text-xs"
                >
                  Audit Another Site
                </NeonButton>
              </div>
            </HoloCard>
          )}

        </div>
      </div>

      {/* Cyberpunk Persistent Footer */}
      <footer className="pt-8 border-t border-white/10 text-center mt-12">
        <p className="font-mono text-[10px] text-text-muted">
          SITEGRADE // LEAD_GEN_NODE // POWERED_BY <a href="https://macallanbutler.com" className="text-neon-cyan hover:underline">MACALLANBUTLER.COM</a>
        </p>
      </footer>
    </div>
  );
}
