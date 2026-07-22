import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Config loading
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || "smtp";
const EMAIL_API_KEY = process.env.EMAIL_API_KEY || "";
const GMAIL_EMAIL = process.env.GMAIL_EMAIL || "";
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD || "";

export async function sendReportEmail(
  toEmail: string,
  domain: string,
  pdfBuffer: Buffer,
  pdfFilename: string
): Promise<{ success: boolean; message: string }> {
  const subject = `Your SiteGrade Audit Report for ${domain}`;
  const textBody = `Hello,\n\nHere is your requested SiteGrade audit report for ${domain}. You'll find the detailed report card with technical SEO, accessibility, mobile performance, structured data, and AI-assisted qualitative scores in the attached PDF.\n\nBest regards,\nThe SiteGrade Team\nmacallanbutler.com`;

  console.log(`✉️ Email: Attempting to send report to ${toEmail} using provider: ${EMAIL_PROVIDER}...`);

  // Fallback: If no email credentials, write to local folder for debugging
  const isSmtpConfigured = (GMAIL_EMAIL && GMAIL_APP_PASSWORD) || (EMAIL_PROVIDER === "smtp" && process.env.SMTP_HOST);
  const isApiConfigured = EMAIL_API_KEY && (EMAIL_PROVIDER === "resend" || EMAIL_PROVIDER === "sendgrid");

  if (!isSmtpConfigured && !isApiConfigured) {
    const debugDir = path.join(process.cwd(), "debug_emails");
    if (!fs.existsSync(debugDir)) {
      fs.mkdirSync(debugDir, { recursive: true });
    }
    const debugFile = path.join(debugDir, `email-${domain}-${Date.now()}.json`);
    
    const debugPayload = {
      to: toEmail,
      subject,
      body: textBody,
      attachment: {
        filename: pdfFilename,
        size_bytes: pdfBuffer.length
      },
      sent_at: new Date().toISOString(),
      provider: "mock_fallback"
    };

    fs.writeFileSync(debugFile, JSON.stringify(debugPayload, null, 2));
    console.log(`✅ Email: [DEBUG FALLBACK] Config missing. Wrote email layout details to ${debugFile}`);
    return { success: true, message: `Email logged to local mock file: ${debugFile}` };
  }

  // 1. SMTP Provider (defaulting to Gmail credentials if available)
  if (EMAIL_PROVIDER === "smtp" || (GMAIL_EMAIL && GMAIL_APP_PASSWORD)) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: GMAIL_EMAIL,
          pass: GMAIL_APP_PASSWORD
        }
      });

      await transporter.sendMail({
        from: `"SiteGrade Reports" <${GMAIL_EMAIL}>`,
        to: toEmail,
        subject: subject,
        text: textBody,
        attachments: [
          {
            filename: pdfFilename,
            content: pdfBuffer
          }
        ]
      });

      console.log(`✅ Email: Successfully sent email via Gmail SMTP to ${toEmail}`);
      return { success: true, message: "Email sent successfully" };
    } catch (e: any) {
      console.error("❌ Email: Gmail SMTP sending failed:", e);
      return { success: false, message: `SMTP failure: ${e.message}` };
    }
  }

  // 2. Resend API
  if (EMAIL_PROVIDER === "resend") {
    try {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${EMAIL_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "SiteGrade <reports@macallanbutler.com>",
          to: toEmail,
          subject: subject,
          text: textBody,
          attachments: [
            {
              filename: pdfFilename,
              content: pdfBuffer.toString("base64")
            }
          ]
        })
      });

      if (res.ok) {
        console.log(`✅ Email: Sent email via Resend API to ${toEmail}`);
        return { success: true, message: "Email sent successfully" };
      } else {
        const err = await res.text();
        console.error("❌ Email: Resend API failed:", err);
        return { success: false, message: `Resend error: ${err}` };
      }
    } catch (e: any) {
      console.error("❌ Email: Resend connection failed:", e);
      return { success: false, message: e.message };
    }
  }

  // 3. SendGrid API
  if (EMAIL_PROVIDER === "sendgrid") {
    try {
      const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${EMAIL_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          personalizations: [{ to: [{ email: toEmail }] }],
          from: { email: "reports@macallanbutler.com", name: "SiteGrade Reports" },
          subject: subject,
          content: [{ type: "text/plain", value: textBody }],
          attachments: [
            {
              content: pdfBuffer.toString("base64"),
              filename: pdfFilename,
              type: "application/pdf",
              disposition: "attachment"
            }
          ]
        })
      });

      if (res.ok) {
        console.log(`✅ Email: Sent email via SendGrid API to ${toEmail}`);
        return { success: true, message: "Email sent successfully" };
      } else {
        const err = await res.text();
        console.error("❌ Email: SendGrid API failed:", err);
        return { success: false, message: `SendGrid error: ${err}` };
      }
    } catch (e: any) {
      console.error("❌ Email: SendGrid connection failed:", e);
      return { success: false, message: e.message };
    }
  }

  return { success: false, message: "No compatible email provider configured" };
}
