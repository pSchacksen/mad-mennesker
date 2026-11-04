"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { BrandIcon } from "@/components/brand/BrandIcon";
import { buttonStyles } from "@/components/booking/BookingButton";
import { cn } from "@/lib/cn";

/**
 * Forespørgsel om selskab. Der er ingen server bag: formularen samler
 * oplysningerne i en e-mail i gæstens eget mailprogram, når en e-mailadresse
 * er sat i content/site.ts. Indtil da vises formularen i preview-tilstand og
 * kan ikke sendes — så ingen tror, at en forespørgsel er modtaget.
 */
export function InquiryForm() {
  const to = site.contact.eventsEmail ?? site.contact.email;
  const [opened, setOpened] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!to) return;
    const f = new FormData(e.currentTarget);
    const body = [
      `Navn: ${f.get("navn")}`,
      `Telefon: ${f.get("telefon")}`,
      `Dato: ${f.get("dato")}`,
      `Antal gæster: ${f.get("antal")}`,
      `Anledning: ${f.get("anledning")}`,
      "",
      `${f.get("besked")}`,
    ].join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Selskab: ${f.get("anledning") || "forespørgsel"}`)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  const field = "mt-2 w-full rounded-[2px] border border-forest/20 bg-ivory px-4 py-3 text-forest placeholder:text-ink-muted/60 focus:border-forest focus:outline-none disabled:opacity-60";
  const label = "text-xs font-semibold tracking-[0.16em] uppercase text-ink-muted";

  return (
    <form onSubmit={submit} className="relative" aria-describedby="forespoergsel-status">
      {!to && (
        <p id="forespoergsel-status" className="mb-6 flex items-start gap-3 rounded-[2px] border border-terracotta/40 bg-ivory/80 p-4 text-sm text-terracotta-ink">
          <BrandIcon name="envelope" className="mt-0.5 size-5 shrink-0" />
          Preview: Formularen åbnes, når vores e-mailadresse er på plads. Indtil da kan den ikke sendes.
        </p>
      )}
      <fieldset disabled={!to} className="grid gap-5 sm:grid-cols-2">
        <legend className="sr-only">Fortæl os om jeres arrangement</legend>
        <label className="block">
          <span className={label}>Navn</span>
          <input name="navn" required autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className={label}>Telefon</span>
          <input name="telefon" type="tel" autoComplete="tel" className={field} />
        </label>
        <label className="block">
          <span className={label}>Ønsket dato</span>
          <input name="dato" type="date" className={field} />
        </label>
        <label className="block">
          <span className={label}>Antal gæster</span>
          <input name="antal" type="number" min={1} inputMode="numeric" className={field} />
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Anledning</span>
          <select name="anledning" className={field} defaultValue="">
            <option value="" disabled>
              Vælg anledning
            </option>
            <option>Fødselsdag</option>
            <option>Jubilæum</option>
            <option>Firmafrokost</option>
            <option>Familiesammenkomst</option>
            <option>Andet</option>
          </select>
        </label>
        <label className="block sm:col-span-2">
          <span className={label}>Fortæl os lidt mere</span>
          <textarea name="besked" rows={4} className={field} placeholder="Tidspunkt, ønsker til mad, allergier …" />
        </label>
        <div className="sm:col-span-2">
          <button type="submit" className={cn(buttonStyles("forest", "lg"), "disabled:cursor-not-allowed")}>
            <BrandIcon name="envelope" className="size-[1.15em]" />
            Skriv til os
          </button>
          {opened && (
            <p role="status" className="mt-4 text-sm text-ink-muted">
              Dit mailprogram er åbnet med din forespørgsel. Husk at trykke send — vi svarer så hurtigt, vi kan.
            </p>
          )}
        </div>
      </fieldset>
    </form>
  );
}
