import resumePortraitAsset from '@/assets/avthor.jpg'

/**
 * 站点通用资源配置。
 */
export const COMMON_ASSETS = {
  // 站点通用图标，主要用于站点基础信息和图标兜底。
  siteIcon: '/logo.png',
  // 顶部导航使用的 logo 资源。
  headerLogo: '/logo.svg',
  // 文章缺少封面时的默认封面图。
  defaultPostCover:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  // 项目缺少封面时的默认封面图。
  defaultProjectCover:
    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
} as const

/**
 * 首页资源配置。
 */
export const HOME_ASSETS = {
  // 首页个人卡片默认头像。
  profileAvatar: '/logo.png',
  // 首页头像加载失败时使用的兜底图片。
  profileAvatarFallbackEmoji:
    'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Partying%20Face.png',
  // 周刊卡片背景图。
  weeklyBackground: '/wrap-bg.svg',
  // 周刊卡片插画图。
  weeklyIllustration: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/imagesweekly.webp',
  // 飞机视角卡片大图。
  planeViewImage:
    'https://images.unsplash.com/photo-1570885865089-6627ac32a60a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
} as const

/**
 * 简历页资源配置。
 */
export const RESUME_ASSETS = {
  // 简历页使用的人像照片。
  portrait: resumePortraitAsset.src,
} as const

/**
 * 外部链接与可跳转入口配置。
 */
export const SITE_LINKS = {
  // 首页简历按钮默认跳转的站内简历页地址。
  cv: '/resume',
  // 掘金主页链接。
  juejin: 'https://juejin.cn/user/3717863307480972/posts',
  // 联系邮箱，支持纯邮箱或 mailto 链接。
  mail: '18010031387@163.com',
  // 站点首页路由。
  homePage: '/',
  // 个人资料页路由。
  profilePage: '/profile',
  // GitHub 用户名。
  githubId: 'pinky-pig',
  // Twitter 用户名。
  twitterId: 'Ango nWang',
  // Twitter 主页链接。
  twitterUrl: 'https://twitter.com/Ango nWang',
  // GitHub 主页链接。
  githubHome: 'https://github.com/pinky-pig',
  // 周刊外部地址。
  weeklyUrl: 'https://weekly.mmeme.me/',
  // 项目源码仓库入口。
  repo: 'https://github.com/pinky-pig/what-is-my-astro-blog',
  // Notion 资料页链接。
  notion:
    'https://hail-manatee-fc5.notion.site/a3d8b723782e48a3b3570980e83c70ae?v=0c510fa996e2492b943e7746c1bd9974',
  // 文章详情页底部跳转的 GitHub 主页链接。
  articleGithubHome: 'https://github.com/pinky-pig',
} as const

/**
 * 首页与站点通用资料配置。
 */
export const HOME_PROFILE_CONFIG = {
  // 站点标题，主要用于首页和导航标题展示。
  title: 'Ango的空间',
  // 首页个人卡片展示的昵称。
  author: 'Ango',
  // 站点简介描述。
  description: '记录 Ango 的不枯燥生活',
  // 首页个人卡片打字机内容。
  profileContent: '我是 Ango，目前生活在北京的开发者。我很喜欢 React、Next.js，目前从事前端开发。',
  // 站点关键词，兼用于部分页面标签展示。
  keywords: 'Ango, Blog, 前端, React, Next.js, TypeScript',
  // 默认经纬度坐标，用于地图卡片兜底定位。
  coordinate: [116.4074, 39.9042] as const,
  // 控制台彩蛋输出内容。
  consoleColorFulOutput:
    "%cDon't ignore your dreams \\nDon't work too much \\nsay what you think \\ncultivate friendships \\nbe happy~ ",
} as const

/**
 * 简历页专用资料配置。
 */
export const RESUME_PROFILE_CONFIG = {
  // 简历页显示的真实姓名。
  name: '陈仪明',
  // 个人职业标题。
  role: '前端开发工程师',
  // 当前求职状态。
  status: '离职',
  // 联系电话。
  phone: '18010031387',
  // 页面展示用的城市标签。
  locationLabel: '北京市朝阳区',
  // 个人网站地址。
  websiteUrl: 'https://plihia093.ink',
  // 个人网站展示文案。
  websiteLabel: '个人网站',
  // 简历页个人简介摘要。
  summary:
    '聚焦前端工程与跨端开发，主力技术栈覆盖 React、TypeScript、Vue.js、Next.js 与 React Native，具备鸿蒙混合开发、工程化建设和复杂内容消费场景落地经验。',
} as const

/**
 * 顶部导航配置。
 */
export const NAV_ITEMS = [
  {
    // 导航显示名称。
    label: '首页',
    // 导航跳转路由。
    route: '/',
  },
  {
    // 导航显示名称。
    label: '文章',
    // 导航跳转路由。
    route: '/blog',
  },
  {
    // 导航显示名称。
    label: '日常',
    // 导航跳转路由。
    route: '/daily',
  },
  {
    // 导航显示名称。
    label: '项目',
    // 导航跳转路由。
    route: '/project',
  },
] as const

/**
 * 首页 Bento 布局基础卡片配置。
 */
export const BENTO_COMMON_COMPONENTS = [
  {
    // 卡片组件唯一标识。
    id: 'Profile',
    // 卡片在网格中的横向起始坐标。
    x: 0,
    // 卡片在网格中的纵向起始坐标。
    y: 0,
    // 卡片占用列数。
    w: 2,
    // 卡片占用行数。
    h: 2,
    // 卡片排序索引。
    index: 0,
  },
  {
    // 卡片组件唯一标识。
    id: 'Dark',
    // 卡片在网格中的横向起始坐标。
    x: 2,
    // 卡片在网格中的纵向起始坐标。
    y: 0,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 1,
  },
  {
    // 卡片组件唯一标识。
    id: 'Mapbox',
    // 卡片在网格中的横向起始坐标。
    x: 3,
    // 卡片在网格中的纵向起始坐标。
    y: 0,
    // 卡片占用列数。
    w: 2,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 2,
  },
  {
    // 卡片组件唯一标识。
    id: 'CountDown',
    // 卡片在网格中的横向起始坐标。
    x: 3,
    // 卡片在网格中的纵向起始坐标。
    y: 1,
    // 卡片占用列数。
    w: 2,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 3,
  },
  {
    // 卡片组件唯一标识。
    id: 'PageTransition',
    // 卡片在网格中的横向起始坐标。
    x: 5,
    // 卡片在网格中的纵向起始坐标。
    y: 1,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 4,
  },
  {
    // 卡片组件唯一标识。
    id: 'PlaneView',
    // 卡片在网格中的横向起始坐标。
    x: 0,
    // 卡片在网格中的纵向起始坐标。
    y: 2,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 2,
    // 卡片排序索引。
    index: 5,
  },
] as const

/**
 * 首页 Bento 布局自定义卡片配置。
 */
export const BENTO_CUSTOM_COMPONENTS = [
  {
    // 卡片组件唯一标识。
    id: 'StrokeText',
    // 卡片在网格中的横向起始坐标。
    x: 2,
    // 卡片在网格中的纵向起始坐标。
    y: 1,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 6,
  },
  {
    // 卡片组件唯一标识。
    id: 'Sticker8',
    // 卡片在网格中的横向起始坐标。
    x: 5,
    // 卡片在网格中的纵向起始坐标。
    y: 0,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 1,
    // 卡片排序索引。
    index: 7,
  },
  {
    // 卡片组件唯一标识。
    id: 'Cover',
    // 卡片在网格中的横向起始坐标。
    x: 1,
    // 卡片在网格中的纵向起始坐标。
    y: 2,
    // 卡片占用列数。
    w: 1,
    // 卡片占用行数。
    h: 2,
    // 卡片排序索引。
    index: 8,
  },
] as const

/**
 * 高德地图客户端配置。
 */
export const AMAP_SETTINGS = {
  // 高德地图公开 Key。
  key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
  // 高德地图安全密钥。
  securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE || '',
  // 浅色主题地图样式。
  mapLightStyle: 'amap://styles/macaron',
  // 深色主题地图样式。
  mapDarkStyle: 'amap://styles/dark',
} as const
