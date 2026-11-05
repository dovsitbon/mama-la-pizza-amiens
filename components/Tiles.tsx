"use client";

import type { ReactNode } from "react";
import { useLocale } from "@/components/providers";
import { openTab } from "@/components/MenuTabs";
import { CanIcon, PizzaIcon } from "@/components/icons";
import type { CategoryId } from "@/lib/carte";

type Tile = { id: keyof ReturnType<typeof useLocale>["d"]["tiles"]["items"]; tab?: CategoryId; photo?: ReactNode; bg: string; art?: ReactNode };

/**
 * Tuiles de catégories juste après le hero : nom en capitales sur photo (pizzas), ou sur aplat de couleur
 * avec un picto (desserts, boissons) ; « Menus » renvoie vers les offres.
 */
export function Tiles({ photos }: { photos: Partial<Record<"tomate" | "creme" | "speciales", ReactNode>> }) {
  const { lang, d } = useLocale();
  const tiles: Tile[] = [
    { id: "tomate", tab: "tomate", photo: photos.tomate, bg: "bg-tomato" },
    { id: "creme", tab: "creme", photo: photos.creme, bg: "bg-cream-deep" },
    { id: "speciales", tab: "speciales", photo: photos.speciales, bg: "bg-blue" },
    { id: "desserts", tab: "desserts", bg: "bg-pink", art: <PizzaIcon className="h-16 w-16 rotate-[-12deg] text-navy md:h-20 md:w-20" /> },
    { id: "boissons", tab: "boissons", bg: "bg-tile", art: <CanIcon className="h-16 w-16 rotate-[10deg] text-blue md:h-20 md:w-20" /> },
    {
      id: "menus",
      bg: "bg-navy",
      art: (
        <span className="display text-center text-[2.6rem] leading-none text-pink md:text-[3rem]">
          7,90<span className="text-[1.4rem]">€</span>
        </span>
      ),
    },
  ];
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4">
      {tiles.map((t) => (
        <li key={t.id}>
          <a
            href={t.tab ? `/${lang}#carte` : `/${lang}#offres`}
            onClick={(e) => {
              if (t.tab && openTab(t.tab)) e.preventDefault();
            }}
            className={`group card relative flex aspect-[4/3] items-center justify-center md:aspect-[3/4] ${t.bg}`}
          >
            {t.photo ? <div className="absolute inset-0">{t.photo}</div> : <div className="-translate-y-4 transition-transform duration-300 group-hover:-translate-y-6 group-hover:rotate-[-4deg]">{t.art}</div>}
            <span className="absolute inset-x-2.5 bottom-2.5 flex min-h-9 items-center justify-center rounded-full bg-white px-3 text-center font-[family-name:var(--font-display)] text-[0.8125rem] md:inset-x-3 md:bottom-3 md:min-h-11 md:text-[0.9375rem] font-semibold tracking-[0.06em] text-navy uppercase">
              {d.tiles.items[t.id]}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
