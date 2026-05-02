"use client";

import { useUserStore } from "@/store/userStore";
import { BookOpen, CheckCircle2, Lock, PlayCircle, Trophy, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

export function LearningCenter() {
  const { learningModules, updateLearningModule } = useUserStore();

  const handleStartModule = (id: string) => {
    // Mocking progress for demonstration
    updateLearningModule(id, 25);
  };

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <div className="glass-card p-8 bg-primary/5 border-primary/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16 rounded-full" />
        <div className="flex items-center justify-between mb-8 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Trophy className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white font-heading">Civic Mastery Index</h3>
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em] mt-1 font-bold">Voter Qualification Program</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary font-heading">
              {learningModules.filter(m => m.status === "completed").length}/{learningModules.length}
            </div>
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Modules Verified</div>
          </div>
        </div>
        
        {/* Overall Progress Bar */}
        <div className="h-2.5 w-full bg-white/[0.04] rounded-full overflow-hidden relative z-10">
          <div 
            className="h-full bg-primary shadow-lg shadow-primary/40 transition-all duration-1000 ease-out" 
            style={{ width: `${(learningModules.filter(m => m.status === "completed").length / learningModules.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Modules List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {learningModules.map((module, i) => {
          const isLocked = module.status === "locked";
          const isCompleted = module.status === "completed";
          const isAvailable = module.status === "available";

          return (
            <div
              key={module.id}
              className={cn(
                "glass-card p-6 transition-all duration-300 group",
                isLocked ? "opacity-40 grayscale" : "hover:bg-white/[0.04] border-primary/10",
                isAvailable && "bg-primary/[0.02] border-primary/20 ring-1 ring-primary/10 shadow-lg shadow-primary/5"
              )}
            >
              <div className="flex items-start justify-between mb-8">
                <div className={cn(
                  "w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg",
                  isCompleted ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                  isAvailable ? "bg-primary text-white scale-110 shadow-primary/20" : "bg-slate-900/50 text-slate-500 border border-white/[0.06]"
                )}>
                  {isCompleted ? <CheckCircle2 className="h-6 w-6" /> : 
                   isLocked ? <Lock className="h-5 w-5" /> : 
                   <BookOpen className="h-6 w-6 group-hover:scale-110 transition-transform" />}
                </div>
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] font-heading">Protocol 0{i + 1}</span>
              </div>

              <h4 className="text-lg font-bold text-white mb-3 font-heading group-hover:text-primary transition-colors">{module.title}</h4>
              <p className="text-sm text-slate-400 leading-relaxed mb-8 line-clamp-2 font-medium">
                {module.description}
              </p>

              <div className="space-y-4 pt-6 border-t border-white/[0.06]">
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span className="text-slate-500">Learning Progress</span>
                  <span className={cn(isCompleted ? "text-emerald-400" : "text-primary")}>{module.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/[0.04] rounded-full overflow-hidden">
                  <div 
                    className={cn("h-full transition-all duration-700", isCompleted ? "bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-primary shadow-lg shadow-primary/20")} 
                    style={{ width: `${module.progress}%` }}
                  />
                </div>
                
                {isAvailable && (
                  <button
                    onClick={() => handleStartModule(module.id)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-primary hover:text-white hover:bg-primary rounded-xl transition-all border border-primary/20 mt-4 shadow-lg shadow-primary/5 hover:shadow-primary/20"
                  >
                    <PlayCircle className="h-4 w-4" /> Initialize Learning
                  </button>
                )}
                {isCompleted && (
                  <div className="flex items-center justify-center gap-2 py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 bg-emerald-500/5 rounded-xl border border-emerald-500/10 mt-4">
                    <BarChart3 className="h-4 w-4" /> Certification Validated
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
