export const PROFILE_QUERY = `
  *[_type == "profile"][0] {
    _id,
    name,
    headline,
    avatar,
    quickSkills[] {
      _key,
      name,
      icon
    },
    heroPreviewImages,
    aboutHeadline,
    aboutBio,
    highlights,
    email,
    githubUsername,
    socialLinks[] {
      _key,
      platform,
      url,
      customIcon
    }
  }
`

export const FEATURED_PROJECTS_QUERY = `
  *[_type == "project" && isFeatured == true] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    projectUrl,
    isFeatured,
    order
  }
`

export const ALL_PROJECTS_QUERY = `
  *[_type == "project"] | order(order asc, _createdAt desc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    projectUrl,
    isFeatured,
    order
  }
`

export const PROJECT_BY_SLUG_QUERY = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    projectUrl,
    isFeatured,
    order
  }
`

export const WRITINGS_QUERY = `
  *[_type == "writing"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    externalUrl
  }
`

export const WRITING_BY_SLUG_QUERY = `
  *[_type == "writing" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    content,
    externalUrl
  }
`

export const TESTIMONIALS_QUERY = `
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    quote,
    avatar,
    order
  }
`

export const TOOLS_QUERY = `
  *[_type == "tool"] | order(order asc, _createdAt asc) {
    _id,
    name,
    category,
    icon,
    websiteUrl,
    order
  }
`

export const LANDING_PAGE_QUERY = `
{
  "profile": *[_type == "profile"][0] {
    _id,
    name,
    headline,
    avatar,
    quickSkills[] {
      _key,
      name,
      icon
    },
    heroPreviewImages,
    aboutHeadline,
    aboutBio,
    highlights,
    email,
    githubUsername,
    socialLinks[] {
      _key,
      platform,
      url,
      customIcon
    }
  },
  "featuredProjects": *[_type == "project" && isFeatured == true] | order(order asc) {
    _id,
    title,
    slug,
    description,
    coverImage,
    tags,
    projectUrl,
    order
  },
  "writings": *[_type == "writing"] | order(publishedAt desc)[0...4] {
    _id,
    title,
    slug,
    excerpt,
    coverImage,
    publishedAt,
    externalUrl
  },
  "testimonials": *[_type == "testimonial"] | order(order asc) {
    _id,
    name,
    role,
    quote,
    avatar,
    order
  },
  "tools": *[_type == "tool"] | order(order asc) {
    _id,
    name,
    category,
    icon,
    websiteUrl,
    order
  }
}
`
