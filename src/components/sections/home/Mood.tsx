"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
import { BookingButton } from "@/components/booking/BookingButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/Reveal";
import type { BrandIconName } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

type Mode = "frokost" | "aften";

const moods: Record<Mode, { label: string; icon: BrandIconName; text: string; photo: "dining" | "private-corner" }> = {
  frokost: {
    label: "Frokost",
    icon: "coffee-cup",
    photo: "dining",
    text: "Lyset falder ind over bordene. Smørrebrødet bliver sat frem, stjerneskuddet bliver delt, og der er tid til en kold øl — eller en lille én til sildene.",
  },
  aften: {
    label: "Aften",
    icon: "wine-glass",
    photo: "private-corner",
    text: "Lamperne tændes, lysene står på bordene, og samtalerne bliver lidt længere. Et godt glas vin, en gylden schnitzel — og måske et sidste glas i baren.",
  },
};

/** Stemningen: "dem, vi deler bordet med" + frokost/aften-switch på én skærm */
export function Mood() {
  const [mode, setMode] = useState<Mode>("frokost");
  const night = mode === "aften";
  const m = moods[mode];

  return (
    <section
      aria-labelledby="stemning-titel"
      className={cn(
        "relative isolate overflow-hidden transition-colors duration-[1200ms] ease-[var(--ease-in-out-soft)]",
        night ? "bg-forest-night text-cream" : "on-light bg-cream text-forest",
      )}
    >
      <div className={cn("transition-opacity duration-[1200ms]", night ? "opacity-100" : "opacity-0")}>
        <GlobeLamps count={3} />
      </div>
      <div className="relative mx-auto grid max-w-[76rem] items-center gap-12 px-5 py-24 md:grid-cols-[minmax(0,30rem)_1fr] md:gap-20 md:px-10 md:py-32">
        <div className="relative order-2 md:order-1">
          <div data-cursor="media" className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
            {(["frokost", "aften"] as Mode[]).map((k) => (
              <div
                key={k}
                className={cn(
                  "absolute inset-0 transition-[opacity,transform] duration-[1200ms] ease-[var(--ease-in-out-soft)]",
                  mode === k ? "scale-100 opacity-100" : "scale-[1.04] opacity-0",
                )}
              >
                <Photo name={moods[k].photo} sizes="(min-width:768px) 30rem, 90vw" className="h-full" imgClassName={k === "frokost" ? "object-[30%_50%]" : "object-[45%_50%]"} />
              </div>
            ))}
          </div>
          <Ornament
            name={night ? "four-point-star" : "corner-botanical"}
            className={cn("absolute -top-6 -right-6 size-16 transition-colors duration-700", night ? "text-brass-light" : "text-brass-ink")}
          />
        </div>

        <div className="order-1 md:order-2">
          <SectionLabel index="03" className={night ? "text-brass" : "text-brass-ink"}>Fra frokost til aften</SectionLabel>
          <RevealLines
            id="stemning-titel"
            className="mt-7 text-[clamp(2.6rem,5vw,4.4rem)]"
            lines={["Det handler om dem,", <em key="b" className={cn("display-italic transition-colors duration-700", night ? "text-brass-light" : "text-terracotta-ink")}>vi deler bordet med.</em>]}
          />

          <div
            role="radiogroup"
            aria-label="Vælg stemning"
            className={cn("relative mt-10 inline-grid grid-cols-2 rounded-full border p-1.5", night ? "border-cream/25" : "border-forest/20")}
          >
            <motion.span
              aria-hidden
              className={cn("absolute inset-y-1.5 left-1.5 w-[calc(50%-0.375rem)] rounded-full", night ? "bg-brass" : "bg-forest")}
              animate={{ x: night ? "100%" : "0%" }}
              transition={{ type: "spring", stiffness: 260, damping: 28 }}
            />
            {(Object.keys(moods) as Mode[]).map((key) => {
              const checked = mode === key;
              return (
                <button
                  key={key}
                  type="button"
                  role="radio"
                  aria-checked={checked}
                  tabIndex={checked ? 0 : -1}
                  onClick={() => setMode(key)}
                  onKeyDown={(e) => {
                    if (e.key.startsWith("Arrow")) {
                      e.preventDefault();
                      setMode(key === "frokost" ? "aften" : "frokost");
                    }
                  }}
                  className={cn(
                    "relative z-10 flex min-h-12 min-w-36 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase transition-colors duration-500",
                    checked ? (night ? "text-forest-night" : "text-cream") : "opacity-80 hover:opacity-100",
                  )}
                >
                  <BrandIcon name={moods[key].icon} className="size-5" />
                  {moods[key].label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={mode}
              aria-live="polite"
              className={cn("mt-8 max-w-lg text-lg", night ? "text-cream/85" : "text-ink-muted")}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45 }}
            >
              {m.text}
            </motion.p>
          </AnimatePresence>
          <div className="mt-10">
            <BookingButton variant={night ? "brass" : "forest"} label={night ? "Reserver til aften" : "Reserver til frokost"} />
          </div>
        </div>
      </div>
    </section>
  );
}
