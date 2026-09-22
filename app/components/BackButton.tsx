import Link from "next/link";

interface BackButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function BackButton({ href, label = "Back", className = "" }: BackButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 text-xs md:text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors duration-200 group w-fit ${className}`}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <line x1="19" y1="12" x2="5" y2="12" />
        <polyline points="12 19 5 12 12 5" />
      </svg>
      <span>{label}</span>
    </Link>
  );
}
