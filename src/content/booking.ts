/**
 * BORDRESERVATION — integrationspunkt
 * ───────────────────────────────────
 * Hjemmesiden har bevidst INGEN egen bookingmotor. Når et bookingsystem er valgt
 * (fx DinnerBooking, EasyTable, TheFork Manager eller lign.), skal kun denne fil ændres:
 *
 *   provider: "link"   → alle "Reserver bord"-knapper åbner `url` (ekstern side)
 *   provider: "embed"  → reservation-siden indlejrer `embedUrl` i en iframe
 *   provider: "none"   → preview-tilstand: siden forklarer, at online booking åbner senere
 *
 * Indtil da lader siden ALDRIG en gæst tro, at et bord er reserveret.
 */
export type BookingConfig =
  | { provider: "none" }
  | { provider: "link"; url: string; label?: string }
  | { provider: "embed"; embedUrl: string; height?: number; fallbackUrl?: string };

export const booking: BookingConfig = { provider: "none" };

export const bookingCopy = {
  cta: "Reserver bord",
  previewTitle: "Bordbestilling åbner snart",
  previewBody:
    "Vi er ved at gøre klar på Slotspladsen. Online bordbestilling åbner, når vi nærmer os åbningen — og så ligger den lige her.",
};
