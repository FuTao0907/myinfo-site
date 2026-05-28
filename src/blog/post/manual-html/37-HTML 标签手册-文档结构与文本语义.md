---
title: HTML 标签手册：文档结构与文本语义
date: 2026/05/19
desc: 逐条整理 HTML 文档结构与文本语义相关标签，包含用途、常用属性、可访问性要点和最小示例，适合作为查询手册使用。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 1：专门覆盖文档结构与文本语义标签，便于逐条查阅。</small>

# 一、文档结构标签

## 1. `<!doctype html>`

- 作用：声明 HTML5 文档模式。
- 常用属性：无。
- 示例：

```html
<!doctype html>
```

## 2. `html`

- 作用：文档根元素。
- 常用属性：`lang`。
- 示例：

```html
<html lang="zh-CN"></html>
```

## 3. `head`

- 作用：存放元数据，不直接渲染正文。
- 常用属性：无。
- 示例：

```html
<head>
  <meta charset="UTF-8" />
</head>
```

## 4. `meta`

- 作用：定义字符集、视口、描述等元信息。
- 常用属性：`charset`、`name`、`content`。
- 示例：

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="页面描述" />
```

## 5. `title`

- 作用：浏览器标签标题、搜索摘要参考信息之一。
- 示例：

```html
<title>我的页面标题</title>
```

## 6. `link`

- 作用：引入外部资源（样式、图标等）。
- 常用属性：`rel`、`href`。
- 示例：

```html
<link rel="stylesheet" href="/styles.css" />
<link rel="icon" href="/favicon.ico" />
```

## 7. `style`

- 作用：嵌入页面级样式。
- 示例：

```html
<style>
  body {
    margin: 0;
  }
</style>
```

## 8. `script`

- 作用：引入或编写脚本。
- 常用属性：`src`、`type`、`defer`、`async`。
- 示例：

```html
<script src="/app.js" defer></script>
<script type="module" src="/main.js"></script>
```

# 二、语义分区标签

## 1. `header`

- 作用：页面或区块头部。
- 示例：

```html
<header>站点头部</header>
```

## 2. `nav`

- 作用：导航区域。
- 常用属性：`aria-label`。
- 示例：

```html
<nav aria-label="主导航">...</nav>
```

## 3. `main`

- 作用：页面主内容区域（通常一个页面仅一个）。
- 示例：

```html
<main>主内容</main>
```

## 4. `section`

- 作用：同主题内容分组。
- 示例：

```html
<section>
  <h2>章节标题</h2>
</section>
```

## 5. `article`

- 作用：可独立分发的内容单元（文章、卡片、帖子）。
- 示例：

```html
<article>
  <h2>文章标题</h2>
</article>
```

## 6. `aside`

- 作用：补充内容（侧栏、推荐、广告等）。
- 示例：

```html
<aside>相关推荐</aside>
```

## 7. `footer`

- 作用：页面或区块底部信息。
- 示例：

```html
<footer>Copyright 2026</footer>
```

# 三、标题与文本标签

## 1. 标题 `h1` - `h6`

- 作用：定义层级标题。
- 示例：

```html
<h1>一级标题</h1>
<h2>二级标题</h2>
```

## 2. 段落与行内容器

- `p`：段落
- `span`：行内容器

```html
<p>这是一段正文。</p>
<span>行内文本</span>
```

## 3. 强调与语义标记

- `strong`：重要强调
- `em`：语气强调
- `small`：附注
- `mark`：高亮

```html
<p><strong>重点</strong> 与 <em>强调</em></p>
<small>附加说明</small>
<mark>关键词</mark>
```

## 4. 引用与代码

- `blockquote`：块级引用
- `q`：行内引用
- `code`：代码片段
- `pre`：预格式文本

```html
<blockquote cite="https://example.com">长引用</blockquote>
<q>短引用</q>
<pre><code>const a = 1</code></pre>
```

# 四、列表标签

- `ul`：无序列表
- `ol`：有序列表
- `li`：列表项
- `dl` `dt` `dd`：术语列表

```html
<ul>
  <li>苹果</li>
  <li>香蕉</li>
</ul>

<ol start="3">
  <li>第三步</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>超文本标记语言</dd>
</dl>
```

# 五、可访问性要点

- `html` 必填 `lang`。
- 页面结构中优先使用语义标签而不是纯 `div`。
- 标题层级按内容结构递进，不跳级乱用。
- 交互元素尽量使用原生可访问控件。
