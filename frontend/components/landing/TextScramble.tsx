"use client";

import { useEffect, useState } from "react";

const CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~";

interface TextScrambleProps {
  text?: string;
  phrases?: string[];
  className?: string;
  duration?: number;
}

export default function TextScramble({ text, phrases, className, duration = 2000 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);

  useEffect(() => {
    const targetText = phrases ? phrases[phraseIndex] : (text || "");
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const startScramble = () => {
      clearInterval(interval);
      iteration = 0;
      
      interval = setInterval(() => {
        setDisplayText(
          targetText
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return targetText[index];
              }
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );

        if (iteration >= targetText.length) {
          clearInterval(interval);
          // If we have multiple phrases, schedule the next one
          if (phrases && phrases.length > 1) {
             setTimeout(() => {
                setPhraseIndex((prev) => (prev + 1) % phrases.length);
             }, duration);
          }
        }

        iteration += 1 / 3;
      }, 30);
    };

    startScramble();

    return () => clearInterval(interval);
  }, [text, phrases, phraseIndex, duration]);

  return <span className={className}>{displayText}</span>;
}
