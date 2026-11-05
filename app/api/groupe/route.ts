import { Resend } from "resend";
import { isPhone } from "@/lib/order";
import { mailHtml } from "@/lib/mail";

// Demande de commande de groupe (anniversaire, bureau, soirée) : e-mail au restaurant via Resend.
// Mêmes variables que /api/order. Sans elles : { notified: false }, le site invite à appeler.

const TYPES = ["birthday", "office", "party", "other"];
const LABELS: Record<string, string> = { birthday: "Anniversaire", office: "Bureau / entreprise", party: "Soirée", other: "Autre" };
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try {
    b = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const type = TYPES.includes(str(b.type, 20)) ? str(b.type, 20) : "other";
  const g = { type, people: Math.min(Math.max(Math.round(Number(b.people) || 0), 0), 500), date: str(b.date, 10), name: str(b.name, 120), phone: str(b.phone, 30), message: str(b.message, 1500), lang: str(b.lang, 2) };
  if (!g.name || !isPhone(g.phone)) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false });

  const text = [`Type : ${LABELS[g.type]}`, `Personnes : ${g.people || "?"}`, `Date : ${g.date || "?"}`, `Nom : ${g.name}`, `Téléphone : ${g.phone}`, g.message ? `Message :\n${g.message}` : "", `Langue du client : ${(g.lang || "fr").toUpperCase()}`]
    .filter(Boolean)
    .join("\n\n");
  try {
    const r = await new Resend(key).emails.send({ from: process.env.RESEND_FROM ?? "Mama La Pizza <onboarding@resend.dev>", to, subject: `Commande de groupe · ${g.name} · ${g.date || "date à fixer"}`, html: mailHtml("Nouvelle demande de commande de groupe", text), text });
    return Response.json({ ok: true, notified: !r.error });
  } catch {
    return Response.json({ ok: true, notified: false });
  }
}
