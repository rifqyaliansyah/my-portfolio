export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface SocialLink {
  _key?: string
  platform: 'x' | 'instagram' | 'threads' | 'linkedin' | 'youtube' | 'github' | string
  url: string
}

export interface ProfileHighlight {
  _key?: string
  icon?: string // e.g. 'briefcase', 'map-pin', 'send', 'sparkles'
  label: string
}

export interface ProfileData {
  _id: string
  name: string
  headline: string
  avatar?: SanityImage
  quickSkills: string[]
  heroPreviewImages?: SanityImage[]
  aboutHeadline?: string
  aboutBio?: string
  highlights?: ProfileHighlight[]
  email?: string
  githubUsername?: string
  socialLinks?: SocialLink[]
}

export interface ProjectData {
  _id: string
  title: string
  slug?: { current: string }
  description: string
  coverImage?: SanityImage
  tags?: string[]
  projectUrl?: string
  isFeatured?: boolean
  order?: number
}

export interface WritingData {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  description?: string
  coverImage?: SanityImage
  publishedAt?: string
  content?: any[]
  externalUrl?: string
}

export interface TestimonialData {
  _id: string
  name: string
  role: string
  quote: string
  avatar?: SanityImage
  order?: number
}

export interface ToolData {
  _id: string
  name: string
  category?: 'design' | 'development' | 'productivity' | string
  icon?: SanityImage
  websiteUrl?: string
  order?: number
}

export interface LandingPageData {
  profile: ProfileData | null
  featuredProjects: ProjectData[]
  allProjects?: ProjectData[]
  writings: WritingData[]
  testimonials: TestimonialData[]
  tools: ToolData[]
}
