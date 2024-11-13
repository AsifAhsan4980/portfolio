"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

// Type for form data
interface FormData {
    clientEmail: string;
    subject: string;
    message: string;
}

const EmailSentOption: React.FC = () => {
    const [clientEmail, setClientEmail] = useState<string>("");
    const [subject, setSubject] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [statusMessage, setStatusMessage] = useState<string>("");

    // Handle form submit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatusMessage("");

        // Prepare the form data object
        const formData: FormData = { clientEmail, subject, message };

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setStatusMessage("Email sent successfully!");
                // Optionally, reset the form after successful submission
                setClientEmail("");
                setSubject("");
                setMessage("");
            } else {
                setStatusMessage(result?.message || "Failed to send email. Please try again.");
            }
        } catch (error) {
            console.log(error);
            setStatusMessage("Error: Unable to send email.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6 p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold text-center">Send Email</h2>

            {/* Client Email */}
            <div className="space-y-2">
                <Label htmlFor="client-email" className="text-sm font-medium">Client Email</Label>
                <Input
                    id="client-email"
                    type="email"
                    placeholder="Enter client's email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Subject */}
            <div className="space-y-2">
                <Label htmlFor="subject" className="text-sm font-medium">Subject</Label>
                <Input
                    id="subject"
                    type="text"
                    placeholder="Enter subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Message (Textarea) */}
            <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">Message</Label>
                <Textarea
                    id="message"
                    rows={6}
                    placeholder="Enter your message here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md"
                    required
                />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
                <Button
                    className="w-full py-3 bg-[#469D89]"
                    onClick={handleSubmit}
                    disabled={isLoading}
                >
                    {isLoading ? "Sending..." : "Send Email"}
                </Button>
            </div>

            {/* Status Message */}
            {statusMessage && (
                <div className="mt-4 text-center text-sm">
                    <p className={statusMessage.includes("success") ? "text-green-500" : "text-red-500"}>
                        {statusMessage}
                    </p>
                </div>
            )}
        </div>
    );
};

export default EmailSentOption;
