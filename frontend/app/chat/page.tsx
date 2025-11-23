"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, ShieldCheck, Terminal, AlertTriangle, Lock, Brain, Search, Eye, ArrowLeft, ShieldAlert } from "lucide-react";
import { sendChat, ChatResponse, ChatError } from "@/lib/api";
import CursorSpotlight from "@/components/ui/CursorSpotlight";

// Types for the Council Visualization
type JudgeStatus = "idle" | "analyzing" | "safe" | "unsafe";

interface JudgeState {
  id: number;
  name: string;
  icon: any;
  status: JudgeStatus;
  verdict?: string;
}

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<{ role: "user" | "ai"; content: string; isError?: boolean }[]>([
    { role: "ai", content: "System initialized. Cerberus is active. How can I assist you safely?" },
  ]);
  
  // Council State
  const [judges, setJudges] = useState<JudgeState[]>([
    { id: 1, name: "Literal Judge", icon: Search, status: "idle" },
    { id: 2, name: "Intent Judge", icon: Brain, status: "idle" },
    { id: 3, name: "Canary Judge", icon: Eye, status: "idle" },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userPrompt = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userPrompt }]);
    setIsLoading(true);

    // Reset Judges to Analyzing
    setJudges((prev) => prev.map((j) => ({ ...j, status: "analyzing", verdict: undefined })));

    try {
      const data = await sendChat(userPrompt);
      
      // Update judges based on the actual backend response
      if (data.verdict) {
        setJudges((prev) => prev.map((j) => {
          let status: JudgeStatus = "idle";
          if (j.id === 1) status = data.verdict.literal === "safe" ? "safe" : "unsafe";
          if (j.id === 2) status = data.verdict.intent === "safe" ? "safe" : "unsafe";
          if (j.id === 3) status = data.verdict.canary === "safe" ? "safe" : "unsafe";
          return { ...j, status };
        }));
      } else if (data.security_check === "passed") {
        setJudges((prev) => prev.map((j) => ({ ...j, status: "safe", verdict: "PASSED" })));
      }
      
      setMessages((prev) => [...prev, { role: "ai", content: data.response }]);
    } catch (error: any) {
      console.error("Chat error:", error);
      
      // If it's a security block (403), show red judges based on verdict if available
      if (error.detail?.error === "Request blocked by security system" || error.detail?.error === "Response blocked by security system") {
         if (error.detail.verdict) {
            setJudges((prev) => prev.map((j) => {
              let status: JudgeStatus = "idle";
              if (j.id === 1) status = error.detail.verdict.literal === "safe" ? "safe" : "unsafe";
              if (j.id === 2) status = error.detail.verdict.intent === "safe" ? "safe" : "unsafe";
              if (j.id === 3) status = error.detail.verdict.canary === "safe" ? "safe" : "unsafe";
              return { ...j, status };
            }));
         } else {
            // Fallback if no detailed verdict
            setJudges((prev) => prev.map((j) => ({ ...j, status: "unsafe", verdict: "BLOCKED" })));
         }
         setMessages((prev) => [...prev, { role: "ai", content: error.detail.message, isError: true }]);
      } else {
         // Generic error
         setJudges((prev) => prev.map((j) => ({ ...j, status: "idle" })));
         setMessages((prev) => [...prev, { role: "ai", content: "An unexpected error occurred.", isError: true }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-200 flex flex-col font-sans selection:bg-white/20 overflow-hidden">
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
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="text-xs text-zinc-400 font-mono tracking-wider">SYSTEM ONLINE</span>
          </div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden z-10">
        {/* Main Chat Area */}
        <main className="flex-1 flex flex-col relative">
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-5 rounded-2xl backdrop-blur-md ${
                    msg.role === "user"
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
          <div className="p-6 bg-gradient-to-t from-black to-transparent">
            <div className="max-w-4xl mx-auto relative bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
              <div className="pl-4">
                <Terminal className="w-5 h-5 text-zinc-500" />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Enter command or prompt..."
                disabled={isLoading}
                className="flex-1 bg-transparent border-none text-white placeholder-zinc-600 focus:ring-0 focus:outline-none py-3 px-2 font-mono text-sm"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="p-3 rounded-xl bg-white text-black hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </main>

        {/* The Council Sidebar (Desktop) */}
        <aside className="w-80 border-l border-white/10 bg-black/40 backdrop-blur-xl hidden lg:flex flex-col p-6 gap-6">
          <div className="text-center">
            <h2 className="text-white font-bold text-lg tracking-widest uppercase mb-1 font-sans">The Council</h2>
            <p className="text-xs text-zinc-500 font-mono">SECURITY OVERSIGHT</p>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {judges.map((judge) => (
              <div 
                key={judge.id}
                className={`relative overflow-hidden rounded-xl border p-4 transition-all duration-500 ${
                  judge.status === "analyzing" ? "border-white/40 bg-white/5" :
                  judge.status === "safe" ? "border-white/20 bg-white/5" :
                  judge.status === "unsafe" ? "border-white bg-white/10" :
                  "border-white/5 bg-transparent"
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${
                    judge.status === "analyzing" ? "bg-white/10 text-white" :
                    judge.status === "safe" ? "bg-white/10 text-zinc-300" :
                    judge.status === "unsafe" ? "bg-white text-black" :
                    "bg-zinc-900 text-zinc-600"
                  }`}>
                    <judge.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-bold text-sm ${judge.status === 'unsafe' ? 'text-white' : 'text-zinc-300'}`}>{judge.name}</div>
                    <div className="text-[10px] font-mono text-zinc-500 uppercase">{judge.status}</div>
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
          <div className={`p-4 rounded-xl border transition-all duration-500 ${
            isLoading ? "bg-zinc-900/50 border-white/10" :
            judges.some(j => j.status === "unsafe") ? "bg-white text-black border-white" :
            judges.some(j => j.status === "safe") ? "bg-zinc-900/50 border-white/20" :
            "bg-zinc-900/30 border-white/5"
          }`}>
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-mono tracking-wider ${
                judges.some(j => j.status === "unsafe") ? "text-black/70" : "text-zinc-500"
              }`}>FINAL VERDICT</span>
              {judges.some(j => j.status === "unsafe") ? (
                <ShieldAlert className="w-4 h-4" />
              ) : (
                <ShieldCheck className={`w-4 h-4 ${
                  judges.some(j => j.status === "safe") ? "text-white" : "text-zinc-600"
                }`} />
              )}
            </div>
            
            <div className="text-xl font-bold tracking-tight">
              {isLoading ? (
                <span className="animate-pulse">ANALYZING...</span>
              ) : judges.some(j => j.status === "unsafe") ? (
                "ACCESS DENIED"
              ) : judges.some(j => j.status === "safe") ? (
                "ACCESS GRANTED"
              ) : (
                "AWAITING INPUT"
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
