import { useState } from 'react';
import { Brain, Eye, Search, LucideIcon } from 'lucide-react';

export type JudgeStatus = "idle" | "analyzing" | "safe" | "unsafe";

export interface JudgeState {
    id: number;
    name: string;
    icon: LucideIcon;
    status: JudgeStatus;
    verdict?: string;
}

export interface Verdict {
    literal: "safe" | "unsafe" | "error";
    intent: "safe" | "unsafe" | "error";
    canary: "safe" | "unsafe" | "error";
}

export const useCouncil = () => {
    const [judges, setJudges] = useState<JudgeState[]>([
        { id: 1, name: "Literal Judge", icon: Search, status: "idle" },
        { id: 2, name: "Intent Judge", icon: Brain, status: "idle" },
        { id: 3, name: "Canary Judge", icon: Eye, status: "idle" },
    ]);

    const resetCouncil = () => {
        setJudges((prev) => prev.map((j) => ({ ...j, status: "analyzing", verdict: undefined })));
    };

    const updateCouncil = (verdict: Verdict) => {
        if (verdict) {
            setJudges((prev) => prev.map((j) => {
                let status: JudgeStatus = "idle";
                if (j.id === 1) status = verdict.literal === "safe" ? "safe" : "unsafe";
                if (j.id === 2) status = verdict.intent === "safe" ? "safe" : "unsafe";
                if (j.id === 3) status = verdict.canary === "safe" ? "safe" : "unsafe";
                return { ...j, status };
            }));
        }
    };

    const setAllStatus = (status: JudgeStatus, verdictLabel?: string) => {
        setJudges((prev) => prev.map((j) => ({ ...j, status, verdict: verdictLabel })));
    };

    return { judges, resetCouncil, updateCouncil, setAllStatus };
};
