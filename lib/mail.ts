const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** E-mail simple aux couleurs de Mama La Pizza (rose, bleu nuit). */
export function mailHtml(title: string, text: string) {
  const body = escapeHtml(text)
    .split("\n\n")
    .map((p) => `<p style="margin:0 0 18px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return `<div style="background:#F7C9D4;padding:32px 16px"><div style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:20px;padding:32px 28px;font-family:Helvetica,Arial,sans-serif;color:#1B2A3A;font-size:15px;line-height:1.65">
<p style="margin:0 0 6px;font-size:13px;font-weight:bold;color:#B02A5C">MAMA LA PIZZA · 15 rue des Otages, Amiens</p>
<h1 style="margin:0 0 24px;font-size:24px">${escapeHtml(title)}</h1>${body}</div></div>`;
}
