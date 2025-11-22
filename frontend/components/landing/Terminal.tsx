"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const logs = [
  { type: "WARN", msg: "IP 192.168.1.5 attempted Prompt Injection.", color: "text-yellow-400" },
  { type: "BLOCK", msg: "Judge 2 detected 'DAN Mode'.", color: "text-red-500" },
  { type: "INFO", msg: "Request ID #9021 Blocked (403).", color: "text-blue-400" },
  { type: "INFO", msg: "System initialized. Monitoring active.", color: "text-green-400" },
  { type: "WARN", msg: "Suspicious payload detected in packet #402.", color: "text-yellow-400" },
  { type: "BLOCK", msg: "Judge 1 detected banned keyword 'ignore'.", color: "text-red-500" },
  { type: "INFO", msg: "Canary token verified in response stream.", color: "text-green-400" },
  { type: "WARN", msg: "Rate limit approaching for IP 10.0.0.4.", color: "text-yellow-400" },
];

export default function Terminal() {
  const [lines, setLines] = useState<typeof logs>([]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setLines((prev) => {
        const newLines = [...prev, logs[index % logs.length]];
        if (newLines.length > 6) newLines.shift();
        return newLines;
      });
      index++;
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 px-4 bg-black/40 border-t border-white/5">
      <div className="container mx-auto max-w-4xl">
        <div className="rounded-lg overflow-hidden border border-slate-800 bg-[#0c0c0c] shadow-2xl">
          {/* Terminal Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <TerminalIcon className="w-4 h-4 text-slate-400" />
              <span className="text-xs font-mono text-slate-400">cerberus-watchdog --live</span>
            </div>
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-4 font-mono text-sm h-[240px] overflow-hidden flex flex-col justify-end">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-1"
              >
                <span className="text-slate-500">[{new Date().toLocaleTimeString()}]</span>{" "}
                <span className={line.color}>[{line.type}]</span>{" "}
                <span className="text-slate-300">{line.msg}</span>
              </motion.div>
            ))}
            <div>
                <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
                className="w-2 h-4 bg-cyan-500 inline-block align-middle ml-1"
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
