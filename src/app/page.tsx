import { HeroCinematic } from "@/components/sections/home/Heroes";
import { StoryEditorial } from "@/components/sections/home/Story";
import { Classics } from "@/components/sections/home/Classics";
import { Mood } from "@/components/sections/home/Mood";
import { Visit } from "@/components/sections/home/Visit";
import { StructuredData } from "@/components/layout/StructuredData";

export default function HomePage() {
  return (
    <>
      <HeroCinematic />
      <StoryEditorial />
      <Classics />
      <Mood />
      <Visit />
      <StructuredData />
    </>
  );
}
