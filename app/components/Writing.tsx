import Title from './Title';
import Card from './Card';
import { WritingData } from '@/app/types/sanity';
import { urlFor } from '@/app/lib/sanity';
import { fallbackWritings } from '@/app/lib/fallback-data';

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

interface WritingProps {
  writings?: WritingData[];
}

export default function Writing({ writings }: WritingProps) {
  const list = writings && writings.length > 0
    ? writings.map((w, i) => ({
      id: w._id || `${i + 1}`,
      imageSrc: w.coverImage ? urlFor(w.coverImage).width(608).height(400).auto('format').url() : '/example.jpg',
      title: w.title,
      description: w.excerpt || w.description || '',
      href: w.externalUrl || (w.slug?.current ? `/writing/${w.slug.current}` : '#writing'),
    }))
    : fallbackWritings;

  return (
    <section id="writing" className="mt-32 w-full flex flex-col">
      <Title 
        title="Writing" 
        href="#writing" 
        buttonLabel="View Writing"
        icon={<ArrowIcon />} 
      />
      
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {list.slice(0, 3).map((article) => (
          <Card 
            key={article.id}
            imageSrc={article.imageSrc}
            title={article.title}
            description={article.description}
            href={article.href}
          />
        ))}
      </div>
    </section>
  );
}

