export interface NavigationItem {
  label: string
  route: string
  sort: number
  isEnabled: boolean
}

export interface HomeCardItem {
  category: 'common' | 'custom'
  componentId: string
  x: number
  y: number
  w: number
  h: number
  index: number
  isEnabled: boolean
}

export interface SiteProfile {
  siteTitle: string
  authorName: string
  description: string
  profileContent: string
  keywords: string
  avatarUrl?: string
  heroImageUrl?: string
  iconUrl?: string
  location: {
    longitude: number
    latitude: number
  }
  email?: string
  cvUrl?: string
  juejinUrl?: string
  githubHome?: string
  githubId?: string
  twitterUrl?: string
  twitterId?: string
  notionUrl?: string
  weeklyUrl?: string
  homePage?: string
  profilePage?: string
  repo?: string
  consoleColorFulOutput?: string
}

export interface SiteConfig {
  siteProfile: SiteProfile
  navItems: NavigationItem[]
  homeCards: HomeCardItem[]
}

export interface ProjectItem {
  id: number
  slug: string
  name: string
  description: string
  coverUrl?: string
  demoUrl?: string
  repoUrl?: string
  sort: number
  isFeatured: boolean
  status: 'draft' | 'published'
}
