/**
 * BILLEDBIBLIOTEK — central oversigt over alle fotos
 * ──────────────────────────────────────────────────
 * Originalerne ligger tabsfrit i assets-src/photos/, og `npm run images`
 * laver AVIF/WebP/JPEG i 480/828/1280 px og kildens egen bredde. Intet
 * skaleres op.
 *
 * VIGTIGT: Alle billeder er konceptvisualiseringer (AI/3D), ikke fotos af
 * de færdige lokaler eller de præcise serveringer.
 *
 * `maxCss` er den største bredde (CSS-px), billedet bør vises skarpt i på
 * en retina-skærm (ca. kildebredde ÷ 1,9). Bredere visninger bruges kun
 * som bløde, mørkelagte baggrunde, hvor motivet i forvejen er uskarpt.
 */
import type { PhotoName } from "@/components/media/Photo";

export type PhotoEntry = {
  kind: "mad" | "rum" | "bord" | "stemning" | "visualisering";
  subject: string;
  /** Ret i menu.ts, som billedet viser */
  dish?: string;
  maxCss: number;
  /** Hvor der er negativ plads til tekst */
  space?: string;
  notes?: string;
};

export const photoLibrary: Record<PhotoName, PhotoEntry> = {
  "mad-stjerneskud": { kind: "mad", subject: "Stjerneskud med asparges og rogn (4:3)", dish: "stjerneskud", maxCss: 760 },
  "mad-stjerneskud-tomat": { kind: "mad", subject: "Stjerneskud, alternativ anretning (16:9)", dish: "stjerneskud", maxCss: 880, notes: "Reserve; har tomat, som ikke står i beskrivelsen" },
  "mad-pariserbof": { kind: "mad", subject: "Pariserbøf med æggeblomme (4:3)", dish: "pariserbof", maxCss: 760 },
  "mad-wienerschnitzel": { kind: "mad", subject: "Wienerschnitzel med ærter og brunet smør (4:3)", dish: "wienerschnitzel", maxCss: 760 },
  "mad-wienerschnitzel-ol": { kind: "mad", subject: "Wienerschnitzel med fadøl (16:9)", dish: "wienerschnitzel", maxCss: 880, space: "venstre kant" },
  "mad-aeg-rejer": { kind: "mad", subject: "Smørrebrød: æg & rejer (16:9)", dish: "aeg-rejer", maxCss: 880 },
  "mad-roastbeef": { kind: "mad", subject: "Smørrebrød: roastbeef med fadøl (16:9)", dish: "roastbeef", maxCss: 880 },
  "mad-sild": { kind: "mad", subject: "Smørrebrød: marinerede sild (16:9)", dish: "sild", maxCss: 880 },
  "mad-frokostbord": { kind: "mad", subject: "Frokostbord med flere slags smørrebrød (4:3)", dish: "smorrebrod", maxCss: 760 },
  "rum-aftengaester": { kind: "rum", subject: "Aften med gæster, levende lys og globelamper", maxCss: 880, space: "venstre tredjedel (mørk væg)" },
  "rum-hjorne": { kind: "rum", subject: "Hyggeligt hjørne med velourbænk og gæster", maxCss: 880, space: "højre side (grøn væg)" },
  "rum-bar": { kind: "rum", subject: "Baren med barstole og gæster", maxCss: 880 },
  "rum-spisesal": { kind: "rum", subject: "Spisesalen med få gæster i baggrunden", maxCss: 880, space: "venstre halvdel (grøn væg)" },
  "bord-opdaekket": { kind: "bord", subject: "Opdækket bord, hør-dug og fyrfadslys", maxCss: 880, space: "venstre/midte (dugen)" },
  "bord-blomster": { kind: "bord", subject: "Opdækket bord med markblomster", maxCss: 880, space: "venstre (dugen)" },
  "stemning-lamper": { kind: "stemning", subject: "Globelamper, blade og varmt lys (uskarp dybde)", maxCss: 880, space: "midte/venstre", notes: "Egnet som blød fuldbreddebaggrund" },
  "stemning-vaeg": { kind: "stemning", subject: "Grøn væg i varmt lys med lamper", maxCss: 880, space: "venstre/midte", notes: "Egnet som blød fuldbreddebaggrund" },
  facade: { kind: "visualisering", subject: "Facaden om aftenen (PDF)", maxCss: 640 },
  dining: { kind: "visualisering", subject: "Spisesalen (PDF)", maxCss: 640 },
  bar: { kind: "visualisering", subject: "Baren (PDF)", maxCss: 680 },
  "private-corner": { kind: "visualisering", subject: "Privat hjørne (PDF)", maxCss: 660 },
};
