import Title from './Title';
import Card from './Card';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const writingData = [
  {
    id: 1,
    imageSrc: '/example.jpg',
    title: 'The Future of UI Design in 2024',
    description: 'Exploring upcoming trends in user interface design and how to prepare for them.',
  },
  {
    id: 2,
    imageSrc: '/example.jpg',
    title: 'Building Accessible Web Applications',
    description: 'A comprehensive guide to ensuring your web apps are usable by everyone.',
  },
  {
    id: 3,
    imageSrc: '/example.jpg',
    title: 'Mastering Micro-interactions',
    description: 'How small animations can make a huge impact on user experience.',
  },
];

export default function Writing() {
  return (
    <section className="mt-[128px] w-full flex flex-col">
      <Title 
        title="Writing" 
        href="#writing" 
        buttonLabel="View Writing"
        icon={<ArrowIcon />} 
      />
      
      <div className="mt-[24px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[24px]">
        {writingData.slice(0, 3).map((article) => (
          <Card 
            key={article.id}
            imageSrc={article.imageSrc}
            title={article.title}
            description={article.description}
          />
        ))}
      </div>
    </section>
  );
}
