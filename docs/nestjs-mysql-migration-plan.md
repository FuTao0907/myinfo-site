# Myinfo Site 数据迁移与接口规划

## 1. 目标

当前项目的数据主要来自两类本地来源：

- `src/blog/**/*.md` 中的 Markdown 内容
- `src/lib/constants/site.ts` 中的站点常量、项目列表和首页配置

后续部署到服务器后，推荐拆成下面的职责：

- `Next.js`：负责页面渲染、交互和内容展示
- `NestJS`：负责内容管理、公共接口、后台接口
- `MySQL`：负责持久化可维护的数据
- 对象存储或 CDN：负责图片、封面等静态资源

## 2. 当前数据来源盘点

### 2.1 文章与日常

当前文章数据来自 `src/blog/post/*.md` 和 `src/blog/weekly/*.md`，解析逻辑在 `src/lib/helpers/posts.ts`。

当前实际字段包括：

- `id`
- `title`
- `plainTitle`
- `date`
- `desc`
- `tags`
- `cover`
- `content`
- `isWeekly`
- `postIndex`

Markdown frontmatter 当前字段包括：

- `title`
- `date`
- `desc`
- `tags`
- `cover`

建议结论：

- 这一类数据必须入库
- 文章正文建议继续使用 Markdown 存储
- 页面仍然可以由前端使用 `react-markdown` 渲染

### 2.2 项目列表

当前项目数据来自 `src/lib/constants/site.ts` 的 `PROJECTS`。

当前字段包括：

- `name`
- `desc`
- `cover`
- `demoUrl`
- `repoUrl`

建议结论：

- 如果你以后希望在后台增删改项目，这类数据应该入库
- 如果项目列表长期很少变化，也可以暂时保留为接口返回的静态配置
- 从长期维护角度，仍然建议入库

### 2.3 站点基础信息

当前站点资料来自 `src/lib/constants/site.ts` 的 `SITE`。

当前主要字段包括：

- `title`
- `author`
- `description`
- `profileContent`
- `keywords`
- `coordinate`
- `icon`
- `pic`
- `cv`
- `juejin`
- `mail`
- `twitterId`
- `twitterUrl`
- `githubId`
- `githubHome`
- `weeklyUrl`
- `repo`
- `notion`

建议结论：

- 这类数据属于“站点配置”
- 如果以后你希望在后台可视化修改个人资料、外链、首页介绍，建议入库
- 如果这些内容一年只改几次，也可以先放在 NestJS 的配置接口中，由后端读取数据库或配置文件统一返回

### 2.4 首页 Bento 布局和纯展示配置

当前配置来自：

- `BENTO_COMMON_COMPONENTS`
- `BENTO_CUSTOM_COMPONENTS`
- `NAV_ITEMS`
- `AMAP_SETTINGS`

建议结论：

- `NAV_ITEMS`、Bento 布局坐标、动效选项这类更像前端展示配置，不一定要入库
- 如果未来要做“后台拖拽配置首页卡片”，再单独设计表
- 当前阶段建议继续保留在前端代码中

### 2.5 本地状态与浏览器状态

当前以下数据不建议入库：

- 页面过渡动画名称，保存在 `localStorage`
- 深色模式开关状态
- 当前页面的目录高亮
- 倒计时百分比

建议结论：

- 这些属于浏览器本地 UI 状态，不需要 MySQL

### 2.6 第三方能力

当前包含以下第三方能力：

- 高德地图 Key：来自 `.env.local`
- GitHub、Juejin、Notion、Twitter：当前仅使用外链，不拉取第三方内容

建议结论：

- 高德 Key 不进数据库，保留为环境变量
- 外链地址可入库，也可保留为站点配置
- 第三方平台“内容本身”不建议存进你自己的 MySQL，除非你后续要做同步任务

## 3. 哪些应该存 MySQL

建议第一阶段直接入库的数据如下。

### 3.1 必须入库

- 文章表
- 标签表
- 文章标签关联表
- 项目表

原因：

- 这是核心内容数据
- 有明显的列表、详情、筛选、排序需求
- 后续最可能需要后台管理

### 3.2 建议入库

- 站点资料表
- 社交链接表

原因：

- 这些数据现在虽然不复杂，但以后大概率会改
- 入库后，NestJS 可以直接提供统一的“站点配置接口”

### 3.3 暂不入库

- 顶部导航
- 首页 Bento 布局坐标
- 深色模式
- 页面过渡动画
- 倒计时逻辑
- 地图样式常量

原因：

- 它们偏前端展示层逻辑
- 改动频率低
- 目前没有明显后台管理价值

## 4. 哪些通过 NestJS 接口提供

推荐让前端只通过 NestJS 取“业务数据”，而不是再直接读本地 Markdown 文件。

### 4.1 公共接口

建议的公共接口如下：

- `GET /api/public/site`
- `GET /api/public/posts`
- `GET /api/public/posts/:slug`
- `GET /api/public/tags`
- `GET /api/public/projects`

### 4.2 后台管理接口

建议的后台接口如下：

- `POST /api/admin/posts`
- `PUT /api/admin/posts/:id`
- `DELETE /api/admin/posts/:id`
- `POST /api/admin/projects`
- `PUT /api/admin/projects/:id`
- `DELETE /api/admin/projects/:id`
- `PUT /api/admin/site`

### 4.3 推荐的前端取数边界

前端可以按下面的方式消费数据：

- 首页：`GET /api/public/site` + `GET /api/public/projects?featured=true`
- 文章列表页：`GET /api/public/posts?type=blog&page=1&pageSize=10`
- 日常列表页：`GET /api/public/posts?type=daily&page=1&pageSize=10`
- 标签筛选：`GET /api/public/posts?type=blog&tag=一般般`
- 文章详情页：`GET /api/public/posts/:slug`
- 项目页：`GET /api/public/projects`

## 5. 推荐表结构

下面给的是第一版足够用的结构，尽量简单，方便你先落地。

### 5.1 `posts`

建议字段：

- `id` bigint 主键
- `slug` varchar，唯一
- `title` varchar
- `plain_title` varchar
- `summary` varchar，对应当前 `desc`
- `content_markdown` longtext
- `cover_url` varchar
- `type` enum('blog','daily')
- `status` enum('draft','published')
- `post_index` int，兼容你现在的期数排序
- `published_at` datetime
- `created_at` datetime
- `updated_at` datetime

说明：

- `slug` 对应当前 Markdown 文件名或 URL 标识
- `content_markdown` 直接存 Markdown 原文
- `type` 用来区分文章和日常，不必拆两张表

### 5.2 `tags`

建议字段：

- `id` bigint 主键
- `name` varchar，唯一
- `created_at` datetime

### 5.3 `post_tags`

建议字段：

- `post_id`
- `tag_id`

说明：

- 一篇文章可有多个标签
- 一个标签可属于多篇文章

### 5.4 `projects`

建议字段：

- `id` bigint 主键
- `name` varchar
- `slug` varchar，唯一
- `description` varchar
- `cover_url` varchar
- `demo_url` varchar
- `repo_url` varchar
- `sort` int
- `is_featured` tinyint
- `status` enum('draft','published')
- `created_at` datetime
- `updated_at` datetime

### 5.5 `site_profile`

建议字段：

- `id` bigint 主键
- `site_title` varchar
- `author_name` varchar
- `description` varchar
- `profile_content` text
- `keywords` varchar
- `avatar_url` varchar
- `hero_image_url` varchar
- `longitude` decimal(10, 6)
- `latitude` decimal(10, 6)
- `email` varchar
- `cv_url` varchar
- `notion_url` varchar
- `weekly_url` varchar
- `created_at` datetime
- `updated_at` datetime

### 5.6 `social_links`

建议字段：

- `id` bigint 主键
- `platform` varchar
- `account_id` varchar
- `url` varchar
- `sort` int
- `is_enabled` tinyint

建议平台先支持：

- `github`
- `twitter`
- `juejin`

## 6. 字段迁移映射

### 6.1 Markdown 到 `posts`

当前文件：

- `src/blog/post/*.md`
- `src/blog/weekly/*.md`

建议映射：

- 文件名 `01-贝塞尔曲线公式推导.md` -> `slug`
- frontmatter `title` -> `title`
- 解析后的 `plainTitle` -> `plain_title`
- frontmatter `desc` -> `summary`
- frontmatter `cover` -> `cover_url`
- 正文内容 -> `content_markdown`
- `isWeekly=false` -> `type=blog`
- `isWeekly=true` -> `type=daily`
- `date` -> `published_at`
- 文件名前缀期数 -> `post_index`

### 6.2 `PROJECTS` 到 `projects`

当前字段映射：

- `name` -> `name`
- `desc` -> `description`
- `cover` -> `cover_url`
- `demoUrl` -> `demo_url`
- `repoUrl` -> `repo_url`

### 6.3 `SITE` 到 `site_profile` 与 `social_links`

建议拆法：

- `title`、`author`、`description`、`profileContent`、`keywords` -> `site_profile`
- `coordinate` -> `site_profile.longitude` + `site_profile.latitude`
- `cv`、`mail`、`notion`、`weeklyUrl` -> `site_profile`
- `githubId`、`githubHome`、`twitterId`、`twitterUrl`、`juejin` -> `social_links`

## 7. NestJS 模块建议

推荐最小模块划分如下：

- `site` 模块：站点资料、社交链接
- `posts` 模块：文章与日常
- `tags` 模块：标签查询
- `projects` 模块：项目展示
- `admin` 模块：后台鉴权和管理接口
- `upload` 模块：后续如果你要上传封面图，再接对象存储

如果第一阶段只做能上线的版本，建议先实现：

- `site`
- `posts`
- `projects`

`tags` 可以先挂在 `posts` 模块内实现。

## 8. 前后端职责建议

### 8.1 前端负责

- 页面渲染
- Markdown 展示
- 标签筛选交互
- 目录高亮
- 主题切换
- 本地 UI 状态

### 8.2 NestJS 负责

- 文章列表查询
- 文章详情查询
- 项目列表查询
- 站点资料查询
- 后台新增、编辑、删除
- 内容发布状态控制

### 8.3 MySQL 负责

- 持久化结构化内容
- 维持文章、标签、项目之间关系
- 支持分页、排序、筛选

## 9. 哪些内容仍不建议放数据库

这些内容建议继续保留在前端或环境变量中：

- `NEXT_PUBLIC_AMAP_KEY`
- `NEXT_PUBLIC_AMAP_SECURITY_JS_CODE`
- 地图明暗样式字符串
- 前端导航动画
- Bento 卡片坐标
- 本地主题状态
- 本地页面切换偏好

原因：

- 它们不是内容数据
- 不是后台运营数据
- 不需要复杂查询

## 10. 第一阶段落地方案

如果你想先最小成本上线，建议按下面的顺序来。

### 第一步

先保留现有前端页面结构不动，仅把“本地内容源”替换成接口。

也就是把：

- `getRegularPosts()`
- `getWeeklyPosts()`
- `getPostById()`
- `PROJECTS`
- `SITE`

逐步改成请求 NestJS。

### 第二步

NestJS 先实现三组公共接口：

- 站点信息接口
- 文章接口
- 项目接口

这样前端就已经能完全摆脱本地 Markdown 和本地常量。

### 第三步

再补后台管理：

- 新增文章
- 编辑文章
- 新增项目
- 修改站点资料

### 第四步

最后再考虑扩展能力：

- 封面图上传
- 草稿发布
- 文章置顶
- 推荐项目
- 首页卡片后台配置

## 11. 推荐的接口返回结构

### 11.1 文章列表

```json
{
  "list": [
    {
      "id": 1,
      "slug": "01-bezier-derivation",
      "title": "贝塞尔曲线公式推导",
      "plainTitle": "贝塞尔曲线公式推导",
      "summary": "贝塞尔曲线的公式推导，和 SVG 中 Path 的贝塞尔曲线指令的理解记忆",
      "coverUrl": "https://cdn.example.com/post-cover.png",
      "type": "blog",
      "postIndex": 1,
      "publishedAt": "2023-09-25 00:00:00",
      "tags": ["一般般"]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 100
  }
}
```

### 11.2 文章详情

```json
{
  "id": 1,
  "slug": "01-bezier-derivation",
  "title": "贝塞尔曲线公式推导",
  "plainTitle": "贝塞尔曲线公式推导",
  "summary": "贝塞尔曲线的公式推导，和 SVG 中 Path 的贝塞尔曲线指令的理解记忆",
  "coverUrl": "https://cdn.example.com/post-cover.png",
  "contentMarkdown": "# 标题",
  "type": "blog",
  "postIndex": 1,
  "publishedAt": "2023-09-25 00:00:00",
  "tags": ["一般般"]
}
```

### 11.3 站点信息

```json
{
  "siteTitle": "博客",
  "authorName": "Arvin",
  "description": "记录 Arvin 的不枯燥生活",
  "profileContent": "我是 Arvin，目前生活在南京的开发者。",
  "keywords": "Arvin, Blog, 前端, Vue, 博客",
  "avatarUrl": "https://cdn.example.com/logo.svg",
  "location": {
    "longitude": 118.888175,
    "latitude": 32.048268
  },
  "socialLinks": [
    {
      "platform": "github",
      "url": "https://github.com/pinky-pig"
    }
  ]
}
```

## 12. 最终建议

按你当前项目现状，最合理的拆分是：

- MySQL 存：文章、标签、项目、站点资料、社交链接
- NestJS 提供：公共内容接口和后台管理接口
- Next.js 保留：页面结构、渲染逻辑、主题状态、动画和地图前端能力
- 环境变量保留：高德 Key、后端地址、数据库连接等敏感配置

如果后续你只想先做一个最小可上线版本，我建议优先实现：

1. `posts` 表
2. `projects` 表
3. `site_profile` 表
4. `GET /api/public/site`
5. `GET /api/public/posts`
6. `GET /api/public/posts/:slug`
7. `GET /api/public/projects`

这样前端基本就能平滑从“本地数据”迁移到“服务端数据”。

## 13. Markdown 导入规范

如果你希望“后台通过导入 Markdown 文件新增文章”，建议不要直接拿现有本地文件就入库，而是先定义统一的导入规范。

推荐第一版导入格式如下：

```md
---
title: 贝塞尔曲线公式推导
date: 2023-09-25
desc: 贝塞尔曲线的公式推导，和 SVG 中 Path 的贝塞尔曲线指令的理解记忆
tags:
  - 数学
  - SVG
  - 前端
cover: https://cdn.example.com/post-cover.png
type: blog
status: published
---

[[toc]]

正文内容...
```

### 13.1 字段说明

- `title`：必填，文章标题
- `date`：必填，发布日期，统一使用 `YYYY-MM-DD`
- `desc`：建议必填，文章摘要
- `tags`：必填，标签数组，存纯文本，不带 `#`
- `cover`：选填，封面图地址
- `type`：必填，只允许 `blog` 或 `daily`
- `status`：必填，只允许 `draft` 或 `published`
- `content`：正文内容，不能为空

### 13.2 与当前本地 Markdown 的兼容策略

当前项目的本地文章格式与推荐导入格式不完全一致，例如：

- 当前 `date` 使用 `2023/09/25`
- 当前 `tags` 形如 `['#全部','#一般般']`
- 当前没有 `type` 和 `status`

建议后台导入器做兼容和规范化：

- `2023/09/25` 自动转换为 `2023-09-25`
- 标签自动去掉前缀 `#`
- 如果目录来自 `post/`，默认 `type=blog`
- 如果目录来自 `weekly/`，默认 `type=daily`
- 如果没有传 `status`，默认 `draft`

### 13.3 校验规则

后台接收 Markdown 后，建议按下面顺序校验：

1. 文件后缀必须为 `.md`
2. 文件内容必须包含 frontmatter
3. frontmatter 中必须存在 `title`、`date`、`tags`
4. `date` 必须能被解析为合法日期
5. `tags` 必须是字符串数组
6. `type` 必须是 `blog` 或 `daily`
7. `status` 必须是 `draft` 或 `published`
8. 正文不能为空
9. `cover` 如果存在，必须是合法 URL

### 13.4 导入失败示例

以下内容应直接拒绝导入：

```md
---
title:
date: 今天
tags: 全部
---
```

失败原因应明确返回：

- `title` 不能为空
- `date` 格式错误，必须为 `YYYY-MM-DD`
- `tags` 必须是数组，例如 `['前端', 'SVG']`

### 13.5 推荐模板下载

后台建议提供“下载模板”功能，模板内容如下：

```md
---
title:
date:
desc:
tags:
  -
cover:
type: blog
status: draft
---

[[toc]]

请在这里填写正文
```

这样可以从源头减少导入格式错误。

## 14. Markdown 导入流程

建议后台的导入流程如下：

1. 管理员上传 Markdown 文件
2. NestJS 接收文件
3. 使用 `gray-matter` 解析 frontmatter 和正文
4. 使用 schema 校验字段合法性
5. 对旧格式做规范化处理
6. 生成待导入的预览结果
7. 管理员确认后再写入 MySQL

推荐链路如下：

`上传文件 -> 解析 -> 校验 -> 规范化 -> 预览确认 -> 入库`

### 14.1 建议的导入结果预览

后台在真正入库前，建议先展示：

- 标题
- 类型
- 发布时间
- 标签
- 封面图
- 摘要
- 正文长度
- 校验是否通过

### 14.2 批量导入建议

如果后续要支持批量导入，建议支持 `.zip` 包：

- 每个 `.md` 文件逐个解析
- 每个文件单独返回成功或失败状态
- 最终汇总导入结果

建议结果格式：

- 成功：8 篇
- 失败：2 篇
- `03-xx.md` 缺少 `title`
- `08-xx.md` 的 `cover` 不是合法 URL

## 15. Markdown 与数据库的同步策略

这一部分最重要，必须先明确谁是“真源”。

### 15.1 推荐真源

推荐采用下面的关系：

- Markdown：编辑源
- MySQL：线上真源
- NestJS：统一读写入口
- Next.js：只读 NestJS 接口

推荐链路如下：

`Markdown -> 导入器 -> MySQL -> NestJS API -> Next.js`

### 15.2 新增逻辑

新增一篇 Markdown 后：

1. 管理员在后台导入 `.md`
2. 后台解析并校验
3. 通过后生成 `slug`
4. 根据 `slug` 查询数据库是否已存在
5. 不存在则插入文章、标签和关联关系

### 15.3 更新逻辑

再次导入同一篇文章时：

1. 根据 `slug` 或导入任务中的唯一键查询原记录
2. 更新标题、摘要、正文、封面、标签、发布时间
3. 重新计算标签关联

### 15.4 删除逻辑

推荐不要直接根据“本地文件不存在”就硬删数据库，而是采用后台显式删除或下线：

- 后台点删除 -> 物理删除或软删除
- 后台点下线 -> `status=draft`

如果后续你确实要做“目录同步删除”，建议仅在导入工具中提供可选开关：

- `同步缺失文件为草稿`
- `同步缺失文件为删除`

默认推荐先下线，不直接物理删除。
