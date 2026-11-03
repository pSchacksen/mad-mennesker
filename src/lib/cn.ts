import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: { classGroups: { "font-family": ["font-display", "font-sans"] } },
});

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
