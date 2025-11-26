import { useState, useEffect } from 'react';

const FREE_CHAT_LIMIT = 3;
const CHAT_COUNT_STORAGE_KEY = "cerberus-chat-count";

export const useRateLimit = () => {
    const [messageCount, setMessageCount] = useState(0);
    const [showLimitModal, setShowLimitModal] = useState(false);
    const [limitMessage, setLimitMessage] = useState("You've used all free prompts for today. Cerberus needs to recharge.");

    useEffect(() => {
        if (typeof window === "undefined") return;
        const stored = window.localStorage.getItem(CHAT_COUNT_STORAGE_KEY);
        if (!stored) return;
        const parsed = parseInt(stored, 10);
        if (!Number.isNaN(parsed)) {
            setMessageCount(parsed);
        }
    }, []);

    const persistMessageCount = (value: number) => {
        if (typeof window === "undefined") return;
        window.localStorage.setItem(CHAT_COUNT_STORAGE_KEY, String(value));
    };

    const incrementMessageCount = () => {
        setMessageCount((prev) => {
            const next = prev + 1;
            persistMessageCount(next);
            if (next >= FREE_CHAT_LIMIT) {
                setLimitMessage("Cerberus free tier just maxed out.\nThe guardians need a nap before more prompts.");
                setShowLimitModal(true);
            }
            return next;
        });
    };

    const resetLimit = () => {
        setMessageCount(0);
        persistMessageCount(0);
    }

    const maxOutLimit = () => {
        setMessageCount(FREE_CHAT_LIMIT);
        persistMessageCount(FREE_CHAT_LIMIT);
    }

    const hasReachedLimit = messageCount >= FREE_CHAT_LIMIT;
    const remainingPrompts = Math.max(FREE_CHAT_LIMIT - messageCount, 0);

    return {
        messageCount,
        showLimitModal,
        setShowLimitModal,
        limitMessage,
        setLimitMessage,
        incrementMessageCount,
        hasReachedLimit,
        remainingPrompts,
        resetLimit,
        maxOutLimit
    };
};
