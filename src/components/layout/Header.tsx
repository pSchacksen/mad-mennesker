"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { mainNav } from "@/content/navigation";
import { BookingButton, buttonStyles } from "@/components/booking/BookingButton";
import { BrandIcon, Ornament } from "@/components/brand/BrandIcon";
import { VectorLayer } from "@/components/brand/Layers";
import { Wordmark } from "./Wordmark";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBar, setShowBar] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 40);
    setHidden(y > 320 && y > prev && !open);
    setShowBar(y > 480);
  });

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href.replace(/\/$/, ""));

  return (
    <>
      <a
        href="#indhold"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-forest-night"
      >
        Spring til indhold
      </a>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 text-cream transition-[transform,background-color,box-shadow,padding] duration-500 ease-[var(--ease-out-soft)]",
          solid && !open ? "bg-forest-deep/85 py-3 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-md" : "py-5 md:py-7",
          hidden && "-translate-y-full",
        )}
      >
        <div className="mx-auto flex max-w-[84rem] items-center justify-between gap-6 px-5 md:px-10">
          <Link href="/" aria-label="Mad & Mennesker — til forsiden" className="relative z-10 rounded-sm">
            <Wordmark compact />
          </Link>

          <nav aria-label="Hovedmenu" className="hidden lg:block">
            <ul className="flex items-center gap-9 text-[0.8rem] font-semibold tracking-[0.16em] uppercase">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className="group relative py-2"
                  >
                    {item.label}
                    <span
                      className={cn(
                        "absolute -bottom-0.5 left-1/2 h-px -translate-x-1/2 bg-brass transition-all duration-500 ease-[var(--ease-out-soft)]",
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <BookingButton className="hidden sm:inline-flex" />
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobilmenu"
              aria-label={open ? "Luk menu" : "Åbn menu"}
              className="relative z-10 inline-flex size-12 items-center justify-center rounded-full border border-cream/30 transition-colors hover:border-brass hover:text-brass lg:hidden"
            >
              {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobilmenu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-forest-night text-cream lg:hidden"
            initial={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 3rem) 3rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 3rem) 3rem)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <VectorLayer name="globe-lights" className="inset-x-0 top-0 h-56 w-full opacity-70" style={{ objectPosition: "top" }} />
            <nav aria-label="Mobilmenu" className="relative mt-32 px-6">
              <ul className="space-y-1">
                {[{ href: "/", label: "Forside" }, ...mainNav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-2 font-display text-5xl leading-tight"
                    >
                      <span className="font-sans text-xs tracking-[0.2em] text-brass">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <motion.div
              className="relative mt-auto space-y-6 px-6 pt-10 pb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <BookingButton size="lg" className="w-full" />
              <p className="flex items-center gap-3 text-sm text-sage">
                <BrandIcon name="location" className="size-5 text-brass" />
                {site.address.area}, {site.address.city}
              </p>
              <Ornament name="flourish" className="h-8 w-24 text-brass/60" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobil handlingsbjælke: menukort og reservation altid inden for tommelfingerens rækkevidde */}
      <AnimatePresence>
        {showBar && !open && (
          <motion.div
            className="fixed inset-x-3 bottom-3 z-40 flex gap-2 rounded-full bg-forest-night/90 p-1.5 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.7)] backdrop-blur-md sm:hidden"
            style={{ paddingBottom: "max(0.375rem, env(safe-area-inset-bottom))" }}
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/menukort/" className={cn(buttonStyles("ghost-light"), "flex-1 border-transparent")}>
              <BrandIcon name="fork-knife" className="size-[1.15em]" />
              Menukort
            </Link>
            <BookingButton className="flex-1" label="Reserver" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
