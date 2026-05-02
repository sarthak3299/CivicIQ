import { JourneyStep, UserProfile } from "@/store/userStore";

export type SupportedLanguage = "en" | "hi";

const indianElectionKB: Record<SupportedLanguage, Record<string, string>> = {
  en: {
    "voter-registration": "In India, voter registration is done through Form 6 for new voters. You can register via the Voter Helpline App or the ECI Voter Portal. Key documents required: Age proof and Residence proof.",
    "evm-vvpat": "Electronic Voting Machines (EVMs) consist of a Control Unit and a Balloting Unit. The VVPAT (Voter Verifiable Paper Audit Trail) allows you to see a printed slip for 7 seconds confirming your choice.",
    "nota": "None of the Above (NOTA) was introduced in 2013 following a Supreme Court directive. It allows voters to express their lack of support for all candidates in the fray.",
    "mcc": "The Model Code of Conduct (MCC) comes into effect the moment election dates are announced. It regulates the conduct of political parties and candidates to ensure free and fair elections.",
    "epic": "EPIC stands for Elector Photo Identity Card. It is your primary identification for voting, though other IDs like Aadhaar and PAN are also accepted if you are on the electoral roll.",
    "rpa-1951": "The Representation of the People Act, 1951, provides the legal framework for the actual conduct of elections, including candidate qualifications and election offenses.",
    "anti-defection": "The 10th Schedule of the Constitution (Anti-Defection Law) penalizes MPs/MLAs for switching parties, maintaining the stability of the elected government.",
    "booth-protocol": "On polling day, your finger is marked with indelible ink. You then proceed to the secret voting compartment to record your vote on the EVM.",
  },
  hi: {
    "voter-registration": "भारत में नए मतदाताओं का पंजीकरण प्रपत्र 6 (Form 6) से होता है। आप Voter Helpline App या ECI Voter Portal से आवेदन कर सकते हैं। मुख्य दस्तावेज: आयु प्रमाण और निवास प्रमाण।",
    "evm-vvpat": "EVM में Control Unit और Ballot Unit होती हैं। VVPAT आपको 7 सेकंड के लिए आपकी पसंद की पर्ची दिखाता है, जिससे वोट की पुष्टि होती है।",
    "nota": "NOTA (None of the Above) 2013 में सुप्रीम कोर्ट के निर्देश के बाद लागू हुआ। इससे मतदाता सभी उम्मीदवारों को अस्वीकार कर सकता है।",
    "mcc": "Model Code of Conduct (MCC) चुनाव तिथियों की घोषणा के साथ लागू हो जाता है। यह पार्टियों और उम्मीदवारों के आचरण को नियंत्रित करता है।",
    "epic": "EPIC का अर्थ Elector Photo Identity Card है। मतदान के लिए यह मुख्य पहचान पत्र है, हालांकि मतदाता सूची में नाम होने पर अन्य मान्य पहचान पत्र भी स्वीकार होते हैं।",
    "rpa-1951": "Representation of the People Act, 1951 चुनाव संचालन, उम्मीदवार योग्यता और चुनावी अपराधों का कानूनी ढांचा देता है।",
    "anti-defection": "संविधान की दसवीं अनुसूची (दल-बदल विरोधी कानून) निर्वाचित प्रतिनिधियों के दलबदल को नियंत्रित करती है।",
    "booth-protocol": "मतदान दिवस पर आपकी उंगली पर अमिट स्याही लगाई जाती है, फिर आप गोपनीय मतदान कक्ष में EVM से वोट डालते हैं।",
  },
};

export const generateAIResponse = (
  query: string,
  profile: UserProfile,
  journeySteps: JourneyStep[],
  language: SupportedLanguage = "en"
): { content: string; actions?: string[] } => {
  const lowercaseQuery = query.toLowerCase();
  const kb = indianElectionKB[language];
  const completedSteps = journeySteps.filter((s) => s.status === "completed").length;
  const nextStep = journeySteps.find((s) => s.status === "pending" || s.status === "in-progress");

  if (lowercaseQuery.includes("ready") || lowercaseQuery.includes("progress") || lowercaseQuery.includes("next")) {
    if (nextStep) {
      if (language === "hi") {
        return {
          content: `आप अच्छी प्रगति कर रहे हैं। आपने ${completedSteps} चरण पूरे कर लिए हैं। आपका अगला प्राथमिक चरण है: "${nextStep.title}"। ${nextStep.details.substring(0, 90)}... क्या आप चाहेंगे कि मैं इस चरण में आपकी मदद करूं?`,
          actions: ["मुझे मार्गदर्शन दें", "पूर्ण चिह्नित करें"],
        };
      }
      return {
        content: `Based on your profile, you are making good progress! You've completed ${completedSteps} steps. Your next priority is: "${nextStep.title}". ${nextStep.details.substring(0, 100)}... Would you like me to guide you through this step?`,
        actions: ["Guide me", "Mark as done"],
      };
    }
    return language === "hi"
      ? { content: "आपने अपने शुरुआती सभी चरण पूरे कर लिए हैं। आप मतदान दिवस के लिए पूरी तरह तैयार हैं। क्या आप बूथ प्रक्रिया या NOTA के बारे में जानना चाहेंगे?" }
      : { content: "You've completed all your initial journey steps! You're 100% ready for polling day. Do you have questions about booth protocols or NOTA?" };
  }

  if (lowercaseQuery.includes("register") || lowercaseQuery.includes("form 6")) {
    return {
      content: language === "hi"
        ? `${kb["voter-registration"]} आप ${profile.state || "India"} में हैं, इसलिए अपने राज्य के CEO पोर्टल पर अंतिम तिथियां अवश्य जांचें।`
        : `${kb["voter-registration"]} Since you are in ${profile.state || "India"}, make sure to check the specific state CEO website for the latest local deadlines.`,
      actions: language === "hi" ? ["अंतिम तिथि देखें", "Form 6 मार्गदर्शिका"] : ["Check Deadlines", "Open Form 6 Guide"],
    };
  }

  if (lowercaseQuery.includes("evm") || lowercaseQuery.includes("vvpat") || lowercaseQuery.includes("hack")) {
    return {
      content: language === "hi"
        ? `${kb["evm-vvpat"]} भारतीय EVM स्टैंड-अलोन मशीनें हैं और इंटरनेट, ब्लूटूथ या वाई-फाई से जुड़ी नहीं होतीं, इसलिए रिमोट हैकिंग का जोखिम बहुत कम रहता है।`
        : `${kb["evm-vvpat"]} Indian EVMs are stand-alone machines, not connected to any network (internet, bluetooth, or wifi), making them extremely secure against remote hacking.`,
      actions: language === "hi" ? ["सिम्युलेटर खोलें"] : ["Launch Simulator"],
    };
  }

  if (lowercaseQuery.includes("id card") || lowercaseQuery.includes("epic") || lowercaseQuery.includes("voter id")) {
    return {
      content: language === "hi"
        ? `${kb["epic"]} यदि आपका मोबाइल लिंक है, तो NVSP/ECI पोर्टल से e-EPIC डाउनलोड किया जा सकता है।`
        : `${kb["epic"]} If you haven't received yours yet, you can download a digital version (e-EPIC) from the NVSP portal if your mobile number is linked.`,
      actions: language === "hi" ? ["डिजिटल EPIC देखें"] : ["View Digital Twin"],
    };
  }

  for (const [key, value] of Object.entries(kb)) {
    if (lowercaseQuery.includes(key.replace("-", " "))) {
      return { content: value };
    }
  }

  return language === "hi"
    ? {
        content: "यह भारतीय चुनाव प्रक्रिया से जुड़ा अच्छा प्रश्न है। कृपया प्रश्न को पंजीकरण, EVM/VVPAT, मतदान दिवस, पहचान पत्र या चुनावी कानून के संदर्भ में दोबारा लिखें, ताकि मैं अधिक सटीक उत्तर दे सकूं।",
        actions: ["NOTA क्या है?", "रजिस्ट्रेशन कैसे करें?"],
      }
    : {
        content: "That's an interesting question about the Indian electoral process. While I don't have a specific rule for that exact phrase, generally the ECI guidelines prioritize transparency and voter access. Could you rephrase your question about registration, EVMs, or polling day protocols?",
        actions: ["What is NOTA?", "How to register?"],
      };
};
