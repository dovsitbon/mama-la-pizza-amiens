import hours from "@/data/horaires.json";
import { isoDay } from "@/lib/format";

/** Créneau « HH:MM » → « HH:MM ». Une fin plus tôt que le début veut dire « après minuit » (ex. 18:00 → 01:00). */
export type Slot = [string, string];
type Week = Record<string, Slot[]>;
type Exception = { date: string; closed?: boolean; slots?: Slot[] };

const week = hours.week as unknown as Week;
const exceptions = hours.exceptions as Exception[];

export const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};
const toHHMM = (n: number) => `${String(Math.floor(n / 60) % 24).padStart(2, "0")}:${String(n % 60).padStart(2, "0")}`;
/** Fin d'un créneau en minutes depuis le début de SA journée (peut dépasser 24 h). */
export const endMin = ([a, b]: Slot) => (toMin(b) <= toMin(a) ? toMin(b) + 1440 : toMin(b));
export const overnight = (s: Slot) => endMin(s) > 1440 || toMin(s[1]) === 0;

/** Jour ISO (1 = lundi … 7 = dimanche) d'une date AAAA-MM-JJ. */
export const weekday = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return ((new Date(Date.UTC(y, m - 1, d)).getUTCDay() + 6) % 7) + 1;
};

export const addDays = (iso: string, n: number) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10);
};

/** Créneaux d'ouverture d'un jour donné (fermetures exceptionnelles comprises). */
export function slotsOn(iso: string): Slot[] {
  const ex = exceptions.find((e) => e.date === iso);
  if (ex) return ex.closed ? [] : (ex.slots ?? []);
  return week[String(weekday(iso))] ?? [];
}

/** Heure de Paris en minutes depuis minuit. */
export const parisMinutes = (date: Date) => {
  const t = new Intl.DateTimeFormat("fr-FR", { timeZone: "Europe/Paris", hour: "2-digit", minute: "2-digit", hour12: false }).format(date);
  return toMin(t.replace(/^24/, "00"));
};

export type Status = { open: true; until: string; late: boolean } | { open: false; nextDay: string | null; at: string | null; until: string | null };

/** Ouvert / fermé en ce moment (créneaux qui passent minuit compris), et prochaine ouverture. */
export function statusAt(date: Date): Status {
  const today = isoDay(date);
  const now = parisMinutes(date);
  // Service de la veille qui déborde après minuit (ex. vendredi 18 h → samedi 1 h)
  for (const s of slotsOn(addDays(today, -1))) if (endMin(s) > 1440 && now < endMin(s) - 1440) return { open: true, until: s[1], late: true };
  for (const s of slotsOn(today)) if (now >= toMin(s[0]) && now < endMin(s)) return { open: true, until: s[1], late: overnight(s) };
  const later = slotsOn(today).find(([a]) => toMin(a) > now);
  if (later) return { open: false, nextDay: today, at: later[0], until: later[1] };
  for (let i = 1; i <= 14; i++) {
    const day = addDays(today, i);
    const s = slotsOn(day);
    if (s.length) return { open: false, nextDay: day, at: s[0][0], until: s[0][1] };
  }
  return { open: false, nextDay: null, at: null, until: null };
}

/** Horaires de la semaine, du lundi au dimanche, pour l'affichage et le schema.org. */
export const weekHours = () => [1, 2, 3, 4, 5, 6, 7].map((n) => week[String(n)] ?? []);

/**
 * Heures de retrait possibles pour un service donné (jour du service) : toutes les 15 min,
 * jusqu'à 15 min avant la fermeture (après minuit compris), pas avant « maintenant + 20 min » le jour même.
 */
export function pickupTimes(day: string, now: Date, step = 15, ahead = 20): string[] {
  const today = isoDay(now);
  if (day < addDays(today, -1)) return [];
  const nowMin = parisMinutes(now);
  // Minutes écoulées depuis le début du jour « day »
  const elapsed = day === today ? nowMin : day === addDays(today, -1) ? nowMin + 1440 : day < today ? Infinity : -Infinity;
  const earliest = elapsed + ahead;
  return slotsOn(day).flatMap((s) => {
    const out: string[] = [];
    for (let t = toMin(s[0]); t <= endMin(s) - step; t += step) if (t >= earliest) out.push(toHHMM(t));
    return out;
  });
}
