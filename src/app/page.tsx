import { Hero, Story } from "@/components/sections/home/Switchers";
import { Classics } from "@/components/sections/home/Classics";
import { Mood } from "@/components/sections/home/Mood";
import { Visit } from "@/components/sections/home/Visit";
import { StructuredData } from "@/components/layout/StructuredData";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Story />
      <Classics />
      <Mood />
      <Visit />
      <StructuredData />
    </>
  );
}
