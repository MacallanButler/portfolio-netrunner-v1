import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { BRAND } from '@/lib/brand';
import { isRateLimited } from '@/lib/sitegrade/rate-limiter';

// Initialize Resend only if key exists
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(request: Request) {
    try {
        // IP rate limit check (5 contact transmissions per hour)
        const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "127.0.0.1";
        if (await isRateLimited(`send_contact_${ip}`, 5, 60 * 60 * 1000)) {
            return NextResponse.json(
                { error: 'Too many messages sent from this IP. Please try again later.' },
                { status: 429 }
            );
        }

        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        // Mock success if no API key (for dev/demo)
        if (!resend) {
            console.log('MOCK EMAIL SEND:', { name, email, message });
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
            return NextResponse.json({ success: true, mode: 'MOCK' });
        }

        // Real send
        const fromEmail = process.env.RESEND_FROM_EMAIL || `${BRAND.displayName} <${BRAND.contactEmail}>`;
        const toEmail = process.env.RESEND_TO_EMAIL || BRAND.contactEmail;

        const { data, error } = await resend.emails.send({
            from: fromEmail,
            to: [toEmail],
            subject: `New Transmission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email,
        });

        if (error) {
            console.error('RESEND ERROR:', error);
            return NextResponse.json(
                { error: error.message || 'Failed to send email' },
                { status: 400 }
            );
        }

        return NextResponse.json({ success: true, id: data?.id });
    } catch (err) {
        console.error('API /api/send Error:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
