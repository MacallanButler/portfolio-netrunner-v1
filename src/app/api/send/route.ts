import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialize Resend only if key exists
const resend = process.env.RESEND_API_KEY
    ? new Resend(process.env.RESEND_API_KEY)
    : null;

export async function POST(request: Request) {
    try {
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
        const data = await resend.emails.send({
            from: 'Netrunner Portfolio <onboarding@resend.dev>', // Update with verify domain in prod
            to: ['delivered@resend.dev'], // Update to real email in prod
            subject: `New Transmission from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email,
        });

        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
