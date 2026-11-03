import type { ReactNode } from "react";
import { Photo, type PhotoName } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { ImageReveal } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import type { OrnamentName, VectorName } from "@/lib/brand-assets";

/** Fælles, mørk sidetop for undersider: stor typografi + beskåret foto. */
export function PageHero({
  label,
  lines,
  intro,
  photo,
  ornament = "flourish",
  overlay = "globe-lights",
  children,
}: {
  label: string;
  lines: ReactNode[];
  intro?: ReactNode;
  photo?: PhotoName;
  ornament?: OrnamentName;
  overlay?: VectorName;
  children?: ReactNode;
}) {
  return (
    <section className="grain relative isolate overflow-hidden bg-forest-night pt-36 pb-20 text-cream md:pt-48 md:pb-28">
      <Texture name="forest-leaf-shadow" opacity={0.75} blend="normal" />
      <VectorLayer name={overlay} className="inset-x-0 top-0 h-80 w-full animate-glow opacity-70" style={{ objectPosition: "top" }} />
      <div className="relative mx-auto grid max-w-[92rem] gap-12 px-5 md:px-10 lg:grid-cols-12 lg:items-end">
        <div className={photo ? "lg:col-span-7" : "lg:col-span-10"}>
          <Reveal preset="fade">
            <p className="eyebrow text-brass">{label}</p>
          </Reveal>
          <RevealLines as="h1" immediate delay={0.15} className="mt-8 text-[clamp(3.2rem,8.5vw,8rem)]" lines={lines} />
          {intro && (
            <Reveal delay={0.4} className="mt-8 max-w-xl text-lg text-cream/85">
              {intro}
            </Reveal>
          )}
          {children && <Reveal delay={0.5} className="mt-10">{children}</Reveal>}
        </div>
        {photo && (
          <div className="relative lg:col-span-5">
            <ImageReveal immediate delay={0.2} className="aspect-[4/5] overflow-hidden rounded-t-full">
              <Photo name={photo} priority sizes="(min-width:1024px) 40vw, 100vw" className="h-full" />
            </ImageReveal>
            <Ornament name={ornament} className="absolute -bottom-6 -left-6 size-20 text-brass" />
          </div>
        )}
      </div>
    </section>
  );
}
