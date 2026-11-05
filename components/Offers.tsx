"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/providers";
import { isoDay } from "@/lib/format";
import { weekday } from "@/lib/hours";
import { OFFERS, type Offer } from "@/lib/offers";

const COLORS: Record<Offer["color"], { card: string; badge: string }> = {
  pink: { card: "bg-pink text-navy", badge: "text-rose-ink" },
  navy: { card: "bg-navy text-white", badge: "text-pink" },
  blue: { card: "bg-blue text-white", badge: "text-white" },
  cream: { card: "bg-cream-deep text-navy", badge: "text-tomato" },
  tomato: { card: "bg-tomato text-white", badge: "text-white" },
};

/** Les offres (data/offres.json), celle du jour signalée. */
export function Offers() {
  const { d } = useLocale();
  const [day, setDay] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- jour du navigateur, connu seulement après hydratation
    setDay(weekday(isoDay(new Date())));
  }, []);

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
      {OFFERS.map((o, i) => {
        const t = d.offers.items[o.id];
        const c = COLORS[o.color];
        const today = day !== null && o.days.length < 7 && o.days.length <= 2 && o.days.includes(day);
        return (
          <li key={o.id} className={`card relative flex flex-col p-6 ${c.card} ${i === 0 ? "sm:col-span-2 lg:col-span-1" : ""}`}>
            {today && <span className="absolute end-4 top-4 rounded-full bg-white px-3 py-1 text-[0.75rem] font-black tracking-[0.06em] text-navy uppercase">{d.offers.today}</span>}
            <p className="font-bold opacity-90">{t.title}</p>
            <p className={`display mt-3 text-[3.2rem] leading-none ${c.badge}`}>{o.badge}</p>
            <p className="mt-4 flex-1 text-[1.0625rem] leading-snug font-semibold">{t.text}</p>
            <ul className="mt-5 flex flex-wrap gap-1.5 text-[0.8125rem] font-bold">
              {o.lunchOnly && <li className="rounded-full bg-current/10 px-2.5 py-1">{d.offers.lunch}</li>}
              {o.modes.map((m) => (
                <li key={m} className="rounded-full bg-current/10 px-2.5 py-1">
                  {d.offers.modes[m]}
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ul>
  );
}
