/*
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Frontend Architecture & UI/UX
Description: The Landing Page - Entry point for the application.
             Showcases the project features, pipeline visualization, and Bento grid.
Note: Built for AI Cybersecurity Research Portfolio.
*/

"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import dynamic from "next/dynamic";
import Spotlight from "@/components/ui/Spotlight";
import TextScramble from "@/components/landing/TextScramble";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import BreathingText from "@/components/landing/BreathingText";
import SystemStatusBadge from "@/components/ui/SystemStatusBadge";
import HeroBackground from "@/components/landing/HeroBackground";
import BackToTop from "@/components/ui/BackToTop";

const PipelineVis = dynamic(() => import("@/components/landing/PipelineVis"), { ssr: false });
const BentoGrid = dynamic(() => import("@/components/landing/BentoGrid"), { ssr: false });

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-x-hidden">

      <CursorSpotlight />

      {/* 1. Hero Section with Spotlight */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <Spotlight />
        <HeroBackground />

        <div className="z-10 text-center max-w-5xl px-6 space-y-8">
          <div className="space-y-2">
            <div className="flex justify-center mb-6">
              <SystemStatusBadge suffix=" // V2.0.0" />
            </div>

            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter font-sans">
              <div className="sm:hidden flex flex-col items-center">
                <BreathingText label="PROJECT" from="#71717a" to="#ffffff" />
                <BreathingText label="CERBERUS" from="#71717a" to="#ffffff" stagger={0.1} />
              </div>
              <div className="hidden sm:block">
                <BreathingText label="PROJECT CERBERUS" from="#71717a" to="#ffffff" />
              </div>
            </h1>

            <div className="h-8 md:h-10 flex items-center justify-center">
              <TextScramble
                className="text-lg md:text-2xl text-zinc-400 font-mono"
                phrases={[
                  "The AI Iron Dome.",
                  "Multi-layered AI Security.",
                  "Zero Trust Architecture.",
                  "Real-time Prompt Injection Security."
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/chat">
              <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  LAUNCH CONSOLE
                </span>
              </button>
            </Link>

            <button
              onClick={() => document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white/50 transition-all flex items-center gap-2"
            >
              <span>READ THE DOCS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </section>

      {/* 2. Pipeline Visualization */}
      <section id="pipeline">
        <PipelineVis />
      </section>

      {/* 3. Bento Grid Features */}
      <BentoGrid />

      <div className="flex justify-center py-12">
        <Link href="https://github.com/anugrahk21/Project-Cerberus" target="_blank" rel="noopener noreferrer">
          <button className="px-8 py-4 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white/50 transition-all flex items-center gap-2">
            <span>KNOW MORE?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>

      {/* 4. Footer */}
      <footer className="py-10 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex gap-6 text-zinc-400 text-sm font-mono">
            <a href="https://github.com/anugrahk21/Project-Cerberus" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">GITHUB</a>
            <a href="https://www.linkedin.com/in/anugrah-k/" target="_blank" rel="noopener noreferrer" className="hover:text-white cursor-pointer transition-colors">LINKEDIN</a>
          </div>
          <div className="text-zinc-400 text-sm font-mono">
            © 2025 PROJECT CERBERUS
          </div>
        </div>
      </footer>

      <BackToTop />
    </main>
  );
}
