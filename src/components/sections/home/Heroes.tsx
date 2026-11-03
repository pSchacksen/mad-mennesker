"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import type { PointerEvent } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
import { SealText } from "@/components/brand/SealText";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { ImageReveal } from "@/components/motion/Parallax";
import { RevealLines } from "@/components/motion/Reveal";
import { site } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/*
 * Fotos vises bevidst aldrig bredere end ca. 34rem, så de 1.200–1.300 px brede
 * kildebilleder står skarpt — også på skærme med høj pixeltæthed.
 */

function Actions({ dark = true, delay = 1.2 }: { dark?: boolean; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      <Link href="/menukort/" className={buttonStyles(dark ? "ghost-light" : "forest", "lg")}>
        <BrandIcon name="fork-knife" className="size-[1.15em]" />
        Se menukortet
      </Link>
      <BookingButton size="lg" variant={dark ? "brass" : "ghost-dark"} />
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
      <p className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-tight">
        God dansk mad. Gode mennesker.{" "}
        <em className={dark ? "display-italic text-brass-light" : "display-italic text-terracotta-ink"}>God tid.</em>
      </p>
      <p className={dark ? "mt-2 text-cream/80" : "mt-2 text-ink-muted"}>{site.intro}</p>
    </motion.div>
  );
}

/** Variant A — Cinematic Bistro: mørk scene, facaden i en bue, globelamper der gløder. */
export function HeroCinematic() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="hero-titel" className="grain relative isolate overflow-hidden bg-forest-night text-cream">
      <GlobeLamps />
      <div className="relative mx-auto grid min-h-[100svh] max-w-[84rem] items-center gap-12 px-5 pt-44 pb-16 sm:pt-32 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:pt-28">
        <div className="relative z-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, rotate: -40, scale: 0.6 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.3, ease: EASE }}
            className="hidden sm:block"
          >
            <Ornament name="crossed-cutlery" className="size-12 text-brass" />
          </motion.div>
          <RevealLines
            as="h1"
            id="hero-titel"
            immediate
            delay={0.4}
            className="wordmark mt-6 text-[clamp(3.2rem,8.4vw,8.6rem)] leading-[0.88] tracking-[0.04em]"
            lines={[
              <>
                Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
              </>,
              "Mennesker",
            ]}
          />
          <div className="mt-8 max-w-lg space-y-8">
            <Tagline />
            <Actions />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[17rem] sm:max-w-[24rem] lg:max-w-[30rem]">
          <ImageReveal immediate delay={0.2} from="bottom" className="aspect-[4/5] overflow-hidden rounded-t-full">
            <motion.div
              className="h-full"
              initial={reduce ? false : { scale: 1.06 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: EASE }}
            >
              <Photo name="facade" priority sizes="(min-width:1024px) 30rem, 26rem" className="h-full" imgClassName="object-[50%_70%]" />
            </motion.div>
          </ImageReveal>
          <div aria-hidden className="absolute -inset-3 -z-10 rounded-t-full border border-brass/50" />
          <p className="absolute -bottom-10 left-0 text-[0.65rem] tracking-[0.3em] text-sage uppercase">
            {site.address.area} · {site.address.city}
          </p>
        </div>
      </div>
    </section>
  );
}

/** Variant B — Editorial Restaurant: lys magasinopsætning med stor typografi og to beskårne fotos. */
export function HeroEditorial() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="hero-titel" className="on-light relative isolate overflow-hidden bg-cream text-forest">
      <div aria-hidden className="absolute inset-x-0 top-0 h-24 bg-forest md:h-28" />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[84rem] flex-col justify-center px-5 pt-32 pb-16 md:px-10">
        <motion.p
          className="eyebrow text-brass-ink"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          {site.address.area} · {site.address.city}
        </motion.p>
        <RevealLines
          as="h1"
          id="hero-titel"
          immediate
          delay={0.35}
          className="mt-5 font-display text-[clamp(3.4rem,10vw,9.5rem)] leading-[0.85] font-medium tracking-[-0.02em]"
          lines={[
            "Mad",
            <span key="m" className="block pl-[10%]">
              <em className="display-italic text-terracotta">&amp;</em> Mennesker
            </span>,
          ]}
        />
        <div className="mt-10 grid items-end gap-8 md:grid-cols-[minmax(0,20rem)_1fr_auto] md:gap-10">
          <ImageReveal immediate delay={0.6} from="left" className="aspect-[4/3] overflow-hidden">
            <Photo name="dining" priority sizes="20rem" className="h-full" />
          </ImageReveal>
          <div className="space-y-6">
            <Ornament name="flourish" className="h-8 w-20 text-brass-ink" />
            <Tagline dark={false} />
            <Actions dark={false} />
          </div>
          <div className="relative hidden md:block">
            <ImageReveal immediate delay={0.9} from="center" className="size-44 overflow-hidden rounded-full lg:size-52">
              <Photo name="bar" sizes="13rem" className="h-full" imgClassName="object-[45%_45%]" />
            </ImageReveal>
            <SealText id="seal-hero" className="absolute -top-10 -left-12 size-28 text-brass-ink" />
          </div>
        </div>
      </div>
    </section>
  );
}

/** Variant C — Immersive Hospitality: tre fotos i en vifte, der reagerer på musen, bag/over ordmærket. */
export function HeroImmersive() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(sy, [-0.5, 0.5], [6, -6]);
  const tiltY = useTransform(sx, [-0.5, 0.5], [-8, 8]);
  const textX = useTransform(sx, [-0.5, 0.5], [24, -24]);
  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const cards = [
    { name: "bar" as const, rotate: -9, x: "-62%", y: "6%", delay: 0.5 },
    { name: "dining" as const, rotate: 8, x: "62%", y: "8%", delay: 0.65 },
    { name: "private-corner" as const, rotate: 0, x: "0%", y: "-4%", delay: 0.8 },
  ];
  return (
    <section aria-labelledby="hero-titel" onPointerMove={onMove} className="grain relative isolate overflow-hidden bg-forest-night text-cream">
      <GlobeLamps count={3} />
      <div className="relative mx-auto flex min-h-[100svh] max-w-[84rem] flex-col items-center justify-center px-5 pt-28 pb-14 text-center md:px-10">
        <motion.h1
          id="hero-titel"
          className="wordmark pointer-events-none relative z-0 text-[clamp(3rem,11vw,10rem)] leading-[0.85] tracking-[0.05em] text-cream/95"
          style={reduce ? undefined : { x: textX }}
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.25em" }}
          animate={{ opacity: 1, letterSpacing: "0.05em" }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span> <br />
          Mennesker
        </motion.h1>

        <motion.div
          className="relative z-10 mt-4 h-[12rem] w-full max-w-[34rem] [perspective:1000px] sm:-mt-[4vw] sm:h-[18rem]"
          style={reduce ? undefined : { rotateX: tiltX, rotateY: tiltY }}
        >
          {cards.map((c) => (
            <motion.div
              key={c.name}
              className="absolute top-0 left-1/2 aspect-[4/5] h-full overflow-hidden rounded-[3px] border-4 border-forest-night shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
              initial={reduce ? false : { opacity: 0, y: 80, rotate: 0, x: "-50%" }}
              animate={{ opacity: 1, y: c.y, rotate: c.rotate, x: `calc(-50% + ${c.x})` }}
              whileHover={reduce ? undefined : { y: "-8%", zIndex: 20, transition: { duration: 0.4 } }}
              transition={{ duration: 1.3, delay: c.delay, ease: EASE }}
              data-cursor="media"
            >
              <Photo name={c.name} sizes="15rem" className="h-full" priority={c.name === "private-corner"} />
            </motion.div>
          ))}
        </motion.div>

        <div className="relative z-10 mt-12 flex flex-col items-center gap-6">
          <Tagline delay={1.1} />
          <Actions delay={1.3} />
        </div>
      </div>
    </section>
  );
}
