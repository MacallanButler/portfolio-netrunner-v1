import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const SHARED_SECRET = process.env.AUDIT_ENGINE_SHARED_SECRET || "sitegrade_secret_dev_key";

function verifySignedToken(auditId: string, token: string): boolean {
  try {
    const [timestampStr, signature] = token.split(":");
    const timestamp = parseInt(timestampStr, 10);
    
    // Check if token is older than 1 hour (3600000 ms)
    const now = Date.now();
    if (now - timestamp > 3600000 || now - timestamp < -60000) {
      console.warn(`⚠️ Download signature expired: diff is ${now - timestamp}ms`);
      return false;
    }
    
    const data = `${auditId}:${timestamp}`;
    const hmac = crypto.createHmac("sha256", SHARED_SECRET);
    hmac.update(data);
    const expectedSignature = hmac.digest("hex");
    
    return signature === expectedSignature;
  } catch {
    return false;
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const auditId = searchParams.get("id");
    const token = searchParams.get("token");

    if (!auditId || !token) {
      return new NextResponse("Missing download parameters.", { status: 400 });
    }

    // 1. Verify token signature
    const isValid = verifySignedToken(auditId, token);
    if (!isValid) {
      return new NextResponse("Invalid or expired download link.", { status: 403 });
    }

    // 2. Locate the cached PDF report file
    const cacheDir = path.join(process.cwd(), "reports_cache");
    const cachedFilePath = path.join(cacheDir, `${auditId}.pdf`);

    if (!fs.existsSync(cachedFilePath)) {
      return new NextResponse("The requested report file was not found or has been purged.", { status: 404 });
    }

    // Read the PDF buffer
    const pdfBuffer = fs.readFileSync(cachedFilePath);

    // Formulate a beautiful download filename
    const filename = `sitegrade-report-${auditId.slice(0, 8)}.pdf`;

    // 3. Return as attachment stream response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": pdfBuffer.length.toString()
      }
    });

  } catch (error: any) {
    console.error("API /api/sitegrade/download Error:", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
