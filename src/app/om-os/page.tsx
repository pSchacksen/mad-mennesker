import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { ImageReveal } from "@/components/motion/Parallax";
import { Reveal, RevealLines, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { BookingButton } from "@/components/booking/BookingButton";
import type { BrandIconName } from "@/lib/brand-assets";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Om os",
  description:
    "Mad & Mennesker er et nyt samlingssted på Slotspladsen i Randers — klassisk dansk mad, personlig betjening og god tid til hinanden.",
  path: "/om-os/",
  image: "private-corner",
});

const values: { icon: BrandIconName; title: string; text: string }[] = [
  { icon: "leaf", title: "Gode råvarer", text: "Klassiske danske retter starter med ordentlige råvarer. Vi laver hellere få ting godt end mange ting halvt." },
  { icon: "fork-knife", title: "Et kort til at overskue", text: "Et begrænset, gennemarbejdet menukort giver køkkenet ro til at gøre det rigtigt — hver gang." },
  { icon: "heart", title: "Rimelige priser", text: "God mad skal ikke være en sjælden luksus. Det skal være noget, man har lyst til at komme tilbage efter." },
  { icon: "people", title: "Personlig betjening", text: "Vi vil gerne huske dig næste gang. Varm og nærværende service — uden at det bliver stift." },
  { icon: "candle", title: "Hyggelige rammer", text: "Træ, varme farver, bløde stole, levende lys og globelamper. Et sted, hvor man har lyst til at blive." },
  { icon: "branch", title: "Et sted i byen", text: "Vi vil være et naturligt mødested for venner, familier, kolleger og alle andre i Randers og omegn." },
];

export default function OmOsPage() {
  return (
    <>
      <PageHero
        label="Om os"
        lines={["Man kommer for maden.", <em key="i" className="display-italic text-brass-light">Man bliver for stemningen.</em>]}
        intro="Mad & Mennesker bliver et nyt spisested på Slotspladsen i hjertet af Randers. Et sted med personlighed og sjæl, hvor god dansk mad og godt selskab mødes."
        photo="rum-hjorne"
        photoPosition="object-[62%_50%]"
        backdrop="stemning-lamper"
        ornament="round-seal"
      />

      <section className="on-light relative isolate -mt-10 rounded-t-[50%_2.5rem] md:-mt-16 md:rounded-t-[50%_4.5rem] overflow-hidden bg-ivory py-24 text-forest md:py-32">
        <div className="relative mx-auto grid max-w-[76rem] items-center gap-14 px-5 md:grid-cols-[1fr_minmax(0,24rem)] md:gap-20 md:px-10">
          <div>
            <SectionLabel index="01" className="text-brass-ink">Idéen</SectionLabel>
            <RevealLines className="mt-7 text-[clamp(2.4rem,4.4vw,3.8rem)]" lines={["Et moderne bud på", <span key="s">det <em className="display-italic text-terracotta-ink">danske spisested.</em></span>]} />
            <Reveal className="mt-8 max-w-xl space-y-4 text-lg text-ink-muted">
              <p className="font-display text-[1.6rem] leading-snug text-forest">
                Ikke en gourmetrestaurant med komplicerede anretninger — men et sted, hvor smagen, kvaliteten og den hyggelige betjening er i centrum.
              </p>
              <p>Varme lamper, træ, grønne planter og hyggelige kroge. Musikken spiller, men samtalen fylder mest. Levende og afslappet — og du går hjem lidt senere, end du havde regnet med.</p>
            </Reveal>
          </div>
          <div className="relative">
            <ImageReveal className="aspect-[4/5] overflow-hidden rounded-t-full">
              <Photo name="rum-spisesal" sizes="(min-width:768px) 24rem, 90vw" className="h-full" imgClassName="object-[40%_50%]" />
            </ImageReveal>
            <Ornament name="arches" className="absolute -bottom-8 -left-8 size-28 text-brass-ink/60" />
          </div>
        </div>
      </section>

      <section className="grain relative isolate -mt-10 rounded-t-[50%_2.5rem] md:-mt-16 md:rounded-t-[50%_4.5rem] overflow-hidden bg-forest py-24 text-cream md:py-32">
        <div className="relative mx-auto max-w-[76rem] px-5 md:px-10">
          <SectionLabel index="02" className="text-brass">Det, vi står for</SectionLabel>
          <RevealLines className="mt-8 max-w-4xl text-[clamp(2.6rem,5vw,4.6rem)]" lines={["Det, vi ikke går", <em key="i" className="display-italic text-brass-light">på kompromis med.</em>]} />
          <Stagger className="mt-16 grid gap-px overflow-hidden bg-cream/10 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => (
              <StaggerItem key={v.title} className="group bg-forest p-8 transition-colors duration-500 hover:bg-olive md:p-10">
                <div className="flex items-center justify-between">
                  <BrandIcon name={v.icon} className="size-10 text-brass transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" />
                  <span className="font-display text-3xl text-cream/30 italic">0{i + 1}</span>
                </div>
                <h3 className="mt-8 text-3xl">{v.title}</h3>
                <p className="mt-3 text-cream/75">{v.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-16 flex flex-wrap items-center gap-8">
            <BookingButton size="lg" />
            <ArrowLink href="/menukort/" className="text-cream">Se menukortet</ArrowLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
