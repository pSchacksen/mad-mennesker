"use client";

import { useVariants } from "@/lib/variants";
import { HeroCinematic, HeroEditorial, HeroImmersive } from "./Heroes";
import { StoryChapters, StoryEditorial } from "./Story";

export function Hero() {
  const { variants } = useVariants();
  if (variants.hero === "editorial") return <HeroEditorial />;
  if (variants.hero === "immersive") return <HeroImmersive />;
  return <HeroCinematic />;
}

export function Story() {
  const { variants } = useVariants();
  return variants.story === "chapters" ? <StoryChapters /> : <StoryEditorial />;
}
