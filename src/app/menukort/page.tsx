import { PageHero } from "@/components/sections/PageHero";
import { MenuPageBody } from "@/components/sections/menu/MenuPageBody";
import { BookingButton } from "@/components/booking/BookingButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Menukort",
  description:
    "Klassisk dansk menukort i Randers: smørrebrød, stjerneskud, pariserbøf, wienerschnitzel og dagens danske ret. Foreløbigt kort med vejledende priser.",
  path: "/menukort/",
  image: "dining",
  keywords: ["menukort Randers", "stjerneskud Randers", "wienerschnitzel Randers"],
});

export default function MenukortPage() {
  return (
    <>
      <PageHero
        label="Menukort"
        lines={["Klassikerne,", <em key="i" className="display-italic text-brass-light">lavet ordentligt.</em>]}
        intro="Smørrebrød til frokost, varme retter hele dagen og en dessert, der er værd at gemme plads til. Et lille kort — så alt kan laves godt."
        photo="dining"
        ornament="crossed-cutlery"
      >
        <BookingButton size="lg" />
      </PageHero>
      <MenuPageBody />
    </>
  );
}
