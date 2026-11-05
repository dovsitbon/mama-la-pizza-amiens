import Image from "next/image";
import { firstImg } from "@/lib/media";

/** Photo de public/media (dimensions connues via data/media-sizes.json) ; rien si elle n'existe pas encore. */
export function Pic({ paths, alt, sizes, className = "", imgClassName = "", priority = false, quality = 75 }: { paths: readonly string[]; alt: string; sizes: string; className?: string; imgClassName?: string; priority?: boolean; quality?: number }) {
  const p = firstImg(paths);
  if (!p) return null;
  return (
    <div className={`zoom bg-pink-soft ${className}`}>
      <Image src={p.src} alt={alt} width={p.width} height={p.height} sizes={sizes} quality={quality} priority={priority} fetchPriority={priority ? "high" : undefined} className={`h-full w-full object-cover ${imgClassName}`} />
    </div>
  );
}
