import puppeteer from "puppeteer-core";
import fs from "fs";

// Helper to locate Chrome on Windows
function getChromeExecutablePath(): string {
  const commonPaths = [
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
    process.env.CHROME_PATH || ""
  ];

  for (const p of commonPaths) {
    if (p && fs.existsSync(p)) {
      console.log(`✅ Puppeteer: Using system Google Chrome at ${p}`);
      return p;
    }
  }

  console.log("⚠️ Puppeteer: No Google Chrome found at standard paths. Attempting default launch.");
  return "";
}

export async function generateAuditPdf(audit: any): Promise<Buffer> {
  const executablePath = getChromeExecutablePath();
  
  const browser = await puppeteer.launch({
    executablePath: executablePath || undefined,
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage"
    ]
  });

  const page = await browser.newPage();

  // Sort findings: high severity first, then medium, then low, then info
  const severityOrder: Record<string, number> = { high: 0, medium: 1, low: 2, info: 3 };
  const sortedFindings = [...(audit.findings || [])].sort((a: any, b: any) => {
    const aOrder = severityOrder[a.severity.toLowerCase()] ?? 99;
    const bOrder = severityOrder[b.severity.toLowerCase()] ?? 99;
    return aOrder - bOrder;
  });

  // Split categories into objective and qualitative
  const objCatNames = [
    "Performance", "Accessibility", "Technical SEO", 
    "Mobile Experience", "Technical Foundation", 
    "Structured Data", "Local Business Readiness"
  ];
  
  const objCategories = (audit.categories || []).filter((c: any) => objCatNames.includes(c.name));
  const qualCategories = (audit.categories || []).filter((c: any) => !objCatNames.includes(c.name));

  // Helper description glossary mappings
  const glossaryDescriptions: Record<string, string> = {
    "Performance": "Measures website responsiveness and loading speeds under optimal conditions. Crucial for user retention and search ranks.",
    "Accessibility": "Evaluates HTML compliance (image alts, form labels, ARIA landmarks) assisting keyboard and screen reader accessibility.",
    "Technical SEO": "Inspects indexability, sitemap listings, robots directives, title meta structures, and page heading hierarchies.",
    "Mobile Experience": "Assesses responsive viewport layouts and mobile strategy parameters.",
    "Technical Foundation": "Audits SSL protocol redirects, encryption certificate expiry, compression, and security header configurations.",
    "Structured Data": "Validates schema.org entity metadata (JSON-LD, microdata) and semantic tag structures.",
    "Local Business Readiness": "Checks name, phone, physical location, reviews schema indicators, and maps embeds for local business visibility."
  };

  const formattedDate = new Date(audit.created_at || Date.now()).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

  // Neubrutalist CSS & HTML Template
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>SiteGrade Audit Report - ${audit.domain}</title>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800;900&family=Share+Tech+Mono&display=swap');
        
        :root {
          --bg-color: #F5F1E8;
          --text-color: #111111;
          --border-color: #111111;
          
          --grade-a: #2ecc71;
          --grade-b: #f1c40f;
          --grade-c: #e67e22;
          --grade-d-f: #e74c3c;
          
          --sev-high: #e74c3c;
          --sev-medium: #e67e22;
          --sev-low: #f1c40f;
          --sev-info: #3498db;
        }

        body {
          background-color: var(--bg-color);
          color: var(--text-color);
          font-family: 'Outfit', sans-serif;
          line-height: 1.4;
          padding: 30px;
          margin: 0;
        }

        .container {
          max-width: 800px;
          margin: 0 auto;
        }

        /* Neubrutalist cards */
        .card {
          background-color: #FFFFFF;
          border: 3px solid var(--border-color);
          border-radius: 0;
          box-shadow: 6px 6px 0px 0px var(--border-color);
          padding: 20px;
          margin-bottom: 25px;
          page-break-inside: avoid;
        }

        .card-title {
          font-size: 1.4rem;
          font-weight: 900;
          text-transform: uppercase;
          border-bottom: 3px solid var(--border-color);
          padding-bottom: 8px;
          margin-bottom: 15px;
          margin-top: 0;
        }

        h1, h2, h3, h4 {
          font-weight: 900;
          text-transform: uppercase;
          margin-top: 0;
        }

        .mono {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.9rem;
          text-transform: uppercase;
        }

        /* Cover Page */
        .cover {
          text-align: center;
          padding: 40px 20px;
          margin-bottom: 30px;
        }

        .cover h1 {
          font-size: 3rem;
          margin-bottom: 5px;
          letter-spacing: -0.03em;
        }

        .cover-domain {
          font-size: 1.5rem;
          font-weight: 800;
          border: 3px solid var(--border-color);
          background-color: #FFFFFF;
          display: inline-block;
          padding: 8px 20px;
          margin: 15px 0;
          box-shadow: 4px 4px 0px 0px var(--border-color);
        }

        .cover-meta {
          margin-top: 10px;
          color: #555;
        }

        /* Giant Grade */
        .giant-grade {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 7rem;
          font-weight: 900;
          width: 10rem;
          height: 10rem;
          border: 4px solid var(--border-color);
          box-shadow: 6px 6px 0px 0px var(--border-color);
          margin: 20px auto;
          text-shadow: 2px 2px 0 var(--border-color);
        }

        .grade-a { background-color: var(--grade-a); }
        .grade-b { background-color: var(--grade-b); }
        .grade-c { background-color: var(--grade-c); }
        .grade-d-f { background-color: var(--grade-d-f); }

        /* Objective/Qualitative category grids */
        .grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 15px;
        }

        .grid-item {
          border: 3px solid var(--border-color);
          background-color: #FFFFFF;
          padding: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          page-break-inside: avoid;
        }

        .grid-item-meta {
          flex: 1;
        }

        .grid-item-name {
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
        }

        .grid-item-desc {
          font-size: 0.8rem;
          color: #555;
          margin-top: 3px;
        }

        .small-grade {
          width: 2.8rem;
          height: 2.8rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 1.4rem;
          border: 2px solid var(--border-color);
          box-shadow: 2px 2px 0 var(--border-color);
          margin-left: 10px;
          flex-shrink: 0;
        }

        /* Qualitative Block styling */
        .qual-card {
          background-color: #FAF6ED;
          border-style: double;
          border-width: 6px;
        }

        /* Findings */
        .finding-item {
          border-bottom: 2px solid var(--border-color);
          padding: 15px 0;
          page-break-inside: avoid;
        }

        .finding-item:last-child {
          border-bottom: none;
        }

        .finding-header {
          display: flex;
          align-items: center;
          margin-bottom: 5px;
        }

        .severity-badge {
          font-family: 'Share Tech Mono', monospace;
          font-weight: 900;
          font-size: 0.75rem;
          padding: 2px 6px;
          border: 2px solid var(--border-color);
          text-transform: uppercase;
          margin-right: 10px;
          color: #FFFFFF;
          text-shadow: 1px 1px 0 var(--border-color);
        }

        .badge-high { background-color: var(--sev-high); }
        .badge-medium { background-color: var(--sev-medium); }
        .badge-low { background-color: var(--sev-low); }
        .badge-info { background-color: var(--sev-info); }

        .finding-title {
          font-weight: 800;
          font-size: 1.1rem;
          text-transform: uppercase;
        }

        .finding-evidence {
          font-size: 0.85rem;
          background-color: #EEEAE1;
          padding: 8px;
          border-left: 3px solid var(--border-color);
          margin: 6px 0;
          font-family: 'Share Tech Mono', monospace;
        }

        .finding-rec {
          font-size: 0.9rem;
          margin-top: 5px;
        }

        /* Glossary */
        .glossary-item {
          margin-bottom: 12px;
          font-size: 0.85rem;
        }

        .glossary-name {
          font-weight: 800;
          text-transform: uppercase;
        }

        /* Footer */
        .footer {
          text-align: center;
          font-size: 0.8rem;
          margin-top: 40px;
          border-top: 3px solid var(--border-color);
          padding-top: 15px;
        }

        .page-break {
          page-break-before: always;
        }
      </style>
    </head>
    <body>
      <div class="container">
        
        <!-- COVER PAGE -->
        <div class="card cover">
          <div class="mono" style="margin-bottom: 10px; font-weight: 800;">SiteGrade Website Audit</div>
          <h1>SITEGRADE REPORT</h1>
          <div class="cover-domain">${audit.domain.toUpperCase()}</div>
          
          <div>
            <div class="giant-grade ${
              audit.overall_grade.startsWith("A") ? "grade-a" : 
              audit.overall_grade.startsWith("B") ? "grade-b" : 
              audit.overall_grade.startsWith("C") ? "grade-c" : "grade-d-f"
            }">
              ${audit.overall_grade}
            </div>
          </div>
          
          <div class="cover-meta">
            <span class="mono">Date: ${formattedDate}</span><br/>
            <span class="mono">Audit ID: ${audit.audit_id}</span>
          </div>
        </div>
        
        <!-- OBJECTIVE SCORE BREAKDOWN -->
        <div class="card">
          <h2 class="card-title">Objective Score Breakdown</h2>
          <p style="margin-bottom: 15px; font-size: 0.95rem;">
            These criteria evaluate hard technical standards verified via automated requests and performance testing. Objective score: <strong>${audit.objective_subtotal}/100</strong>.
          </p>
          
          <div class="grid">
            ${objCategories.map((c: any) => {
              const letter = c.grade;
              const gradeClass = letter.startsWith("A") ? "grade-a" : letter.startsWith("B") ? "grade-b" : letter.startsWith("C") ? "grade-c" : "grade-d-f";
              const desc = glossaryDescriptions[c.name] || "";
              return `
                <div class="grid-item">
                  <div class="grid-item-meta">
                    <div class="grid-item-name">${c.name}</div>
                    <div class="grid-item-desc">${desc}</div>
                  </div>
                  <div class="small-grade ${gradeClass}">${c.score}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <div class="page-break"></div>

        <!-- QUALITATIVE ASSESSMENT (AI ASSISTED) -->
        <div class="card qual-card">
          <h2 class="card-title" style="border-bottom-style: double;">Qualitative Assessment — AI-Assisted</h2>
          <p style="margin-bottom: 15px; font-size: 0.95rem;">
            Qualitative markers are analyzed by Gemini 2.5 Flash evaluating brand trust, copywriting clarity, design hierarchy, and conversion paths. Qualitative score: <strong>${audit.qualitative_subtotal}/100</strong>.
          </p>
          
          <div class="grid">
            ${qualCategories.map((c: any) => {
              const letter = c.grade;
              const gradeClass = letter.startsWith("A") ? "grade-a" : letter.startsWith("B") ? "grade-b" : letter.startsWith("C") ? "grade-c" : "grade-d-f";
              return `
                <div class="grid-item">
                  <div class="grid-item-meta">
                    <div class="grid-item-name">${c.name}</div>
                    <div class="grid-item-desc">Consultative evaluation of content clarity and conversion.</div>
                  </div>
                  <div class="small-grade ${gradeClass}">${c.score}</div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- FINDINGS & FIXES LIST -->
        <div class="card">
          <h2 class="card-title">Identified Findings & Recommended Fixes</h2>
          ${sortedFindings.length === 0 ? `
            <p>No major issues were identified. Excellent job!</p>
          ` : sortedFindings.map((f: any) => {
            const isQual = !objCatNames.includes(f.category_name);
            const badgeClass = 
              f.severity.toLowerCase() === "high" ? "badge-high" : 
              f.severity.toLowerCase() === "medium" ? "badge-medium" : 
              f.severity.toLowerCase() === "low" ? "badge-low" : "badge-info";
            return `
              <div class="finding-item">
                <div class="finding-header">
                  <span class="severity-badge ${badgeClass}">${f.severity}</span>
                  <span class="finding-title">${f.category_name}: ${f.title}</span>
                </div>
                ${f.evidence ? `<div class="finding-evidence">${f.evidence}</div>` : ""}
                <div class="finding-rec">
                  <strong>Fix:</strong> ${isQual ? "Review site copywriting or branding structure in light of this insight." : f.recommendation}
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- GLOSSARY SECTION -->
        <div class="card">
          <h2 class="card-title">How to Read This Report</h2>
          <div class="glossary-item">
            <span class="glossary-name">Performance</span> — ${glossaryDescriptions["Performance"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Accessibility</span> — ${glossaryDescriptions["Accessibility"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Technical SEO</span> — ${glossaryDescriptions["Technical SEO"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Mobile Experience</span> — ${glossaryDescriptions["Mobile Experience"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Technical Foundation</span> — ${glossaryDescriptions["Technical Foundation"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Structured Data</span> — ${glossaryDescriptions["Structured Data"]}
          </div>
          <div class="glossary-item">
            <span class="glossary-name">Local Business Readiness</span> — ${glossaryDescriptions["Local Business Readiness"]}
          </div>
          <div style="margin-top: 15px; font-size: 0.85rem; border-top: 1px solid #CCC; padding-top: 10px;">
            <strong>Letter Grade Scale:</strong> A (90-100) is excellent, B (80-89) represents good quality with minor fixes, C (70-79) is average, D (60-69) requires attention, F (&lt;60) indicates critical foundation risks.
          </div>
        </div>

        <!-- FOOTER -->
        <div class="footer">
          <p class="mono">SiteGrade is powered by Macallan Butler — macallanbutler.com</p>
          <p style="margin-top: 5px; color: #666; font-size: 0.75rem;">© ${new Date().getFullYear()} Macallan Butler. All rights reserved.</p>
        </div>

      </div>
    </body>
    </html>
  `;

  await page.setContent(htmlContent, { waitUntil: "networkidle0" as any });
  
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      bottom: "20mm",
      left: "15mm",
      right: "15mm"
    }
  });

  await browser.close();
  return Buffer.from(pdfBuffer);
}
