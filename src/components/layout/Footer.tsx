import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { Texture, VectorLayer } from "@/components/brand/Layers";
import { BookingButton } from "@/components/booking/BookingButton";
import { ContactLines, OpeningHours } from "@/components/ui/Practical";
import { Reveal } from "@/components/motion/Reveal";
import { FooterWordmark } from "./FooterWordmark";

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-night text-cream">
      <Texture name="golden-bokeh" opacity={0.55} blend="screen" />
      <VectorLayer name="globe-lights" className="inset-x-0 top-0 h-[22rem] w-full opacity-50 md:h-[28rem]" style={{ objectPosition: "top" }} />

      <div className="relative mx-auto max-w-[92rem] px-5 pt-28 md:px-10 md:pt-40">
        <Reveal className="flex flex-col items-center text-center">
          <Ornament name="round-seal" className="size-20 animate-spin-slow text-brass md:size-24" />
          <p className="mt-8 max-w-2xl font-display text-4xl leading-[1.05] md:text-6xl">
            Tak, fordi du kiggede forbi. <span className="display-italic text-brass">Næste gang</span> gemmer vi en stol til dig.
          </p>
          <div className="mt-10">
            <BookingButton size="lg" />
          </div>
        </Reveal>

        <div className="mt-24 grid gap-12 border-t border-cream/15 pt-14 text-[0.95rem] md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="eyebrow text-brass">Besøg os</p>
            <ContactLines className="mt-6 text-cream/85" iconClassName="text-brass" />
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-brass">Åbent</p>
            <OpeningHours className="mt-6 text-cream/85" />
          </div>
          <nav aria-label="Sidefod" className="md:col-span-3">
            <p className="eyebrow text-brass">Sider</p>
            <ul className="mt-6 space-y-2">
              {[{ href: "/", label: "Forside" }, ...mainNav, { href: "/reservation/", label: "Reservation" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="group inline-flex items-center gap-2 text-cream/85 hover:text-brass">
                    <Ornament name="four-point-star" className="size-2.5 text-brass opacity-0 transition-opacity group-hover:opacity-100" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="eyebrow text-brass">Følg med</p>
            <ul className="mt-6 space-y-3 text-cream/85">
              <li className="flex items-center gap-3">
                <BrandIcon name="instagram" className="size-5 text-brass" />
                {site.social.instagram ? (
                  <a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a>
                ) : (
                  <span className="display-italic text-[1.15em] opacity-75">Instagram følger</span>
                )}
              </li>
              {site.social.facebook && (
                <li>
                  <a href={site.social.facebook} target="_blank" rel="noopener">Facebook</a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <FooterWordmark />

      <div className="relative mx-auto flex max-w-[92rem] flex-col gap-3 px-5 pt-6 pb-28 text-xs tracking-wide text-sage sm:pb-8 md:flex-row md:items-center md:justify-between md:px-10">
        <p>© {new Date().getFullYear()} {site.name} · {site.address.area}, {site.address.city}</p>
        <p className="flex items-center gap-2">
          <Ornament name="four-point-star" className="size-3 text-brass" />
          {site.tagline}
        </p>
      </div>
    </footer>
  );
}
