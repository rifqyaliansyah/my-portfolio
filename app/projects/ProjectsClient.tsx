"use client";

import { useState, useMemo } from "react";
import Card from "@/app/components/Card";
import { ProjectData } from "@/app/types/sanity";
import { urlFor } from "@/app/lib/sanity";

interface ProjectsClientProps {
  projects: ProjectData[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [selectedTag, setSelectedTag] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((p) => {
      p.tags?.forEach((t) => tagsSet.add(t));
    });
    return ["All", ...Array.from(tagsSet)];
  }, [projects]);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesTag =
        selectedTag === "All" || (project.tags && project.tags.includes(selectedTag));
      const matchesSearch =
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (project.tags && project.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
      return matchesTag && matchesSearch;
    });
  }, [projects, selectedTag, searchQuery]);

  return (
    <div className="w-full flex flex-col">
      {/* Search and Filter Controls */}
      <div className="mt-8 flex flex-col gap-4 w-full">
        {/* Full-width Search Input */}
        <div className="relative w-full">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-secondary opacity-60"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects or tools..."
            className="w-full pl-11 pr-4 py-3 text-[15px] rounded-2xl bg-surface-color border border-brand-border-container text-brand-primary placeholder:text-brand-secondary/60 focus:outline-none focus:border-brand-primary transition-colors shadow-xs"
          />
        </div>

        {/* Tag Pills (horizontal scroll on mobile) */}
        {allTags.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 scrollbar-none">
            {allTags.map((tag) => {
              const active = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                    active
                      ? "bg-(--primary-color) text-container shadow-sm"
                      : "bg-surface-color text-brand-secondary hover:text-brand-primary border border-brand-border-container/60"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Grid of Projects using unified Card component */}
      {filteredProjects.length > 0 ? (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const imageSrc = project.coverImage
              ? urlFor(project.coverImage).width(608).height(400).auto("format").url()
              : (project as any).imageSrc || "/example.jpg";
            const href = project.slug?.current
              ? `/projects/${project.slug.current}`
              : project.projectUrl || "/projects";

            return (
              <Card
                key={project._id || `${project.title}-${idx}`}
                imageSrc={imageSrc}
                title={project.title}
                description={project.description}
                href={href}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-20 flex flex-col items-center justify-center text-center">
          <p className="text-lg font-medium text-brand-primary">No projects found</p>
          <p className="mt-1 text-sm text-brand-secondary">
            Try adjusting your search query or filter tags.
          </p>
          <button
            onClick={() => {
              setSelectedTag("All");
              setSearchQuery("");
            }}
            className="mt-4 px-4 py-2 text-xs font-semibold rounded-lg bg-surface-color text-brand-primary border border-brand-border-container hover:border-brand-primary transition-colors cursor-pointer"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
