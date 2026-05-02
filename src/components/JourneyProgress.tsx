"use client";

import { cn } from "@/lib/utils";
import { JourneyStep } from "@/store/userStore";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";

interface JourneyProgressProps {
  steps: JourneyStep[];
  compact?: boolean;
}

export function JourneyProgress({ steps, compact = false }: JourneyProgressProps) {
  const completed = steps.filter((s) => s.status === "completed").length;
  const total = steps.length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest font-heading">
            {completed} / {total} Strategic Milestones
          </span>
          <span className="text-xs font-bold text-primary font-heading tracking-tight">{pct}%</span>
        </div>
        <div className="h-2 rounded-full bg-white/[0.06] overflow-hidden relative">
          <div
            className="h-full rounded-full bg-primary shadow-[0_0_12px_rgba(56,189,248,0.4)] transition-all duration-1000 ease-out"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Step list */}
      <div className="space-y-1.5">
        {steps.map((step) => (
          <div
            key={step.id}
            className={cn(
              "flex items-center gap-4 py-2.5 px-4 rounded-xl transition-all border border-transparent",
              step.status === "completed" && "opacity-40 grayscale-[0.5]",
              step.status === "in-progress" && "bg-primary/5 border-primary/20 shadow-lg shadow-primary/5",
              compact && "py-2"
            )}
          >
            {/* Status icon */}
            <div className="flex-shrink-0">
              {step.status === "completed" ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              ) : step.status === "in-progress" ? (
                <Loader2 className="h-4 w-4 text-primary animate-spin" />
              ) : (
                <Circle className="h-4 w-4 text-slate-700" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <span
                className={cn(
                  "text-[13px] truncate block font-medium",
                  step.status === "completed"
                    ? "text-slate-500 line-through"
                    : step.status === "in-progress"
                    ? "text-white font-bold"
                    : "text-slate-500"
                )}
              >
                {step.icon} {step.title}
              </span>
            </div>

            {/* Category badge */}
            {!compact && (
              <span
                className={cn(
                  "text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg flex-shrink-0 border",
                  step.category === "registration" && "text-blue-400 bg-blue-500/5 border-blue-500/10",
                  step.category === "verification" && "text-amber-400 bg-amber-500/5 border-amber-500/10",
                  step.category === "education" && "text-purple-400 bg-purple-500/5 border-purple-500/10",
                  step.category === "polling" && "text-emerald-400 bg-emerald-500/5 border-emerald-500/10"
                )}
              >
                {step.category}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
