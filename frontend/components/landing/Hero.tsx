/*
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Frontend Architecture & UI/UX
Description: Hero Section - The main visual hook of the landing page.
             Features animated shield effects and the primary call-to-action.
Note: Built for AI Cybersecurity Research Portfolio.
*/

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, Terminal, Cpu, Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Shield Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
        <div className="w-[800px] h-[800px] rounded-full border border-cyan-500/30 bg-cyan-500/5 blur-3xl animate-pulse" />
        <div className="absolute w-[600px] h-[600px] rounded-full border border-cyan-400/20 animate-[spin_10s_linear_infinite]" />
        <div className="absolute w-[400px] h-[400px] rounded-full border border-cyan-300/10 animate-[spin_15s_linear_infinite_reverse]" />
      </div>

      <div className="z-10 text-center max-w-4xl px-6 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent font-sans">
            Project Cerberus
            <br />
            <span className="text-cyan-400 text-4xl md:text-6xl">The AI Iron Dome</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto"
        >
          A Production-Grade Multi-Layered Security System for LLMs.
          <br />
          <span className="text-cyan-200/80">Fail-Closed. Context-Aware. Unbreakable.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link href="/chat">
            <button className="group relative px-8 py-4 bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/50 hover:border-cyan-400 text-cyan-100 rounded-lg transition-all duration-300 backdrop-blur-sm">
              <span className="absolute inset-0 rounded-lg bg-cyan-400/20 blur-lg group-hover:blur-xl transition-all opacity-50 group-hover:opacity-100" />
              <span className="relative flex items-center gap-2 font-mono text-lg font-bold tracking-wider">
                <Terminal className="w-5 h-5" />
                INITIALIZE SYSTEM
              </span>
            </button>
          </Link>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-4 pt-8"
        >
          {[
            { icon: Terminal, label: "Python 3.10+" },
            { icon: Cpu, label: "FastAPI" },
            { icon: ShieldCheck, label: "Gemini 2.5" },
            { icon: Lock, label: "Fail-Closed" },
          ].map((badge, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/50 border border-slate-800 text-slate-400 text-sm font-mono"
            >
              <badge.icon className="w-3 h-3 text-cyan-500" />
              {badge.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
