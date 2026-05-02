"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi", "Jammu & Kashmir", "Ladakh",
  "Andaman & Nicobar", "Chandigarh", "Dadra & Nagar Haveli and Daman & Diu",
  "Lakshadweep", "Puducherry",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { profile, setProfile, setHasCompletedOnboarding } = useUserStore();
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [stateSearch, setStateSearch] = useState("");

  const totalSteps = 4;

  const canProceed = () => {
    switch (onboardingStep) {
      case 0: return profile.name !== "";
      case 1: return profile.isEligibleAge !== null;
      case 2: return profile.hasRegistered !== null;
      case 3: return profile.state !== "";
      default: return false;
    }
  };

  const handleNext = () => {
    if (onboardingStep < totalSteps - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      setHasCompletedOnboarding(true);
      router.push("/journey");
    }
  };

  const handleBack = () => {
    if (onboardingStep > 0) setOnboardingStep(onboardingStep - 1);
  };

  const filteredStates = stateSearch
    ? indianStates.filter((s) => s.toLowerCase().includes(stateSearch.toLowerCase()))
    : indianStates;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-12 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="font-heading font-bold text-2xl text-white">Civic<span className="text-primary">IQ</span></span>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === onboardingStep
                  ? "w-10 bg-primary shadow-lg shadow-primary/20"
                  : i < onboardingStep
                  ? "w-3 bg-primary/40"
                  : "w-2 bg-white/10"
              )}
            />
          ))}
        </div>

        {/* Step card */}
        <div className="glass-card p-10 animate-fade-in" key={onboardingStep}>
          {/* Step 0: Name */}
          {onboardingStep === 0 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-5xl mb-6">👋</div>
                <h2 className="text-3xl font-bold text-white mb-2 font-heading">What&apos;s your name?</h2>
                <p className="text-slate-400">We&apos;ll use this to personalize your voting journey.</p>
              </div>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ name: e.target.value })}
                placeholder="Enter your full name..."
                className="w-full h-14 px-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white placeholder:text-slate-500 text-lg focus:outline-none focus:border-primary/40 focus:bg-white/[0.06] transition-all"
              />
            </div>
          )}

          {/* Step 1: Age */}
          {onboardingStep === 1 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-5xl mb-6">🎂</div>
                <h2 className="text-3xl font-bold text-white mb-2 font-heading">Are you 18 or older?</h2>
                <p className="text-slate-400">Indian citizens aged 18+ are eligible to vote under Article 326.</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: true, label: "Yes, I am 18+", icon: "✅" },
                  { value: false, label: "No, not yet", icon: "❌" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setProfile({ isEligibleAge: opt.value })}
                    className={cn(
                      "p-8 rounded-2xl border-2 text-center transition-all duration-300 group",
                      profile.isEligibleAge === opt.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                    )}
                  >
                    <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{opt.icon}</div>
                    <div className="text-sm font-bold text-white">{opt.label}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Registration */}
          {onboardingStep === 2 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-5xl mb-6">🪪</div>
                <h2 className="text-3xl font-bold text-white mb-2 font-heading">Are you registered?</h2>
                <p className="text-slate-400">Do you have a Voter ID or have you applied before?</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { value: true, label: "Yes, I am registered", description: "I have a Voter ID number", icon: "✅" },
                  { value: false, label: "No, not yet", description: "I need to apply for registration", icon: "📝" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    onClick={() => setProfile({ hasRegistered: opt.value })}
                    className={cn(
                      "p-6 rounded-2xl border-2 text-left flex items-center gap-6 transition-all duration-300 group",
                      profile.hasRegistered === opt.value
                        ? "border-primary bg-primary/10 shadow-lg shadow-primary/5"
                        : "border-white/[0.08] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.04]"
                    )}
                  >
                    <span className="text-3xl group-hover:scale-110 transition-transform">{opt.icon}</span>
                    <div className="flex-1">
                      <div className="text-base font-bold text-white">{opt.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{opt.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: State */}
          {onboardingStep === 3 && (
            <div className="space-y-8">
              <div className="text-center">
                <div className="text-5xl mb-6">🗺️</div>
                <h2 className="text-3xl font-bold text-white mb-2 font-heading">Select your State</h2>
                <p className="text-slate-400">This helps us provide state-specific deadlines.</p>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={stateSearch}
                  onChange={(e) => setStateSearch(e.target.value)}
                  placeholder="Search state..."
                  className="w-full h-14 px-6 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white text-base focus:outline-none focus:border-primary/40 transition-all mb-4"
                />
                <div className="max-h-[250px] overflow-y-auto space-y-1 pr-2 custom-scrollbar glass rounded-2xl p-2 border border-white/5">
                  {filteredStates.map((state) => (
                    <button
                      key={state}
                      onClick={() => { setProfile({ state }); setStateSearch(""); }}
                      className={cn(
                        "w-full px-4 py-3 rounded-xl text-left text-sm font-semibold transition-all",
                        profile.state === state
                          ? "bg-primary text-white shadow-md shadow-primary/20"
                          : "text-slate-400 hover:bg-white/[0.06] hover:text-white"
                      )}
                    >
                      {state}
                    </button>
                  ))}
                  {filteredStates.length === 0 && (
                    <div className="p-4 text-center text-slate-500 text-sm italic">No states match your search</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-12">
          <button
            onClick={handleBack}
            disabled={onboardingStep === 0}
            className="flex items-center gap-2 text-slate-400 hover:text-white font-bold disabled:opacity-30 px-6 py-3 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={cn(
              "btn-primary flex items-center gap-2 px-8 h-14",
              !canProceed() && "opacity-30 grayscale cursor-not-allowed shadow-none"
            )}
          >
            <span className="font-bold">{onboardingStep === totalSteps - 1 ? "Get My Journey" : "Continue"}</span>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
