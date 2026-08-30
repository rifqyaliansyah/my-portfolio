import { createClient } from '@sanity/client'
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '9cwe9njd',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01',
  useCdn: true,
})

const builder = createImageUrlBuilder(client)

/**
 * Helper untuk mengubah asset image Sanity menjadi URL gambar siap pakai
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}


