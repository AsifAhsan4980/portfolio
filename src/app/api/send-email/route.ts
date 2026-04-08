import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { z } from 'zod';

// Input validation schema
const emailSchema = z.object({
    clientEmail: z.string().email('Invalid email format').max(255, 'Email too long'),
    subject: z.string().min(1, 'Subject is required').max(200, 'Subject too long'),
    message: z.string().min(1, 'Message is required').max(5000, 'Message too long'),
    captchaToken: z.string().optional(),
});

// Verify reCAPTCHA v3 token with Google
async function verifyCaptcha(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    if (!secret) return true; // Skip if not configured

    try {
        const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `secret=${secret}&response=${token}`,
        });
        const data = await res.json();
        return data.success && data.score >= 0.5;
    } catch {
        return false;
    }
}

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 5; // requests per minute
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in ms

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return false;
    }

    if (record.count >= RATE_LIMIT) {
        return true;
    }

    record.count++;
    return false;
}

// HTML sanitization - escape special characters
function sanitizeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

// Create transporter with environment variables
function createTransporter() {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email configuration missing');
    }

    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
}

export async function POST(request: Request) {
    try {
        // Get client IP for rate limiting
        const forwardedFor = request.headers.get('x-forwarded-for');
        const ip = forwardedFor?.split(',')[0] || 'unknown';

        // Check rate limit
        if (isRateLimited(ip)) {
            return NextResponse.json(
                { error: 'Too many requests. Please try again later.' },
                { status: 429 }
            );
        }

        // Parse and validate input
        const body = await request.json();
        const validationResult = emailSchema.safeParse(body);

        if (!validationResult.success) {
            return NextResponse.json(
                { error: 'Invalid input', details: validationResult.error.issues },
                { status: 400 }
            );
        }

        const { clientEmail, subject, message, captchaToken } = validationResult.data;

        // Verify reCAPTCHA if configured
        if (process.env.RECAPTCHA_SECRET_KEY) {
            if (!captchaToken) {
                return NextResponse.json(
                    { error: 'CAPTCHA verification required.' },
                    { status: 400 }
                );
            }
            const isHuman = await verifyCaptcha(captchaToken);
            if (!isHuman) {
                return NextResponse.json(
                    { error: 'CAPTCHA verification failed. Please try again.' },
                    { status: 403 }
                );
            }
        }

        // Sanitize inputs for HTML email
        const sanitizedMessage = sanitizeHtml(message);
        const sanitizedEmail = sanitizeHtml(clientEmail);
        const sanitizedSubject = sanitizeHtml(subject);

        // Create transporter
        const transporter = createTransporter();

        // Email details
        const mailOptions = {
            from: process.env.EMAIL_USER,
            replyTo: clientEmail,
            to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_USER,
            subject: `Portfolio Contact: ${sanitizedSubject}`,
            text: `${message}\n\nFrom: ${clientEmail}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #469D89;">New Contact Form Submission</h2>
                    <p><strong>From:</strong> ${sanitizedEmail}</p>
                    <p><strong>Subject:</strong> ${sanitizedSubject}</p>
                    <hr style="border: 1px solid #eee;" />
                    <p style="white-space: pre-wrap;">${sanitizedMessage}</p>
                </div>
            `,
        };

        // Send the email
        await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json(
            { error: 'Failed to send email. Please try again later.' },
            { status: 500 }
        );
    }
}
