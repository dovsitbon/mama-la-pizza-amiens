import carte from "@/data/carte.json";

export type Tag = "vegetarian" | "spicy";
export type Item = { price: number | null; tags: Tag[]; photo: string[]; pizza: boolean };
export type ItemId = keyof typeof carte.items;
export type CategoryId = "tomate" | "creme" | "speciales" | "cote" | "desserts" | "boissons";

export const ITEMS = carte.items as unknown as Record<ItemId, Item>;
export const ITEM_IDS = Object.keys(ITEMS) as ItemId[];
export const isItem = (v: unknown): v is ItemId => typeof v === "string" && v in ITEMS;

/** Onglets de la carte, dans l'ordre de data/carte.json. */
export const categories = () => carte.categories as { id: CategoryId; items: ItemId[] }[];

export const SIZES = ["S", "L", "XL", "XXL"] as const;
export type Size = (typeof SIZES)[number];

export const checked = carte.checked;
