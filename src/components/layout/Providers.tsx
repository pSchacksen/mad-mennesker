"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { VariantProvider } from "@/lib/variants";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <VariantProvider>{children}</VariantProvider>
    </MotionConfig>
  );
}
