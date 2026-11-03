"use client";

import { Photo } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { SealText } from "@/components/brand/SealText";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { welcome } from "./storyContent";

/** Storytelling variant A — asymmetrisk editorial-opslag */
export function StoryEditorial() {
  return (
    <section id="velkommen" aria-labelledby="velkommen-titel" className="on-light relative isolate overflow-hidden bg-ivory py-28 text-forest md:py-44">
      <Texture name="ivory-plaster" opacity={0.7} />
      <Parallax distance={90} rotate={4} className="pointer-events-none absolute -top-10 -right-[20%] -z-0 w-[85%] md:-right-[8%] md:w-[60%]">
        <VectorLayer name="botanical-corner" className="relative! block h-auto w-full -scale-x-100" />
      </Parallax>

      <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-8">
        <div className="relative lg:col-span-6 lg:col-start-1">
          <Parallax distance={40}>
            <ImageReveal className="aspect-[4/5] overflow-hidden" from="bottom">
              <div data-cursor="media" className="h-full">
                <Photo name="dining" sizes="(min-width:1024px) 45vw, 100vw" className="h-full" imgClassName="object-[20%_50%]" />
              </div>
            </ImageReveal>
          </Parallax>
          <Parallax distance={-70} className="absolute -right-4 -bottom-16 w-[46%] md:-right-10 lg:-right-20">
            <ImageReveal className="aspect-square overflow-hidden border-8 border-ivory shadow-2xl" from="left" delay={0.2}>
              <Photo name="bar" sizes="(min-width:1024px) 20vw, 45vw" className="h-full" imgClassName="object-[70%_50%]" />
            </ImageReveal>
          </Parallax>
          <p className="mt-6 max-w-xs text-xs tracking-wide text-ink-muted">
            Visualiseringer af restauranten. Billederne viser, hvordan vi forestiller os stedet.
          </p>
        </div>

        <div className="flex flex-col justify-center lg:col-span-5 lg:col-start-8">
          <Reveal preset="fade">
            <SectionLabel index="01" className="text-brass-ink">{welcome.label}</SectionLabel>
          </Reveal>
          <RevealLines
            id="velkommen-titel"
            className="mt-8 text-[clamp(2.9rem,6.2vw,5.6rem)]"
            lines={[welcome.heading[0], welcome.heading[1], <em key="m" className="display-italic text-terracotta-ink">{welcome.heading[2]}</em>]}
          />
          <Reveal delay={0.15}>
            <Ornament name="flourish" className="my-10 h-10 w-28 text-brass-ink" />
          </Reveal>
          <div className="space-y-5 text-lg text-ink-muted">
            {welcome.body.map((p, i) => (
              <Reveal key={i} delay={0.1 * i}>
                <p className={i === 0 ? "font-display text-[1.75rem] leading-snug text-forest" : undefined}>{p}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2} className="mt-12 flex items-center gap-8">
            <SealText id="seal-welcome" className="size-28 text-brass-ink" />
            <ArrowLink href="/om-os/" className="text-forest">Mere om os</ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
