import { JourneyStep, UserProfile } from "@/store/userStore";

export function generateJourney(profile: UserProfile): JourneyStep[] {
  const steps: JourneyStep[] = [];

  // Step 1: Age verification
  if (profile.isEligibleAge) {
    steps.push({
      id: "age-verified",
      title: "Age Eligibility Confirmed",
      details: "You are 18+ and eligible to vote in Indian elections under Article 326 of the Constitution.",
      category: "registration",
      status: "completed",
      icon: "✅",
      estimatedTime: "Done",
    });
  }

  // Step 2: Voter Registration
  if (!profile.hasRegistered) {
    steps.push({
      id: "register-voter",
      title: "Register as a Voter",
      details: "Visit https://voters.eci.gov.in or download the Voter Helpline App. Fill Form 6 (for new registration). You need: Proof of age, residence, and a photo.",
      category: "registration",
      status: "pending",
      icon: "📝",
      estimatedTime: "15-20 min",
    });
  } else {
    steps.push({
      id: "registration-confirmed",
      title: "Voter Registration Confirmed",
      details: "Your name should appear in the electoral roll. You can verify at https://voters.eci.gov.in by searching with your EPIC number.",
      category: "registration",
      status: "completed",
      icon: "✅",
      estimatedTime: "Done",
    });
  }

  // Step 3: EPIC Verification
  steps.push({
    id: "verify-epic",
    title: "Verify Your Voter ID (EPIC)",
    details: "Ensure you have your EPIC card. You can download a digital e-EPIC from the NVSP portal if your mobile is linked.",
    category: "verification",
    status: "pending",
    icon: "🪪",
    estimatedTime: "5 min",
  });

  // Step 4: Booth Location
  steps.push({
    id: "find-booth",
    title: "Find Your Polling Booth",
    details: "Locate your assigned polling station using the 'Know Your Polling Station' feature on the ECI website.",
    category: "polling",
    status: "pending",
    icon: "📍",
    estimatedTime: "5 min",
  });

  // Step 5: EVM & VVPAT Education
  steps.push({
    id: "understand-evm",
    title: "Master EVM & VVPAT",
    details: "Learn how the ballot unit, control unit, and VVPAT printer work together to secure your vote.",
    category: "education",
    status: "pending",
    icon: "🗳️",
    estimatedTime: "10 min",
  });

  // Step 6: Election Day Protocol
  steps.push({
    id: "election-day",
    title: "Election Day Protocol",
    details: "Carry your ID, arrive at the booth, verify your name, get inked, and cast your vote in secret.",
    category: "polling",
    status: "pending",
    icon: "📋",
    estimatedTime: "30 min",
  });

  return steps;
}
