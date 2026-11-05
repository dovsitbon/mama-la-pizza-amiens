// Vectorise le vrai logo de Mama La Pizza (photo de profil Instagram : l'ours qui tient sa pizza,
// « MAMA! LA PIZZA! » en lettres blanches cernées de bleu nuit, sur fond rose à motifs).
//   public/logo.svg            logo complet en couleurs (ours + lettrage), pour l'en-tête et le pied de page
//   public/logo-mono.svg       même logo, une seule couleur (masque CSS, impression)
//   public/logo-ours.svg       la tête de l'ours seule (favicon, petits formats)
//   app/icon.png, app/apple-icon.png
//   npm run logo
// Méthode : chaque pixel est classé (fond rose / bleu nuit / ours / blanc), chaque couleur est tracée par potrace
// puis empilée : silhouette blanche, ours, traits bleu nuit. Quand elle fournira son fichier d'origine, remplacez ces SVG.
import { writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import potrace from "potrace";

const ROOT = path.resolve(import.meta.dirname, "..");
const SRC = path.join(ROOT, "assets/raw/mama-la-pizza_logo.jpg");
const SCALE = 1.5;

const NAVY = "#1B2A3A";
const TAN = "#F2BE80";
const WHITE = "#FFFFFF";

const { data, info } = await sharp(SRC).raw().toBuffer({ resolveWithObject: true });
const W = info.width;
const H = info.height;

const isNavy = (r, g, b) => r + g + b < 300;
const isPink = (r, g, b) => r > 200 && r - g > 22 && b >= g - 6 && !(r > 245 && g > 240);
const isTan = (r, g, b) => !isNavy(r, g, b) && !isPink(r, g, b) && r > 150 && g - b > 28;

function mask(test) {
  const out = Buffer.alloc(W * H);
  for (let i = 0; i < W * H; i++) out[i] = test(data[i * 3], data[i * 3 + 1], data[i * 3 + 2]) ? 0 : 255;
  return out;
}

// Silhouette : tout ce qui n'est pas le fond rose ; on bouche les petits trous (motif du fond) par un flou + seuil
const silhouette = mask((r, g, b) => !isPink(r, g, b));
const navy = mask(isNavy);
const tan = mask(isTan);

const toPng = (buf, blur = 0) => {
  let s = sharp(buf, { raw: { width: W, height: H, channels: 1 } });
  if (blur) s = s.blur(blur).threshold(128);
  return s.resize({ width: W * SCALE }).threshold(128).png().toBuffer();
};

const trace = (buf, turdSize = 60) =>
  new Promise((ok, ko) => potrace.trace(buf, { threshold: 128, turdSize, optTolerance: 0.8 }, (e, s) => (e ? ko(e) : ok(s.match(/ d="([^"]+)"/)[1].replace(/(\d+)\.\d+/g, "$1")))));

async function bbox(buf) {
  const { data: px, info: i } = await sharp(buf).raw().toBuffer({ resolveWithObject: true });
  let minX = i.width, minY = i.height, maxX = 0, maxY = 0;
  for (let y = 0; y < i.height; y++)
    for (let x = 0; x < i.width; x++)
      if (px[(y * i.width + x) * i.channels] < 128) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
  return [minX, minY, maxX, maxY];
}

const silPng = await toPng(silhouette, 2);
const [x0, y0, x1, y1] = await bbox(silPng);
const pad = 12;
const vb = `${x0 - pad} ${y0 - pad} ${x1 - x0 + pad * 2} ${y1 - y0 + pad * 2}`;

const dSil = await trace(silPng, 400);
const dTan = await trace(await toPng(tan, 1), 80);
const dNavy = await trace(await toPng(navy), 30);

const label = "Mama La Pizza";
const color = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${label}">
<path fill="${WHITE}" d="${dSil}"/>
<path fill="${TAN}" d="${dTan}"/>
<path fill="${NAVY}" fill-rule="evenodd" d="${dNavy}"/>
</svg>
`;
await writeFile(path.join(ROOT, "public/logo.svg"), color);
await writeFile(path.join(ROOT, "public/logo-mono.svg"), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" role="img" aria-label="${label}"><path fill="${NAVY}" fill-rule="evenodd" d="${dNavy}"/></svg>\n`);

// Tête de l'ours : partie haute du logo (au-dessus du lettrage)
const bearCut = Math.round(y0 + (y1 - y0) * 0.47);
const bearVb = `${x0 + (x1 - x0) * 0.22} ${y0 - pad} ${(x1 - x0) * 0.56} ${bearCut - y0 + pad}`;
await writeFile(
  path.join(ROOT, "public/logo-ours.svg"),
  color.replace(`viewBox="${vb}"`, `viewBox="${bearVb}"`),
);

console.log("viewBox", vb, "ours", bearVb, "taille", (color.length / 1024).toFixed(0), "Ko");

for (const [file, size] of [
  ["app/icon.png", 96],
  ["app/apple-icon.png", 180],
]) {
  const m = Math.round(size / 10);
  const inner = await sharp(path.join(ROOT, "public/logo.svg"), { density: 200 }).resize(size - m * 2, size - m * 2, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: "#F7C9D4" } }).composite([{ input: inner, left: m, top: m }]).png().toFile(path.join(ROOT, file));
}
