"use client";

import { motion } from "motion/react";
import { useIntroRuns } from "@/lib/intro";

/** Blid sideovergang ved navigation mellem sider. */
export default function Template({ children }: { children: React.ReactNode }) {
  // Når intro-loaderen løfter sig, genstartes sidens indgangsanimationer,
  // så de spiller i det øjeblik, siden bliver synlig.
  const introRuns = useIntroRuns();
  return (
    <motion.div key={introRuns} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
      {children}
    </motion.div>
  );
}
