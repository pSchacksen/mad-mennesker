import { dailySpecial, formatPrice, menuStatus, type MenuItem } from "@/content/menu";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Photo } from "@/components/media/Photo";
import { cn } from "@/lib/cn";

export function MenuLine({
  item,
  dark,
  thumbSlot,
  onOpen,
}: {
  item: MenuItem;
  dark?: boolean;
  /** Reservér plads til miniaturer, så navnene står på linje i kategorien */
  thumbSlot?: boolean;
  onOpen?: (item: MenuItem) => void;
}) {
  const price = formatPrice(item.price);
  return (
    <div className={cn("group flex gap-4 py-4", !thumbSlot && "block")}>
      {thumbSlot && (
        <div className="w-12 shrink-0 pt-1 sm:w-14">
          {item.image && onOpen && (
            <button
              type="button"
              onClick={() => onOpen(item)}
              aria-label={`Se billede af ${item.name}`}
              className="group/thumb relative block size-12 overflow-hidden rounded-full ring-1 ring-brass-ink/40 ring-offset-2 ring-offset-cream transition-[box-shadow,transform] duration-500 hover:scale-105 hover:ring-brass-ink sm:size-14"
            >
              <Photo name={item.image} decorative sizes="56px" className="h-full" imgClassName="transition-transform duration-700 group-hover/thumb:scale-110" />
            </button>
          )}
        </div>
      )}
      <div className="min-w-0 flex-1">
      <div className="flex items-baseline gap-3">
        <h4 className="flex items-center gap-2 font-display text-[1.65rem] leading-tight font-semibold">
          {item.icon && <BrandIcon name={item.icon} className={cn("size-5", dark ? "text-brass" : "text-brass-ink")} />}
          {item.name}
          {item.highlight && (
            <span className={cn("ml-1 rounded-full border px-2 py-0.5 font-sans text-[0.6rem] font-semibold tracking-[0.16em] uppercase", dark ? "border-brass/50 text-brass" : "border-terracotta-ink/40 text-terracotta-ink")}>
              Klassiker
            </span>
          )}
        </h4>
        <span className="rule-dotted" aria-hidden />
        {price ? (
          <p className="shrink-0 font-display text-2xl font-semibold tabular-nums">
            {price}
            <span className="sr-only"> kroner</span>
          </p>
        ) : (
          <Ornament name="four-point-star" className={cn("size-3", dark ? "text-brass" : "text-brass-ink")} />
        )}
      </div>
      {(item.description || item.note) && (
        <p className={cn("mt-1 max-w-[34rem] text-[0.98rem]", dark ? "text-cream/75" : "text-ink-muted")}>
          {item.description}
          {item.note && <em className={cn("display-italic ml-2 text-lg", dark ? "text-brass-light" : "text-terracotta-ink")}>{item.note}</em>}
        </p>
      )}
      </div>
    </div>
  );
}

export function DailySpecial({ dark, className }: { dark?: boolean; className?: string }) {
  const price = formatPrice(dailySpecial.price);
  return (
    <aside
      aria-label="Dagens ret"
      className={cn(
        "relative flex gap-5 rounded-[2px] border p-6 md:p-8",
        dark ? "border-brass/40 bg-forest-night/40" : "border-terracotta/40 bg-ivory/80",
        className,
      )}
    >
      <BrandIcon name="chef-hat" className={cn("size-10 shrink-0", dark ? "text-brass" : "text-terracotta-ink")} />
      <div>
        <p className={cn("text-xs font-semibold tracking-[0.22em] uppercase", dark ? "text-brass" : "text-terracotta-ink")}>Dagens danske ret</p>
        <p className="mt-2 font-display text-3xl leading-tight">
          {dailySpecial.name ?? <em className="display-italic">Spørg os, hvad køkkenet har lavet i dag</em>}
          {price && <span className="ml-3 text-2xl tabular-nums">{price} kr.</span>}
        </p>
        <p className={cn("mt-2 text-[0.98rem]", dark ? "text-cream/75" : "text-ink-muted")}>{dailySpecial.description}</p>
      </div>
    </aside>
  );
}

export function MenuNote({ dark }: { dark?: boolean }) {
  if (!menuStatus.isPreliminary) return null;
  return (
    <p className={cn("flex items-center gap-2 text-sm", dark ? "text-sage" : "text-ink-muted")}>
      <Ornament name="four-point-star" className="size-3 text-brass" />
      {menuStatus.note} Priser i kr.
    </p>
  );
}
