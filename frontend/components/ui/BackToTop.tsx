"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

interface BackToTopProps {
    containerRef?: React.RefObject<HTMLElement | null>;
    threshold?: number;
}

export default function BackToTop({ containerRef, threshold = 300 }: BackToTopProps) {
    const [isVisible, setIsVisible] = useState(false);

    // Throttled scroll handler to prevent layout thrashing and stutter
    useEffect(() => {
        let ticking = false;

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    let scrollTop = 0;
                    if (containerRef?.current) {
                        scrollTop = containerRef.current.scrollTop;
                    } else {
                        scrollTop = window.scrollY;
                    }

                    setIsVisible(scrollTop > threshold);
                    ticking = false;
                });
                ticking = true;
            }
        };

        if (containerRef?.current) {
            const container = containerRef.current;
            container.addEventListener("scroll", handleScroll, { passive: true });
            return () => container.removeEventListener("scroll", handleScroll);
        } else {
            window.addEventListener("scroll", handleScroll, { passive: true });
            return () => window.removeEventListener("scroll", handleScroll);
        }
    }, [containerRef, threshold]);

    const scrollToTop = () => {
        if (containerRef?.current) {
            containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            // Use Lenis for window scroll if available, otherwise fallback
            // Since we can't easily access the Lenis instance here without context,
            // we'll rely on native smooth scroll which Lenis intercepts or handles.
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 20 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg hover:bg-white/20 transition-colors"
                    aria-label="Back to top"
                >
                    <ArrowUp className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
