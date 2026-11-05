import site from "@/data/site.json";
import { getDict, locales, type Locale } from "@/lib/i18n";
import { weekHours } from "@/lib/hours";
import { categories, ITEMS } from "@/lib/carte";
import { pagePath, type PageId } from "@/lib/pages";

const BUSINESS = `${site.url}/#restaurant`;
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

function menu(lang: Locale) {
  const d = getDict(lang);
  return {
    "@type": "Menu",
    "@id": `${site.url}${pagePath("carte", lang)}#menu`,
    name: d.pages.carte.title,
    url: `${site.url}${pagePath("carte", lang)}`,
    inLanguage: lang,
    hasMenuSection: categories().map((c) => ({
      "@type": "MenuSection",
      name: d.carte.tabs[c.id],
      hasMenuItem: c.items.map((id) => {
        const it = ITEMS[id];
        return {
          "@type": "MenuItem",
          name: d.products[id].name,
          description: d.products[id].desc,
          ...(it.tags.includes("vegetarian") ? { suitableForDiet: "https://schema.org/VegetarianDiet" } : {}),
          ...(it.price !== null ? { offers: { "@type": "Offer", price: it.price.toFixed(2), priceCurrency: "EUR" } } : {}),
        };
      }),
    })),
  };
}

function business(lang: Locale) {
  const d = getDict(lang);
  const fr = lang === "fr";
  return {
    "@type": "Restaurant",
    "@id": BUSINESS,
    name: site.name,
    alternateName: ["Mama La Pizza Amiens", "Mama la pizza", "MAMA! LA PIZZA!"],
    description: d.meta.description,
    url: `${site.url}/${lang}`,
    image: [`${site.url}/og.jpg`, `${site.url}/media/hero/pizza-reine-gros-plan.jpg`, `${site.url}/media/restaurant/facade-rue-des-otages.jpg`],
    logo: `${site.url}/logo.svg`,
    telephone: site.phoneIntl,
    priceRange: site.priceRange,
    servesCuisine: ["Pizza", "Pizzeria", "Detroit-style pizza", "Italienne"],
    address: { "@type": "PostalAddress", streetAddress: site.address.street, postalCode: site.address.postalCode, addressLocality: site.address.city, addressRegion: site.address.region, addressCountry: site.address.country },
    geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
    hasMap: site.mapsUrl,
    areaServed: { "@type": "City", name: "Amiens" },
    openingHoursSpecification: weekHours().flatMap((slots, i) => slots.map(([opens, closes]) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: `https://schema.org/${DAYS[i]}`, opens, closes }))),
    // Note Google relevée à la main (date dans data/site.json → rating.checked) : à mettre à jour de temps en temps
    aggregateRating: { "@type": "AggregateRating", ratingValue: site.rating.value, reviewCount: site.rating.count, bestRating: 5, worstRating: 1, dateModified: site.rating.checked },
    sameAs: [site.instagram, site.tiktok, site.facebook, site.delivery.ubereats].filter(Boolean),
    acceptsReservations: false,
    currenciesAccepted: "EUR",
    knowsLanguage: ["fr", "en"],
    hasMenu: { "@id": `${site.url}${pagePath("carte", lang)}#menu` },
    hasDeliveryMethod: ["http://purl.org/goodrelations/v1#DeliveryModeOwnFleet", "http://purl.org/goodrelations/v1#DeliveryModePickUp"],
    amenityFeature: [
      { "@type": "LocationFeatureSpecification", name: fr ? "Livraison offerte à Amiens" : "Free delivery in Amiens", value: true },
      { "@type": "LocationFeatureSpecification", name: fr ? "Vente à emporter" : "Takeaway", value: true },
      { "@type": "LocationFeatureSpecification", name: fr ? "Repas sur place" : "Dine-in", value: true },
      { "@type": "LocationFeatureSpecification", name: fr ? "Ouvert tard le soir" : "Open late", value: true },
    ],
    potentialAction: [
      { "@type": "OrderAction", target: { "@type": "EntryPoint", urlTemplate: `tel:${site.phoneIntl}` }, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModeOwnFleet" },
      { "@type": "OrderAction", target: { "@type": "EntryPoint", urlTemplate: `${site.url}/${lang}#commander` }, deliveryMethod: "http://purl.org/goodrelations/v1#DeliveryModePickUp" },
    ],
  };
}

/** Données structurées de l'accueil : Restaurant (horaires, note Google, menu, livraison), FAQ. */
export function homeJsonLd(lang: Locale) {
  const d = getDict(lang);
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebSite", "@id": `${site.url}/#website`, url: site.url, name: site.name, inLanguage: [...locales], publisher: { "@id": BUSINESS } },
      business(lang),
      menu(lang),
      { "@type": "FAQPage", mainEntity: d.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) },
    ],
  };
}

/** Données structurées d'une page secondaire : la carte (Menu) ou les mentions légales, plus fil d'Ariane. */
export function pageJsonLd(lang: Locale, id: PageId) {
  const d = getDict(lang);
  const url = `${site.url}${pagePath(id, lang)}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      business(lang),
      ...(id === "carte" ? [menu(lang)] : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: site.name, item: `${site.url}/${lang}` },
          { "@type": "ListItem", position: 2, name: d.pages[id].title, item: url },
        ],
      },
    ],
  };
}
