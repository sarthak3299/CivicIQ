export interface Flashcard {
  id: string;
  category: string;
  categoryColor: string;
  question: string;
  answer: string;
  funFact?: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
}

export const flashcardCategories = [
  { id: "all", label: "All Topics", color: "#6366F1" },
  { id: "basics", label: "Voting Basics", color: "#10B981" },
  { id: "constitution", label: "Constitutional Rights", color: "#F5B700" },
  { id: "eci", label: "Election Commission", color: "#06B6D4" },
  { id: "evm", label: "EVM & Technology", color: "#8B5CF6" },
  { id: "laws", label: "Laws & Acts", color: "#F43F5E" },
  { id: "process", label: "Election Process", color: "#EC4899" },
  { id: "history", label: "Election History", color: "#F97316" },
];

export const flashcardsData: Flashcard[] = [
  // === VOTING BASICS ===
  {
    id: "fb-1",
    category: "basics",
    categoryColor: "#10B981",
    question: "What is the minimum age to vote in India?",
    answer: "18 years. Any Indian citizen who has attained the age of 18 years on the qualifying date (1st January of the year of revision of electoral roll) is eligible to register as a voter.",
    funFact: "The voting age was reduced from 21 to 18 by the 61st Constitutional Amendment Act, 1988.",
    icon: "🎂",
    difficulty: "beginner",
  },
  {
    id: "fb-2",
    category: "basics",
    categoryColor: "#10B981",
    question: "What is EPIC and why is it important?",
    answer: "EPIC stands for Electors Photo Identity Card, commonly known as Voter ID Card. It is the primary identity document for voting. Since 2021, you can also download the e-EPIC (digital version) from the ECI portal or Voter Helpline App.",
    funFact: "The first Voter ID cards were introduced in 1993 during the tenure of Chief Election Commissioner T.N. Seshan.",
    icon: "🪪",
    difficulty: "beginner",
  },
  {
    id: "fb-3",
    category: "basics",
    categoryColor: "#10B981",
    question: "What is NOTA and when was it introduced?",
    answer: "NOTA (None of the Above) allows voters to officially reject all candidates. It was introduced in September 2013 following the Supreme Court judgment in PUCL vs Union of India. NOTA appears as the last option on the EVM with a ballot symbol of a crossed-out box.",
    funFact: "India was the 14th country to introduce a form of negative voting. The NOTA symbol was designed by the National Institute of Design, Ahmedabad.",
    icon: "🚫",
    difficulty: "beginner",
  },
  {
    id: "fb-4",
    category: "basics",
    categoryColor: "#10B981",
    question: "What is the indelible ink used in elections?",
    answer: "Indelible ink (containing silver nitrate) is applied to the left index finger of every voter to prevent double voting. It is manufactured exclusively by Mysore Paints and Varnish Limited, a Karnataka government enterprise. The ink lasts 48-72 hours and cannot be easily removed.",
    funFact: "Mysore Paints has been the sole supplier of election ink since 1962 and also exports it to 25+ countries!",
    icon: "✍️",
    difficulty: "beginner",
  },
  // === CONSTITUTIONAL RIGHTS ===
  {
    id: "fb-5",
    category: "constitution",
    categoryColor: "#F5B700",
    question: "Which Article of the Constitution deals with elections?",
    answer: "Articles 324 to 329 deal with elections. Article 324 vests the superintendence, direction, and control of elections in the Election Commission of India. Article 326 provides for adult suffrage. Article 325 ensures no person is ineligible for electoral roll on grounds of religion, race, caste, or sex.",
    icon: "📜",
    difficulty: "intermediate",
  },
  {
    id: "fb-6",
    category: "constitution",
    categoryColor: "#F5B700",
    question: "Is the right to vote a Fundamental Right?",
    answer: "No, the right to vote is a Constitutional Right (statutory right), not a Fundamental Right. It is granted under Article 326 and governed by the Representation of the People Act. However, the Supreme Court has held that the right to vote is a 'constitutional right' that forms part of the basic structure of democracy.",
    funFact: "In PUCL vs Union of India (2003), the SC held that the right to know about candidates is part of the right to information under Article 19(1)(a) — a Fundamental Right.",
    icon: "⚖️",
    difficulty: "advanced",
  },
  {
    id: "fb-7",
    category: "constitution",
    categoryColor: "#F5B700",
    question: "What are the qualifications to become a Member of Parliament?",
    answer: "For Lok Sabha: Must be a citizen of India, at least 25 years old, and meet other qualifications prescribed by law. For Rajya Sabha: Must be at least 30 years old. Must not hold any office of profit, must not be of unsound mind, and must not be an undischarged insolvent.",
    icon: "🏛️",
    difficulty: "intermediate",
  },
  // === ELECTION COMMISSION ===
  {
    id: "fb-8",
    category: "eci",
    categoryColor: "#06B6D4",
    question: "What is the structure of the Election Commission of India?",
    answer: "The ECI is a permanent constitutional body consisting of the Chief Election Commissioner (CEC) and two Election Commissioners. They have equal powers and decisions are made by majority. The CEC can only be removed through impeachment (same process as a Supreme Court judge). The ECI was established on 25th January 1950.",
    funFact: "25th January is celebrated as National Voters' Day since 2011, as it marks the founding of the ECI.",
    icon: "🏢",
    difficulty: "intermediate",
  },
  {
    id: "fb-9",
    category: "eci",
    categoryColor: "#06B6D4",
    question: "What is the Model Code of Conduct (MCC)?",
    answer: "The MCC is a set of guidelines issued by the ECI for political parties and candidates during elections. It comes into force from the date of announcement of elections and remains in effect until the results are declared. It covers: general conduct, meetings & processions, polling day behavior, use of government machinery, and the election manifesto.",
    funFact: "The first formal MCC was introduced in 1960 for the Kerala Assembly elections. It's not a law — it's a voluntary code enforced by ECI's administrative power.",
    icon: "📋",
    difficulty: "intermediate",
  },
  {
    id: "fb-10",
    category: "eci",
    categoryColor: "#06B6D4",
    question: "Who was the first Chief Election Commissioner of India?",
    answer: "Sukumar Sen was the first Chief Election Commissioner of India (1950-1958). He conducted India's first general election in 1951-52 — the largest democratic exercise in history at that time, with 173 million eligible voters across 26 states.",
    funFact: "The first general election took 4 months to complete (Oct 1951 — Feb 1952) and used ballot boxes with party symbols since most voters couldn't read.",
    icon: "👤",
    difficulty: "intermediate",
  },
  // === EVM & TECHNOLOGY ===
  {
    id: "fb-11",
    category: "evm",
    categoryColor: "#8B5CF6",
    question: "How does an EVM (Electronic Voting Machine) work?",
    answer: "An EVM has two units: Ballot Unit (for voters, showing candidate names and symbols) and Control Unit (with the Presiding Officer). They're connected by a 5-meter cable. EVMs are standalone, battery-operated, and NOT connected to any network. Each keypress is registered only once — preventing multiple votes. M3 EVMs (latest) have enhanced security features including tamper detection.",
    icon: "🖥️",
    difficulty: "beginner",
  },
  {
    id: "fb-12",
    category: "evm",
    categoryColor: "#8B5CF6",
    question: "What is VVPAT and how does it work?",
    answer: "VVPAT (Voter Verifiable Paper Audit Trail) is a machine attached to EVMs that prints a paper slip when you vote. The slip shows the candidate's name, symbol, and serial number. It's visible through a transparent window for 7 seconds, then automatically drops into a sealed box. VVPAT was introduced after the Supreme Court's 2013 directive and became mandatory for all elections since 2019.",
    funFact: "In 2019 General Elections, the SC ordered VVPAT verification of 5 random machines per constituency (increased from 1) to enhance public confidence.",
    icon: "🖨️",
    difficulty: "intermediate",
  },
  // === LAWS & ACTS ===
  {
    id: "fb-13",
    category: "laws",
    categoryColor: "#F43F5E",
    question: "What are the key election laws in India?",
    answer: "The main laws are:\n1. Representation of the People Act, 1950 — Deals with electoral rolls and seat allocation\n2. Representation of the People Act, 1951 — Deals with conduct of elections, electoral offences, and disputes\n3. Conduct of Elections Rules, 1961 — Detailed rules for conducting elections\n4. Presidential and Vice-Presidential Elections Act, 1952",
    icon: "📚",
    difficulty: "advanced",
  },
  {
    id: "fb-14",
    category: "laws",
    categoryColor: "#F43F5E",
    question: "What are electoral offences under Indian law?",
    answer: "Key offences include: Promoting enmity between groups (Sec 153A IPC), bribery (Sec 171B IPC), undue influence (Sec 171C IPC), personation at election (Sec 171D IPC), false statements about candidates (Sec 171G IPC), booth capturing (Sec 135A RPA), exceeding election expenditure limit, and violation of MCC provisions.",
    funFact: "Booth capturing carries a penalty of 3-5 years imprisonment and the election can be declared void!",
    icon: "🚨",
    difficulty: "advanced",
  },
  {
    id: "fb-15",
    category: "laws",
    categoryColor: "#F43F5E",
    question: "Can convicted criminals contest elections?",
    answer: "Under Section 8 of the Representation of the People Act, 1951, a person convicted with a sentence of 2 years or more is disqualified from contesting elections for 6 years after release. However, those in jail as undertrial prisoners (not convicted) can still contest. In 2013, the SC in Lily Thomas v. Union of India held that MPs/MLAs stand disqualified immediately upon conviction — no more staying-in-office during appeal.",
    icon: "⚖️",
    difficulty: "advanced",
  },
  // === ELECTION PROCESS ===
  {
    id: "fb-16",
    category: "process",
    categoryColor: "#EC4899",
    question: "What is the difference between Lok Sabha and Rajya Sabha elections?",
    answer: "Lok Sabha (House of the People): 543 members directly elected by voters through universal adult suffrage using FPTP system. Term: 5 years.\n\nRajya Sabha (Council of States): 245 members, of which 233 are elected by state legislative assemblies through proportional representation (single transferable vote), and 12 are nominated by the President. Members serve 6-year terms with 1/3 retiring every 2 years.",
    icon: "🏛️",
    difficulty: "intermediate",
  },
  {
    id: "fb-17",
    category: "process",
    categoryColor: "#EC4899",
    question: "What is the First-Past-The-Post (FPTP) system?",
    answer: "India uses the FPTP system for Lok Sabha and Vidhan Sabha elections. The candidate who gets the most votes in a constituency wins — they don't need a majority (50%+), just more votes than any other candidate. This is also called the 'simple plurality' system. Critics argue it can lead to a candidate winning with just 20-30% of votes.",
    funFact: "In the 2014 Lok Sabha elections, the BJP won 282 seats (52% of seats) with just 31% of the total votes cast — a characteristic of FPTP.",
    icon: "🏆",
    difficulty: "intermediate",
  },
  {
    id: "fb-18",
    category: "process",
    categoryColor: "#EC4899",
    question: "What is Delimitation?",
    answer: "Delimitation is the process of fixing boundaries and allocating seats to electoral constituencies. It is done by a Delimitation Commission, an independent body appointed by the President. The last delimitation was done in 2002 (based on 2001 Census) for all states except Jammu & Kashmir. Delimitation determines how many constituencies each state gets and their geographic boundaries.",
    icon: "🗺️",
    difficulty: "advanced",
  },
  // === HISTORY ===
  {
    id: "fb-19",
    category: "history",
    categoryColor: "#F97316",
    question: "When was the first general election held in India?",
    answer: "India's first general election was held from October 25, 1951, to February 21, 1952. It was the largest democratic exercise in the world at that time, with 173 million eligible voters. The Indian National Congress won 364 out of 489 seats. Jawaharlal Nehru became the first democratically elected Prime Minister.",
    funFact: "Since most voters were illiterate, each candidate had a unique symbol and separate ballot boxes. Voters dropped a blank ballot paper into the box of their chosen candidate!",
    icon: "📜",
    difficulty: "beginner",
  },
  {
    id: "fb-20",
    category: "history",
    categoryColor: "#F97316",
    question: "How many general elections has India held so far?",
    answer: "India has held 18 general elections since independence (1st in 1951-52, most recent 18th in 2024). India is the world's largest democracy with over 960 million eligible voters (as of 2024). The ECI sets up approximately 1 million polling stations for general elections — more than any country in the world.",
    funFact: "The 2024 General Election was conducted in 7 phases over 44 days, with over 8,000 candidates contesting for 543 seats!",
    icon: "🗓️",
    difficulty: "beginner",
  },
  {
    id: "fb-21",
    category: "history",
    categoryColor: "#F97316",
    question: "What is the significance of T.N. Seshan?",
    answer: "Tirunellai Narayana Iyer Seshan (10th CEC, 1990-1996) is credited with revolutionizing Indian elections. He strictly enforced the Model Code of Conduct, introduced voter ID cards, cracked down on booth capturing, and made the ECI a powerful, independent body. Before Seshan, elections were often marred by violence and malpractice.",
    funFact: "T.N. Seshan was awarded the Ramon Magsaysay Award in 1996 for 'restoring the integrity and credibility of the electoral process in India.'",
    icon: "🌟",
    difficulty: "intermediate",
  },
  {
    id: "fb-22",
    category: "basics",
    categoryColor: "#10B981",
    question: "Can I vote if I have lost my Voter ID?",
    answer: "Yes! You can still vote even without your EPIC. The Election Commission allows 12 alternative photo identity documents including: Aadhaar Card, Passport, Driving License, PAN Card, Service Photo ID (govt employees), Student ID issued by university, Bank Passbook with photo, MNREGA Job Card, Health Insurance Smart Card, Pension Document with photo, and MP/MLA/MLC ID.",
    icon: "🔍",
    difficulty: "beginner",
  },
  {
    id: "fb-23",
    category: "process",
    categoryColor: "#EC4899",
    question: "What are Postal Ballots and who can use them?",
    answer: "Postal ballots allow certain categories of voters to cast their vote by mail. Eligible categories include: Armed forces personnel, paramilitary forces, government employees on election duty, voters on preventive detention, special voters (President, Vice President, Governors, etc.), voters above 80 years of age, Persons with Disabilities (PwD), and COVID-19 positive patients (added in 2020).",
    funFact: "In the 2020 Bihar elections, postal ballots were used for the first time by COVID-positive voters and voters above 80.",
    icon: "📮",
    difficulty: "intermediate",
  },
  {
    id: "fb-24",
    category: "eci",
    categoryColor: "#06B6D4",
    question: "What is the Voter Helpline App?",
    answer: "The Voter Helpline App (by ECI) is a one-stop mobile application for voters. Features include: Search your name in the electoral roll, Apply for new voter registration (Form 6), Apply for corrections (Form 8), Find your polling booth, Download e-EPIC, Track application status, File election complaints (cVIGIL), and Get election-related information. Available on Android and iOS.",
    icon: "📱",
    difficulty: "beginner",
  },
];

export function getFlashcardsByCategory(category: string): Flashcard[] {
  if (category === "all") return flashcardsData;
  return flashcardsData.filter((f) => f.category === category);
}

export function getFlashcardsByDifficulty(difficulty: string): Flashcard[] {
  return flashcardsData.filter((f) => f.difficulty === difficulty);
}
