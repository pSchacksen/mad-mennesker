"use client";

import { FrameBorder } from "@/components/brand/FrameBorder";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState, type KeyboardEvent } from "react";
import { menu } from "@/content/menu";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { cn } from "@/lib/cn";
import { DailySpecial, MenuLine, MenuNote } from "./MenuParts";

/** Menukort variant A — et fysisk bistrokort på linned med faner */
export function MenuBistrokort({ showDaily = true }: { showDaily?: boolean }) {
  const [active, setActive] = useState(menu[0].id);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const cat = menu.find((c) => c.id === active)!;

  const onKey = (e: KeyboardEvent, i: number) => {
    const dir = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (i + dir + menu.length) % menu.length;
    setActive(menu[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <div className="on-light relative isolate mx-auto max-w-5xl bg-cream text-forest shadow-[0_50px_100px_-40px_rgba(23,59,48,0.55)]">
      <FrameBorder />
      <Ornament name="corner-botanical" className="absolute top-8 left-8 size-14 text-brass-ink md:size-20" />
      <Ornament name="corner-botanical" className="absolute top-8 right-8 size-14 -scale-x-100 text-brass-ink md:size-20" />

      <div className="relative px-6 pt-24 pb-14 sm:px-12 md:px-20 md:pt-28 md:pb-20">
        <div className="text-center">
          <p className="wordmark text-sm text-brass-ink">Mad &amp; Mennesker</p>
          <p className="mt-2 font-display text-5xl md:text-6xl">Menukort</p>
          <Ornament name="flourish" className="mx-auto mt-4 h-8 w-28 text-brass-ink" />
        </div>

        <div role="tablist" aria-label="Kategorier i menukortet" className="no-scrollbar -mx-6 mt-10 flex gap-2 overflow-x-auto px-6 sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {menu.map((c, i) => {
            const selected = c.id === active;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tab-${c.id}`}
                aria-selected={selected}
                aria-controls={`panel-${c.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(c.id)}
                onKeyDown={(e) => onKey(e, i)}
                className={cn(
                  "relative flex min-h-11 shrink-0 items-center gap-2 rounded-full px-5 text-sm font-semibold tracking-[0.08em] transition-colors duration-300",
                  selected ? "text-cream" : "text-forest hover:bg-forest/8",
                )}
              >
                {selected && (
                  <motion.span layoutId="menu-tab" className="absolute inset-0 -z-10 rounded-full bg-forest" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <BrandIcon name={c.icon} className="size-5" />
                {c.title}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cat.id}
            role="tabpanel"
            id={`panel-${cat.id}`}
            aria-labelledby={`tab-${cat.id}`}
            className="mt-10"
            initial="hidden"
            animate="show"
            exit="exit"
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.05 } },
              exit: { opacity: 0, transition: { duration: 0.2 } },
            }}
          >
            <motion.div variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }} className="text-center">
              <h3 className="text-4xl md:text-5xl">{cat.title}</h3>
              <p className="display-italic mt-1 text-xl text-terracotta-ink">{cat.kicker}</p>
              {cat.intro && <p className="mx-auto mt-4 max-w-xl text-ink-muted">{cat.intro}</p>}
            </motion.div>
            <div className="mt-8 grid gap-x-14 md:grid-cols-2">
              {cat.items.map((item) => (
                <motion.div key={item.id} variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { ease: [0.22, 1, 0.36, 1], duration: 0.6 } } }} className="border-b border-forest/12">
                  <MenuLine item={item} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {showDaily && <DailySpecial className="mt-12" />}
        <div className="mt-8 flex justify-center">
          <MenuNote />
        </div>
      </div>
    </div>
  );
}
