"use client";

import { useUserStore } from "@/store/userStore";
import { Shield, QrCode, User, Calendar, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export function DigitalEPIC() {
  const { profile } = useUserStore();

  return (
    <div className="relative group perspective max-w-md w-full">
      {/* Front of Card */}
      <div className="glass-card w-full aspect-[1.6/1] p-0 overflow-hidden relative shadow-2xl transition-all duration-700 preserve-3d group-hover:rotate-y-6 hover:shadow-primary/10 border-white/[0.08]">
        {/* Header Ribbon */}
        <div className="bg-primary h-14 flex items-center justify-between px-6 shadow-lg shadow-primary/20">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-white" />
            <span className="text-[10px] font-bold text-white uppercase tracking-[0.2em] font-heading">Election Commission Digital Twin</span>
          </div>
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
        </div>

        {/* Content */}
        <div className="p-8 flex gap-8">
          {/* Photo Placeholder */}
          <div className="w-28 h-36 bg-slate-900/50 rounded-xl border border-white/10 flex flex-col items-center justify-center relative overflow-hidden group-hover:border-primary/30 transition-colors">
            <User className="h-14 w-14 text-slate-700" />
            <div className="absolute bottom-0 inset-x-0 h-1.5 bg-primary/20" />
            <div className="absolute top-2 right-2 flex gap-1">
              <div className="w-1 h-1 rounded-full bg-white/20" />
              <div className="w-1 h-1 rounded-full bg-white/20" />
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 space-y-5">
            <div>
              <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-heading">Elector Full Name</p>
              <p className="text-lg font-bold text-white truncate font-heading group-hover:text-primary transition-colors tracking-tight">{profile.name || "UNIDENTIFIED CITIZEN"}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-heading">Age Group</p>
                <p className="text-xs font-bold text-slate-300">{profile.age || "—"}</p>
              </div>
              <div>
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest font-heading">Jurisdiction</p>
                <p className="text-xs font-bold text-slate-300">{profile.state || "—"}</p>
              </div>
            </div>

            <div className="pt-3">
              <div className="flex items-center gap-2 mb-1.5">
                <CheckCircle className={cn("h-3.5 w-3.5", profile.hasRegistered ? "text-emerald-400" : "text-slate-600")} />
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-[0.1em] font-heading">Enrolment Status</span>
              </div>
              <p className={cn("text-[11px] font-bold tracking-widest", profile.hasRegistered ? "text-emerald-400" : "text-rose-400/80")}>
                {profile.hasRegistered ? "OFFICIALLY ENROLLED" : "PENDING VERIFICATION"}
              </p>
            </div>
          </div>
        </div>

        {/* Card Footer / Hologram */}
        <div className="absolute bottom-6 right-8 flex items-end gap-4 scale-90 origin-bottom-right">
          <div className="text-right">
            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest leading-none font-heading mb-1">Security ID</p>
            <p className="text-[11px] font-mono text-primary font-bold">EC-T{Math.random().toString(36).substring(7).toUpperCase()}</p>
          </div>
          <div className="p-2 bg-white rounded-lg shadow-xl">
            <QrCode className="h-10 w-10 text-black" />
          </div>
        </div>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-primary/10 via-transparent to-white/5 opacity-40" />
      </div>

      {/* Info Tag */}
      <div className="mt-8 flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] justify-center font-heading">
        <Calendar className="h-4 w-4" />
        Digital Certificate Generated: {new Date().toLocaleDateString()}
      </div>
    </div>
  );
}
