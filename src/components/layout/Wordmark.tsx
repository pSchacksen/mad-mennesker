import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";

/** Ordmærket som på facaden: bestik + MAD & MENNESKER i klassiske versaler. */
export function Wordmark({ className, compact }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <BrandIcon name="fork-knife" className={cn("text-brass", compact ? "size-6" : "size-7")} />
      <span className={cn("wordmark leading-none whitespace-nowrap", compact ? "text-[1.05rem]" : "text-xl")}>
        Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span> Mennesker
      </span>
    </span>
  );
}
