import { FrameBorder } from "@/components/brand/FrameBorder";
import { PageHero } from "@/components/sections/PageHero";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { ContactLines } from "@/components/ui/Practical";
import { booking, bookingCopy } from "@/content/booking";
import { buttonStyles } from "@/components/booking/BookingButton";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reserver bord",
  description: "Bestil bord hos Mad & Mennesker på Slotspladsen i Randers. Online bordbestilling åbner snart.",
  path: "/reservation/",
  image: "dining",
});

const preview = [
  { icon: "calendar" as const, title: "Vælg dag og antal", text: "Frokost eller aften — og hvor mange I bliver." },
  { icon: "clock" as const, title: "Vælg tidspunkt", text: "Se ledige tider med det samme." },
  { icon: "envelope" as const, title: "Få bekræftelse", text: "Bekræftelsen kommer på mail fra bookingsystemet." },
];

export default function ReservationPage() {
  return (
    <>
      <PageHero
        label="Reservation"
        lines={["Vi gemmer", <span key="s">et bord <em className="display-italic text-brass-light">til dig.</em></span>]}
        intro="Frokost med kollegerne, middag med vennerne eller bare en hverdag, der fortjener lidt ekstra."
        ornament="round-seal"
      />

      <section className="on-light relative isolate overflow-hidden bg-cream py-20 text-forest md:py-28">
        <VectorLayer name="arched-panels" className="inset-0 h-full w-full" />
        <div className="relative mx-auto max-w-4xl px-5 md:px-10">
          {booking.provider === "embed" && (
            <iframe
              src={booking.embedUrl}
              title="Bordbestilling"
              className="w-full rounded-[2px] border border-forest/15 bg-ivory"
              style={{ height: booking.height ?? 720 }}
              loading="lazy"
            />
          )}

          {booking.provider === "link" && (
            <Reveal className="bg-ivory p-10 text-center shadow-xl">
              <BrandIcon name="calendar" className="mx-auto size-14 text-brass-ink" />
              <h2 className="mt-6 text-5xl">Find et ledigt bord</h2>
              <a href={booking.url} target="_blank" rel="noopener" className={`${buttonStyles("forest", "lg")} mt-8`}>
                {booking.label ?? bookingCopy.cta}
                <span className="sr-only">(åbner bookingsystemet i nyt vindue)</span>
              </a>
            </Reveal>
          )}

          {booking.provider === "none" && (
            <>
              <Reveal className="relative isolate overflow-hidden bg-ivory px-6 py-14 text-center shadow-[0_40px_80px_-40px_rgba(23,59,48,0.45)] sm:px-14">
                <FrameBorder />
                <span className="inline-flex items-center gap-2 rounded-full border border-terracotta/50 px-4 py-1.5 text-[0.7rem] font-semibold tracking-[0.2em] text-terracotta-ink uppercase">
                  <span className="size-2 animate-pulse rounded-full bg-terracotta" />
                  Preview
                </span>
                <BrandIcon name="calendar" className="mx-auto mt-8 block size-16 text-brass-ink" />
                <h2 className="mt-6 text-[clamp(2.4rem,5vw,3.8rem)]">{bookingCopy.previewTitle}</h2>
                <p className="mx-auto mt-4 max-w-lg text-lg text-ink-muted">{bookingCopy.previewBody}</p>
                <Ornament name="flourish" className="mx-auto mt-8 h-8 w-24 text-brass-ink" />
                <p className="mt-6 text-sm text-ink-muted">Der er endnu ikke åbnet for reservationer, og ingen borde kan bestilles her.</p>
              </Reveal>

              <div className="mt-20">
                <p className="eyebrow justify-center text-brass-ink">Sådan kommer det til at virke</p>
                <Stagger className="mt-10 grid gap-8 sm:grid-cols-3">
                  {preview.map((p, i) => (
                    <StaggerItem key={p.title} className="text-center">
                      <span className="mx-auto flex size-16 items-center justify-center rounded-full border border-forest/20 bg-ivory text-brass-ink">
                        <BrandIcon name={p.icon} className="size-7" />
                      </span>
                      <p className="mt-4 font-display text-lg text-brass-ink italic">Trin {i + 1}</p>
                      <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                      <p className="mt-1 text-ink-muted">{p.text}</p>
                    </StaggerItem>
                  ))}
                </Stagger>
              </div>

              <div className="mt-20 grid gap-10 border-t border-forest/15 pt-12 sm:grid-cols-2">
                <div>
                  <h2 className="font-display text-3xl">Selskab på vej?</h2>
                  <p className="mt-2 text-ink-muted">Større borde og private sammenkomster aftaler vi direkte.</p>
                  <ArrowLink href="/selskaber/" className="mt-4">Om selskaber</ArrowLink>
                </div>
                <div>
                  <h2 className="font-display text-3xl">Kontakt</h2>
                  <ContactLines className="mt-4 text-ink-muted" iconClassName="text-brass-ink" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
