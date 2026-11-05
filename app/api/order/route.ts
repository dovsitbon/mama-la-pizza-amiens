import { Resend } from "resend";
import { orderText, parseOrder } from "@/lib/order";
import { fill, getDict, isLocale, type Locale } from "@/lib/i18n";
import { mailHtml } from "@/lib/mail";

// Commande à emporter. La pizzeria n'a qu'une ligne fixe : la commande part par e-mail (Resend).
//  1. notification au restaurant (en français, avec la langue du client) ;
//  2. récapitulatif au client, dans sa langue, s'il a donné son e-mail.
// Variables Vercel : RESEND_API_KEY, ORDER_NOTIFY_EMAIL (adresse du restaurant), RESEND_FROM (domaine vérifié dans Resend).
// Sans ces variables, la route répond { notified: false } et le site invite le client à appeler pour confirmer.

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }
  const lang: Locale = typeof body.lang === "string" && isLocale(body.lang) ? body.lang : "fr";
  const q = parseOrder(body.order);
  if (!q) return Response.json({ ok: false }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.ORDER_NOTIFY_EMAIL;
  if (!key || !to) return Response.json({ ok: true, notified: false });

  const resend = new Resend(key);
  const from = process.env.RESEND_FROM ?? "Mama La Pizza <onboarding@resend.dev>";
  const fr = getDict("fr");
  const d = getDict(lang);
  const frText = orderText(q, "fr", fr);
  const text = lang === "fr" ? frText : `${frText}\n\n${fr.order.mail.lang} : ${lang.toUpperCase()}`;

  let notified = false;
  try {
    const r = await resend.emails.send({ from, to, replyTo: q.email || undefined, subject: `${fr.order.mail.subject} · ${q.name} · ${q.day} ${q.time}`, html: mailHtml(fr.order.mail.title, text), text });
    notified = !r.error;
  } catch {}

  if (q.email && notified) {
    const m = d.order.mail;
    const msg = `${fill(m.confirmIntro, { name: q.name })}\n\n${orderText(q, lang, d, false)}\n\n${m.confirmOutro}`;
    try {
      await resend.emails.send({ from, to: q.email, replyTo: to, subject: m.confirmSubject, html: mailHtml(m.confirmSubject, msg), text: msg });
    } catch {}
  }
  return Response.json({ ok: true, notified });
}
