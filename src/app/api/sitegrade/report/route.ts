import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "../../../../lib/sitegrade/rate-limiter";
import { sendReportEmail } from "../../../../lib/sitegrade/email-sender";
import { createClient } from "@supabase/supabase-js";

const AUDIT_ENGINE_URL = process.env.AUDIT_ENGINE_INTERNAL_URL || "http://127.0.0.1:8000";
const SHARED_SECRET = process.env.AUDIT_ENGINE_SHARED_SECRET || "sitegrade_secret_dev_key";

const SUPABASE_URL = process.env.SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";
const DISCORD_INTERNAL_CHANNEL_ID = process.env.DISCORD_INTERNAL_CHANNEL_ID || "";
const DISCORD_LEADS_WEBHOOK = process.env.DISCORD_LEADS_WEBHOOK_URL || "";

async function sendDiscordPing(message: string) {
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
      console.log("✅ Discord: Sent notice via Bot API.");
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
      console.log("✅ Discord: Sent notice via Webhook.");
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

    // 2. Rate limit email (3 per day) - asynchronously
    const windowMs = 24 * 60 * 60 * 1000; // 24 hours
    if (await isRateLimited(`report_email_${email}`, 3, windowMs)) {
      return NextResponse.json(
        { error: "Limit reached. You can request up to 3 reports per day." },
        { status: 429 }
      );
    }

    // 3. Single audit status check from engine (no polling)
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

    const auditData = await engineRes.json();
    
    if (auditData.status === "failed") {
      return NextResponse.json(
        { error: "Website audit failed. Cannot generate report." },
        { status: 422 }
      );
    }

    if (auditData.status !== "complete") {
      return NextResponse.json(
        { error: "Audit evaluation is in progress. Please retry once complete." },
        { status: 202 }
      );
    }

    // 4. Record lead in DB (Supabase only)
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

    // If Supabase insert failed and no local fallback write (as per brief)
    if (!leadSaved) {
      console.warn(`⚠️ Leads: Failed to save lead for ${email} in Supabase. Sending Discord warning alert...`);
      await sendDiscordPing(`⚠️ **SiteGrade Lead Save Failed**: Failed to save lead for \`${email}\` on domain \`${domain}\` to Supabase.`);
    }

    // 5. POST to Python engine report endpoint to generate & store report, obtaining the R2 url
    console.log(`Forwarding report generation request for audit ${audit_id} to Python engine...`);
    const reportRes = await fetch(`${AUDIT_ENGINE_URL}/internal/audit/${audit_id}/report`, {
      method: "POST",
      headers: { 
        "X-Sitegrade-Secret": SHARED_SECRET,
        "Content-Type": "application/json"
      }
    });

    if (!reportRes.ok) {
      const errText = await reportRes.text();
      console.error(`❌ Report: Python engine report route returned error status ${reportRes.status}: ${errText}`);
      return NextResponse.json(
        { error: "Failed to generate report on the audit engine." },
        { status: 502 }
      );
    }

    const { pdf_url } = await reportRes.json();
    if (!pdf_url) {
      return NextResponse.json(
        { error: "Engine did not return a valid download link." },
        { status: 502 }
      );
    }

    // 6. Fetch the generated PDF from the R2 presigned URL to get PDF Buffer
    console.log(`Fetching generated PDF from R2 to email it...`);
    const pdfFetchRes = await fetch(pdf_url);
    if (!pdfFetchRes.ok) {
      console.error(`❌ PDF Fetch: Failed to retrieve PDF from R2 presigned URL: ${pdfFetchRes.status}`);
      // Do not block returning the pdf_url, since the user can still download it, but warn
    } else {
      try {
        const arrayBuffer = await pdfFetchRes.arrayBuffer();
        const pdfBuffer = Buffer.from(arrayBuffer);
        
        // Send email with PDF attachment
        const cleanDomain = domain.replace(/[^a-zA-Z0-9.-]/g, "_");
        const dateStr = new Date().toISOString().split("T")[0];
        const pdfFilename = `sitegrade-${cleanDomain}-${dateStr}.pdf`;
        
        await sendReportEmail(email, domain, pdfBuffer, pdfFilename);
      } catch (emailErr) {
        console.error("❌ Email: Failed to fetch PDF or send email:", emailErr);
      }
    }

    // 7. Send Discord success lead notification
    await sendDiscordPing(`👤 **New SiteGrade lead**: \`${email}\` — \`${domain}\` — Grade: **${auditData.overall_grade}**`);

    // 8. Return direct R2 presigned URL in response
    return NextResponse.json({ pdf_url: pdf_url }, { status: 200 });

  } catch (error: unknown) {
    console.error("API /api/sitegrade/report Error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
