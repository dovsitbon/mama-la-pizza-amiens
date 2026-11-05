// Le vrai logo de Mama La Pizza (l'ours et sa pizza, « MAMA! LA PIZZA! »), vectorisé par scripts/logo.mjs depuis
// sa photo de profil Instagram : public/logo.svg (couleurs), public/logo-ours.svg (tête seule).

/** Logo complet en couleurs. Ratio 1167 × 967. */
export function Logo({ className = "w-24", eager = false }: { className?: string; eager?: boolean }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/logo.svg" alt="Mama La Pizza" width={1167} height={967} loading={eager ? "eager" : "lazy"} decoding="async" className={`h-auto ${className}`} translate="no" />;
}
