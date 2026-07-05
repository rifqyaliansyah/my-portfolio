import Image from 'next/image';

interface CardProps {
  imageSrc: string;
  title: string;
  description: string;
}

export default function Card({ imageSrc, title, description }: CardProps) {
  return (
    <div className="flex flex-col w-full group cursor-pointer">
      <div 
        className="relative w-full rounded-[12px] overflow-hidden transition-all duration-300 group-hover:opacity-90" 
        style={{ aspectRatio: '304/200', backgroundColor: 'var(--surface-color)' }}
      >
        <Image 
          src={imageSrc} 
          alt={title} 
          fill 
          className="object-cover transition-transform duration-500 group-hover:scale-105" 
        />
      </div>
      <h3 className="mt-[16px] text-left text-[16px] font-semibold text-brand-primary">
        {title}
      </h3>
      <p className="mt-[4px] text-left text-[12px] font-medium text-brand-secondary">
        {description}
      </p>
    </div>
  );
}
