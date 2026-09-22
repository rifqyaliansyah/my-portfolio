import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/app/lib/sanity";
import { WRITINGS_QUERY, PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { WritingData, ProfileData } from "@/app/types/sanity";
import { fallbackWritings } from "@/app/lib/fallback-data";
import SubPageLayout from "@/app/components/SubPageLayout";
import BackButton from "@/app/components/BackButton";
import WritingsClient from "./WritingsClient";

export const metadata: Metadata = {
  title: "Writing | Rifqy Aliansyah",
  description: "Essays, tutorials, and technical insights on frontend architecture, UI design, and software engineering.",
};

export const revalidate = 60;

export default async function WritingsPage() {
  let writings: WritingData[] = [];
  let profile: ProfileData | null = null;

  try {
    const [fetchedWritings, fetchedProfile] = await Promise.all([
      client.fetch<WritingData[]>(WRITINGS_QUERY),
      client.fetch<ProfileData>(PROFILE_QUERY),
    ]);
    writings = fetchedWritings || [];
    profile = fetchedProfile || null;
  } catch (err) {
    console.error("Failed to fetch writings from Sanity:", err);
  }

  const finalWritings = writings.length > 0 ? writings : (fallbackWritings as unknown as WritingData[]);

  return (
    <SubPageLayout profile={profile}>
      <div className="w-full flex flex-col">
        {/* Header & Back Link */}
        <div className="flex flex-col gap-4">
          <BackButton href="/" label="Back to Home" />

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary tracking-tight">
              Writing
            </h1>
            <p className="text-base sm:text-lg text-brand-secondary">
              Thoughts on software engineering, design systems, and frontend craftsmanship.
            </p>
          </div>
        </div>

        {/* Writings List with Search & Filters */}
        <WritingsClient writings={finalWritings} />
      </div>
    </SubPageLayout>
  );
}
