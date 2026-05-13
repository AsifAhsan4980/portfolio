"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

interface FormData {
    clientEmail: string;
    subject: string;
    message: string;
    captchaToken: string;
}

declare global {
    interface Window {
        grecaptcha: {
            ready: (cb: () => void) => void;
            execute: (siteKey: string, options: { action: string }) => Promise<string>;
        };
    }
}

function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const EmailSentOption: React.FC = () => {
    const [clientEmail, setClientEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const [captchaReady, setCaptchaReady] = useState<boolean>(false);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "";

    // Load reCAPTCHA v3 script and track ready state
    useEffect(() => {
        if (!siteKey) return;

        if (document.getElementById("recaptcha-v3")) {
            // Script already in DOM — grecaptcha may already be ready
            if (window.grecaptcha) {
                window.grecaptcha.ready(() => setCaptchaReady(true));
            }
            return;
        }

        const script = document.createElement("script");
        script.id = "recaptcha-v3";
        script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
        script.async = true;
        script.onload = () => {
            window.grecaptcha.ready(() => setCaptchaReady(true));
        };
        document.head.appendChild(script);
    }, [siteKey]);

    // Auto-clear success message after 5 seconds
    useEffect(() => {
        if (!isSuccess || !statusMessage) return;
        const timer = setTimeout(() => {
            setStatusMessage("");
            setIsSuccess(false);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isSuccess, statusMessage]);

    const getCaptchaToken = useCallback(async (): Promise<string> => {
        if (!siteKey || !captchaReady || !window.grecaptcha) return "";
        try {
            return await window.grecaptcha.execute(siteKey, { action: "send_email" });
        } catch {
            return "";
        }
    }, [siteKey, captchaReady]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Client-side validation
        if (!clientEmail.trim()) {
            setStatusMessage("Email address is required.");
            setIsSuccess(false);
            return;
        }
        if (!validateEmail(clientEmail)) {
            setStatusMessage("Please enter a valid email address.");
            setIsSuccess(false);
            return;
        }
        if (!subject.trim()) {
            setStatusMessage("Subject is required.");
            setIsSuccess(false);
            return;
        }
        if (!message.trim()) {
            setStatusMessage("Message is required.");
            setIsSuccess(false);
            return;
        }

        setIsLoading(true);
        setStatusMessage("");
        setIsSuccess(false);

        const captchaToken = await getCaptchaToken();

        const formData: FormData = { clientEmail, subject, message, captchaToken };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatusMessage("Email sent successfully!");
                setIsSuccess(true);
                setClientEmail("");
                setSubject("");
                setMessage("");
            } else {
                // Surface specific Zod field error if available, then fallback to general error
                const detail = result?.details?.[0]?.message;
                setStatusMessage(detail || result?.error || result?.message || "Failed to send email. Please try again.");
                setIsSuccess(false);
            }
        } catch (error) {
            console.error(error);
            setStatusMessage("Error: Unable to send email.");
            setIsSuccess(false);
        } finally {
            setIsLoading(false);
        }
    };

    const inputClass = "w-full bg-background/50 border-[#469D89]/20 focus:border-[#469D89]/60 focus:ring-[#469D89]/20 focus:shadow-[0_0_12px_rgba(70,157,137,0.15)] font-mono text-sm transition-all duration-200 rounded-lg";

    return (
        <motion.div
            className="relative border border-[#469D89]/20 rounded-2xl overflow-hidden bg-background/50 backdrop-blur-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-[#469D89]/30 pointer-events-none" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-[#469D89]/30 pointer-events-none" />

            {/* Terminal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#469D89]/15 bg-[#469D89]/5">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#469D89]/70" />
                </div>
                <span className="text-[10px] font-mono text-[#469D89]/50 tracking-widest">send_message.sh</span>
                <div className="w-14" />
            </div>

            {/* Form content */}
            <form onSubmit={handleSubmit} noValidate>
                <div className="p-6 space-y-5">
                    <div className="flex items-center gap-2 mb-5">
                        <div className="w-1 h-5 bg-gradient-to-b from-[#469D89] to-[#2d6b5f] rounded-full" />
                        <h2 className="text-xl font-bold gradient-text-static">Send Email</h2>
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="client-email" className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.2em] uppercase">
                            Your Email
                        </Label>
                        <Input
                            id="client-email"
                            type="email"
                            placeholder="your@email.com"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="subject" className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.2em] uppercase">
                            Subject
                        </Label>
                        <Input
                            id="subject"
                            type="text"
                            placeholder="Project inquiry..."
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="message" className="text-[10px] font-mono text-[#469D89]/60 tracking-[0.2em] uppercase">
                            Message
                        </Label>
                        <Textarea
                            id="message"
                            rows={5}
                            placeholder="Tell me about your project..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <motion.button
                        type="submit"
                        className="relative w-full py-3 font-mono text-sm tracking-widest text-[#469D89] border border-[#469D89]/50 rounded-lg overflow-hidden transition-all duration-300 hover:border-[#469D89] hover:shadow-[0_0_20px_rgba(70,157,137,0.3)] hover:bg-[#469D89]/10 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={isLoading}
                        whileHover={{ scale: isLoading ? 1 : 1.01 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <motion.span
                                    className="w-1.5 h-1.5 rounded-full bg-[#469D89]"
                                    animate={{ opacity: [1, 0.3, 1] }}
                                    transition={{ duration: 0.8, repeat: Infinity }}
                                />
                                Transmitting...
                            </span>
                        ) : (
                            "Send Message →"
                        )}
                    </motion.button>

                    {statusMessage && (
                        <motion.div
                            className={`text-center text-xs font-mono p-3 rounded-lg border ${
                                isSuccess
                                    ? "text-[#469D89] border-[#469D89]/30 bg-[#469D89]/8"
                                    : "text-red-400 border-red-400/30 bg-red-400/8"
                            }`}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <span className="mr-1">{isSuccess ? "✓" : "✗"}</span>
                            {statusMessage}
                        </motion.div>
                    )}
                </div>
            </form>
        </motion.div>
    );
};

export default EmailSentOption;
