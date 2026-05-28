---
title: HTML 标签手册：全局属性、链接与资源关系
date: 2026/05/19
desc: 逐条整理 HTML 全局属性、链接相关标签与资源关系标签，包含用途、常用属性、安全注意点和最小示例，适合作为查询手册。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop" width=600 />

<small>分卷 3：聚焦全局属性、超链接、资源关系和一些容易忽略但很常用的 HTML 能力。</small>

# 一、全局属性

几乎所有 HTML 元素都可使用以下属性：

| 属性              | 作用           | 示例                                                  |
| ----------------- | -------------- | ----------------------------------------------------- |
| `id`              | 唯一标识元素   | `<div id="app"></div>`                                |
| `class`           | 绑定样式与分类 | `<div class="card"></div>`                            |
| `style`           | 内联样式       | `<div style="color:red"></div>`                       |
| `title`           | 悬浮提示       | `<abbr title="HyperText Markup Language">HTML</abbr>` |
| `lang`            | 语言           | `<article lang="en"></article>`                       |
| `dir`             | 文本方向       | `<p dir="rtl">...</p>`                                |
| `hidden`          | 隐藏元素       | `<div hidden></div>`                                  |
| `tabindex`        | 焦点顺序       | `<div tabindex="0"></div>`                            |
| `contenteditable` | 可编辑         | `<div contenteditable="true"></div>`                  |
| `draggable`       | 可拖拽         | `<div draggable="true"></div>`                        |
| `spellcheck`      | 拼写检查       | `<textarea spellcheck="false"></textarea>`            |
| `translate`       | 是否翻译       | `<code translate="no"></code>`                        |
| `data-*`          | 自定义数据     | `<button data-id="1"></button>`                       |

## `data-*`

```html
<button data-id="1001" data-role="primary">保存</button>
```

```ts
/**
 * 读取按钮上的 dataset 数据。
 */
function readDataset(button: HTMLButtonElement) {
  return {
    id: button.dataset.id,
    role: button.dataset.role,
  }
}
```

- 原理总结：`data-*` 适合轻量级业务数据挂载。
- 注意点：不要把复杂业务状态全塞到 `data-*` 里。

# 二、超链接标签

## 1. `a`

- 作用：创建超链接。
- 常用属性：`href`、`target`、`rel`、`download`。

```html
<a href="/about">关于我们</a>
<a href="https://example.com" target="_blank" rel="noopener noreferrer">外部链接</a>
<a href="/files/demo.pdf" download>下载文件</a>
```

- 注意点：`target="_blank"` 时建议加 `rel="noopener noreferrer"`。

## 2. `base`

- 作用：指定文档中相对 URL 的基准地址。

```html
<base href="https://example.com/" />
```

- 注意点：项目里使用前要明确影响范围，它会影响整个页面内的相对路径解析。

# 三、资源关系标签

## 1. `link`

- 作用：建立当前文档与外部资源的关系。
- 常用属性：`rel`、`href`、`as`、`media`、`sizes`。

```html
<link rel="stylesheet" href="/styles.css" />
<link rel="icon" href="/favicon.ico" />
<link rel="preload" href="/font.woff2" as="font" crossorigin />
<link rel="preconnect" href="https://cdn.example.com" />
```

常见 `rel`：

- `stylesheet`
- `icon`
- `preload`
- `preconnect`
- `dns-prefetch`
- `canonical`

## 2. `meta`

常见用法：

```html
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="页面描述" />
<meta name="robots" content="index,follow" />
```

# 四、图片热点与资源映射

## 1. `map` 与 `area`

```html
<img src="/map.png" usemap="#demo-map" alt="地图" />
<map name="demo-map">
  <area shape="rect" coords="0,0,100,100" href="/region-a" alt="区域 A" />
</map>
```

- 作用：给图片定义可点击区域。
- 注意点：现代项目中不常见，但在特定可视化或古老系统里仍会遇到。

# 五、SEO 与链接关系补充

## 1. 规范链接 `canonical`

```html
<link rel="canonical" href="https://example.com/post/1" />
```

## 2. 社交分享元数据

```html
<meta property="og:title" content="文章标题" />
<meta property="og:description" content="文章摘要" />
<meta property="og:image" content="https://example.com/cover.jpg" />
```

# 六、常见注意点

- `id` 应保持页面唯一。
- `tabindex` 不要滥用，尤其避免打乱正常焦点顺序。
- `a` 标签如果承担按钮行为，要谨慎评估语义是否合适。
- `link rel="preload"` 只给真正关键资源使用，避免过度预加载。
