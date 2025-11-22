import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  color?: string;
};

export default function Spotlight({ className, color = "255,255,255" }: SpotlightProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 flex items-center justify-center",
        className
      )}
    >
      <div className="relative w-[75vw] max-w-[1200px] aspect-square">
        <div
          className="absolute inset-0 rounded-full blur-[140px] opacity-60 animate-corePulse"
          style={{
            background: `radial-gradient(circle, rgba(${color},0.45) 0%, rgba(${color},0.15) 45%, transparent 70%)`,
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-[220px] opacity-30 animate-wavePulse"
          style={{
            background: `radial-gradient(circle, rgba(${color},0.25) 0%, transparent 65%)`,
          }}
        />
      </div>
    </div>
  );
}
