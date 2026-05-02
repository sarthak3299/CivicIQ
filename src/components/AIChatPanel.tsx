"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, Mic, MicOff, Volume2, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { generateAIResponse, SupportedLanguage } from "@/lib/aiEngine";
import { complianceLinks, i18nCopy } from "@/lib/i18n";
import { SpeechRecognition } from "@/lib/speech";

export function AIChatPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatMessages, addChatMessage, profile, journeySteps, language, setLanguage } = useUserStore();
  const t = i18nCopy[language];

  const suggestions = language === "hi"
    ? ["मतदान तैयारी जांचें", "बूथ प्रक्रिया बताएं", "EVM और VVPAT समझाएं", "e-EPIC कैसे लें?"]
    : ["Verify Electoral Readiness", "Identify Polling Protocols", "Explain EVM & VVPAT", "How to get e-EPIC?"];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const speakResponse = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SpeechRecognitionConstructor = (window as any).SpeechRecognition
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognitionConstructor) return;
    const recognition = new SpeechRecognitionConstructor() as SpeechRecognition;
    recognition.lang = language === "hi" ? "hi-IN" : "en-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results?.[0]?.[0]?.transcript || "";
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);
    recognition.start();
  };

  const handleSend = (text?: string) => {
    const message = text || input.trim();
    if (!message) return;

    addChatMessage({ role: "user", content: message, timestamp: Date.now() });
    setInput("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = generateAIResponse(message, profile, journeySteps, language as SupportedLanguage);
      addChatMessage({
        role: "ai",
        content: response.content,
        timestamp: Date.now(),
      });
      speakResponse(response.content);
      setIsTyping(false);
    }, 800 + Math.random() * 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        className={cn(
          "fixed bottom-8 right-8 h-16 w-16 rounded-2xl z-50 flex items-center justify-center transition-all duration-500",
          "bg-primary text-white shadow-2xl shadow-primary/20 border border-primary/20",
          "hover:shadow-primary/40 hover:-translate-y-1 hover:scale-110",
          isOpen ? "scale-0 opacity-0 rotate-90" : "scale-100 opacity-100"
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Intelligence Console"
      >
        <Bot className="h-7 w-7" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-4 border-[#0B1220] animate-pulse" />
      </button>

      {/* Chat Panel */}
      <div
        className={cn(
          "fixed top-0 right-0 h-screen w-full sm:w-[460px] z-50 flex flex-col transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
          "bg-[#0B1220]/95 backdrop-blur-3xl border-l border-white/[0.08] shadow-[0_0_100px_rgba(0,0,0,0.5)]",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/[0.08] bg-card/20">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-white text-base tracking-tight">Intelligence Console</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.5)]" />
                <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Quantum Engine Active</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setVoiceEnabled((v) => !v)} className={cn("w-9 h-9 rounded-lg flex items-center justify-center", voiceEnabled ? "text-primary bg-primary/10" : "text-slate-500 bg-white/[0.03]")}>
              <Volume2 className="h-4 w-4" />
            </button>
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.08]">
              <Languages className="h-3.5 w-3.5 text-primary" />
              <select value={language} onChange={(e) => setLanguage(e.target.value as SupportedLanguage)} className="bg-transparent text-[11px] text-white outline-none">
                <option value="en" className="bg-slate-900">EN</option>
                <option value="hi" className="bg-slate-900">HI</option>
              </select>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-500 hover:text-white hover:bg-white/[0.08] transition-all border border-transparent hover:border-white/10"
              aria-label="Deactivate console"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
          {chatMessages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
              <Sparkles className="h-12 w-12 text-primary mb-4" />
              <p className="text-sm font-medium text-slate-400 font-heading">{language === "hi" ? "प्रश्न की प्रतीक्षा..." : "Awaiting Inquiry..."}</p>
            </div>
          )}
          
          {chatMessages.map((msg, i) => (
            <div
              key={i}
              className={cn("flex gap-4 animate-fadeInUp", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center shadow-md",
                  msg.role === "ai"
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "bg-white/[0.04] text-slate-500 border border-white/[0.06]"
                )}
              >
                {msg.role === "ai" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
              </div>
              <div
                className={cn(
                  "px-5 py-4 rounded-2xl max-w-[85%] text-[13px] leading-relaxed font-medium transition-all shadow-sm",
                  msg.role === "ai"
                    ? "bg-white/[0.04] text-slate-200 rounded-tl-none border border-white/[0.08] backdrop-blur-md"
                    : "bg-primary text-white rounded-tr-none shadow-lg shadow-primary/10 font-bold"
                )}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex gap-4 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                <Bot className="h-4 w-4" />
              </div>
              <div className="px-5 py-4 rounded-2xl rounded-tl-none bg-white/[0.04] border border-white/[0.08] backdrop-blur-md">
                <div className="flex gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Suggestions */}
        {chatMessages.length <= 2 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-xl bg-primary/5 text-primary border border-primary/10 hover:bg-primary/10 hover:border-primary/30 transition-all shadow-sm"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-6 border-t border-white/[0.08] bg-card/20 backdrop-blur-md">
          <form onSubmit={handleSubmit} className="relative group">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query intelligence database..."
              className="w-full h-14 pl-5 pr-14 rounded-2xl bg-white/[0.04] border border-white/[0.1] text-white placeholder:text-slate-600 text-sm font-medium focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-20 hover:shadow-lg hover:shadow-primary/30 transition-all active:scale-95"
              aria-label="Send query"
            >
              <Send className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={startListening}
              className={cn(
                "absolute right-14 top-1/2 -translate-y-1/2 h-10 w-10 rounded-xl flex items-center justify-center transition-all",
                isListening ? "bg-emerald-500 text-white animate-pulse" : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
              )}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </button>
          </form>
          <p className="mt-4 text-[10px] text-slate-600 text-center font-bold uppercase tracking-[0.2em]">{t.complianceTitle}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            {complianceLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-[10px] px-2 py-1 rounded-lg border border-primary/20 text-primary hover:bg-primary/10">
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop - mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 sm:hidden animate-fadeIn"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
