import Link from "next/link";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Photo } from "@/components/media/Photo";
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

/** Selskaber + Find os — mørk, blød afslutning med væglampe-stemningen bag */
export function Visit() {
  return (
    <section
      aria-label="Selskaber og besøg"
      className="relative isolate -mt-10 overflow-hidden rounded-t-[50%_2.5rem] bg-forest-night text-cream md:-mt-16 md:rounded-t-[50%_4.5rem]"
    >
      {/* Kunstnerisk baggrund: bløde lamper og bladskygger, dæmpet så teksten står klart */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <Photo name="stemning-vaeg" decorative sizes="100vw" className="h-full opacity-55" imgClassName="scale-105 object-[70%_40%] blur-[2px]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,var(--color-forest-night)_8%,color-mix(in_oklab,var(--color-forest-night)_82%,transparent)_45%,color-mix(in_oklab,var(--color-forest-night)_35%,transparent))]" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-forest-night to-transparent" />
        <div className="candle-flicker absolute top-[18%] right-[22%] size-72 rounded-full bg-[radial-gradient(circle,rgba(232,190,120,0.22),transparent_65%)]" />
      </div>
      <div className="relative mx-auto grid max-w-[76rem] gap-14 px-5 pt-28 pb-24 md:px-10 md:pt-36 md:pb-32 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionLabel index="05" className="text-brass">Selskaber</SectionLabel>
          <RevealLines
            className="mt-7 text-[clamp(2.4rem,4.4vw,3.8rem)]"
            lines={["De bedste øjeblikke", <span key="g">fortjener et <em className="display-italic text-brass-light">godt bord.</em></span>]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-md text-lg text-cream/80">
              Vi tager gerne imod mindre selskaber og private sammenkomster. Fortæl os, hvad I fejrer — så finder vi sammen ud af resten.
            </p>
            <ul className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {occasions.map((o) => (
                <li key={o.title} className="flex items-center gap-3 text-sm font-semibold">
                  <BrandIcon name={o.icon} className="size-7 text-brass" />
                  {o.title}
                </li>
              ))}
            </ul>
            <Link href="/selskaber/" className={`${buttonStyles("ghost-light")} mt-10`}>
              <BrandIcon name="envelope" className="size-[1.15em]" />
              Om selskaber
            </Link>
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative self-start">
          <div className="on-light relative isolate overflow-hidden rounded-t-[10rem] rounded-b-[2px] bg-ivory p-8 pt-16 text-forest shadow-[0_40px_80px_-40px_rgba(0,0,0,0.7)] md:p-12 md:pt-20">
            <Ornament name="crossed-cutlery" className="absolute -top-4 -right-4 size-32 text-brass/20" />
            <p className="eyebrow text-brass-ink">Find os</p>
            <h2 className="mt-5 text-[clamp(2.2rem,3.6vw,3.2rem)]">
              Midt i Randers, <br />
              på <em className="display-italic text-terracotta-ink">Slotspladsen.</em>
            </h2>
            <ContactLines className="mt-8 text-forest/90" iconClassName="text-brass-ink" />
            <div className="mt-6 flex items-start gap-3 text-forest/90">
              <BrandIcon name="clock" className="mt-0.5 size-5 text-brass-ink" />
              <OpeningHours />
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <BookingButton variant="forest" />
              <ArrowLink href={directionsUrl()} external>Rutevejledning</ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
