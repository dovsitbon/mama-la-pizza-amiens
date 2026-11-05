import site from "@/data/site.json";
import type { Dict } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";
import { formatDay, formatTime, isoDay, price } from "@/lib/format";
import { isItem, ITEMS, SIZES, type ItemId, type Size } from "@/lib/carte";
import { addDays, pickupTimes } from "@/lib/hours";

export type OrderLine = { item: ItemId; qty: number; size: Size | "" };
export type Order = { lines: OrderLine[]; day: string; time: string; name: string; phone: string; email: string; message: string };

export const emptyLine = (item: ItemId = "marguerite"): OrderLine => ({ item, qty: 1, size: ITEMS[item].pizza ? "L" : "" });

export const isPhone = (v: string) => /^[+\d][\d\s\-().]{7,19}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

/** Services proposés pour le retrait : celui en cours (même après minuit) puis les suivants qui ont encore un créneau. */
export function pickupDays(now: Date) {
  const today = isoDay(now);
  return Array.from({ length: site.order.daysAhead + 2 }, (_, i) => addDays(today, i - 1)).filter((day) => pickupTimes(day, now).length > 0);
}

const ISO = /^\d{4}-\d{2}-\d{2}$/;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** Nettoie une commande reçue côté serveur : null si elle est incomplète ou hors des heures d'ouverture. */
export function parseOrder(v: unknown, now = new Date()): Order | null {
  if (!v || typeof v !== "object") return null;
  const o = v as Record<string, unknown>;
  const lines = (Array.isArray(o.lines) ? o.lines : []).slice(0, 30).flatMap((l): OrderLine[] => {
    if (!l || typeof l !== "object") return [];
    const x = l as Record<string, unknown>;
    if (!isItem(x.item)) return [];
    const qty = Math.min(Math.max(Math.round(Number(x.qty) || 1), 1), site.order.maxPerLine);
    const size = ITEMS[x.item].pizza ? (SIZES.includes(x.size as Size) ? (x.size as Size) : "L") : "";
    return [{ item: x.item, qty, size }];
  });
  const day = ISO.test(str(o.day, 10)) ? str(o.day, 10) : "";
  const time = str(o.time, 5);
  const q: Order = { lines, day, time, name: str(o.name, 120), phone: str(o.phone, 30), email: str(o.email, 160), message: str(o.message, 1000) };
  // Marge de 10 minutes : le client a pu choisir son heure juste avant qu'elle ne sorte de la liste
  const graceNow = new Date(now.getTime() - 10 * 60_000);
  if (!q.lines.length || !day || !pickupTimes(day, graceNow).includes(time) || !q.name || !isPhone(q.phone)) return null;
  if (q.email && !isEmail(q.email)) q.email = "";
  return q;
}

/** Total indicatif, au prix de la carte (la taille et les offres du jour sont réglées au téléphone). */
export function orderTotal(lines: OrderLine[]) {
  return lines.reduce((sum, l) => sum + (ITEMS[l.item].price ?? 0) * l.qty, 0);
}

/** Une ligne en clair : « 2 × La Reine (XL) ». */
export const lineLabel = (l: OrderLine, d: Dict) => `${l.qty} × ${d.products[l.item].name}${l.size ? ` (${l.size})` : ""}`;

/** Récapitulatif texte de la commande (e-mail). */
export function orderText(q: Order, lang: Locale, d: Dict, withContact = true) {
  const m = d.order.mail;
  const c = lang === "fr" ? " :" : ":";
  const blocks = [
    [`${m.lines}${c}`, ...q.lines.map((l) => `– ${lineLabel(l, d)}`)].join("\n"),
    `${m.pickup}${c} ${formatDay(q.day, lang, { weekday: "long", day: "numeric", month: "long" })}, ${formatTime(q.time, lang)}`,
    `${m.total}${c} ${price(orderTotal(q.lines), lang)}`,
    withContact ? [`${m.name}${c} ${q.name}`, `${m.phone}${c} ${q.phone}`, q.email ? `${m.email}${c} ${q.email}` : ""].filter(Boolean).join("\n") : "",
    q.message ? `${m.message}${c}\n${q.message}` : "",
  ];
  return blocks.filter(Boolean).join("\n\n");
}
