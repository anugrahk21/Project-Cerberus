"use client";

import { motion } from "framer-motion";

export default function BreathingText({
  label,
  from = "#52525b", // zinc-600
  to = "#ffffff",   // white
  stagger = 0.1,
  className,
}: {
  label: string;
  from?: string;
  to?: string;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={className}>
      {label.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ color: from }}
          animate={{
            color: [from, to, from],
            textShadow: [
              "0 0 0px rgba(255,255,255,0)",
              "0 0 15px rgba(255,255,255,0.3)",
              "0 0 0px rgba(255,255,255,0)",
            ],
          }}
          transition={{
            duration: 2.5,
            delay: i * stagger,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}
