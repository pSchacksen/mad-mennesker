"use client";

import Link from "next/link";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
import { Motes } from "@/components/brand/Motes";
import { SealText } from "@/components/brand/SealText";
import { cn } from "@/lib/cn";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { ImageReveal } from "@/components/motion/Parallax";
import { RevealLines } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { featuredDishes, formatPrice } from "@/content/menu";
import { defaultHero, heroOptions } from "@/content/design";
import { useVariantParam } from "@/lib/useVariantParam";
import type { PhotoName } from "@/components/media/Photo";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Skarphed: skarpe fotos vises højst i ca. kildebredde ÷ 1,9 CSS-px (se
 * src/content/photo-library.ts). Fuldskærm bruges kun til bløde, uskarpe
 * stemningsbilleder, hvor dybdeuskarpheden er en del af motivet.
 */

const mobileBtn = "max-sm:min-h-12 max-sm:w-full max-sm:gap-2 max-sm:px-3 max-sm:text-[0.7rem]";

function Actions({ dark = true, delay = 1.2 }: { dark?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <Link href="/menukort/" className={cn(buttonStyles(dark ? "ghost-light" : "forest", "lg"), mobileBtn)}>
        <BrandIcon name="fork-knife" className="size-[1.15em]" />
        Menukortet
      </Link>
      <BookingButton size="lg" variant={dark ? "brass" : "ghost-dark"} className={mobileBtn} />
    </motion.div>
  );
}

function Tagline({ dark = true, delay = 0.9 }: { dark?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <p className="font-display text-[clamp(1.45rem,2.6vw,2.1rem)] leading-tight">
        God dansk mad. Gode mennesker.{" "}
        <em className={dark ? "display-italic text-brass-light" : "display-italic text-terracotta-ink"}>God tid.</em>
      </p>
      <p className={dark ? "mt-2 text-cream/80" : "mt-2 text-ink-muted"}>{site.intro}</p>
    </motion.div>
  );
}

/**
 * Variant D — Lamperne: en lun aften på Slotspladsen. Globelamper der svinger og kaster lys,
 * varme lysprikker i luften, levende lys i facadens vinduer og husets segl.
 * På desktop bevæger lag sig en anelse med musen.
 */
export function HeroCinematic() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const lampX = useTransform(sx, (v) => v * -14);
  const lampY = useTransform(sy, (v) => v * -8);
  const photoX = useTransform(sx, (v) => v * 10);
  const photoY = useTransform(sy, (v) => v * 8);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      aria-labelledby="hero-titel"
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="grain relative isolate overflow-hidden bg-forest-night text-cream"
    >
      {/* Varmt lys, der falder ned fra lamperne og op fra facaden */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 45% at 30% 18%, rgba(255,196,120,0.10), transparent 70%), radial-gradient(50% 50% at 78% 70%, rgba(255,170,90,0.10), transparent 70%)",
        }}
      />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ x: lampX, y: lampY }}>
        <GlobeLamps />
      </motion.div>
      <Motes />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[84rem] content-center gap-x-16 gap-y-10 px-5 pt-36 pb-14 sm:pt-44 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:grid-rows-[auto_auto] lg:pt-28 lg:pb-16">
        {/* Titel og tagline */}
        <div className="relative z-10 lg:self-end">
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: -40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
            className="hidden lg:block"
          >
            <Ornament name="crossed-cutlery" className="size-12 text-brass" />
          </motion.div>
          <RevealLines
            as="h1"
            id="hero-titel"
            immediate
            delay={0.4}
            className="wordmark text-[clamp(2.9rem,8.4vw,8.6rem)] leading-[0.88] tracking-[0.04em] lg:mt-6"
            lines={[
              <>
                Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
              </>,
              "Mennesker",
            ]}
          />
          <div className="mt-6 max-w-lg sm:mt-8">
            <Tagline />
          </div>
        </div>

        {/* Facaden i en bue med levende lys og husets segl */}
        <motion.div
          style={{ x: photoX, y: photoY }}
          className="relative mx-auto w-full max-w-[16.5rem] xs:max-w-[18rem] sm:max-w-[24rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-[30rem] lg:self-center"
        >
          <div aria-hidden className="absolute -inset-10 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(255,190,110,0.16),transparent)] candle-flicker" />
          <ImageReveal immediate delay={0.2} from="bottom" className="aspect-[4/5] overflow-hidden rounded-t-full">
            <motion.div
              className="h-full"
              initial={reduce ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: EASE }}
            >
              <div className="slow-drift h-full">
                <Photo name="facade" priority sizes="(min-width:1024px) 30rem, (min-width:640px) 24rem, 18rem" className="h-full" imgClassName="object-[50%_70%]" />
              </div>
            </motion.div>
            {/* Levende lys i vinduerne */}
            <span
              aria-hidden
              className="candle-flicker pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: "radial-gradient(70% 38% at 50% 60%, rgba(255,186,100,0.75), transparent 75%)" }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-night/50 to-transparent"
            />
          </ImageReveal>
          <div aria-hidden className="absolute -inset-3 -z-10 rounded-t-full border border-brass/50" />
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 1.1, ease: EASE }}
            className="absolute -bottom-7 -left-7 rounded-full bg-forest-night p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:-bottom-9 sm:-left-10"
          >
            <SealText id="seal-hero" className="size-24 text-brass sm:size-32" />
          </motion.div>
          <p className="absolute right-0 -bottom-9 text-[0.62rem] tracking-[0.3em] text-sage uppercase">
            {site.address.area} · {site.address.city}
          </p>
        </motion.div>

        {/* Knapper */}
        <div className="relative z-10 mt-4 lg:col-start-1 lg:row-start-2 lg:mt-0 lg:self-start">
          <Actions />
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────── */

const stjerneskud = featuredDishes.find((d) => d.id === "stjerneskud")!;

/** Variant B — Mad & mennesker: stemning og mad i ét asymmetrisk opslag. */
export function HeroFoodPeople() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);
  const mainY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const foodY = useTransform(scrollYProgress, [0, 1], [0, -130]);

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="relative isolate overflow-hidden bg-forest-night text-cream">
      {/* Blød stemningsbaggrund: globelamper og blade i dybdeuskarphed */}
      <motion.div aria-hidden className="absolute inset-0 -z-10" style={reduce ? undefined : { y: bgY }}>
        <Photo name="stemning-lamper" decorative priority sizes="100vw" className="h-full scale-110 blur-[3px]" imgClassName="object-[75%_35%] opacity-45" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,25,0.6),rgba(10,31,25,0.82)_55%,var(--color-forest-night))] lg:bg-[linear-gradient(90deg,var(--color-forest-night)_22%,rgba(10,31,25,0.7)_55%,rgba(10,31,25,0.45))]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-forest-night to-transparent" />
      </motion.div>
      <Motes />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[84rem] content-center gap-x-14 gap-y-12 px-5 pt-28 pb-20 md:px-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.12fr)] lg:grid-rows-[auto_auto] lg:pt-32">
        <div className="relative z-10 lg:self-end">
          <motion.p
            className="eyebrow text-brass"
            initial={reduce ? false : { opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
          >
            {site.address.area} · {site.address.city}
          </motion.p>
          <RevealLines
            as="h1"
            id="hero-titel"
            immediate
            delay={0.35}
            className="wordmark mt-6 text-[clamp(2.9rem,10vw,5.2rem)] leading-[0.88] tracking-[0.04em] lg:text-[clamp(3.6rem,5.4vw,5.4rem)]"
            lines={[
              <>
                Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
              </>,
              "Mennesker",
            ]}
          />
          <div className="mt-6 max-w-lg sm:mt-8">
            <Tagline />
          </div>
        </div>

        {/* Billedopslaget */}
        <div className="relative mx-auto w-full max-w-[36rem] pb-14 sm:pb-20 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:self-center lg:pb-24">
          <motion.div style={reduce ? undefined : { y: mainY }} className="relative ml-auto w-[90%] lg:w-full">
            <ImageReveal immediate delay={0.25} from="right" className="aspect-[5/4] overflow-hidden rounded-[2px] rounded-tl-[7rem] sm:rounded-tl-[11rem]">
              <div className="slow-drift h-full">
                <Photo name="rum-aftengaester" priority sizes="(min-width:1024px) 42rem, 90vw" className="h-full" imgClassName="object-[58%_50%]" />
              </div>
            </ImageReveal>
            <span aria-hidden className="pointer-events-none absolute inset-0 rounded-tl-[7rem] ring-1 ring-brass/30 ring-inset sm:rounded-tl-[11rem]" />
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 1.2, ease: EASE }}
              className="absolute -top-8 -right-3 rounded-full bg-forest-night p-1.5 sm:-top-10 sm:-right-6"
            >
              <SealText id="seal-hero-b" className="size-20 text-brass sm:size-28" />
            </motion.div>
          </motion.div>

          <motion.figure style={reduce ? undefined : { y: foodY }} className="absolute bottom-0 left-0 w-[50%] sm:w-[44%] lg:-left-12 lg:w-[46%]">
            <ImageReveal immediate delay={0.85} from="bottom" className="aspect-[4/3] overflow-hidden rounded-[2px] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] ring-[6px] ring-forest-night">
              <Photo name="mad-stjerneskud" priority sizes="(min-width:1024px) 20rem, 50vw" className="h-full" imgClassName="object-[50%_55%]" />
            </ImageReveal>
            <motion.figcaption
              className="mt-3 flex items-baseline gap-2 text-sm"
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
            >
              <BrandIcon name={stjerneskud.icon} className="size-4 self-center text-brass" />
              <span className="font-display text-lg italic text-cream">{stjerneskud.name}</span>
              <span className="text-brass-light">{formatPrice(stjerneskud.price)} kr.</span>
            </motion.figcaption>
          </motion.figure>
        </div>

        <div className="relative z-10 lg:col-start-1 lg:row-start-2 lg:self-start">
          <Actions />
        </div>
      </div>
    </section>
  );
}

/** Variant A — Atmosfære: stort, blødt stemningsbillede og animerede tekstlag. */
export function HeroAtmosphere() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const words = ["God dansk mad.", "Gode mennesker.", "God tid."];

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-forest-night text-cream lg:items-center">
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: bgY }}>
        <div className="slow-drift h-full">
          <Photo name="stemning-lamper" priority sizes="100vw" className="h-full" imgClassName="object-[74%_40%]" />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(0deg,var(--color-forest-night)_6%,rgba(10,31,25,0.75)_42%,rgba(10,31,25,0.25)_75%)] lg:bg-[linear-gradient(90deg,rgba(10,31,25,0.94)_8%,rgba(10,31,25,0.62)_42%,rgba(10,31,25,0.05)_78%)]" />
        <div className="candle-flicker absolute inset-0 bg-[radial-gradient(45%_40%_at_72%_30%,rgba(255,196,120,0.18),transparent_70%)] mix-blend-screen" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-forest-night to-transparent" />
      </motion.div>
      <Motes />

      <motion.div style={reduce ? undefined : { y: textY }} className="relative mx-auto w-full max-w-[84rem] px-5 pt-40 pb-16 md:px-10 lg:py-32">
        <motion.p
          className="eyebrow text-brass"
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.6em" }}
          animate={{ opacity: 1, letterSpacing: "0.22em" }}
          transition={{ duration: 1.4, delay: 0.2, ease: EASE }}
        >
          {site.address.area} · {site.address.city}
        </motion.p>
        <RevealLines
          as="h1"
          id="hero-titel"
          immediate
          delay={0.4}
          className="wordmark mt-6 text-[clamp(3rem,9vw,9.4rem)] leading-[0.86] tracking-[0.04em]"
          lines={[
            <>
              Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
            </>,
            "Mennesker",
          ]}
        />
        <p className="mt-8 flex flex-wrap gap-x-3 font-display text-[clamp(1.5rem,2.8vw,2.3rem)] leading-tight">
          {words.map((w, i) => (
            <motion.span
              key={w}
              className={i === 2 ? "display-italic text-brass-light" : undefined}
              initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1, delay: 0.95 + i * 0.28, ease: EASE }}
            >
              {w}
            </motion.span>
          ))}
        </p>
        <motion.p
          className="mt-3 max-w-md text-cream/80"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
        >
          {site.intro}
        </motion.p>
        <div className="mt-10 max-w-md">
          <Actions delay={1.9} />
        </div>
      </motion.div>
    </section>
  );
}

const bistroRooms: { name: PhotoName; pos: string }[] = [
  { name: "rum-aftengaester", pos: "object-[52%_50%]" },
  { name: "rum-hjorne", pos: "object-[38%_50%]" },
  { name: "rum-bar", pos: "object-[62%_50%]" },
];
const bistroPlates: PhotoName[] = ["mad-pariserbof", "mad-aeg-rejer", "mad-wienerschnitzel"];

/** Variant C — Immersive bistro: billedlag i dybden, rummet og retterne skifter langsomt. */
export function HeroBistro() {
  const reduce = useReducedMotion();
  const [n, setN] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const plateY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const titleX = useTransform(scrollYProgress, [0, 1], [0, -80]);

  useEffect(() => {
    if (reduce) return;
    const t = window.setInterval(() => setN((v) => (v + 1) % bistroRooms.length), 5200);
    return () => window.clearInterval(t);
  }, [reduce]);

  const room = bistroRooms[n];
  const plate = bistroPlates[n];

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="relative isolate overflow-hidden bg-forest-night text-cream">
      <div aria-hidden className="absolute inset-0 -z-10">
        <Photo name="stemning-vaeg" decorative priority sizes="100vw" className="h-full scale-110 blur-[6px]" imgClassName="opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_60%_45%,transparent,var(--color-forest-night)_80%)]" />
      </div>
      <Motes />
      <div className="relative mx-auto grid min-h-[100svh] max-w-[84rem] content-center items-center gap-10 px-5 pt-28 pb-16 md:px-10 lg:grid-cols-[1fr_auto] lg:pt-28">
        <motion.div style={reduce ? undefined : { x: titleX }} className="relative z-20 lg:-mr-40">
          <RevealLines
            as="h1"
            id="hero-titel"
            immediate
            delay={0.3}
            className="wordmark text-[clamp(3rem,8.6vw,9rem)] leading-[0.86] tracking-[0.04em] drop-shadow-[0_6px_30px_rgba(0,0,0,0.6)]"
            lines={[
              <>
                Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
              </>,
              "Mennesker",
            ]}
          />
          <div className="mt-8 max-w-md">
            <Tagline />
          </div>
          <div className="mt-10 max-w-md">
            <Actions />
          </div>
        </motion.div>

        <div className="relative mx-auto w-full max-w-[19rem] sm:max-w-[24rem] lg:mr-6 lg:w-[26rem] lg:max-w-none">
          <motion.div style={reduce ? undefined : { y: archY }} className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-forest">
              <AnimatePresence initial={false}>
                <motion.div
                  key={room.name}
                  className="absolute inset-0"
                  initial={{ clipPath: "circle(0% at 50% 60%)" }}
                  animate={{ clipPath: "circle(80% at 50% 60%)" }}
                  exit={{ opacity: 1, transition: { duration: 1.6 } }}
                  transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1] }}
                >
                  <div className="slow-drift h-full">
                    <Photo name={room.name} priority={n === 0} sizes="(min-width:1024px) 26rem, 80vw" className="h-full" imgClassName={room.pos} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div aria-hidden className="absolute -inset-3 -z-10 rounded-t-full border border-brass/50" />
          </motion.div>
          <motion.div style={reduce ? undefined : { y: plateY }} className="absolute -bottom-8 -left-10 w-[52%] sm:-left-16">
            <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_30px_60px_-20px_rgba(0,0,0,0.75)] ring-[6px] ring-forest-night">
              <AnimatePresence initial={false}>
                <motion.div
                  key={plate}
                  className="absolute inset-0"
                  initial={{ opacity: 0, rotate: -25, scale: 1.15 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 20 }}
                  transition={{ duration: 1.4, ease: EASE }}
                >
                  <Photo name={plate} sizes="(min-width:1024px) 14rem, 42vw" className="h-full" imgClassName="object-[50%_60%] scale-[1.35]" />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
          <div className="absolute -right-2 -bottom-8 flex gap-2" aria-hidden>
            {bistroRooms.map((r, i) => (
              <span key={r.name} className={cn("h-1 w-6 rounded-full transition-colors duration-700", i === n ? "bg-brass" : "bg-cream/20")} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Forsidens hero: standard fra design.ts, eller `?hero=…` fra Design Lab. */
export function Hero() {
  const id = useVariantParam("hero", heroOptions, defaultHero);
  if (id === "atmosfaere") return <HeroAtmosphere />;
  if (id === "bistro") return <HeroBistro />;
  if (id === "lamper") return <HeroCinematic />;
  return <HeroFoodPeople />;
}

export const heroComponents = {
  "mad-og-mennesker": HeroFoodPeople,
  atmosfaere: HeroAtmosphere,
  bistro: HeroBistro,
  lamper: HeroCinematic,
} as const;
