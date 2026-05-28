/**
 * 站点级基础信息。
 */
export const SITE = {
  title: 'Ango的空间',
  author: 'Ango ',
  description: '记录 Ango  的不枯燥生活',
  profileContent: '我是Ango ，目前生活在北京的开发者。我很喜欢 React、NextJs。目前从事前端开发',
  keywords: 'Ango , Blog, 前端, React, 博客',
  coordinate: [116.4074, 39.9042],
  icon: '/public/philia093.png',
  pic: '',
  cv: '',
  juejin: 'https://juejin.cn/user/3717863307480972/posts',
  mail: '18010031387@163.com',
  homePage: '/',
  profilePage: '/profile',
  twitterId: 'Ango nWang',
  twitterUrl: 'https://twitter.com/Ango nWang',
  githubId: 'pinky-pig',
  githubHome: 'https://github.com/pinky-pig',
  weeklyUrl: 'https://weekly.mmeme.me/',
  repo: 'pinky-pig/what-is-my-astro-blog',
  notion:
    'https://hail-manatee-fc5.notion.site/a3d8b723782e48a3b3570980e83c70ae?v=0c510fa996e2492b943e7746c1bd9974',
  consoleColorFulOutput:
    "%cDon't ignore your dreams \\nDon't work too much \\nsay what you think \\ncultivate friendships \\nbe happy~ ",
} as const

/**
 * 顶部导航配置。
 */
export const NAV_ITEMS = [
  { label: '首页', route: '/' },
  { label: '文章', route: '/blog' },
  { label: '日常', route: '/daily' },
  { label: '项目', route: '/project' },
] as const

/**
 * 首页 Bento 布局基础卡片配置。
 */
export const BENTO_COMMON_COMPONENTS = [
  { id: 'Profile', x: 0, y: 0, w: 2, h: 2, index: 0 },
  { id: 'Dark', x: 2, y: 0, w: 1, h: 1, index: 1 },
  { id: 'Mapbox', x: 3, y: 0, w: 2, h: 1, index: 2 },
  { id: 'CountDown', x: 3, y: 1, w: 2, h: 1, index: 3 },
  { id: 'PageTransition', x: 5, y: 1, w: 1, h: 1, index: 4 },
  { id: 'PlaneView', x: 0, y: 2, w: 1, h: 2, index: 5 },
] as const

/**
 * 首页 Bento 布局自定义卡片配置。
 */
export const BENTO_CUSTOM_COMPONENTS = [
  { id: 'StrokeText', x: 2, y: 1, w: 1, h: 1, index: 6 },
  { id: 'Sticker8', x: 5, y: 0, w: 1, h: 1, index: 7 },
  { id: 'Cover', x: 1, y: 2, w: 1, h: 2, index: 8 },
] as const

/**
 * 项目页卡片配置。
 */
export const PROJECTS = [
  {
    name: 'Ango ',
    desc: '个人网站',
    cover: 'https://cdn.jsdelivr.net/gh/pinky-pig/pic-bed/images20230625154539.png',
    demoUrl: '',
    repoUrl: 'https://github.com/pinky-pig/Ango ',
  },
] as const

/**
 * 高德地图客户端配置。
 */
export const AMAP_SETTINGS = {
  key: process.env.NEXT_PUBLIC_AMAP_KEY || '',
  securityJsCode: process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE || '',
  mapLightStyle: 'amap://styles/macaron',
  mapDarkStyle: 'amap://styles/dark',
} as const
