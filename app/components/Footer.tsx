import { ProfileData } from "@/app/types/sanity";
import { resolveSocialLinks } from "@/app/lib/social-links";

interface FooterProps {
  profile?: ProfileData | null;
}

export default function Footer({ profile }: FooterProps) {
  const socialLinks = resolveSocialLinks(profile);

  const currentYear = new Date().getFullYear();
  const name = profile?.name || "Rifqy Aliansyah";

  return (
    <footer className="mt-32 w-full">
      <hr style={{ border: 'none', borderTop: '1px solid currentColor', opacity: 0.15, margin: 0 }} />

      <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[13px] font-medium select-none" style={{ color: 'var(--secondary-color)', opacity: 0.5 }}>
          © {currentYear} {name}. All Rights Reserved.
        </p>

        <div className="flex items-center gap-5">
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={link.label}
              className="text-brand-secondary opacity-40 hover:opacity-100 hover:scale-115 active:scale-90 transition-all duration-300 ease-out"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
