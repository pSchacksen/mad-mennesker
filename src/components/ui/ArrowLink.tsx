import Link from "next/link";
import type { ReactNode } from "react";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { cn } from "@/lib/cn";

/** Tekstlink med animeret understregning og pil fra designpakken. */
export function ArrowLink({
  href,
  children,
  className,
  external,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <span className="relative">
        {children}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-right scale-x-100 bg-current opacity-40 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/link:origin-left group-hover/link:scale-x-0" />
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform delay-150 duration-500 ease-[var(--ease-out-soft)] group-hover/link:scale-x-100" />
      </span>
      <BrandIcon
        name={external ? "arrow-up-right" : "arrow-right"}
        className="size-5 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover/link:translate-x-1"
      />
    </>
  );
  const cls = cn("group/link inline-flex items-center gap-2 font-semibold tracking-wide", className);
  if (external)
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {content}
        <span className="sr-only">(åbner i nyt vindue)</span>
      </a>
    );
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
