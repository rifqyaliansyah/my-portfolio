import { PortableText, PortableTextComponents } from '@portabletext/react';
import { urlFor } from '@/app/lib/sanity';
import CodeBlock from './CodeBlock';

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(1200).auto('format').url()}
            alt={value.alt || 'Article visual'}
            className="rounded-2xl w-full object-cover border border-brand-border-container shadow-sm"
          />
          {value.caption && (
            <figcaption className="text-center text-xs md:text-sm text-brand-secondary mt-2.5 italic">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => {
      return (
        <CodeBlock
          code={value?.code || ''}
          language={value?.language || 'typescript'}
          filename={value?.filename}
        />
      );
    },
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-brand-primary underline underline-offset-4 decoration-(--border-toggle-color) hover:decoration-(--primary-color) transition-colors font-medium"
        >
          {children}
        </a>
      );
    },
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 rounded-md bg-brand-border-container/40 text-brand-primary font-mono text-[13px] border border-brand-border-container/60">
        {children}
      </code>
    ),
    strong: ({ children }) => <strong className="font-semibold text-brand-primary">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
  block: {
    normal: ({ children }) => (
      <p className="my-4 text-[15px] md:text-[17px] leading-[1.8] text-brand-secondary">
        {children}
      </p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-10 mb-4 text-brand-primary tracking-tight">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mt-8 mb-3 text-brand-primary tracking-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg sm:text-xl md:text-2xl font-semibold mt-6 mb-2 text-brand-primary tracking-tight">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-3 border-(--primary-color) pl-5 py-1 my-6 italic text-[16px] md:text-[18px] text-brand-secondary bg-surface rounded-r-xl">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-outside pl-6 my-4 space-y-2 text-[15px] md:text-[17px] leading-[1.8] text-brand-secondary">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-outside pl-6 my-4 space-y-2 text-[15px] md:text-[17px] leading-[1.8] text-brand-secondary">
        {children}
      </ol>
    ),
  },
};

export default function CustomPortableText({ value }: { value: any }) {
  if (!value) return null;
  return <PortableText value={value} components={components} />;
}
