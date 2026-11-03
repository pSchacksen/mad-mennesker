"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { BookingButton } from "@/components/booking/BookingButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import type { BrandIconName } from "@/lib/brand-assets";
import { cn } from "@/lib/cn";

type Mode = "frokost" | "aften";

const moods: Record<
  Mode,
  { label: string; icon: BrandIconName; title: string; italic: string; text: string; points: { icon: BrandIconName; text: string }[] }
> = {
  frokost: {
    label: "Frokost",
    icon: "coffee-cup",
    title: "Lyset falder ind,",
    italic: "og ingen har travlt.",
    text: "Smørrebrødet bliver sat frem, stjerneskuddet bliver delt, og der er tid til en kold øl eller en lille én til sildene. Til forretningsfrokosten, veninderne eller turen i byen.",
    points: [
      { icon: "smorrebrod", text: "Smørrebrød og varme klassikere" },
      { icon: "people", text: "Uformelle møder rundt om bordet" },
      { icon: "coffee-cup", text: "Kaffe og dessert til sidst" },
    ],
  },
  aften: {
    label: "Aften",
    icon: "wine-glass",
    title: "Lamperne tændes,",
    italic: "samtalerne bliver længere.",
    text: "Lysene står tændt på bordene, wienerschnitzlen er gylden, og der er skænket et godt glas rødvin. Aftenen er til lange middage — og til et sidste glas i baren.",
    points: [
      { icon: "cloche", text: "Varme retter og god vin" },
      { icon: "candle", text: "Levende lys og hyggelige kroge" },
      { icon: "glass-toast", text: "Et sidste glas i baren" },
    ],
  },
};

/** "Fra frokost til aften" — interaktiv dag/aften-switch */
export function DayNight() {
  const [mode, setMode] = useState<Mode>("frokost");
  const night = mode === "aften";
  const m = moods[mode];

  return (
    <section
      aria-labelledby="dagaften-titel"
      className={cn(
        "relative isolate overflow-hidden py-24 transition-colors duration-[1400ms] ease-[var(--ease-in-out-soft)] md:py-36",
        night ? "bg-forest-night text-cream" : "on-light bg-cream text-forest",
      )}
    >
      {/* Lys-lag */}
      <div className={cn("absolute inset-0 -z-10 transition-opacity duration-[1400ms]", night ? "opacity-0" : "opacity-100")}>
        <Texture name="ivory-plaster" opacity={0.7} />
        <div className="absolute -top-40 -right-40 size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(255,236,190,0.9),transparent_65%)]" />
      </div>
      <div className={cn("absolute inset-0 -z-10 transition-opacity duration-[1400ms]", night ? "opacity-100" : "opacity-0")}>
        <Texture name="golden-bokeh" opacity={0.75} blend="normal" />
        <VectorLayer name="globe-lights" className="inset-x-0 top-0 h-80 w-full animate-glow" style={{ objectPosition: "top" }} />
      </div>

      <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionLabel index="04" className={night ? "text-brass" : "text-brass-ink"}>
              Fra frokost til aften
            </SectionLabel>
            <h2 id="dagaften-titel" className="mt-8 text-[clamp(2.8rem,6vw,5.5rem)]">
              Samme bord. <br />
              <em className={cn("display-italic", night ? "text-brass-light" : "text-terracotta-ink")}>To stemninger.</em>
            </h2>
          </div>

          {/* Switch */}
          <div
            role="radiogroup"
            aria-label="Vælg stemning"
            className={cn(
              "relative grid w-full max-w-sm grid-cols-2 rounded-full border p-1.5 sm:w-auto",
              night ? "border-cream/25 bg-forest/60" : "border-forest/20 bg-ivory/70",
            )}
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
                  onClick={() => setMode(key)}
                  onKeyDown={(e) => {
                    if (["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) {
                      e.preventDefault();
                      setMode(key === "frokost" ? "aften" : "frokost");
                    }
                  }}
                  tabIndex={checked ? 0 : -1}
                  className={cn(
                    "relative z-10 flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-sm font-semibold tracking-[0.14em] uppercase transition-colors duration-500 sm:min-w-40",
                    checked ? (night ? "text-forest-night" : "text-cream") : "opacity-80 hover:opacity-100",
                  )}
                >
                  <BrandIcon name={moods[key].icon} className="size-5" />
                  {moods[key].label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Billeder: krydsfade med lysskift */}
          <div data-cursor="media" className="relative aspect-[4/3] overflow-hidden lg:col-span-7 lg:aspect-[16/11]">
            <div className={cn("absolute inset-0 transition-[opacity,transform,filter] duration-[1400ms] ease-[var(--ease-in-out-soft)]", night ? "scale-110 opacity-0 blur-sm" : "scale-100 opacity-100")}>
              <Photo name="dining" sizes="(min-width:1024px) 58vw, 100vw" className="h-full" imgClassName="brightness-[1.12] saturate-[0.95] contrast-[0.96]" />
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,244,214,0.35),transparent_55%)] mix-blend-screen" />
            </div>
            <div className={cn("absolute inset-0 transition-[opacity,transform,filter] duration-[1400ms] ease-[var(--ease-in-out-soft)]", night ? "scale-100 opacity-100" : "scale-110 opacity-0 blur-sm")}>
              <Photo name="private-corner" sizes="(min-width:1024px) 58vw, 100vw" className="h-full" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,200,120,0.18),rgba(10,31,25,0.35)_80%)]" />
            </div>
            {/* Sol og stjerne */}
            <motion.div
              aria-hidden
              className="absolute top-5 right-5"
              animate={{ rotate: night ? 180 : 0 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className={cn("flex size-16 items-center justify-center rounded-full backdrop-blur-md transition-colors duration-700", night ? "bg-forest-night/60 text-brass-light" : "bg-ivory/70 text-terracotta-ink")}>
                {night ? <Ornament name="four-point-star" className="size-7" /> : <BrandIcon name="coffee-cup" className="size-7" />}
              </div>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center lg:col-span-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                aria-live="polite"
              >
                <h3 className="text-[clamp(2.2rem,3.6vw,3.4rem)]">
                  {m.title} <br />
                  <em className={cn("display-italic", night ? "text-brass-light" : "text-terracotta-ink")}>{m.italic}</em>
                </h3>
                <p className={cn("mt-6 text-lg", night ? "text-cream/85" : "text-ink-muted")}>{m.text}</p>
                <ul className="mt-8 space-y-4">
                  {m.points.map((p) => (
                    <li key={p.text} className="flex items-center gap-4">
                      <span className={cn("flex size-11 items-center justify-center rounded-full border", night ? "border-brass/50 text-brass" : "border-forest/20 text-brass-ink")}>
                        <BrandIcon name={p.icon} className="size-5" />
                      </span>
                      {p.text}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
            <div className="mt-10">
              <BookingButton variant={night ? "brass" : "forest"} label={night ? "Reserver til aften" : "Reserver til frokost"} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
