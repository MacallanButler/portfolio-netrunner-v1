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
        const { data, error } = await resend.emails.send({
            from: 'Macallan Butler <macallan@macallanbutler.com>', // Update with verify domain in prod
            to: ['macallan@macallanbutler.com'], // Update to real email in prod
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
    } catch (error) {
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
