import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/app/lib/sanity";
import { PROJECT_BY_SLUG_QUERY, ALL_PROJECTS_QUERY, PROFILE_QUERY } from "@/app/lib/sanity.queries";
import { ProjectData, ProfileData } from "@/app/types/sanity";
import { fallbackProjects } from "@/app/lib/fallback-data";
import { urlFor } from "@/app/lib/sanity";
import SubPageLayout from "@/app/components/SubPageLayout";
import CustomPortableText from "@/app/components/CustomPortableText";
import BackButton from "@/app/components/BackButton";
import ProjectGallery, { GalleryImage } from "@/app/components/ProjectGallery";
import Card from "@/app/components/Card";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  try {
    const projects = await client.fetch<ProjectData[]>(ALL_PROJECTS_QUERY);
    if (projects && projects.length > 0) {
      return projects
        .filter((p) => p.slug?.current)
        .map((p) => ({ slug: p.slug!.current }));
    }
  } catch (e) {
    console.error("Error generating static params for projects:", e);
  }

  return fallbackProjects
    .filter((p) => p.slug?.current)
    .map((p) => ({ slug: p.slug.current }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  let project: ProjectData | null = null;

  try {
    project = await client.fetch<ProjectData>(PROJECT_BY_SLUG_QUERY, { slug });
  } catch (e) {
    // fallback
  }

  if (!project) {
    project = (fallbackProjects.find((p) => p.slug?.current === slug) as unknown as ProjectData) || null;
  }

  if (!project) {
    return {
      title: "Project Not Found | Rifqy Aliansyah",
    };
  }

  return {
    title: `${project.title} | Rifqy Aliansyah`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  let project: ProjectData | null = null;
  let allProjects: ProjectData[] = [];
  let profile: ProfileData | null = null;

  try {
    const [fetchedProject, fetchedAll, fetchedProfile] = await Promise.all([
      client.fetch<ProjectData>(PROJECT_BY_SLUG_QUERY, { slug }),
      client.fetch<ProjectData[]>(ALL_PROJECTS_QUERY),
      client.fetch<ProfileData>(PROFILE_QUERY),
    ]);
    project = fetchedProject;
    allProjects = fetchedAll || [];
    profile = fetchedProfile;
  } catch (err) {
    console.error("Error fetching project detail:", err);
  }

  if (!project) {
    project = (fallbackProjects.find((p) => p.slug?.current === slug) as unknown as ProjectData) || null;
    allProjects = fallbackProjects as unknown as ProjectData[];
  }

  if (!project) {
    notFound();
  }

  // Construct gallery images (Main cover + additional gallery items)
  const galleryImages: GalleryImage[] = [];

  if (project.coverImage) {
    const rawCoverUrl = urlFor(project.coverImage).auto("format").url();
    galleryImages.push({
      src: urlFor(project.coverImage).width(1200).height(675).auto("format").url(),
      previewSrc: rawCoverUrl,
      alt: (project.coverImage as any).alt || project.title,
    });
  }

  if (project.gallery && Array.isArray(project.gallery)) {
    project.gallery.forEach((img: any) => {
      if (img.asset || img._ref || img._type) {
        const rawUrl = urlFor(img).auto("format").url();
        galleryImages.push({
          src: urlFor(img).width(1200).height(675).auto("format").url(),
          previewSrc: rawUrl,
          alt: img.alt || `${project?.title} showcase`,
        });
      } else if (img.src) {
        galleryImages.push({
          src: img.src,
          previewSrc: img.previewSrc || img.src,
          alt: img.alt || `${project?.title} showcase`,
        });
      }
    });
  }

  // If no images at all, add default fallback
  if (galleryImages.length === 0) {
    const fallbackItem = (fallbackProjects as any).find((p: any) => p.slug?.current === slug);
    if (fallbackItem?.gallery && fallbackItem.gallery.length > 0) {
      galleryImages.push(...fallbackItem.gallery);
    } else {
      galleryImages.push({
        src: (project as any).imageSrc || "/example.jpg",
        alt: project.title,
      });
    }
  }

  // More Projects (Filter out current project, take up to 3)
  const moreProjects = allProjects
    .filter((p) => p.slug?.current !== slug)
    .slice(0, 3);

  return (
    <SubPageLayout profile={profile}>
      <article className="w-full flex flex-col">
        {/* Back Link */}
        <div className="mb-6">
          <BackButton href="/projects" label="Back to all projects" />
        </div>

        {/* Hero Header */}
        <header className="flex flex-col gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-brand-primary tracking-tight">
            {project.title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-brand-secondary leading-relaxed">
            {project.description}
          </p>

          {/* E-Commerce Style Image Gallery with Lightbox */}
          <div className="mt-4">
            <ProjectGallery images={galleryImages} title={project.title} />
          </div>
        </header>

        {/* Action Links (Live Preview & Source Code) */}
        {(project.projectUrl || project.githubUrl) && (
          <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-(--primary-color) text-container text-xs sm:text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer shadow-sm"
              >
                <span>Live Preview</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-container text-brand-primary border border-brand-border-container text-xs sm:text-sm font-semibold hover:border-brand-primary transition-colors cursor-pointer"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
                <span>Source Code</span>
              </a>
            )}
          </div>
        )}

        {/* Content Body - Single Rich Text portable text field */}
        <div className="w-full mt-8 md:mt-10">
          {project.content && project.content.length > 0 ? (
            <CustomPortableText value={project.content} />
          ) : (
            <div className="flex flex-col gap-6 text-brand-secondary text-[16px] md:text-[17px] leading-[1.85]">
              <p className="text-lg md:text-xl font-medium text-brand-primary leading-relaxed">
                {project.description} This project was engineered to deliver optimal performance, intuitive user experience, and robust frontend scalability.
              </p>
              <p>
                From interactive components to backend data integration, every layer is designed to maintain high code readability, seamless responsiveness across viewport sizes, and accessibility standard compliance.
              </p>
            </div>
          )}
        </div>

        {/* More Projects Section (replacing Next / Previous) */}
        {moreProjects.length > 0 && (
          <div className="mt-20 pt-10 border-t border-brand-border-container flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-brand-primary tracking-tight">
                More Projects
              </h2>
              <BackButton href="/projects" label="View all" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {moreProjects.map((p, idx) => {
                const imageSrc = p.coverImage
                  ? urlFor(p.coverImage).width(608).height(400).auto("format").url()
                  : (p as any).imageSrc || "/example.jpg";
                const href = p.slug?.current
                  ? `/projects/${p.slug.current}`
                  : p.projectUrl || "/projects";

                return (
                  <Card
                    key={p._id || `${p.title}-${idx}`}
                    imageSrc={imageSrc}
                    title={p.title}
                    description={p.description}
                    href={href}
                  />
                );
              })}
            </div>
          </div>
        )}
      </article>
    </SubPageLayout>
  );
}
