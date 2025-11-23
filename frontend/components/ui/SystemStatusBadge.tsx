"use client";

import { useSystemStatus } from "@/hooks/useSystemStatus";

interface SystemStatusBadgeProps {
  status?: boolean;
  className?: string;
  suffix?: string;
}

export default function SystemStatusBadge({ status, className = "", suffix = "" }: SystemStatusBadgeProps) {
  const { isSystemOnline } = useSystemStatus();
  
  // Use provided status if available, otherwise use the hook's state
  const isOnline = status !== undefined ? status : isSystemOnline;

  return (
    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border transition-colors ${
      isOnline 
        ? "bg-green-500/10 border-green-500/20" 
        : "bg-red-500/10 border-red-500/20"
    } ${className}`}>
      <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${
        isOnline ? "bg-green-500" : "bg-red-500"
      }`} />
      <span className={`text-xs font-mono tracking-wider ${
        isOnline ? "text-green-400" : "text-red-400"
      }`}>
        {isOnline ? "SYSTEM ONLINE" : "SYSTEM OFFLINE"}{suffix}
      </span>
    </div>
  );
}
