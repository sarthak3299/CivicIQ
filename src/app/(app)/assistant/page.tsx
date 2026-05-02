"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, Trash2, ArrowLeft, Mic, MicOff, Volume2, Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { generateAIResponse, SupportedLanguage } from "@/lib/aiEngine";
import Link from "next/link";
import { complianceLinks, i18nCopy } from "@/lib/i18n";

import { SpeechRecognition } from "@/lib/speech";

export default function AssistantPage() {
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { chatMessages, addChatMessage, clearChat, profile, journeySteps, readinessScore, language, setLanguage } = useUserStore();
  const tCommon = i18nCopy[language];

  const copy = {
    en: {
      title: "CivicGuide AI",
      subtitle: "Multilingual Assistant",
      ask: "How can I help you today?",
      prompt: "Ask a question about your voting journey...",
      speaking: "Voice response",
      legal: "ECI aligned • RPA 1950/1951 aware • Non-partisan",
      listening: "Listening...",
      suggestions: [
        "What should I do next?",
        "Am I ready to vote?",
        "How does EVM work?",
        "What is NOTA?",
        "Tell me about voter registration",
      ],
    },
    hi: {
      title: "CivicGuide AI",
      subtitle: "बहुभाषी सहायक",
      ask: "मैं आज आपकी कैसे मदद कर सकता हूं?",
      prompt: "अपने मतदान सफर से जुड़ा प्रश्न पूछें...",
      speaking: "आवाज प्रतिक्रिया",
      legal: "ECI नियमों के अनुरूप • RPA 1950/1951 आधारित • गैर-पक्षपाती",
      listening: "सुन रहा हूं...",
      suggestions: [
        "अगला कदम क्या है?",
        "क्या मैं वोट के लिए तैयार हूं?",
        "EVM कैसे काम करती है?",
        "NOTA क्या है?",
        "मतदाता पंजीकरण बताएं",
      ],
    },
  } as const;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatMessages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const speakResponse = (text: string) => {
    if (!voiceEnabled || typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === "hi" ? "hi-IN" : "en-IN";
    const voices = window.speechSynthesis.getVoices();
    const bestVoice = voices.find((v) => v.lang.toLowerCase().startsWith(utterance.lang.toLowerCase().slice(0, 2)));
    if (bestVoice) utterance.voice = bestVoice;
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

    setTimeout(() => {
      const response = generateAIResponse(message, profile, journeySteps, language);
      addChatMessage({
        role: "ai",
        content: response.content,
        timestamp: Date.now(),
      });
      speakResponse(response.content);
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col overflow-hidden -m-8">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06] bg-card/40 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 rounded-lg hover:bg-white/[0.06] text-slate-400 lg:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg leading-none font-heading">CivicGuide AI</h1>
              <div className="flex items-center gap-1.5 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                  {copy[language].subtitle}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-2 py-1 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <Languages className="h-3.5 w-3.5 text-primary" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as SupportedLanguage)}
              className="bg-transparent text-xs text-slate-200 outline-none"
            >
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="hi" className="bg-slate-900 text-white">Hindi</option>
            </select>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Readiness</span>
            <span className="text-xs font-bold text-primary">{readinessScore}%</span>
          </div>
          <button
            onClick={() => setVoiceEnabled((v) => !v)}
            className={cn("p-2 rounded-lg transition-all", voiceEnabled ? "text-primary bg-primary/10" : "text-slate-500 hover:bg-white/[0.06]")}
            title={copy[language].speaking}
          >
            <Volume2 className="h-5 w-5" />
          </button>
          <button
            onClick={clearChat}
            className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 transition-all"
            title="Clear conversation"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col min-w-0 bg-saas-gradient relative">
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-8 py-10 space-y-10">
            {chatMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-6">
                <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mb-4">
                  <Bot className="h-10 w-10 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-white font-heading">{copy[language].ask}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {language === "hi"
                    ? "मैं आपका नागरिक चुनाव सहायक हूं। पंजीकरण, मतदान नियम, EPIC, EVM या चुनावी कानून के बारे में पूछें।"
                    : "I am your civic election assistant. Ask me about registration, voting rules, EPIC, EVM, or election law."}
                </p>
                <div className="grid grid-cols-1 gap-2 w-full pt-4">
                  {copy[language].suggestions.map((s) => (
                    <button key={s} onClick={() => handleSend(s)} className="btn-ghost text-xs py-3 font-semibold">
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {chatMessages.map((msg, i) => (
              <div key={i} className={cn(
                "flex gap-6 animate-fade-in max-w-4xl mx-auto w-full",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}>
                <div className={cn(
                  "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg",
                  msg.role === "ai" ? "bg-primary text-white shadow-primary/20" : "bg-slate-800 text-slate-400"
                )}>
                  {msg.role === "ai" ? <Sparkles className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </div>
                <div className={cn(
                  "px-6 py-4 rounded-2xl text-sm leading-relaxed whitespace-pre-line max-w-[80%]",
                  msg.role === "ai" 
                    ? "glass text-slate-200" 
                    : "bg-primary text-white shadow-lg shadow-primary/20"
                )}>
                  {msg.content}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-6 max-w-4xl mx-auto w-full">
                <div className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="px-6 py-4 rounded-2xl glass">
                  <div className="flex gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                    <div className="w-2 h-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="px-8 pb-8 pt-4 border-t border-white/[0.04] bg-card/40 backdrop-blur-md">
            <div className="max-w-4xl mx-auto relative">
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={copy[language].prompt}
                  className="w-full h-16 pl-6 pr-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-primary/40 focus:bg-white/[0.05] transition-all"
                  disabled={isTyping}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center disabled:opacity-30 disabled:grayscale hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                  <Send className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={startListening}
                  className={cn(
                    "absolute right-16 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isListening ? "bg-emerald-500 text-white animate-pulse" : "bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]"
                  )}
                  title={copy[language].listening}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </button>
              </form>
              <div className="flex justify-center mt-3 gap-6 text-[10px] font-bold text-slate-600 uppercase tracking-[0.1em]">
                <span>{copy[language].legal}</span>
                <span>•</span>
                <span>{isListening ? copy[language].listening : (language === "hi" ? "टेक्स्ट + वॉइस सहायक" : "Text + Voice Assistant")}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Sidebar Context */}
        <aside className="hidden xl:flex w-[320px] border-l border-white/[0.06] flex-col p-8 space-y-8 overflow-y-auto bg-card/20 backdrop-blur-sm">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-heading">Active Roadmap</h3>
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-white">Status</span>
                <span className="text-xs text-primary font-bold">{readinessScore}%</span>
              </div>
              <div className="h-1.5 w-full bg-white/[0.06] rounded-full overflow-hidden">
                <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${readinessScore}%` }} />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest font-heading">Verified Context</h3>
            <div className="space-y-3">
              {[
                { label: "Location", val: profile.state || "Not Set" },
                { label: "Registered", val: profile.hasRegistered ? "Verified" : "Pending" },
                { label: "Age Group", val: profile.isEligibleAge ? "18+" : "Underage" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between px-2">
                  <span className="text-xs text-slate-500">{item.label}</span>
                  <span className="text-xs font-bold text-white">{item.val}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 rounded-2xl glass border-primary/10">
            <p className="text-[10px] leading-relaxed text-slate-400 font-medium">
              CivicGuide AI uses your roadmap context to provide more accurate answers. All guidance is based on RPA 1951 and ECI protocols.
            </p>
          </div>
          <div className="mt-auto p-6 rounded-2xl border border-white/10 bg-white/[0.03]">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">{tCommon.complianceTitle}</p>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-3">{tCommon.complianceNote}</p>
            <div className="flex flex-wrap gap-2">
              {complianceLinks.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-[10px] px-2.5 py-1.5 rounded-lg border border-primary/20 text-primary hover:bg-primary/10 transition-all">
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
