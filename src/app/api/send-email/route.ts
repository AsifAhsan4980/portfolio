// src/app/api/send-email/route.ts

import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

// Set up the transporter for your email service (e.g., Gmail, SMTP server)
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Use your mail provider (e.g., Gmail, SMTP, etc.)
    auth: {
        user: "asifahsan727@gmail.com",  // Your email address
        pass: "aopi jqqm whie eqrz",  // Your email password or app-specific password
    },
});

export async function POST(request: Request) {
    try {
        // Parse the request body
        const { clientEmail, subject, message } = await request.json();

        // Validate the input (you can add more validation as needed)
        if (!clientEmail || !subject || !message) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Email details
        const mailOptions = {
            from: clientEmail,  // Sender's email address
            to: "asifahsan727@gmail.com",    // Receiver's email address (e.g., your email address)
            subject: subject,
            text: message + `email : ${clientEmail}`,
            html: `<p>${message}</p><p>\`email : ${clientEmail}\`</p>`,  // Optional: if you want to send an HTML email
        };

        // Send the email using Nodemailer
        const info = await transporter.sendMail(mailOptions);

        return NextResponse.json({ message: 'Email sent successfully', info });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }
}
