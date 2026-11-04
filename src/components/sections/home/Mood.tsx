"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { Photo, type PhotoName } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
import { BookingButton } from "@/components/booking/BookingButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { RevealLines } from "@/components/motion/Reveal";
import type { BrandIconName } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

type Mode = "frokost" | "aften";

const moods: Record<
  Mode,
  { label: string; icon: BrandIconName; text: string; photo: PhotoName; pos: string; detail: PhotoName; detailPos: string; origin: string }
> = {
  frokost: {
    label: "Frokost",
    icon: "coffee-cup",
    photo: "mad-roastbeef",
    pos: "object-[42%_55%]",
    detail: "mad-aeg-rejer",
    detailPos: "object-[55%_55%]",
    origin: "12% 10%",
    text: "Lyset falder ind over bordene. Smørrebrødet bliver sat frem, stjerneskuddet bliver delt, og der er tid til en kold øl — eller en lille én til sildene.",
  },
  aften: {
    label: "Aften",
    icon: "wine-glass",
    photo: "rum-spisesal",
    pos: "object-[55%_50%]",
    detail: "bord-blomster",
    detailPos: "object-[70%_60%]",
    origin: "88% 8%",
    text: "Lamperne tændes, lysene står på bordene, og samtalerne bliver lidt længere. Et godt glas vin, en gylden schnitzel — og måske et sidste glas i baren.",
  },
};

/**
 * Fra frokost til aften: samme bord, to stemninger. Skiftet ændrer baggrund,
 * hovedfoto (afsløres som lys, der breder sig fra hver sin side), detaljefoto,
 * tekst og lys — dagslysstriber til frokost, lamper og levende lys om aftenen.
 */
export function Mood() {
  const [mode, setMode] = useState<Mode>("frokost");
  const reduce = useReducedMotion();
  const night = mode === "aften";
  const m = moods[mode];

  return (
    <section
      aria-labelledby="stemning-titel"
      className={cn(
        "relative isolate -mt-10 overflow-hidden rounded-t-[50%_2.5rem] md:-mt-16 md:rounded-t-[50%_4.5rem] transition-colors duration-[1400ms] ease-[var(--ease-in-out-soft)]",
        night ? "bg-forest-night text-cream" : "on-light bg-cream text-forest",
      )}
    >
      {/* Lys: dagslysstriber om dagen, lamper og varm glød om aftenen */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 transition-opacity duration-[1400ms]", night ? "opacity-0" : "opacity-100")}
        style={{
          background:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0) 0 7rem, rgba(255,250,236,0.55) 7rem 11rem, rgba(255,255,255,0) 11rem 19rem)",
          maskImage: "linear-gradient(200deg, #000 10%, transparent 65%)",
          WebkitMaskImage: "linear-gradient(200deg, #000 10%, transparent 65%)",
        }}
      />
      <div aria-hidden className={cn("pointer-events-none transition-opacity duration-[1400ms]", night ? "opacity-100" : "opacity-0")}>
        <GlobeLamps count={3} />
        <div className="candle-flicker absolute inset-0 bg-[radial-gradient(50%_45%_at_30%_60%,rgba(255,186,110,0.14),transparent_70%)]" />
      </div>

      <div className="relative mx-auto grid max-w-[84rem] items-center gap-12 px-5 pt-24 pb-28 md:px-10 md:pt-32 md:pb-44 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <div className="relative order-2 pb-10 lg:order-1 lg:pb-0">
          <div data-cursor="media" className="relative aspect-[5/4] overflow-hidden rounded-[2px] bg-forest-deep">
            <AnimatePresence initial={false}>
              <motion.div
                key={mode}
                className="absolute inset-0"
                initial={reduce ? { opacity: 0 } : { clipPath: `circle(0% at ${m.origin})` }}
                animate={reduce ? { opacity: 1 } : { clipPath: `circle(150% at ${m.origin})` }}
                exit={{ opacity: 1, transition: { duration: 1.3 } }}
                transition={{ duration: 1.3, ease: [0.65, 0, 0.35, 1] }}
              >
                <motion.div className="h-full" initial={reduce ? false : { scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}>
                  <Photo name={m.photo} sizes="(min-width:1024px) 42rem, 92vw" className="h-full" imgClassName={cn(m.pos, !night && "brightness-[1.06]")} />
                </motion.div>
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden
              className={cn(
                "pointer-events-none absolute inset-0 transition-opacity duration-[1400ms]",
                night ? "bg-[radial-gradient(90%_80%_at_50%_45%,transparent_40%,rgba(10,31,25,0.55))] opacity-100" : "bg-[linear-gradient(200deg,rgba(255,248,230,0.28),transparent_55%)] opacity-100",
              )}
            />
          </div>

          {/* Detaljefoto, der skifter med */}
          <div className="absolute -right-3 -bottom-2 w-[42%] sm:-right-8 lg:-right-14 lg:-bottom-12 lg:w-[38%]">
            <div className={cn("relative aspect-square overflow-hidden rounded-full ring-[6px] transition-[--tw-ring-color] duration-[1400ms]", night ? "ring-forest-night" : "ring-cream")}>
              <AnimatePresence initial={false}>
                <motion.div
                  key={m.detail}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { opacity: 0, rotate: night ? 30 : -30, scale: 1.2 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Photo name={m.detail} sizes="(min-width:1024px) 16rem, 42vw" className="h-full" imgClassName={cn(m.detailPos, "scale-[1.3]")} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <Ornament
            name={night ? "four-point-star" : "corner-botanical"}
            className={cn("absolute -top-6 -left-6 size-14 transition-colors duration-700", night ? "text-brass-light" : "text-brass-ink")}
          />
        </div>

        <div className="order-1 lg:order-2">
          <SectionLabel index="04" className={night ? "text-brass" : "text-brass-ink"}>Fra frokost til aften</SectionLabel>
          <RevealLines
            id="stemning-titel"
            className="mt-7 text-[clamp(2.6rem,5vw,4.4rem)]"
            lines={["Samme bord,", <em key="b" className={cn("display-italic transition-colors duration-700", night ? "text-brass-light" : "text-terracotta-ink")}>to stemninger.</em>]}
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
