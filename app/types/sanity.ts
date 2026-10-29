export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
}

export interface QuickSkillItem {
  _key?: string
  name: string
  icon?: SanityImage
}

export interface SocialLink {
  _key?: string
  platform: 'x' | 'instagram' | 'threads' | 'linkedin' | 'youtube' | 'github' | string
  url: string
  customIcon?: SanityImage
}

export interface ProfileHighlight {
  _key?: string
  icon?: string // e.g. 'briefcase', 'map-pin', 'send', 'sparkles'
  label: string
}

export interface ProfileStat {
  _key?: string
  label: string
  value: number
  suffix?: string
}

export interface ProfileData {
  _id: string
  name: string
  headline: string
  avatar?: SanityImage
  quickSkills?: (QuickSkillItem | string)[]
  stats?: ProfileStat[]
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
  gallery?: SanityImage[]
  tags?: string[]
  projectUrl?: string
  githubUrl?: string
  content?: any[]
  isFeatured?: boolean
  order?: number
  publishedAt?: string
}

export interface WritingData {
  _id: string
  title: string
  slug?: { current: string }
  excerpt?: string
  description?: string
  coverImage?: SanityImage
  publishedAt?: string
  readingTime?: string
  tags?: string[]
  content?: any[]
  externalUrl?: string
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
  tools: ToolData[]
}