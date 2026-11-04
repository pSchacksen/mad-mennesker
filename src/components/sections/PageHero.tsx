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
  photoPosition,
  backdrop,
  ornament = "flourish",
  children,
}: {
  label: string;
  lines: ReactNode[];
  intro?: ReactNode;
  photo?: PhotoName;
  /** object-position for fotoet i buen, fx "object-[70%_50%]" */
  photoPosition?: string;
  /** Blødt, uskarpt stemningsbillede bag hele toppen (kun bokeh-billeder) */
  backdrop?: PhotoName;
  ornament?: OrnamentName;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-forest-night pt-36 pb-24 text-cream md:pt-40 md:pb-32">
      {backdrop && (
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <Photo name={backdrop} decorative priority sizes="100vw" className="slow-drift h-full scale-110 blur-[3px]" imgClassName="opacity-40" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,31,25,0.55),rgba(10,31,25,0.85))] md:bg-[linear-gradient(90deg,var(--color-forest-night)_25%,rgba(10,31,25,0.7)_60%,rgba(10,31,25,0.5))]" />
        </div>
      )}
      {!backdrop && <GlobeLamps count={3} />}
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
          <div className="relative w-[min(20rem,78vw)] md:w-auto">
            <ImageReveal immediate delay={0.2} className="aspect-[5/4] overflow-hidden rounded-t-full md:aspect-[4/5]">
              <Photo name={photo} priority sizes="(min-width:768px) 20rem, 78vw" className="h-full" imgClassName={photoPosition} />
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
