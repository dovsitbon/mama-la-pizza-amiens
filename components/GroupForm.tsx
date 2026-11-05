"use client";

import { useId, useState, type FormEvent } from "react";
import { useLocale } from "@/components/providers";
import { isPhone } from "@/lib/order";

const TYPES = ["birthday", "office", "party", "other"] as const;

/** Commandes de groupe (anniversaire, bureau, soirée) : formulaire court, envoyé par e-mail (Resend). */
export function GroupForm() {
  const { lang, d } = useLocale();
  const g = d.group;
  const uid = useId();
  const [type, setType] = useState<(typeof TYPES)[number]>("birthday");
  const [people, setPeople] = useState("");
  const [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "pending" | "error">("idle");
  const [invalid, setInvalid] = useState<{ name?: boolean; phone?: boolean }>({});

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const bad = { name: !name.trim(), phone: !isPhone(phone) };
    setInvalid(bad);
    if (bad.name || bad.phone) return;
    setState("sending");
    try {
      const r = await fetch("/api/groupe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, people, date, name, phone, message, lang }) });
      const j = (await r.json()) as { ok: boolean; notified?: boolean };
      if (!r.ok || !j.ok) throw new Error();
      setState(j.notified ? "ok" : "pending");
    } catch {
      setState("error");
    }
  };

  if (state === "ok" || state === "pending")
    return (
      <p className="card bg-white p-6 text-lg font-bold" role="status">
        {state === "ok" ? g.success : g.pending}
      </p>
    );

  const id = (k: string) => `${uid}-${k}`;
  return (
    <form onSubmit={submit} noValidate className="card grid gap-4 bg-white p-5 sm:grid-cols-2 md:p-7">
      <fieldset className="sm:col-span-2">
        <legend className="label">{g.fields.type}</legend>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label key={t} className={`chip ring-2 ring-inset ${type === t ? "bg-navy text-white ring-navy" : "ring-line"}`}>
              <input type="radio" name={id("type")} value={t} checked={type === t} onChange={() => setType(t)} className="sr-only" />
              {g.fields.types[t]}
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label className="label" htmlFor={id("people")}>
          {g.fields.people}
        </label>
        <input id={id("people")} className="field" type="number" inputMode="numeric" min={1} max={500} value={people} onChange={(e) => setPeople(e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor={id("date")}>
          {g.fields.date}
        </label>
        <input id={id("date")} className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div>
        <label className="label" htmlFor={id("name")}>
          {g.fields.name}
        </label>
        <input id={id("name")} className="field" autoComplete="given-name" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={!!invalid.name} />
        {invalid.name && <p className="mt-1.5 font-bold text-tomato">{d.order.errors.name}</p>}
      </div>
      <div>
        <label className="label" htmlFor={id("phone")}>
          {g.fields.phone}
        </label>
        <input id={id("phone")} className="field" type="tel" inputMode="tel" autoComplete="tel" value={phone} onChange={(e) => setPhone(e.target.value)} aria-invalid={!!invalid.phone} />
        {invalid.phone && <p className="mt-1.5 font-bold text-tomato">{d.order.errors.phone}</p>}
      </div>
      <div className="sm:col-span-2">
        <label className="label" htmlFor={id("msg")}>
          {g.fields.message}
        </label>
        <textarea id={id("msg")} className="field min-h-24" rows={3} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>
      {state === "error" && (
        <p className="rounded-[16px] bg-[#fbe0dc] p-4 font-bold text-[#9c271c] sm:col-span-2" role="alert">
          {g.error}
        </p>
      )}
      <div className="sm:col-span-2">
        <button type="submit" className="btn-navy w-full sm:w-auto" disabled={state === "sending"}>
          {state === "sending" ? d.order.fields.sending : g.fields.submit}
        </button>
      </div>
    </form>
  );
}
