"use client";

import Link from "next/link";
import { useVariants } from "@/lib/variants";

/** Vises kun for den, der har valgt ikke-standard varianter i Design Lab. */
export function VariantNotice() {
  const { isCustom, reset, variants } = useVariants();
  if (!isCustom) return null;
  return (
    <div className="fixed bottom-20 left-3 z-[60] flex items-center gap-3 rounded-full bg-terracotta px-4 py-2 text-xs font-semibold text-ivory shadow-lg sm:bottom-4">
      <Link href="/design-lab/" className="underline underline-offset-2">
        Design Lab: hero {variants.hero} · story {variants.story} · menu {variants.menu}
      </Link>
      <button type="button" onClick={reset} className="rounded-full bg-ivory/20 px-2 py-0.5 hover:bg-ivory/30">
        Nulstil
      </button>
    </div>
  );
}
