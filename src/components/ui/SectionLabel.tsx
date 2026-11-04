import { cn } from "@/lib/cn";

/** Nummereret sektionslabel — en lille typografisk rytme gennem forsiden. */
export function SectionLabel({ index, children, className }: { index?: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("flex items-center gap-4 text-xs font-semibold tracking-[0.22em] uppercase", className)}>
      {index && <span className="font-display text-base tracking-normal italic opacity-80">{index}</span>}
      <span className="h-px w-10 bg-current opacity-50" />
      <span>{children}</span>
    </p>
  );
}
