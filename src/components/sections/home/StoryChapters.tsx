"use client";

import { AnimatePresence, motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Photo } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { welcome } from "./storyContent";

/** Storytelling variant B — sticky billede, kapitler der scroller forbi */
export function StoryChapters() {
  const [active, setActive] = useState(0);
  return (
    <section id="velkommen" aria-labelledby="velkommen-titel" className="on-light relative isolate bg-cream text-forest">
      <Texture name="ivory-plaster" opacity={0.6} />
      <div className="relative mx-auto max-w-[92rem] px-5 pt-28 md:px-10 md:pt-40">
        <SectionLabel index="01" className="text-brass-ink">{welcome.label}</SectionLabel>
        <RevealLines
          id="velkommen-titel"
          className="mt-8 max-w-5xl text-[clamp(2.9rem,7vw,6.5rem)]"
          lines={[`${welcome.heading[0]} ${welcome.heading[1]}`, <em key="m" className="display-italic text-terracotta-ink">{welcome.heading[2]}</em>]}
        />
        <Reveal className="mt-8 max-w-2xl text-lg text-ink-muted">
          <p>{welcome.body[0]}</p>
        </Reveal>
      </div>

      <div className="relative mx-auto grid max-w-[92rem] gap-10 px-5 pb-28 md:px-10 lg:grid-cols-2 lg:gap-20 lg:pb-40">
        {/* Sticky scene */}
        <div className="top-0 hidden h-[100svh] items-center lg:sticky lg:flex">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[40%]">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.div
                key={active}
                className="absolute inset-0"
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.1 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 0.6 }}
                transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
              >
                <Photo name={welcome.chapters[active].photo} sizes="45vw" className="h-full" />
              </motion.div>
            </AnimatePresence>
            <VectorLayer name="botanical-corner" className="inset-0 z-10 h-full w-full opacity-70" />
            <div className="absolute bottom-6 left-6 z-10 flex gap-2">
              {welcome.chapters.map((c, i) => (
                <span key={c.kicker} className={`h-1 rounded-full transition-all duration-700 ${i === active ? "w-10 bg-brass" : "w-4 bg-cream/60"}`} />
              ))}
            </div>
          </div>
        </div>

        <div>
          {welcome.chapters.map((c, i) => (
            <Chapter key={c.kicker} index={i} onActive={setActive} {...c} />
          ))}
          <Reveal className="pt-4">
            <ArrowLink href="/om-os/">Mere om os</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  index,
  kicker,
  title,
  text,
  photo,
  onActive,
}: (typeof welcome.chapters)[number] & { index: number; onActive: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);
  return (
    <div ref={ref} className="flex min-h-[70svh] flex-col justify-center py-12 lg:min-h-[100svh]">
      <div className="mb-8 aspect-[4/3] overflow-hidden lg:hidden">
        <Photo name={photo} sizes="100vw" className="h-full" />
      </div>
      <Reveal>
        <p className="flex items-center gap-4 text-brass-ink">
          <span className="font-display text-6xl italic">0{index + 1}</span>
          <Ornament name="four-point-star" className="size-4" />
          <span className="text-xs font-semibold tracking-[0.22em] uppercase">{kicker}</span>
        </p>
        <h3 className="mt-6 text-[clamp(2.4rem,4.5vw,4rem)]">{title}</h3>
        <p className="mt-6 max-w-md text-lg text-ink-muted">{text}</p>
      </Reveal>
    </div>
  );
}
