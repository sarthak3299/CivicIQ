"use client";

import { useEffect, useState, useRef } from "react";

interface ReadinessRingProps {
  score: number;
  size?: number;
  strokeWidth?: number;
}

export function ReadinessRing({ score, size = 260, strokeWidth = 14 }: ReadinessRingProps) {
  const [animatedScore, setAnimatedScore] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (animatedScore / 100) * circumference;
  const animationRef = useRef<number>();

  useEffect(() => {
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // Quartic ease out
      setAnimatedScore(Math.round(eased * score));
      
      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [score]);

  const getProgressMessage = () => {
    if (animatedScore === 0) return "Begin your roadmap 👇";
    if (animatedScore < 30) return "Establishing foundations";
    if (animatedScore < 70) return "Advancing strategic readiness";
    if (animatedScore < 100) return "Achieving operational status";
    return "Electoral Readiness Optimized! 🗳️";
  };

  return (
    <div className="relative inline-flex items-center justify-center animate-fade-in" style={{ width: size, height: size }}>
      {/* Background Outer Glow */}
      <div 
        className="absolute inset-0 rounded-full bg-primary/10 blur-[50px] animate-pulse-subtle"
        style={{ width: size, height: size }}
      />
      
      <svg width={size} height={size} className="transform -rotate-90 relative z-10">
        <defs>
          <linearGradient id="ringGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--sky-400))" />
          </linearGradient>
          <filter id="premium-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#ringGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          filter="url(#premium-glow)"
          className="transition-all duration-300"
        />
      </svg>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-20">
        <div className="flex flex-col items-center">
          <span className="text-7xl font-bold tracking-tighter text-white font-heading">
            {animatedScore}<span className="text-primary text-3xl font-heading">%</span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mt-4 font-sans">
            Readiness Index
          </span>
          <div className="h-px w-16 bg-white/10 my-6" />
          <p className="text-sm font-semibold text-slate-300 max-w-[160px] leading-relaxed font-sans italic">
            {getProgressMessage()}
          </p>
        </div>
      </div>
    </div>
  );
}
