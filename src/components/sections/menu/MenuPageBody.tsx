"use client";

import { useVariants } from "@/lib/variants";
import { MenuBistrokort } from "./MenuBistrokort";
import { MenuTavle } from "./MenuTavle";
import { Texture } from "@/components/brand/Layers";

export function MenuPageBody() {
  const { variants } = useVariants();
  return (
    <section aria-label="Menukortet" className="on-light relative isolate bg-ivory px-3 py-20 sm:px-5 md:px-10 md:py-32">
      <Texture name="ivory-plaster" opacity={0.6} />
      <div className="relative mx-auto max-w-[92rem]">{variants.menu === "tavle" ? <MenuTavle /> : <MenuBistrokort />}</div>
    </section>
  );
}
