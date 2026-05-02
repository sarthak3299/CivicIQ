"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import { generateJourney } from "@/lib/journeyEngine";
import { ReadinessRing } from "@/components/ReadinessRing";
import { ElectionTimeline } from "@/components/ElectionTimeline";
import { NextStepsPanel } from "@/components/NextStepsPanel";
import { LearningCenter } from "@/components/LearningCenter";
import { DigitalEPIC } from "@/components/DigitalEPIC";
import { NotificationCenter } from "@/components/NotificationCenter";
import { 
  Bot, ShieldCheck, Layers, Vote, ArrowRight, ArrowUpRight, Sparkles, 
  TrendingUp, BookOpen, CreditCard, HelpCircle, Landmark, MapPinned, Zap, Users
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { i18nCopy } from "@/lib/i18n";

export default function DashboardPage() {
  const {
    profile,
    journeySteps,
    setJourneySteps,
    readinessScore,
    completeStep,
    startStep,
    recalculateReadiness,
    language,
    setLanguage,
  } = useUserStore();
  const t = i18nCopy[language];

  const [activeTab, setActiveTab] = useState<"journey" | "learning" | "id">("journey");

  useEffect(() => {
    if (journeySteps.length === 0) {
      const steps = generateJourney(profile);
      setJourneySteps(steps);
    }
    recalculateReadiness();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const faqs = [
    { q: "Can I vote without a physical Voter ID?", a: "Yes, you can use any of the 12 approved identity documents (Aadhar, PAN, etc.) if your name is in the electoral roll." },
    { q: "What is the age limit for registration?", a: "You must be 18 years old on or before the qualifying date (usually Jan 1st, April 1st, July 1st, or Oct 1st)." },
    { q: "How do I check my polling booth?", a: "Use the ECI Voter Portal or the 'Booth Locator' feature in our Journey roadmap." },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Header Section */}
      <header className="mb-12 animate-fadeIn">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-primary text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/5 w-fit px-4 py-1.5 rounded-full border border-primary/20 shadow-sm shadow-primary/10">
              <Sparkles className="h-3 w-3" />
              <span>{t.dashboardBadge}</span>
            </div>
            <h1 className="text-5xl font-bold tracking-tight text-white font-heading leading-tight">
              {t.dashboardWelcome}, <span className="text-gradient font-heading">{profile.name?.split(' ')[0] || "Citizen"}</span>
            </h1>
            <p className="text-slate-400 text-sm font-medium max-w-lg leading-relaxed">
              {t.dashboardSub}
            </p>
          </div>
          <div className="flex items-center gap-6">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as "en" | "hi")}
              className="h-10 rounded-xl border border-white/10 bg-white/[0.04] px-3 text-xs text-white outline-none"
            >
              <option value="en" className="bg-slate-900">English</option>
              <option value="hi" className="bg-slate-900">Hindi</option>
            </select>
            <div className="relative group">
              <NotificationCenter />
            </div>
            <div className="h-12 w-px bg-white/10 hidden md:block" />
            <div className="flex items-center gap-4 bg-white/[0.03] p-2.5 pr-6 rounded-2xl border border-white/[0.08] shadow-inner backdrop-blur-md group hover:border-primary/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-sky-400 flex items-center justify-center text-sm font-bold text-white shadow-xl shadow-primary/20 group-hover:scale-110 transition-transform">
                {profile.name?.[0] || "V"}
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest font-heading">Account Status</span>
                <span className="text-xs font-bold text-emerald-400 tracking-tight">Verified Voter</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Experience Strip */}
      <section className="mb-10">
        <div className="neo-panel relative overflow-hidden p-6 md:p-8">
          <div className="absolute inset-0 election-mesh opacity-60" />
          <div className="absolute -top-20 -right-20 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-16 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary">
                <Zap className="h-3.5 w-3.5" />
                Election Momentum
              </div>
              <h2 className="text-2xl md:text-3xl text-white font-bold font-heading max-w-2xl leading-tight">
                Make election learning interactive with daily missions, visual milestones, and real-world civic actions.
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { icon: Landmark, label: "Mission Streak", value: "7 Days" },
                  { icon: Users, label: "Civic Concepts", value: "18 Learned" },
                  { icon: MapPinned, label: "Booth Readiness", value: "92%" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 hover-lift">
                    <div className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                      <item.icon className="h-4 w-4" />
                    </div>
                    <p className="text-[10px] uppercase tracking-widest text-slate-400 font-bold">{item.label}</p>
                    <p className="text-lg font-bold text-white font-heading">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-4 flex items-center justify-center">
              <div className="relative h-48 w-48 animate-float-slow">
                <div className="absolute inset-0 rounded-[2.5rem] border border-white/15 bg-white/[0.03] backdrop-blur-xl animate-tilt" />
                <div className="absolute inset-8 icon-3d flex items-center justify-center">
                  <Vote className="h-12 w-12 text-primary drop-shadow-[0_8px_20px_rgba(59,130,246,0.55)]" />
                </div>
                <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/30 animate-glow-pulse" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column (Readiness & Context) */}
        <section className="lg:col-span-4 space-y-10 animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
          {/* Readiness Card */}
          <div className="glass-card p-10 flex flex-col items-center justify-center text-center relative overflow-hidden group border-primary/10 shadow-lg shadow-primary/5">
            <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <ReadinessRing score={readinessScore} />
            <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Live Preparedness Index
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-5">
            <div className="glass-card p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/[0.08]">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 font-heading">Constituency</h4>
              <p className="text-xl font-bold text-white tracking-tight font-heading">{profile.state || "National"}</p>
            </div>
            <div className="glass-card p-6 bg-white/[0.02] hover:bg-white/[0.04] transition-colors border-white/[0.08]">
              <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3 font-heading">Electoral Age</h4>
              <p className="text-xl font-bold text-emerald-400 tracking-tight font-heading">{profile.isEligibleAge ? "Validated" : "Pending"}</p>
            </div>
          </div>

          {/* High Impact Tools */}
          <div className="glass-card p-8 border-white/[0.08]">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3 font-heading">
              <div className="w-1.5 h-6 bg-primary rounded-full" />
              Quick Tools
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <Link href="/fact-check" className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </div>
                <ShieldCheck className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block font-heading">Fact Check</span>
                <span className="text-[9px] text-slate-500 font-medium mt-1 block">Verify Information</span>
              </Link>
              <Link href="/assistant" className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </div>
                <Bot className="h-6 w-6 text-sky-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block font-heading">AI Assistant</span>
                <span className="text-[9px] text-slate-500 font-medium mt-1 block">Ask Questions</span>
              </Link>
              <Link href="/flashcards" className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </div>
                <Layers className="h-6 w-6 text-secondary mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block font-heading">Flashcards</span>
                <span className="text-[9px] text-slate-500 font-medium mt-1 block">Learn Faster</span>
              </Link>
              <Link href="/simulator" className="p-5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] hover:border-primary/30 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3 w-3 text-primary" />
                </div>
                <Vote className="h-6 w-6 text-emerald-400 mb-3 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-white block font-heading">EVM Simulator</span>
                <span className="text-[9px] text-slate-500 font-medium mt-1 block">Practice Voting</span>
              </Link>
            </div>
          </div>

          {/* FAQ Sidebar Section */}
          <div className="glass-card p-8 border-white/[0.08] bg-card/10">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mb-8 flex items-center gap-3 font-heading">
              <HelpCircle className="h-4 w-4 text-primary" /> FAQ
            </h3>
            <div className="space-y-6">
              {faqs.map((f, i) => (
                <div key={i} className="group cursor-help border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                  <p className="text-xs font-bold text-white group-hover:text-primary transition-colors mb-2 font-heading tracking-tight">{f.q}</p>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium italic">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Right Column (Content Tabs) */}
        <section className="lg:col-span-8 space-y-10 animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
          
          {/* Main Tab Controller */}
          <div className="flex items-center gap-3 p-1.5 bg-white/[0.03] rounded-2xl border border-white/[0.08] w-fit shadow-inner backdrop-blur-md">
            {[
              { id: "journey", label: "Journey Roadmap", icon: ArrowRight },
              { id: "learning", label: "Learning Center", icon: BookOpen },
              { id: "id", label: "Digital EPIC", icon: CreditCard },
            ].map((tab) => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "journey" | "learning" | "id")}
                className={cn(
                  "flex items-center gap-3 px-6 py-3 rounded-xl text-xs font-bold transition-all font-heading uppercase tracking-widest",
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-xl shadow-primary/20 scale-105" 
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                )}
              >
                <tab.icon className={cn("h-4 w-4", activeTab === tab.id ? "text-white" : "text-slate-500")} />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Rendering */}
          <div className="animate-fadeIn min-h-[600px]">
            {activeTab === "journey" && (
              <div className="space-y-10">
                <NextStepsPanel steps={journeySteps} onComplete={completeStep} onStart={startStep} />
                <div className="glass-card p-10 mt-10 border-primary/5 bg-card/20 shadow-xl shadow-black/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 px-2">
                    <div className="space-y-1">
                      <h3 className="text-2xl font-bold text-white font-heading tracking-tight">Election Timeline</h3>
                      <p className="text-xs text-slate-500 font-medium">Aligned with standard ECI election stages</p>
                    </div>
                    <span className="text-[10px] font-bold text-primary border border-primary/20 bg-primary/5 px-4 py-1.5 rounded-full uppercase tracking-widest h-fit">Typical Cycle: 45 Days</span>
                  </div>
                  <ElectionTimeline />
                </div>
              </div>
            )}

            {activeTab === "learning" && (
              <div className="space-y-10">
                <LearningCenter />
                <div className="glass-card p-10 bg-emerald-500/[0.02] border-emerald-500/10 shadow-lg shadow-emerald-500/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-emerald-500/10 transition-colors duration-1000" />
                  <div className="flex items-center gap-6 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shadow-2xl shadow-emerald-500/10 group-hover:scale-110 transition-transform">
                      <Sparkles className="h-8 w-8 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white font-heading tracking-tight">Certification Excellence</h4>
                      <p className="text-sm text-slate-400 font-medium leading-relaxed mt-1">Complete all modules to unlock your &ldquo;Master Elector&rdquo; achievement badge.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "id" && (
              <div className="flex flex-col items-center justify-center space-y-16 py-10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-primary to-sky-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <DigitalEPIC />
                </div>
                <div className="glass-card p-10 max-w-xl w-full border-white/[0.08] bg-card/20 shadow-2xl shadow-black/40">
                  <div className="flex items-center gap-3 mb-8">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <h4 className="text-sm font-bold text-white font-heading uppercase tracking-widest">Security & Verification Notes</h4>
                  </div>
                  <div className="space-y-6">
                    {[
                      { icon: ShieldCheck, text: "Your digital EPIC is generated from your verified profile details for easy reference." },
                      { icon: TrendingUp, text: "Use it to prepare for booth lookup and election-day readiness activities." },
                      { icon: HelpCircle, text: "Carry your physical EPIC card or another approved ID document on polling day." },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5 items-start group">
                        <div className="h-10 w-10 rounded-xl bg-white/[0.04] flex items-center justify-center flex-shrink-0 border border-white/5 group-hover:border-primary/30 transition-all group-hover:bg-primary/5">
                          <item.icon className="h-4 w-4 text-slate-500 group-hover:text-primary transition-colors" />
                        </div>
                        <p className="text-[13px] text-slate-400 leading-relaxed font-medium group-hover:text-slate-200 transition-colors pt-2">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
