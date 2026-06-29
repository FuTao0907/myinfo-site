# 个人网站目录重构操作文档

## 一、目标架构

```
src/
├── app/                    # 路由层（只引组件，不写逻辑）
├── domains/                # 业务领域（自闭环）
│   ├── blog/
│   ├── home/
│   ├── resume/
│   ├── project/
│   ├── search/
│   └── site/
├── shared/                 # 共享资源（跨领域复用）
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   └── types/
├── styles/                 # 全局样式
└── assets/                 # 静态资源
```

---

## 二、前置准备

### 1. 确认当前分支干净

```powershell
cd myinfo-site
git status
# 确保没有未提交的改动
```

### 2. 创建重构分支

```powershell
git checkout -b refactor/domain-structure
```

### 3. 备份当前结构（可选）

```powershell
Copy-Item -Path src -Destination ("src-backup-" + (Get-Date -Format "yyyyMMdd")) -Recurse
```

---

## 三、文件迁移清单

### 步骤 1：新建目录结构

```powershell
New-Item -ItemType Directory -Force -Path src/domains/blog/components,src/domains/blog/lib,src/domains/blog/content | Out-Null
New-Item -ItemType Directory -Force -Path src/domains/home/components | Out-Null
New-Item -ItemType Directory -Force -Path src/domains/project/components,src/domains/project/lib | Out-Null
New-Item -ItemType Directory -Force -Path src/domains/resume/components,src/domains/resume/lib | Out-Null
New-Item -ItemType Directory -Force -Path src/domains/search/lib | Out-Null
New-Item -ItemType Directory -Force -Path src/domains/site/lib | Out-Null
New-Item -ItemType Directory -Force -Path src/shared/components,src/shared/hooks,src/shared/lib/utils,src/shared/lib/constants,src/shared/types | Out-Null
```

### 步骤 2：迁移博客领域

| 源路径                                    | 目标路径                                  | 说明                                    |
| ----------------------------------------- | ----------------------------------------- | --------------------------------------- |
| `src/blog/`                               | `src/domains/blog/content/`               | Markdown 源文件（已迁移）               |
| `src/components/features/blog/`           | `src/domains/blog/components/`            | 博客组件                                |
| `src/lib/helpers/posts.ts`                | `src/shared/lib/utils/posts.ts`           | 文章读取工具（后续新代码优先引 shared） |
| `__tests__/src/lib/helpers/posts.test.ts` | `__tests__/src/lib/helpers/posts.test.ts` | 测试（保持在 **tests**）                |
| `src/lib/search.ts`                       | `src/domains/search/lib/entries.ts`       | 搜索索引（实现收口 domains/search）     |
| `src/lib/public-content.ts`               | `src/shared/lib/public-content.ts`        | 内容 API 与本地兜底（跨领域共享）       |
| `src/types/post.ts`                       | `src/shared/types/post.ts`                | 博客类型（共享类型）                    |

### 步骤 3：迁移简历领域

| 源路径                            | 目标路径                                | 说明     |
| --------------------------------- | --------------------------------------- | -------- |
| `src/components/features/resume/` | `src/domains/resume/components/`        | 简历组件 |
| `src/lib/constants/resume.ts`     | `src/domains/resume/lib/resume-data.ts` | 简历数据 |
| （新增）                          | `src/domains/resume/types.ts`           | 简历类型 |

### 步骤 4：迁移项目领域

| 源路径                             | 目标路径                              | 说明     |
| ---------------------------------- | ------------------------------------- | -------- |
| `src/components/features/project/` | `src/domains/project/components/`     | 项目组件 |
| `src/lib/constants/projects.ts`    | `src/domains/project/lib/projects.ts` | 项目数据 |
| （新增）                           | `src/domains/project/types.ts`        | 项目类型 |

### 步骤 5：整理共享层

| 源路径                                | 目标路径                                   | 说明                                  |
| ------------------------------------- | ------------------------------------------ | ------------------------------------- |
| `src/components/bento/`               | `src/domains/home/components/bento/`       | 首页 Bento 组件系统（属于 home 领域） |
| `src/components/layouts/`             | `src/shared/components/layouts/`           | 布局组件                              |
| `src/components/providers/`           | `src/shared/components/providers/`         | Context Provider                      |
| `src/components/ui/`                  | `src/shared/components/ui/`                | 通用 UI                               |
| `src/components/normal/`              | `src/domains/home/components/normal/`      | 首页专用普通组件                      |
| `src/lib/helpers/body-scroll-lock.ts` | `src/shared/lib/utils/body-scroll-lock.ts` | 工具函数                              |
| `src/lib/helpers/cn.ts`               | `src/shared/lib/utils/cn.ts`               | 类名合并                              |
| `src/lib/constants/content/*`         | `src/shared/lib/constants/content/*`       | 站点内容常量                          |
| `src/types/site-config.ts`            | `src/shared/types/site-config.ts`          | 站点类型                              |
| `src/types/search.ts`                 | `src/shared/types/search.ts`               | 搜索类型                              |
| `src/types/view-transition.d.ts`      | `src/shared/types/view-transition.d.ts`    | 类型声明                              |
| `src/styles/`                         | `src/styles/`                              | 不动                                  |
| `src/assets/`                         | `src/assets/`                              | 不动                                  |

### 步骤 6：清理旧目录

```powershell
# 确认迁移完成后删除（Windows）
Remove-Item -LiteralPath "src/blog" -Recurse -Force -ErrorAction Stop
Remove-Item -LiteralPath "src/components" -Recurse -Force -ErrorAction Stop
Remove-Item -LiteralPath "src/types" -Recurse -Force -ErrorAction Stop

# 说明：src/lib 在迁移期可能保留少量兼容层文件（re-export），等全量 import 对齐后再删除。
```

---

## 四、路径别名配置

修改 `tsconfig.json`：

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"],
      "~/domains/*": ["src/domains/*"],
      "~/shared/*": ["src/shared/*"],
      "~/app/*": ["src/app/*"],
      "~/styles/*": ["src/styles/*"],
      "~/assets/*": ["src/assets/*"]
    }
  }
}
```

---

## 五、批量替换导入路径

### 脚本：`migrate-imports.sh`

```bash
#!/bin/bash

# 替换组件路径
find src -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i   -e 's|@/components/bento/|~/shared/components/bento/|g'   -e 's|@/components/layouts/|~/shared/components/layouts/|g'   -e 's|@/components/providers/|~/shared/components/providers/|g'   -e 's|@/components/ui/|~/shared/components/ui/|g'   -e 's|@/components/features/blog/|~/domains/blog/components/|g'   -e 's|@/components/features/resume/|~/domains/resume/components/|g'   -e 's|@/components/features/project/|~/domains/project/components/|g'   -e 's|@/components/|~/shared/components/|g'   -e 's|@/lib/helpers/|~/shared/lib/utils/|g'   -e 's|@/lib/constants/|~/shared/lib/constants/|g'   -e 's|@/lib/search|~/domains/blog/lib/search|g'   -e 's|@/lib/public-content|~/domains/blog/lib/public-content|g'   -e 's|@/lib/|~/shared/lib/|g'   -e 's|@/types/|~/shared/types/|g'   -e 's|@/styles/|~/styles/|g'   -e 's|@/assets/|~/assets/|g'   -e 's|@/blog/|~/domains/blog/content/|g'   {} \;

echo "导入路径替换完成，请检查"
```

**执行前备份**，执行后人工检查。

---

## 六、验证清单

| 检查项          | 命令                                 |
| --------------- | ------------------------------------ |
| TypeScript 编译 | `npx tsc --noEmit`                   |
| 开发服务器启动  | `npm run dev`                        |
| 关键页面访问    | 首页、博客列表、博客详情、简历、项目 |
| 构建测试        | `npm run build`                      |
| 测试运行        | `npm test`（如有）                   |

---

## 七、回滚方案

如果出问题：

```bash
# 放弃重构分支
git checkout main
git branch -D refactor/domain-structure

# 或从备份恢复
rm -rf src
mv src-backup-YYYYMMDD src
```

---

## 八、预期收益

| 场景         | 之前                 | 之后                         |
| ------------ | -------------------- | ---------------------------- |
| 改博客功能   | 改 4-5 个目录        | 改 `domains/blog/` 一个目录  |
| 删博客功能   | 逐个文件删           | 删 `domains/blog/` 即可      |
| 新增日常领域 | 新建文件散落各处     | 新建 `domains/daily/` 自闭环 |
| 团队协作     | 冲突在 `components/` | 按领域分配，减少冲突         |

---

## 九、决策点

| 问题                                        | 你的选择                            |
| ------------------------------------------- | ----------------------------------- |
| 是否现在重构？                              | 是 / 否                             |
| 是否用脚本批量替换？                        | 是 / 否（建议先手动改一个文件验证） |
| 是否保留 `src/components/` 作为软链接过渡？ | 是 / 否                             |
