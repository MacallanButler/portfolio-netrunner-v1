import { Resend } from "resend";

/**
 * Sends the generated SiteGrade audit report PDF to the user's email.
 * Standardized on Resend provider. Fails loudly if misconfigured.
 */
export async function sendReportEmail(
  toEmail: string,
  domain: string,
  pdfBuffer: Buffer,
  pdfFilename: string
): Promise<{ success: boolean; message: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    const errMsg = "❌ Email Error: RESEND_API_KEY is not configured in environment variables.";
    console.error(errMsg);
    return { success: false, message: "Email sending failed: Resend provider is not configured." };
  }

  const subject = `Your SiteGrade Audit Report for ${domain}`;
  const textBody = `Hello,\n\nHere is your requested SiteGrade audit report for ${domain}. You'll find the detailed report card with technical SEO, accessibility, mobile performance, structured data, and AI-assisted qualitative scores in the attached PDF.\n\nWant to review these findings together? Book a free 15-minute diagnostic walkthrough: https://macallanbutler.com/contact?service=sitegrade_fix\n\nBest regards,\nMacallan Butler\nFounder, MCB Systems LLC\nmacallanbutler.com`;

  const htmlBody = `
    <div style="background-color: #0e0e0f; color: #f0f0f0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; padding: 40px 20px; max-width: 600px; margin: 0 auto; border: 1px solid rgba(0, 255, 255, 0.2); border-radius: 4px;">
      <div style="border-bottom: 1px solid rgba(255, 255, 255, 0.1); padding-bottom: 16px; margin-bottom: 24px;">
        <span style="font-family: monospace; font-size: 11px; color: #00FFFF; text-transform: uppercase; letter-spacing: 0.15em;">// MCB SYSTEMS &middot; SITEGRADE DIAGNOSTIC</span>
        <h1 style="color: #ffffff; font-size: 24px; font-weight: 700; margin: 8px 0 0 0; letter-spacing: -0.02em;">Audit Report for ${domain}</h1>
      </div>
      <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;">
        Hello,
      </p>
      <p style="font-size: 14px; line-height: 1.6; color: #a1a1aa; margin-bottom: 20px;">
        Your requested SiteGrade technical audit report for <strong style="color: #ffffff;">${domain}</strong> is attached. Your report includes evaluations across Core Web Vitals, mobile responsiveness, accessibility, technical SEO architecture, and conversion indicators.
      </p>
      <div style="background-color: rgba(0, 255, 255, 0.05); border: 1px solid rgba(0, 255, 255, 0.3); border-radius: 4px; padding: 20px; margin-bottom: 24px;">
        <h2 style="font-size: 14px; color: #00FFFF; font-family: monospace; text-transform: uppercase; margin: 0 0 8px 0; letter-spacing: 0.1em;">Next Step: Diagnostic Walkthrough</h2>
        <p style="font-size: 13px; line-height: 1.5; color: #e4e4e7; margin: 0 0 16px 0;">
          Need help prioritizing and resolving your site's bottlenecks? We offer a free 15-minute diagnostic call to review your report card and outline high-impact quick fixes.
        </p>
        <a href="https://macallanbutler.com/contact?service=sitegrade_fix&domain=${encodeURIComponent(domain)}" style="display: inline-block; background-color: #00FFFF; color: #000000; font-family: monospace; font-weight: 700; font-size: 12px; text-decoration: none; padding: 10px 18px; border-radius: 2px; text-transform: uppercase; letter-spacing: 0.05em;">Schedule Diagnostic Walkthrough &rarr;</a>
      </div>
      <div style="border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 16px; font-size: 12px; color: #71717a; font-family: monospace;">
        <p style="margin: 0 0 4px 0;">MCB Systems LLC &middot; Full-Stack Development &amp; UI Architecture</p>
        <p style="margin: 0;"><a href="https://macallanbutler.com" style="color: #00FFFF; text-decoration: none;">macallanbutler.com</a> &middot; macallan@macallanbutler.com</p>
      </div>
    </div>
  `;

  console.log(`✉️ Email: Attempting to send report to ${toEmail} using Resend...`);

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "MCB Systems <reports@macallanbutler.com>",
      to: toEmail,
      subject: subject,
      text: textBody,
      html: htmlBody,
      attachments: [
        {
          filename: pdfFilename,
          content: pdfBuffer,
        }
      ]
    });

    if (error) {
      console.error("❌ Email: Resend API returned an error:", error);
      return { success: false, message: `Resend API error: ${error.message}` };
    }

    console.log(`✅ Email: Successfully sent email via Resend API to ${toEmail} (ID: ${data?.id})`);
    return { success: true, message: "Email sent successfully" };
  } catch (e: unknown) {
    const errorMsg = e instanceof Error ? e.message : String(e);
    console.error("❌ Email: Resend sending failed with exception:", e);
    return { success: false, message: `Resend exception: ${errorMsg}` };
  }
}

/**
 * Sends an immediate lead alert email to the founder whenever an audit is requested.
 */
export async function sendFounderLeadAlert(
  leadEmail: string,
  domain: string,
  grade: string,
  headlineScore: number,
  pdfUrl?: string
): Promise<{ success: boolean; message: string }> {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FOUNDER_EMAIL = process.env.FOUNDER_ALERT_EMAIL || "macallan@macallanbutler.com";

  if (!RESEND_API_KEY) {
    console.warn("⚠️ Lead Alert: RESEND_API_KEY not set. Skipping founder alert email.");
    return { success: false, message: "Resend API key missing." };
  }

  const subject = `🚨 [SiteGrade Lead] ${domain} — Grade: ${grade}`;
  const textBody = `New lead on SiteGrade!\n\nLead Email: ${leadEmail}\nTarget Domain: ${domain}\nGrade: ${grade}\nHeadline Score: ${headlineScore}/100\nPDF Link: ${pdfUrl || "In attachment"}\n\nRecommended Action:\nReview ${domain} and record a 2-minute personalized video teardown to send to ${leadEmail}.\n\nTimestamp: ${new Date().toLocaleString()}`;

  try {
    const resend = new Resend(RESEND_API_KEY);
    await resend.emails.send({
      from: "SiteGrade Alert <reports@macallanbutler.com>",
      to: FOUNDER_EMAIL,
      subject: subject,
      text: textBody,
    });
    console.log(`✅ Lead Alert: Successfully sent alert to founder (${FOUNDER_EMAIL})`);
    return { success: true, message: "Founder alert sent." };
  } catch (e) {
    console.error("❌ Lead Alert: Failed to send founder alert:", e);
    return { success: false, message: "Failed to send founder alert." };
  }
}

export type { Resend };
