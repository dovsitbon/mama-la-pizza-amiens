type P = { className?: string };
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };

export const PlusIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.4}>
    <path d="M12 4v16M4 12h16" />
  </svg>
);

export const MinusIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.4}>
    <path d="M4 12h16" />
  </svg>
);

export const CheckIcon = ({ className = "h-4 w-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.4}>
    <path d="m4.5 12.5 5 5 10-11" />
  </svg>
);

export const InstagramIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const PhoneIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M6.6 3.5h2.6l1.4 4.2-2 1.4a11 11 0 0 0 6.3 6.3l1.4-2 4.2 1.4v2.6a1.9 1.9 0 0 1-2 1.9A15.6 15.6 0 0 1 4.6 5.5a1.9 1.9 0 0 1 2-2Z" />
  </svg>
);

export const WhatsAppIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M12.04 2.5a9.45 9.45 0 0 0-8.1 14.33L2.5 21.5l4.8-1.4a9.46 9.46 0 1 0 4.74-17.6Zm0 17.25a7.8 7.8 0 0 1-3.98-1.09l-.29-.17-2.85.83.85-2.78-.19-.3a7.8 7.8 0 1 1 6.46 3.51Zm4.28-5.84c-.23-.12-1.38-.68-1.6-.76-.21-.08-.37-.12-.53.12-.15.23-.6.76-.74.92-.14.15-.27.17-.5.06a6.4 6.4 0 0 1-1.88-1.16 7.06 7.06 0 0 1-1.3-1.62c-.14-.23 0-.36.1-.47.1-.1.23-.27.35-.41.11-.14.15-.23.23-.39.08-.15.04-.29-.02-.4-.06-.12-.53-1.27-.72-1.74-.19-.46-.38-.39-.53-.4h-.45a.86.86 0 0 0-.62.29 2.6 2.6 0 0 0-.81 1.94c0 1.14.83 2.25.95 2.4.12.16 1.64 2.5 3.97 3.5.55.24.99.39 1.32.5.56.17 1.06.15 1.46.09.45-.07 1.38-.56 1.57-1.1.2-.55.2-1.02.14-1.11-.06-.1-.21-.16-.44-.27Z" />
  </svg>
);

export const MenuIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M3.5 8.5h17M3.5 15.5h17" />
  </svg>
);

export const CloseIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="m5.5 5.5 13 13M18.5 5.5l-13 13" />
  </svg>
);

export const ArrowIcon = ({ className = "h-4 w-4 rtl:-scale-x-100" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const FacebookIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M14.5 8.5h2V5h-2.6c-2.4 0-3.9 1.6-3.9 4.1v2H8v3.4h2V21h3.4v-6.5h2.6l.5-3.4h-3.1V9.6c0-.7.4-1.1 1.1-1.1Z" />
  </svg>
);

export const BagIcon = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <path d="M6.5 11h19l-1.6 16H8.1L6.5 11Z" />
    <path d="M11.5 14V8.5a4.5 4.5 0 0 1 9 0V14" />
  </svg>
);

export const CupIcon = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <path d="M6 14h17v3.5A7.5 7.5 0 0 1 15.5 25h-2A7.5 7.5 0 0 1 6 17.5V14Z" />
    <path d="M23 16h1.5a3 3 0 0 1 0 6H22M4 28h22" />
    <path d="M12 10c-1.2-1.5 1.2-2.5 0-4.5M17 10c-1.2-1.5 1.2-2.5 0-4.5" />
  </svg>
);

export const CakeIcon = ({ className = "h-7 w-7" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...base}>
    <path d="M9 27 7.5 14.5C5 13 6.5 6.5 16 6s11 7 8.5 8.5L23 27Z" />
    <path d="M7.5 14.5Q16 16.5 24.5 14.5M6 27h20M12.5 27l-1-11M16 27V16.5M19.5 27l1-11" />
  </svg>
);

export const PinIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const StarIcon = ({ className = "h-3.5 w-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6.1L12 16.8l-5.4 3 1.2-6.1-4.5-4.2 6.1-.7L12 3.2Z" />
  </svg>
);

/* Pictos de la bande de services et des tuiles : trait épais et rond, comme le lettrage du logo */
const bold = { ...base, strokeWidth: 2 };

export const ScooterIcon = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...bold}>
    <circle cx="8" cy="23" r="3.5" />
    <circle cx="24.5" cy="23" r="3.5" />
    <path d="M11.5 23h7l3-9h-4M21.5 14l-1.5-5h-3M4 17h9v-6H4z" />
  </svg>
);

export const ShopBagIcon = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...bold}>
    <path d="M7 11h18l-1.5 16h-15L7 11Z" />
    <path d="M12 14V9a4 4 0 0 1 8 0v5" />
  </svg>
);

export const TableIcon = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...bold}>
    <path d="M4 13h24M16 13v14M11 27h10M7 13 9 6h14l2 7" />
  </svg>
);

export const PizzaIcon = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...bold}>
    <path d="M5 8c7-4 15-4 22 0L16 28 5 8Z" />
    <path d="M7.5 12.5c5.5-2.6 11.5-2.6 17 0" />
    <circle cx="14" cy="16" r="1.4" fill="currentColor" />
    <circle cx="18.5" cy="19.5" r="1.2" fill="currentColor" />
    <circle cx="16" cy="23" r="1" fill="currentColor" />
  </svg>
);

export const CanIcon = ({ className = "h-8 w-8" }: P) => (
  <svg viewBox="0 0 32 32" className={className} {...bold}>
    <path d="M10 7h12l1 3v16l-1 3H10l-1-3V10l1-3Z" />
    <path d="M9 11h14M9 25h14M14 5h4" />
  </svg>
);

export const ClockIcon = ({ className = "h-5 w-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.8}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const PlayIcon = ({ className = "h-6 w-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
  </svg>
);

export const TikTokIcon = ({ className = "h-[18px] w-[18px]" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={1.6}>
    <path d="M14 3.5v11.2a3.8 3.8 0 1 1-3.8-3.8M14 3.5c.4 2.6 2.2 4.4 5 4.6" />
  </svg>
);
