import type { Metadata } from "next";
import { client } from "@/app/lib/sanity";
import { PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { resolveSocialLinks } from "@/app/lib/social-links";
import { ProfileData } from "@/app/types/sanity";
import MaintenanceShell from "@/app/components/MaintenanceShell";

export const metadata: Metadata = {
  title: "Under Maintenance | Rifqy Aliansyah",
  description: "Rifqy Aliansyah's portfolio is currently under maintenance. Please check back soon.",
};

export const revalidate = 60;

export default async function MaintenancePage() {
  let profile: ProfileData | null = null;

  try {
    profile = await client.fetch<ProfileData>(PROFILE_QUERY);
  } catch (err) {
    console.error("Failed to fetch profile for maintenance page:", err);
  }

  const socialLinks = resolveSocialLinks(profile);

  return (
    <MaintenanceShell>
      <div className="flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-brand-primary">
          Under Maintenance
        </h1>
        <p className="mt-4 max-w-sm text-[15px] sm:text-base leading-relaxed text-brand-secondary">
          I&apos;m currently making a few improvements. Please check back soon.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
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
    </MaintenanceShell>
  );
}
