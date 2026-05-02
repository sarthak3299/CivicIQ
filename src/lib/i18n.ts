import { SupportedLanguage } from "@/lib/aiEngine";

export const complianceLinks = [
  { label: "ECI Portal", href: "https://eci.gov.in/" },
  { label: "Voter Service Portal", href: "https://voters.eci.gov.in/" },
  { label: "Voter Helpline", href: "https://www.eci.gov.in/voter/voter-helpline-app/" },
  { label: "RPA 1950/1951", href: "https://legislative.gov.in/" },
];

export const i18nCopy: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    languageLabel: "Language",
    dashboardBadge: "Voter Readiness Overview",
    dashboardWelcome: "Welcome back",
    dashboardSub: "Stay on track with your personalized election journey, key milestones, and practical next steps.",
    journeyTitle: "Your Voting Journey",
    journeySub: "Based on your profile, these are the most relevant steps to complete before election day in India.",
    enterDashboard: "Enter Dashboard",
    complianceTitle: "Compliance & Sources",
    complianceNote: "Guidance is educational and non-partisan. Verify final procedural updates on official ECI/CEO portals.",
  },
  hi: {
    languageLabel: "भाषा",
    dashboardBadge: "मतदाता तैयारी अवलोकन",
    dashboardWelcome: "वापसी पर स्वागत है",
    dashboardSub: "अपने व्यक्तिगत चुनाव सफर, प्रमुख चरणों और उपयोगी अगले कदमों पर नज़र रखें।",
    journeyTitle: "आपका मतदान सफर",
    journeySub: "आपकी प्रोफाइल के आधार पर, भारत में मतदान दिवस से पहले पूरे करने के लिए ये महत्वपूर्ण चरण हैं।",
    enterDashboard: "डैशबोर्ड खोलें",
    complianceTitle: "अनुपालन और स्रोत",
    complianceNote: "यह मार्गदर्शन शैक्षिक और गैर-पक्षपाती है। अंतिम जानकारी के लिए ECI/CEO के आधिकारिक पोर्टल देखें।",
  },
};

