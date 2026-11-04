import type { CSSProperties, ReactNode } from "react";
import { Ornament } from "@/components/brand/BrandIcon";
import type { LoaderId } from "@/content/design";
import { cn } from "@/lib/cn";

/*
 * De seks intro-scener. Alt er ren markup + CSS (src/app/intro.css), så de
 * kan server-renderes og starte, før JavaScript er indlæst. Mål inde i
 * scenerne er i container-enheder (cqw/cqh), så de samme scener også kan
 * vises som miniaturer i Design Lab.
 */

const v = (vars: Record<string, string | number>) => vars as CSSProperties;

function Wordmark({ className }: { className?: string }) {
  return (
    <p className={cn("intro-wordmark", className)}>
      Mad <em>&amp;</em> Mennesker
    </p>
  );
}

function Words({ words, className }: { words: string[]; className?: string }) {
  return (
    <p className={cn("intro-tagline", className)}>
      {words.map((w, i) => (
        <span key={w} style={v({ "--n": i })}>
          {w}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}

const TAGLINE = ["God dansk mad.", "Gode mennesker.", "God tid."];

function Lampe() {
  return (
    <div className="intro-scene">
      <div className="intro-pool" />
      <div className="intro-lamp">
        <span className="intro-cord" />
        <span className="intro-cap" />
        <span className="intro-globe" />
      </div>
      <Wordmark />
      <Words words={TAGLINE} />
      <span className="intro-hairline" />
    </div>
  );
}

function Lys() {
  return (
    <div className="intro-scene">
      <div className="intro-halo" />
      <div className="intro-candle">
        <span className="intro-flame" />
        <span className="intro-wick" />
        <span className="intro-wax" />
        <span className="intro-holder" />
      </div>
      <Wordmark />
      <Words words={["Lysene er tændt.", "Velkommen indenfor."]} />
    </div>
  );
}

function Bordet() {
  return (
    <div className="intro-scene">
      <svg className="intro-table" viewBox="0 0 240 150" fill="none" aria-hidden>
        <g className="intro-fork">
          <path pathLength={1} d="M22 14 V40 Q22 50 29 50 Q36 50 36 40 V14 M26.5 14 V38 M31.5 14 V38 M29 50 V136" />
        </g>
        <circle className="intro-plate" pathLength={1} cx="120" cy="75" r="62" />
        <circle className="intro-plate intro-plate--inner" pathLength={1} cx="120" cy="75" r="46" />
        <g className="intro-knife">
          <path pathLength={1} d="M210 14 C222 30 222 60 216 82 L210 82 Z M213 82 V136" />
        </g>
      </svg>
      <Wordmark />
      <Words words={["Bordet er dækket."]} />
    </div>
  );
}

const SEAL_TEXT = "God dansk mad · Gode mennesker · God tid · ";

/** Seglets ring: ydre cirkel, prikket indre cirkel og teksten på en cirkelbane. */
function SealRing({ textFill, children }: { textFill?: string; children?: ReactNode }) {
  return (
    <svg viewBox="0 0 240 240" className="intro-seal-ring" aria-hidden>
      {children}
      <circle className="intro-seal-outer" pathLength={1} cx="120" cy="120" r="114" />
      <circle className="intro-seal-inner" cx="120" cy="120" r="70" />
      <defs>
        <path id="intro-seal-path" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
      </defs>
      <g className="intro-seal-text" style={textFill ? { fill: textFill } : undefined}>
        <text>
          <textPath href="#intro-seal-path">{SEAL_TEXT}</textPath>
        </text>
      </g>
    </svg>
  );
}

function Segl() {
  return (
    <div className="intro-scene">
      <div className="intro-seal">
        <SealRing />
        <span className="intro-ripple" />
        <Ornament name="round-seal" className="intro-seal-stamp" />
      </div>
      <Wordmark className="intro-wordmark--small" />
      <Words words={["Slotspladsen", "·", "Randers"]} className="intro-tagline--eyebrow" />
    </div>
  );
}

/** Uregelmæssig lakklat (genereret én gang, så den er ens hver gang). */
const WAX =
  "M218.2 103.1 Q223.5 120.0 219.9 137.5 Q216.3 155.0 206.8 170.0 Q197.4 184.9 184.6 197.4 Q171.9 209.8 153.9 210.1 Q135.9 210.4 119.6 212.6 Q103.3 214.8 86.2 211.4 Q69.2 208.1 52.8 199.1 Q36.4 190.1 31.5 172.1 Q26.6 154.0 25.1 137.0 Q23.5 120.0 25.1 103.0 Q26.7 86.1 36.7 72.2 Q46.6 58.4 58.2 45.6 Q69.7 32.9 85.9 25.6 Q102.1 18.3 120.5 15.6 Q138.9 13.0 152.9 25.8 Q167.0 38.6 179.5 49.1 Q192.1 59.5 202.5 72.8 Q213.0 86.2 218.2 103.1 Z";

function Lak() {
  return (
    <div className="intro-scene">
      <div className="intro-seal">
        <svg viewBox="0 0 240 240" className="intro-lak-wax" aria-hidden>
          <defs>
            <radialGradient id="intro-wax-fill" cx="42%" cy="36%" r="70%">
              <stop offset="0" stopColor="#c4664a" />
              <stop offset="0.55" stopColor="#9a3f2c" />
              <stop offset="1" stopColor="#6e2a1d" />
            </radialGradient>
          </defs>
          <path d={WAX} fill="url(#intro-wax-fill)" />
          <circle cx="120" cy="120" r="86" fill="none" stroke="rgba(60,18,10,0.35)" strokeWidth="5" />
          <circle cx="120" cy="120" r="86" fill="none" stroke="rgba(255,190,160,0.18)" strokeWidth="1.2" transform="translate(-1 -1.5)" />
        </svg>
        <div className="intro-wax-press">
          <SealRing />
          <Ornament name="round-seal" className="intro-seal-stamp" />
        </div>
      </div>
      <Wordmark className="intro-wordmark--small" />
      <Words words={["Du", "er", "inviteret."]} />
    </div>
  );
}

function Ur() {
  return (
    <div className="intro-scene">
      <div className="intro-seal">
        <div className="intro-sweep">
          <SealRing />
        </div>
        <span className="intro-hand" />
        <Ornament name="round-seal" className="intro-seal-stamp" />
      </div>
      <div className="intro-caption">
        <Wordmark className="intro-wordmark--small" />
        <Words words={["Der", "er", "god", "tid."]} />
      </div>
    </div>
  );
}

function Glans() {
  return (
    <div className="intro-scene">
      <div className="intro-seal">
        <SealRing textFill="url(#intro-brass)">
          <defs>
            <linearGradient id="intro-brass" gradientUnits="userSpaceOnUse" x1="-240" y1="0" x2="0" y2="80">
              <stop offset="0" stopColor="#8f7444" />
              <stop offset="0.42" stopColor="#d9bf88" />
              <stop offset="0.5" stopColor="#fff4d6" />
              <stop offset="0.58" stopColor="#d9bf88" />
              <stop offset="1" stopColor="#8f7444" />
              <animate attributeName="x1" values="-240;240" dur="1.8s" begin="1.1s" fill="freeze" />
              <animate attributeName="x2" values="0;480" dur="1.8s" begin="1.1s" fill="freeze" />
            </linearGradient>
          </defs>
        </SealRing>
        <Ornament name="round-seal" className="intro-seal-stamp" />
        <Ornament name="four-point-star" className="intro-sparkle" />
      </div>
      <Wordmark className="intro-wordmark--small" />
      <Words words={["God dansk mad.", "Gode mennesker.", "God tid."]} />
    </div>
  );
}

function Rul() {
  return (
    <div className="intro-scene">
      <div className="intro-roll">
        <span className="intro-roll-shadow" />
        <div className="intro-seal">
          <SealRing />
          <Ornament name="round-seal" className="intro-seal-stamp" />
        </div>
      </div>
      <div className="intro-caption">
        <Wordmark className="intro-wordmark--small" />
        <Words words={["Slotspladsen", "·", "Randers"]} className="intro-tagline--eyebrow" />
      </div>
    </div>
  );
}

function Facade() {
  const sign = "MAD & MENNESKER".split("");
  return (
    <>
      <div className="intro-door intro-door--l">
        <span className="intro-knob" />
      </div>
      <div className="intro-door intro-door--r">
        <span className="intro-knob" />
      </div>
      <span className="intro-seam" />
      <div className="intro-scene">
        <div className="intro-sign">
          <p aria-label="Mad & Mennesker">
            {sign.map((c, i) =>
              c === " " ? (
                <span key={i} className="intro-sign-gap" />
              ) : (
                <span key={i} className={c === "&" ? "intro-sign-amp" : undefined} style={v({ "--i": i })}>
                  {c}
                </span>
              ),
            )}
          </p>
        </div>
        <Words words={["Velkommen", "indenfor."]} />
      </div>
    </>
  );
}

function Ord() {
  return (
    <div className="intro-scene">
      <div className="intro-promises">
        {TAGLINE.map((line, i) => (
          <span key={line} className="intro-promise" style={v({ "--n": i })}>
            <span className={i === 2 ? "intro-promise-em" : undefined}>{line}</span>
          </span>
        ))}
      </div>
      <Ornament name="flourish" className="intro-flourish" />
      <Wordmark className="intro-wordmark--small" />
    </div>
  );
}

const scenes: Record<LoaderId, () => ReactNode> = {
  lak: Lak,
  ur: Ur,
  glans: Glans,
  rul: Rul,
  lampe: Lampe,
  lys: Lys,
  bordet: Bordet,
  segl: Segl,
  facade: Facade,
  ord: Ord,
};

export function IntroOverlay({
  variant,
  id,
  frame = false,
  still = false,
  leaving = false,
  onSkip,
}: {
  variant: LoaderId;
  id?: string;
  /** Vis i en ramme (Design Lab) i stedet for over hele skærmen */
  frame?: boolean;
  /** Vis slutbilledet uden animation */
  still?: boolean;
  leaving?: boolean;
  onSkip?: () => void;
}) {
  const Scene = scenes[variant];
  return (
    <div
      id={id}
      aria-hidden="true"
      className={cn("intro", `intro--${variant}`, frame ? "intro--frame" : "intro--fixed", still && "is-still", leaving && "is-leaving")}
    >
      <Scene />
      {onSkip && (
        <button type="button" tabIndex={-1} className="intro-skip-btn" onClick={onSkip}>
          Spring over
        </button>
      )}
    </div>
  );
}
