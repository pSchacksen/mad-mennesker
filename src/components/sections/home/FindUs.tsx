import { Photo } from "@/components/media/Photo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { StylizedMap } from "@/components/media/StylizedMap";
import { ImageReveal } from "@/components/motion/Parallax";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactLines, OpeningHours } from "@/components/ui/Practical";
import { BookingButton } from "@/components/booking/BookingButton";
import { directionsUrl } from "@/content/site";

/** Find os på Slotspladsen */
export function FindUs() {
  return (
    <section aria-labelledby="findos-titel" className="relative isolate overflow-hidden bg-forest text-cream">
      <div className="grid lg:grid-cols-2">
        <div className="relative min-h-[60vh] lg:min-h-[100svh]">
          <ImageReveal from="left" className="absolute inset-0">
            <Photo name="facade" sizes="(min-width:1024px) 50vw, 100vw" className="h-full" imgClassName="object-[50%_60%]" />
          </ImageReveal>
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-forest via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-forest/90" />
        </div>

        <div className="relative px-5 py-24 md:px-10 lg:px-16 lg:py-32">
          <SectionLabel index="07" className="text-brass">Find os</SectionLabel>
          <RevealLines
            id="findos-titel"
            className="mt-8 text-[clamp(2.8rem,5.4vw,5.2rem)]"
            lines={["Midt i Randers,", <span key="s">på <em className="display-italic text-brass-light">Slotspladsen.</em></span>]}
          />
          <Reveal>
            <p className="mt-6 max-w-md text-lg text-cream/85">
              Kig efter den grønne facade med messingbogstaverne og lyset i vinduerne. Vi glæder os til at byde dig indenfor.
            </p>
          </Reveal>

          <Reveal className="mt-12 grid gap-10 sm:grid-cols-2">
            <div>
              <p className="eyebrow text-brass">Kontakt</p>
              <ContactLines className="mt-5 text-cream/90" iconClassName="text-brass" />
            </div>
            <div>
              <p className="eyebrow flex items-center text-brass">Åbningstider</p>
              <div className="mt-5 flex items-start gap-3 text-cream/90">
                <BrandIcon name="clock" className="mt-0.5 size-5 text-brass" />
                <OpeningHours />
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <StylizedMap className="aspect-[4/3] w-full rounded-[2px]" />
          </Reveal>
          <Reveal className="mt-10 flex flex-wrap items-center gap-8">
            <BookingButton />
            <ArrowLink href={directionsUrl()} external className="text-cream">
              Rutevejledning
            </ArrowLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
