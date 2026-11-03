"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { site } from "@/content/site";

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Variant C — Immersive Hospitality
 * Sticky scene: tre lagdelte billeder skilles ad og afslører rummet, mens
 * ordmærket glider på tværs. Kræver scroll for at opleves fuldt ud, men
 * alt indhold og alle handlinger er synlige fra start.
 */
export function HeroImmersive() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const centerScale = useTransform(p, [0, 1], [0.62, 1]);
  const centerRadius = useTransform(p, [0, 0.9], ["240px", "0px"]);
  const leftX = useTransform(p, [0, 1], ["0%", "-140%"]);
  const leftY = useTransform(p, [0, 1], ["0%", "-30%"]);
  const rightX = useTransform(p, [0, 1], ["0%", "140%"]);
  const rightY = useTransform(p, [0, 1], ["0%", "30%"]);
  const sideOpacity = useTransform(p, [0, 0.7], [1, 0]);
  const word1 = useTransform(p, [0, 1], ["4%", "-40%"]);
  const word2 = useTransform(p, [0, 1], ["-4%", "40%"]);
  const veil = useTransform(p, [0, 0.6, 1], [0.15, 0.35, 0.65]);
  const ctaOpacity = useTransform(p, [0.55, 0.85], [0.75, 1]);

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="relative h-[220svh] bg-forest-night text-cream">
      <div className="grain sticky top-0 isolate h-[100svh] overflow-hidden">
        <Texture name="forest-leaf-shadow" opacity={0.7} blend="normal" />
        <VectorLayer name="globe-lights" className="inset-x-0 top-0 h-[40vh] w-full animate-glow" style={{ objectPosition: "top" }} />
        <Ornament name="arches" className="absolute top-1/2 left-1/2 size-[70vmin] -translate-x-1/2 -translate-y-1/2 text-brass/15" />

        {/* Venstre lag */}
        <motion.div
          className="absolute top-[18%] left-[3%] aspect-[4/5] w-[34vw] max-w-[22rem] overflow-hidden rounded-[2px] shadow-2xl md:top-[16%] md:left-[6%]"
          style={reduce ? undefined : { x: leftX, y: leftY, opacity: sideOpacity }}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
        >
          <Photo name="bar" sizes="34vw" decorative className="h-full" imgClassName="object-[60%_50%]" />
        </motion.div>
        {/* Højre lag */}
        <motion.div
          className="absolute right-[3%] bottom-[16%] aspect-[4/5] w-[34vw] max-w-[22rem] overflow-hidden rounded-[2px] shadow-2xl md:right-[6%]"
          style={reduce ? undefined : { x: rightX, y: rightY, opacity: sideOpacity }}
          initial={reduce ? false : { opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
        >
          <Photo name="dining" sizes="34vw" decorative className="h-full" imgClassName="object-[35%_50%]" />
        </motion.div>
        {/* Midterlaget vokser til fuld skærm */}
        <motion.div
          className="absolute inset-0 -z-0 overflow-hidden"
          style={reduce ? undefined : { scale: centerScale, borderRadius: centerRadius }}
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Photo name="private-corner" priority sizes="100vw" className="h-full" />
          <motion.div className="absolute inset-0 bg-forest-night" style={{ opacity: veil }} />
        </motion.div>

        {/* Typografi */}
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-center">
          <h1 id="hero-titel" className="wordmark text-[clamp(3.2rem,12.5vw,13rem)] leading-[0.85] whitespace-nowrap drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
            <motion.span className="block pl-[4vw]" style={reduce ? undefined : { x: word1 }}>
              Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
            </motion.span>
            <motion.span className="block text-right pr-[4vw]" style={reduce ? undefined : { x: word2 }}>
              Mennesker
            </motion.span>
          </h1>
        </div>

        <div className="absolute inset-x-0 bottom-0 z-20 mx-auto flex max-w-[92rem] flex-col gap-6 px-5 pb-24 md:flex-row md:items-end md:justify-between md:px-10 md:pb-10">
          <div>
            <p className="font-display text-3xl leading-tight md:text-4xl">
              God dansk mad. Gode mennesker. <span className="display-italic text-brass-light">God tid.</span>
            </p>
            <p className="mt-2 text-cream/85">{site.intro}</p>
          </div>
          <motion.div className="pointer-events-auto flex flex-wrap gap-3" style={reduce ? undefined : { opacity: ctaOpacity }}>
            <Link href="/menukort/" className={buttonStyles("ghost-light", "lg")}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Se menukortet
            </Link>
            <BookingButton size="lg" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
