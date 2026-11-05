// Génère CONTENU.md : tous les textes du site en français et en anglais, la carte et les offres, pour validation par Mama La Pizza.
//   npm run contenu
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (f) => JSON.parse(await readFile(path.join(ROOT, f), "utf8"));
const fr = await read("locales/fr.json");
const en = await read("locales/en.json");
const carte = await read("data/carte.json");
const site = await read("data/site.json");
const horaires = await read("data/horaires.json");
const offres = await read("data/offres.json");

const euro = (n) => (n === null ? "**à confirmer**" : `${n.toFixed(2).replace(".", ",")} €`);
const SKIP = new Set(["alt", "products", "pages", "meta", "carte", "tags", "offers"]);
const out = [];
const p = (s = "") => out.push(s);

p("# Mama La Pizza : contenu du site (à valider)");
p();
p("Généré depuis `locales/fr.json`, `locales/en.json` et `data/*.json`. Pour modifier un texte, modifiez ces fichiers puis relancez `npm run contenu`.");
p();
p("## À faire valider en priorité");
p();
p("- **Le tutoiement** : le site tutoie, comme ses reels. À garder ?");
p("- **Les prix** : relevés sur sa page Uber Eats le 5 novembre 2026. Les prix des plateformes sont souvent plus élevés qu'au comptoir, et une seule taille y est affichée : il faut ses prix boutique en S, L, XL et XXL.");
p("- **Les horaires** : ceux de Google sont affichés. Son affiche Instagram « Nos horaires » dit autre chose pour le vendredi et le dimanche (17 h – 1 h). Laquelle est la bonne ?");
p("- **Les offres** (affiches Instagram) : mardi −20 % (toutes les pizzas, sur place et livraison), jeudi −20 % (XL et XXL), menu étudiant 7,90 € le midi, pause déj' 10,90 €, XXL achetée = XXL offerte. Conditions, cumul, justificatif étudiant, jours exacts du menu étudiant ?");
p("- **La livraison offerte** : zone exacte, minimum de commande, délai moyen, et si c'est seulement par téléphone.");
p("- **Halal** : sa page Uber Eats l'indique. Si c'est vrai, c'est un argument fort à ajouter sur le site.");
p("- **Pastilles** « végétarienne » et « piquante » : posées d'après les ingrédients, à vérifier.");
p(`- **La note Google** affichée : ${String(site.rating.value).replace(".", ",")}/5 sur ${site.rating.count} avis, relevée le ${site.rating.checked}.`);
p();

p("## Référencement (balises title / description)");
p();
for (const [lang, d] of [["FR", fr], ["EN", en]]) {
  p(`**${lang}** · ${d.meta.title}`);
  p();
  p(`> ${d.meta.description}`);
  p();
}

p("## Horaires (data/horaires.json)");
p();
const days = fr.infos.days;
for (let i = 1; i <= 7; i++) {
  const s = horaires.week[String(i)];
  p(`- ${days[i - 1]} : ${s.length ? s.map(([a, b]) => `${a} – ${b}`).join(", ") : "fermé"}`);
}
p();

p("## Les offres (data/offres.json)");
p();
p("| Offre | Montant | Texte FR | Texte EN | Où |");
p("|---|---|---|---|---|");
for (const o of offres.items) {
  const f = fr.offers.items[o.id];
  const e = en.offers.items[o.id];
  p(`| ${f.title} | ${o.badge} | ${f.text} | ${e.text} | ${o.modes.map((m) => fr.offers.modes[m]).join(", ")}${o.lunchOnly ? ", le midi" : ""} |`);
}
p();

p("## La carte et les prix (data/carte.json)");
p();
p(`Relevés sur ${carte.source} le ${carte.checked}.`);
p();
for (const c of carte.categories) {
  p(`### ${fr.carte.tabs[c.id]} / ${en.carte.tabs[c.id]}`);
  p();
  p("| Article | Prix | Ingrédients (FR) | Ingredients (EN) | Pastilles |");
  p("|---|---|---|---|---|");
  for (const id of c.items) {
    const it = carte.items[id];
    p(`| ${fr.products[id].name} | ${euro(it.price)} | ${fr.products[id].desc} | ${en.products[id].desc} | ${it.tags.map((t) => fr.tags[t]).join(", ")} |`);
  }
  p();
}

p("## Tous les textes du site");
p();
const walk = (a, b, key) => {
  if (typeof a === "string") {
    p(`- **${key}**`);
    p(`  - FR : ${a}`);
    p(`  - EN : ${b ?? "**manquant**"}`);
    return;
  }
  if (Array.isArray(a)) return a.forEach((x, i) => walk(x, b?.[i], `${key}[${i + 1}]`));
  for (const k of Object.keys(a)) walk(a[k], b?.[k], key ? `${key}.${k}` : k);
};
for (const k of Object.keys(fr).filter((k) => !SKIP.has(k))) {
  p(`### ${k}`);
  p();
  walk(fr[k], en[k], "");
  p();
}
for (const k of ["carte", "offers", "pages"]) {
  p(`### ${k}`);
  p();
  walk(fr[k], en[k], "");
  p();
}
p("### Textes alternatifs des photos");
p();
for (const k of Object.keys(fr.alt)) p(`- \`${k}\` : ${fr.alt[k]} / ${en.alt[k]}`);
p();

await writeFile(path.join(ROOT, "CONTENU.md"), out.join("\n"));
console.log("CONTENU.md :", out.length, "lignes");
