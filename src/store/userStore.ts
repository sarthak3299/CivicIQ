import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SupportedLanguage } from "@/lib/aiEngine";

export interface JourneyStep {
  id: string;
  title: string;
  details: string;
  status: "pending" | "in-progress" | "completed";
  icon: string;
  category: "registration" | "education" | "verification" | "polling";
  estimatedTime: string;
}

export interface ChatMessage {
  role: "user" | "ai";
  content: string;
  timestamp: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning";
  timestamp: number;
  read: boolean;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  status: "locked" | "available" | "completed";
  progress: number; // 0-100
}

export interface UserProfile {
  name: string;
  age: string;
  state: string;
  hasRegistered: boolean;
  hasVotedBefore: boolean;
  isEligibleAge: boolean;
}

interface UserState {
  profile: UserProfile;
  journeySteps: JourneyStep[];
  readinessScore: number;
  hasCompletedOnboarding: boolean;
  chatMessages: ChatMessage[];
  notifications: Notification[];
  learningModules: LearningModule[];
  language: SupportedLanguage;
  
  // Actions
  setProfile: (profile: Partial<UserProfile>) => void;
  setJourneySteps: (steps: JourneyStep[]) => void;
  completeStep: (stepId: string) => void;
  startStep: (stepId: string) => void;
  setHasCompletedOnboarding: (val: boolean) => void;
  addChatMessage: (msg: ChatMessage) => void;
  clearChat: () => void;
  recalculateReadiness: () => void;
  
  // New Impact Actions
  addNotification: (notif: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markNotificationAsRead: (id: string) => void;
  updateLearningModule: (id: string, progress: number) => void;
  completeLearningModule: (id: string) => void;
  setLanguage: (language: SupportedLanguage) => void;
}

const initialLearningModules: LearningModule[] = [
  { id: "mod-1", title: "Democratic Foundations", description: "Learn about the Indian Constitution and your fundamental rights.", status: "available", progress: 0 },
  { id: "mod-2", title: "Electoral Tech: EVM & VVPAT", description: "Master the technology that secures your vote.", status: "locked", progress: 0 },
  { id: "mod-3", title: "Legal Rights & NOTA", description: "Understand your power on polling day.", status: "locked", progress: 0 },
  { id: "mod-4", title: "Civic Leadership", description: "Beyond voting: Engaging in community governance.", status: "locked", progress: 0 },
];

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      profile: {
        name: "",
        age: "",
        state: "",
        hasRegistered: false,
        hasVotedBefore: false,
        isEligibleAge: true,
      },
      journeySteps: [],
      readinessScore: 0,
      hasCompletedOnboarding: false,
      chatMessages: [],
      notifications: [
        { id: "init", title: "Welcome to CivicGuide AI", message: "Complete your onboarding to unlock your personalized roadmap.", type: "info", timestamp: Date.now(), read: false }
      ],
      learningModules: initialLearningModules,
      language: "en",

      setProfile: (newProfile) =>
        set((state) => ({ profile: { ...state.profile, ...newProfile } })),

      setJourneySteps: (steps) => set({ journeySteps: steps }),

      completeStep: (stepId) => {
        const { journeySteps } = get();
        const updatedSteps = journeySteps.map((step) =>
          step.id === stepId ? { ...step, status: "completed" as const } : step
        );
        set({ journeySteps: updatedSteps });
        get().recalculateReadiness();
        
        // Add notification for achievement
        const step = journeySteps.find(s => s.id === stepId);
        if (step) {
          get().addNotification({
            title: "Step Completed!",
            message: `Great job completing: ${step.title}`,
            type: "success"
          });
        }
      },

      startStep: (stepId) => {
        const updatedSteps = get().journeySteps.map((step) =>
          step.id === stepId ? { ...step, status: "in-progress" as const } : step
        );
        set({ journeySteps: updatedSteps });
      },

      setHasCompletedOnboarding: (val) => set({ hasCompletedOnboarding: val }),

      addChatMessage: (msg) =>
        set((state) => ({ chatMessages: [...state.chatMessages, msg] })),

      clearChat: () => set({ chatMessages: [] }),

      recalculateReadiness: () => {
        const { journeySteps } = get();
        if (journeySteps.length === 0) return;

        const totalSteps = journeySteps.length;
        const completedSteps = journeySteps.filter((s) => s.status === "completed").length;
        const inProgressSteps = journeySteps.filter((s) => s.status === "in-progress").length;

        // Formula: 100% * (completed + 0.5 * inProgress) / total
        const rawScore = ((completedSteps + inProgressSteps * 0.4) / totalSteps) * 100;
        set({ readinessScore: Math.round(rawScore) });
      },

      addNotification: (notif) => {
        const newNotif: Notification = {
          ...notif,
          id: Math.random().toString(36).substring(7),
          timestamp: Date.now(),
          read: false,
        };
        set((state) => ({ notifications: [newNotif, ...state.notifications].slice(0, 20) }));
      },

      markNotificationAsRead: (id) => {
        set((state) => ({
          notifications: state.notifications.map(n => n.id === id ? { ...n, read: true } : n)
        }));
      },

      updateLearningModule: (id, progress) => {
        set((state) => ({
          learningModules: state.learningModules.map(m => 
            m.id === id ? { ...m, progress: Math.min(progress, 100) } : m
          )
        }));
        if (progress >= 100) get().completeLearningModule(id);
      },

      completeLearningModule: (id) => {
        const { learningModules } = get();
        const updated = learningModules.map((m, i) => {
          if (m.id === id) return { ...m, status: "completed" as const, progress: 100 };
          // Unlock next module
          const prev = learningModules[i - 1];
          if (prev && prev.id === id) return { ...m, status: "available" as const };
          return m;
        });
        set({ learningModules: updated });
        
        get().addNotification({
          title: "Module Mastered!",
          message: "You've earned a new knowledge badge.",
          type: "success"
        });
      },

      setLanguage: (language) => set({ language }),
    }),
    {
      name: "civic-guide-storage",
    }
  )
);
