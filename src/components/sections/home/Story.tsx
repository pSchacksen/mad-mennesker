"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { SealText } from "@/components/brand/SealText";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { cn } from "@/lib/cn";
import { welcome } from "./storyContent";

/** Storytelling A — kompakt editorial-opslag med ét skarpt foto i bue */
export function StoryEditorial() {
  return (
    <section id="velkommen" aria-labelledby="velkommen-titel" className="on-light relative isolate overflow-hidden bg-ivory py-24 text-forest md:py-32">
      <div className="relative mx-auto grid max-w-[76rem] items-center gap-14 px-5 md:grid-cols-[1fr_minmax(0,26rem)] md:gap-20 md:px-10">
        <div>
          <SectionLabel index="01" className="text-brass-ink">{welcome.label}</SectionLabel>
          <RevealLines
            id="velkommen-titel"
            className="mt-7 text-[clamp(2.6rem,5vw,4.4rem)]"
            lines={[welcome.heading[0], <em key="m" className="display-italic text-terracotta-ink">{welcome.heading[1]}</em>]}
          />
          <Reveal delay={0.1} className="mt-8 max-w-xl space-y-4 text-lg text-ink-muted">
            <p className="font-display text-[1.6rem] leading-snug text-forest">{welcome.body[0]}</p>
            <p>{welcome.body[1]}</p>
          </Reveal>
          <Reveal delay={0.2} className="mt-10 flex items-center gap-8">
            <SealText id="seal-welcome" className="size-24 text-brass-ink" />
            <ArrowLink href="/om-os/">Mere om os</ArrowLink>
          </Reveal>
        </div>
        <div className="relative">
          <ImageReveal className="aspect-[4/5] overflow-hidden rounded-t-full">
            <Photo name="dining" sizes="(min-width:768px) 26rem, 90vw" className="h-full" imgClassName="object-[22%_50%]" />
          </ImageReveal>
          <Parallax distance={30} rotate={3} className="pointer-events-none absolute -right-16 -bottom-14 w-[75%]">
            <VectorLayer name="botanical-corner" className="relative! block h-auto w-full" />
          </Parallax>
        </div>
      </div>
    </section>
  );
}

/** Storytelling B — tre kapitler som faner; fotoet skifter med */
export function StoryChapters() {
  const [active, setActive] = useState(0);
  const c = welcome.chapters[active];
  return (
    <section id="velkommen" aria-labelledby="velkommen-titel" className="on-light relative isolate overflow-hidden bg-cream py-24 text-forest md:py-32">
      <div className="relative mx-auto max-w-[76rem] px-5 md:px-10">
        <SectionLabel index="01" className="text-brass-ink">{welcome.label}</SectionLabel>
        <RevealLines
          id="velkommen-titel"
          className="mt-7 max-w-3xl text-[clamp(2.6rem,5vw,4.4rem)]"
          lines={[welcome.heading[0], <em key="m" className="display-italic text-terracotta-ink">{welcome.heading[1]}</em>]}
        />
        <div className="mt-12 grid items-center gap-10 md:grid-cols-[minmax(0,24rem)_1fr] md:gap-16">
          <div className="relative aspect-square overflow-hidden rounded-full border border-brass/50 p-2">
            <div className="relative h-full overflow-hidden rounded-full">
              <AnimatePresence initial={false}>
                <motion.div
                  key={c.photo}
                  className="absolute inset-0"
                  initial={{ clipPath: "circle(0% at 50% 50%)" }}
                  animate={{ clipPath: "circle(75% at 50% 50%)" }}
                  transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
                >
                  <Photo name={c.photo} sizes="24rem" className="h-full" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          <div>
            <div role="tablist" aria-label="Kapitler" className="flex flex-wrap gap-2">
              {welcome.chapters.map((ch, i) => (
                <button
                  key={ch.kicker}
                  role="tab"
                  aria-selected={i === active}
                  aria-controls="kapitel-panel"
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex min-h-11 items-center gap-2 rounded-full border px-5 text-sm font-semibold tracking-[0.1em] uppercase transition-colors",
                    i === active ? "border-forest bg-forest text-cream" : "border-forest/20 hover:border-forest",
                  )}
                >
                  <BrandIcon name={ch.icon} className="size-5" />
                  {ch.kicker}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id="kapitel-panel"
                role="tabpanel"
                className="mt-8"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.45 }}
              >
                <p className="flex items-center gap-3 text-brass-ink">
                  <span className="font-display text-5xl italic">0{active + 1}</span>
                  <Ornament name="four-point-star" className="size-4" />
                </p>
                <h3 className="mt-3 text-[clamp(2rem,3.4vw,3rem)]">{c.title}</h3>
                <p className="mt-4 max-w-md text-lg text-ink-muted">{c.text}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
