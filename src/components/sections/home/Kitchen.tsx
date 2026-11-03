"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";
import { featuredDishes, formatPrice } from "@/content/menu";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture } from "@/components/brand/Layers";
import { DishArt } from "@/components/media/DishArt";
import { Photo, type PhotoName } from "@/components/media/Photo";
import { buttonStyles } from "@/components/booking/BookingButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/cn";

/**
 * "Det gode danske køkken" — horisontal fortælling.
 * Desktop: sektionen pinnes, og retterne glider forbi vandret, mens man scroller lodret.
 * Mobil/reduceret bevægelse: almindelig vandret swipe med scroll-snap.
 */
export function Kitchen() {
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const pinned = desktop && !reduce;
  const outer = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    if (!pinned || !track.current) return;
    const measure = () => setDistance(Math.max(0, track.current!.scrollWidth - window.innerWidth));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const bar = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(featuredDishes.length - 1, Math.max(0, Math.floor(v * (featuredDishes.length + 1)) - 0)));
  });

  return (
    <section
      ref={outer}
      aria-labelledby="koekken-titel"
      className="relative bg-forest text-cream"
      style={pinned ? { height: `calc(100svh + ${distance}px)` } : undefined}
    >
      <div className={cn("grain relative isolate overflow-hidden", pinned && "sticky top-0 h-[100svh]")}>
        <Texture name="forest-tile" opacity={0.18} blend="soft-light" />
        <motion.div
          ref={track}
          style={pinned ? { x } : undefined}
          className={cn(
            "flex h-full items-stretch gap-6 px-5 py-24 md:gap-10 md:px-10",
            !pinned && "no-scrollbar snap-x snap-mandatory overflow-x-auto",
            pinned && "w-max items-center py-0",
          )}
        >
          {/* Intro-panel */}
          <div className="flex w-[82vw] shrink-0 snap-start flex-col justify-center sm:w-[60vw] lg:w-[38vw] lg:pr-10">
            <SectionLabel index="02" className="text-brass">Køkkenet</SectionLabel>
            <h2 id="koekken-titel" className="mt-8 text-[clamp(3rem,6vw,6rem)]">
              Det gode <br />
              <em className="display-italic text-brass-light">danske</em> køkken
            </h2>
            <p className="mt-8 max-w-md text-lg text-cream/85">
              Et kort, der er til at overskue — med retter, du kender og kommer tilbage efter. Lavet af gode råvarer og serveret, som de skal.
            </p>
            <p className="mt-6 flex items-center gap-3 text-sm tracking-wide text-sage">
              <BrandIcon name="arrow-right" className="size-5 text-brass" />
              {pinned ? "Scroll for at se retterne" : "Swipe for at se retterne"}
            </p>
          </div>

          {featuredDishes.map((dish, i) => (
            <DishPanel key={dish.id} dish={dish} index={i} flip={i % 2 === 1} active={pinned && active === i + 1} />
          ))}

          {/* Afslutning */}
          <div className="flex w-[82vw] shrink-0 snap-start flex-col items-start justify-center gap-8 sm:w-[50vw] lg:w-[30vw]">
            <Ornament name="crossed-cutlery" className="size-20 text-brass" />
            <p className="font-display text-5xl leading-none">
              Og så er der <em className="display-italic text-brass-light">desserten</em>…
            </p>
            <Link href="/menukort/" className={buttonStyles("brass", "lg")}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Se hele menukortet
            </Link>
          </div>
        </motion.div>

        {pinned && (
          <div aria-hidden className="absolute inset-x-10 bottom-10 h-px bg-cream/15">
            <motion.div className="h-full bg-brass" style={{ width: bar }} />
          </div>
        )}
      </div>
    </section>
  );
}

function DishPanel({
  dish,
  index,
  flip,
  active,
}: {
  dish: (typeof featuredDishes)[number];
  index: number;
  flip: boolean;
  active: boolean;
}) {
  const price = formatPrice(dish.price);
  return (
    <article
      className={cn(
        "group flex w-[82vw] shrink-0 snap-start flex-col gap-6 sm:w-[56vw] lg:w-[34vw] lg:max-w-[34rem]",
        flip && "lg:flex-col-reverse lg:pt-16",
        !flip && "lg:pb-16",
      )}
      aria-labelledby={`ret-${dish.id}`}
    >
      <div data-cursor="media" className="relative aspect-[4/5] overflow-hidden lg:aspect-[5/6]">
        {dish.image ? (
          <Photo name={dish.image as PhotoName} sizes="(min-width:1024px) 34vw, 82vw" className="h-full transition-transform duration-1000 group-hover:scale-105" />
        ) : (
          <DishArt icon={dish.icon} label={dish.name} className="h-full" />
        )}
        <span className="absolute top-4 right-4 font-display text-6xl leading-none text-forest/80 italic mix-blend-multiply">
          0{index + 1}
        </span>
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-4">
          <h3 id={`ret-${dish.id}`} className="flex items-center gap-3 text-[clamp(2.2rem,3.4vw,3.2rem)]">
            <Ornament
              name="four-point-star"
              className={cn("size-4 text-brass transition-all duration-700", active ? "scale-100 opacity-100" : "scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100")}
            />
            {dish.name}
          </h3>
          {price && (
            <p className="shrink-0 font-display text-2xl text-brass-light tabular-nums">
              {price} <span className="text-sm">kr.</span>
            </p>
          )}
        </div>
        <p className="display-italic mt-1 text-xl text-brass-light">{dish.line}</p>
        <p className="mt-3 max-w-md text-cream/80">{dish.story}</p>
      </div>
    </article>
  );
}
