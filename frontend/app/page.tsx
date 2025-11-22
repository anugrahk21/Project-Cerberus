"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import Spotlight from "@/components/ui/Spotlight";
import TextScramble from "@/components/landing/TextScramble";
import PipelineVis from "@/components/landing/PipelineVis";
import BentoGrid from "@/components/landing/BentoGrid";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import BreathingText from "@/components/landing/BreathingText";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white/20 overflow-x-hidden">
      
      <CursorSpotlight />
      
      {/* 1. Hero Section with Spotlight */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <Spotlight />
        
        <div className="z-10 text-center max-w-5xl px-6 space-y-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-xs font-mono text-zinc-400 tracking-wider">SYSTEM_ONLINE // V2.0.0</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter font-sans">
              <div className="md:hidden flex flex-col items-center">
                <BreathingText label="PROJECT" from="#71717a" to="#ffffff" />
                <BreathingText label="CERBERUS" from="#71717a" to="#ffffff" stagger={0.1} />
              </div>
              <div className="hidden md:block">
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

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/chat">
              <button className="group relative px-8 py-4 bg-white text-black rounded-full font-bold tracking-wide overflow-hidden transition-all hover:scale-105">
                <div className="absolute inset-0 bg-zinc-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
                <span className="relative flex items-center gap-2">
                  <Terminal className="w-5 h-5" />
                  LAUNCH CONSOLE
                </span>
              </button>
            </Link>
            
            <button className="px-8 py-4 rounded-full border border-white/20 text-zinc-400 hover:text-white hover:border-white/50 transition-all flex items-center gap-2">
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
      <PipelineVis />

      {/* 3. Bento Grid Features */}
      <BentoGrid />

      {/* 4. Footer */}
      <footer className="py-10 border-t border-white/10 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-zinc-500 text-sm font-mono">
            © 2025 PROJECT CERBERUS. ALL RIGHTS RESERVED.
          </div>
          <div className="flex gap-6 text-zinc-500 text-sm font-mono">
            <span className="hover:text-white cursor-pointer transition-colors">GITHUB</span>
            <span className="hover:text-white cursor-pointer transition-colors">TWITTER</span>
            <span className="hover:text-white cursor-pointer transition-colors">DISCORD</span>
          </div>
        </div>
      </footer>

    </main>
  );
}
