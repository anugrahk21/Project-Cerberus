import { useState } from 'react';
import { sendChat, ChatError } from '@/lib/api';
import { useCouncil } from './useCouncil';
import { useRateLimit } from './useRateLimit';

export interface Message {
    role: "user" | "ai";
    content: string;
    isError?: boolean;
}

export const useChat = (
    council: ReturnType<typeof useCouncil>,
    rateLimit: ReturnType<typeof useRateLimit>
) => {
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        if (rateLimit.hasReachedLimit) {
            rateLimit.setLimitMessage("Cerberus free tier allows only 3 prompts.\nCome back tomorrow!");
            rateLimit.setShowLimitModal(true);
            return;
        }

        const userPrompt = input;
        setInput("");
        setMessages((prev) => [...prev, { role: "user", content: userPrompt }]);
        rateLimit.incrementMessageCount();
        setIsLoading(true);

        // Reset Judges
        council.resetCouncil();

        try {
            const data = await sendChat(userPrompt);

            if (data.verdict) {
                council.updateCouncil(data.verdict);
            } else if (data.security_check === "passed") {
                council.setAllStatus("safe", "PASSED");
            }

            setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
        } catch (error: unknown) {
            console.error("Chat error:", error);

            const chatError = error as ChatError;

            if (chatError.detail?.error === "rate_limit") {
                const retryAfterSeconds = chatError.detail?.retry_after;
                const etaMinutes = retryAfterSeconds ? Math.ceil(retryAfterSeconds / 60) : null;
                const eta = etaMinutes
                    ? `\nTry again in about ${etaMinutes} minute${etaMinutes === 1 ? "" : "s"}.`
                    : "";
                const modalMessage = `${chatError.detail.message}${eta}`;

                rateLimit.maxOutLimit();
                rateLimit.setLimitMessage(modalMessage);
                rateLimit.setShowLimitModal(true);

                setMessages((prev) => [...prev, { role: "ai", content: chatError.detail.message, isError: true }]);
                council.setAllStatus("idle");
            } else if (chatError.detail?.error === "Request blocked by security system" || chatError.detail?.error === "Response blocked by security system") {
                if (chatError.detail.verdict) {
                    council.updateCouncil(chatError.detail.verdict);
                } else {
                    council.setAllStatus("unsafe", "BLOCKED");
                }
                setMessages((prev) => [...prev, { role: "ai", content: chatError.detail.message, isError: true }]);
            } else {
                council.setAllStatus("idle");
                setMessages((prev) => [...prev, { role: "ai", content: "An unexpected error occurred.", isError: true }]);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return {
        input,
        setInput,
        isLoading,
        messages,
        setMessages,
        handleSend
    };
};
