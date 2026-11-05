import offres from "@/data/offres.json";
import { weekday } from "@/lib/hours";

export type OfferId = "mardi" | "jeudi" | "etudiant" | "midi" | "xxl";
export type Mode = "onsite" | "takeaway" | "delivery";
export type Offer = { id: OfferId; days: number[]; badge: string; modes: Mode[]; color: "pink" | "navy" | "blue" | "cream" | "tomato"; lunchOnly?: boolean };

export const OFFERS = offres.items as Offer[];

/** Offre mise en avant dans le bandeau un jour donné (data/offres.json → bar), ou null. */
export function barOffer(iso: string): OfferId | null {
  return ((offres.bar as Record<string, string>)[String(weekday(iso))] as OfferId) ?? null;
}
