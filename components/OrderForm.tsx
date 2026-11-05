"use client";

import { useEffect, useId, useMemo, useState, type FormEvent } from "react";
import site from "@/data/site.json";
import { useLocale } from "@/components/providers";
import { ORDER_EVENT, type OrderIntent } from "@/components/OrderLink";
import { CheckIcon, MinusIcon, PlusIcon } from "@/components/icons";
import { categories, ITEMS, SIZES, type ItemId, type Size } from "@/lib/carte";
import { fill } from "@/lib/i18n";
import { formatDay, formatTime, isoDay, price } from "@/lib/format";
import { addDays, pickupTimes } from "@/lib/hours";
import { emptyLine, isEmail, isPhone, orderTotal, pickupDays, type OrderLine } from "@/lib/order";

type Errors = Partial<Record<"lines" | "time" | "name" | "phone" | "send", string>>;

/** Commande à emporter : articles + taille + quantité, jour et heure de retrait, prénom et téléphone. Envoi par e-mail (Resend). */
export function OrderForm() {
  const { lang, d } = useLocale();
  const f = d.order.fields;
  const uid = useId();
  const [lines, setLines] = useState<OrderLine[]>([emptyLine()]);
  const [now, setNow] = useState<Date | null>(null);
  const [day, setDay] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<{ notified: boolean; name: string; phone: string } | null>(null);

  // Heure du navigateur : connue seulement après hydratation ; rafraîchie chaque minute
  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  // « Je commande » depuis la carte (même page, ou une autre page via sessionStorage)
  useEffect(() => {
    const add = (intent: OrderIntent) =>
      setLines((ls) => {
        const same = ls.findIndex((l) => l.item === intent.item);
        if (same >= 0) return ls.map((l, i) => (i === same ? { ...l, qty: Math.min(l.qty + 1, site.order.maxPerLine) } : l));
        // Remplace la ligne par défaut tant que le client n'y a pas touché
        if (ls.length === 1 && ls[0].item === "marguerite" && ls[0].qty === 1) return [emptyLine(intent.item)];
        return [...ls, emptyLine(intent.item)];
      });
    const on = (e: Event) => add((e as CustomEvent<OrderIntent>).detail);
    window.addEventListener(ORDER_EVENT, on);
    try {
      const saved = sessionStorage.getItem(ORDER_EVENT);
      if (saved) {
        sessionStorage.removeItem(ORDER_EVENT);
        add(JSON.parse(saved) as OrderIntent);
      }
    } catch {}
    return () => window.removeEventListener(ORDER_EVENT, on);
  }, []);

  const days = useMemo(() => (now ? pickupDays(now) : []), [now]);
  const times = useMemo(() => (now && day ? pickupTimes(day, now) : []), [now, day]);
  const today = now ? isoDay(now) : "";

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- premier jour disponible une fois l'heure connue
    if (days.length && !days.includes(day)) setDay(days[0]);
  }, [days, day]);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- l'heure choisie doit rester dans la liste
    if (time && !times.includes(time)) setTime("");
  }, [times, time]);

  const dayLabel = (iso: string) => {
    const base = formatDay(iso, lang, { weekday: "long", day: "numeric", month: "long" });
    if (iso === today) return `${d.status.today[0].toUpperCase()}${d.status.today.slice(1)} (${base})`;
    if (iso === addDays(today, 1)) return `${d.status.tomorrow[0].toUpperCase()}${d.status.tomorrow.slice(1)} (${base})`;
    return base[0].toUpperCase() + base.slice(1);
  };

  const update = (i: number, patch: Partial<OrderLine>) => setLines((ls) => ls.map((l, j) => (j === i ? { ...l, ...patch } : l)));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const err: Errors = {};
    if (!lines.length) err.lines = d.order.errors.lines;
    if (!time) err.time = d.order.errors.time;
    if (!name.trim()) err.name = d.order.errors.name;
    if (!isPhone(phone)) err.phone = d.order.errors.phone;
    setErrors(err);
    if (Object.keys(err).length) return;
    setSending(true);
    try {
      const r = await fetch("/api/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ lang, order: { lines, day, time, name, phone, email: isEmail(email) ? email : "", message } }) });
      const j = (await r.json()) as { ok: boolean; notified?: boolean };
      if (!r.ok || !j.ok) throw new Error();
      setDone({ notified: !!j.notified, name: name.trim(), phone: phone.trim() });
    } catch {
      setErrors({ send: d.order.errors.send });
    } finally {
      setSending(false);
    }
  };

  if (done)
    return (
      <div className="card bg-white p-7 md:p-10" role="status">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-basil text-white">
          <CheckIcon className="h-7 w-7" />
        </span>
        <p className="display mt-5 text-[2rem]">{fill(d.order.success.title, { name: done.name })}</p>
        <p className="lead mt-3">{done.notified ? fill(d.order.success.text, { phone: done.phone }) : fill(d.order.success.pending, { name: done.name })}</p>
        <button type="button" className="btn-line mt-7" onClick={() => (setDone(null), setLines([emptyLine()]), setTime(""))}>
          {d.order.success.again}
        </button>
      </div>
    );

  const total = orderTotal(lines);
  const id = (k: string) => `${uid}-${k}`;

  return (
    <form onSubmit={submit} noValidate className="card space-y-7 bg-white p-5 md:p-8">
      <fieldset>
        <legend className="label !mb-3">{f.lines}</legend>
        <ul className="space-y-3">
          {lines.map((l, i) => (
            <li key={i} className="grid grid-cols-[1fr_auto] items-end gap-3 rounded-[20px] bg-cream p-3 sm:grid-cols-[1fr_auto_auto]">
              <div className="col-span-2 sm:col-span-1">
                <label className="label" htmlFor={id(`item-${i}`)}>
                  {f.item}
                </label>
                <select id={id(`item-${i}`)} className="field" value={l.item} onChange={(e) => update(i, { item: e.target.value as ItemId, size: ITEMS[e.target.value as ItemId].pizza ? l.size || "L" : "" })}>
                  {categories().map((c) => (
                    <optgroup key={c.id} label={d.carte.tabs[c.id]}>
                      {c.items.map((it) => (
                        <option key={it} value={it}>
                          {d.products[it].name} · {price(ITEMS[it].price ?? 0, lang)}
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
              {ITEMS[l.item].pizza ? (
                <div>
                  <label className="label" htmlFor={id(`size-${i}`)}>
                    {f.size}
                  </label>
                  <select id={id(`size-${i}`)} className="field !w-24" value={l.size} onChange={(e) => update(i, { size: e.target.value as Size })}>
                    {SIZES.map((s) => (
                      <option key={s} value={s}>
                        {d.order.sizes[s]}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <span className="hidden sm:block" />
              )}
              <div className="flex items-center gap-1" role="group" aria-label={`${f.qty} : ${d.products[l.item].name}`}>
                <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-2 ring-line" aria-label={l.qty > 1 ? "−1" : f.remove} onClick={() => (l.qty > 1 ? update(i, { qty: l.qty - 1 }) : setLines((ls) => ls.filter((_, j) => j !== i)))}>
                  <MinusIcon />
                </button>
                <span className="w-8 text-center text-lg font-black tabular-nums" aria-live="polite">
                  {l.qty}
                </span>
                <button type="button" className="flex h-11 w-11 items-center justify-center rounded-full bg-white ring-2 ring-line" aria-label="+1" onClick={() => update(i, { qty: Math.min(l.qty + 1, site.order.maxPerLine) })}>
                  <PlusIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="link-line mt-4 inline-flex min-h-11 items-center gap-2 font-bold" onClick={() => setLines((ls) => [...ls, emptyLine()])}>
          <PlusIcon /> {f.addLine}
        </button>
        {errors.lines && <p className="mt-2 font-bold text-tomato">{errors.lines}</p>}
        {lines.length > 0 && (
          <div className="mt-4 rounded-[20px] bg-pink-soft p-4">
            <p className="display text-[1.375rem]">{fill(d.order.estimate, { total: price(total, lang) })}</p>
            <p className="mt-1 text-[0.9375rem] text-muted">{d.order.estimateNote}</p>
          </div>
        )}
      </fieldset>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor={id("day")}>
            {f.day}
          </label>
          <select id={id("day")} className="field" value={day} onChange={(e) => setDay(e.target.value)}>
            {days.map((x) => (
              <option key={x} value={x}>
                {dayLabel(x)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label" htmlFor={id("time")}>
            {f.time}
          </label>
          <select id={id("time")} className="field" value={time} onChange={(e) => setTime(e.target.value)} aria-invalid={!!errors.time} aria-describedby={errors.time ? id("time-err") : undefined}>
            <option value="">{times.length ? "—" : f.noTime}</option>
            {times.map((t) => (
              <option key={t} value={t}>
                {formatTime(t, lang)}
              </option>
            ))}
          </select>
          {errors.time && (
            <p id={id("time-err")} className="mt-1.5 font-bold text-tomato">
              {errors.time}
            </p>
          )}
        </div>
        <div>
          <label className="label" htmlFor={id("name")}>
            {f.name}
          </label>
          <input id={id("name")} className="field" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-err") : undefined} />
          {errors.name && (
            <p id={id("name-err")} className="mt-1.5 font-bold text-tomato">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label className="label" htmlFor={id("phone")}>
            {f.phone}
          </label>
          <input id={id("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? id("phone-err") : undefined} />
          {errors.phone && (
            <p id={id("phone-err")} className="mt-1.5 font-bold text-tomato">
              {errors.phone}
            </p>
          )}
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={id("email")}>
            {f.email} <span className="font-normal text-muted">({f.optional})</span>
          </label>
          <input id={id("email")} className="field" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label" htmlFor={id("msg")}>
            {f.message} <span className="font-normal text-muted">({f.optional})</span>
          </label>
          <textarea id={id("msg")} className="field min-h-24" rows={3} placeholder={f.messagePh} value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
      </div>

      {errors.send && (
        <p className="rounded-[16px] bg-[#fbe0dc] p-4 font-bold text-[#9c271c]" role="alert">
          {errors.send}
        </p>
      )}
      <button type="submit" className="btn w-full sm:w-auto" disabled={sending}>
        {sending ? f.sending : f.submit}
      </button>
    </form>
  );
}
