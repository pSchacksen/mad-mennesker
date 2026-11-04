"use client";

import { useEffect, useRef } from "react";
import { Photo } from "@/components/media/Photo";
import { formatPrice, type MenuItem } from "@/content/menu";

/**
 * Større visning af en ret fra menukortet. Native <dialog> giver fokusfælde,
 * Escape-lukning og korrekt semantik uden ekstra afhængigheder.
 */
export function DishLightbox({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (item && !d.open) d.showModal();
    if (!item && d.open) d.close();
  }, [item]);

  const price = item ? formatPrice(item.price) : null;

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-labelledby="ret-titel"
      className="dish-dialog m-auto w-[min(50rem,calc(100vw-1.5rem))] max-w-none overflow-visible bg-transparent p-0 text-forest backdrop:bg-forest-night/80 backdrop:backdrop-blur-sm"
    >
      {item?.image && (
        <div className="relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-2 -right-2 z-10 grid size-11 place-items-center rounded-full bg-cream text-forest shadow-lg transition-colors hover:bg-brass sm:-top-4 sm:-right-4"
          aria-label="Luk"
          autoFocus
        >
          <svg viewBox="0 0 24 24" aria-hidden className="size-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        <figure className="on-light relative overflow-hidden rounded-t-[min(12rem,22vw)] rounded-b-[2px] bg-cream shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]">
          <div className="aspect-[16/10] max-h-[62svh] w-full overflow-hidden">
            <Photo name={item.image} sizes="(min-width:820px) 50rem, 100vw" className="h-full" />
          </div>
          <figcaption className="flex flex-wrap items-baseline gap-x-4 gap-y-1 px-6 py-5 md:px-8 md:py-6">
            <p id="ret-titel" className="font-display text-3xl font-semibold">{item.name}</p>
            {price && <p className="font-display text-2xl tabular-nums">{price} kr.</p>}
            <p className="w-full text-[0.98rem] text-ink-muted">{item.description}</p>
            <p className="w-full pt-1 text-xs text-ink-muted/80">Visualisering — serveringen kan variere.</p>
          </figcaption>
        </figure>
        </div>
      )}
    </dialog>
  );
}
