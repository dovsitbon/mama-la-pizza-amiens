"use client";

import { useEffect, useState, type CSSProperties } from "react";

const KEY = "mama-intro";
const at = (d: number, t?: number) => ({ "--d": `${d}s`, ...(t ? { "--t": `${t}s` } : {}) }) as CSSProperties;

// Spirale de sauce (spirale d'Archimède, du centre vers le bord de la pâte)
const SPIRAL = (() => {
  const pts: string[] = [];
  const turns = 3.2;
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const a = t * turns * Math.PI * 2;
    const r = 4 + t * 52;
    pts.push(`${(100 + r * Math.cos(a)).toFixed(1)} ${(100 + r * Math.sin(a)).toFixed(1)}`);
  }
  return `M${pts.join("L")}`;
})();

const LEAF = "M0 0C-3 -10 4 -18 13 -18 12 -8 7 -1 0 0Z";
const LEAVES = [
  { x: 76, y: 84, r: -30, r0: -90, d: 0.5 },
  { x: 118, y: 92, r: 20, r0: 60, d: 0.56 },
  { x: 96, y: 124, r: 150, r0: 200, d: 0.62 },
];

/**
 * Ouverture (1,2 s, une fois par session), tout en CSS (globals.css) : fond crème, un cercle de pâte se dessine au trait,
 * la sauce tomate s'étale en spirale, trois feuilles de basilic tombent, « MAMA LA PIZZA » rebondit, fondu sur le hero.
 * Bouton « Passer » ; ignorée si l'utilisateur préfère réduire les animations.
 */
export function Intro({ skipLabel }: { skipLabel: string }) {
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      document.documentElement.classList.add("intro-seen");
    }, 1200);
    return () => clearTimeout(t);
  }, []);

  if (gone) return null;

  const p = { pathLength: 1, className: "intro-draw" };
  return (
    <div className="intro-curtain flex flex-col items-center justify-center">
      <svg viewBox="0 0 200 200" className="h-40 w-40 md:h-48 md:w-48" fill="none" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {/* Pâte : bord épais, puis le trait du bord intérieur */}
        <circle {...p} cx="100" cy="100" r="78" stroke="#E2A55B" strokeWidth={14} transform="rotate(-90 100 100)" style={at(0, 0.32)} />
        <circle {...p} cx="100" cy="100" r="86" stroke="#1B2A3A" strokeWidth={3} transform="rotate(-90 100 100)" style={at(0.04, 0.32)} />
        {/* Sauce tomate en spirale */}
        <path {...p} d={SPIRAL} stroke="#C8382B" strokeWidth={9} style={at(0.24, 0.3)} />
        {/* Basilic */}
        {LEAVES.map((l) => (
          <g key={l.x} transform={`translate(${l.x} ${l.y}) rotate(${l.r})`}>
            <path d={LEAF} className="intro-leaf" fill="#3F7A3A" stroke="#2E5A2A" strokeWidth={1.5} style={{ ...at(l.d), "--r0": `${l.r0}deg` } as CSSProperties} />
          </g>
        ))}
      </svg>
      <p className="intro-word display mt-5 text-[2.1rem] tracking-[0.02em] text-navy uppercase md:text-[2.6rem]" aria-hidden="true">
        Mama la pizza
      </p>
      <button
        type="button"
        onClick={() => {
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {}
          document.documentElement.classList.add("intro-seen");
          setGone(true);
        }}
        className="absolute end-4 bottom-4 min-h-11 rounded-full px-4 font-bold text-muted transition-colors hover:text-navy"
      >
        {skipLabel}
      </button>
    </div>
  );
}
