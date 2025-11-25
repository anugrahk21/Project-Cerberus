"use client";

import { motion } from "framer-motion";
import { ArrowDown, ShieldAlert, ShieldCheck, Search, Brain, Eye, Lock, User } from "lucide-react";

export default function PipelineVis() {
  return (
    <section className="relative py-12 overflow-hidden bg-black text-white">
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4 text-white">The Security Pipeline</h2>
          <p className="text-zinc-400 font-mono text-sm">
            // VISUALIZING_REQUEST_FLOW
          </p>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center">
          
          {/* 1. User Prompt */}
          <Step delay={0}>
            <div className="w-64 border border-white/20 bg-zinc-900/50 p-4 rounded-lg text-center backdrop-blur-sm">
              <div className="flex justify-center mb-2">
                <User className="w-6 h-6 text-zinc-400" />
              </div>
              <h3 className="font-bold text-sm mb-1">USER SENDS PROMPT</h3>
              <code className="text-xs text-zinc-500 bg-black/50 px-2 py-1 rounded block">
                "Ignore all instructions"
              </code>
            </div>
          </Step>

          <Connector delay={0.2} />

          {/* 2. Security Screening */}
          <Step delay={0.4}>
            <div className="w-80 border border-white/20 bg-zinc-900/50 p-3 rounded-lg text-center backdrop-blur-sm">
              <h3 className="font-bold text-sm">STEP 1: SECURITY SCREENING</h3>
              <p className="text-xs text-zinc-500 font-mono">(Parallel Judge Execution)</p>
            </div>
          </Step>

          <Connector delay={0.6} />

          {/* 3. Judges */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            <Step delay={0.8} className="h-full">
              <JudgeCard 
                title="JUDGE 1: LITERAL" 
                icon={Search}
                desc="Checks 18+ banned keywords"
                details={['"ignore"', '"jailbreak"', '"hack"']}
                action="❌ FAIL on match"
              />
            </Step>
            <Step delay={1.0} className="h-full">
              <JudgeCard 
                title="JUDGE 2: INTENT" 
                icon={Brain}
                desc="AI-powered semantic analysis"
                details={['Social eng', 'Obfuscated attacks']}
                action="❌ FAIL on malicious intent"
              />
            </Step>
            <Step delay={1.2} className="h-full">
              <JudgeCard 
                title="JUDGE 3: CANARY" 
                icon={Eye}
                desc="Tests if AI leaks system prompt"
                details={['Injects UUID token', 'Checks for leakage']}
                action="❌ FAIL on token in response"
              />
            </Step>
          </div>

          <Connector delay={1.4} />

          {/* 4. Consensus */}
          <Step delay={1.6}>
            <div className="w-64 border border-white/20 bg-zinc-900/50 p-4 rounded-lg text-center backdrop-blur-sm">
              <div className="flex justify-center mb-2">
                <Lock className="w-5 h-5 text-zinc-400" />
              </div>
              <h3 className="font-bold text-sm">ALL JUDGES MUST APPROVE</h3>
              <p className="text-xs text-zinc-500 font-mono mt-1">Fail-Closed = ON</p>
            </div>
          </Step>

          {/* Split Connector */}
          <div className="relative w-full h-16 mt-2 mb-2">
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: "100%" }}
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 1.8 }}
               className="absolute left-1/2 top-0 w-px bg-white/20 -translate-x-1/2 overflow-hidden"
             >
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1.8 }}
                />
             </motion.div>
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: "50%" }} // Span half width to connect left and right
               viewport={{ once: true }}
               transition={{ duration: 0.5, delay: 2.0 }}
               className="absolute top-full left-1/4 right-1/4 h-px bg-white/20 overflow-hidden"
             >
                <motion.div 
                    className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-white to-transparent opacity-50"
                    animate={{ left: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 2.0 }}
                />
             </motion.div>
             {/* Vertical drops from the horizontal line */}
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: "20px" }}
               viewport={{ once: true }}
               transition={{ duration: 0.3, delay: 2.3 }}
               className="absolute top-full left-[25%] w-px bg-white/20 overflow-hidden"
             >
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 2.3 }}
                />
             </motion.div>
             <motion.div 
               initial={{ height: 0 }}
               whileInView={{ height: "20px" }}
               viewport={{ once: true }}
               transition={{ duration: 0.3, delay: 2.3 }}
               className="absolute top-full right-[25%] w-px bg-white/20 overflow-hidden"
             >
                <motion.div 
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-50"
                    animate={{ top: ["-100%", "100%"] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 2.3 }}
                />
             </motion.div>

             {/* Arrows for split drops */}
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5 }}
                className="absolute top-[calc(100%+20px)] left-[25%] -translate-x-1/2 -translate-y-1/2 z-10"
             >
                <ArrowDown className="w-3 h-3 text-zinc-600" />
             </motion.div>
             <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 2.5 }}
                className="absolute top-[calc(100%+20px)] right-[25%] translate-x-1/2 -translate-y-1/2 z-10"
             >
                <ArrowDown className="w-3 h-3 text-zinc-600" />
             </motion.div>
          </div>

          {/* 5. Outcomes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6">
            {/* Blocked Path */}
            <Step delay={2.5}>
              <div className="group relative overflow-hidden border border-red-900/30 bg-red-950/10 p-6 rounded-xl h-full hover:border-red-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 border-b border-red-900/30 pb-3">
                    <ShieldAlert className="w-6 h-6 text-red-500" />
                    <h3 className="font-bold text-red-500">BLOCKED</h3>
                  </div>
                  <div className="space-y-4 text-sm text-zinc-400">
                    <div>
                      <p className="text-white font-semibold mb-1">1. Log Attack</p>
                      <ul className="list-disc list-inside text-xs pl-2 space-y-1 text-zinc-500">
                        <li>Timestamp</li>
                        <li>Prompt text</li>
                        <li>Reason & Canary ID</li>
                        <li>IP address</li>
                      </ul>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">2. Return Error</p>
                      <ul className="list-disc list-inside text-xs pl-2 space-y-1 text-zinc-500">
                        <li>403 (attack)</li>
                        <li>503 (failure)</li>
                        <li>Generic msg</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Step>

            {/* Approved Path */}
            <Step delay={2.7}>
              <div className="group relative overflow-hidden border border-green-900/30 bg-green-950/10 p-6 rounded-xl h-full hover:border-green-500/50 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4 border-b border-green-900/30 pb-3">
                    <ShieldCheck className="w-6 h-6 text-green-500" />
                    <h3 className="font-bold text-green-500">APPROVED</h3>
                  </div>
                  <div className="space-y-4 text-sm text-zinc-400">
                    <div>
                      <p className="text-white font-semibold mb-1">1. Build Full Prompt</p>
                      <ul className="list-disc list-inside text-xs pl-2 space-y-1 text-zinc-500">
                        <li>System prompt & Session history</li>
                        <li>Canary embed & XML wrap</li>
                      </ul>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-white font-semibold">2. Forward to Gemini</span>
                      <span className="px-1.5 py-0.5 bg-white/10 rounded text-[10px]">gemini-2.5-pro</span>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">3. Scan Response</p>
                      <p className="text-xs text-zinc-500 pl-2">• Check for canary leak</p>
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">4. Store & Return</p>
                      <ul className="list-disc list-inside text-xs pl-2 space-y-1 text-zinc-500">
                        <li>Update history</li>
                        <li>200 OK + AI Response</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </Step>
          </div>

        </div>
      </div>
    </section>
  );
}

function Step({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function Connector({ delay = 0 }: { delay?: number }) {
  return (
    <div className="relative flex flex-col items-center justify-center my-2 h-8">
      <motion.div
        initial={{ height: 0 }}
        whileInView={{ height: "100%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.3, delay }}
        className="w-px bg-white/20 relative overflow-hidden"
      >
        <motion.div 
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-white to-transparent opacity-70"
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: delay }}
        />
      </motion.div>
      <motion.div 
         initial={{ opacity: 0 }}
         whileInView={{ opacity: 1 }}
         viewport={{ once: true }}
         transition={{ delay: delay + 0.2 }}
         className="absolute bottom-0 translate-y-1/2 z-10"
      >
         <ArrowDown className="w-3 h-3 text-zinc-600" />
      </motion.div>
    </div>
  );
}

function JudgeCard({ title, icon: Icon, desc, details, action }: { title: string, icon: any, desc: string, details: string[], action: string }) {
  return (
    <div className="border border-white/10 bg-zinc-900/30 p-5 rounded-xl flex flex-col h-full hover:border-white/30 transition-colors">
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 bg-white/5 rounded-lg">
          <Icon className="w-5 h-5 text-zinc-300" />
        </div>
        <h4 className="font-bold text-sm text-zinc-200">{title}</h4>
      </div>
      <p className="text-xs text-zinc-400 mb-3 min-h-[2.5em]">{desc}</p>
      <div className="flex-1">
        <ul className="space-y-1 mb-4">
          {details.map((d, i) => (
            <li key={i} className="text-[11px] text-zinc-500 font-mono flex items-start gap-2">
              <span className="text-zinc-700">•</span>
              {d}
            </li>
          ))}
        </ul>
      </div>
      <div className="pt-3 border-t border-white/5">
        <p className="text-xs font-bold text-red-400/80">{action}</p>
      </div>
    </div>
  );
}