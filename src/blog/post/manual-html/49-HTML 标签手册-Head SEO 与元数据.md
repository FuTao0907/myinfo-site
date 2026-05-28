---
title: HTML 标签手册：Head、SEO 与元数据
date: 2026/05/19
desc: 系统整理 HTML head 区域中常见的标题、meta、link、SEO、社交分享和性能相关标签与属性，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 5：专门整理 `head` 内的标签和元数据，方便做 SEO、性能和社交分享配置时直接查询。</small>

# 一、`head` 里常见的标签

| 标签 | 作用 | 常见属性 | 最小示例 |
| --- | --- | --- | --- |
| `title` | 页面标题 | 无 | `<title>页面标题</title>` |
| `meta` | 元信息 | `charset` `name` `content` `property` | `<meta charset="UTF-8" />` |
| `link` | 外部资源关系 | `rel` `href` `as` | `<link rel="stylesheet" href="/a.css" />` |
| `style` | 内联样式 | 无 | `<style>body{margin:0}</style>` |
| `script` | 脚本 | `src` `type` `defer` `async` | `<script src="/a.js" defer></script>` |
| `base` | 相对路径基准 | `href` `target` | `<base href="/" />` |

# 二、标题与描述

## 1. `title`

- 作用：决定浏览器标签标题，也是 SEO 最基础的一项。
- 建议：每页唯一、尽量准确，不要堆砌关键词。

```html
<title>HTML 标签手册：Head、SEO 与元数据</title>
```

## 2. 页面描述

```html
<meta name="description" content="系统整理 HTML head 区域中的元数据配置。" />
```

- 作用：搜索摘要、分享描述的重要来源之一。
- 注意点：描述应概括页面核心内容，不要重复标题。

# 三、字符集与视口

## 1. 字符集

```html
<meta charset="UTF-8" />
```

## 2. 视口

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

- 原理总结：字符集决定文本解码方式，视口配置影响移动端布局缩放。
- 注意点：现代页面通常默认使用 UTF-8 和标准移动端视口。

# 四、搜索引擎与索引控制

## 1. robots

```html
<meta name="robots" content="index,follow" />
```

常见值：

- `index`
- `noindex`
- `follow`
- `nofollow`

## 2. canonical

```html
<link rel="canonical" href="https://example.com/posts/seo-meta" />
```

- 作用：告诉搜索引擎当前页面的规范地址。
- 注意点：重复内容页面应正确设置 `canonical`，避免权重分散。

# 五、社交分享元数据

## 1. Open Graph

```html
<meta property="og:title" content="文章标题" />
<meta property="og:description" content="文章描述" />
<meta property="og:image" content="https://example.com/cover.jpg" />
<meta property="og:url" content="https://example.com/post/1" />
<meta property="og:type" content="article" />
```

## 2. Twitter Card

```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="文章标题" />
<meta name="twitter:description" content="文章描述" />
<meta name="twitter:image" content="https://example.com/cover.jpg" />
```

- 原理总结：社交平台抓取页面时会读取这些元信息生成预览卡片。
- 注意点：分享封面建议使用可公网访问的绝对 URL。

# 六、图标与主题色

## 1. favicon

```html
<link rel="icon" href="/favicon.ico" />
```

## 2. Apple Touch Icon

```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## 3. 主题色

```html
<meta name="theme-color" content="#0f172a" />
```

# 七、性能相关 link rel

## 1. preload

```html
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin />
```

## 2. preconnect

```html
<link rel="preconnect" href="https://cdn.example.com" />
```

## 3. dns-prefetch

```html
<link rel="dns-prefetch" href="https://cdn.example.com" />
```

- 原理总结：这些关系标签用于提前准备关键资源连接与加载。
- 注意点：只给真正关键资源使用，避免过度预加载。

# 八、脚本加载策略

## 1. `defer`

```html
<script src="/app.js" defer></script>
```

## 2. `async`

```html
<script src="https://example.com/analytics.js" async></script>
```

## 3. `type="module"`

```html
<script type="module" src="/main.js"></script>
```

- `defer`：文档解析完再执行，保留顺序。
- `async`：下载完成即执行，不保证顺序。
- `module`：支持 ESM，默认延后执行。

# 九、结构化数据（入门）

```html
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "文章标题"
  }
</script>
```

- 作用：帮助搜索引擎更结构化地理解页面内容。
- 注意点：内容要和真实页面一致，不要写虚假结构化数据。

# 十、推荐模板

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>页面标题</title>
  <meta name="description" content="页面描述" />
  <link rel="canonical" href="https://example.com/page" />
  <meta property="og:title" content="页面标题" />
  <meta property="og:description" content="页面描述" />
  <meta property="og:image" content="https://example.com/cover.jpg" />
  <meta name="theme-color" content="#0f172a" />
</head>
```
