import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
  href?: string;
}

export default function Card({ imageSrc, title, description, href }: CardProps) {
  const content = (
    <div className="flex flex-col w-full group cursor-pointer">
      <div 
        className="relative w-full rounded-xl overflow-hidden transition-all duration-300 group-hover:opacity-90" 
        style={{ aspectRatio: '304/200', backgroundColor: 'var(--surface-color)' }}
      >
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <h3 className="mt-4 text-left text-[16px] font-semibold text-brand-primary">
        {title}
      </h3>
      <p className="mt-1 text-left text-[12px] font-medium text-brand-secondary">
        {description}
      </p>
    </div>
  );

  if (href && href !== '#' && href !== '#projects' && href !== '#writing') {
    const isExternal = href.startsWith('http://') || href.startsWith('https://');
    return (
      <a 
        href={href} 
        target={isExternal ? '_blank' : undefined} 
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className="block no-underline text-inherit"
      >
        {content}
      </a>
    );
  }

  return content;
}

