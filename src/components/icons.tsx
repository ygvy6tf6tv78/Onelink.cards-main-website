import type { IconName } from "@/content/site";

type IconProps = {
  name: IconName;
  className?: string;
};

export function Icon({ name, className }: IconProps) {
  const commonProps = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    strokeWidth: 1.8,
    viewBox: "0 0 24 24",
  };

  switch (name) {
    case "spark":
      return (
        <svg {...commonProps}>
          <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z" />
          <path d="M18.5 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2z" />
        </svg>
      );
    case "phone":
      return (
        <svg {...commonProps}>
          <path d="M6.7 4.5h3.1l1.2 3.3-1.6 1.6c1 2 2.6 3.6 4.6 4.6l1.6-1.6 3.3 1.2v3.1a1.8 1.8 0 0 1-1.8 1.8C10.9 18.5 5.5 13.1 5.5 6.3A1.8 1.8 0 0 1 6.7 4.5z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...commonProps}>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h10A2.5 2.5 0 0 1 19 7.5v9A2.5 2.5 0 0 1 16.5 19h-10A2.5 2.5 0 0 1 4 16.5v-9z" />
          <path d="M4 8h15" />
          <path d="M16 13h.01" />
        </svg>
      );
    case "map":
      return (
        <svg {...commonProps}>
          <path d="M14.5 20l-5-2-5 2V6l5-2 5 2 5-2v14l-5 2z" />
          <path d="M9.5 4v14" />
          <path d="M14.5 6v14" />
        </svg>
      );
    case "reviews":
      return (
        <svg {...commonProps}>
          <path d="M12 17.5l-3.5 1.8.7-3.9-2.8-2.7 3.9-.6L12 8.5l1.7 3.6 3.9.6-2.8 2.7.7 3.9z" />
        </svg>
      );
    case "gallery":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5" width="16" height="14" rx="2.5" />
          <path d="M8 13l2.3-2.3a1 1 0 0 1 1.4 0l1.9 1.9" />
          <path d="M12.5 13.5l1.3-1.3a1 1 0 0 1 1.4 0L18 15" />
          <circle cx="9" cy="9" r="1" />
        </svg>
      );
    case "form":
      return (
        <svg {...commonProps}>
          <rect x="5" y="4" width="14" height="16" rx="2.5" />
          <path d="M8.5 8.5h7" />
          <path d="M8.5 12h7" />
          <path d="M8.5 15.5h4" />
        </svg>
      );
    case "social":
      return (
        <svg {...commonProps}>
          <circle cx="6.5" cy="12" r="2.5" />
          <circle cx="17.5" cy="6.5" r="2.5" />
          <circle cx="17.5" cy="17.5" r="2.5" />
          <path d="M8.7 10.9l6.1-3.3" />
          <path d="M8.7 13.1l6.1 3.3" />
        </svg>
      );
    case "menu":
      return (
        <svg {...commonProps}>
          <path d="M7 4v16" />
          <path d="M11 4v7a2 2 0 0 1-4 0V4" />
          <path d="M17 4c1.7 2.6 2.5 5 2.5 7.3 0 4.2-2.5 5.7-2.5 5.7V4z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...commonProps}>
          <path d="M12 3l7 2.7v5.4c0 4.5-3 7.4-7 9.9-4-2.5-7-5.4-7-9.9V5.7L12 3z" />
          <path d="M9.5 12.2l1.6 1.7 3-3.4" />
        </svg>
      );
    case "bolt":
      return (
        <svg {...commonProps}>
          <path d="M13 2L5.5 13h4.8L9.8 22 17.5 11H12l1-9z" />
        </svg>
      );
    case "qr":
      return (
        <svg {...commonProps}>
          <rect x="4" y="4" width="6" height="6" rx="1.2" />
          <rect x="14" y="4" width="6" height="6" rx="1.2" />
          <rect x="4" y="14" width="6" height="6" rx="1.2" />
          <path d="M14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z" />
        </svg>
      );
    case "chart":
      return (
        <svg {...commonProps}>
          <path d="M5 19h14" />
          <path d="M8 16V9" />
          <path d="M12 16V5" />
          <path d="M16 16v-4" />
        </svg>
      );
    case "check":
      return (
        <svg {...commonProps}>
          <path d="M5.5 12.5l4 4 9-9" />
        </svg>
      );
    case "building":
      return (
        <svg {...commonProps}>
          <path d="M5 20V6.5A1.5 1.5 0 0 1 6.5 5H14v15" />
          <path d="M14 20V10.5A1.5 1.5 0 0 1 15.5 9H19v11" />
          <path d="M8.5 9h2M8.5 12h2M8.5 15h2M16.5 13h1M16.5 16h1" />
        </svg>
      );
    case "invoice":
      return (
        <svg {...commonProps}>
          <path d="M7 3.5h8l3 3v14H7z" />
          <path d="M15 3.5v4h4" />
          <path d="M10 11h5M10 14.5h5M10 18h3" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...commonProps}>
          <rect x="4" y="5.5" width="16" height="14" rx="2.5" />
          <path d="M8 3.5v4M16 3.5v4M4 9.5h16" />
        </svg>
      );
    case "download":
      return (
        <svg {...commonProps}>
          <path d="M12 4v10" />
          <path d="M8.5 10.5L12 14l3.5-3.5" />
          <path d="M5 19h14" />
        </svg>
      );
    case "mail":
      return (
        <svg {...commonProps}>
          <rect x="4" y="6" width="16" height="12" rx="2.5" />
          <path d="M5.5 7.5L12 12.5l6.5-5" />
        </svg>
      );
    case "user":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="8.5" r="3.25" />
          <path d="M6 19c1.6-3 4-4.5 6-4.5s4.4 1.5 6 4.5" />
        </svg>
      );
    case "play":
      return (
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="9" />
          <path d="M10 8.8l5 3.2-5 3.2V8.8z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...commonProps} viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      );
    case "reel":
      return (
        <svg {...commonProps} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="2" width="20" height="20" rx="5" />
          <path d="M2 8h20M2 16h20M8 2v20M16 2v20" />
          <path d="M10 11l4 2-4 2V11z" fill="currentColor" stroke="none" />
        </svg>
      );
    case "eye":
      return (
        <svg {...commonProps}>
          <path d="M2.8 12s3.4-5.5 9.2-5.5 9.2 5.5 9.2 5.5-3.4 5.5-9.2 5.5S2.8 12 2.8 12z" />
          <circle cx="12" cy="12" r="2.7" />
        </svg>
      );
    case "logo":
      return (
        <svg {...commonProps} viewBox="0 0 512 512">
           <circle cx="256" cy="256" r="256" fill="url(#pan-gradient)" fillOpacity="0.15" stroke="none" />
           <defs>
             <linearGradient id="pan-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
               <stop offset="0%" stopColor="#00A9FF" />
               <stop offset="100%" stopColor="#6366F1" />
             </linearGradient>
           </defs>
           <path d="M256 96C167.6 96 96 167.6 96 256C96 344.4 167.6 416 256 416C344.4 416 416 344.4 416 256C416 167.6 344.4 96 256 96ZM256 368C194.1 368 144 317.9 144 256C144 194.1 194.1 144 256 144C317.9 144 368 194.1 368 256C368 317.9 317.9 368 256 368Z" fill="#00A9FF" stroke="none" />
           <path d="M256 0C114.6 0 0 114.6 0 256C0 397.4 114.6 512 256 512C397.4 512 512 397.4 512 256C512 114.6 397.4 0 256 0ZM256 464C141.1 464 48 370.9 48 256C48 141.1 141.1 48 256 48C370.9 48 464 141.1 464 256C464 370.9 370.9 464 256 464Z" fill="#6366F1" stroke="none" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg {...commonProps}>
          <path d="M15 18l-6-6 6-6" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg {...commonProps}>
          <path d="M9 18l6-6-6-6" />
        </svg>
      );
    case "close":
      return (
        <svg {...commonProps}>
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      );
    default:
      return null;
  }
}
