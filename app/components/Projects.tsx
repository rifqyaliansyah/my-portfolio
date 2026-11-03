import Title from './Title';
import Card from './Card';
import EmptyState from './EmptyState';
import { ProjectData } from '@/app/types/sanity';
import { urlFor } from '@/app/lib/sanity';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface ProjectsProps {
  projects?: ProjectData[];
}

export default function Projects({ projects }: ProjectsProps) {
  const list = (projects ?? []).map((p, i) => ({
    id: p._id || `${i + 1}`,
    imageSrc: p.coverImage ? urlFor(p.coverImage).width(608).height(400).auto('format').url() : undefined,
    title: p.title,
    description: p.description,
    href: p.slug?.current ? `/projects/${p.slug.current}` : (p.projectUrl || '/projects'),
  }));

  return (
    <section id="projects" className="mt-32 w-full flex flex-col">
      <Title 
        title="Featured Projects" 
        href="/projects" 
        buttonLabel="View all"
        icon={<ArrowIcon />} 
      />
      
      {list.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.slice(0, 6).map((project) => (
            <Card 
              key={project.id}
              imageSrc={project.imageSrc}
              title={project.title}
              description={project.description}
              href={project.href}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          className="mt-6"
          title="No featured projects yet"
          description="Featured projects will appear here once they are published."
        />
      )}
    </section>
  );
}
