import { PageHero } from "@/components/sections/PageHero";
import { Photo } from "@/components/media/Photo";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture } from "@/components/brand/Layers";
import { ImageReveal, Parallax } from "@/components/motion/Parallax";
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
        photo="private-corner"
        ornament="round-seal"
      />

      <section className="on-light relative isolate overflow-hidden bg-ivory py-28 text-forest md:py-40">
        <Texture name="ivory-plaster" opacity={0.6} />
        <Ornament name="arches" className="absolute top-20 right-[-6rem] size-[28rem] text-brass/25 md:right-10" />
        <div className="relative mx-auto grid max-w-[92rem] gap-16 px-5 md:px-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <SectionLabel index="01" className="text-brass-ink">Idéen</SectionLabel>
            <RevealLines className="mt-8 text-[clamp(2.6rem,5vw,4.6rem)]" lines={["Et moderne bud på", <span key="s">det <em className="display-italic text-terracotta-ink">danske spisested.</em></span>]} />
          </div>
          <div className="space-y-6 text-lg text-ink-muted lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="font-display text-[1.75rem] leading-snug text-forest">
                Vi vil ikke være en gourmetrestaurant med komplicerede anretninger. Vi vil være et sted, hvor smagen, kvaliteten og den hyggelige betjening er i centrum.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Klassisk dansk mad, lavet af gode råvarer. Et kort, der er til at overskue. Og et lokale med varme lamper, træ, grønne planter og hyggelige kroge, hvor samtalerne får lov at fylde — musikken spiller, men den overdøver ikke.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p>Det skal være levende og afslappet. Et sted, hvor du føler dig velkommen fra døren går op, til du går hjem — lidt senere, end du havde regnet med.</p>
            </Reveal>
          </div>
        </div>

        <div className="relative mx-auto mt-24 grid max-w-[92rem] gap-6 px-5 md:grid-cols-12 md:px-10">
          <Parallax distance={40} className="md:col-span-7">
            <ImageReveal from="left" className="aspect-[16/10] overflow-hidden">
              <Photo name="bar" sizes="(min-width:768px) 58vw, 100vw" className="h-full" />
            </ImageReveal>
          </Parallax>
          <Parallax distance={-40} className="md:col-span-4 md:col-start-9 md:mt-32">
            <ImageReveal from="right" className="aspect-[4/5] overflow-hidden">
              <Photo name="dining" sizes="(min-width:768px) 33vw, 100vw" className="h-full" imgClassName="object-[75%_50%]" />
            </ImageReveal>
          </Parallax>
        </div>
      </section>

      <section className="grain relative isolate bg-forest py-28 text-cream md:py-40">
        <Texture name="forest-tile" opacity={0.15} blend="soft-light" />
        <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
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
