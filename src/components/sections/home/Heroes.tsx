"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
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

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Fotos vises bevidst aldrig bredere end ca. 34rem, så de 1.200–1.300 px brede
 * kildebilleder står skarpt — også på skærme med høj pixeltæthed.
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
 * Hero: en lun aften på Slotspladsen. Globelamper der svinger og kaster lys,
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
