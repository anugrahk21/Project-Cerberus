/*
Project Cerberus: The AI Iron Dome
Version: 2.0
----------------------------------
Author: Anugrah K.
Role: Frontend Architecture & UI/UX
Description: The Chat Interface - Main interaction point for users.
             Handles message history, rate limiting, and real-time council visualization.
Note: Built for AI Cybersecurity Research Portfolio.
*/

"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Terminal, AlertTriangle, Lock, ArrowLeft, ShieldAlert, ChevronDown } from "lucide-react";
import CursorSpotlight from "@/components/ui/CursorSpotlight";
import SystemStatusBadge from "@/components/ui/SystemStatusBadge";
import { useSystemStatus } from "@/hooks/useSystemStatus";
import { useCouncil } from "@/hooks/useCouncil";
import { useRateLimit } from "@/hooks/useRateLimit";
import { useChat } from "@/hooks/useChat";

export default function ChatPage() {
  const { isSystemOnline, isLoading: isStatusLoading } = useSystemStatus();
  const [showScrollHint, setShowScrollHint] = useState(true);

  // Custom Hooks
  const council = useCouncil();
  const rateLimit = useRateLimit();
  const { input, setInput, isLoading, messages, setMessages, handleSend } = useChat(council, rateLimit);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const councilRef = useRef<HTMLElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (!isLoading) {
      inputRef.current?.focus();
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowScrollHint(!entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (councilRef.current) {
      observer.observe(councilRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!isStatusLoading && messages.length === 0) {
      setMessages([{
        role: "ai",
        content: isSystemOnline
          ? "System initialized. Cerberus is active. How can I assist you safely?"
          : "System unreachable. The backend server appears to be offline. Please check your connection.",
        isError: !isSystemOnline
      }]);
    }
  }, [isSystemOnline, isStatusLoading, setMessages]);

  return (
    <div className="lg:h-screen min-h-screen bg-black text-zinc-200 flex flex-col font-sans selection:bg-white/20 lg:overflow-hidden">
      <CursorSpotlight />

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none z-0" />

      {/* Glass Header */}
      <header className="h-16 border-b border-white/10 flex items-center px-6 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="p-2 bg-white/5 rounded-lg border border-white/10 group-hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight text-white font-sans">PROJECT CERBERUS</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <SystemStatusBadge status={isSystemOnline} />
        </div>
      </header>

      <div className="flex flex-col lg:flex-row lg:overflow-hidden z-10 lg:flex-1">
        {/* Main Chat Area */}
        <main className="w-full flex flex-col relative h-[calc(100dvh-64px)] lg:flex-1 lg:h-auto lg:min-h-0 overflow-hidden">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-5 rounded-2xl backdrop-blur-md ${msg.role === "user"
                    ? "bg-white text-black border border-white/20 rounded-tr-none"
                    : msg.isError
                      ? "bg-zinc-900 border border-white/20 text-white rounded-tl-none"
                      : "bg-zinc-900/50 border border-white/10 text-zinc-300 rounded-tl-none"
                    }`}
                >
                  {msg.isError && <AlertTriangle className="w-5 h-5 mb-2 text-white" />}
                  <p className="leading-relaxed font-mono text-sm">{msg.content}</p>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="bg-zinc-900/50 border border-white/10 p-4 rounded-2xl rounded-tl-none flex gap-2 items-center">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce delay-200" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="shrink-0 p-6 bg-gradient-to-t from-black to-transparent">
            {/* Mobile Scroll Hint */}
            <AnimatePresence>
              {showScrollHint && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="lg:hidden flex justify-center mb-4"
                >
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-white/10 backdrop-blur-md animate-bounce">
                    <span className="text-[10px] font-mono text-zinc-400 tracking-wider">SCROLL FOR VERDICT</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="max-w-4xl mx-auto relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              <div className="pl-4">
                <Terminal className="w-5 h-5 text-zinc-500" />
              </div>
              {rateLimit.hasReachedLimit ? (
                <div className="flex-1 py-3 px-2 font-mono text-sm text-left text-white/70 leading-snug whitespace-normal">
                  Free tier exhausted – Cerberus is on a coffee break.
                </div>
              ) : (
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder={
                    isSystemOnline
                      ? "Enter command or prompt..."
                      : "System offline - connection required"
                  }
                  disabled={isLoading || !isSystemOnline}
                  autoFocus
                  className="flex-1 bg-transparent border-none text-white placeholder-zinc-600 focus:ring-0 focus:outline-none py-3 px-2 font-mono text-sm"
                />
              )}
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim() || !isSystemOnline || rateLimit.hasReachedLimit}
                className="p-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="max-w-4xl mx-auto mt-2 text-[10px] font-mono text-zinc-500 text-center">
              {rateLimit.hasReachedLimit ? "Free quota reached for today." : `${rateLimit.remainingPrompts} of ${3} free prompts left.`}
            </p>
          </div>
        </main>

        {/* The Council Sidebar (Desktop & Mobile) */}
        <aside ref={councilRef} className="w-full lg:w-80 border-t lg:border-t-0 lg:border-l border-white/10 bg-black/40 backdrop-blur-xl flex flex-col p-6 gap-6 shrink-0">
          <div className="text-center">
            <h2 className="text-white font-bold text-lg tracking-widest uppercase mb-1 font-sans">The Council</h2>
            <p className="text-xs text-zinc-500 font-mono">SECURITY OVERSIGHT</p>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {council.judges.map((judge) => (
              <div
                key={judge.id}
                className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${judge.status === "analyzing" ? "border-white/40 bg-white/5" :
                  judge.status === "safe" ? "border-green-500/30 bg-green-500/10" :
                    judge.status === "unsafe" ? "border-red-500/50 bg-red-500/10" :
                      "border-white/5 bg-transparent"
                  }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${judge.status === "analyzing" ? "bg-white/10 text-white" :
                    judge.status === "safe" ? "bg-green-500/20 text-green-400" :
                      judge.status === "unsafe" ? "bg-red-500/20 text-red-400" :
                        "bg-zinc-900 text-zinc-600"
                    }`}>
                    <judge.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${judge.status === 'unsafe' ? 'text-red-400' :
                      judge.status === 'safe' ? 'text-green-400' :
                        'text-zinc-300'
                      }`}>{judge.name}</div>
                    <div className={`text-[10px] font-mono uppercase ${judge.status === 'unsafe' ? 'text-red-500/70' :
                      judge.status === 'safe' ? 'text-green-500/70' :
                        'text-zinc-500'
                      }`}>{judge.status}</div>
                  </div>
                </div>

                {/* Scanning Effect */}
                {judge.status === "analyzing" && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-[200%] animate-[shimmer_2s_infinite] -skew-x-12" />
                )}
              </div>
            ))}
          </div>

          {/* Final Verdict */}
          <div className={`p-4 rounded-xl border transition-all duration-500 ${isLoading ? "bg-zinc-900/50 border-white/10" :
            council.judges.some(j => j.status === "unsafe") ? "bg-red-950/30 border-red-500/50" :
              council.judges.some(j => j.status === "safe") ? "bg-green-950/30 border-green-500/50" :
                "bg-zinc-900/30 border-white/5"
            }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono tracking-wider ${council.judges.some(j => j.status === "unsafe") ? "text-red-400" :
                council.judges.some(j => j.status === "safe") ? "text-green-400" :
                  "text-zinc-500"
                }`}>FINAL VERDICT</span>
              {council.judges.some(j => j.status === "unsafe") ? (
                <ShieldAlert className="w-4 h-4 text-red-500" />
              ) : (
                <ShieldCheck className={`w-4 h-4 ${council.judges.some(j => j.status === "safe") ? "text-green-500" : "text-zinc-600"
                  }`} />
              )}
            </div>

            <div className={`text-xl font-bold tracking-tight ${council.judges.some(j => j.status === "unsafe") ? "text-red-500" :
              council.judges.some(j => j.status === "safe") ? "text-green-500" :
                "text-white"
              }`}>
              {isLoading ? (
                <span className="animate-pulse text-white">ANALYZING...</span>
              ) : council.judges.some(j => j.status === "unsafe") ? (
                "ACCESS DENIED"
              ) : council.judges.some(j => j.status === "safe") ? (
                "ACCESS GRANTED"
              ) : (
                "AWAITING INPUT"
              )}
            </div>
          </div>
        </aside>
      </div>

      <AnimatePresence>
        {rateLimit.showLimitModal && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center px-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => rateLimit.setShowLimitModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl border border-white/10 bg-zinc-900/90 p-6 text-center space-y-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white text-lg font-bold tracking-tight">Cerberus Coffee Break</h3>
              <p className="text-sm text-zinc-400 leading-relaxed whitespace-pre-line">{rateLimit.limitMessage}</p>
              <p className="text-xs font-mono text-zinc-500">Only {3} free prompts are allowed per day.</p>
              <button
                onClick={() => rateLimit.setShowLimitModal(false)}
                className="w-full rounded-xl bg-white text-black py-3 font-semibold hover:bg-zinc-200 transition-colors"
              >
                I'll be back later
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
