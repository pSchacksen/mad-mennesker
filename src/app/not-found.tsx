import Link from "next/link";
import { Ornament } from "@/components/brand/BrandIcon";
import { buttonStyles } from "@/components/booking/BookingButton";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] flex-col items-center justify-center bg-forest-night px-5 pt-32 pb-20 text-center text-cream">
      <Ornament name="crossed-cutlery" className="size-20 text-brass" />
      <h1 className="mt-8 text-[clamp(3rem,8vw,6rem)]">
        Det bord <em className="display-italic text-brass-light">findes ikke.</em>
      </h1>
      <p className="mt-4 max-w-md text-cream/80">Siden, du leder efter, er flyttet eller har aldrig eksisteret. Men der er plads ved de andre borde.</p>
      <Link href="/" className={`${buttonStyles("brass", "lg")} mt-10`}>
        Til forsiden
      </Link>
    </section>
  );
}
