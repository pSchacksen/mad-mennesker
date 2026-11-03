"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Photo } from "@/components/media/Photo";
import { Ornament, BrandIcon } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { RevealLines } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Variant A — Cinematic Bistro */
export function HeroCinematic() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="hero-titel" className="relative isolate flex min-h-[100svh] overflow-hidden bg-forest-night text-cream">
      {/* Fotografi med langsom "cinematic" zoom */}
      <motion.div className="absolute inset-0 -z-10" style={reduce ? undefined : { y: imgY, scale: imgScale }}>
        <motion.div
          className="h-full w-full"
          initial={reduce ? false : { scale: 1.16, opacity: 0, filter: "brightness(0.4)" }}
          animate={{ scale: 1.02, opacity: 1, filter: "brightness(1)" }}
          transition={{ duration: 2.6, ease: EASE }}
        >
          <Photo name="facade" priority sizes="100vw" className="h-full w-full" imgClassName="object-[50%_100%]" />
        </motion.div>
      </motion.div>

      {/* Lys og læsbarhed */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,31,25,0.75)_0%,rgba(10,31,25,0.15)_30%,rgba(10,31,25,0.35)_55%,rgba(10,31,25,0.94)_100%)]" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_90%,rgba(10,31,25,0.85),transparent_60%)]" />
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_70%_40%,rgba(255,217,154,0.28),transparent_45%)] mix-blend-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.6] }}
        transition={{ duration: 4, delay: 0.8, ease: "easeInOut" }}
      />

      {/* Globelamper fra designpakken — falder ned og gløder */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38vh] min-h-56"
        initial={reduce ? false : { y: "-40%", opacity: 0 }}
        animate={{ y: "0%", opacity: 1 }}
        transition={{ duration: 2, delay: 0.6, ease: EASE }}
      >
        <VectorLayer name="globe-lights" className="inset-0 h-full w-full animate-glow" style={{ objectPosition: "top" }} />
      </motion.div>

      <motion.div
        className="relative mx-auto flex w-full max-w-[92rem] flex-col justify-end px-5 pt-36 pb-28 md:px-10 md:pb-24"
        style={reduce ? undefined : { y: textY, opacity: fade }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.6, rotate: -30 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
          className="mb-6 text-brass"
        >
          <Ornament name="crossed-cutlery" className="size-14 md:size-16" />
        </motion.div>

        <RevealLines
          as="h1"
          id="hero-titel"
          immediate
          delay={0.7}
          className="wordmark text-[clamp(3.3rem,13vw,11.5rem)] leading-[0.86] tracking-[0.04em]"
          lines={[
            <>
              Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span>
            </>,
            "Mennesker",
          ]}
        />

        <div className="mt-8 grid gap-8 md:mt-10 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <RevealLines
              as="p"
              immediate
              delay={1.15}
              className="font-display text-[clamp(1.6rem,3.6vw,2.7rem)] leading-[1.1]"
              lines={["God dansk mad. Gode mennesker.", <span key="t" className="display-italic text-brass-light">God tid.</span>]}
            />
            <motion.p
              className="mt-4 max-w-md text-cream/85"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.5, ease: EASE }}
            >
              {site.intro}
            </motion.p>
          </div>
          <motion.div
            className="flex flex-wrap gap-3"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.7, ease: EASE }}
          >
            <Link href="/menukort/" className={buttonStyles("ghost-light", "lg")}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Se menukortet
            </Link>
            <BookingButton size="lg" />
          </motion.div>
        </div>
      </motion.div>

      <ScrollCue />
      <p aria-hidden className="absolute top-1/2 right-5 hidden origin-right -translate-y-1/2 rotate-90 text-[0.65rem] font-semibold tracking-[0.4em] text-cream/70 uppercase xl:block">
        {site.address.area} · {site.address.city}
      </p>
    </section>
  );
}

export function ScrollCue({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <motion.a
      href="#velkommen"
      aria-label="Scroll videre til velkomst"
      className={cn(
        "absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 text-[0.6rem] font-semibold tracking-[0.35em] uppercase lg:flex",
        dark ? "text-forest/70" : "text-cream/70",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2.4, duration: 1 }}
    >
      Scroll
      <span className="relative h-14 w-px overflow-hidden bg-current/25">
        <motion.span
          className="absolute inset-x-0 top-0 h-5 bg-brass"
          animate={{ y: ["-100%", "300%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: [0.65, 0, 0.35, 1] }}
        />
      </span>
    </motion.a>
  );
}
