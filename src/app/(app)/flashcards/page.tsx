"use client";

import { useState, useEffect } from "react";
import { Layers, ChevronLeft, ChevronRight, RotateCcw, Sparkles, TrendingUp, Languages, HelpCircle, MessageCircleQuestion } from "lucide-react";
import { cn } from "@/lib/utils";
import { flashcardsData, flashcardCategories, getFlashcardsByCategory, Flashcard } from "@/lib/flashcardsData";
import { SupportedLanguage } from "@/lib/aiEngine";
import { useUserStore } from "@/store/userStore";
import { complianceLinks, i18nCopy } from "@/lib/i18n";

export default function FlashcardsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cards, setCards] = useState<Flashcard[]>(flashcardsData);
  const [showGrid, setShowGrid] = useState(false);
  const [flippedCards, setFlippedCards] = useState<Set<string>>(new Set());
  const [doubt, setDoubt] = useState("");
  const [doubtAnswer, setDoubtAnswer] = useState("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const { language, setLanguage } = useUserStore();
  const tCommon = i18nCopy[language as SupportedLanguage];

  useEffect(() => {
    const filtered = getFlashcardsByCategory(selectedCategory);
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
  }, [selectedCategory]);

  const currentCard = cards[currentIndex];

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const toggleGridFlip = (cardId: string) => {
    setFlippedCards((prev) => {
      const next = new Set(prev);
      if (next.has(cardId)) next.delete(cardId);
      else next.add(cardId);
      return next;
    });
  };

  const difficultyConfig = {
    beginner: { color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Foundational" },
    intermediate: { color: "text-amber-400", bg: "bg-amber-500/10", label: "Intermediate" },
    advanced: { color: "text-rose-400", bg: "bg-rose-500/10", label: "Advanced Law" },
  };

  const faqData = {
    en: [
      { id: "faq-1", q: "Can I vote without EPIC card?", a: "Yes. If your name exists in the electoral roll, you can vote using EPIC or another ECI-approved photo identity document." },
      { id: "faq-2", q: "Which form is used for new voter registration?", a: "Form 6 is used for first-time voter registration in India through NVSP or Voter Helpline." },
      { id: "faq-3", q: "Is NOTA legally valid?", a: "Yes. NOTA is a valid option on EVMs that allows voters to reject all candidates." },
      { id: "faq-4", q: "Are EVMs connected to the internet?", a: "No. EVMs used in Indian elections are standalone and not network connected." },
    ],
    hi: [
      { id: "faq-1", q: "क्या EPIC के बिना वोट कर सकते हैं?", a: "हाँ। यदि आपका नाम मतदाता सूची में है, तो EPIC या ECI द्वारा स्वीकृत अन्य पहचान पत्र से मतदान कर सकते हैं।" },
      { id: "faq-2", q: "नए मतदाता पंजीकरण के लिए कौन सा फॉर्म है?", a: "भारत में नए पंजीकरण के लिए Form 6 उपयोग होता है।" },
      { id: "faq-3", q: "क्या NOTA मान्य है?", a: "हाँ। NOTA EVM पर उपलब्ध वैध विकल्प है।" },
      { id: "faq-4", q: "क्या EVM इंटरनेट से जुड़ी होती है?", a: "नहीं। भारतीय EVM स्टैंडअलोन होती हैं और नेटवर्क से नहीं जुड़ी रहतीं।" },
    ],
  } as const;

  const solveDoubt = () => {
    const q = doubt.toLowerCase();
    if (!q.trim()) return;
    if (q.includes("form 6") || q.includes("register") || q.includes("registration") || q.includes("पंजीकरण")) {
      setDoubtAnswer(language === "hi" ? "नए मतदाता के लिए Form 6 भरें। NVSP या Voter Helpline App से आवेदन करें और राज्य CEO साइट पर समयसीमा देखें।" : "Use Form 6 for new voter registration via NVSP or Voter Helpline App. Also verify deadlines on your state CEO portal.");
      return;
    }
    if (q.includes("epic") || q.includes("id") || q.includes("voter card") || q.includes("पहचान")) {
      setDoubtAnswer(language === "hi" ? "मतदाता सूची में नाम होने पर EPIC के साथ अन्य स्वीकृत फोटो ID से भी मतदान संभव है।" : "If your name is on the electoral roll, you can vote with EPIC or another approved photo ID.");
      return;
    }
    if (q.includes("evm") || q.includes("vvpat")) {
      setDoubtAnswer(language === "hi" ? "EVM और VVPAT मतदान की पुष्टि देते हैं। VVPAT स्लिप 7 सेकंड दिखती है और फिर बॉक्स में गिरती है।" : "EVM and VVPAT provide vote confirmation. VVPAT slip is visible for around 7 seconds before it drops into the sealed box.");
      return;
    }
    setDoubtAnswer(language === "hi" ? "यह अच्छा प्रश्न है। कृपया प्रश्न को पंजीकरण, EPIC, EVM/VVPAT, NOTA या मतदान दिवस प्रक्रिया पर केंद्रित करें।" : "Great question. Please ask specifically about registration, EPIC, EVM/VVPAT, NOTA, or polling-day process for a precise answer.");
  };

  return (
    <div className="min-h-screen animate-fade-in">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest">
            <Layers className="h-3.5 w-3.5" />
            Interactive Learning
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight font-heading">Civic Intelligence Flashcards</h1>
          <p className="text-slate-400 max-w-lg leading-relaxed">
            Master the Indian electoral framework through {flashcardsData.length} curated interactive cards. High-fidelity knowledge for every citizen.
          </p>
          <div className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-3 py-1.5">
            <Languages className="h-4 w-4 text-primary" />
            <select value={language} onChange={(e) => setLanguage(e.target.value as SupportedLanguage)} className="bg-transparent text-xs text-slate-100 outline-none">
              <option value="en" className="bg-slate-900 text-white">English</option>
              <option value="hi" className="bg-slate-900 text-white">Hindi</option>
            </select>
          </div>
        </div>

        {/* Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 glass-card p-4">
          <div className="flex flex-wrap items-center gap-2">
            {flashcardCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all",
                  selectedCategory === cat.id
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-slate-500 hover:text-slate-300 hover:bg-white/[0.04]"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="h-8 w-px bg-white/10 hidden md:block" />
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowGrid(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                !showGrid ? "text-primary bg-primary/10 shadow-sm" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Deck
            </button>
            <button
              onClick={() => setShowGrid(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all",
                showGrid ? "text-primary bg-primary/10 shadow-sm" : "text-slate-500 hover:text-slate-300"
              )}
            >
              Grid
            </button>
          </div>
        </div>

        {/* Card View */}
        {!showGrid && currentCard && (
          <div className="max-w-2xl mx-auto space-y-12">
            {/* Progress Header */}
            <div className="flex items-center justify-between px-4">
              <div className="flex items-center gap-4">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Card {currentIndex + 1} of {cards.length}</span>
                <div className="h-1 w-24 bg-white/[0.06] rounded-full overflow-hidden">
                  <div className="h-full bg-primary transition-all duration-300" style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }} />
                </div>
              </div>
              {(() => {
                const config = difficultyConfig[currentCard.difficulty];
                return (
                  <span className={cn("text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-sm", config.bg, config.color)}>
                    {config.label}
                  </span>
                );
              })()}
            </div>

            {/* The Flashcard */}
            <div className="perspective cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
              <div className={cn(
                "relative w-full h-[450px] preserve-3d transition-transform duration-700 ease-out",
                isFlipped && "rotate-y-180"
              )}>
                {/* Front */}
                <div className="absolute inset-0 backface-hidden neo-panel p-10 flex flex-col items-center justify-center text-center shadow-2xl group-hover:border-primary/20">
                  <div className="absolute inset-0 election-mesh opacity-40" />
                  <div className="w-24 h-24 rounded-3xl bg-primary/10 flex items-center justify-center mb-10 shadow-xl shadow-primary/5">
                    <span className="text-6xl">{currentCard.icon}</span>
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-4">{currentCard.category}</div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight px-4 font-heading">{currentCard.question}</h2>
                  <div className="mt-auto flex items-center gap-2 text-slate-500 text-[10px] font-bold uppercase tracking-widest animate-pulse">
                    <RotateCcw className="h-3.5 w-3.5" /> Click to reveal answer
                  </div>
                </div>

                {/* Back */}
                <div className="absolute inset-0 backface-hidden rotate-y-180 neo-panel p-10 flex flex-col border-primary/30">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic font-heading">Electoral Knowledge</span>
                  </div>
                  <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                    <p className="text-xl text-slate-200 leading-relaxed font-medium mb-10">
                      {currentCard.answer}
                    </p>
                    {currentCard.funFact && (
                      <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                        <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 flex items-center gap-2">
                          <TrendingUp className="h-3.5 w-3.5" /> Deep Context
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed italic">{currentCard.funFact}</p>
                      </div>
                    )}
                  </div>
                  <div className="mt-8 flex items-center gap-2 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
                    <RotateCcw className="h-3.5 w-3.5" /> Click to see question
                  </div>
                </div>
              </div>
            </div>

            {/* Nav Controls */}
            <div className="flex items-center justify-between max-w-sm mx-auto">
              <button
                onClick={prevCard}
                disabled={currentIndex === 0}
                className="btn-ghost py-3 px-6 text-xs flex items-center gap-2 disabled:opacity-30 disabled:grayscale font-bold transition-all"
              >
                <ChevronLeft className="h-5 w-5" /> Previous
              </button>
              <div className="flex gap-1.5">
                {[1, 2, 3].map(i => (
                  <div key={i} className={cn("w-1.5 h-1.5 rounded-full transition-all", i === 1 ? "bg-primary w-4 shadow-sm" : "bg-white/10")} />
                ))}
              </div>
              <button
                onClick={nextCard}
                disabled={currentIndex === cards.length - 1}
                className="btn-primary py-3 px-8 text-xs flex items-center gap-2 disabled:opacity-30 disabled:grayscale shadow-lg shadow-primary/20"
              >
                <span className="font-bold">Next Card</span> <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Grid View */}
        {showGrid && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 stagger-children">
            {cards.map((card) => {
              const isCardFlipped = flippedCards.has(card.id);
              return (
                <div key={card.id} className="perspective cursor-pointer group" onClick={() => toggleGridFlip(card.id)}>
                  <div className={cn(
                    "relative w-full h-[320px] preserve-3d transition-transform duration-700 ease-out",
                    isCardFlipped && "rotate-y-180"
                  )}>
                    {/* Front */}
                    <div className="absolute inset-0 backface-hidden glass-card p-6 flex flex-col items-center justify-center text-center group-hover:border-primary/20">
                      <span className="text-4xl mb-6 transition-transform group-hover:scale-110 duration-500">{card.icon}</span>
                      <div className="text-[9px] font-bold uppercase tracking-widest text-primary mb-3">{card.category}</div>
                      <h3 className="text-base font-bold text-white leading-snug px-2 font-heading">{card.question}</h3>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 glass-card p-6 flex flex-col overflow-y-auto border-primary/20">
                      <p className="text-sm text-slate-300 leading-relaxed mb-6">{card.answer}</p>
                      {card.funFact && (
                        <div className="mt-auto p-4 rounded-xl bg-primary/5 text-[10px] text-slate-500 italic">
                          {card.funFact}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Doubt Solver */}
        <section className="mt-16 neo-panel p-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="icon-3d h-10 w-10 flex items-center justify-center">
              <MessageCircleQuestion className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-white">
              {language === "hi" ? "डाउट सॉल्वर सेक्शन" : "Doubt Solver Section"}
            </h2>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <input
              value={doubt}
              onChange={(e) => setDoubt(e.target.value)}
              placeholder={language === "hi" ? "अपना प्रश्न लिखें (उदाहरण: Form 6, EVM, EPIC)" : "Type your doubt (example: Form 6, EVM, EPIC)"}
              className="flex-1 h-12 rounded-xl border border-white/10 bg-white/[0.03] px-4 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary/40"
            />
            <button onClick={solveDoubt} className="btn-primary px-6">
              {language === "hi" ? "उत्तर पाएं" : "Get Answer"}
            </button>
          </div>
          {doubtAnswer && (
            <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm text-slate-200 leading-relaxed">
              {doubtAnswer}
            </div>
          )}
        </section>

        {/* FAQ */}
        <section className="mt-10 neo-panel p-8 mb-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="icon-3d h-10 w-10 flex items-center justify-center">
              <HelpCircle className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-heading font-bold text-white">FAQ</h2>
          </div>
          <div className="space-y-3">
            {faqData[language].map((item) => (
              <div key={item.id} className="rounded-xl border border-white/10 bg-white/[0.03]">
                <button
                  onClick={() => setOpenFaq(openFaq === item.id ? null : item.id)}
                  className="w-full px-4 py-3 text-left text-sm font-semibold text-white"
                >
                  {item.q}
                </button>
                {openFaq === item.id && (
                  <p className="px-4 pb-4 text-sm text-slate-300 leading-relaxed">{item.a}</p>
                )}
              </div>
            ))}
          </div>
        </section>
        <section className="neo-panel p-6 mb-8">
          <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">{tCommon.complianceTitle}</p>
          <p className="text-sm text-slate-300 mb-4">{tCommon.complianceNote}</p>
          <div className="flex flex-wrap gap-2">
            {complianceLinks.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer" className="text-[10px] px-2.5 py-1.5 rounded-lg border border-primary/20 text-primary hover:bg-primary/10 transition-all">
                {item.label}
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
