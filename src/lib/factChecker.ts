export interface FactCheckResult {
  claim: string;
  verdict: "TRUE" | "FALSE" | "MISLEADING" | "PARTIALLY_TRUE";
  explanation: string;
  source: string;
  confidence: number;
}

const factDatabase: FactCheckResult[] = [
  {
    claim: "Can I vote online in India?",
    verdict: "FALSE",
    explanation: "India does not have any online/internet voting system for general elections. All votes must be cast in person at your assigned polling booth using Electronic Voting Machines (EVMs). The only exception is postal ballots, available for service personnel, government employees on election duty, and certain other categories as per the Conduct of Elections Rules, 1961.",
    source: "Election Commission of India — https://eci.gov.in",
    confidence: 98,
  },
  {
    claim: "EVMs can be hacked or tampered with",
    verdict: "FALSE",
    explanation: "EVMs used in Indian elections are standalone, battery-operated devices that are NOT connected to any network — no internet, Wi-Fi, or Bluetooth. They are manufactured by Bharat Electronics Limited (BEL) and Electronics Corporation of India Limited (ECIL) under strict security protocols. The Supreme Court of India has upheld the reliability of EVMs in multiple cases. Additionally, VVPAT (Voter Verifiable Paper Audit Trail) provides an additional layer of verification.",
    source: "Supreme Court of India — Subramanian Swamy vs ECI (2013)",
    confidence: 95,
  },
  {
    claim: "I need Aadhaar card to vote",
    verdict: "MISLEADING",
    explanation: "Aadhaar card is NOT mandatory for voting. While it is one of the 12 accepted photo identity documents, the primary voter ID is the EPIC (Electors Photo Identity Card). Other accepted IDs include: Passport, Driving License, PAN Card, Service ID (government employees), Student ID, Bank/Post Office Passbook with photo, and others as notified by ECI. The Aadhaar-Electoral Roll linking (as per 2022 amendment) is voluntary, not compulsory.",
    source: "ECI Order — List of Alternative Photo ID Documents",
    confidence: 92,
  },
  {
    claim: "NOTA can defeat a candidate if it gets more votes",
    verdict: "FALSE",
    explanation: "Even if NOTA receives the highest number of votes in a constituency, the candidate with the most votes among the contesting candidates still wins. NOTA is a means to express dissent but does not have the power to reject all candidates or trigger a re-election under current Indian law. The Supreme Court introduced NOTA in 2013 (PUCL vs Union of India) as a negative voting right.",
    source: "Supreme Court — PUCL vs Union of India (2013)",
    confidence: 97,
  },
  {
    claim: "NRIs can vote in Indian elections",
    verdict: "TRUE",
    explanation: "Yes! NRIs (Non-Resident Indians) can vote in Indian elections since 2011 after the amendment to the Representation of the People Act, 1950. However, they must be registered as overseas electors and must be physically present at their polling station in India on election day. There is no facility for postal ballots or proxy voting for NRIs in general elections yet, though amendments for the same have been proposed.",
    source: "Representation of the People (Amendment) Act, 2010",
    confidence: 90,
  },
  {
    claim: "Election Commission can postpone elections indefinitely",
    verdict: "FALSE",
    explanation: "The Election Commission of India cannot postpone elections indefinitely. Under Article 324 of the Constitution, ECI has superintendence, direction, and control of elections, but it must conduct elections within the constitutionally mandated timeframe. The Lok Sabha and State Assemblies have a term of 5 years. Elections must be held before the term expires. The ECI can postpone elections in specific constituencies due to extraordinary circumstances (natural disasters, law and order) but must reschedule them.",
    source: "Article 324, 83, and 172 of the Indian Constitution",
    confidence: 93,
  },
  {
    claim: "My employer must give me paid leave on election day",
    verdict: "TRUE",
    explanation: "Yes! Under Section 135B of the Representation of the People Act, 1951, every employer must grant paid holiday to employees on the day of election. Failure to do so is punishable with a fine. This applies to all establishments — private, public, and government. The day of poll is declared a paid holiday by the government.",
    source: "Section 135B, Representation of the People Act, 1951",
    confidence: 96,
  },
  {
    claim: "I can vote multiple times in different constituencies",
    verdict: "FALSE",
    explanation: "Voting more than once is a criminal offence under Section 171F of the Indian Penal Code, punishable with imprisonment up to one year, or fine, or both. A person can be registered as a voter in only ONE constituency. If found registered in multiple places, it is a violation of the Representation of the People Act. The indelible ink applied on your finger (which lasts 48-72 hours) is one measure to prevent double voting.",
    source: "Section 171F, Indian Penal Code; Section 17, RPA 1950",
    confidence: 98,
  },
  {
    claim: "Candidates can spend unlimited money on elections",
    verdict: "FALSE",
    explanation: "No. The Election Commission of India sets expenditure limits for candidates. As of 2024, the limit is ₹95 lakh for Lok Sabha elections and ₹40 lakh for State Assembly elections (varies by state). Exceeding this limit can lead to disqualification. Candidates must maintain a daily account of expenses and submit it within 30 days of the result. However, party expenditure is separate and currently has no legal cap, which is a debated issue.",
    source: "Rule 90, Conduct of Elections Rules, 1961; ECI Notification 2024",
    confidence: 91,
  },
  {
    claim: "The minimum age to contest elections in India is 18",
    verdict: "FALSE",
    explanation: "While the voting age is 18, the minimum age to contest elections is higher. For Lok Sabha and State Assemblies (Vidhan Sabha), the minimum age is 25 years. For Rajya Sabha and State Legislative Councils (Vidhan Parishad), the minimum age is 30 years. This is specified in Articles 84 and 173 of the Indian Constitution.",
    source: "Articles 84(b) and 173(b) of the Indian Constitution",
    confidence: 97,
  },
  {
    claim: "There is no right to reject all candidates",
    verdict: "PARTIALLY_TRUE",
    explanation: "While NOTA (None of the Above) exists as an option on the EVM since 2013, it doesn't have the legal effect of rejecting all candidates. If NOTA gets the most votes, the candidate with the second-highest votes still wins. Some states like Maharashtra and Haryana have rules for local body elections where if NOTA wins, re-election is held. But for Parliamentary and Assembly elections, NOTA is essentially a symbolic protest vote.",
    source: "Supreme Court — PUCL vs Union of India (2013); Maharashtra Local Body Election Rules",
    confidence: 88,
  },
  {
    claim: "Model Code of Conduct is a law",
    verdict: "FALSE",
    explanation: "The Model Code of Conduct (MCC) is NOT a law passed by Parliament. It is a set of guidelines voluntarily agreed upon by political parties and enforced by the Election Commission of India through its administrative powers under Article 324. While it is not legally enforceable in courts, the ECI can take action against violators, including delaying campaign activities, filing FIRs under existing laws, and in extreme cases, postponing elections.",
    source: "Election Commission of India — Model Code of Conduct Guidelines",
    confidence: 94,
  },
];

export function checkFact(query: string): FactCheckResult {
  const q = query.toLowerCase().trim();

  // Try to find a matching claim
  const match = factDatabase.find((fact) => {
    const claimWords = fact.claim.toLowerCase().split(/\s+/);
    const queryWords = q.split(/\s+/);
    const matchCount = queryWords.filter((w) => 
      claimWords.some((cw) => cw.includes(w) || w.includes(cw))
    ).length;
    return matchCount >= Math.min(2, queryWords.length);
  });

  if (match) return match;

  // Keyword-based matching
  if (q.includes("online") && (q.includes("vote") || q.includes("voting"))) {
    return factDatabase[0];
  }
  if (q.includes("evm") && (q.includes("hack") || q.includes("tamper"))) {
    return factDatabase[1];
  }
  if (q.includes("aadhaar") || q.includes("aadhar")) {
    return factDatabase[2];
  }
  if (q.includes("nota")) {
    return factDatabase[3];
  }
  if (q.includes("nri")) {
    return factDatabase[4];
  }
  if (q.includes("postpone")) {
    return factDatabase[5];
  }
  if (q.includes("leave") || q.includes("holiday")) {
    return factDatabase[6];
  }
  if (q.includes("multiple") || q.includes("twice") || q.includes("double")) {
    return factDatabase[7];
  }
  if (q.includes("money") || q.includes("spend") || q.includes("expenditure")) {
    return factDatabase[8];
  }
  if (q.includes("age") && q.includes("contest")) {
    return factDatabase[9];
  }
  if (q.includes("reject")) {
    return factDatabase[10];
  }
  if (q.includes("model code") || q.includes("mcc")) {
    return factDatabase[11];
  }

  // Default: generic response
  return {
    claim: query,
    verdict: "MISLEADING",
    explanation: "This claim requires further verification with official sources. We recommend checking the Election Commission of India's official website (https://eci.gov.in) or the National Voters' Service Portal (https://voters.eci.gov.in) for accurate information. You can also call the ECI helpline at 1950 for election-related queries.",
    source: "Election Commission of India — https://eci.gov.in",
    confidence: 50,
  };
}

export function getPopularClaims(): { claim: string; verdict: string }[] {
  return factDatabase.slice(0, 8).map((f) => ({
    claim: f.claim,
    verdict: f.verdict,
  }));
}
