"use client";

import { motion, useReducedMotion } from "motion/react";
import { Photo } from "@/components/media/Photo";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";

const fragments = [
  { text: "lange frokoster", className: "top-[6%] left-[2%] md:left-[4%]" },
  { text: "én ret mere?", className: "top-[44%] right-[2%] md:right-[-4%]" },
  { text: "skål!", className: "bottom-[16%] left-[8%] md:left-[30%]" },
  { text: "gode samtaler", className: "bottom-[2%] right-[8%]" },
];

/** "Mere end et måltid" — collage af rummets stemninger */
export function MoreThanMeal() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="mennesker-titel" className="grain relative isolate overflow-hidden bg-forest-deep py-28 text-cream md:py-44">
      <Texture name="forest-leaf-shadow" opacity={0.85} blend="normal" />
      <Parallax distance={120} className="pointer-events-none absolute inset-0 -z-0">
        <VectorLayer name="editorial-circles" className="inset-0 h-full w-full" />
      </Parallax>

      <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal preset="fade">
              <SectionLabel index="03" className="text-brass">Mere end et måltid</SectionLabel>
            </Reveal>
            <RevealLines
              id="mennesker-titel"
              className="mt-8 text-[clamp(2.8rem,6.4vw,6rem)]"
              lines={["Det handler om", "dem, vi deler", <em key="b" className="display-italic text-brass-light">bordet med.</em>]}
            />
          </div>
          <Reveal className="self-end lg:col-span-4 lg:col-start-9" delay={0.2}>
            <p className="text-lg text-cream/85">
              Det bedste ved et godt måltid er sjældent kun maden. Det er samtalen, der fortsætter efter kaffen. Grinet fra bordet ved siden af. Fornemmelsen af, at ingen skal noget som helst.
            </p>
            <p className="mt-5 text-lg text-cream/85">
              Derfor har vi indrettet et sted med varme lamper, bløde stole, hyggelige kroge og en lille bar, hvor man kan mødes før — eller blive hængende efter.
            </p>
          </Reveal>
        </div>

        {/* Collage */}
        <div className="relative mt-20 h-[120vw] max-h-[56rem] min-h-[34rem] sm:h-[90vw] md:mt-28 lg:h-[60vw]">
          <Parallax distance={50} className="absolute top-0 left-0 w-[72%] md:w-[52%]">
            <ImageReveal from="left" className="aspect-[4/3] overflow-hidden">
              <div data-cursor="media" className="h-full">
                <Photo name="bar" sizes="(min-width:768px) 52vw, 72vw" className="h-full" />
              </div>
            </ImageReveal>
            <p className="mt-3 text-xs tracking-[0.18em] text-sage uppercase">Baren</p>
          </Parallax>
          <Parallax distance={-60} className="absolute top-[30%] right-0 w-[64%] md:top-[12%] md:w-[42%]">
            <ImageReveal from="right" delay={0.15} className="aspect-[3/4] overflow-hidden">
              <div data-cursor="media" className="h-full">
                <Photo name="private-corner" sizes="(min-width:768px) 42vw, 64vw" className="h-full" imgClassName="object-[42%_50%]" />
              </div>
            </ImageReveal>
            <p className="mt-3 text-right text-xs tracking-[0.18em] text-sage uppercase">Hjørnet ved trappen</p>
          </Parallax>
          <Parallax distance={90} className="absolute bottom-0 left-[10%] w-[50%] md:left-[22%] md:w-[30%]">
            <ImageReveal from="bottom" delay={0.3} className="aspect-square overflow-hidden rounded-full border-[6px] border-forest-deep">
              <Photo name="dining" sizes="(min-width:768px) 30vw, 50vw" className="h-full" imgClassName="object-[62%_55%] scale-125" />
            </ImageReveal>
          </Parallax>

          {fragments.map((f, i) => (
            <motion.span
              key={f.text}
              aria-hidden
              className={`display-italic pointer-events-none absolute z-10 rounded-full bg-forest-night/70 px-4 py-1.5 text-xl text-brass-light backdrop-blur-sm md:text-3xl ${f.className}`}
              initial={reduce ? false : { opacity: 0, y: 20, rotate: -6 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 3 : -3 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 1, delay: 0.4 + i * 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              {f.text}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
