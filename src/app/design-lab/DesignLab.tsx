"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { defaultLoader, loaderOptions, type LoaderId } from "@/content/design";
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
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { INTRO_EXIT_MS } from "@/components/intro/IntroLoader";
import { buttonStyles } from "@/components/booking/BookingButton";
import { cn } from "@/lib/cn";

type Tab = "loadere" | "assets";

export function DesignLab() {
  const [tab, setTab] = useState<Tab>("loadere");

  return (
    <div className="bg-ivory text-forest">
      <div className="bg-forest-night pt-32 pb-10 text-cream">
        <div className="mx-auto max-w-[76rem] px-5 md:px-10">
          <p className="eyebrow text-terracotta">Internt · ikke en del af den offentlige navigation</p>
          <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)]">
            Design <em className="display-italic text-brass-light">Lab</em>
          </h1>
          <p className="mt-4 max-w-2xl text-cream/80">
            Seglet er valgt som intro-loader. Her er fem udgaver af det, og længere nede de øvrige bud. Klik på et billede for at afspille det i
            rammen, eller se det i fuld skærm. Standarden vælges i <code className="text-brass-light">src/content/design.ts</code>.
          </p>

          <div role="tablist" aria-label="Design Lab-sektioner" className="mt-10 flex flex-wrap gap-2">
            {([
              { id: "loadere", label: "Loadere" },
              { id: "assets", label: "Assets" },
            ] as const).map((t) => (
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

      {tab === "loadere" ? <LoaderGallery /> : <AssetOverview />}
    </div>
  );
}

/* Loadere ─────────────────────────────────────────────────────── */

function LoaderGallery() {
  const [full, setFull] = useState<{ id: LoaderId; leaving: boolean; key: number } | null>(null);
  const timers = useRef<number[]>([]);

  const clear = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  const stop = useCallback(() => {
    clear();
    setFull((f) => (f ? { ...f, leaving: true } : f));
    timers.current.push(
      window.setTimeout(() => {
        setFull(null);
        document.documentElement.classList.remove("intro-active");
      }, INTRO_EXIT_MS),
    );
  }, []);

  const play = (id: LoaderId) => {
    clear();
    document.documentElement.classList.add("intro-active");
    setFull({ id, leaving: false, key: Date.now() });
    timers.current.push(window.setTimeout(stop, 3500));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && stop();
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      clear();
      document.documentElement.classList.remove("intro-active");
    };
  }, [stop]);

  return (
    <div className="mx-auto max-w-[76rem] px-5 py-14 md:px-10 md:py-20">
      {([
        { group: "segl", title: "Seglet", sub: "fem udgaver" },
        { group: "andre", title: "Øvrige bud", sub: "fra første runde" },
      ] as const).map((g, gi) => (
        <section key={g.group} className={gi > 0 ? "mt-24 border-t border-forest/15 pt-14" : undefined}>
          <h2 className="text-[clamp(2.2rem,4vw,3.4rem)]">
            {g.title} <em className="display-italic text-terracotta-ink">{g.sub}</em>
          </h2>
          <ol className="mt-10 grid gap-x-8 gap-y-14 md:grid-cols-2">
            {loaderOptions
              .filter((o) => o.group === g.group)
              .map((o, i) => (
                <li key={o.id}>
                  <LoaderFrame id={o.id} label={o.label} />
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <h3 className="text-3xl">
                      <span className="mr-3 font-sans text-sm font-semibold text-brass-ink">{String(i + 1).padStart(2, "0")}</span>
                      {o.label}
                    </h3>
                    {o.id === defaultLoader && (
                      <span className="shrink-0 rounded-full bg-forest px-3 py-1 text-[0.65rem] font-semibold tracking-[0.18em] text-cream uppercase">
                        På siden nu
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-xl text-ink-muted">{o.description}</p>
                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <button type="button" onClick={() => play(o.id)} className={buttonStyles("forest")}>
                      Afspil i fuld skærm
                    </button>
                    {/* Almindeligt link (fuld sideindlæsning), så introen starter forfra */}
                    <a href={`/?intro=${o.id}`} className={buttonStyles("ghost-dark")}>
                      Se på forsiden
                    </a>
                  </div>
                </li>
              ))}
          </ol>
        </section>
      ))}

      {full && <IntroOverlay key={full.key} variant={full.id} leaving={full.leaving} onSkip={stop} />}
    </div>
  );
}

/** Miniature: scenen tegnes i 1280×800 og skaleres ned. Klik afspiller den. */
function LoaderFrame({ id, label }: { id: LoaderId; label: string }) {
  const box = useRef<HTMLButtonElement>(null);
  const [scale, setScale] = useState(0.4);
  const [run, setRun] = useState(0);

  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setScale(e.contentRect.width / 1280));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <button
      ref={box}
      type="button"
      onClick={() => setRun((r) => r + 1)}
      aria-label={`Afspil ${label} i rammen`}
      className="group relative block aspect-[16/10] w-full overflow-hidden rounded-[2px] bg-forest-night shadow-[0_24px_60px_-30px_rgba(10,31,25,0.6)] ring-1 ring-forest/10"
    >
      <div className="absolute top-0 left-0 h-[800px] w-[1280px] origin-top-left" style={{ transform: `scale(${scale})` }}>
        <IntroOverlay key={run} variant={id} frame still={run === 0} />
      </div>
      <span className="absolute right-3 bottom-3 rounded-full bg-forest-night/70 px-3 py-1.5 text-[0.65rem] font-semibold tracking-[0.18em] text-cream uppercase opacity-0 backdrop-blur transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
        {run === 0 ? "Klik for at afspille" : "Klik for at afspille igen"}
      </span>
    </button>
  );
}

/* Assets ─────────────────────────────────────────────────────── */

function AssetOverview() {
  const sections = [
    { title: "Ornamenter", dir: "ornaments", names: ornamentNames, src: (n: string) => ornamentSrc(n as never), dark: false },
    { title: "Ikoner", dir: "icons", names: iconNames, src: (n: string) => iconSrc(n as never), dark: false },
    { title: "Vektorbaggrunde", dir: "vector", names: vectorNames, src: (n: string) => vectorSrc(n as never), dark: true },
    { title: "Teksturer", dir: "textures", names: textureNames, src: (n: string) => textureSrc(n as never), dark: false },
  ];
  return (
    <div className="mx-auto max-w-[76rem] px-5 py-16 md:px-10">
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
