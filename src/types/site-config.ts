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
  /** 首页个人卡片展示的昵称。 */
  authorName: string
  /** 通用站点描述。 */
  description: string
  /** 首页个人卡片打字机文案。 */
  profileContent: string
  /** 站点关键词，简历页也会用于技能标签补充。 */
  keywords: string
  /** 首页个人卡片头像。 */
  avatarUrl?: string
  heroImageUrl?: string
  /** 站点通用图标。 */
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
