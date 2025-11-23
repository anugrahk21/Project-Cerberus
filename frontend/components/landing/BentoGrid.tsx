"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Lock, Globe, Cpu, Activity, Fingerprint, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const BentoCard = ({
  className,
  children,
  title,
  description,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  title: string;
  description: string;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
    className={cn(
      "group relative overflow-hidden rounded-3xl bg-black/40 border border-white/10 p-6 hover:border-white/30 transition-colors backdrop-blur-sm",
      className
    )}
  >
    <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
    <div className="relative z-10 h-full flex flex-col">
      <div className="flex-1">{children}</div>
      <div className="mt-4">
        <h3 className="text-xl font-bold text-white mb-1 font-sans">{title}</h3>
        <p className="text-sm text-zinc-400 font-mono">{description}</p>
      </div>
    </div>
    {/* Hover Glow - Monochrome */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </motion.div>
);

export default function BentoGrid() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 font-sans tracking-tight">
            System Capabilities
          </h2>
          <p className="text-zinc-500 font-mono text-sm">
            // ARCHITECTURE_OVERVIEW
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[200px]">
          {/* Card 1: Parallel Execution (2x2) */}
          <BentoCard
            className="md:col-span-2 md:row-span-2"
            title="Parallel Execution"
            description="Asyncio.gather() runs 3 judges concurrently. Latency < 300ms."
            delay={0.1}
          >
            <div className="h-full flex items-end pb-4 gap-2">
              <div className="w-full bg-zinc-900/50 rounded-lg p-4 relative overflow-hidden h-full border border-white/5">
                <div className="absolute inset-0 flex items-end justify-around p-4">
                  {/* Sequential Bar */}
                  <div className="w-1/3 bg-zinc-800 h-[80%] rounded-t-md relative group-hover:h-[40%] transition-all duration-1000 border-t border-white/20">
                    <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-zinc-500 font-mono">SEQ</div>
                  </div>
                  {/* Parallel Bar */}
                  <div className="w-1/3 bg-white/20 h-[30%] rounded-t-md relative group-hover:h-[20%] transition-all duration-1000 border-t border-white/40">
                    <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] text-white font-mono">PAR</div>
                  </div>
                </div>
                <div className="absolute top-4 left-4 text-[10px] font-mono text-zinc-500">LATENCY_METRICS</div>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Fail-Closed (1x1) */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Fail-Closed"
            description="Default Deny Policy. System locks on error."
            delay={0.2}
          >
            <div className="h-full flex items-center justify-center">
              <Shield className="w-12 h-12 text-white group-hover:scale-110 transition-transform" />
            </div>
          </BentoCard>

          {/* Card 3: Canary Tokens (1x1) */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Canary Tokens"
            description="Detects System Prompt Extraction attempts."
            delay={0.3}
          >
            <div className="h-full flex items-center justify-center relative">
              <div className="absolute w-full h-[1px] bg-zinc-700 top-1/2 group-hover:bg-white transition-colors" />
              <Lock className="w-10 h-10 text-zinc-400 z-10 bg-black p-1 border border-zinc-800 rounded-full group-hover:scale-110 transition-transform" />
            </div>
          </BentoCard>

          {/* Card 4: Context-Aware (2x1) */}
          <BentoCard
            className="md:col-span-2 md:row-span-1"
            title="Context-Aware Memory"
            description="Maintains conversation history for coherent multi-turn dialogue."
            delay={0.4}
          >
            <div className="h-full flex flex-col justify-center gap-2 px-4 group-hover:scale-105 transition-transform origin-center">
              <div className="bg-zinc-800/50 p-2 rounded-lg rounded-tl-none text-[10px] font-mono text-zinc-400 w-3/4 border border-white/5">
                User: What is X?
              </div>
              <div className="bg-white/10 p-2 rounded-lg rounded-tr-none text-[10px] font-mono text-white w-3/4 self-end border border-white/10">
                AI: X is ...
              </div>
            </div>
          </BentoCard>

          {/* Card 5: XML Sanitization (1x1) */}
          <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="XML Sanitization"
            description="Prevents tag injection attacks."
            delay={0.5}
          >
            <div className="h-full flex items-center justify-center">
              <Code className="w-12 h-12 text-zinc-500 group-hover:text-white group-hover:scale-110 transition-all" />
            </div>
          </BentoCard>

           {/* Card 6: Zero Trust (1x1) */}
           <BentoCard
            className="md:col-span-1 md:row-span-1"
            title="Zero Trust"
            description="Every request is treated as hostile."
            delay={0.6}
          >
             <div className="h-full flex items-center justify-center">
              <Fingerprint className="w-12 h-12 text-zinc-600 group-hover:text-white group-hover:scale-110 transition-all" />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
