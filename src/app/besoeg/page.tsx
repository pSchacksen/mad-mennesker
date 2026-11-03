import { PageHero } from "@/components/sections/PageHero";
import { StylizedMap } from "@/components/media/StylizedMap";
import { Photo } from "@/components/media/Photo";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { Texture } from "@/components/brand/Layers";
import { ImageReveal } from "@/components/motion/Parallax";
import { Reveal } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { AddressBlock, ContactLines, OpeningHours } from "@/components/ui/Practical";
import { BookingButton } from "@/components/booking/BookingButton";
import { directionsUrl } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Besøg os",
  description: "Find Mad & Mennesker på Slotspladsen i Randers. Adresse, åbningstider, kontakt og rutevejledning.",
  path: "/besoeg/",
  image: "facade",
  keywords: ["restaurant Slotspladsen Randers"],
});

const faq = [
  { q: "Kan man bestille bord?", a: "Ja. Online bordbestilling åbner, når vi nærmer os åbningen. Den finder du under “Reserver bord”." },
  { q: "Tager I imod selskaber?", a: "Gerne mindre selskaber og private sammenkomster. Skriv til os via siden om selskaber, så finder vi en løsning." },
  { q: "Hvad står der på menukortet?", a: "Klassisk dansk mad: smørrebrød, stjerneskud, pariserbøf, wienerschnitzel, dagens danske ret og desserter — plus øl, vin, snaps og kaffe." },
  { q: "Har I hensyn til allergier?", a: "Fortæl os det, når du bestiller eller kommer. Så fortæller vi, hvad køkkenet kan gøre." },
];

export default function BesoegPage() {
  return (
    <>
      <PageHero
        label="Besøg os"
        lines={["Find os på", <em key="i" className="display-italic text-brass-light">Slotspladsen.</em>]}
        intro="Midt i Randers, bag den grønne facade med messingbogstaverne. Vi glæder os til at byde dig indenfor."
        photo="facade"
        ornament="crossed-cutlery"
      >
        <div className="flex flex-wrap items-center gap-8">
          <BookingButton size="lg" />
          <ArrowLink href={directionsUrl()} external className="text-cream">Rutevejledning</ArrowLink>
        </div>
      </PageHero>

      <section className="on-light relative isolate bg-ivory py-24 text-forest md:py-36">
        <Texture name="ivory-plaster" opacity={0.6} />
        <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-12">
          <div className="space-y-14 lg:col-span-5">
            <Reveal>
              <SectionLabel className="text-brass-ink">Adresse</SectionLabel>
              <div className="mt-6 flex gap-4 font-display text-3xl leading-tight">
                <BrandIcon name="location" className="mt-1 size-7 text-brass-ink" />
                <AddressBlock />
              </div>
            </Reveal>
            <Reveal>
              <SectionLabel className="text-brass-ink">Åbningstider</SectionLabel>
              <div className="mt-6 flex gap-4 text-lg">
                <BrandIcon name="clock" className="mt-1 size-6 text-brass-ink" />
                <OpeningHours className="flex-1" />
              </div>
            </Reveal>
            <Reveal>
              <SectionLabel className="text-brass-ink">Kontakt</SectionLabel>
              <ContactLines className="mt-6 text-lg" iconClassName="text-brass-ink" />
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal>
              <StylizedMap className="aspect-square w-full" />
            </Reveal>
            <p className="mt-4 text-sm text-ink-muted">
              Kortet er en illustration. Brug{" "}
              <a href={directionsUrl()} target="_blank" rel="noopener" className="underline underline-offset-4">
                rutevejledningen
              </a>{" "}
              for den præcise vej.
            </p>
          </div>
        </div>
      </section>

      <section className="grain relative isolate overflow-hidden bg-forest py-24 text-cream md:py-36">
        <Texture name="forest-leaf-shadow" opacity={0.6} blend="normal" />
        <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionLabel className="text-brass">Godt at vide</SectionLabel>
            <ImageReveal className="mt-10 aspect-[4/3] overflow-hidden" from="left">
              <Photo name="bar" sizes="(min-width:1024px) 40vw, 100vw" className="h-full" />
            </ImageReveal>
          </div>
          <dl className="divide-y divide-cream/15 lg:col-span-6 lg:col-start-7">
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.06} className="py-8 first:pt-0">
                <dt className="font-display text-3xl">{f.q}</dt>
                <dd className="mt-3 text-lg text-cream/80">{f.a}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
