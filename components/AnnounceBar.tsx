"use client";

import { useEffect, useState } from "react";
import annonces from "@/data/annonces.json";
import { CloseIcon } from "@/components/icons";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";
import { barOffer } from "@/lib/offers";

type Dated = { id: string; from?: string; to?: string; fr: string; en: string };

/**
 * Bandeau du haut, refermable (mémorisé pour la session) : un message daté de data/annonces.json s'il y en a un,
 * sinon l'offre du jour (mardi, jeudi : data/offres.json → bar), sinon la livraison offerte et l'offre XXL.
 */
export function AnnounceBar() {
  const { lang, d } = useLocale();
  const pick = (today: string) => {
    const dated = (annonces.items as Dated[]).find((a) => (!a.from || a.from <= today) && (!a.to || today <= a.to));
    if (dated) return { id: dated.id, text: dated[lang] };
    const offer = barOffer(today);
    if (offer) return { id: `offre-${offer}`, text: (d.offers.items[offer] as { bar?: string }).bar ?? d.announce.default };
    return { id: "defaut", text: d.announce.default };
  };
  const [item, setItem] = useState(() => pick(isoDay(new Date())));
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const it = pick(isoDay(new Date()));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- date du navigateur, connue seulement après hydratation
    setItem(it);
    try {
      if (sessionStorage.getItem(`mama-bar-${it.id}`) === "1") setClosed(true);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (closed) return null;
  return (
    <div className="relative z-[51] flex min-h-10 items-center justify-center bg-navy px-12 py-2 text-center text-[0.875rem] leading-snug font-bold text-white">
      <a href={`/${lang}#offres`} className="hover:underline" suppressHydrationWarning>
        {item.text}
      </a>
      <button
        type="button"
        onClick={() => {
          setClosed(true);
          try {
            sessionStorage.setItem(`mama-bar-${item.id}`, "1");
          } catch {}
        }}
        className="absolute end-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center opacity-75 transition-opacity hover:opacity-100"
        aria-label={d.announce.close}
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
