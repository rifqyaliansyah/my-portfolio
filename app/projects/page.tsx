import { Metadata } from "next";
import Link from "next/link";
import { client } from "@/app/lib/sanity";
import { ALL_PROJECTS_QUERY, PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { ProjectData, ProfileData } from "@/app/types/sanity";
import { fallbackProjects } from "@/app/lib/fallback-data";
import SubPageLayout from "@/app/components/SubPageLayout";
import BackButton from "@/app/components/BackButton";
import ProjectsClient from "./ProjectsClient";

export const metadata: Metadata = {
  title: "Projects | Rifqy Aliansyah",
  description: "A showcase of web applications, interfaces, and open-source software crafted by Rifqy Aliansyah.",
};

export const revalidate = 60;

export default async function ProjectsPage() {
  let projects: ProjectData[] = [];
  let profile: ProfileData | null = null;

  try {
    const [fetchedProjects, fetchedProfile] = await Promise.all([
      client.fetch<ProjectData[]>(ALL_PROJECTS_QUERY),
      client.fetch<ProfileData>(PROFILE_QUERY),
    ]);
    projects = fetchedProjects || [];
    profile = fetchedProfile || null;
  } catch (err) {
    console.error("Failed to fetch projects from Sanity:", err);
  }

  const finalProjects = projects.length > 0 ? projects : (fallbackProjects as unknown as ProjectData[]);

  return (
    <SubPageLayout profile={profile}>
      {/* Header & Back Link */}
      <div className="flex flex-col gap-4">
        <BackButton href="/" label="Back to Home" />

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary tracking-tight">
            Projects
          </h1>
          <p className="text-base sm:text-lg text-brand-secondary">
            A comprehensive archive of applications, experiments, and client collaborations I've designed and built.
          </p>
        </div>
      </div>

      {/* Projects Client Grid with Search and Filter */}
      <ProjectsClient projects={finalProjects} />
    </SubPageLayout>
  );
}
