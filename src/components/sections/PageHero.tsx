import type { ReactNode } from "react";
import { Photo, type PhotoName } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { GlobeLamps } from "@/components/brand/GlobeLamps";
import { ImageReveal } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import type { OrnamentName } from "@/lib/brand-assets";

/** Fælles, kompakt sidetop for undersider: typografi + ét skarpt foto i bue. */
export function PageHero({
  label,
  lines,
  intro,
  photo,
  ornament = "flourish",
  children,
}: {
  label: string;
  lines: ReactNode[];
  intro?: ReactNode;
  photo?: PhotoName;
  ornament?: OrnamentName;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-forest-night pt-40 pb-16 text-cream md:pt-40 md:pb-20">
      <GlobeLamps count={3} />
      <div className="relative mx-auto grid max-w-[76rem] items-end gap-12 px-5 md:grid-cols-[1fr_minmax(0,20rem)] md:px-10">
        <div>
          <Reveal preset="fade">
            <p className="eyebrow text-brass">{label}</p>
          </Reveal>
          <RevealLines as="h1" immediate delay={0.15} className="mt-6 text-[clamp(2.8rem,6.4vw,5.6rem)]" lines={lines} />
          {intro && (
            <Reveal delay={0.35} className="mt-6 max-w-xl text-lg text-cream/85">
              {intro}
            </Reveal>
          )}
          {children && <Reveal delay={0.45} className="mt-8">{children}</Reveal>}
        </div>
        {photo ? (
          <div className="relative hidden md:block">
            <ImageReveal immediate delay={0.2} className="aspect-[4/5] overflow-hidden rounded-t-full">
              <Photo name={photo} priority sizes="20rem" className="h-full" />
            </ImageReveal>
            <Ornament name={ornament} className="absolute -bottom-5 -left-5 size-16 text-brass" />
          </div>
        ) : (
          <Ornament name={ornament} className="hidden size-40 justify-self-end text-brass/70 md:block" />
        )}
      </div>
    </section>
  );
}
