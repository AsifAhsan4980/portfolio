"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useFocusMode } from "@/context/FocusMode";
import { matchIntent } from "@/lib/chatbot-engine";
import { welcomeMessage } from "@/data/chatbot-knowledge";
import ChatPanel from "./ChatPanel";
import { FiMessageCircle } from "react-icons/fi";

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    text: string;
    links?: { label: string; url: string }[];
    chips?: string[];
    timestamp: number;
}

export default function ChatBot() {
    const { isFocused } = useFocusMode();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const idCounter = useRef(0);

    const nextId = useCallback(() => {
        idCounter.current += 1;
        return `msg-${idCounter.current}`;
    }, []);

    const handleOpen = useCallback(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: nextId(),
                    role: "assistant",
                    text: welcomeMessage.text,
                    chips: welcomeMessage.chips,
                    timestamp: Date.now(),
                },
            ]);
        }
        setIsOpen(true);
    }, [messages.length, nextId]);

    const handleSend = useCallback(
        (text: string) => {
            const trimmed = text.trim();
            if (!trimmed || isTyping) return;

            const userMsg: ChatMessage = {
                id: nextId(),
                role: "user",
                text: trimmed,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, userMsg]);

            setIsTyping(true);
            const delay = 300 + Math.random() * 300;
            setTimeout(() => {
                const response = matchIntent(trimmed);
                const botMsg: ChatMessage = {
                    id: nextId(),
                    role: "assistant",
                    text: response.text,
                    links: response.links,
                    chips: response.chips,
                    timestamp: Date.now(),
                };
                setMessages((prev) => [...prev, botMsg]);
                setIsTyping(false);
            }, delay);
        },
        [nextId, isTyping]
    );

    const handleChipClick = useCallback(
        (chip: string) => {
            handleSend(chip);
        },
        [handleSend]
    );

    if (isFocused) return null;

    return (
        <>
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        key="chat-bubble"
                        onClick={handleOpen}
                        className="fixed bottom-6 right-6 z-[90] w-14 h-14 rounded-full bg-[#469D89] text-white flex items-center justify-center shadow-[0_0_20px_rgba(70,157,137,0.5)] hover:shadow-[0_0_30px_rgba(70,157,137,0.7)] hover:scale-105 transition-all duration-200 border border-[#469D89]/50"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        aria-label="Open chat assistant"
                    >
                        <FiMessageCircle size={24} />
                    </motion.button>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {isOpen && (
                    <ChatPanel
                        messages={messages}
                        isTyping={isTyping}
                        onSend={handleSend}
                        onChipClick={handleChipClick}
                        onClose={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
