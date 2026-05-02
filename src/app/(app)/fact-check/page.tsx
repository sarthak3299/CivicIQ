"use client";

import { useState } from "react";
import { ShieldCheck, Search, CheckCircle, XCircle, AlertTriangle, Info, ExternalLink, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkFact, getPopularClaims, FactCheckResult } from "@/lib/factChecker";

const verdictConfig = {
  TRUE: { icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", label: "Verified True" },
  FALSE: { icon: XCircle, color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", label: "False" },
  MISLEADING: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20", label: "Misleading" },
  PARTIALLY_TRUE: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20", label: "Partially True" },
};

export default function FactCheckPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<FactCheckResult | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const popularClaims = getPopularClaims();

  const handleCheck = (text?: string) => {
    const claim = text || query.trim();
    if (!claim) return;

    setQuery(claim);
    setIsChecking(true);
    setHasSearched(true);
    setResult(null);

    setTimeout(() => {
      const factResult = checkFact(claim);
      setResult(factResult);
      setIsChecking(false);
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCheck();
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            Civic Guard Shield
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight font-heading">Election Fact Checker</h1>
          <p className="text-slate-400 max-w-lg leading-relaxed">
            Verify election rumors, legal claims, and WhatsApp forwards instantly using verified ECI data and RPA constitutional frameworks.
          </p>
        </div>

        {/* Search Input Area */}
        <div className="relative mb-12">
          <form onSubmit={handleSubmit} className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-primary transition-colors" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a claim or rumor to verify... (e.g., 'Can I vote online?')"
              className="w-full h-18 pl-16 pr-44 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-500 text-lg focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all shadow-xl shadow-black/20"
            />
            <button
              type="submit"
              disabled={!query.trim() || isChecking}
              className="absolute right-3 top-1/2 -translate-y-1/2 btn-primary px-8 h-12 text-sm"
            >
              {isChecking ? "Verifying..." : "Check Claim"}
            </button>
          </form>
        </div>

        {/* Result Area */}
        {isChecking && (
          <div className="glass-card p-12 flex flex-col items-center justify-center space-y-6">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
              <ShieldCheck className="absolute inset-0 m-auto h-6 w-6 text-primary" />
            </div>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest animate-pulse">Consulting Official ECI Protocols...</p>
          </div>
        )}

        {result && !isChecking && (
          <div className="animate-fade-in">
            {(() => {
              const config = verdictConfig[result.verdict];
              const Icon = config.icon;
              return (
                <div className={cn("glass-card p-8 border-l-4", config.border.replace("border-", "border-l-"))}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
                    <div className="flex items-center gap-4">
                      <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg", config.bg)}>
                        <Icon className={cn("h-8 w-8", config.color)} />
                      </div>
                      <div>
                        <div className={cn("text-xl font-bold uppercase tracking-tight font-heading", config.color)}>{config.label}</div>
                        <div className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">Election Claim Verification</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-3xl font-bold text-white font-heading">{result.confidence}%</span>
                      <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Confidence Score</span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.04]">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Claim Analyzed</h4>
                      <p className="text-white font-medium italic text-lg">&ldquo;{result.claim}&rdquo;</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Verification Details</h4>
                      <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{result.explanation}</p>
                    </div>

                    <div className="pt-6 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4 text-slate-500" />
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Source: {result.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* Popular Claims - Empty State Replacement */}
        {!hasSearched && (
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-4 px-2">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-heading">Common Election Rumors</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {popularClaims.map((claim, i) => {
                const config = verdictConfig[claim.verdict as keyof typeof verdictConfig];
                const Icon = config.icon;
                return (
                  <button
                    key={i}
                    onClick={() => handleCheck(claim.claim)}
                    className="glass-card p-6 glass-card-hover text-left flex gap-4 group"
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110", config.bg)}>
                      <Icon className={cn("h-6 w-6", config.color)} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white group-hover:text-primary transition-colors line-clamp-2">{claim.claim}</p>
                      <span className={cn("text-[10px] font-bold uppercase tracking-widest mt-2 inline-block opacity-60", config.color)}>
                        {claim.verdict}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
