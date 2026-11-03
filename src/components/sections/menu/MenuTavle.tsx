"use client";

import { menu } from "@/content/menu";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { DailySpecial, MenuLine, MenuNote } from "./MenuParts";

/** Menukort variant B — mørk tavle med træramme, sticky indeks og hele kortet synligt */
export function MenuTavle() {
  return (
    <div className="relative isolate overflow-hidden rounded-[3px] bg-walnut p-3 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] md:p-5">
      <div className="grain relative isolate bg-forest-night text-cream">
        <div className="grid lg:grid-cols-[17rem_1fr]">
          <nav aria-label="Spring til kategori" className="border-b border-cream/10 p-6 lg:border-r lg:border-b-0 lg:p-10">
            <div className="lg:sticky lg:top-28">
              <p className="wordmark text-sm text-brass">Mad &amp; Mennesker</p>
              <p className="mt-1 font-display text-5xl italic">Tavlen</p>
              <ul className="no-scrollbar mt-8 flex gap-2 overflow-x-auto lg:flex-col lg:gap-1">
                {menu.map((c, i) => (
                  <li key={c.id} className="shrink-0">
                    <a
                      href={`#tavle-${c.id}`}
                      className="group flex min-h-11 items-center gap-3 rounded-full border border-cream/15 px-4 text-sm transition-colors hover:border-brass hover:text-brass lg:rounded-none lg:border-0 lg:px-0"
                    >
                      <span className="font-display text-lg italic text-brass">0{i + 1}</span>
                      {c.title}
                      <BrandIcon name="arrow-right" className="hidden size-4 -translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 lg:block" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="p-6 md:p-12">
            <DailySpecial dark />
            {menu.map((c) => (
              <section key={c.id} id={`tavle-${c.id}`} aria-labelledby={`tavle-h-${c.id}`} className="scroll-mt-28 pt-14">
                <Reveal className="flex items-end justify-between gap-6 border-b border-brass/40 pb-4">
                  <div>
                    <p className="display-italic text-lg text-brass-light">{c.kicker}</p>
                    <h3 id={`tavle-h-${c.id}`} className="text-5xl">{c.title}</h3>
                  </div>
                  <BrandIcon name={c.icon} className="size-12 text-brass" />
                </Reveal>
                {c.intro && <p className="mt-4 max-w-2xl text-cream/75">{c.intro}</p>}
                <Stagger className="mt-2 grid gap-x-12 xl:grid-cols-2">
                  {c.items.map((item) => (
                    <StaggerItem key={item.id} className="border-b border-cream/10">
                      <MenuLine item={item} dark />
                    </StaggerItem>
                  ))}
                </Stagger>
              </section>
            ))}
            <div className="mt-12 flex items-center gap-4">
              <Ornament name="flourish" className="h-8 w-20 text-brass" />
              <MenuNote dark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
