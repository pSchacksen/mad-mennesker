import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
import { Reveal, RevealLines, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buttonStyles } from "@/components/booking/BookingButton";
import type { BrandIconName } from "@/lib/brand-assets";
import Link from "next/link";

export const occasions: { icon: BrandIconName; title: string; text: string }[] = [
  { icon: "glass-toast", title: "Fejringer", text: "Fødselsdage, jubilæer og den slags dage, der fortjener en skål." },
  { icon: "people", title: "Familie & venner", text: "Når hele flokken skal samles om ét langt bord." },
  { icon: "private-dining", title: "Firmafrokost", text: "Kolleger, kunder og en frokost uden powerpoint." },
  { icon: "candle", title: "Bare fordi", text: "Man behøver ikke en anledning for at samles." },
];

/** Selskaber og særlige øjeblikke (forsiden) */
export function Parties() {
  return (
    <section aria-labelledby="selskaber-titel" className="on-light relative isolate overflow-hidden bg-cream py-28 text-forest md:py-44">
      <Texture name="linen-cloth" opacity={0.55} />
      <VectorLayer name="arched-panels" className="inset-0 h-full w-full" style={{ objectFit: "cover", objectPosition: "right bottom" }} />

      <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-12 lg:gap-10">
        <div className="relative lg:col-span-5">
          <Parallax distance={40}>
            <ImageReveal from="bottom" className="aspect-[3/4] overflow-hidden rounded-t-full">
              <div data-cursor="media" className="h-full">
                <Photo name="private-corner" sizes="(min-width:1024px) 40vw, 100vw" className="h-full" imgClassName="object-[45%_50%]" />
              </div>
            </ImageReveal>
          </Parallax>
          <Ornament name="corner-botanical" className="absolute -bottom-8 -left-4 size-24 text-brass-ink md:-left-10 md:size-32" />
        </div>

        <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
          <SectionLabel index="06" className="text-brass-ink">Selskaber</SectionLabel>
          <RevealLines
            id="selskaber-titel"
            className="mt-8 text-[clamp(2.8rem,5.6vw,5.2rem)]"
            lines={["De bedste øjeblikke", <span key="f">fortjener et <em className="display-italic text-terracotta-ink">godt bord.</em></span>]}
          />
          <Reveal>
            <p className="mt-8 max-w-xl text-lg text-ink-muted">
              Vi tager gerne imod mindre selskaber og private sammenkomster. Fortæl os, hvad I fejrer, og hvor mange I er — så finder vi sammen ud af, hvad der passer bedst til jeres dag.
            </p>
          </Reveal>
          <Stagger className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {occasions.map((o) => (
              <StaggerItem key={o.title} className="group flex gap-4">
                <span className="flex size-14 shrink-0 items-center justify-center rounded-full border border-forest/20 bg-ivory text-brass-ink transition-all duration-500 group-hover:-rotate-6 group-hover:border-brass group-hover:bg-forest group-hover:text-brass">
                  <BrandIcon name={o.icon} className="size-7" />
                </span>
                <div>
                  <h3 className="font-display text-2xl font-semibold">{o.title}</h3>
                  <p className="mt-1 text-[0.98rem] text-ink-muted">{o.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-12 flex flex-wrap items-center gap-6">
            <Link href="/selskaber/" className={buttonStyles("forest", "lg")}>
              <BrandIcon name="envelope" className="size-[1.15em]" />
              Fortæl os om jeres arrangement
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
