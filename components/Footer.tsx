import Link from "next/link";
import site from "@/data/site.json";
import { Logo } from "@/components/Logo";
import { HoursTable } from "@/components/HoursTable";
import { FacebookIcon, InstagramIcon, PhoneIcon, TikTokIcon } from "@/components/icons";
import { fill, type Dict, type Locale } from "@/lib/i18n";
import { pagePath } from "@/lib/pages";

export function Footer({ lang, d }: { lang: Locale; d: Dict }) {
  const social = [
    { href: site.instagram, label: d.nav.instagram, icon: <InstagramIcon className="h-5 w-5" /> },
    { href: site.tiktok, label: "TikTok", icon: <TikTokIcon className="h-5 w-5" /> },
    { href: site.facebook, label: "Facebook", icon: <FacebookIcon className="h-5 w-5" /> },
  ];
  return (
    <footer className="bg-navy pb-24 text-white md:pb-0">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-[1.1fr_1fr_1.2fr] md:px-10 md:py-20">
        <div>
          <span className="inline-block rounded-[28px] bg-pink p-4">
            <Logo className="w-32" />
          </span>
          <p className="mt-5 max-w-xs leading-relaxed text-white/80">{d.footer.tagline}</p>
          <div className="mt-4 flex items-center gap-1">
            {social.map((s) => (
              <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-full first:-ms-3 hover:bg-white/10" aria-label={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        <div className="leading-relaxed">
          <p className="eyebrow mb-3 !text-pink">{d.infos.address}</p>
          <address className="text-lg not-italic">
            {site.address.street}
            <br />
            {site.address.postalCode} {site.address.city}
          </address>
          <a href={`tel:${site.phoneIntl}`} className="mt-4 inline-flex min-h-11 items-center gap-2 text-lg font-bold text-pink hover:underline">
            <PhoneIcon className="h-4 w-4" />
            {site.phone}
          </a>
          <ul className="mt-5 space-y-1 text-white/80">
            {site.delivery.ubereats && (
              <li>
                <a href={site.delivery.ubereats} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                  {d.footer.orderOn} Uber Eats
                </a>
              </li>
            )}
            {site.delivery.deliveroo && (
              <li>
                <a href={site.delivery.deliveroo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                  {d.footer.orderOn} Deliveroo
                </a>
              </li>
            )}
            <li>
              <Link href={pagePath("carte", lang)} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                {d.footer.menu}
              </Link>
            </li>
            <li>
              <Link href={pagePath("legal", lang)} className="inline-flex min-h-9 items-center hover:text-white hover:underline">
                {d.footer.legal}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-3 !text-pink">{d.infos.hours}</p>
          <HoursTable lang={lang} d={d} compact />
        </div>
      </div>
      <p className="border-t border-white/15 px-6 py-6 text-center text-sm text-white/70">{fill(d.footer.rights, { year: new Date().getFullYear() })}</p>
    </footer>
  );
}
