import Link from "next/link";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactLines, OpeningHours } from "@/components/ui/Practical";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { directionsUrl } from "@/content/site";
import type { BrandIconName } from "@/lib/brand-assets";

export const occasions: { icon: BrandIconName; title: string; text: string }[] = [
  { icon: "glass-toast", title: "Fejringer", text: "Fødselsdage, jubilæer og dage, der fortjener en skål." },
  { icon: "people", title: "Familie & venner", text: "Når hele flokken skal samles om ét langt bord." },
  { icon: "private-dining", title: "Firmafrokost", text: "Kolleger, kunder og en frokost uden powerpoint." },
  { icon: "candle", title: "Bare fordi", text: "Man behøver ikke en anledning for at samles." },
];

/** Selskaber + Find os, samlet i én afsluttende sektion */
export function Visit() {
  return (
    <section aria-label="Selskaber og besøg" className="on-light relative isolate overflow-hidden bg-ivory text-forest">
      <VectorLayer name="arched-panels" className="inset-0 h-full w-full" />
      <div className="relative mx-auto grid max-w-[76rem] gap-14 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel index="04" className="text-brass-ink">Selskaber</SectionLabel>
          <RevealLines
            className="mt-7 text-[clamp(2.4rem,4.4vw,3.8rem)]"
            lines={["De bedste øjeblikke", <span key="g">fortjener et <em className="display-italic text-terracotta-ink">godt bord.</em></span>]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-ink-muted">
              Vi tager gerne imod mindre selskaber og private sammenkomster. Fortæl os, hvad I fejrer — så finder vi sammen ud af resten.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {occasions.map((o) => (
                <li key={o.title} className="flex items-center gap-3 text-sm font-semibold">
                  <BrandIcon name={o.icon} className="size-7 text-brass-ink" />
                  {o.title}
                </li>
              ))}
            </ul>
            <Link href="/selskaber/" className={`${buttonStyles("forest")} mt-10`}>
              <BrandIcon name="envelope" className="size-[1.15em]" />
              Om selskaber
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative self-start">
          <div className="grain relative isolate overflow-hidden rounded-[2px] bg-forest p-8 text-cream md:p-12">
            <Ornament name="crossed-cutlery" className="absolute -top-4 -right-4 size-32 text-brass/15" />
            <p className="eyebrow text-brass">Find os</p>
            <h2 className="mt-5 text-[clamp(2.2rem,3.6vw,3.2rem)]">
              Midt i Randers, <br />
              på <em className="display-italic text-brass-light">Slotspladsen.</em>
            </h2>
            <ContactLines className="mt-8 text-cream/90" iconClassName="text-brass" />
            <div className="mt-6 flex items-start gap-3 text-cream/90">
              <BrandIcon name="clock" className="mt-0.5 size-5 text-brass" />
              <OpeningHours />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <BookingButton />
              <ArrowLink href={directionsUrl()} external className="text-cream">Rutevejledning</ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
