// Photos du site.
//   npm run media
//
// 1. Trie les visuels Instagram utilisables (assets/raw/) dans assets/<catégorie>/ avec des noms lisibles,
//    en coupant les légendes incrustées des reels (sans écraser un fichier déjà présent : vos photos restent prioritaires).
// 2. Prépare pour le web toutes les photos de assets/hero, pizzas, restaurant, reels et galerie dans public/media/<catégorie>/
//    (next/image sert ensuite AVIF/WebP à la bonne taille) et note leurs dimensions dans data/media-sizes.json.
//
// Écartées volontairement : les affiches d'offres (01, 02, 03, 20, 22, 35, 38 : trop de texte, leurs infos sont reprises
// en HTML dans data/offres.json et data/horaires.json) et les reels où personne ne mange de pizza.
import { copyFile, mkdir, readdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const CATS = ["hero", "pizzas", "restaurant", "reels", "galerie"];
const exists = (f) => access(f).then(() => true, () => false);
const raw = (id) => `mama-la-pizza_${id}`;

// [source dans assets/raw, catégorie, nom, recadrage éventuel]
const PICKS = [
  [raw("44_Dbc9ilgMAnv.jpg"), "hero", "pizza-reine-gros-plan", { left: 0, top: 1560, width: 3780, height: 2380 }],
  [raw("14_DeO2WJNOkyQ_video-cover.jpg"), "pizzas", "pizza-poivrons-assiette", { left: 0, top: 760, width: 720, height: 520 }],
  [raw("19_Dd0zeZ5O3q__video-cover.jpg"), "pizzas", "pizza-chorizo-service", { left: 0, top: 1280, width: 1320, height: 1067 }],
  [raw("36_DcvdU2ioJ8c_video-cover.jpg"), "pizzas", "part-de-pizza-tard", { left: 0, top: 600, width: 640, height: 536 }],
  [raw("18_Dd4d_hxOe0U.jpg"), "restaurant", "salle-pizzas-a-partager"],
  [raw("08_DelvotFOJyO_video-cover.jpg"), "restaurant", "salle-neon-rose", { left: 0, top: 0, width: 720, height: 820 }],
  [raw("07_DfHQs3DOddw_video-cover.jpg"), "restaurant", "facade-rue-des-otages", { left: 0, top: 120, width: 1320, height: 860 }],
  [raw("21_Ddvtm8EutRL_video-cover.jpg"), "restaurant", "pate-maison-petrin", { left: 0, top: 640, width: 1320, height: 1707 }],
  [raw("34_DcyxEvMOPgR_video-cover.jpg"), "restaurant", "four-a-pizza", { left: 0, top: 560, width: 720, height: 720 }],
  [raw("39_Dcq6Mb_sOeR_video-cover.jpg"), "galerie", "pizza-en-salle", { left: 0, top: 650, width: 720, height: 630 }],
  // Vignettes de reels (la vidéo Instagram ne se charge qu'au clic)
  [raw("40_DcoTT_YMg2V_video-cover.jpg"), "reels", "DcoTT_YMg2V"],
  [raw("36_DcvdU2ioJ8c_video-cover.jpg"), "reels", "DcvdU2ioJ8c"],
  [raw("25_DdO8WLEMc9L_video-cover.jpg"), "reels", "DdO8WLEMc9L"],
  [raw("45_DbQzveFM-rT_video-cover.jpg"), "reels", "DbQzveFM-rT"],
];

for (const [file, cat, name, crop] of PICKS) {
  const out = path.join(ROOT, "assets", cat, `${name}.jpg`);
  await mkdir(path.dirname(out), { recursive: true });
  if (await exists(out)) continue;
  const src = path.join(ROOT, "assets/raw", file);
  if (crop) await sharp(src).extract(crop).jpeg({ quality: 94 }).toFile(out);
  else await copyFile(src, out);
}

const sizes = {};
for (const cat of CATS) {
  const dir = path.join(ROOT, "assets", cat);
  await mkdir(dir, { recursive: true });
  await mkdir(path.join(ROOT, "public/media", cat), { recursive: true });
  for (const f of (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))) {
    const name = f.replace(/\.\w+$/, "");
    const max = cat === "hero" ? 2400 : cat === "reels" ? 720 : 1600;
    const info = await sharp(path.join(dir, f))
      .rotate()
      .resize({ width: max, height: max, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 84, mozjpeg: true })
      .toFile(path.join(ROOT, "public/media", cat, `${name}.jpg`));
    sizes[`/media/${cat}/${name}.jpg`] = [info.width, info.height];
  }
}

// Image de partage (Open Graph) 1200 × 630 : la pizza à droite, le logo et la promesse sur fond rose à gauche
const photo = await sharp(path.join(ROOT, "assets/hero/pizza-reine-gros-plan.jpg")).resize(600, 630, { fit: "cover" }).toBuffer();
const logo = await sharp(path.join(ROOT, "public/logo.svg"), { density: 200 }).resize({ width: 300 }).png().toBuffer();
const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="600" height="630">
  <text x="60" y="370" font-family="Arial, sans-serif" font-weight="700" font-size="44" fill="#1B2A3A">La pizza qui régale Amiens</text>
  <text x="60" y="420" font-family="Arial, sans-serif" font-size="28" fill="#1B2A3A">Pâte maison · Livraison offerte</text>
  <text x="60" y="460" font-family="Arial, sans-serif" font-size="28" fill="#1B2A3A">Ouvert jusqu'à 1 h du jeudi au samedi</text>
  <text x="60" y="520" font-family="Arial, sans-serif" font-weight="700" font-size="26" fill="#B4234F">15 rue des Otages · 03 22 40 33 94</text>
</svg>`);
await sharp({ create: { width: 1200, height: 630, channels: 3, background: "#F7C9D4" } })
  .composite([
    { input: photo, left: 600, top: 0 },
    { input: logo, left: 60, top: 50 },
    { input: text, left: 0, top: 0 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(ROOT, "public/og.jpg"));

await writeFile(path.join(ROOT, "data/media-sizes.json"), JSON.stringify(sizes, null, 1) + "\n");
console.log(`${Object.keys(sizes).length} photos prêtes`);
