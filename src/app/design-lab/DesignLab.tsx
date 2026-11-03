"use client";

import Link from "next/link";
import { useState } from "react";
import { variantOptions, defaultVariants, type VariantKey } from "@/content/design";
import { useVariants } from "@/lib/variants";
import {
  assetUsage,
  iconNames,
  ornamentNames,
  textureNames,
  vectorNames,
  iconSrc,
  ornamentSrc,
  textureSrc,
  vectorSrc,
} from "@/lib/brand-assets";
import { HeroCinematic } from "@/components/sections/home/HeroCinematic";
import { HeroEditorial } from "@/components/sections/home/HeroEditorial";
import { HeroImmersive } from "@/components/sections/home/HeroImmersive";
import { StoryEditorial } from "@/components/sections/home/StoryEditorial";
import { StoryChapters } from "@/components/sections/home/StoryChapters";
import { MenuSection } from "@/components/sections/home/MenuSection";
import { buttonStyles } from "@/components/booking/BookingButton";
import { cn } from "@/lib/cn";

const groups: { key: VariantKey; title: string }[] = [
  { key: "hero", title: "Hero" },
  { key: "story", title: "Storytelling" },
  { key: "menu", title: "Menukort" },
];

type Tab = VariantKey | "assets";

export function DesignLab() {
  const { variants, setVariant, reset, isCustom } = useVariants();
  const [tab, setTab] = useState<Tab>("hero");

  return (
    <div className="bg-ivory text-forest">
      <div className="bg-forest-night pt-32 pb-10 text-cream">
        <div className="mx-auto max-w-[92rem] px-5 md:px-10">
          <p className="eyebrow text-terracotta">Internt · ikke en del af den offentlige navigation</p>
          <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)]">
            Design <em className="display-italic text-brass-light">Lab</em>
          </h1>
          <p className="mt-4 max-w-2xl text-cream/80">
            Afprøv de alternative løsninger direkte i browseren. Dit valg gemmes kun lokalt hos dig og slår igennem på forsiden og menukortet,
            så I kan sammenligne i den rigtige sammenhæng. Den offentlige standard ændres i <code className="text-brass-light">src/content/design.ts</code>.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/" className={buttonStyles("brass")}>Se forsiden med mine valg</Link>
            <button type="button" onClick={reset} disabled={!isCustom} className={cn(buttonStyles("ghost-light"), "disabled:opacity-40")}>
              Nulstil til standard
            </button>
            <p className="text-sm text-sage">
              Aktive valg: hero <b>{variants.hero}</b> · story <b>{variants.story}</b> · menu <b>{variants.menu}</b>
            </p>
          </div>

          <div role="tablist" aria-label="Design Lab-sektioner" className="mt-12 flex flex-wrap gap-2">
            {[...groups.map((g) => ({ id: g.key as Tab, label: g.title })), { id: "assets" as Tab, label: "Assets" }].map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={cn(
                  "min-h-11 rounded-full px-6 text-sm font-semibold tracking-[0.12em] uppercase transition-colors",
                  tab === t.id ? "bg-cream text-forest" : "border border-cream/25 hover:border-brass",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {tab !== "assets" && (
        <>
          <div className="sticky top-0 z-30 border-b border-forest/10 bg-ivory/95 backdrop-blur">
            <div className="mx-auto grid max-w-[92rem] gap-3 px-5 py-4 md:grid-cols-3 md:px-10" role="radiogroup" aria-label={`Varianter: ${tab}`}>
              {variantOptions[tab].map((o) => {
                const checked = variants[tab] === o.id;
                return (
                  <button
                    key={o.id}
                    role="radio"
                    aria-checked={checked}
                    onClick={() => setVariant(tab, o.id as never)}
                    className={cn(
                      "rounded-[2px] border p-4 text-left transition-colors",
                      checked ? "border-forest bg-forest text-cream" : "border-forest/20 hover:border-forest",
                    )}
                  >
                    <span className="flex items-center justify-between gap-2 font-display text-xl font-semibold">
                      {o.label}
                      {defaultVariants[tab] === o.id && <span className="font-sans text-[0.6rem] tracking-[0.18em] uppercase opacity-70">Standard</span>}
                    </span>
                    <span className="mt-1 block text-sm opacity-80">{o.description}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="relative">
            {tab === "hero" && (variants.hero === "editorial" ? <HeroEditorial /> : variants.hero === "immersive" ? <HeroImmersive /> : <HeroCinematic />)}
            {tab === "story" && (variants.story === "chapters" ? <StoryChapters /> : <StoryEditorial />)}
            {tab === "menu" && <MenuSection variant={variants.menu} />}
          </div>
        </>
      )}

      {tab === "assets" && <AssetOverview />}
    </div>
  );
}

function AssetOverview() {
  const sections = [
    { title: "Ornamenter", dir: "ornaments", names: ornamentNames, src: (n: string) => ornamentSrc(n as never), dark: false },
    { title: "Ikoner", dir: "icons", names: iconNames, src: (n: string) => iconSrc(n as never), dark: false },
    { title: "Vektorbaggrunde", dir: "vector", names: vectorNames, src: (n: string) => vectorSrc(n as never), dark: true },
    { title: "Teksturer", dir: "textures", names: textureNames, src: (n: string) => textureSrc(n as never), dark: false },
  ];
  return (
    <div className="mx-auto max-w-[92rem] px-5 py-16 md:px-10">
      <p className="max-w-2xl text-ink-muted">
        Central oversigt over Designpakke V1 (<code>public/brand/mad-og-mennesker/</code>) og hvor hvert asset bruges. Kilden er{" "}
        <code>src/lib/brand-assets.ts</code>.
      </p>
      {sections.map((s) => (
        <section key={s.title} className="mt-14">
          <h2 className="text-4xl">{s.title}</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {s.names.map((n) => {
              const used = assetUsage[`${s.dir}/${n}`];
              return (
                <li key={n} className={cn("rounded-[2px] border p-4", used ? "border-forest/25" : "border-dashed border-forest/15 opacity-70")}>
                  <div className={cn("flex h-28 items-center justify-center overflow-hidden", s.dark ? "bg-forest" : "bg-cream")}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={s.src(n)} alt="" className={s.dir === "textures" || s.dir === "vector" ? "h-full w-full object-cover" : "size-16"} loading="lazy" />
                  </div>
                  <p className="mt-3 font-semibold">{n}</p>
                  {used ? (
                    <ul className="mt-1 list-disc pl-4 text-sm text-ink-muted">
                      {used.map((u) => (
                        <li key={u}>{u}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-1 text-sm text-ink-muted italic">Ikke anvendt (bevidst fravalgt)</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
