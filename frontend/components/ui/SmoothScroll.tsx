"use client";

import { useEffect, useLayoutEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
    // Use useLayoutEffect to ensure Lenis initializes before paint if possible, 
    // but useEffect is generally safer for SSR. We'll stick to useEffect for Next.js 
    // but ensure clean setup.
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential easing
            orientation: "vertical",
            gestureOrientation: "vertical",
            smoothWheel: true,
            wheelMultiplier: 1,
            touchMultiplier: 2,
            infinite: false,
        });

        // Sync Lenis scroll with RAF
        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        const rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
