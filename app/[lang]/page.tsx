import Image from "next/image";
import Link from "next/link";
import site from "@/data/site.json";
import { getDict, altOf, fill, isLocale, type Dict, type Locale } from "@/lib/i18n";
import { formatDay } from "@/lib/format";
import { img, imgsIn } from "@/lib/media";
import { pagePath } from "@/lib/pages";
import { homeJsonLd } from "@/lib/jsonld";
import { Reveal } from "@/components/Reveal";
import { OpenStatus } from "@/components/OpenStatus";
import { OrderLink } from "@/components/OrderLink";
import { Tiles } from "@/components/Tiles";
import { MenuTabs } from "@/components/MenuTabs";
import { Offers } from "@/components/Offers";
import { Reels } from "@/components/Reels";
import { OrderForm } from "@/components/OrderForm";
import { GroupForm } from "@/components/GroupForm";
import { HoursTable } from "@/components/HoursTable";
import { Pic } from "@/components/Pic";
import { InstagramIcon, PhoneIcon, PinIcon, PlusIcon, ScooterIcon, ShopBagIcon, StarIcon, TableIcon } from "@/components/icons";

// Le statut « Ouvert / Fermé » et l'offre du jour se recalculent côté navigateur ; la page est régénérée chaque heure.
export const revalidate = 3600;

const P = {
  hero: "/media/hero/pizza-reine-gros-plan.jpg",
  tomate: "/media/pizzas/pizza-chorizo-service.jpg",
  creme: "/media/restaurant/salle-pizzas-a-partager.jpg",
  speciales: "/media/pizzas/pizza-poivrons-assiette.jpg",
  cote: "/media/pizzas/part-de-pizza-tard.jpg",
  dough: "/media/restaurant/pate-maison-petrin.jpg",
  oven: "/media/restaurant/four-a-pizza.jpg",
  facade: "/media/restaurant/facade-rue-des-otages.jpg",
  room: "/media/restaurant/salle-neon-rose.jpg",
};

function Rating({ lang, d, className = "" }: { lang: Locale; d: Dict; className?: string }) {
  const value = new Intl.NumberFormat(lang === "fr" ? "fr-FR" : "en-GB", { minimumFractionDigits: 1 }).format(site.rating.value);
  return (
    <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-flex min-h-6 items-center gap-2 font-bold hover:underline ${className}`} title={fill(d.hero.ratingNote, { date: formatDay(site.rating.checked, lang, { day: "numeric", month: "long", year: "numeric" }) })}>
      <span className="flex text-gold" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <StarIcon key={i} className="h-4 w-4" />
        ))}
      </span>
      <span>
        {fill(d.hero.rating, { value })} · {fill(d.hero.ratingCount, { count: site.rating.count })}
      </span>
    </a>
  );
}

function SectionHead({ eyebrow, title, intro, light = false }: { eyebrow: string; title: string; intro?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-2xl">
      <p className={`eyebrow ${light ? "!text-pink" : ""}`}>{eyebrow}</p>
      <h2 className="display mt-3 text-[2.6rem] md:text-[4rem]">{title}</h2>
      {intro && <p className={`mt-4 text-[1.0625rem] leading-relaxed ${light ? "text-white/85" : "text-muted"}`}>{intro}</p>}
    </Reveal>
  );
}

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) return null;
  const d = getDict(lang);
  const hero = img(P.hero);
  const reels = imgsIn("reels").map((r) => ({ ...r, id: r.src.split("/").pop()!.replace(/\.jpg$/, "") }));
  const tabPhoto = (src: string, ratio = "aspect-[16/9] lg:aspect-[4/3]") => <Pic paths={[src]} alt={altOf(d, src)} sizes="(min-width: 1024px) 34vw, 100vw" className={ratio} />;
  const services = [<ScooterIcon key="s" />, <ShopBagIcon key="b" />, <TableIcon key="t" />, <PhoneIcon key="p" className="h-8 w-8" />];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homeJsonLd(lang)) }} />

      {/* 1. Hero : la pizza en très gros plan, deux boutons, la note Google, le statut et la livraison juste dessous */}
      <section className="relative md:h-[calc(100svh-7.25rem)] md:min-h-[640px] md:p-4">
        <div className="relative h-[50svh] overflow-hidden md:absolute md:inset-4 md:h-auto md:rounded-[36px]">
          <Image src={hero.src} alt={d.hero.photoAlt} width={hero.width} height={hero.height} sizes="100vw" quality={80} priority fetchPriority="high" className="h-full w-full scale-[1.02] object-cover object-[55%_50%]" />
        </div>
        <div className="relative -mt-8 rounded-t-[32px] bg-pink px-5 pt-8 pb-10 md:absolute md:bottom-10 md:left-10 md:mt-0 md:max-w-[36rem] md:rounded-[32px] md:p-10 lg:max-w-[40rem]">
          <p className="eyebrow rise !text-navy">{d.hero.eyebrow}</p>
          <h1 className="display rise mt-3 text-[3rem] uppercase md:text-[4rem] lg:text-[4.6rem]" style={{ animationDelay: "0.05s" }}>
            {d.hero.title}
          </h1>
          <p className="rise mt-4 text-[1.125rem] leading-relaxed font-semibold" style={{ animationDelay: "0.1s" }}>
            {d.hero.sub}
          </p>
          <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.15s" }}>
            <OrderLink href={`/${lang}#commander`} className="btn">
              {d.hero.ctaOrder}
            </OrderLink>
            <a href={`/${lang}#carte`} className="btn-line">
              {d.hero.ctaMenu}
            </a>
          </div>
          <div className="rise mt-6 flex flex-col gap-2 text-[0.9375rem] sm:flex-row sm:flex-wrap sm:gap-x-5" style={{ animationDelay: "0.2s" }}>
            <Rating lang={lang} d={d} />
            <OpenStatus className="font-bold" />
            <span className="inline-flex min-h-6 items-center gap-2 font-bold">
              <ScooterIcon className="h-5 w-5" />
              {d.hero.delivery}
            </span>
          </div>
        </div>
      </section>

      {/* 2. Tuiles de catégories, en capitales */}
      <section aria-label={d.tiles.title} className="px-4 pt-8 md:px-8 md:pt-12">
        <h2 className="sr-only">{d.tiles.title}</h2>
        <div className="mx-auto max-w-7xl">
          <Tiles
            photos={{
              tomate: <Pic paths={[P.tomate]} alt="" sizes="(min-width: 768px) 16vw, 50vw" className="h-full" />,
              creme: <Pic paths={[P.creme]} alt="" sizes="(min-width: 768px) 16vw, 50vw" className="h-full" imgClassName="object-[60%_70%]" />,
              speciales: <Pic paths={[P.speciales]} alt="" sizes="(min-width: 768px) 16vw, 50vw" className="h-full" />,
            }}
          />
        </div>
      </section>

      {/* 3. Bande de services : livraison offerte, à emporter, sur place, téléphone */}
      <section id="livraison" aria-label={d.services.title} className="scroll-mt-24 px-4 pt-8 md:px-8 md:pt-12">
        <h2 className="sr-only">{d.services.title}</h2>
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[28px] bg-navy/10 lg:grid-cols-4">
          {d.services.items.map((s, i) => {
            const inner = (
              <>
                <span className="text-rose-ink">{services[i]}</span>
                <span>
                  <span className="display block text-[1.25rem] md:text-[1.375rem]">{s.title}</span>
                  <span className="mt-1 block text-[0.9375rem] leading-snug text-muted">{s.text}</span>
                </span>
              </>
            );
            const cls = "flex h-full flex-col gap-3 bg-cream-deep p-5 md:flex-row md:items-center md:gap-4 md:p-6";
            return <li key={s.id}>{s.id === "phone" ? <a href={`tel:${site.phoneIntl}`} className={`${cls} transition-colors hover:bg-pink-soft`}>{inner}</a> : <div className={cls}>{inner}</div>}</li>;
          })}
        </ul>
      </section>

      {/* 4. La carte : une seule page à onglets, prix en HTML */}
      <section id="carte" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.carte.eyebrow} title={d.carte.title} intro={d.carte.intro} />
            <Link href={pagePath("carte", lang)} className="link-line shrink-0 self-start font-bold md:self-auto">
              {d.carte.seeFull}
            </Link>
          </div>
          <MenuTabs photos={{ tomate: tabPhoto(P.tomate), creme: tabPhoto(P.creme), speciales: tabPhoto(P.speciales), cote: tabPhoto(P.cote) }} />
        </div>
      </section>

      {/* 5. Les offres */}
      <section id="offres" className="mt-20 scroll-mt-20 bg-pink px-4 py-20 md:mt-28 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 px-1">
            <SectionHead eyebrow={d.offers.eyebrow} title={d.offers.title} intro={d.offers.intro} />
          </div>
          <Offers />
          <p className="mt-5 px-1 text-[0.9375rem] font-semibold">{d.offers.fine}</p>
        </div>
      </section>

      {/* 6. La pâte maison */}
      <section id="pate" className="px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal className="relative mx-auto grid w-full max-w-lg grid-cols-[1.4fr_1fr] gap-3">
            <Pic paths={[P.dough]} alt={d.dough.photoAlt} sizes="(min-width: 768px) 28vw, 58vw" className="card row-span-2 aspect-[3/4]" />
            <Pic paths={[P.oven]} alt={altOf(d, P.oven)} sizes="(min-width: 768px) 18vw, 40vw" className="card aspect-square" />
            <Pic paths={[P.room]} alt={altOf(d, P.room)} sizes="(min-width: 768px) 18vw, 40vw" className="card aspect-square" imgClassName="object-[50%_30%]" />
          </Reveal>
          <div className="px-1">
            <SectionHead eyebrow={d.dough.eyebrow} title={d.dough.title} />
            <Reveal delay={0.05}>
              <p className="lead mt-5">{d.dough.p1}</p>
              <p className="lead mt-4">{d.dough.p2}</p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {d.dough.facts.map((f) => (
                  <li key={f} className="rounded-full bg-tile px-4 py-2 font-bold text-navy">
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 7. Les reels, chargés seulement au clic */}
      <section id="reels" className="px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 px-1 md:flex-row md:items-end">
            <SectionHead eyebrow={d.reels.eyebrow} title={d.reels.title} intro={d.reels.intro} />
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="btn-line shrink-0 self-start md:self-auto">
              <InstagramIcon className="h-5 w-5" />
              {fill(d.reels.follow, { handle: site.instagramHandle })}
            </a>
          </div>
          <Reels items={reels} />
        </div>
      </section>

      {/* 8. Commander : téléphone, Uber Eats, formulaire à emporter, commandes de groupe */}
      <section id="commander" className="mt-20 scroll-mt-20 bg-navy px-4 py-20 text-white md:mt-28 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 px-1">
            <SectionHead eyebrow={d.order.eyebrow} title={d.order.title} intro={d.order.intro} light />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Reveal className="card flex flex-col bg-pink p-6 text-navy md:p-8">
              <p className="display text-[1.75rem]">{d.order.call.title}</p>
              <p className="mt-2 flex-1 text-[1.0625rem]">{d.order.call.text}</p>
              <a href={`tel:${site.phoneIntl}`} className="btn mt-6 self-start">
                <PhoneIcon className="h-5 w-5" />
                {d.order.call.cta}
              </a>
              <p className="mt-3 text-lg font-black tabular-nums">{site.phone}</p>
              <OpenStatus className="mt-1 text-[0.9375rem] font-bold" />
            </Reveal>
            {site.delivery.ubereats && (
              <Reveal delay={0.05} className="card flex flex-col bg-white p-6 text-navy md:p-8">
                <p className="display text-[1.75rem]">{d.order.platform.title}</p>
                <p className="mt-2 flex-1 text-[1.0625rem] text-muted">{d.order.platform.text}</p>
                <a href={site.delivery.ubereats} target="_blank" rel="noopener noreferrer" className="btn-navy mt-6 self-start">
                  {d.order.platform.cta}
                </a>
              </Reveal>
            )}
          </div>

          <div id="commander-emporter" className="mt-14 grid scroll-mt-24 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div className="px-1 lg:sticky lg:top-24 lg:self-start">
              <p className="display text-[2rem] md:text-[2.4rem]">{d.order.form.title}</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/85">{d.order.form.text}</p>
              <p className="mt-3 text-[0.9375rem] text-white/70">{d.order.closedNote}</p>
            </div>
            <div className="text-navy">
              <OrderForm />
            </div>
          </div>

          <div id="groupe" className="mt-14 grid scroll-mt-24 gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
            <div className="px-1">
              <p className="eyebrow !text-pink">{d.group.eyebrow}</p>
              <p className="display mt-3 text-[2rem] md:text-[2.4rem]">{d.group.title}</p>
              <p className="mt-3 text-[1.0625rem] leading-relaxed text-white/85">{d.group.intro}</p>
            </div>
            <div className="text-navy">
              <GroupForm />
            </div>
          </div>
        </div>
      </section>

      {/* 9. Infos pratiques */}
      <section id="infos" className="scroll-mt-20 px-4 pt-20 md:px-8 md:pt-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 px-1">
            <SectionHead eyebrow={d.infos.eyebrow} title={d.infos.title} />
          </div>
          <div className="grid gap-4 lg:grid-cols-[1fr_1.15fr]">
            <Reveal className="card space-y-7 bg-cream-deep p-6 md:p-9">
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">{d.infos.address}</p>
                  <address className="text-lg font-bold not-italic">
                    {site.address.street}
                    <br />
                    {site.address.postalCode} {site.address.city}
                  </address>
                </div>
                <div>
                  <p className="eyebrow mb-2">{d.infos.phone}</p>
                  <a href={`tel:${site.phoneIntl}`} className="link-line text-lg font-bold">
                    {site.phone}
                  </a>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">{d.infos.hours}</p>
                <HoursTable lang={lang} d={d} />
                <div className="mt-3 font-bold">
                  <OpenStatus />
                </div>
              </div>
              <div className="grid gap-7 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-2">{d.infos.delivery}</p>
                  <p className="leading-relaxed text-muted">{d.infos.deliveryText}</p>
                </div>
                <div>
                  <p className="eyebrow mb-2">{d.infos.access}</p>
                  <p className="leading-relaxed text-muted">{d.infos.accessText}</p>
                </div>
              </div>
              <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-line">
                <PinIcon className="h-5 w-5" />
                {d.infos.route}
              </a>
            </Reveal>
            <Reveal delay={0.05} className="card flex min-h-96 flex-col bg-cream-deep">
              <Pic paths={[P.facade]} alt={d.infos.facadeAlt} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/9]" imgClassName="object-[50%_35%]" />
              <iframe title={d.infos.mapTitle} src={site.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="min-h-80 w-full flex-1 border-0" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10. FAQ */}
      <section id="faq" className="px-4 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="px-1">
            <SectionHead eyebrow={d.faq.eyebrow} title={d.faq.title} />
          </div>
          <Reveal delay={0.05}>
            <div className="space-y-3">
              {d.faq.items.map((f) => (
                <details key={f.q} className="group card bg-white ring-2 ring-line open:ring-pink">
                  <summary className="flex min-h-16 items-center justify-between gap-6 px-5 py-4 font-[family-name:var(--font-display)] text-[1.1875rem] font-semibold md:px-6">
                    {f.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink">
                      <PlusIcon className="faq-plus h-4 w-4" />
                    </span>
                  </summary>
                  <p className="px-5 pb-6 leading-relaxed text-muted md:px-6">{f.a}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
