"use client";

import Link from "next/link";
import { AnimatePresence, motion, useInView, useReducedMotion, type PanInfo } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { featuredDishes, formatPrice, menuStatus } from "@/content/menu";
import { defaultKitchen, kitchenOptions } from "@/content/design";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { RevealLines, Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buttonStyles } from "@/components/booking/BookingButton";
import { useVariantParam } from "@/lib/useVariantParam";
import { cn } from "@/lib/cn";

/*
 * DET GODE DANSKE KØKKEN
 * Retterne kommer fra featuredDishes i src/content/menu.ts, og hver ret vises
 * kun med sit eget foto. "Dagens danske ret" har intet foto (den skifter) og
 * vises derfor typografisk — aldrig med et tilfældigt billede.
 */

type Dish = (typeof featuredDishes)[number];
const AUTO_MS = 6500;

function Header() {
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,26rem)] lg:items-end">
      <div>
        <SectionLabel index="02" className="text-brass">Køkkenet</SectionLabel>
        <RevealLines
          id="klassikere-titel"
          className="mt-7 text-[clamp(2.6rem,5.4vw,5rem)]"
          lines={["Det gode", <em key="d" className="display-italic text-brass-light">danske køkken.</em>]}
        />
      </div>
      <Reveal delay={0.1} className="lg:pb-2">
        <p className="text-lg text-cream/80">Et lille kort med de retter, vi holder allermest af. Lavet af gode råvarer og serveret, som de skal.</p>
      </Reveal>
    </div>
  );
}

function Footnote() {
  return (
    <div className="mt-14 flex flex-col gap-6 border-t border-cream/12 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <p className="flex items-start gap-2 text-sm text-cream/60">
        <Ornament name="four-point-star" className="mt-1 size-3 text-brass" />
        {menuStatus.note} Billederne er visualiseringer.
      </p>
      <Link href="/menukort/" className={cn(buttonStyles("brass", "lg"), "shrink-0")}>
        <BrandIcon name="fork-knife" className="size-[1.15em]" />
        Hele menukortet
      </Link>
    </div>
  );
}

/** Dagens ret har intet fast foto — den præsenteres typografisk. */
function DailyPanel({ dish, compact = false }: { dish: Dish; compact?: boolean }) {
  return (
    <div className="relative flex h-full flex-col items-center justify-center overflow-hidden bg-[radial-gradient(80%_70%_at_50%_40%,#21483b,var(--color-forest-deep))] p-8 text-center">
      <div aria-hidden className="absolute inset-6 rounded-[2px] border border-brass/25" />
      <BrandIcon name="chef-hat" className={cn("text-brass", compact ? "size-14" : "size-20")} />
      <p className="mt-6 eyebrow text-brass">Skifter dagligt</p>
      <p className={cn("mt-4 font-display italic text-cream", compact ? "text-3xl" : "text-[clamp(2rem,3.4vw,3rem)]")}>Spørg os, hvad køkkenet har lavet i dag</p>
      <p className="mt-3 max-w-xs text-sm text-cream/70">{dish.line}</p>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   A — RETTERNE SKIFTER
   ───────────────────────────────────────────────────────────── */
export function KitchenShowcase() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [i, setI] = useState(0);
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const len = featuredDishes.length;
  const d = featuredDishes[i];

  const go = useCallback(
    (n: number, user = true) => {
      if (user) setAuto(false);
      setI(((n % len) + len) % len);
    },
    [len],
  );

  // Retterne skifter af sig selv, indtil gæsten selv vælger — og kun når sektionen ses.
  useEffect(() => {
    if (!auto || reduce || !inView || hold) return;
    const t = window.setTimeout(() => go(i + 1, false), AUTO_MS);
    return () => window.clearTimeout(t);
  }, [auto, reduce, inView, hold, i, go]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x < -50) go(i + 1);
    else if (info.offset.x > 50) go(i - 1);
  };

  return (
    <section ref={ref} aria-labelledby="klassikere-titel" className="grain relative isolate -mt-10 overflow-hidden rounded-t-[50%_2.5rem] bg-forest text-cream md:-mt-16 md:rounded-t-[50%_4.5rem]">
      <div className="relative mx-auto max-w-[84rem] px-5 py-20 md:px-10 md:py-28">
        <Header />

        <div
          className="mt-12 grid items-center gap-8 lg:mt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-16"
          onMouseEnter={() => setHold(true)}
          onMouseLeave={() => setHold(false)}
        >
          {/* Retterne som stor typografi (desktop) */}
          <ol role="tablist" aria-label="Klassikerne" aria-orientation="vertical" className="hidden border-t border-cream/12 lg:block">
            {featuredDishes.map((dish, n) => {
              const active = n === i;
              return (
                <li key={dish.id} className="border-b border-cream/12">
                  <button
                    type="button"
                    role="tab"
                    id={`ret-${dish.id}`}
                    aria-selected={active}
                    aria-controls="ret-panel"
                    onMouseEnter={() => go(n)}
                    onFocus={() => go(n)}
                    onClick={() => go(n)}
                    className="group flex w-full items-baseline gap-5 py-4 text-left"
                  >
                    <span className={cn("w-7 shrink-0 font-sans text-xs font-semibold tracking-[0.2em] transition-colors duration-500", active ? "text-brass" : "text-cream/35")}>
                      {String(n + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "font-display text-[clamp(2rem,3.1vw,3.1rem)] leading-[1.05] transition-[color,transform] duration-500 ease-[var(--ease-out-soft)]",
                        active ? "translate-x-1 text-cream" : "text-cream/40 group-hover:text-cream/75",
                      )}
                    >
                      {dish.name}
                    </span>
                    <span aria-hidden className={cn("mb-2 flex-1 border-b border-dotted transition-colors duration-500", active ? "border-brass/60" : "border-cream/15")} />
                    <span className={cn("shrink-0 font-display text-xl transition-colors duration-500", active ? "text-brass-light" : "text-cream/40")}>
                      {formatPrice(dish.price)} <span className="text-sm">kr.</span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {active && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-4 pb-6 pl-12">
                          <BrandIcon name={dish.icon} className="mt-1 size-6 shrink-0 text-brass" />
                          <p className="max-w-md text-cream/75">{dish.story}</p>
                        </div>
                        {auto && (
                          <span aria-hidden className="block h-px bg-cream/10 motion-reduce:hidden">
                            <motion.span
                              key={`${i}-${hold}`}
                              className="block h-px origin-left bg-brass"
                              initial={{ scaleX: 0 }}
                              animate={{ scaleX: hold || !inView ? 0 : 1 }}
                              transition={{ duration: AUTO_MS / 1000, ease: "linear" }}
                            />
                          </span>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ol>

          {/* Det store foto */}
          <div id="ret-panel" role="tabpanel" aria-labelledby={`ret-${d.id}`} className="relative">
            <motion.div
              drag={reduce ? false : "x"}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
              className="relative aspect-[4/3] touch-pan-y overflow-hidden rounded-[2px] bg-forest-deep shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)] lg:rounded-tr-[9rem]"
            >
              <AnimatePresence initial={false}>
                <motion.div
                  key={d.id}
                  className="absolute inset-0"
                  initial={reduce ? { opacity: 0 } : { clipPath: "inset(100% 0% 0% 0%)" }}
                  animate={reduce ? { opacity: 1 } : { clipPath: "inset(0% 0% 0% 0%)" }}
                  exit={{ opacity: 1, transition: { duration: 1 } }}
                  transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
                >
                  {d.image ? (
                    <motion.div
                      className="h-full"
                      initial={reduce ? false : { scale: 1.14 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Photo name={d.image} sizes="(min-width:1024px) 44rem, 92vw" className="h-full" imgClassName="object-[50%_55%]" />
                    </motion.div>
                  ) : (
                    <DailyPanel dish={d} />
                  )}
                </motion.div>
              </AnimatePresence>
              {d.image && (
                <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-night/75 to-transparent" />
              )}
              <p className="pointer-events-none absolute top-4 left-4 rounded-full bg-forest-night/55 px-3 py-1 text-[0.68rem] font-semibold tracking-[0.2em] text-cream backdrop-blur">
                {String(i + 1).padStart(2, "0")} / {String(len).padStart(2, "0")}
              </p>
              <AnimatePresence mode="wait">
                {d.image && (
                  <motion.p
                    key={d.id}
                    className="pointer-events-none absolute bottom-4 left-5 flex items-center gap-2 font-display text-lg text-cream italic md:bottom-6 md:left-7 md:text-xl"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <BrandIcon name={d.icon} className="size-5 text-brass-light not-italic" />
                    {d.line}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
            <Ornament name="corner-botanical" className="pointer-events-none absolute -bottom-8 -left-8 hidden size-20 text-brass/60 lg:block" />

            {/* Mobil: navn, pris, historie og kontroller */}
            <div className="mt-6 lg:hidden" aria-live="polite">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-[2.3rem] leading-none">{d.name}</h3>
                <p className="shrink-0 font-display text-xl text-brass-light">
                  {formatPrice(d.price)} <span className="text-sm">kr.</span>
                </p>
              </div>
              <p className="mt-3 text-cream/75">{d.story}</p>
            </div>
            <div className="mt-6 flex items-center justify-between gap-4 lg:hidden">
              <button type="button" onClick={() => go(i - 1)} aria-label="Forrige ret" className="flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-brass">
                <BrandIcon name="arrow-right" className="size-5 rotate-180" />
              </button>
              <div className="flex gap-2">
                {featuredDishes.map((dish, n) => (
                  <button
                    key={dish.id}
                    type="button"
                    onClick={() => go(n)}
                    aria-label={`Vis ${dish.name}`}
                    aria-current={n === i}
                    className="flex size-6 items-center justify-center"
                  >
                    <span className={cn("block h-1.5 rounded-full transition-all duration-500", n === i ? "w-6 bg-brass" : "w-1.5 bg-cream/35")} />
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => go(i + 1)} aria-label="Næste ret" className="flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-brass">
                <BrandIcon name="arrow-right" className="size-5" />
              </button>
            </div>
          </div>
        </div>

        <Footnote />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   B — FOTORULLE
   ───────────────────────────────────────────────────────────── */
export function KitchenReel() {
  const scroller = useRef<HTMLDivElement>(null);
  const step = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    el.scrollBy({ left: dir * ((card?.offsetWidth ?? 400) + 32), behavior: "smooth" });
  };

  return (
    <section aria-labelledby="klassikere-titel" className="grain relative isolate -mt-10 overflow-hidden rounded-t-[50%_2.5rem] bg-forest text-cream md:-mt-16 md:rounded-t-[50%_4.5rem]">
      <div className="relative mx-auto max-w-[84rem] px-5 pt-20 md:px-10 md:pt-28">
        <Header />
        <div className="mt-8 flex justify-end gap-3">
          <button type="button" onClick={() => step(-1)} aria-label="Forrige ret" className="flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-brass">
            <BrandIcon name="arrow-right" className="size-5 rotate-180" />
          </button>
          <button type="button" onClick={() => step(1)} aria-label="Næste ret" className="flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-brass">
            <BrandIcon name="arrow-right" className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        tabIndex={0}
        aria-label="Klassikerne — rul vandret"
        className="no-scrollbar mt-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 md:gap-8 md:px-[max(2.5rem,calc((100vw-84rem)/2+2.5rem))]"
      >
        {featuredDishes.map((d, n) => (
          <article key={d.id} data-card className="group relative w-[84vw] shrink-0 snap-start sm:w-[30rem] lg:w-[40rem]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px] sm:aspect-[4/3]">
              {d.image ? (
                <>
                  <Photo
                    name={d.image}
                    sizes="(min-width:1024px) 40rem, (min-width:640px) 30rem, 84vw"
                    className="h-full"
                    imgClassName="object-[50%_55%] transition-transform duration-[1.6s] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest-night/90 via-forest-night/20 to-transparent" />
                </>
              ) : (
                <DailyPanel dish={d} compact />
              )}
              <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
                <p className="font-sans text-xs font-semibold tracking-[0.25em] text-brass">{String(n + 1).padStart(2, "0")}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <h3 className="font-display text-[clamp(2.4rem,4.4vw,4.2rem)] leading-[0.95]">{d.name}</h3>
                  <p className="mb-1 shrink-0 rounded-full border border-brass/50 bg-forest-night/40 px-3 py-1 font-display text-lg text-brass-light backdrop-blur">
                    {formatPrice(d.price)} kr.
                  </p>
                </div>
              </div>
            </div>
            <p className="mt-4 flex items-center gap-2 font-display text-xl text-cream italic">
              <BrandIcon name={d.icon} className="size-5 text-brass" />
              {d.line}
            </p>
            <p className="mt-2 max-w-md text-cream/70">{d.story}</p>
          </article>
        ))}
        <div aria-hidden className="w-1 shrink-0" />
      </div>

      <div className="relative mx-auto max-w-[84rem] px-5 pb-20 md:px-10 md:pb-28">
        <Footnote />
      </div>
    </section>
  );
}

/** Forsidens køkkensektion: standard fra design.ts, eller `?koekken=…`. */
export function Kitchen() {
  const id = useVariantParam("koekken", kitchenOptions, defaultKitchen);
  return id === "rulle" ? <KitchenReel /> : <KitchenShowcase />;
}
