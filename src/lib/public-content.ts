import {
  BENTO_COMMON_COMPONENTS,
  BENTO_CUSTOM_COMPONENTS,
  COMMON_ASSETS,
  HOME_PROFILE_CONFIG,
  HOME_ASSETS,
  NAV_ITEMS,
  PROJECTS,
  SITE_LINKS,
} from '@/lib/constants/content/index'
import { getAllPosts, getPostById as getLocalPostById } from '@/lib/helpers/posts'
import type { PostMeta } from '@/types/post'
import type { ProjectItem, SiteConfig, SiteProfile } from '@/types/site-config'

const API_BASE_URL =
  process.env.MYINFO_API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  'http://localhost:3001/api'

/** 构造前台读取后台接口的完整地址。 */
function buildApiUrl(path: string) {
  return `${API_BASE_URL}${path}`
}

/** 将本地常量转换为站点配置兜底数据。 */
function getFallbackSiteConfig(): SiteConfig {
  return {
    siteProfile: {
      siteTitle: HOME_PROFILE_CONFIG.title,
      authorName: HOME_PROFILE_CONFIG.author,
      description: HOME_PROFILE_CONFIG.description,
      profileContent: HOME_PROFILE_CONFIG.profileContent,
      keywords: HOME_PROFILE_CONFIG.keywords,
      avatarUrl: HOME_ASSETS.profileAvatar,
      iconUrl: COMMON_ASSETS.siteIcon,
      location: {
        longitude: HOME_PROFILE_CONFIG.coordinate[0],
        latitude: HOME_PROFILE_CONFIG.coordinate[1],
      },
      email: SITE_LINKS.mail,
      cvUrl: SITE_LINKS.cv,
      juejinUrl: SITE_LINKS.juejin,
      githubHome: SITE_LINKS.githubHome,
      githubId: SITE_LINKS.githubId,
      twitterUrl: SITE_LINKS.twitterUrl,
      twitterId: SITE_LINKS.twitterId,
      notionUrl: SITE_LINKS.notion,
      weeklyUrl: SITE_LINKS.weeklyUrl,
      homePage: SITE_LINKS.homePage,
      profilePage: SITE_LINKS.profilePage,
      repo: SITE_LINKS.repo,
      consoleColorFulOutput: HOME_PROFILE_CONFIG.consoleColorFulOutput,
    },
    navItems: NAV_ITEMS.map((item, index) => ({
      label: item.label,
      route: item.route,
      sort: index + 1,
      isEnabled: true,
    })),
    homeCards: [...BENTO_COMMON_COMPONENTS, ...BENTO_CUSTOM_COMPONENTS].map((item, index) => ({
      category: BENTO_COMMON_COMPONENTS.some((card) => card.id === item.id) ? 'common' : 'custom',
      componentId: item.id,
      x: item.x,
      y: item.y,
      w: item.w,
      h: item.h,
      index: item.index ?? index,
      isEnabled: true,
    })),
  }
}

/** 将后台文章数据转换为前台文章结构。 */
function mapApiPostToMeta(post: {
  slug: string
  title: string
  plainTitle: string
  publishedAt: string
  summary: string
  tags: string[]
  coverUrl?: string
  contentMarkdown: string
  type: 'blog' | 'daily'
  postIndex: number
}): PostMeta {
  return {
    id: post.slug,
    title: post.title,
    plainTitle: post.plainTitle,
    date: post.publishedAt,
    desc: post.summary,
    tags: post.tags,
    cover: post.coverUrl ?? '',
    content: post.contentMarkdown,
    isWeekly: post.type === 'daily',
    postIndex: post.postIndex,
  }
}

/** 将接口返回的站点字段合并到前台站点资料结构。 */
function mapSiteProfile(payload: Record<string, unknown>, fallback: SiteProfile): SiteProfile {
  return {
    ...fallback,
    siteTitle: typeof payload.siteTitle === 'string' ? payload.siteTitle : fallback.siteTitle,
    authorName: typeof payload.authorName === 'string' ? payload.authorName : fallback.authorName,
    description:
      typeof payload.description === 'string' ? payload.description : fallback.description,
    profileContent:
      typeof payload.profileContent === 'string' ? payload.profileContent : fallback.profileContent,
    keywords: typeof payload.keywords === 'string' ? payload.keywords : fallback.keywords,
    avatarUrl: typeof payload.avatarUrl === 'string' ? payload.avatarUrl : fallback.avatarUrl,
    heroImageUrl:
      typeof payload.heroImageUrl === 'string' ? payload.heroImageUrl : fallback.heroImageUrl,
    iconUrl: typeof payload.iconUrl === 'string' ? payload.iconUrl : fallback.iconUrl,
    location:
      typeof payload.location === 'object' &&
      payload.location !== null &&
      typeof (payload.location as { longitude?: unknown }).longitude === 'number' &&
      typeof (payload.location as { latitude?: unknown }).latitude === 'number'
        ? {
            longitude: (payload.location as { longitude: number }).longitude,
            latitude: (payload.location as { latitude: number }).latitude,
          }
        : fallback.location,
    email: typeof payload.email === 'string' ? payload.email : fallback.email,
    cvUrl: typeof payload.cvUrl === 'string' ? payload.cvUrl : fallback.cvUrl,
    juejinUrl: typeof payload.juejinUrl === 'string' ? payload.juejinUrl : fallback.juejinUrl,
    githubHome: typeof payload.githubHome === 'string' ? payload.githubHome : fallback.githubHome,
    githubId: typeof payload.githubId === 'string' ? payload.githubId : fallback.githubId,
    twitterUrl: typeof payload.twitterUrl === 'string' ? payload.twitterUrl : fallback.twitterUrl,
    twitterId: typeof payload.twitterId === 'string' ? payload.twitterId : fallback.twitterId,
    notionUrl: typeof payload.notionUrl === 'string' ? payload.notionUrl : fallback.notionUrl,
    weeklyUrl: typeof payload.weeklyUrl === 'string' ? payload.weeklyUrl : fallback.weeklyUrl,
    homePage: typeof payload.homePage === 'string' ? payload.homePage : fallback.homePage,
    profilePage:
      typeof payload.profilePage === 'string' ? payload.profilePage : fallback.profilePage,
    repo: typeof payload.repo === 'string' ? payload.repo : fallback.repo,
    consoleColorFulOutput:
      typeof payload.consoleColorFulOutput === 'string'
        ? payload.consoleColorFulOutput
        : fallback.consoleColorFulOutput,
  }
}

/** 从后台读取站点配置，失败时回退本地常量。 */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const fallbackConfig = getFallbackSiteConfig()
    const response = await fetch(buildApiUrl('/public/site/config'), {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error('site config request failed')
    }

    const payload = (await response.json()) as {
      navItems?: Array<{ label: string; route: string; sort: number; isEnabled: boolean }>
      homeCards?: Array<{
        category: 'common' | 'custom'
        componentId: string
        x: number
        y: number
        w: number
        h: number
        index: number
        isEnabled: boolean
      }>
      [key: string]: unknown
    }

    return {
      siteProfile: mapSiteProfile(payload, fallbackConfig.siteProfile),
      navItems: payload.navItems ?? fallbackConfig.navItems,
      homeCards: payload.homeCards ?? fallbackConfig.homeCards,
    }
  } catch {
    return getFallbackSiteConfig()
  }
}

/** 从后台读取项目列表，失败时回退本地常量。 */
export async function getProjects(): Promise<ProjectItem[]> {
  try {
    const response = await fetch(buildApiUrl('/public/projects'), {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error('projects request failed')
    }

    return (await response.json()) as ProjectItem[]
  } catch {
    return PROJECTS.map((project, index) => ({
      id: index + 1,
      slug: project.name.toLowerCase().replace(/\s+/g, '-'),
      name: project.name,
      description: project.desc,
      coverUrl: project.cover,
      demoUrl: project.demoUrl,
      repoUrl: project.repoUrl,
      sort: index + 1,
      isFeatured: index < 2,
      status: 'published',
    }))
  }
}

/** 从后台读取文章列表，失败时回退本地 Markdown。 */
export async function getPostsByType(type: 'blog' | 'daily'): Promise<PostMeta[]> {
  try {
    const response = await fetch(buildApiUrl(`/public/posts?type=${type}`), {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error('posts request failed')
    }

    const payload = (await response.json()) as {
      list?: Array<{
        slug: string
        title: string
        plainTitle: string
        publishedAt: string
        summary: string
        tags: string[]
        coverUrl?: string
        contentMarkdown: string
        type: 'blog' | 'daily'
        postIndex: number
      }>
    }

    return (payload.list ?? []).map(mapApiPostToMeta)
  } catch {
    return getAllPosts().filter((post) => post.isWeekly === (type === 'daily'))
  }
}

/** 从后台读取文章详情，失败时回退本地 Markdown。 */
export async function getPostDetail(slug: string): Promise<PostMeta | undefined> {
  try {
    const response = await fetch(buildApiUrl(`/public/posts/${encodeURIComponent(slug)}`), {
      next: { revalidate: 30 },
    })

    if (!response.ok) {
      throw new Error('post request failed')
    }

    const payload = (await response.json()) as {
      slug: string
      title: string
      plainTitle: string
      publishedAt: string
      summary: string
      tags: string[]
      coverUrl?: string
      contentMarkdown: string
      type: 'blog' | 'daily'
      postIndex: number
    }

    return mapApiPostToMeta(payload)
  } catch {
    return getLocalPostById(slug)
  }
}
