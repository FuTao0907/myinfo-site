/**
 * 简历页工作经历配置。
 */
export const RESUME_EXPERIENCES = [
  {
    // 公司或组织名称。
    organization: '北京翼海云峰科技有限公司（驻场知乎）',
    // 在该经历中的职位名称。
    title: '前端开发工程师',
    // 起止时间或在职时间范围。
    duration: '2025/05 - 2026/04',
    // 补充展示的地点或标签。
    badge: 'React Native / 鸿蒙',
    // 这一段经历的概述。
    summary:
      '参与知乎旗下盐言故事 App 鸿蒙端开发，负责 React Native 与鸿蒙原生混合架构下的内容消费链路模块建设。',
    // 这段经历下的关键工作亮点。
    highlights: [
      '开发「喜欢」模块 RN 端，构建统一收藏入口，按短篇、中长篇、看剧、出版、笔记、有声、书单等内容类型划分 Tab 布局。',
      '开发中长篇详情页 RN 组件，集成作品信息、章节目录、作者卡片、评分互动等核心区块，并与鸿蒙侧 ArkUI List 无缝拼接。',
      '开发中长篇尾页 RN 组件，集成相关推荐、评论入口转化等运营组件，对接推荐接口实现个性化内容推荐。',
      '使用 NativeModules 与鸿蒙原生层通信，完成 JS 侧与 ArkUI List 的数据传递及页面插入控制。',
      '基于统一接口聚合方案开发喜欢模块各 Tab，通过类型参数区分内容源，减少冗余请求。',
      '抽离通用卡片组件与请求逻辑，提升 RN 模块在多端场景下的复用率。',
    ],
  },
] as const

/**
 * 简历页技能分组配置。
 */
export const RESUME_SKILL_GROUPS = [
  // 前端框架与跨端技能。
  ['React', 'Vue.js', 'Next.js', 'React Native', 'ArkTS', 'uni-app'],
  // 语言与基础能力。
  ['TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'Electron'],
  // 构建与样式能力。
  ['Vite', 'Webpack', 'Sass', 'Less', 'Tailwind CSS', 'Styled Components'],
  // 状态管理与工程规范能力。
  ['Redux', 'Vuex', 'Zustand', 'Jotai', 'ESLint', 'Prettier'],
  // 工具链与基础设施能力。
  ['Git', 'MySQL'],
] as const

/**
 * 简历页项目经历配置。
 */
export const RESUME_PROJECTS = [
  {
    // 项目名称。
    name: '盐言故事（鸿蒙混合开发版）',
    // 项目中的职责角色。
    role: '前端开发工程师',
    // 项目时间范围。
    duration: '2025/05 - 2026/04',
    // 项目概述。
    summary:
      '参与盐言故事鸿蒙客户端混合架构开发，主导基于 React Native 的内容消费核心链路模块建设，通过 NativeModules 与鸿蒙原生层实现高效通信，保障长文本阅读与内容聚合场景下的跨端体验一致性。',
    // 项目亮点。
    highlights: [
      '负责 RN 端用户内容偏好聚合模块开发，构建统一收藏入口并完成多内容类型 Tab 布局与分页加载。',
      '开发中长篇故事详情页 RN 组件，配合 ArkUI List 渲染章节 WebView 内容，实现原生与 RN 页面无缝拼接。',
      '负责章节结束页 RN 开发，集成相关推荐与评论转化组件，完成阅读闭环与转化引导。',
    ],
  },
] as const

/**
 * 简历页教育经历配置。
 */
export const RESUME_EDUCATIONS = [
  {
    // 学校名称。
    school: '北京交通大学',
    // 专业名称。
    major: '计算机科学与技术',
    // 时间范围。
    duration: '至 2026/07',
  },
  {
    // 学校名称。
    school: '保定理工学院',
    // 专业名称。
    major: '大数据与会计',
    // 时间范围。
    duration: '2022/09 - 2025/07',
  },
] as const
