"use client";

import { useState } from "react";
import { Vote, CheckCircle, Info, RotateCcw, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
}

interface Race {
  id: string;
  title: string;
  subtitle: string;
  type: "single" | "yes-no";
  candidates?: Candidate[];
  description?: string;
}

const races: Race[] = [
  {
    id: "lok-sabha",
    title: "Parliamentary Constituency (Lok Sabha)",
    subtitle: "Select one candidate to represent you in the Lower House",
    type: "single",
    candidates: [
      { id: "c1", name: "Aarav Sharma", party: "National Progress Party", symbol: "🌸" },
      { id: "c2", name: "Priya Patel", party: "Social Unity Alliance", symbol: "🌿" },
      { id: "c3", name: "Rahul Verma", party: "Economic Development Front", symbol: "⭐" },
      { id: "c4", name: "Fatima Begum", party: "Independent", symbol: "🔔" },
      { id: "nota", name: "NOTA", party: "None of the Above", symbol: "❌" },
    ],
  },
  {
    id: "vidhan-sabha",
    title: "Assembly Constituency (Vidhan Sabha)",
    subtitle: "Select one candidate for the State Legislature",
    type: "single",
    candidates: [
      { id: "v1", name: "Suresh Kumar", party: "National Progress Party", symbol: "🌸" },
      { id: "v2", name: "Meena Devi", party: "Social Unity Alliance", symbol: "🌿" },
      { id: "v3", name: "Arjun Singh", party: "Regional Heritage Party", symbol: "🪷" },
      { id: "nota-v", name: "NOTA", party: "None of the Above", symbol: "❌" },
    ],
  },
];

export default function SimulatorPage() {
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showVVPAT, setShowVVPAT] = useState(false);
  const { completeStep } = useUserStore();

  const handleSelect = (raceId: string, candidateId: string) => {
    if (isSubmitted) return;
    setSelections((prev) => ({ ...prev, [raceId]: candidateId }));
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowVVPAT(true);
    try {
      completeStep("understand-evm");
    } catch {
      // Ignore if step not found
    }
  };

  const handleReset = () => {
    setSelections({});
    setIsSubmitted(false);
    setShowVVPAT(false);
  };

  const totalRaces = races.length;
  const filledRaces = Object.keys(selections).length;

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-600/10 border border-emerald-600/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck className="h-3.5 w-3.5" />
            Voter Confidence Lab
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight font-heading">EVM & VVPAT Simulator</h1>
          <p className="text-slate-400 max-w-lg leading-relaxed">
            Experience the actual Indian voting procedure in a safe, mock environment. Understand how your vote is recorded and verified.
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
          
          {/* Main Ballot Area */}
          <div className="xl:col-span-8 space-y-8">
            {races.map((race) => (
              <div key={race.id} className="glass-card overflow-hidden">
                <div className="p-6 border-b border-white/[0.06] bg-white/[0.01] flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white font-heading">{race.title}</h2>
                    <p className="text-xs text-slate-500 mt-1">{race.subtitle}</p>
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500 text-xs font-bold">
                    EVM
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  {race.candidates?.map((candidate) => {
                    const isSelected = selections[race.id] === candidate.id;
                    return (
                      <button
                        key={candidate.id}
                        onClick={() => handleSelect(race.id, candidate.id)}
                        disabled={isSubmitted}
                        className={cn(
                          "w-full flex items-center gap-6 p-4 rounded-xl border transition-all duration-200 text-left",
                          isSelected
                            ? "border-primary bg-primary/10 ring-1 ring-primary/20"
                            : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12] hover:bg-white/[0.04]",
                          isSubmitted && !isSelected && "opacity-40"
                        )}
                      >
                        <div className={cn(
                          "w-12 h-12 rounded-lg flex items-center justify-center border-2 transition-all shadow-inner",
                          isSelected ? "bg-primary border-primary shadow-primary/40" : "bg-slate-900 border-slate-700"
                        )}>
                          {isSelected && <div className="w-4 h-4 bg-white rounded-full animate-pulse shadow-lg" />}
                        </div>
                        <div className="text-3xl grayscale-[0.5] group-hover:grayscale-0">{candidate.symbol}</div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white text-base">{candidate.name}</div>
                          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{candidate.party}</div>
                        </div>
                        <div className="h-12 w-12 rounded-lg border-2 border-slate-800 bg-slate-900/50 flex items-center justify-center text-[10px] font-bold text-slate-600">
                          {isSelected ? "ON" : "OFF"}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Control Panel / Instructions */}
          <div className="xl:col-span-4 space-y-8">
            <div className="glass-card p-8 space-y-6 sticky top-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Info className="h-5 w-5 text-amber-400" />
                </div>
                <h3 className="font-bold text-white font-heading">How it works</h3>
              </div>
              
              <ul className="space-y-6 text-sm text-slate-400 leading-relaxed">
                <li className="flex gap-4">
                  <span className="font-bold text-primary">01</span>
                  <span>Select your candidate by clicking the ballot row on the unit.</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary">02</span>
                  <span>Verify your selection on the VVPAT module (simulated after submission).</span>
                </li>
                <li className="flex gap-4">
                  <span className="font-bold text-primary">03</span>
                  <span>Once finished, click the primary action button to record your mock vote.</span>
                </li>
              </ul>

              <div className="pt-8 border-t border-white/[0.06] space-y-4">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-widest px-2">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-primary">{filledRaces}/{totalRaces} Selected</span>
                </div>
                {!isSubmitted ? (
                  <button
                    onClick={handleSubmit}
                    disabled={filledRaces === 0}
                    className={cn(
                      "w-full btn-primary h-14 flex items-center justify-center gap-2",
                      filledRaces === 0 && "opacity-30 grayscale cursor-not-allowed shadow-none"
                    )}
                  >
                    <Vote className="h-5 w-5" /> Cast Mock Ballot
                  </button>
                ) : (
                  <button onClick={handleReset} className="w-full btn-ghost h-14 flex items-center justify-center gap-2">
                    <RotateCcw className="h-4 w-4" /> Reset Simulator
                  </button>
                )}
                <p className="text-[10px] text-center text-slate-600 font-medium mt-4">
                  🔒 Secure local simulation. No data is transmitted.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* VVPAT Success Modal */}
      {showVVPAT && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[100] flex items-center justify-center p-6" onClick={() => setShowVVPAT(false)}>
          <div className="max-w-lg w-full animate-fade-in" onClick={e => e.stopPropagation()}>
            <div className="glass-card p-10 text-center border-emerald-500/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500 animate-pulse" />
              <div className="w-20 h-20 mx-auto mb-8 rounded-3xl bg-emerald-500/10 flex items-center justify-center shadow-xl shadow-emerald-500/10">
                <CheckCircle className="h-10 w-10 text-emerald-400" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4 font-heading">VVPAT Verified</h2>
              <p className="text-slate-400 text-base leading-relaxed mb-8 px-6">
                Your vote has been successfully recorded in the control unit. In a real booth, you would now see your slip printed for 7 seconds.
              </p>

              <div className="space-y-3 mb-10 text-left">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Verification Records</div>
                {Object.entries(selections).map(([raceId, candidateId]) => {
                  const race = races.find(r => r.id === raceId);
                  const candidate = race?.candidates?.find(c => c.id === candidateId);
                  return (
                    <div key={raceId} className="flex items-center justify-between p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-xs font-bold text-slate-500 uppercase">{raceId.replace("-", " ")}</span>
                      <span className="text-sm font-bold text-white">{candidate?.symbol} {candidate?.name}</span>
                    </div>
                  );
                })}
              </div>

              <button onClick={() => setShowVVPAT(false)} className="btn-primary w-full h-14">
                Done & View Dashboard
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
