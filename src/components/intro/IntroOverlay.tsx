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

function Segl() {
  return (
    <div className="intro-scene">
      <div className="intro-seal">
        <svg viewBox="0 0 240 240" className="intro-seal-ring" aria-hidden>
          <circle className="intro-seal-outer" pathLength={1} cx="120" cy="120" r="114" />
          <circle className="intro-seal-inner" cx="120" cy="120" r="70" />
          <defs>
            <path id="intro-seal-path" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0" />
          </defs>
          <g className="intro-seal-text">
            <text>
              <textPath href="#intro-seal-path">God dansk mad · Gode mennesker · God tid · </textPath>
            </text>
          </g>
        </svg>
        <span className="intro-ripple" />
        <Ornament name="round-seal" className="intro-seal-stamp" />
      </div>
      <Wordmark className="intro-wordmark--small" />
      <Words words={["Slotspladsen", "·", "Randers"]} className="intro-tagline--eyebrow" />
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
