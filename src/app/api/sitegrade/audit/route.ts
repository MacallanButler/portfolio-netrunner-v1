import { NextRequest, NextResponse } from "next/server";
import { isRateLimited } from "../../../../lib/sitegrade/rate-limiter";

const AUDIT_ENGINE_URL = process.env.AUDIT_ENGINE_INTERNAL_URL || "http://127.0.0.1:8000";
const SHARED_SECRET = process.env.AUDIT_ENGINE_SHARED_SECRET || "sitegrade_secret_dev_key";

export async function POST(req: NextRequest) {
  try {
    // 1. IP rate limit check (5 per hour)
    const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
    const windowMs = 60 * 60 * 1000; // 1 hour
    if (isRateLimited(`audit_ip_${ip}`, 5, windowMs)) {
      return NextResponse.json(
        { error: "Too many audit requests from this IP. Please try again in an hour." },
        { status: 429 }
      );
    }

    // 2. Parse body
    const body = await req.json();
    const { url } = body;

    if (!url || typeof url !== "string") {
      return NextResponse.json(
        { error: "Invalid URL provided." },
        { status: 400 }
      );
    }

    // Basic client-side URL validation check
    let normalizedUrl = url.trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = "https://" + normalizedUrl;
    }

    try {
      new URL(normalizedUrl);
    } catch {
      return NextResponse.json(
        { error: "Malformed URL format. Please enter a valid website address." },
        { status: 400 }
      );
    }

    // 3. Request background audit from Python Audit Engine
    console.log(`Forwarding audit request for ${normalizedUrl} to Python Audit Engine...`);
    const engineRes = await fetch(`${AUDIT_ENGINE_URL}/internal/audit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Sitegrade-Secret": SHARED_SECRET
      },
      body: JSON.stringify({ url: normalizedUrl })
    });

    if (!engineRes.ok) {
      const errText = await engineRes.text();
      console.error(`Python Audit Engine returned error status ${engineRes.status}: ${errText}`);
      return NextResponse.json(
        { error: "Audit engine service returned an error. Please try again." },
        { status: 502 }
      );
    }

    const data = await engineRes.json();
    return NextResponse.json(data, { status: 201 });

  } catch (error: any) {
    console.error("API /api/sitegrade/audit Error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
