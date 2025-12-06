"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorSpotlight() {
  const divRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current) return;

      const x = e.clientX;
      const y = e.clientY;

      spotlightRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.06), transparent 40%)`;
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      setOpacity(0);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{ opacity }}
    >
      <div
        ref={spotlightRef}
        className="absolute -inset-px bg-gradient-to-r from-white/10 to-transparent transition-opacity duration-300"
        style={{
          opacity: 1,
        }}
      />
    </div>
  );
}
