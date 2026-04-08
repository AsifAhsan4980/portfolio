"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { FiX, FiSend } from "react-icons/fi";
import type { ChatMessage } from "./ChatBot";

interface ChatPanelProps {
    messages: ChatMessage[];
    isTyping: boolean;
    onSend: (text: string) => void;
    onChipClick: (chip: string) => void;
    onClose: () => void;
}

export default function ChatPanel({ messages, isTyping, onSend, onChipClick, onClose }: ChatPanelProps) {
    const [input, setInput] = useState("");
    const bottomRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    useEffect(() => {
        setTimeout(() => inputRef.current?.focus(), 100);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        onSend(input);
        setInput("");
    };

    const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
    const activeChips = lastAssistantMsg?.chips;

    return (
        <motion.div
            key="chat-panel"
            className="fixed bottom-6 right-6 z-[90] w-[calc(100vw-3rem)] sm:w-[400px] h-[min(70vh,560px)] flex flex-col rounded-2xl overflow-hidden border border-[#469D89]/25 bg-background/80 backdrop-blur-xl shadow-[0_0_40px_rgba(70,157,137,0.15)]"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#469D89]/15 bg-[#469D89]/8">
                <div className="flex items-center gap-2">
                    <motion.span
                        className="w-2 h-2 rounded-full bg-[#469D89]"
                        animate={{ opacity: [1, 0.3, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <span className="text-sm font-mono font-semibold text-foreground">Portfolio Assistant</span>
                </div>
                <button
                    onClick={onClose}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-[#469D89]/10 transition-colors"
                    aria-label="Close chat"
                >
                    <FiX size={18} />
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-3">
                <div className="space-y-3">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div
                                className={`max-w-[85%] px-3.5 py-2.5 rounded-xl text-[13px] font-mono leading-relaxed ${
                                    msg.role === "user"
                                        ? "bg-[#469D89] text-white rounded-br-sm"
                                        : "border border-[#469D89]/20 bg-[#469D89]/5 text-foreground rounded-bl-sm"
                                }`}
                            >
                                {msg.text.split("\n").map((line, i, arr) => (
                                    <span key={i}>
                                        {line}
                                        {i < arr.length - 1 && <br />}
                                    </span>
                                ))}

                                {msg.links && msg.links.length > 0 && (
                                    <div className="mt-2 space-y-1">
                                        {msg.links.map((link, i) => (
                                            <Link
                                                key={i}
                                                href={link.url}
                                                target={link.url.startsWith("http") ? "_blank" : undefined}
                                                rel={link.url.startsWith("http") ? "noopener noreferrer" : undefined}
                                                className="block text-[12px] text-[#469D89] hover:text-[#5fb8a3] underline underline-offset-2 decoration-[#469D89]/30 transition-colors"
                                            >
                                                {link.label} &rarr;
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <motion.div className="flex justify-start" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <div className="px-3.5 py-2.5 rounded-xl rounded-bl-sm border border-[#469D89]/20 bg-[#469D89]/5">
                                <div className="flex items-center gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <motion.span
                                            key={i}
                                            className="w-1.5 h-1.5 rounded-full bg-[#469D89]/60"
                                            animate={{ opacity: [0.3, 1, 0.3] }}
                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Quick Reply Chips */}
            {activeChips && activeChips.length > 0 && !isTyping && (
                <div className="px-4 py-2 border-t border-[#469D89]/10 overflow-x-auto">
                    <div className="flex gap-2 flex-nowrap">
                        {activeChips.map((chip) => (
                            <button
                                key={chip}
                                onClick={() => onChipClick(chip)}
                                className="shrink-0 px-3 py-1.5 text-[11px] font-mono text-[#469D89] border border-[#469D89]/30 rounded-full bg-[#469D89]/5 hover:bg-[#469D89]/15 hover:shadow-[0_0_12px_rgba(70,157,137,0.2)] transition-all duration-200 whitespace-nowrap"
                            >
                                {chip}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Input */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-3 border-t border-[#469D89]/15">
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about skills, projects, experience..."
                    maxLength={300}
                    className="flex-1 bg-transparent border-none outline-none text-[13px] font-mono text-foreground caret-[#469D89] placeholder:text-muted-foreground/50"
                    autoComplete="off"
                    spellCheck={false}
                />
                <button
                    type="submit"
                    disabled={!input.trim()}
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-[#469D89] hover:bg-[#469D89]/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label="Send message"
                >
                    <FiSend size={16} />
                </button>
            </form>
        </motion.div>
    );
}
