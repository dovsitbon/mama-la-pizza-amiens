"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale } from "@/components/providers";
import { OrderLink } from "@/components/OrderLink";
import { CanIcon, PizzaIcon } from "@/components/icons";
import { categories, ITEMS, type CategoryId, type ItemId } from "@/lib/carte";
import { fill } from "@/lib/i18n";
import { price } from "@/lib/format";

export const TAB_EVENT = "mama:tab";

/** Ouvre un onglet de la carte depuis une tuile, puis descend jusqu'à la carte. */
export function openTab(id: CategoryId) {
  window.dispatchEvent(new CustomEvent<CategoryId>(TAB_EVENT, { detail: id }));
  const el = document.getElementById("carte");
  if (!el) return false;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (t: Element, o?: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
  return true;
}

function Row({ id }: { id: ItemId }) {
  const { lang, d } = useLocale();
  const it = ITEMS[id];
  const p = d.products[id];
  const detroit = id.startsWith("d3-") && id !== "d3-sucree";
  return (
    <li className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1 border-b-2 border-dashed border-line py-5 last:border-0">
      <h3 className="display flex flex-wrap items-center gap-2 text-[1.375rem] md:text-[1.5rem]">
        {p.name}
        {detroit && <span className="rounded-full bg-blue px-2.5 py-0.5 font-[family-name:var(--font-body)] text-[0.6875rem] font-black tracking-[0.08em] text-white uppercase">{d.carte.detroit}</span>}
      </h3>
      <p className="display self-start text-[1.375rem] tabular-nums md:text-[1.5rem]">{it.price !== null ? price(it.price, lang) : ""}</p>
      <div className="col-span-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="leading-relaxed text-muted">{p.desc}</p>
          {it.tags.length > 0 && (
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {it.tags.map((t) => (
                <li key={t} className={`tag tag-${t}`}>
                  {d.tags[t]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <OrderLink href={`/${lang}#commander`} intent={{ item: id }} label={fill(d.carte.addLabel, { name: p.name })} className="btn-line !min-h-10 shrink-0 self-start !px-4 !text-[0.9375rem] sm:self-auto">
          {d.carte.add}
        </OrderLink>
      </div>
    </li>
  );
}

const ASIDE: Record<CategoryId, string> = {
  tomate: "bg-tomato text-white",
  creme: "bg-cream-deep text-navy",
  speciales: "bg-blue text-white",
  cote: "bg-gold text-navy",
  desserts: "bg-pink text-navy",
  boissons: "bg-tile text-navy",
};

/**
 * La carte, en une seule page avec onglets (base tomate, base crème, spéciales & Détroit, à côté, desserts, boissons).
 * Prix en HTML. `photos` : une photo par onglet (rendue côté serveur), sinon un aplat de couleur avec un picto.
 */
export function MenuTabs({ photos = {}, initial = "tomate" }: { photos?: Partial<Record<CategoryId, ReactNode>>; initial?: CategoryId }) {
  const { d } = useLocale();
  const cats = categories();
  const [tab, setTab] = useState<CategoryId>(initial);
  const reduce = useReducedMotion();
  const uid = useId();
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const on = (e: Event) => setTab((e as CustomEvent<CategoryId>).detail);
    window.addEventListener(TAB_EVENT, on);
    return () => window.removeEventListener(TAB_EVENT, on);
  }, []);

  const current = cats.find((c) => c.id === tab) ?? cats[0];

  const onKey = (e: KeyboardEvent, i: number) => {
    const n = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!n) return;
    e.preventDefault();
    const j = (i + n + cats.length) % cats.length;
    setTab(cats[j].id);
    refs.current[j]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label={d.carte.tabsLabel} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {cats.map((c, i) => (
          <button
            key={c.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${uid}-tab-${c.id}`}
            aria-selected={tab === c.id}
            aria-controls={`${uid}-panel`}
            tabIndex={tab === c.id ? 0 : -1}
            onClick={() => setTab(c.id)}
            onKeyDown={(e) => onKey(e, i)}
            className="chip relative shrink-0 font-[family-name:var(--font-display)] !text-[1.0625rem] !font-semibold whitespace-nowrap text-navy aria-selected:text-white"
          >
            {tab === c.id && <motion.span layoutId={`${uid}-pill`} className="absolute inset-0 rounded-full bg-navy" transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 500, damping: 38 }} />}
            {tab !== c.id && <span className="absolute inset-0 rounded-full ring-2 ring-navy/15 ring-inset" aria-hidden="true" />}
            <span className="relative">{d.carte.tabs[c.id]}</span>
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${uid}-panel`} aria-labelledby={`${uid}-tab-${current.id}`} className="mt-6 md:mt-8">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={current.id} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? undefined : { opacity: 0, y: -6 }} transition={{ duration: 0.16 }} className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:gap-12">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className={`card ${ASIDE[current.id]}`}>
                {photos[current.id] ?? (
                  <div className="flex aspect-[16/9] items-center justify-center lg:aspect-[4/3]">
                    {current.id === "boissons" ? <CanIcon className="h-24 w-24 rotate-[8deg]" /> : <PizzaIcon className="h-24 w-24 rotate-[-10deg]" />}
                  </div>
                )}
                <div className="p-6 md:p-7">
                  <p className="display text-[1.75rem] md:text-[2rem]">{d.carte.tabs[current.id]}</p>
                  <p className="mt-2 text-[1.0625rem] leading-relaxed opacity-90">{d.carte.tabIntro[current.id]}</p>
                  {current.items.some((id) => ITEMS[id].pizza) && <p className="mt-3 font-bold">{d.carte.sizes}</p>}
                </div>
              </div>
            </div>
            <ul>
              {current.items.map((id) => (
                <Row key={id} id={id} />
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mt-6 text-[0.9375rem] text-muted">{d.carte.allergens}</p>
    </div>
  );
}
