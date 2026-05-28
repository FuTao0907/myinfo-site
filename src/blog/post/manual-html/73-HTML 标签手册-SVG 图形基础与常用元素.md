---
title: HTML 标签手册：SVG 图形基础与常用元素
date: 2026/05/19
desc: 系统整理 SVG 作为 HTML 内嵌图形时的常用标签、属性和示例，包括 svg、path、circle、rect、line、polyline、polygon、text 等。
tags: ['#HTML手册', '#全部', '#HTML', '#SVG']
cover: https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 13：把 SVG 作为一套独立图形体系来看，方便做图标、图形、简单图表时直接查标签和属性。</small>

# 一、`svg`

- 作用：SVG 根容器。
- 常用属性：
- `viewBox`
- `width`
- `height`
- `xmlns`

```html
<svg viewBox="0 0 100 100" width="100" height="100" xmlns="http://www.w3.org/2000/svg"></svg>
```

- 原理总结：`viewBox` 决定内部坐标系，`width/height` 决定显示尺寸。

# 二、基础形状标签

## 1. `circle`

```html
<svg viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" fill="#2563eb" />
</svg>
```

常用属性：

- `cx`
- `cy`
- `r`
- `fill`
- `stroke`

## 2. `rect`

```html
<rect x="10" y="10" width="80" height="40" rx="8" fill="#0ea5e9" />
```

## 3. `line`

```html
<line x1="10" y1="10" x2="90" y2="90" stroke="#111827" stroke-width="2" />
```

## 4. `polyline`

```html
<polyline points="10,60 30,20 50,40 70,10 90,50" fill="none" stroke="#2563eb" />
```

## 5. `polygon`

```html
<polygon points="50,10 90,90 10,90" fill="#f97316" />
```

# 三、路径 `path`

```html
<path d="M10 10 L90 10 L90 90 Z" fill="none" stroke="#2563eb" />
```

- `M`：移动起点
- `L`：画直线
- `H` / `V`：水平 / 垂直线
- `C`：三次贝塞尔曲线
- `Q`：二次贝塞尔曲线
- `Z`：闭合路径

- 注意点：复杂图标几乎都会落到 `path`。

# 四、文本与分组

## 1. `text`

```html
<text x="10" y="30" fill="#111827">Hello SVG</text>
```

## 2. `g`

```html
<g fill="#2563eb" stroke="#111827">
  <circle cx="20" cy="20" r="8" />
  <circle cx="50" cy="20" r="8" />
</g>
```

- 作用：分组管理多个 SVG 元素。

# 五、常用样式属性

- `fill`
- `stroke`
- `stroke-width`
- `opacity`
- `transform`

```html
<rect x="10" y="10" width="40" height="40" fill="transparent" stroke="#2563eb" stroke-width="2" />
```

# 六、视图与缩放理解

```html
<svg viewBox="0 0 24 24" width="24" height="24">
  <path d="M4 4 H20 V20 H4 Z" />
</svg>
```

- 原理总结：`viewBox="0 0 24 24"` 是图标体系里很常见的坐标标准。
- 注意点：统一坐标系统后，图标和组件更容易复用。

# 七、适用场景

- 图标
- 简单图表
- 路径动画
- 缩放不失真的矢量图

# 八、常见误区

- 把 `width/height` 和 `viewBox` 混为一谈
- 复杂图标还想手写所有 `path`
- 忽略 `fill` 和 `stroke` 的区别
