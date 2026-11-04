import Link from "next/link";
import { mainNav } from "@/content/navigation";
import { site } from "@/content/site";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { BookingButton } from "@/components/booking/BookingButton";
import { ContactLines, OpeningHours } from "@/components/ui/Practical";

export function Footer() {
  return (
    <footer className="grain relative isolate overflow-hidden bg-forest-night text-cream">
      <div className="relative mx-auto max-w-[76rem] px-5 pt-20 pb-28 sm:pb-10 md:px-10 md:pt-24">
        <div className="flex flex-col gap-10 border-b border-cream/15 pb-14 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-6">
            <Ornament name="round-seal" className="size-16 shrink-0 animate-spin-slow text-brass md:size-20" />
            <div>
              <p className="wordmark text-[clamp(2rem,5vw,3.6rem)] leading-none">
                Mad <span className="display-italic tracking-normal normal-case text-brass">&amp;</span> Mennesker
              </p>
              <p className="display-italic mt-2 text-xl text-brass-light">Vi gemmer en stol til dig.</p>
            </div>
          </div>
          <BookingButton size="lg" />
        </div>

        <div className="grid gap-10 pt-12 text-[0.95rem] sm:grid-cols-2 md:grid-cols-4 md:gap-8">
          <div>
            <p className="eyebrow text-brass">Besøg os</p>
            <ContactLines className="mt-5 text-cream/85" iconClassName="text-brass" />
          </div>
          <div>
            <p className="eyebrow text-brass">Åbent</p>
            <OpeningHours className="mt-5 text-cream/85" />
          </div>
          <nav aria-label="Sidefod">
            <p className="eyebrow text-brass">Sider</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2 md:grid-cols-1">
              {[...mainNav, { href: "/reservation/", label: "Reservation" }].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-cream/85 transition-colors hover:text-brass">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-brass">Følg med</p>
            <p className="mt-5 flex items-center gap-3 text-cream/85">
              <BrandIcon name="instagram" className="size-5 text-brass" />
              {site.social.instagram ? (
                <a href={site.social.instagram} target="_blank" rel="noopener">Instagram</a>
              ) : (
                <span className="display-italic text-[1.15em] opacity-75">Instagram følger</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 text-xs tracking-wide text-sage md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} {site.name} · {site.address.area}, {site.address.city}</p>
          <p className="flex items-center gap-2">
            <Ornament name="four-point-star" className="size-3 text-brass" />
            {site.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
