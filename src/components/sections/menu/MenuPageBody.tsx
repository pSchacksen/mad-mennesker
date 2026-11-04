import { Photo } from "@/components/media/Photo";
import { Ornament } from "@/components/brand/BrandIcon";
import { Reveal } from "@/components/motion/Reveal";
import { formatPrice, menu } from "@/content/menu";
import { MenuBistrokort } from "./MenuBistrokort";

/** Husets klassikere: de fremhævede varme retter med foto, før selve kortet */
const classics = menu.flatMap((c) => c.items).filter((it) => it.highlight && it.image);

export function MenuPageBody() {
  return (
    <section aria-label="Menukortet" className="on-light relative isolate -mt-10 rounded-t-[50%_2.5rem] bg-ivory px-3 pt-20 pb-16 sm:px-5 md:-mt-16 md:rounded-t-[50%_4.5rem] md:px-10 md:pt-28 md:pb-24">
      <div className="relative mx-auto max-w-[76rem]">
        <div className="mx-auto max-w-5xl px-2 sm:px-0">
          <Reveal className="flex items-center gap-4">
            <Ornament name="four-point-star" className="size-3 text-brass-ink" />
            <h2 className="eyebrow text-brass-ink">Husets klassikere</h2>
          </Reveal>
          <ul className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible sm:px-0">
            {classics.map((d, i) => (
              <li key={d.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
                <Reveal delay={i * 0.08}>
                <figure>
                  <div className="aspect-[4/3] overflow-hidden rounded-t-[5rem] rounded-b-[2px] bg-forest/10">
                    <Photo name={d.image!} sizes="(min-width:640px) 22rem, 78vw" className="h-full" imgClassName="transition-transform duration-[1.2s] ease-[var(--ease-out-soft)] hover:scale-105" />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-3">
                    <span className="font-display text-2xl font-semibold">{d.name}</span>
                    <span className="rule-dotted" aria-hidden />
                    <span className="font-display text-xl tabular-nums">{formatPrice(d.price)} kr.</span>
                  </figcaption>
                  <p className="mt-1 text-[0.95rem] text-ink-muted">{d.description}</p>
                </figure>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-14 md:mt-20">
          <MenuBistrokort />
        </div>
      </div>
    </section>
  );
}
