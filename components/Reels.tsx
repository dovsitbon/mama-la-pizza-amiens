"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/components/providers";
import { PlayIcon } from "@/components/icons";
import { fill } from "@/lib/i18n";
import type { Img } from "@/lib/media";

/**
 * Reels Instagram en vignettes : rien n'est chargé depuis Instagram tant qu'on ne clique pas
 * (pas de cookies tiers, page légère). Au clic, le lecteur Instagram remplace la vignette.
 */
export function Reels({ items }: { items: (Img & { id: string })[] }) {
  const { d } = useLocale();
  const [playing, setPlaying] = useState<string | null>(null);
  const labels = d.reels.items as Record<string, { title: string; alt: string }>;

  return (
    <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 md:mx-0 md:grid md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0">
      {items.map((r) => {
        const t = labels[r.id] ?? { title: "Reel", alt: "" };
        return (
          <li key={r.id} className="w-[68vw] max-w-[18rem] shrink-0 snap-start md:w-auto md:max-w-none">
            <div className="card relative aspect-[9/16] bg-navy">
              {playing === r.id ? (
                <iframe src={`https://www.instagram.com/reel/${r.id}/embed/`} title={t.title} className="absolute inset-0 h-full w-full border-0 bg-white" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
              ) : (
                <button type="button" onClick={() => setPlaying(r.id)} className="group absolute inset-0 block h-full w-full text-start" aria-label={fill(d.reels.play, { title: t.title })}>
                  <Image src={r.src} alt={t.alt} width={r.width} height={r.height} sizes="(min-width: 768px) 24vw, 68vw" quality={70} className="h-full w-full object-cover" />
                  <span className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-navy/85 to-transparent" aria-hidden="true" />
                  <span className="absolute start-4 top-4 flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy transition-transform duration-300 group-hover:scale-110">
                    <PlayIcon className="ms-0.5 h-6 w-6" />
                  </span>
                  <span className="display absolute inset-x-4 bottom-4 text-[1.375rem] leading-tight text-white">{t.title}</span>
                </button>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
}
