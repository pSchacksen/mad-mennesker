"use client";

import { useVariants } from "@/lib/variants";
import { MenuBistrokort } from "@/components/sections/menu/MenuBistrokort";
import { MenuTavle } from "@/components/sections/menu/MenuTavle";
import { Reveal, RevealLines } from "@/components/motion/Reveal";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { Texture } from "@/components/brand/Layers";

export function MenuSection({ variant }: { variant?: "bistrokort" | "tavle" }) {
  const { variants } = useVariants();
  const v = variant ?? variants.menu;
  return (
    <section id="menukort" aria-labelledby="menu-titel" className="on-light relative isolate overflow-hidden bg-ivory py-28 text-forest md:py-40">
      <Texture name="ivory-plaster" opacity={0.6} />
      <div className="relative mx-auto max-w-[92rem] px-5 md:px-10">
        <div className="mb-16 grid gap-8 md:grid-cols-2 md:items-end">
          <div>
            <SectionLabel index="05" className="text-brass-ink">Menukortet</SectionLabel>
            <RevealLines id="menu-titel" className="mt-8 text-[clamp(2.8rem,6vw,5.5rem)]" lines={["Kort og godt.", <em key="i" className="display-italic text-terracotta-ink">Mest godt.</em>]} />
          </div>
          <Reveal className="md:justify-self-end md:text-right">
            <p className="max-w-md text-lg text-ink-muted">
              Et overskueligt kort med de retter, vi holder allermest af. Suppleret af dagens ret og det, sæsonen byder på.
            </p>
            <ArrowLink href="/menukort/" className="mt-6">Se hele menukortet</ArrowLink>
          </Reveal>
        </div>
        <Reveal amount={0.1}>{v === "tavle" ? <MenuTavle /> : <MenuBistrokort />}</Reveal>
      </div>
    </section>
  );
}
