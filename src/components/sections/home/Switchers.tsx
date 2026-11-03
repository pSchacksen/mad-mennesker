"use client";

import { useVariants } from "@/lib/variants";
import { HeroCinematic } from "./HeroCinematic";
import { HeroEditorial } from "./HeroEditorial";
import { HeroImmersive } from "./HeroImmersive";
import { StoryEditorial } from "./StoryEditorial";
import { StoryChapters } from "./StoryChapters";

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
