"use client";

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, Clock, ArrowRight, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { JourneyStep } from "@/store/userStore";

interface NextStepsPanelProps {
  steps: JourneyStep[];
  onComplete: (stepId: string) => void;
  onStart: (stepId: string) => void;
}

export function NextStepsPanel({ steps, onComplete, onStart }: NextStepsPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(
    steps.find(s => s.status === "in-progress")?.id || steps[0]?.id || null
  );

  const pendingSteps = steps.filter((s) => s.status !== "completed");

  if (pendingSteps.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center glass-card p-10 shadow-lg shadow-emerald-500/5">
        <div className="w-20 h-20 rounded-3xl bg-emerald-500/10 flex items-center justify-center mb-8 shadow-xl shadow-emerald-500/10 border border-emerald-500/20">
          <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3 font-heading">Election Readiness: 100%</h3>
        <p className="text-slate-400 max-w-xs leading-relaxed text-sm font-medium">Great job. You have completed every step and are fully prepared for election day.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {steps.map((step, index) => {
        const isExpanded = expandedId === step.id;
        const isInProgress = step.status === "in-progress";
        const isCompleted = step.status === "completed";
        const isLocked = !isCompleted && !isInProgress && index > 0 && steps[index-1].status !== "completed";

        return (
          <div
            key={step.id}
            className={cn(
              "glass-card overflow-hidden transition-all duration-300",
              isExpanded ? "border-primary/30 bg-primary/5 ring-1 ring-primary/20 shadow-lg shadow-primary/5" : "hover:bg-white/[0.04]",
              isLocked && "opacity-40 grayscale-[0.5]"
            )}
          >
            {/* Step Header */}
            <button
              onClick={() => !isLocked && setExpandedId(isExpanded ? null : step.id)}
              disabled={isLocked}
              className="w-full flex items-center gap-6 p-6 text-left group"
            >
              {/* Icon Container */}
              <div className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all",
                isCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : 
                isInProgress ? "bg-primary text-white shadow-xl shadow-primary/20 scale-110" : 
                "bg-slate-900/50 text-slate-500 border border-white/[0.06]"
              )}>
                {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : 
                 isLocked ? <Lock className="h-5 w-5" /> :
                 <span className="text-xl group-hover:scale-110 transition-transform">{step.icon}</span>}
              </div>

              {/* Title & Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <h4 className={cn(
                    "text-base font-bold truncate font-heading",
                    isCompleted ? "text-slate-500 line-through" : "text-white"
                  )}>
                    {step.title}
                  </h4>
                  {isInProgress && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-primary border border-primary/20 bg-primary/5 px-2.5 py-1 rounded-full animate-pulse-subtle">
                      In Progress
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {step.estimatedTime}
                  </div>
                  <span className="w-1 h-1 rounded-full bg-slate-700" />
                  <span className="text-primary/70">{step.category}</span>
                </div>
              </div>

              {/* Action/Chevron */}
              {!isLocked && (
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center group-hover:bg-white/[0.08] transition-all">
                  {isExpanded ? (
                    <ChevronUp className="h-4 w-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              )}
            </button>

            {/* Step Details (Accordion) */}
            {isExpanded && !isLocked && (
              <div className="px-6 pb-8 border-t border-white/[0.04] bg-white/[0.01] animate-fade-in">
                <div className="pt-8">
                  <p className="text-sm text-slate-300 leading-relaxed mb-8 whitespace-pre-line font-medium">
                    {step.details}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    {step.status !== "in-progress" && !isCompleted && (
                      <button
                        onClick={() => onStart(step.id)}
                        className="btn-primary flex items-center justify-center gap-2 font-bold px-8"
                      >
                        Start Step <ArrowRight className="h-4 w-4" />
                      </button>
                    )}
                    {!isCompleted ? (
                      <button
                        onClick={() => onComplete(step.id)}
                        className={cn(
                          "flex-1 py-4 px-8 rounded-2xl text-sm font-bold transition-all flex items-center justify-center gap-2",
                          isInProgress 
                            ? "bg-emerald-500 hover:bg-emerald-400 text-white shadow-xl shadow-emerald-500/20"
                            : "btn-ghost border-white/[0.08]"
                        )}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        Mark as Complete
                      </button>
                    ) : (
                      <div className="text-emerald-400 text-xs font-bold uppercase tracking-widest flex items-center gap-2 py-4 px-4 bg-emerald-500/5 rounded-2xl border border-emerald-500/10">
                        <CheckCircle2 className="h-5 w-5" />
                        Step Completed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
