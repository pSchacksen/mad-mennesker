"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { SealText } from "@/components/brand/SealText";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { ImageReveal } from "@/components/motion/Parallax";
import { RevealLines } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { ScrollCue } from "./HeroCinematic";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Variant B — Editorial Restaurant */
export function HeroEditorial() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const archY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const smallY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const sealR = useTransform(scrollYProgress, [0, 1], [0, 120]);

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="on-light relative isolate min-h-[100svh] overflow-hidden bg-cream text-forest">
      {/* Mørk stribe bag headeren, så navigationen står klart */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-24 bg-forest md:h-28" />
      <Texture name="ivory-plaster" opacity={0.6} />
      <VectorLayer name="editorial-circles" className="inset-0 -z-0 h-full w-full opacity-80" />

      <div className="relative mx-auto grid min-h-[100svh] max-w-[92rem] grid-cols-1 gap-10 px-5 pt-36 pb-20 md:px-10 lg:grid-cols-12 lg:gap-6 lg:pt-40">
        <div className="relative z-10 flex flex-col justify-center lg:col-span-7">
          <motion.p
            className="eyebrow text-brass-ink"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: EASE }}
          >
            {site.address.area} · {site.address.city}
          </motion.p>
          <RevealLines
            as="h1"
            id="hero-titel"
            immediate
            delay={0.4}
            className="mt-6 font-display text-[clamp(3.6rem,10.5vw,10rem)] leading-[0.8] font-medium tracking-[-0.03em] uppercase"
            lines={[
              "Mad",
              <span key="og" className="flex items-baseline gap-[0.15em] pl-[8%]">
                <span className="display-italic text-[0.7em] text-terracotta normal-case">&amp;</span>
                <span>Men-</span>
              </span>,
              <span key="ne" className="pl-[16%]">nesker</span>,
            ]}
          />
          <motion.div
            className="mt-10 grid max-w-xl gap-6 border-t border-forest/20 pt-6 sm:grid-cols-[auto_1fr] sm:gap-8"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: EASE }}
          >
            <Ornament name="flourish" className="h-10 w-20 text-brass-ink" />
            <div>
              <p className="font-display text-3xl leading-tight">
                God dansk mad. Gode mennesker. <em className="display-italic text-terracotta-ink">God tid.</em>
              </p>
              <p className="mt-2 text-ink-muted">{site.intro}</p>
            </div>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: EASE }}
          >
            <Link href="/menukort/" className={buttonStyles("forest", "lg")}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Se menukortet
            </Link>
            <BookingButton size="lg" variant="ghost-dark" />
          </motion.div>
        </div>

        <div className="relative lg:col-span-5">
          <motion.div style={reduce ? undefined : { y: archY }} className="relative mx-auto aspect-[3/4] w-[88%] max-w-[30rem] lg:mt-6 lg:w-full">
            <ImageReveal immediate delay={0.3} className="h-full overflow-hidden rounded-t-full shadow-[0_40px_80px_-30px_rgba(23,59,48,0.6)]">
              <Photo name="dining" priority sizes="(min-width:1024px) 40vw, 90vw" className="h-full" imgClassName="object-[30%_50%]" />
            </ImageReveal>
            <div aria-hidden className="absolute -inset-3 -z-10 rounded-t-full border border-brass/60" />
          </motion.div>
          <motion.div
            data-cursor="media"
            style={reduce ? undefined : { y: smallY }}
            className="absolute bottom-[4%] -left-2 aspect-square w-[42%] max-w-[13rem] overflow-hidden rounded-full border-[6px] border-cream shadow-xl lg:-left-16"
            initial={reduce ? false : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1, ease: EASE }}
          >
            <Photo name="bar" sizes="14rem" className="h-full" imgClassName="object-[48%_45%] scale-[1.6]" />
          </motion.div>
          <motion.div style={reduce ? undefined : { rotate: sealR }} className="absolute -top-4 right-0 lg:-right-6">
            <SealText id="seal-hero" className="size-28 text-brass-ink md:size-36" />
          </motion.div>
        </div>
      </div>
      <ScrollCue dark />
    </section>
  );
}
