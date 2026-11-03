"use client";

import { Photo } from "@/components/media/Photo";
import { VectorLayer } from "@/components/brand/Layers";
import { SealText } from "@/components/brand/SealText";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { welcome } from "./storyContent";

/** Velkomst — kompakt editorial-opslag med ét skarpt foto i bue */
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
