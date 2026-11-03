import Link from "next/link";
import { featuredDishes, formatPrice, menuStatus } from "@/content/menu";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Reveal, RevealLines, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { buttonStyles } from "@/components/booking/BookingButton";

/** Klassikerne — retterne præsenteret typografisk som på et godt bistrokort. */
export function Classics() {
  return (
    <section aria-labelledby="klassikere-titel" className="grain relative isolate overflow-hidden bg-forest text-cream">
      <div className="relative mx-auto grid max-w-[76rem] gap-12 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
        <div>
          <SectionLabel index="02" className="text-brass">Køkkenet</SectionLabel>
          <RevealLines
            id="klassikere-titel"
            className="mt-7 text-[clamp(2.6rem,5vw,4.4rem)]"
            lines={["Det gode", <em key="d" className="display-italic text-brass-light">danske køkken.</em>]}
          />
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg text-cream/80">Et lille kort med de retter, vi holder allermest af. Lavet af gode råvarer og serveret, som de skal.</p>
            <Link href="/menukort/" className={`${buttonStyles("brass", "lg")} mt-8`}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Hele menukortet
            </Link>
          </Reveal>
        </div>

        <div>
          <Stagger as="ol" className="divide-y divide-cream/12 border-y border-cream/12">
            {featuredDishes.map((d) => {
              const price = formatPrice(d.price);
              return (
                <StaggerItem as="li" key={d.id} className="group relative">
                  <div className="flex items-center gap-5 py-5 md:gap-7 md:py-6">
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brass/40 text-brass transition-colors duration-500 group-hover:bg-brass group-hover:text-forest-night md:size-14">
                      <BrandIcon name={d.icon} className="size-6 md:size-7" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-3">
                        <h3 className="font-display text-[clamp(1.7rem,2.6vw,2.3rem)] leading-none transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:translate-x-1.5">
                          {d.name}
                        </h3>
                        <span className="rule-dotted hidden sm:block" aria-hidden />
                        {price && (
                          <p className="ml-auto shrink-0 font-display text-xl text-brass-light tabular-nums sm:ml-0">
                            {price} <span className="text-sm">kr.</span>
                          </p>
                        )}
                      </div>
                      <p className="display-italic mt-1.5 text-lg text-sage">{d.line}</p>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
          <p className="mt-5 flex items-center gap-2 text-sm text-sage">
            <Ornament name="four-point-star" className="size-3 text-brass" />
            {menuStatus.note}
          </p>
        </div>
      </div>
    </section>
  );
}
