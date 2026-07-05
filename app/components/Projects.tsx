import Title from './Title';
import Card from './Card';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const projectsData = [
  {
    id: 1,
    imageSrc: '/example.jpg',
    title: 'E-commerce Redesign',
    description: 'A complete overhaul of the user experience for a leading e-commerce platform.',
  },
  {
    id: 2,
    imageSrc: '/example.jpg',
    title: 'Fintech Mobile App',
    description: 'Designing a seamless banking experience for the new generation.',
  },
  {
    id: 3,
    imageSrc: '/example.jpg',
    title: 'Healthcare Dashboard',
    description: 'Simplifying complex medical data into intuitive visual interfaces.',
  },
  {
    id: 4,
    imageSrc: '/example.jpg',
    title: 'Real Estate Platform',
    description: 'Connecting buyers and sellers through an immersive property search.',
  },
  {
    id: 5,
    imageSrc: '/example.jpg',
    title: 'Travel Booking Site',
    description: 'A sleek and modern interface for booking flights and accommodations.',
  },
];

export default function Projects() {
  return (
    <section className="mt-32 w-full flex flex-col">
      <Title 
        title="Featured Projects" 
        href="#projects" 
        buttonLabel="View all"
        icon={<ArrowIcon />} 
      />
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectsData.slice(0, 5).map((project) => (
          <Card 
            key={project.id}
            imageSrc={project.imageSrc}
            title={project.title}
            description={project.description}
          />
        ))}
      </div>
    </section>
  );
}
