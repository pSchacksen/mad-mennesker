import { FrameBorder } from "@/components/brand/FrameBorder";
import { PageHero } from "@/components/sections/PageHero";
import { occasions } from "@/components/sections/home/Visit";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { Reveal, RevealLines, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ContactLines } from "@/components/ui/Practical";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Selskaber",
  description:
    "Holder du fødselsdag, jubilæum eller firmafrokost i Randers? Mad & Mennesker på Slotspladsen tager gerne imod mindre selskaber og private sammenkomster.",
  path: "/selskaber/",
  image: "private-corner",
  keywords: ["selskabslokale Randers", "firmafrokost Randers"],
});

const steps = [
  { title: "Fortæl os om dagen", text: "Hvad fejrer I, hvornår, og hvor mange bliver I? Jo mere vi ved, jo bedre kan vi hjælpe." },
  { title: "Vi finder en løsning", text: "Vi vender tilbage og foreslår, hvordan vi kan gøre det — med borde, mad og drikke, der passer til jer." },
  { title: "I møder op", text: "Vi dækker op, tænder lysene og sørger for resten. I skal bare være sammen." },
];

export default function SelskaberPage() {
  return (
    <>
      <PageHero
        label="Selskaber"
        lines={["De bedste øjeblikke", <span key="f">fortjener et <em className="display-italic text-brass-light">godt bord.</em></span>]}
        intro="Fødselsdag, jubilæum, firmafrokost eller bare en god grund til at samles. Vi tager gerne imod mindre selskaber og private sammenkomster."
        photo="private-corner"
        ornament="corner-botanical"
      />

      <section className="on-light relative isolate overflow-hidden bg-cream py-20 text-forest md:py-28">
        <div className="relative mx-auto max-w-[76rem] px-5 md:px-10">
          <SectionLabel index="01" className="text-brass-ink">Anledninger</SectionLabel>
          <Stagger className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {occasions.map((o) => (
              <StaggerItem key={o.title} className="group border-t border-forest/20 pt-8">
                <BrandIcon name={o.icon} className="size-12 text-brass-ink transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6" />
                <h2 className="mt-6 font-display text-3xl font-semibold">{o.title}</h2>
                <p className="mt-2 text-ink-muted">{o.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <div className="mt-20 grid gap-16 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionLabel index="02" className="text-brass-ink">Sådan gør vi</SectionLabel>
              <RevealLines className="mt-8 text-[clamp(2.4rem,4.4vw,4rem)]" lines={["Enkelt og", <em key="i" className="display-italic text-terracotta-ink">uden besvær.</em>]} />
              <ol className="mt-10 space-y-8">
                {steps.map((s, i) => (
                  <Reveal key={s.title} delay={i * 0.1}>
                    <li className="flex gap-6">
                      <span className="font-display text-5xl leading-none text-brass-ink italic">{i + 1}</span>
                      <div>
                        <h3 className="font-display text-2xl font-semibold">{s.title}</h3>
                        <p className="mt-1 text-ink-muted">{s.text}</p>
                      </div>
                    </li>
                  </Reveal>
                ))}
              </ol>
              <Ornament name="flourish" className="mt-12 h-10 w-28 text-brass-ink" />
              <p className="mt-6 max-w-sm text-sm text-ink-muted">
                Har I særlige ønsker til menu, tidspunkt eller borddækning, så skriv det endelig. Vi kan ikke love alt, men vi gør os umage for at finde en god løsning.
              </p>
            </div>

            <div id="kontakt" className="relative scroll-mt-28 lg:col-span-6 lg:col-start-7">
              <div className="relative isolate overflow-hidden bg-ivory p-6 shadow-[0_40px_80px_-40px_rgba(23,59,48,0.45)] sm:p-10">
                <FrameBorder />
                <h2 className="text-4xl">Skriv til os om jeres arrangement</h2>
                <ContactLines className="mt-6 mb-8 text-ink-muted" iconClassName="text-brass-ink" />
                <InquiryForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
