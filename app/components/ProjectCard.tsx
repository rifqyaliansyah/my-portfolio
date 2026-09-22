import Image from "next/image";
import Link from "next/link";
import { ProjectData } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const imageUrl = project.coverImage
    ? urlFor(project.coverImage).width(720).height(450).auto("format").url()
    : "/example.jpg";

  const href = project.slug?.current
    ? `/projects/${project.slug.current}`
    : project.projectUrl || "/projects";

  const isExternal = !project.slug?.current && (project.projectUrl?.startsWith("http://") || project.projectUrl?.startsWith("https://"));

  const cardContent = (
    <div className="group flex flex-col w-full h-full rounded-2xl p-3 sm:p-4 bg-surface-color border border-brand-border-container hover:border-brand-border-toggle transition-all duration-300 hover:shadow-md cursor-pointer">
      {/* Thumbnail Aspect Ratio 16:9 */}
      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden bg-container border border-brand-border-container/40">
        <Image
          src={imageUrl}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 mt-4 justify-between">
        <div>
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-[17px] md:text-[18px] font-semibold text-brand-primary group-hover:text-brand-primary transition-colors flex items-center gap-1.5">
              {project.title}
              <span className="text-[14px] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">
                ↗
              </span>
            </h3>
            {project.timeline && (
              <span className="text-[11px] font-mono text-brand-secondary shrink-0">
                {project.timeline}
              </span>
            )}
          </div>

          <p className="mt-2 text-[13px] md:text-[14px] leading-relaxed text-brand-secondary line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Tags */}
        {project.tags && project.tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5 pt-2 border-t border-brand-border-container/40">
            {project.tags.slice(0, 4).map((tag, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-container text-brand-secondary border border-brand-border-container/60"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 4 && (
              <span className="px-1.5 py-0.5 text-[11px] font-medium text-brand-secondary opacity-60">
                +{project.tags.length - 4}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block no-underline h-full"
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link href={href} className="block no-underline h-full">
      {cardContent}
    </Link>
  );
}
