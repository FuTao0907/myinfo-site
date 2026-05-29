# Myinfo Site

基于 `Next.js 16`、`React 19`、`TypeScript` 构建的个人站点项目，当前承载首页展示、文章系统、日常记录、项目展示、全局搜索和独立简历页。

## 技术栈

- `Next.js 16`
- `React 19`
- `TypeScript`
- `Tailwind CSS`
- `Framer Motion`
- `React Markdown`
- `Vitest`

## 功能概览

- 首页 Bento 卡片布局
- 文章 / 日常双内容流
- Markdown 内容读取与详情页渲染
- `Ctrl + K` 全局搜索
- 独立全屏简历页
- 简历页 `Ctrl + J` 命令面板
- 浅色 / 深色主题切换
- 高德地图卡片与预览弹层

## 本地开发

1. 安装依赖

```bash
yarn install
```

2. 准备环境变量

复制 `.env.example`，在项目根目录创建 `.env.local`：

```env
NEXT_PUBLIC_AMAP_KEY=
NEXT_PUBLIC_AMAP_SECURITY_JS_CODE=
```

3. 启动开发环境

```bash
yarn dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 常用命令

```bash
yarn dev
yarn lint
yarn type-check
yarn test
yarn build
yarn format
```

## 质量门禁

提交或发布前建议至少执行以下命令：

```bash
yarn lint
yarn type-check
yarn test
yarn build
```

当前项目已验证以上命令可通过。

## 配置维护

项目中的图片资源、外部链接、个人资料、简历信息、项目卡片等内容已经统一收口到配置目录：

- `src/lib/constants/content/site.ts`
- `src/lib/constants/content/projects.ts`
- `src/lib/constants/content/resume.ts`
- `src/lib/constants/content/index.ts`

推荐使用统一出口导入：

```ts
import { SITE_ASSETS, SITE_LINKS, SITE_PROFILE_CONFIG } from '@/lib/constants/content/index'
```

常见修改入口：

- 站点标题、描述、外链、导航、默认图片：`src/lib/constants/content/site.ts`
- 项目卡片数据：`src/lib/constants/content/projects.ts`
- 简历经历、技能分组：`src/lib/constants/content/resume.ts`

## 目录结构

```text
src/
├─ app/                         # App Router 页面
├─ blog/                        # Markdown 内容
├─ components/                  # 页面组件与功能组件
├─ lib/
│  ├─ constants/
│  │  └─ content/               # 统一内容配置入口
│  ├─ helpers/                  # 工具函数与内容读取
│  └─ public-content.ts         # 站点公开内容装配
├─ styles/                      # 全局样式
└─ types/                       # 类型定义
```

## 内容系统

- 文章内容位于 `src/blog/post`
- 日常内容位于 `src/blog/weekly`
- Markdown 文件由 `src/lib/helpers/posts.ts` 递归读取
- 文章详情页支持目录、返回顶部、代码高亮和标签展示

## 测试

当前仓库包含最小有效测试，主要覆盖：

- `src/lib/helpers/body-scroll-lock.test.ts`
- `src/lib/helpers/posts.test.ts`

如果后续新增纯函数、内容读取逻辑或命令面板逻辑，建议同步补充对应测试。
