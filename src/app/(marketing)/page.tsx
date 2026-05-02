"use client";

import Link from "next/link";
import { ArrowRight, Shield, Target, Sparkles, Bot, Vote, Landmark, BadgeCheck, Fingerprint } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-6 pt-32 pb-20 overflow-hidden bg-saas-gradient">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full -z-10" />
        <div className="absolute inset-0 election-mesh opacity-30 -z-10" />
        
        <div className={cn(
          "relative z-10 max-w-5xl mx-auto text-center space-y-8",
          mounted ? "animate-fade-in" : "opacity-0"
        )}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-indigo-500/20 shadow-lg shadow-indigo-500/5">
            <Sparkles className="h-4 w-4 text-indigo-400" />
            <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest">Trusted Civic Guidance</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.1] text-white font-heading">
            Understand your <span className="text-gradient">Vote.</span><br />
            Own your <span className="text-primary">Democracy.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            CivicGuide AI transforms complex election laws into a <span className="text-white font-semibold">personalized, step-by-step roadmap</span>. Built for the modern Indian voter.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Link href="/onboarding" className="btn-primary flex items-center gap-2 group text-lg px-8">
              Start Your Voting Journey
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/dashboard" className="btn-secondary text-lg px-8">
              Explore Platform
            </Link>
          </div>

          {/* Trust Metrics */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">960M+</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Eligible Voters</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">100%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Non-Partisan</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">Real-time</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">ECI Verified</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-white">Secure</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mt-1">Privacy First</span>
            </div>
          </div>

          {/* 3D icon cluster */}
          <div className="pt-14 flex items-center justify-center">
            <div className="relative h-40 w-40">
              <div className="absolute inset-0 rounded-full border border-white/10 bg-white/[0.03] backdrop-blur-xl animate-tilt" />
              <div className="absolute inset-[34%] icon-3d flex items-center justify-center">
                <Vote className="h-8 w-8 text-primary" />
              </div>
              <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/40 animate-glow-pulse" />
              <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-orbit">
                <div className="icon-3d h-6 w-6 flex items-center justify-center"><Shield className="h-3.5 w-3.5 text-emerald-300" /></div>
              </div>
              <div className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 [animation:orbit_12s_linear_infinite_reverse]">
                <div className="icon-3d h-6 w-6 flex items-center justify-center"><Landmark className="h-3.5 w-3.5 text-amber-300" /></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-6 py-32 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-heading">Everything you need for a confident vote</h2>
            <p className="text-slate-400 max-w-xl mx-auto">
              A practical set of tools to help you register, verify facts, and vote with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-10 glass-card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-primary/5">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-heading">Personalized Roadmap</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                No more generic manuals. Get exact steps for registration, address updates, and booth identification tailored to your profile.
              </p>
            </div>

            <div className="glass-card p-10 glass-card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-emerald-600/5">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-heading">Fact Check Assistant</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quickly verify election rumors and viral claims using official references and trusted civic sources.
              </p>
            </div>

            <div className="glass-card p-10 glass-card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-all duration-500 shadow-xl shadow-purple-600/5">
                <Bot className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 font-heading">Journey Assistant</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A context-aware AI that knows your progress. Ask &ldquo;What should I do next?&rdquo; and get real, actionable guidance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Features */}
      <section className="px-6 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-5xl font-bold text-white font-heading">Designed to make election learning exciting</h2>
            <p className="text-slate-400 max-w-3xl mx-auto mt-4">
              Professional UX, smart progress feedback, and immersive visuals keep citizens engaged from registration to polling day.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BadgeCheck, title: "Daily Mission Mode", text: "Complete short civic missions every day and build a confidence streak before election day." },
              { icon: Fingerprint, title: "Identity Readiness", text: "Understand EPIC, acceptable ID proofs, and booth workflows with guided checkpoints." },
              { icon: Landmark, title: "Election Lifecycle View", text: "Explore every phase of the Indian election process using contextual actions and timelines." },
            ].map((feature) => (
              <div key={feature.title} className="neo-panel p-6 hover-lift">
                <div className="icon-3d h-12 w-12 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white font-heading mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration/Simulator Preview */}
      <section className="px-6 py-32 bg-saas-gradient border-y border-white/[0.04]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
              Live Simulation
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Master the EVM before you reach the booth.
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Our high-fidelity simulator replicates the Indian voting experience, including VVPAT verification and NOTA protocols. Reduce anxiety, vote with confidence.
            </p>
            <Link href="/simulator" className="btn-secondary inline-flex items-center gap-2 group">
              Launch Simulator <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          <div className="relative">
            <div className="saas-card p-8 border-indigo-500/20 shadow-2xl shadow-indigo-500/10 animate-float">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Vote className="h-6 w-6 text-indigo-400" />
                  <span className="font-bold text-white">Mock EVM Ballot</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold tracking-widest">READY</div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-4 rounded-xl border border-white/[0.06] bg-white/[0.02] flex items-center justify-between">
                    <div className="h-2 w-32 bg-white/10 rounded-full" />
                    <div className="w-8 h-8 rounded-lg bg-indigo-600/40" />
                  </div>
                ))}
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-600/20 blur-[40px] rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-purple-600/20 blur-[40px] rounded-full -z-10" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-20 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-xl">CivicIQ</span>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              Helping voters navigate elections through clear, personalized civic guidance.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                <li><Link href="/journey" className="hover:text-white transition-colors">Roadmap</Link></li>
                <li><Link href="/simulator" className="hover:text-white transition-colors">Simulator</Link></li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li><Link href="/fact-check" className="hover:text-white transition-colors">Fact Check</Link></li>
                <li><Link href="/flashcards" className="hover:text-white transition-colors">Learn</Link></li>
                <li><Link href="/assistant" className="hover:text-white transition-colors">AI Assistant</Link></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
          <span>&copy; 2026 CivicGuide AI. Non-Partisan Platform.</span>
          <span>Not affiliated with ECI. Built for Citizens.</span>
        </div>
      </footer>
    </div>
  );
}
