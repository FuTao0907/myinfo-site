# 开发日志 (Development Log)

### 3. 代码结构与路由解耦（消除视图与路由的混用）

- **背景**：在初步重构时，路由组件（`src/app/.../page.tsx`）直接导入了 `src/views` 目录下的页面组件。这不仅导致了不必要的目录层级，还混淆了客户端与服务端组件的职责。
- **解决方案**：
  - 将 `src/views/Project.tsx` 的代码直接合并至 `src/app/project/page.tsx`（因为不依赖 `fs`，完全作为客户端组件）。
  - 将 `src/views/Blog.tsx` 和 `src/views/Daily.tsx` 提取并重命名为 `BlogClient.tsx` 和 `DailyClient.tsx`，与对应的路由 `page.tsx` 实现了**文件共置（Colocation）**。
  - 将公共视图 `src/views/Post.tsx` 提取至专门的 `src/components/blog/PostClient.tsx`。
  - 彻底删除了旧版架构遗留的 `src/views` 目录，极大地提升了目录架构的内聚性与清晰度。

## 2026-05-15 更新 (傍晚) - 底层架构向 Next.js 的史诗级迁移

### 1. 彻底推翻 Vite 架构，拥抱 Next.js App Router

- **背景**：为了彻底解决 Markdown 中自定义组件（如 `<Message>`）的解析问题，以及获得极致的 SEO 和 SSR 静态生成能力，决定将项目从 **Vite + React Router** 迁移至 **Next.js 15 (App Router)**。
- **路由重构**：删除了 `react-router-dom`，使用 `src/app` 约定式路由重建了 `/`、`/blog`、`/daily`、`/project` 等基础页面。使用 `next/link` 替换了所有 `<Link to>` 标签。
- **数据流重构 (Node.js 替代 Vite 宏)**：彻底废弃了原先依赖 Vite 客户端宏的 `import.meta.glob`。重写了 `posts.ts` 引擎，使用 Node.js 原生的 `fs.readFileSync` 和 `fs.readdirSync` 在服务端（构建时）递归读取本地 `.md` 文件，配合 `gray-matter` 解析 Frontmatter，实现了真正的静态预渲染。
- **Client / Server Components 分离**：根据组件是否依赖 React Hooks 或浏览器 API，精准注入了 `"use client"` 指令（如 `Nav.tsx`、`Post.tsx`），保证了 Next.js 的水合(Hydration)过程不报错。

### 2. Framer Motion 与 Next.js 路由的深度融合

- **背景**：在卸载了 React Router 后，原先写在 `App.tsx` 中的 `<AnimatePresence>` 全局路由过渡动画随之失效。
- **解决方案**：利用 Next.js 特有的 `template.tsx` 机制，结合 `usePathname` 作为 `motion.div` 的唯一 `key`，完美复刻了包括 `page`、`fade`、`translateY` 在内的三种页面切换动画，实现了服务端路由体系下的客户端丝滑过渡。

## 2026-05-15 更新 (下午)

### 1. 深度解决 Fixed 降级与动画冲突

- **背景**：当在 `App.tsx` 的路由切换动画 (`AnimatePresence`) 中使用了 `filter: blur()` 模糊特效时，导致了 CSS 标准中的“降级现象”——所有内部 `position: fixed` 的元素都被强制降级为基于该动画容器的绝对定位，使得“回到顶部”按钮和“悬浮目录”全部被挤压至容器最底部。
- **解决方案**：移除了全局路由切换中产生副作用的 `filter: blur`，改用纯净安全的透明度 (`opacity`) 动画。这彻底解放了 `fixed` 定位，使其回归基于浏览器视口的绝对固定。

### 2. 目录跟随与滚动计算重构

- **背景**：之前的滚动计算依赖于 `element.offsetTop` 或 `nav.scrollBy()`，在 DOM 嵌套层级和频繁触发的情况下极易产生严重的累积误差，导致目录“定死”不滚动。
- **解决方案**：
  - 为每一个生成的目录项注入绝对唯一的 `id` 属性。
  - 使用底层物理坐标 API `getBoundingClientRect()` 计算目标元素和滚动容器边界差值。
  - 推导并使用了绝对安全的滚动公式：`targetScrollTop = nav.scrollTop + (elRect.top - navRect.top) - nav.clientHeight / 2 + elRect.height / 2`。
  - 修复了 `isClickingToc` 互斥锁无法释放导致滚动永久死机的极端边缘问题。

### 3. Portal 挂载带来的组件卸载同步问题

- **背景**：之前为了规避 Fixed 降级，曾尝试将目录通过 `createPortal` 挂载到全局 `body` 上。但这导致它们脱离了 React Router 和 Framer Motion 的组件树生命周期，当退出文章页面时，过渡动画（Exit Animation）彻底失效。
- **解决方案**：在第一步修复了 Fixed 降级的前提下，果断废弃 `createPortal`，将组件重新置于 `Post.tsx` 的 `<AnimatePresence>` 节点内，完美恢复了目录与主页面同步退出的丝滑过渡动画。

---

## 2026-05-15 更新 (上午)

### 1. 博客模块与日常模块拆分解耦

- **数据源分离**：通过 `isWeekly` 属性将原先混合在一起的 Markdown 文件拆分为 `REGULAR_POSTS` (技术文章) 与 `WEEKLY_POSTS` (周刊/日常)。
- **独立路由与页面**：为“日常”模块新建了独立的 `/daily` 路由与 `Daily.tsx` 页面，并在顶部导航栏 `Nav.tsx` 中补充了入口。
- **动态返回逻辑**：修复了文章详情页 (`Post.tsx`) 的 `cd ..` 返回按钮，现在会根据当前渲染的文章属性，智能返回至 `/blog` 或 `/daily`。

### 2. Markdown 渲染引擎强化

- **清理无效标签**：增加了预处理正则表达式机制，自动清理了原 Vue 版特有的 `[[toc]]` 目录标签，防止其作为乱码渲染在正文中。
- **代码块美化与增强**：
  - 重构了 Markdown 渲染器中的 `CodeBlock` 组件，完善了 TypeScript 类型定义。
  - 优化了暗黑模式下代码块的背景色 (`rgba(48, 54, 61, 0.4)`) 和边框对比度，使其更柔和护眼。
  - 为所有代码块添加了基于 `navigator.clipboard` 的“一键复制” (Copy) 功能。

### 3. 数据解析与文件排序修复

- **Buffer 兼容性修复**：通过配置 Vite 的 `vite-plugin-node-polyfills` 注入了 Node 原生 `Buffer`，彻底解决了 `gray-matter` 在浏览器端解析 Frontmatter 报错的问题。
- **序号提取与精准排序**：针对大量文章 Frontmatter 中 `date` 字段相同导致的列表乱序问题，重构了排序逻辑。现在利用正则 `match(/^(\d+)-(.+)$/)` 提取文件名的开头数字作为 `postIndex` 主键进行降序排列，彻底修复了错乱问题。
- **隐藏模板文件**：在 glob 导入过滤链中，自动拦截并过滤了根目录下的 `get-starter.md` 文件。

### 4. 首页 Bento 布局微调

- 去除了首页 Bento 网格中“点击会出现小汽车动画”的 `DragMotion` 卡片。
- 更新了 `param.ts` 布局配置和 `BentoLayout.tsx`，将多余的空位通过卡片位移进行了无缝填补填满，保持了原有的美观度。

---

## 2026-05-14 更新

## 今日工作总结 (Today's Work)

今天主要完成了将 `arvin` (基于 Vue 3 + Nuxt 架构的复杂个人网站) 深度迁移至 `myinfo-site` (基于 React 19 + Vite 架构) 的核心 UI 与交互还原工作。

### 1. 架构与依赖搭建

- 搭建了 React 19 + Vite + TypeScript 基础环境。
- 使用 `react-grid-layout` 替代了原项目的 `v3-bento`，实现了 Bento 网格系统。
- 引入了 `framer-motion` 以接管 Vue 原生的 `<Transition>` 动画。
- 引入 `react-router-dom` 实现了客户端路由。

### 2. UI 样式像素级还原

- **深浅模式支持**: 修复了默认状态为 Light Mode 的问题，默认强行开启了 `dark` 模式。并且利用 `MutationObserver` 实现了顶部导航栏切换开关和 Bento 卡片开关的状态同步。
- **Bento 布局计算修复**: 将原本硬编码的 4 列 `750px` 布局，重构为与源码一致的 **6列 1130px** (`180px * 6 + 10px * 5`)。
- **拖拽体验修复**:
  - 彻底移除了导致长按错觉的 `.react-grid-placeholder` 拖拽残影，并去除了冲突的 `transition`。
  - 配置了精确的设备嗅探，移动端自动禁用拖拽防误触。
  - 通过 `draggableCancel` 排除了卡片内的所有可交互元素（如 a 标签、按钮、箭头、输入框），防止了点击触发拖拽的错误行为。
- **背景与毛玻璃效果**: 重构了双层 `body::after` 背景，移除了错误挂载的刺眼 SVG 斜线光晕，复刻了原汁原味的透明网格线条底座。
- **ShadowCard 包装器**: 重新梳理了深色模式下的 `border: 5px solid var(--card-border)` 以及去阴影的扁平化策略，保证了卡片边框与内边距的贴合。
- **全局选中色修复**: 修复了 `::selection` 的 CSS 变量引用，使高亮文本回归了原本的灰黑/蓝黑配色。

### 3. 组件功能迁移

- 迁移了几乎所有的 Bento 卡片：Profile, Weekly, Mapbox, CountDown, Twitter, Dark, PageTransition 等。
- **动态页面过渡效果 (PageTransition)**:
  - 修复了原先点击卡片会导致路由跳转的 Bug。
  - 实现了 `localStorage` 缓存机制，并在 `App.tsx` 中结合 `framer-motion` 的 `<AnimatePresence>` 完美实现了 `page` (模糊渐变)、`fade` (透明度渐变)、`translateY` (Y轴滑动) 的路由切换动效。

---

### 4. 其他已补充功能

- **Markdown 渲染引擎**: 引入 `react-markdown`，实现了标准的 Markdown 渲染及代码高亮。并借助 `rehype-raw` 与自定义标签映射（如 `<Message>`），完美解决了复杂 MDX 自定义组件缺失的问题。
- **高德地图集成**: 彻底移除了原先失效的 Mapbox，使用 `@amap/amap-jsapi-loader` 重构了地图卡片（`AMapView`），并实现了深浅模式样式动态加载及圆角裁切适配。
- **Project Modal**: 修复了 Project Modal 缺失问题，补齐项目详情及渐变遮罩动画。
- **Blog & Post**: 实现了标签过滤系统、双面翻转动画，以及使用 `@tailwindcss/typography` 实现了文章排版。

---

## 存在的已知问题与未完成的功能 (Known Issues & Missing Features)

1. **评论系统 (Giscus) 未接入**: 根据用户要求暂不接入评论系统，虽然 `param.ts` 中保留了 Giscus 的相关配置（仓库、ID 等），但 `Post.tsx` 详情页底部未实装该评论组件。

---

## 2026-05-15 更新 (夜间)

### 1. 首页地图卡片补齐放大预览交互

- **背景**：`myinfo-site` 首页地图卡片右下角箭头最初只有静态图标，没有像 `arvin` 源项目那样提供放大预览入口，导致首页交互层级不完整。
- **解决方案**：
  - 在 `src/components/bento/common/AMapView.tsx` 中补齐地图预览弹层。
  - 通过 `createPortal` 将预览层挂载到 `document.body`，提供更大的地图查看区域。
  - 预览层补齐了遮罩点击关闭、关闭按钮、`Esc` 关闭和滚动锁定能力。
  - 小地图与预览层大地图统一复用 `AMapCanvas` 初始化逻辑，避免维护两套高德地图代码。

### 2. 修复地图预览拖拽与 Bento 拖拽冲突

- **背景**：在地图预览层中拖动地图时，首页 `react-grid-layout` 会把交互误判成正在拖拽卡片，导致“弹层地图和首页地图卡片一起动”。
- **解决方案**：
  - 在 `AMapView.tsx` 中为预览层容器补充 `mouse / pointer / touch` 事件阻断。
  - 调整事件阻断阶段，确保高德地图先收到拖拽事件，再阻止其继续冒泡到外层 Bento 布局。
  - 最终实现为：预览层地图可正常拖拽，首页卡片不再联动位移。

### 3. 路由切换动画重构为“仅路由变化触发”

- **背景**：为了还原 `arvin` 的页面切换效果，最初尝试过 `framer-motion` 和基于类名的 CSS 动画两套方案，但都引入了新的体验问题：
  - 切换动画类型本身也会重播一遍当前页面动画。
  - `wait` 模式下内容区容易出现“闪一下”或“晃一下”的体感。
- **解决方案**：
  - 将路由过渡承载层收敛到 `src/components/layouts/AppShell.tsx`。
  - 放弃基于类名变化自动触发的动画方式，改为仅在 `pathname` 真正变化时执行 `element.animate(...)`。
  - 将 `translateY / fade / page` 三种过渡的最终数值对齐回 `arvin` 源项目：
    - `translateY`: `translateY(20px)` + `opacity`，`100ms ease-out`
    - `fade`: `opacity`，`200ms ease`
    - `page`: `blur(1rem)` + `opacity`，`400ms ease`
  - 保留“切换动画类型不触发当前页面重播”的修正，让切换面板只负责设置下次路由切换的过渡方式。

### 4. 今日收尾状态

- 首页地图卡片已具备与源项目一致的大图预览入口。
- 地图预览层与 Bento 拖拽冲突已消除。
- 页面切换动画最终回归源项目原始数值，并且只会在真实路由切换时触发。
- `yarn type-check` 与 `yarn lint` 在收尾时均已通过。
