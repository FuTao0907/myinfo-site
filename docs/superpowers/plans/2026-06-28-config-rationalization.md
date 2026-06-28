# Config Rationalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不破坏 Next.js 16 生态约定的前提下，降低当前仓库的配置维护成本，减少重复配置，并让根目录只保留必要入口文件。

**Architecture:** 保留工具链要求的根入口文件，例如 `next.config.mjs`、`tailwind.config.js`、`vitest.config.ts`、`eslint.config.js`、`tsconfig.json`。把多处重复的路径、扫描范围、忽略项和环境变量规则抽到 `config/tooling/` 与 `src/env.ts`，让根配置文件只负责导出，避免未来改一个路径要改多个地方。

**Tech Stack:** Next.js 16, React 19, TypeScript, ESLint 9 Flat Config, Prettier 3, Tailwind CSS 3, Vitest 3, Yarn 1

---

## Scope

当前仓库已有的关键配置入口：

- `package.json`
- `next.config.mjs`
- `tsconfig.json`
- `eslint.config.js`
- `.prettierrc`
- `postcss.config.js`
- `tailwind.config.js`
- `vitest.config.ts`
- `.env.example`
- `.github/workflows/deploy.yml`

本次改造的目标不是强行减少文件数量，而是把“配置值的来源”收敛起来。以下文件仍然建议保留在根目录，因为工具默认就在这里找：

- `next.config.mjs`
- `tsconfig.json`
- `eslint.config.js`
- `tailwind.config.js`
- `postcss.config.js`
- `vitest.config.ts`
- `package.json`

推荐新增的收敛目录：

```text
config/
  tooling/
    shared.mjs
    paths.mjs
src/
  env.ts
docs/
  config-map.md
```

## Target State

### Root Files

- `next.config.mjs` 只保留 Next.js 配置导出和 MDX 包装
- `tailwind.config.js` 只保留主题扩展和插件声明
- `vitest.config.ts` 复用统一路径别名，不再单独维护 `@`
- `eslint.config.js` 复用统一忽略目录
- `package.json` 只保留脚本、依赖和项目元数据

### Shared Sources

- `config/tooling/paths.mjs` 统一维护别名、源码目录、博客目录
- `config/tooling/shared.mjs` 统一维护扫描范围、忽略目录、MDX 扩展名
- `src/env.ts` 统一维护环境变量读取与校验
- `docs/config-map.md` 解释每个配置文件的责任边界

### Non-Goals

- 不在本轮把所有配置改成单文件
- 不在本轮更换为 Biome、Turborepo 或 monorepo
- 不在本轮调整业务组件目录
- 不在本轮触碰部署逻辑以外的 CI 结构

### Task 1: 建立共享配置源

**Files:**

- Create: `config/tooling/paths.mjs`
- Create: `config/tooling/shared.mjs`
- Modify: `next.config.mjs`
- Modify: `vitest.config.ts`
- Modify: `tailwind.config.js`
- Modify: `eslint.config.js`

- [ ] **Step 1: 写验证命令，确认当前仓库存在重复配置点**

```powershell
yarn type-check
yarn test
yarn lint
```

预期：

- 当前命令应通过
- 但 `@` 路径别名在 `tsconfig.json` 与 `vitest.config.ts` 分别维护
- `content` 扫描范围与忽略目录缺少统一来源

- [ ] **Step 2: 先运行一次基线验证**

Run:

```powershell
yarn lint
yarn type-check
yarn test
```

Expected:

- 全部通过，作为改造前基线

- [ ] **Step 3: 新建统一路径文件**

```javascript
// config/tooling/paths.mjs
/**
 * 返回项目级共享路径常量，供 Node 侧配置文件复用。
 */
export const PROJECT_PATHS = {
  srcAlias: '@/',
  srcDir: './src',
  appDir: './src/app',
  contentDir: './src/blog',
}
```

- [ ] **Step 4: 新建统一共享配置文件**

```javascript
// config/tooling/shared.mjs
import { PROJECT_PATHS } from './paths.mjs'

/**
 * 返回工具链共享配置，避免多个根配置文件重复声明。
 */
export const TOOLING_SHARED = {
  mdxExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  tailwindContent: [`${PROJECT_PATHS.srcDir}/**/*.{ts,tsx}`],
  ignoreDirs: ['.next', 'dist', 'coverage'],
}
```

- [ ] **Step 5: 改造 `next.config.mjs` 使用共享配置**

```javascript
import createMDX from '@next/mdx'
import { TOOLING_SHARED } from './config/tooling/shared.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: TOOLING_SHARED.mdxExtensions,
  experimental: {
    turbopackFileSystemCacheForDev: true,
  },
}

const withMDX = createMDX({})

export default withMDX(nextConfig)
```

- [ ] **Step 6: 改造 `vitest.config.ts` 复用统一路径常量**

```typescript
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vitest/config'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * 返回 Vitest 配置，统一使用项目共享路径别名。
 */
export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'node',
  },
})
```

说明：此步先保持行为不变。若后续希望进一步消除 `src` 重复，可把绝对路径计算也抽到 `config/tooling/paths.mjs`。

- [ ] **Step 7: 改造 `tailwind.config.js` 使用共享扫描范围**

```javascript
import { TOOLING_SHARED } from './config/tooling/shared.mjs'

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: TOOLING_SHARED.tailwindContent,
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}
```

- [ ] **Step 8: 改造 `eslint.config.js` 使用统一忽略项**

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import tseslint from 'typescript-eslint'

import { TOOLING_SHARED } from './config/tooling/shared.mjs'

export default tseslint.config(
  { ignores: TOOLING_SHARED.ignoreDirs },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': ['warn', { allow: ['error'] }],
      'react-hooks/exhaustive-deps': 'warn',
    },
  }
)
```

- [ ] **Step 9: 运行验证，确保行为不变**

Run:

```powershell
yarn lint
yarn type-check
yarn test
```

Expected:

- 全部通过
- 根配置文件的可读性提升
- 重复配置减少

- [ ] **Step 10: Commit**

```bash
git add config/tooling/paths.mjs config/tooling/shared.mjs next.config.mjs vitest.config.ts tailwind.config.js eslint.config.js
git commit -m "refactor(config): centralize shared tooling values"
```

### Task 2: 环境变量治理收口

**Files:**

- Create: `src/env.ts`
- Modify: `.env.example`
- Modify: `src/app/api/test/route.ts`

- [ ] **Step 1: 写一个会失败的环境变量校验入口**

```typescript
// src/env.ts
/**
 * 返回经过最小校验的公开环境变量，缺失时直接抛错，避免运行时静默失败。
 */
export function getPublicEnv() {
  const amapKey = process.env.NEXT_PUBLIC_AMAP_KEY
  const amapSecurityJsCode = process.env.NEXT_PUBLIC_AMAP_SECURITY_JS_CODE

  if (!amapKey) {
    throw new Error('Missing NEXT_PUBLIC_AMAP_KEY')
  }

  if (!amapSecurityJsCode) {
    throw new Error('Missing NEXT_PUBLIC_AMAP_SECURITY_JS_CODE')
  }

  return {
    amapKey,
    amapSecurityJsCode,
  }
}
```

- [ ] **Step 2: 在一个现有入口中接入，验证缺失时能尽早暴露**

```typescript
// src/app/api/test/route.ts
import { NextResponse } from 'next/server'

import { getPublicEnv } from '@/env'

/**
 * 返回测试接口响应，并在启动阶段验证公开环境变量是否齐备。
 */
export async function GET() {
  const env = getPublicEnv()

  return NextResponse.json({
    ok: true,
    amapKeyConfigured: Boolean(env.amapKey),
  })
}
```

- [ ] **Step 3: 更新示例环境文件**

```dotenv
NEXT_PUBLIC_AMAP_KEY=
NEXT_PUBLIC_AMAP_SECURITY_JS_CODE=
```

- [ ] **Step 4: 本地验证**

Run:

```powershell
yarn type-check
yarn build
```

Expected:

- 环境变量齐全时通过
- 缺失时在构建或访问测试接口时能直接发现

- [ ] **Step 5: Commit**

```bash
git add src/env.ts .env.example src/app/api/test/route.ts
git commit -m "refactor(config): centralize public env validation"
```

### Task 3: 清理脚本与配置职责边界

**Files:**

- Modify: `package.json`
- Create: `docs/config-map.md`

- [ ] **Step 1: 为配置改造增加统一检查脚本**

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint . --max-warnings=0",
    "type-check": "tsc --noEmit",
    "test": "vitest run",
    "format": "prettier --write .",
    "check": "yarn lint && yarn type-check && yarn test && yarn build"
  }
}
```

- [ ] **Step 2: 写配置职责说明文档**

```markdown
# Config Map

## Root Entry Files

- `next.config.mjs`: Next.js 官方入口，只做导出和插件包裹
- `tailwind.config.js`: Tailwind 官方入口，只做主题和插件
- `postcss.config.js`: PostCSS 官方入口，不承载业务语义
- `eslint.config.js`: ESLint Flat Config 入口
- `vitest.config.ts`: 测试入口
- `tsconfig.json`: TypeScript 编译入口

## Shared Sources

- `config/tooling/paths.mjs`: 统一路径别名和关键目录
- `config/tooling/shared.mjs`: 统一扫描范围、忽略目录、扩展名
- `src/env.ts`: 统一环境变量读取和校验

## Change Guide

- 改路径别名时，先看 `config/tooling/paths.mjs`
- 改 Tailwind 扫描范围时，先看 `config/tooling/shared.mjs`
- 改环境变量时，先看 `src/env.ts` 与 `.env.example`
```

- [ ] **Step 3: 运行完整检查**

Run:

```powershell
yarn check
```

Expected:

- `lint`、`type-check`、`test`、`build` 全部通过

- [ ] **Step 4: Commit**

```bash
git add package.json docs/config-map.md
git commit -m "docs(config): document config ownership and checks"
```

### Task 4: 可选的第二阶段优化

**Files:**

- Modify: `package.json`
- Optional Create: `biome.json`
- Optional Delete: `.prettierrc`
- Optional Delete: `eslint.config.js`

- [ ] **Step 1: 只在你确认要迁移工具链时才执行此任务**

说明：

- 该任务不是“当前必须”
- 只有在你希望进一步减少配置文件时，才评估 `Biome` 替代 `ESLint + Prettier`

- [ ] **Step 2: 先建立评估标准**

```markdown
- 是否支持当前 TypeScript / Next.js 语法
- 是否能覆盖现有格式化规则
- 是否能替代 react-hooks 关键检查
- 是否会影响团队现有编辑器体验
```

- [ ] **Step 3: 试运行而不是直接切换**

Run:

```powershell
yarn add -D @biomejs/biome
```

Expected:

- 仅用于开分支试验
- 不在主分支直接替换现有 lint/format 流程

- [ ] **Step 4: Commit**

```bash
git commit -m "chore(config): evaluate biome for config reduction"
```

## Acceptance Checklist

- 根目录配置仍符合官方工具发现规则
- `@` 别名和扫描范围不再分散维护
- 环境变量读取有统一入口
- 至少存在一份配置责任说明文档
- `yarn lint`
- `yarn type-check`
- `yarn test`
- `yarn build`

## Recommended Execution Order

1. 先做 Task 1，先解决重复配置问题
2. 再做 Task 2，建立 `env` 入口
3. 然后做 Task 3，补脚本和文档
4. Task 4 放到独立分支评估

## Risks

- `tailwind.config.js` 当前使用 `require('tailwindcss-animate')`，若切到完全 ESM，需要确认插件加载方式兼容
- `src/env.ts` 一旦接入，缺失环境变量会更早失败，这是预期行为，但需要提前同步团队
- `deploy.yml` 当前直接在服务器执行 `git reset --hard HEAD` 与 `git clean -fd`，这和“配置收敛”无关，但属于高风险部署动作，建议后续单独治理

## Minimal Version

如果你只想做 20% 工作拿到 80% 收益，最小版本只做以下内容：

1. 新建 `config/tooling/shared.mjs`
2. 让 `next.config.mjs`、`tailwind.config.js`、`eslint.config.js` 复用它
3. 新建 `docs/config-map.md`

这样就能在不大动仓库结构的前提下，明显降低后续维护成本。

Plan complete and saved to `docs/superpowers/plans/2026-06-28-config-rationalization.md`. Two execution options:

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
