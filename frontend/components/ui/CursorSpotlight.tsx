"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorSpotlight() {
    const divRef = useRef<HTMLDivElement>(null);
    const spotlightRef = useRef<HTMLDivElement>(null);
    const [opacity, setOpacity] = useState(0);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);

        const handleMouseMove = (e: MouseEvent) => {
            if (!spotlightRef.current) return;

            const x = e.clientX;
            const y = e.clientY;

            // Use CSS custom properties for better performance
            spotlightRef.current.style.setProperty('--mouse-x', `${x}px`);
            spotlightRef.current.style.setProperty('--mouse-y', `${y}px`);

            if (opacity === 0) setOpacity(1);
        };

        const handleMouseLeave = () => {
            setOpacity(0);
        };

        document.addEventListener("mousemove", handleMouseMove, { passive: true });
        document.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [opacity]);

    if (!isMounted) return null;

    return (
        <div
            ref={divRef}
            className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
            style={{
                opacity,
                contain: 'layout style paint',
                willChange: 'opacity'
            }}
        >
            <div
                ref={spotlightRef}
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.06), transparent 40%)',
                    willChange: 'transform',
                    transform: 'translate3d(0, 0, 0)',
                    contain: 'strict'
                }}
            />
        </div>
    );
}
