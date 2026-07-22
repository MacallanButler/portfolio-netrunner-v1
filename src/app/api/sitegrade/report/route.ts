import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "../../../../lib/sitegrade/rate-limiter";
import { generateAuditPdf } from "../../../../lib/sitegrade/pdf-generator";
import { sendReportEmail } from "../../../../lib/sitegrade/email-sender";
import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const AUDIT_ENGINE_URL = process.env.AUDIT_ENGINE_INTERNAL_URL || "http://127.0.0.1:8000";
const SHARED_SECRET = process.env.AUDIT_ENGINE_SHARED_SECRET || "sitegrade_secret_dev_key";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const DISCORD_INTERNAL_CHANNEL_ID = process.env.DISCORD_INTERNAL_CHANNEL_ID || "";
const DISCORD_LEADS_WEBHOOK = process.env.DISCORD_LEADS_WEBHOOK_URL || "";

// Signed URL helper
function generateSignedToken(auditId: string): string {
  const timestamp = Date.now();
  const data = `${auditId}:${timestamp}`;
  const hmac = crypto.createHmac("sha256", SHARED_SECRET);
  hmac.update(data);
  const signature = hmac.digest("hex");
  return `${timestamp}:${signature}`;
}

async function sendDiscordPing(email: string, domain: string, grade: string) {
  const message = `👤 **New SiteGrade lead**: \`${email}\` — \`${domain}\` — Grade: **${grade}**`;
  
  if (DISCORD_BOT_TOKEN && DISCORD_INTERNAL_CHANNEL_ID) {
    try {
      await fetch(`https://discord.com/api/v10/channels/${DISCORD_INTERNAL_CHANNEL_ID}/messages`, {
        method: "POST",
        headers: {
          "Authorization": `Bot ${DISCORD_BOT_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ content: message })
      });
      console.log("✅ Discord: Sent lead notice via Bot API.");
      return;
    } catch (e) {
      console.error("⚠️ Discord: Failed to send via Bot API, trying webhook fallback...", e);
    }
  }

  if (DISCORD_LEADS_WEBHOOK) {
    try {
      await fetch(DISCORD_LEADS_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: message })
      });
      console.log("✅ Discord: Sent lead notice via Webhook.");
    } catch (e) {
      console.error("❌ Discord: Webhook failed:", e);
    }
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { audit_id, email } = body;

    // 1. Basic validation
    if (!audit_id || !email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Audit ID and email address are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    // 2. Rate limit email (3 per day)
    const windowMs = 24 * 60 * 60 * 1000; // 24 hours
    if (isRateLimited(`report_email_${email}`, 3, windowMs)) {
      return NextResponse.json(
        { error: "Limit reached. You can request up to 3 reports per day." },
        { status: 429 }
      );
    }

    // 3. Poll / wait for audit to complete
    let auditData: any = null;
    let attempts = 0;
    const maxAttempts = 15; // Max 15 attempts * 1.5s = 22.5 seconds max wait
    
    while (attempts < maxAttempts) {
      const engineRes = await fetch(`${AUDIT_ENGINE_URL}/internal/audit/${audit_id}`, {
        method: "GET",
        headers: { "X-Sitegrade-Secret": SHARED_SECRET }
      });

      if (!engineRes.ok) {
        return NextResponse.json(
          { error: "Failed to retrieve audit details from engine." },
          { status: 502 }
        );
      }

      auditData = await engineRes.json();
      
      if (auditData.status === "complete") {
        break;
      }
      
      if (auditData.status === "failed") {
        return NextResponse.json(
          { error: "Website audit failed. Cannot generate report." },
          { status: 422 }
        );
      }

      // Wait 1.5 seconds before polling again
      await new Promise(r => setTimeout(r, 1500));
      attempts++;
    }

    if (auditData.status !== "complete") {
      return NextResponse.json(
        { error: "Audit evaluation is taking longer than expected. Please retry in a few moments." },
        { status: 202 }
      );
    }

    // 4. Record lead in DB (Supabase or SQLite/JSON fallback)
    const domain = auditData.domain;
    let leadSaved = false;

    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
        const { error } = await supabase.from("leads").insert({
          email,
          domain,
          audit_id,
          source: "sitegrade_public"
        });
        if (!error) {
          leadSaved = true;
          console.log(`✅ Leads: Saved lead in Supabase for ${email}`);
        } else {
          console.error("❌ Leads: Supabase error saving lead:", error);
        }
      } catch (e) {
        console.error("❌ Leads: Supabase exception saving lead:", e);
      }
    }

    if (!leadSaved) {
      // JSON File Fallback
      try {
        const leadsPath = path.join(process.cwd(), "leads.json");
        const leadsData = fs.existsSync(leadsPath) ? JSON.parse(fs.readFileSync(leadsPath, "utf-8")) : [];
        leadsData.push({
          id: crypto.randomUUID(),
          email,
          domain,
          audit_id,
          source: "sitegrade_public",
          created_at: new Date().toISOString()
        });
        fs.writeFileSync(leadsPath, JSON.stringify(leadsData, null, 2), "utf-8");
        console.log(`✅ Leads: Saved lead to local JSON file for ${email}`);
      } catch (e) {
        console.error("❌ Leads: Failed to save fallback lead:", e);
      }
    }

    // 5. Generate PDF
    console.log(`PDF: Generating report PDF for ${domain}...`);
    const pdfBuffer = await generateAuditPdf(auditData);
    
    // Save PDF in a local cache directory for downloading
    const cacheDir = path.join(process.cwd(), "reports_cache");
    if (!fs.existsSync(cacheDir)) {
      fs.mkdirSync(cacheDir, { recursive: true });
    }
    const cleanDomain = domain.replace(/[^a-zA-Z0-9.-]/g, "_");
    const dateStr = new Date().toISOString().split("T")[0];
    const pdfFilename = `sitegrade-${cleanDomain}-${dateStr}.pdf`;
    const cachedFilePath = path.join(cacheDir, `${audit_id}.pdf`);
    
    fs.writeFileSync(cachedFilePath, pdfBuffer);
    console.log(`✅ PDF: Saved PDF report cache to ${cachedFilePath}`);

    // 6. Send Email (attachment)
    await sendReportEmail(email, domain, pdfBuffer, pdfFilename);

    // 7. Send Discord lead notification
    await sendDiscordPing(email, domain, auditData.overall_grade);

    // 8. Return signed download URL
    const signedToken = generateSignedToken(audit_id);
    const pdfUrl = `/api/sitegrade/download?id=${audit_id}&token=${signedToken}`;
    
    return NextResponse.json({ pdf_url: pdfUrl }, { status: 200 });

  } catch (error: any) {
    console.error("API /api/sitegrade/report Error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
