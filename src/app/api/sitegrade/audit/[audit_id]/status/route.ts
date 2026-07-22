import { NextRequest, NextResponse } from "next/server";

const AUDIT_ENGINE_URL = process.env.AUDIT_ENGINE_INTERNAL_URL || "http://127.0.0.1:8000";
const SHARED_SECRET = process.env.AUDIT_ENGINE_SHARED_SECRET || "sitegrade_secret_dev_key";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ audit_id: string }> }
) {
  try {
    const { audit_id } = await params;
    
    if (!audit_id) {
      return NextResponse.json(
        { error: "Audit ID is required." },
        { status: 400 }
      );
    }

    // Call Python Audit Engine
    const engineRes = await fetch(`${AUDIT_ENGINE_URL}/internal/audit/${audit_id}`, {
      method: "GET",
      headers: {
        "X-Sitegrade-Secret": SHARED_SECRET
      }
    });

    if (!engineRes.ok) {
      if (engineRes.status === 404) {
        return NextResponse.json(
          { error: "Audit not found." },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: "Audit engine service returned an error." },
        { status: 502 }
      );
    }

    const audit = await engineRes.json();
    
    // Check if the teaser can be returned (populated once objective_complete or complete)
    const isTeaserReady = ["objective_complete", "complete"].includes(audit.status);
    
    let teaser = null;
    if (isTeaserReady) {
      teaser = audit.teaser;
      if (typeof teaser === "string") {
        try {
          teaser = JSON.parse(teaser);
        } catch {
          teaser = null;
        }
      }
    }

    return NextResponse.json({
      status: audit.status,
      phase: audit.phase,
      teaser: teaser
    }, { status: 200 });

  } catch (error: any) {
    console.error("API status query Error:", error);
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
