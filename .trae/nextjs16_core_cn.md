# Next.js 16 项目规范 — 核心

> **版本**: 1.0 | **更新日期**: 2026-05-15 | **Node**: >=20.9 | **包管理器**: Yarn

---

## 1. 技术栈

| 项目       | 要求                     |
| ---------- | ------------------------ |
| Next.js    | ^16.0.0                  |
| React      | ^19.0.0                  |
| Node.js    | >=22.0.0 (LTS)           |
| TypeScript | >=5.1.0                  |
| 包管理器   | yarn >=1.22.0            |
| 语言       | TypeScript (严格模式)    |
| 打包器     | Turbopack (默认，零配置) |

**锁定文件**: `yarn.lock` 必须提交到仓库。  
**引擎限制**: `package.json` 必须包含 `engines` 字段，指定 `node >=22.0.0` 和 `yarn >=1.22.0`。

**注意**: Next.js 16 将 Turbopack 设为默认打包器。无需 `--turbopack` 标志。仅在需要自定义 webpack 配置时使用 `next build --webpack`。

---

## 2. 项目目录结构 (App Router)

```
src/
├── app/                    # App Router — 所有路由在此
│   ├── (marketing)/        # 路由组 (不产生 URL 段)
│   ├── (dashboard)/        # 路由组
│   │   ├── dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   └── layout.tsx
│   ├── api/                # 路由处理器 (API 端点)
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 首页 (/)
│   ├── loading.tsx         # 全局加载 UI
│   ├── error.tsx           # 全局错误边界
│   └── not-found.tsx       # 全局 404
├── components/
│   ├── ui/                 # 基础 UI (按钮、弹窗、输入框)
│   ├── features/           # 业务功能组件
│   │   ├── auth/
│   │   ├── billing/
│   │   └── users/
│   └── layouts/            # 布局包装器
├── lib/
│   ├── db/                 # 数据库查询 & Prisma 客户端
│   │   ├── prisma.ts       # Prisma 单例实例
│   │   └── queries/
│   ├── auth/               # 认证配置 (next-auth v5)
│   ├── api/                # API 客户端函数
│   ├── helpers/            # 辅助工具
│   └── constants/          # 常量
├── hooks/                  # 自定义 React Hooks
├── types/                  # 全局 TypeScript 类型
├── styles/                 # 全局样式
├── public/                 # 静态资源
└── middleware.ts           # 路由中间件 (放在 src 根目录)
```

**规则**:

- 仅使用 App Router — Pages Router 已完全弃用。迁移完成后删除 `/pages`。
- 路由组 `(文件夹)` 用于逻辑分组，不产生 URL 路径段。
- 组件按用途组织: `ui/` (基础)、`features/` (业务)、`layouts/` (布局)。
- 数据库查询必须提取到 `lib/db/queries/` — 禁止直接写在页面文件中。
- 每个路由自包含: `page.tsx`、`loading.tsx`、`error.tsx`。
- 并行路由插槽**必须**包含 `default.js` — 缺失将导致构建失败。

---

## 3. 服务端组件 vs 客户端组件

**服务端组件 (默认)**:

- 在服务端渲染，不向客户端发送任何 JS。
- 可直接访问数据库、文件系统、服务端环境变量。
- 不能使用 `useState`、`useEffect`、浏览器 API。
- 直接使用 `await` 获取数据 — 无需 `useEffect` 数据获取。

**客户端组件** (文件顶部添加 `"use client"`):

- 以下情况必须使用: 浏览器 API (`window`、`document`、`localStorage`)、React Hooks、事件处理 (`onClick`、`onChange`)、实时订阅。

**边界规则**: 保持组件树顶部在服务端。将客户端组件推到叶子节点（真正需要交互的地方）。禁止将整个组件树包裹在单个客户端组件壳中。

**数据传递**: 服务端数据通过 props 传给客户端组件。禁止传递不可序列化的值（类实例、除服务端动作外的函数、Promise）。

---

## 4. 代码风格

| 工具        | 用途       | 配置文件        |
| ----------- | ---------- | --------------- |
| ESLint      | 代码检查   | `.eslintrc.cjs` |
| Prettier    | 代码格式化 | `.prettierrc`   |
| Husky       | Git 钩子   | `.husky/`       |
| lint-staged | 提交前检查 | `package.json`  |

**Prettier**: `semi: false`, `singleQuote: true`, `tabWidth: 2`, `trailingComma: es5`, `endOfLine: lf`, `printWidth: 100`。

**ESLint 核心规则**:

- `no-console`: 警告（仅允许 `console.error`）
- `@typescript-eslint/no-explicit-any`: **错误**（使用 `unknown` 替代）
- `react-hooks/rules-of-hooks`: **错误**
- `react-hooks/exhaustive-deps`: 警告

**注意**: Next.js 16 移除了 `next lint` 命令。直接使用 ESLint CLI 或 Biome。`next build` 不再自动运行代码检查。

---

## 5. 数据获取与服务端动作

**服务端组件**: 直接在组件中获取数据。不需要 `useEffect`、加载动画、API 路由。使用 `await` 配合数据库查询。

**服务端动作 (Server Actions)**: 用于表单提交、数据变更。与组件同位置定义。不需要单独的 API 路由。标记 `"use server"`。

**API 路由**: 仅用于需要被外部客户端消费的公开端点。

**缓存 (Next.js 16 变更)**:

- Next.js 16 采用**显式缓存组件**编程模型。
- `experimental.ppr` 和 `experimental_ppr` 已移除。改用 `experimental.cacheComponents`。
- `revalidateTag()` 现在需要 `cacheLife` 参数: `revalidateTag('posts', 'max')`。
- Server Actions 中使用 `updateTag()` 实现立即缓存失效。
- 默认缓存: fetch 请求和路由**不缓存**。使用显式指令控制。

---

## 6. 状态管理

| 场景         | 推荐方案          | 禁止方案                |
| ------------ | ----------------- | ----------------------- |
| 全局 UI 状态 | Zustand / Jotai   | 不使用 Toolkit 的 Redux |
| 服务端状态   | React Query / SWR | 用 `useEffect` 手写缓存 |
| 表单状态     | React Hook Form   | 手动绑定 `onChange`     |
| 跨组件通信   | Zustand           | 全局变量                |

**注意**: 禁止使用 Zustand/Jotai 管理服务端状态。数据库数据使用 React Query。Zustand 仅用于客户端 UI 状态（弹窗开关、选中标签）。

---

## 7. API 与网络层

**路由处理器** (App Router API): 所有 API 端点放在 `app/api/[route]/route.ts`。使用 `NextResponse` 返回响应。

**API 常量**: 所有接口路径定义在 `lib/constants/api.ts` 中，使用 `as const` 断言。

---

## 8. 禁止使用的 API 与实践

| 禁止项                                        | 原因                | 替代方案                               |
| --------------------------------------------- | ------------------- | -------------------------------------- |
| `eval()`、`new Function()`                    | 代码注入风险        | `JSON.parse()`、模板字符串             |
| `document.write()`、`innerHTML`               | XSS 漏洞            | React 渲染机制；不可避免时用 DOMPurify |
| 在页面文件中直接调用数据库                    | 难以测试、无法复用  | 提取到 `lib/db/queries/`               |
| `any` 类型（无注释）                          | 失去类型安全        | `unknown` + 类型守卫                   |
| 直接修改 props                                | 反模式              | 状态提升或回调                         |
| 直接修改 state                                | 破坏响应性          | 不可变更新                             |
| `getServerSideProps` / `getStaticProps`       | Pages Router 遗留   | 服务端组件 / `unstable_cache`          |
| 将整个树包裹在 `"use client"` 中              | 丧失服务端组件优势  | 仅推到叶子节点                         |
| 向客户端组件传递不可序列化 props              | 运行时错误          | 规划数据契约                           |
| `serverRuntimeConfig` / `publicRuntimeConfig` | Next.js 16 已移除   | 环境变量 (`.env`)                      |
| `next lint` 命令                              | Next.js 16 已移除   | ESLint CLI 或 Biome                    |
| AMP 支持                                      | Next.js 16 已移除   | 无 — 功能已退役                        |
| 同步访问 `params`、`cookies()`、`headers()`   | Next.js 16 必须异步 | `await params`、`await cookies()`      |

---

## 9. Git 规范

**分支命名**: `feature/<范围>-<描述>`、`fix/<范围>-<描述>`、`hotfix/<描述>`、`refactor/<范围>-<描述>`、`docs/<描述>`。

**提交信息格式**（遵循 Conventional Commits）: `<类型>(<范围>): <主题>`，可选正文和页脚。

**类型**: `feat` 新功能、`fix` Bug 修复、`docs` 文档、`style` 代码格式、`refactor` 重构、`test` 测试、`chore` 构建/工具。

**工作流**:

1. 禁止直接推送 `main`，所有变更通过 Pull Request
2. 至少 1 个审批才能合并
3. `lint-staged` 提交前自动运行 `eslint --fix` 和 `prettier --write`
4. CI 流水线: `lint` → `type-check` → `test` → `build`，任何失败阻止合并

---

## 10. 测试规范

| 项目       | 标准                                              |
| ---------- | ------------------------------------------------- |
| 框架       | Vitest + React Testing Library                    |
| 覆盖率门槛 | 业务逻辑 >=60%；工具函数与 Hooks >=80%            |
| 必测项     | 所有 `lib/` 工具函数、所有 `hooks/`、核心页面交互 |
| 禁止       | 仅为凑覆盖率的无意义测试；测试实现细节            |

**测试文件位置**: 与源文件同目录，如 `formatDate.ts` + `formatDate.test.ts`。

---

## 11. 环境变量

所有环境变量使用 `NEXT_PUBLIC_` 前缀表示暴露给客户端。服务端专用变量不加前缀。

**规则**:

- `NEXT_PUBLIC_*` — 仅用于非敏感配置（分析 ID、公开 URL）。会打包到客户端。
- 禁止给密钥添加 `NEXT_PUBLIC_` 前缀。
- 启动时使用 `@t3-oss/env-nextjs` 验证环境变量（Zod 校验）。
- 在 `.env.example` 中记录所需变量（提交到仓库）。
- **已移除**: `serverRuntimeConfig` 和 `publicRuntimeConfig` — 改用 `.env` 文件。

---

## 12. 性能规范

- **代码分割**: App Router 自动处理。重型组件使用 `dynamic()`。
- **流式传输**: 使用 `loading.tsx` + Suspense 边界实现渐进加载。
- **缓存组件**: 使用 `experimental.cacheComponents` 实现显式组件级缓存。
- **Edge Runtime**: 对延迟敏感的路由添加 `export const runtime = "edge"`（冷启动 <1ms）。
- **React Cache**: 用 `cache()` 包装昂贵获取函数，实现请求级去重。
- **图片**: 使用 Next.js `<Image>` 组件，格式 WebP/AVIF。首屏外图片懒加载。
- **包体积**: 使用 Turbopack 内置分析器监控；初始 JS >200KB 时告警。
- **Turbopack 缓存**: 在 `next.config.ts` 中启用 `experimental.turbopackFileSystemCacheForDev: true` 加快重启速度。

---

## 13. 速查表

| 检查项            | 通过标准                  |
| ----------------- | ------------------------- |
| `yarn lint`       | 零错误                    |
| `yarn type-check` | 零 TS 错误                |
| `yarn test`       | 全部通过，覆盖率达标      |
| `yarn build`      | 构建成功                  |
| 提交信息          | 符合 Conventional Commits |
| PR 审批           | 至少 1 个审批             |

> **执行方式**: 通过 ESLint + Prettier + Husky + CI/CD 强制执行。违规将在提交或 PR 阶段被拦截。
