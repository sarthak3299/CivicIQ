"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/userStore";
import { generateJourney } from "@/lib/journeyEngine";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { i18nCopy } from "@/lib/i18n";

export default function JourneyPage() {
  const router = useRouter();
  const { profile, journeySteps, setJourneySteps, language } = useUserStore();
  const t = i18nCopy[language];
  const [isGenerating, setIsGenerating] = useState(true);
  const [revealedSteps, setRevealedSteps] = useState(0);

  useEffect(() => {
    // Generate journey from profile
    const timer = setTimeout(() => {
      const steps = generateJourney(profile);
      setJourneySteps(steps);
      setIsGenerating(false);

      // Stagger reveal steps
      steps.forEach((_, i) => {
        setTimeout(() => setRevealedSteps((prev) => prev + 1), (i + 1) * 200);
      });
    }, 2000);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const completed = journeySteps.filter((s) => s.status === "completed").length;
  const total = journeySteps.length;

  const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
    registration: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/20" },
    verification: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20" },
    preparation: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/20" },
    voting: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/20" },
    "post-voting": { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/20" },
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto py-10">
      {/* Header */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 mb-8 shadow-lg shadow-primary/5">
          <Sparkles className="h-4 w-4 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-primary">
            {profile.state ? `Personalized for ${profile.state}` : "Your Intelligence Roadmap"}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">{t.journeyTitle}</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg leading-relaxed">
          {t.journeySub}
        </p>
      </div>

      {!isGenerating && (
        <div className="neo-panel p-6 mb-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Progress Score", value: `${total > 0 ? Math.round((completed / total) * 100) : 0}%` },
              { label: "Completed Steps", value: `${completed}/${total}` },
              { label: "Estimated Effort", value: "15-25 mins/day" },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 hover-lift">
                <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</p>
                <p className="text-2xl text-white font-bold font-heading mt-1">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isGenerating && (
        <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 rounded-full border-4 border-primary/10" />
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin" />
            <div className="absolute inset-4 rounded-full border-4 border-transparent border-t-secondary animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
            <Sparkles className="absolute inset-0 m-auto h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-heading font-bold text-white mb-2">Generating your journey...</h3>
          <p className="text-slate-500 font-medium tracking-wide">Analyzing constitutional protocols for {profile.state || "India"}...</p>

          {/* Skeleton steps */}
          <div className="w-full max-w-2xl mt-12 space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 rounded-3xl bg-white/[0.02] border border-white/[0.04] animate-pulse" />
            ))}
          </div>
        </div>
      )}

      {/* Journey Steps */}
      {!isGenerating && (
        <div className="animate-fade-in">
          {/* Summary */}
          <div className="glass-card p-8 mb-12 flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold text-white">
                {total} steps in your journey
              </h3>
              <p className="text-slate-400 font-medium mt-1">
                {completed} completed • {total - completed} remaining
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-2 w-48 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary shadow-lg shadow-primary/40 transition-all duration-1000"
                  style={{ width: `${total > 0 ? (completed / total) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xl font-bold text-primary font-heading">
                {total > 0 ? Math.round((completed / total) * 100) : 0}%
              </span>
            </div>
          </div>

          {/* Steps timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary via-primary/20 to-transparent" />

            <div className="space-y-6">
              {journeySteps.map((step, index) => {
                const colors = categoryColors[step.category] || categoryColors.preparation;
                const isRevealed = index < revealedSteps;

                return (
                  <div
                    key={step.id}
                    className={cn(
                      "relative pl-16 transition-all duration-700 ease-out",
                      isRevealed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    )}
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-[14px] top-8 z-10">
                      {step.status === "completed" ? (
                        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-4 ring-[#0B1220]">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-slate-900 border-2 border-primary/40 flex items-center justify-center shadow-lg ring-4 ring-[#0B1220]">
                          <span className="text-xs font-bold text-primary">{index + 1}</span>
                        </div>
                      )}
                    </div>

                    {/* Step card */}
                    <div
                      className={cn(
                        "p-6 rounded-3xl border transition-all duration-500 group",
                        step.status === "completed"
                          ? "bg-emerald-500/[0.02] border-emerald-500/10"
                          : "glass-card hover:border-primary/20 hover:bg-white/[0.04]"
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={cn("text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full", colors.bg, colors.text)}>
                              {step.category}
                            </span>
                            {step.status === "completed" && (
                              <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                                Verified Complete
                              </span>
                            )}
                          </div>
                          <h4 className="text-xl font-bold text-white mt-4 font-heading group-hover:text-primary transition-colors">
                            {step.icon} {step.title}
                          </h4>
                          <p className="text-slate-400 mt-2 leading-relaxed text-sm">{step.details}</p>
                          <div className="flex items-center gap-4 mt-6">
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-slate-500" />
                              {step.estimatedTime}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-20">
            <button
              onClick={() => router.push("/dashboard")}
              className="btn-primary px-12 h-16 text-lg shadow-xl shadow-primary/20"
            >
              <span className="font-bold">{t.enterDashboard}</span>
              <ArrowRight className="h-6 w-6 ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
