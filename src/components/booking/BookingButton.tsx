import Link from "next/link";
import { booking, bookingCopy } from "@/content/booking";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";

type Variant = "brass" | "forest" | "ghost-light" | "ghost-dark";

export const buttonStyles = (variant: Variant = "brass", size: "md" | "lg" = "md") =>
  cn(
    "group/btn relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-sans font-semibold tracking-[0.06em] uppercase transition-[color,background-color,border-color,box-shadow,transform] duration-500 ease-[var(--ease-out-soft)] active:scale-[0.98] isolate",
    "before:absolute before:inset-0 before:-z-10 before:origin-bottom before:scale-y-0 before:rounded-full before:transition-transform before:duration-500 before:ease-[var(--ease-out-soft)] hover:before:scale-y-100 focus-visible:before:scale-y-100",
    size === "lg" ? "min-h-14 px-8 text-[0.8rem]" : "min-h-12 px-6 text-[0.75rem]",
    {
      brass: "bg-brass text-forest-night before:bg-ivory shadow-[0_10px_30px_-12px_rgba(195,164,107,0.7)]",
      forest: "bg-forest text-cream before:bg-olive",
      "ghost-light": "border border-cream/40 text-cream before:bg-cream hover:text-forest focus-visible:text-forest",
      "ghost-dark": "border border-forest/30 text-forest before:bg-forest hover:text-cream focus-visible:text-cream",
    }[variant],
  );

/**
 * Den eneste vej til bordreservation. Følger konfigurationen i content/booking.ts.
 */
export function BookingButton({
  variant = "brass",
  size = "md",
  className,
  label = bookingCopy.cta,
}: {
  variant?: Variant;
  size?: "md" | "lg";
  className?: string;
  label?: string;
}) {
  const inner = (
    <>
      <BrandIcon name="calendar" className="size-[1.15em] transition-transform duration-500 group-hover/btn:-rotate-6" />
      <span>{label}</span>
    </>
  );
  if (booking.provider === "link") {
    return (
      <a href={booking.url} target="_blank" rel="noopener" className={cn(buttonStyles(variant, size), className)}>
        {inner}
        <span className="sr-only">(åbner i nyt vindue)</span>
      </a>
    );
  }
  return (
    <Link href="/reservation/" className={cn(buttonStyles(variant, size), className)}>
      {inner}
    </Link>
  );
}
