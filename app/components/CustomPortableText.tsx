import { PortableText, PortableTextComponents } from '@portabletext/react'
import { urlFor } from '@/app/lib/sanity'
import Image from 'next/image'

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-6">
          <img
            src={urlFor(value).width(900).auto('format').url()}
            alt={value.alt || 'Article Image'}
            className="rounded-xl w-full object-cover shadow-md"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-brand-secondary mt-2">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-brand-primary underline hover:opacity-80 transition"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h1: ({ children }) => <h1 className="text-3xl font-bold mt-8 mb-4 text-brand-primary">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-bold mt-6 mb-3 text-brand-primary">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold mt-4 mb-2 text-brand-primary">{children}</h3>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-brand-border-container pl-4 italic my-4 text-brand-secondary">
        {children}
      </blockquote>
    ),
  },
}

export default function CustomPortableText({ value }: { value: any }) {
  if (!value) return null
  return <PortableText value={value} components={components} />
}
