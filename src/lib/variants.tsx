"use client";

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { defaultVariants, variantOptions, type VariantKey, type Variants } from "@/content/design";

const STORAGE_KEY = "mm-design-variants";

type Ctx = {
  variants: Variants;
  setVariant: <K extends VariantKey>(key: K, value: Variants[K]) => void;
  reset: () => void;
  isCustom: boolean;
};

const VariantContext = createContext<Ctx>({
  variants: defaultVariants,
  setVariant: () => {},
  reset: () => {},
  isCustom: false,
});

const isValid = (key: VariantKey, value: unknown) =>
  (variantOptions[key] as readonly { id: string }[]).some((o) => o.id === value);

function readStored(): Partial<Variants> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function VariantProvider({ children }: { children: ReactNode }) {
  const [variants, setVariants] = useState<Variants>(defaultVariants);

  // Læs valg fra Design Lab (localStorage) og evt. ?hero=…&story=…&menu=… i URL'en.
  useEffect(() => {
    const next: Variants = { ...defaultVariants };
    const stored = readStored();
    const params = new URLSearchParams(window.location.search);
    (Object.keys(defaultVariants) as VariantKey[]).forEach((key) => {
      const v = params.get(key) ?? stored[key];
      if (isValid(key, v)) (next as Record<string, unknown>)[key] = v;
    });
    setVariants(next);
  }, []);

  const persist = (v: Variants) => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(v));
    } catch {}
  };

  const setVariant = useCallback(<K extends VariantKey>(key: K, value: Variants[K]) => {
    setVariants((prev) => {
      const next = { ...prev, [key]: value };
      persist(next);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setVariants(defaultVariants);
  }, []);

  const isCustom = (Object.keys(defaultVariants) as VariantKey[]).some((k) => variants[k] !== defaultVariants[k]);

  return <VariantContext.Provider value={{ variants, setVariant, reset, isCustom }}>{children}</VariantContext.Provider>;
}

export const useVariants = () => useContext(VariantContext);
