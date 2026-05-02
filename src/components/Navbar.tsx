import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0B1220]/80 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
      <div className="max-w-[1440px] mx-auto px-8 lg:px-12 h-24 flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link href="/" className="flex items-center gap-4 group">
            <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-2xl shadow-primary/30 group-hover:scale-110 transition-all duration-500 border border-primary/20">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="font-heading font-bold text-3xl tracking-tight text-white group-hover:text-primary transition-colors">
              Civic<span className="text-primary group-hover:text-white transition-colors">IQ</span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-10">
            {["Dashboard", "Journey", "Fact Check", "Assistant"].map((item) => (
              <Link 
                key={item} 
                href={`/${item.toLowerCase().replace(" ", "-")}`} 
                className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all hover:translate-y-[-1px]"
              >
                {item}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-8">
          <Link href="/dashboard" className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-sky-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative btn-primary text-[11px] font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded-xl border border-primary/20">
              Access Dashboard
            </div>
          </Link>
          <div className="h-10 w-px bg-white/10" />
          <Avatar className="h-11 w-11 border-2 border-white/[0.08] p-1 bg-white/[0.04] cursor-pointer hover:border-primary/50 transition-all hover:scale-110 shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" className="rounded-full" />
            <AvatarFallback className="bg-primary text-white font-bold font-heading">V</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
