---
title: CSS 属性手册：媒体查询、容器查询与环境偏好
date: 2026/05/19
desc: 系统整理 CSS 中与环境适配相关的规则和属性，包括媒体查询、容器查询、用户偏好与主题相关能力，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 9：聚焦适配环境变化的 CSS 能力，尤其是响应式和用户偏好读取。</small>

# 一、媒体查询 `@media`

常见条件：

- `(max-width: 768px)`
- `(min-width: 1024px)`
- `(orientation: portrait)`
- `(prefers-color-scheme: dark)`
- `(prefers-reduced-motion: reduce)`

```css
@media (max-width: 768px) {
  .sidebar {
    display: none;
  }
}
```

# 二、容器查询 `@container`

## 1. 启用容器

```css
.card-list {
  container-type: inline-size;
}
```

## 2. 编写查询

```css
@container (max-width: 420px) {
  .card {
    grid-template-columns: 1fr;
  }
}
```

常见属性：

- `container-type`
- `container-name`

- 原理总结：媒体查询看视口，容器查询看组件自身可用空间。

# 三、主题偏好

## 1. 深色模式

```css
@media (prefers-color-scheme: dark) {
  body {
    background: #0f172a;
    color: #f8fafc;
  }
}
```

## 2. `color-scheme`

```css
:root {
  color-scheme: light dark;
}
```

- 作用：告诉浏览器页面支持哪些主题色方案。

# 四、动态效果偏好

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

- 作用：尊重用户系统里的“减少动态效果”偏好。

# 五、对比度与更多环境信号

常见可关注项：

- `prefers-contrast`
- `forced-colors`
- `hover`
- `pointer`

示例：

```css
@media (hover: hover) {
  .card:hover {
    transform: translateY(-2px);
  }
}
```

# 六、推荐实践

- 页面级响应式优先用 `@media`
- 组件级响应式优先考虑 `@container`
- 配色和动效要考虑用户偏好
- 不要把所有适配逻辑都堆到一个超长媒体查询里
