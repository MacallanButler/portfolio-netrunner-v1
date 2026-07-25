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
  const textBody = `Hello,\n\nHere is your requested SiteGrade audit report for ${domain}. You'll find the detailed report card with technical SEO, accessibility, mobile performance, structured data, and AI-assisted qualitative scores in the attached PDF.\n\nBest regards,\nThe SiteGrade Team\nmacallanbutler.com`;

  console.log(`✉️ Email: Attempting to send report to ${toEmail} using Resend...`);

  try {
    const resend = new Resend(RESEND_API_KEY);
    const { data, error } = await resend.emails.send({
      from: "SiteGrade <reports@macallanbutler.com>",
      to: toEmail,
      subject: subject,
      text: textBody,
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
  } catch (e: any) {
    console.error("❌ Email: Resend sending failed with exception:", e);
    return { success: false, message: `Resend exception: ${e.message}` };
  }
}
export type { Resend };
