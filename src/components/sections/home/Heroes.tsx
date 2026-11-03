"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
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

/** Hero: mørk scene, facaden i en bue, globelamper der gløder. */
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
