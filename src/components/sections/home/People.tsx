"use client";

import { Photo } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { cn } from "@/lib/cn";

/** Små tekstfragmenter om husets filosofi (ingen påstande om konkrete arrangementer). */
function Fragment({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <Reveal delay={delay} className={cn("flex gap-3", className)}>
      <Ornament name="four-point-star" className="mt-1.5 size-3.5 shrink-0 text-brass-ink" />
      <p className="font-display text-[1.35rem] leading-snug text-forest italic">{children}</p>
    </Reveal>
  );
}

/**
 * MENNESKENE OMKRING BORDET
 * Asymmetrisk collage: ét stort stemningsbillede, to mindre billeder der
 * overlapper, stor typografi og små tekstfragmenter. Billederne afsløres med
 * masker og bevæger sig i forskellige tempi under scroll.
 */
export function People() {
  return (
    <section
      aria-labelledby="mennesker-titel"
      className="on-light relative isolate -mt-10 overflow-hidden rounded-t-[50%_2.5rem] bg-linen text-forest md:-mt-16 md:rounded-t-[50%_4.5rem]"
    >
      <div className="relative mx-auto max-w-[84rem] px-5 pt-24 pb-24 md:px-10 md:pt-32 md:pb-32">
        <SectionLabel index="03" className="text-brass-ink">Menneskene</SectionLabel>
        <RevealLines
          id="mennesker-titel"
          className="mt-7 max-w-5xl text-[clamp(2.5rem,5.6vw,5.4rem)]"
          lines={["Det bedste ved et godt måltid", <em key="e" className="display-italic text-terracotta-ink">er dem, vi deler det med.</em>]}
        />

        <div className="relative mt-12 lg:mt-16 lg:h-[44rem]">
          <Fragment className="mb-10 max-w-xs lg:absolute lg:top-[4%] lg:left-0 lg:mb-0 lg:w-[26%]">Lange frokoster, der stille og roligt bliver til eftermiddage.</Fragment>

          {/* Det store billede */}
          <Parallax distance={24} className="relative lg:absolute lg:top-0 lg:right-0 lg:w-[64%]">
            <ImageReveal from="right" className="aspect-[16/10] overflow-hidden rounded-[2px] rounded-tr-[6rem] shadow-[0_40px_80px_-40px_rgba(23,59,48,0.55)] md:rounded-tr-[10rem]">
              <Photo name="rum-hjorne" sizes="(min-width:1024px) 54rem, 92vw" className="h-full" imgClassName="object-[35%_55%]" />
            </ImageReveal>
          </Parallax>

          <div className="relative lg:contents">
          {/* Baren — overlapper nedefra */}
          <Parallax distance={70} className="relative z-10 -mt-14 w-[58%] sm:w-[44%] lg:absolute lg:bottom-0 lg:left-[2%] lg:mt-0 lg:w-[29%]">
            <ImageReveal from="bottom" delay={0.1} className="aspect-[4/5] overflow-hidden rounded-t-full ring-[6px] ring-linen">
              <Photo name="rum-bar" sizes="(min-width:1024px) 24rem, 58vw" className="h-full" imgClassName="object-[56%_50%]" />
            </ImageReveal>
          </Parallax>

          {/* Et lille øjeblik ved bordet */}
          <Parallax distance={110} className="absolute right-0 bottom-4 z-10 w-[42%] sm:w-[34%] lg:right-[6%] lg:-bottom-6 lg:w-[22%]">
            <ImageReveal from="center" delay={0.2} className="aspect-square overflow-hidden rounded-full ring-[6px] ring-linen">
              <Photo name="mad-sild" sizes="(min-width:1024px) 18rem, 42vw" className="h-full" imgClassName="object-[34%_50%] scale-[1.25]" />
            </ImageReveal>
          </Parallax>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:contents">
            <Fragment delay={0.1} className="lg:absolute lg:bottom-[12%] lg:left-[34%] lg:w-[24%]">Et glas mere i baren, fordi ingen har travlt.</Fragment>
            <Fragment delay={0.2} className="lg:absolute lg:right-[30%] lg:-bottom-4 lg:w-[22%]">Et bord til hele familien — og en stol til den, der kommer alene.</Fragment>
          </div>
        </div>
      </div>
    </section>
  );
}
