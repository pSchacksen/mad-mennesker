import { Hero } from "@/components/sections/home/Heroes";
import { StoryEditorial } from "@/components/sections/home/Story";
import { Kitchen } from "@/components/sections/home/Kitchen";
import { People } from "@/components/sections/home/People";
import { Mood } from "@/components/sections/home/Mood";
import { Visit } from "@/components/sections/home/Visit";
import { StructuredData } from "@/components/layout/StructuredData";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StoryEditorial />
      <Kitchen />
      <People />
      <Mood />
      <Visit />
      <StructuredData />
    </>
  );
}
