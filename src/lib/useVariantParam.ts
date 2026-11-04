"use client";

import { useEffect, useState } from "react";

/**
 * Læser en designvariant fra adressen (fx `?hero=atmosfaere`) efter
 * hydrering, så Design Lab kan vise varianterne på den rigtige forside.
 * Uden parameter bruges standarden fra src/content/design.ts.
 */
export function useVariantParam<T extends string>(key: string, options: readonly { id: T }[], fallback: T): T {
  const [value, setValue] = useState<T>(fallback);
  useEffect(() => {
    const v = new URLSearchParams(window.location.search).get(key);
    if (v && options.some((o) => o.id === v)) setValue(v as T);
  }, [key, options]);
  return value;
}
