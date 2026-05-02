"use client";

import { useUserStore } from "@/store/userStore";
import { Bell, Info, CheckCircle2, AlertTriangle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function NotificationCenter() {
  const { notifications, markNotificationAsRead } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const typeConfig = {
    info: { icon: Info, color: "text-blue-400", bg: "bg-blue-500/10" },
    success: { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10" },
    warning: { icon: AlertTriangle, color: "text-amber-400", bg: "bg-amber-500/10" },
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all group shadow-inner"
      >
        <Bell className="h-5 w-5 group-hover:scale-110 transition-transform" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-[10px] font-bold text-white flex items-center justify-center rounded-full ring-4 ring-[#0B1220] shadow-lg shadow-primary/20">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 mt-4 w-[380px] max-h-[520px] overflow-hidden flex flex-col glass-card border-primary/20 shadow-2xl z-50 animate-fade-in origin-top-right">
            <div className="p-5 border-b border-white/[0.06] flex items-center justify-between bg-card/40 backdrop-blur-md">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest font-heading">Strategic Intelligence</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg hover:bg-white/10 text-slate-500 flex items-center justify-center transition-all"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1 min-h-[100px]">
              {notifications.length === 0 ? (
                <div className="py-20 text-center text-slate-500 text-[10px] font-bold uppercase tracking-widest italic animate-pulse">
                  No active intelligence reports
                </div>
              ) : (
                <div className="space-y-1">
                  {notifications.map((n) => {
                    const Config = typeConfig[n.type];
                    return (
                      <div
                        key={n.id}
                        onClick={() => markNotificationAsRead(n.id)}
                        className={cn(
                          "p-4 rounded-xl transition-all cursor-pointer group/item",
                          n.read ? "opacity-40" : "bg-white/[0.03] hover:bg-white/[0.06]"
                        )}
                      >
                        <div className="flex gap-4">
                          <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg", Config.bg)}>
                            <Config.icon className={cn("h-5 w-5", Config.color)} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-white truncate font-heading group-hover/item:text-primary transition-colors">{n.title}</h4>
                            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed font-medium line-clamp-2">{n.message}</p>
                            <div className="flex items-center gap-2 mt-3">
                              <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest">
                                {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                              {!n.read && (
                                <div className="w-1 h-1 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="p-4 border-t border-white/[0.06] bg-card/40 backdrop-blur-md text-center">
              <button className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] hover:text-primary/80 transition-all">
                Access Audit Logs
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
