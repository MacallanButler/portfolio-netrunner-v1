'use client';

import React, { useState, useEffect, useRef } from "react";
import styles from "./sitegrade.module.css";

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
  const [statusPhase, setStatusPhase] = useState("Initializing audit...");
  const [teaserData, setTeaserData] = useState<TeaserData | null>(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);

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

  // Helper to map grade to CSS Module class name
  const getGradeClass = (grade: string) => {
    const letter = grade.charAt(0).toUpperCase();
    if (letter === "A") return styles.gradeStampA;
    if (letter === "B") return styles.gradeStampB;
    if (letter === "C") return styles.gradeStampC;
    return styles.gradeStampDF;
  };

  return (
    <div className={styles.wrapper}>
      {/* Main Container */}
      <main style={{ flex: 1, padding: "40px 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: "700px" }}>
          
          {/* Logo Branding */}
          <div className={styles.monoText} style={{ textAlign: "center", marginBottom: "25px", fontWeight: "900", letterSpacing: "1px" }}>
            [ SITEGRADE — AUDIT FUNNEL ]
          </div>

          {/* IDLE STATE (Hero) */}
          {appState === "idle" && (
            <div className={styles.nbBlock} style={{ padding: "40px 30px" }}>
              <h1 style={{ fontSize: "2.5rem", lineHeight: "1.1", marginBottom: "15px" }}>
                What's your site actually scoring?
              </h1>
              <p style={{ fontSize: "1.1rem", marginBottom: "30px", fontWeight: "600", color: "var(--text-muted)" }}>
                Enter your URL below to run an instant technical, SEO, accessibility, and copywriting grade card audit.
              </p>

              <form onSubmit={handleUrlSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
                  <div style={{ display: "flex", width: "100%", gap: "0", flexWrap: "wrap", alignItems: "stretch" }}>
                    <input
                      type="text"
                      className={styles.nbInput}
                      placeholder="yoursite.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      style={{ flex: "1 1 60%", minWidth: "250px" }}
                    />
                    <div className={styles.btnGlowWrapper} style={{ flex: "1 1 40%" }}>
                      <div className={styles.btnGlowOffset} />
                      <button
                        type="submit"
                        className={styles.nbBtnGlow}
                        style={{ width: "100%", height: "100%" }}
                      >
                        Grade My Site
                      </button>
                    </div>
                  </div>
                  <span style={{ fontSize: "0.85rem", marginTop: "10px", fontWeight: "600", color: "var(--text-muted)" }}>
                    Takes about 30 seconds. No signup required to see your grade.
                  </span>
                </div>
              </form>

              {errorMessage && (
                <div className={styles.errorBlock}>
                  ⚠️ ERROR: {errorMessage}
                </div>
              )}

              {/* Pill Trust chips */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "40px" }}>
                <span className={styles.trustChip}>Performance</span>
                <span className={styles.trustChip}>Accessibility</span>
                <span className={styles.trustChip}>Technical SEO</span>
                <span className={styles.trustChip}>Structured Data</span>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {appState === "loading" && (
            <div className={`${styles.nbBlock} ${styles.loadingBorder}`} style={{ padding: "50px 30px", textAlign: "center" }}>
              {/* Neubrutalist Outlined grade box animation with Hard Glow */}
              <div className={styles.gradeStampWrapper}>
                <div className={`${styles.gradeStampOffset} ${styles.loadingBorder}`} />
                <div className={`${styles.gradeStamp} ${styles.loadingBorder}`} style={{ fontSize: "4.5rem", backgroundColor: "#111111", color: "var(--text-color)" }}>
                  ?
                </div>
              </div>
              
              <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>
                AUDITING WEBSITE...
              </h2>
              
              <div className={styles.monoText} style={{ fontWeight: "800", color: "var(--accent-color)" }}>
                {statusPhase}
              </div>
              
              <p style={{ marginTop: "20px", fontSize: "0.9rem", color: "var(--text-muted)" }}>
                Fetching network layers, assessing accessibility tags, and compiling metrics. Please stand by.
              </p>
            </div>
          )}

          {/* TEASER & CAPTURING STATE */}
          {(appState === "teaser" || appState === "capturing") && teaserData && (
            <div className={styles.nbBlock} style={{ padding: "40px 30px" }}>
              <div style={{ textAlign: "center", marginBottom: "30px" }}>
                <div className={styles.monoText} style={{ color: "var(--text-muted)", marginBottom: "5px" }}>
                  AUDITED DOMAIN: {auditDomain.toUpperCase()}
                </div>
                
                {/* Overall Grade Stamp with Hard Glow */}
                <div className={styles.gradeStampWrapper}>
                  <div className={styles.gradeStampOffset} />
                  <div className={`${styles.gradeStamp} ${getGradeClass(teaserData.grade)}`}>
                    {teaserData.grade}
                  </div>
                </div>

                <div className={styles.monoText} style={{ fontSize: "1.2rem", fontWeight: "800", color: "var(--text-color)" }}>
                  OVERALL GRADE
                </div>
              </div>

              {/* Headline category score block */}
              <div className={styles.categoryScoreBlock}>
                <div>
                  <h3 className={styles.categoryScoreTitle}>{teaserData.headline_category} Score</h3>
                  <p className={styles.categoryScoreSub}>Initial automated speed metrics readout.</p>
                </div>
                <div className={styles.categoryScoreValue}>
                  {teaserData.headline_score}/100
                </div>
              </div>

              <p style={{ fontSize: "0.95rem", marginBottom: "25px", fontWeight: "600", textAlign: "center", color: "var(--text-color)" }}>
                🔍 This is a partial teaser. Your full report covers 7 categories, including structured data, local readiness, and AI-assisted copywriting recommendations.
              </p>

              {/* Email gate form */}
              <form onSubmit={handleEmailSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
                  <label htmlFor="email" className={styles.monoText} style={{ fontWeight: "800", color: "var(--text-color)" }}>
                    Get your full report card:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className={styles.nbInput}
                    placeholder="you@yourbusiness.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    disabled={isSubmittingEmail}
                    required
                  />
                </div>

                <div className={styles.btnGlowWrapper}>
                  <div className={styles.btnGlowOffset} />
                  <button
                    type="submit"
                    className={styles.nbBtnGlow}
                    disabled={isSubmittingEmail}
                  >
                    {isSubmittingEmail ? "Generating Report..." : "Send My Full Report"}
                  </button>
                </div>
              </form>

              {errorMessage && (
                <div className={styles.errorBlock}>
                  ⚠️ ERROR: {errorMessage}
                </div>
              )}
            </div>
          )}

          {/* DELIVERED / SUCCESS STATE */}
          {appState === "delivered" && (
            <div className={styles.nbBlock} style={{ padding: "50px 30px", textAlign: "center" }}>
              <div style={{ fontSize: "5rem", marginBottom: "20px" }}>
                📬
              </div>
              <h2 style={{ fontSize: "2rem", marginBottom: "15px" }}>
                REPORT DELIVERED!
              </h2>
              <p style={{ fontSize: "1.1rem", marginBottom: "30px", fontWeight: "600", color: "var(--text-color)" }}>
                Your comprehensive PDF report has been generated.
              </p>

              <div className={styles.btnGlowWrapper} style={{ marginBottom: "15px" }}>
                <div className={styles.btnGlowOffset} />
                <a
                  href={downloadUrl}
                  className={styles.nbBtnGlow}
                  style={{ width: "100%", display: "block" }}
                >
                  Download PDF
                </a>
              </div>

              <span className={styles.monoText} style={{ color: "var(--text-muted)" }}>
                Also sent a copy to {emailInput}.
              </span>
              
              <div style={{ marginTop: "40px" }}>
                <button
                  onClick={() => {
                    setAppState("idle");
                    setUrlInput("");
                    setEmailInput("");
                    setTeaserData(null);
                    setAuditId("");
                    setIsSubmittingEmail(false);
                  }}
                  className={styles.nbBtnSecondary}
                >
                  Audit Another Site
                </button>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Persistent Footer */}
      <footer style={{ padding: "20px", borderTop: "3px solid var(--border-color)", textAlign: "center", backgroundColor: "transparent" }}>
        <p className={styles.monoText} style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
          SiteGrade is a lead generation tool powered by <a href="https://macallanbutler.com" style={{ color: "var(--accent-color)", fontWeight: "800", textDecoration: "none" }}>macallanbutler.com</a>.
        </p>
      </footer>
    </div>
  );
}
