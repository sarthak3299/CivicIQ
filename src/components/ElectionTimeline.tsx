"use client";

import { useState } from "react";
import { ChevronRight, Clock, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  category: "registration" | "campaigning" | "voting" | "counting" | "results";
  status: "past" | "current" | "upcoming";
  citizenAction: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "t1",
    title: "Election Announced",
    date: "Date - 45 Days",
    description: "The Election Commission announces election dates and the Model Code of Conduct comes into effect. No new government schemes can be announced.",
    category: "registration",
    status: "past",
    citizenAction: "Check your name in the electoral roll. If not registered, apply immediately via NVSP portal or Voter Helpline App.",
  },
  {
    id: "t2",
    title: "Nomination Filing",
    date: "Date - 30 Days",
    description: "Candidates file their nomination papers with the Returning Officer. Affidavits with criminal records, assets, and educational qualifications are made public.",
    category: "registration",
    status: "past",
    citizenAction: "Research candidates at myneta.info and review their affidavits. Compare criminal records and asset declarations.",
  },
  {
    id: "t3",
    title: "Scrutiny & Withdrawal",
    date: "Date - 25 Days",
    description: "Nomination papers are scrutinized. Candidates can withdraw within 2 days. Final list of contesting candidates is published.",
    category: "campaigning",
    status: "past",
    citizenAction: "Check the final list of candidates and their election symbols. Attend local debates and rallies (maintaining social distance).",
  },
  {
    id: "t4",
    title: "Campaign Period",
    date: "Date - 20 Days",
    description: "Active campaigning by political parties. Rallies, door-to-door campaigns, and media advertisements. Must stop 48 hours before polling.",
    category: "campaigning",
    status: "current",
    citizenAction: "Attend public meetings, compare manifestos, verify claims. Report MCC violations using cVIGIL app. Don't fall for fake news!",
  },
  {
    id: "t5",
    title: "Campaign Silence",
    date: "Date - 2 Days",
    description: "All campaigning stops 48 hours before polling. No opinion polls or exit polls. This is the 'silent period' for voters to reflect.",
    category: "voting",
    status: "upcoming",
    citizenAction: "Prepare your Voter ID and know your polling booth address. Plan your voting time. Make sure you have valid photo ID.",
  },
  {
    id: "t6",
    title: "Polling Day",
    date: "Election Day",
    description: "Voting takes place from 7 AM to 6 PM. EVMs and VVPATs are used. Indelible ink is applied. Election day is a paid holiday.",
    category: "voting",
    status: "upcoming",
    citizenAction: "Carry EPIC/valid photo ID. Go to your assigned polling booth. Press the button for your chosen candidate. Verify on VVPAT. Exercise your democratic right!",
  },
  {
    id: "t7",
    title: "Vote Counting",
    date: "Date + 3 Days",
    description: "EVMs are stored in strong rooms under security. On counting day, votes are tallied constituency by constituency. VVPAT slips of 5 random machines are verified.",
    category: "counting",
    status: "upcoming",
    citizenAction: "Track live results on https://results.eci.gov.in. Watch the counting process unfold. Results are usually out within the same day.",
  },
  {
    id: "t8",
    title: "Results Declared",
    date: "Date + 3 Days",
    description: "The candidate with the most votes wins (FPTP system). The party/coalition with majority is invited to form the government.",
    category: "results",
    status: "upcoming",
    citizenAction: "Accept the democratic mandate. Hold your elected representatives accountable. Engage with local governance. Your civic duty continues!",
  },
];

const categoryColors = {
  registration: { bg: "bg-blue-500/10", text: "text-blue-400", border: "border-blue-500/30", dot: "bg-blue-500" },
  campaigning: { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/30", dot: "bg-amber-500" },
  voting: { bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", dot: "bg-emerald-500" },
  counting: { bg: "bg-purple-500/10", text: "text-purple-400", border: "border-purple-500/30", dot: "bg-purple-500" },
  results: { bg: "bg-yellow-500/10", text: "text-yellow-400", border: "border-yellow-500/30", dot: "bg-yellow-500" },
};

export function ElectionTimeline() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="w-full">
      {/* Horizontal scrollable timeline */}
      <div className="overflow-x-auto pb-6 -mx-2 px-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
        <div className="flex gap-4 min-w-max">
          {timelineEvents.map((event, index) => {
            const colors = categoryColors[event.category];
            const isExpanded = expandedId === event.id;

            return (
              <div key={event.id} className="flex items-start gap-0">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : event.id)}
                  className={cn(
                    "relative flex flex-col w-[200px] p-5 rounded-2xl border transition-all duration-300 text-left",
                    "hover:scale-[1.02] hover:bg-white/[0.04]",
                    event.status === "current"
                      ? "border-primary/50 bg-primary/10 shadow-lg shadow-primary/10 ring-1 ring-primary/20"
                      : "border-white/[0.06] bg-white/[0.02] hover:border-white/[0.12]",
                    isExpanded && "ring-2 ring-primary/30"
                  )}
                >
                  {/* Status dot */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={cn("w-2.5 h-2.5 rounded-full", colors.dot, event.status === "current" && "animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.5)]")} />
                    <span className={cn("text-[10px] font-bold uppercase tracking-widest", colors.text)}>
                      {event.category}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2 leading-tight font-heading">{event.title}</h4>
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 mb-3 uppercase tracking-wider">
                    <Clock className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{event.description}</p>

                  <div className="mt-4 flex items-center gap-1 text-[10px] text-primary font-bold uppercase tracking-widest group">
                    <span>View Protocol</span>
                    <ChevronRight className={cn("h-3 w-3 transition-transform group-hover:translate-x-0.5", isExpanded && "rotate-90")} />
                  </div>
                </button>

                {/* Connector line */}
                {index < timelineEvents.length - 1 && (
                  <div className="flex items-center h-full pt-10">
                    <div className={cn(
                      "w-8 h-[2px]",
                      event.status === "past" ? "bg-primary/40" : "bg-white/[0.06]"
                    )} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Expanded detail card */}
      {expandedId && (
        <div className="mt-6 p-8 rounded-3xl glass-card animate-fadeInUp border-primary/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
          {(() => {
            const event = timelineEvents.find((e) => e.id === expandedId)!;
            const colors = categoryColors[event.category];
            return (
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <div className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-2", colors.text)}>
                      {event.category} — {event.date}
                    </div>
                    <h3 className="text-2xl font-heading font-bold text-white">{event.title}</h3>
                  </div>
                  <button 
                    onClick={() => setExpandedId(null)} 
                    className="w-10 h-10 rounded-full bg-white/[0.04] border border-white/5 flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-base text-slate-300 leading-relaxed max-w-2xl">{event.description}</p>
                <div className={cn("p-6 rounded-2xl border backdrop-blur-md shadow-lg", colors.bg, colors.border.replace("border-", "border-"))}>
                  <div className={cn("text-[10px] font-bold uppercase tracking-[0.2em] mb-4 flex items-center gap-2", colors.text)}>
                    <TrendingUp className="h-4 w-4" /> Strategic Citizen Action
                  </div>
                  <p className="text-slate-100 font-medium leading-relaxed">{event.citizenAction}</p>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
