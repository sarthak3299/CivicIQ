"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Route,
  Bot,
  ShieldCheck,
  Layers,
  Vote,
  Settings,
  Menu,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/journey", label: "Journey", icon: Route },
  { href: "/assistant", label: "AI Assistant", icon: Bot },
  { href: "/fact-check", label: "Fact Checker", icon: ShieldCheck },
  { href: "/flashcards", label: "Flashcards", icon: Layers },
  { href: "/simulator", label: "Ballot Simulator", icon: Vote },
];

export function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUserStore();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsMobileOpen(true)}
        className="fixed top-4 left-4 z-[60] lg:hidden p-2.5 rounded-xl glass text-white shadow-xl shadow-primary/10 border border-primary/20"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 lg:hidden animate-fadeIn"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen z-50 flex flex-col transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
          "bg-[#0B1220]/95 backdrop-blur-3xl border-r border-white/[0.08] shadow-[0_0_50px_rgba(0,0,0,0.3)]",
          isCollapsed ? "w-[88px]" : "w-[280px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between h-24 px-8 border-b border-white/[0.08]">
          <Link href="/dashboard" className="flex items-center gap-4 group">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-2xl shadow-primary/20 group-hover:scale-110 transition-all duration-500 border border-primary/20">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            {!isCollapsed && (
              <span className="font-heading font-bold text-2xl tracking-tight text-white group-hover:text-primary transition-colors">
                Civic<span className="text-primary group-hover:text-white transition-colors">IQ</span>
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-10 w-10 items-center justify-center rounded-xl hover:bg-white/[0.08] text-slate-500 hover:text-white transition-all border border-transparent hover:border-white/10"
          >
            <ChevronLeft className={cn("h-5 w-5 transition-transform duration-500", isCollapsed && "rotate-180")} />
          </button>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-10 space-y-2 overflow-y-auto scrollbar-none">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group relative overflow-hidden",
                  isActive
                    ? "bg-primary/10 text-primary shadow-lg shadow-primary/5 border border-primary/20"
                    : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.04]"
                )}
              >
                {/* Active Indicator Border */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary rounded-r-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" />
                )}
                
                <item.icon className={cn(
                  "h-5 w-5 flex-shrink-0 transition-all duration-300 group-hover:scale-110",
                  isActive ? "text-primary" : "text-slate-600 group-hover:text-primary"
                )} />
                
                {!isCollapsed && (
                  <span className={cn("transition-all duration-300 font-heading uppercase tracking-widest text-[11px]", isActive ? "opacity-100 scale-105" : "opacity-80 group-hover:opacity-100")}>
                    {item.label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-6 border-t border-white/[0.08] bg-card/20 backdrop-blur-md">
          {!isCollapsed && (
            <div className="mb-6 p-5 rounded-2xl glass-card border-primary/10 bg-primary/5 shadow-xl shadow-primary/5 relative overflow-hidden group">
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 blur-[40px] rounded-full group-hover:bg-primary/20 transition-all duration-700" />
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-sm font-bold text-white shadow-xl shadow-primary/20 font-heading">
                  {profile.name?.[0] || "V"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white truncate font-heading tracking-tight">{profile.name || "Voter Profile"}</p>
                  <p className="text-[9px] text-primary uppercase tracking-[0.2em] font-bold mt-1 animate-pulse-subtle">Verified Profile</p>
                </div>
              </div>
            </div>
          )}
          
          <Link
            href="/onboarding"
            className="flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-bold text-slate-500 hover:text-white hover:bg-white/[0.04] transition-all uppercase tracking-widest group"
          >
            <Settings className="h-5 w-5 flex-shrink-0 group-hover:rotate-90 transition-transform duration-500" />
            {!isCollapsed && <span>Profile Settings</span>}
          </Link>
        </div>
      </aside>
    </>
  );
}
