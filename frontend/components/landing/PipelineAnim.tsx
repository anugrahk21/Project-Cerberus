"use client";

import { motion } from "framer-motion";
import { Search, Brain, Eye, ShieldCheck } from "lucide-react";

export default function PipelineAnim() {
  return (
    <section className="py-32 relative overflow-hidden bg-slate-950/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            The Security Pipeline
          </h2>
          <p className="text-slate-400">
            Every request passes through the Council of Three.
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto h-[500px] flex items-center justify-between px-4 md:px-10">
          {/* Background Lines (SVG) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
            {/* Top Path */}
            <path
              d="M 100 250 C 300 250 300 100 500 100 L 900 100"
              fill="none"
              stroke="currentColor"
              className="text-cyan-500"
              strokeWidth="2"
            />
            {/* Middle Path */}
            <path
              d="M 100 250 L 900 250"
              fill="none"
              stroke="currentColor"
              className="text-cyan-500"
              strokeWidth="2"
            />
            {/* Bottom Path */}
            <path
              d="M 100 250 C 300 250 300 400 500 400 L 900 400"
              fill="none"
              stroke="currentColor"
              className="text-cyan-500"
              strokeWidth="2"
            />
          </svg>

          {/* User Node */}
          <div className="relative z-10 hidden md:block">
            <div className="w-20 h-20 rounded-full bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-[0_0_30px_rgba(0,0,0,0.5)]">
              <span className="text-slate-300 font-mono font-bold">USER</span>
            </div>
          </div>

          {/* Judges Column */}
          <div className="relative z-10 flex flex-col gap-12 md:gap-24 mx-auto md:mx-0">
            {/* Judge 1 */}
            <div className="w-64 p-6 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-200">Judge 1: Literal</div>
                <div className="text-xs text-slate-500">Scanning Keywords...</div>
              </div>
            </div>

            {/* Judge 2 */}
            <div className="w-64 p-6 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                <Brain className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-200">Judge 2: Intent</div>
                <div className="text-xs text-slate-500">Analyzing Semantics...</div>
              </div>
            </div>

            {/* Judge 3 */}
            <div className="w-64 p-6 rounded-xl bg-slate-900/90 border border-slate-700 backdrop-blur-xl flex items-center gap-4 shadow-xl">
              <div className="p-3 rounded-lg bg-amber-500/10 text-amber-400">
                <Eye className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-slate-200">Judge 3: Canary</div>
                <div className="text-xs text-slate-500">Checking Leakage...</div>
              </div>
            </div>
          </div>

          {/* AI Node */}
          <div className="relative z-10 hidden md:block">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-cyan-900 to-slate-900 border border-cyan-500/50 flex flex-col items-center justify-center shadow-[0_0_50px_rgba(34,211,238,0.2)]">
              <ShieldCheck className="w-10 h-10 text-cyan-400 mb-2" />
              <span className="text-cyan-100 font-bold text-sm">Gemini Pro</span>
            </div>
          </div>

          {/* Animated Particles (CSS Animation for simplicity and performance) */}
          <style jsx>{`
            @keyframes travel-top {
              0% { offset-distance: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            @keyframes travel-middle {
              0% { offset-distance: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            @keyframes travel-bottom {
              0% { offset-distance: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { offset-distance: 100%; opacity: 0; }
            }
            .particle-top {
              offset-path: path('M 100 250 C 300 250 300 100 500 100 L 900 100');
              animation: travel-top 4s linear infinite;
            }
            .particle-middle {
              offset-path: path('M 100 250 L 900 250');
              animation: travel-middle 4s linear infinite;
              animation-delay: 0.2s;
            }
            .particle-bottom {
              offset-path: path('M 100 250 C 300 250 300 400 500 400 L 900 400');
              animation: travel-bottom 4s linear infinite;
              animation-delay: 0.4s;
            }
          `}</style>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none hidden md:block">
            <div className="particle-top w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] absolute" />
            <div className="particle-middle w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] absolute" />
            <div className="particle-bottom w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)] absolute" />
          </div>

        </div>
      </div>
    </section>
  );
}
