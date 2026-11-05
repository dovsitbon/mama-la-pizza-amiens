// Affichette A5 imprimable (PDF) avec QR code vers le site, pour le comptoir, la vitrine ou les boîtes à pizza.
//   npm run affichette   →   print/affichette-mama-la-pizza-a5.pdf (+ aperçu PNG)
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import QRCode from "qrcode";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const site = JSON.parse(await readFile(path.join(ROOT, "data/site.json"), "utf8"));
const url = `${site.url}/fr`;

const hex = (h) => rgb(parseInt(h.slice(1, 3), 16) / 255, parseInt(h.slice(3, 5), 16) / 255, parseInt(h.slice(5, 7), 16) / 255);
const PINK = hex("#F7C9D4");
const NAVY = hex("#1B2A3A");
const ROSE = hex("#C42F66");
const WHITE = rgb(1, 1, 1);

const pdf = await PDFDocument.create();
pdf.setTitle("Mama La Pizza : affichette A5");
pdf.setAuthor("Mama La Pizza");
const W = 419.53;
const H = 595.28;
const page = pdf.addPage([W, H]);
const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
const sans = await pdf.embedFont(StandardFonts.Helvetica);
const center = (text, font, size, y, color = NAVY) => page.drawText(text, { x: (W - font.widthOfTextAtSize(text, size)) / 2, y, size, font, color });

page.drawRectangle({ x: 0, y: 0, width: W, height: H, color: PINK });

// Photo de la pizza en bandeau
const photoH = 170;
const photo = await sharp(path.join(ROOT, "assets/hero/pizza-reine-gros-plan.jpg")).resize(1260, Math.round((1260 * photoH) / W), { fit: "cover" }).jpeg({ quality: 88 }).toBuffer();
page.drawImage(await pdf.embedJpg(photo), { x: 0, y: H - photoH, width: W, height: photoH });

// Logo (vrai logo vectorisé, rasterisé car pdf-lib ne lit pas le SVG)
const logoW = 128;
const logoH = (logoW * 967) / 1167;
const logo = await sharp(path.join(ROOT, "public/logo.svg"), { density: 300 }).resize(800).png().toBuffer();
page.drawImage(await pdf.embedPng(logo), { x: (W - logoW) / 2, y: H - photoH - logoH / 2 - 6, width: logoW, height: logoH });

let y = H - photoH - logoH / 2 - 40;
center("Commande en 30 secondes", bold, 22, y);
y -= 19;
center("La carte, les prix, les offres du jour : tout est ici.", sans, 11.5, y);

// QR code dans une carte blanche
const qrS = 118;
y -= 22 + qrS;
page.drawRectangle({ x: (W - qrS) / 2 - 12, y: y - 12, width: qrS + 24, height: qrS + 24, color: WHITE });
const qrPng = await QRCode.toBuffer(url, { margin: 0, width: 600, color: { dark: "#1B2A3A", light: "#FFFFFF" }, errorCorrectionLevel: "M" });
page.drawImage(await pdf.embedPng(qrPng), { x: (W - qrS) / 2, y, width: qrS, height: qrS });
y -= 30;
center(url.replace(/^https?:\/\//, ""), bold, 9.5, y, ROSE);

// Bandeau bleu nuit : les offres
y -= 26;
page.drawRectangle({ x: 26, y: y - 44, width: W - 52, height: 56, color: NAVY });
center("Mardi -20 %  ·  Jeudi -20 % XL et XXL  ·  Étudiants 7,90 €", bold, 10.5, y - 10, WHITE);
center("Une pizza XXL achetée = une offerte  ·  Livraison offerte à Amiens", sans, 9.5, y - 28, WHITE);

// Pied : infos pratiques
y -= 70;
center(`${site.address.street}, ${site.address.postalCode} ${site.address.city}  ·  ${site.phone}`, bold, 10, y);
y -= 15;
center("Midi : lun. – sam., 11 h 30 – 14 h 30  ·  Soir : tous les jours dès 18 h", sans, 9, y);
y -= 13;
center("Jusqu'à minuit, et jusqu'à 1 h du jeudi au samedi  ·  Instagram @mamalapizzamiens", sans, 9, y);

await mkdir(path.join(ROOT, "print"), { recursive: true });
const file = path.join(ROOT, "print/affichette-mama-la-pizza-a5.pdf");
await writeFile(file, await pdf.save());
console.log("affichette prête :", file, url);
