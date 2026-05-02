import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AIChatPanel } from "@/components/AIChatPanel";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  title: "CivicGuide AI — Your Personalized Voting Journey",
  description: "CivicGuide AI transforms the complex Indian election process into a personalized, step-by-step journey for every voter. Understand your vote. Own your democracy.",
  keywords: "Indian elections, voter guide, election process, ECI, voter registration, EVM, NOTA, civic education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("dark font-sans", dmSans.variable, fraunces.variable)}>
      <body className="antialiased min-h-screen selection:bg-primary/30">
        {children}
        <AIChatPanel />
      </body>
    </html>
  );
}
