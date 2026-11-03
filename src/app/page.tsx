import { Hero, Story } from "@/components/sections/home/Switchers";
import { Kitchen } from "@/components/sections/home/Kitchen";
import { MoreThanMeal } from "@/components/sections/home/MoreThanMeal";
import { DayNight } from "@/components/sections/home/DayNight";
import { MenuSection } from "@/components/sections/home/MenuSection";
import { Parties } from "@/components/sections/home/Parties";
import { FindUs } from "@/components/sections/home/FindUs";
import { StructuredData } from "@/components/layout/StructuredData";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Kitchen />
      <MoreThanMeal />
      <DayNight />
      <MenuSection />
      <Parties />
      <FindUs />
      <StructuredData />
    </>
  );
}
