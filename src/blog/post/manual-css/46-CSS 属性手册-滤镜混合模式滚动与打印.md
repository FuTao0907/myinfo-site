---
title: CSS 属性手册：滤镜、混合模式、滚动与打印
date: 2026/05/19
desc: 系统整理 CSS 中较现代但很实用的能力，包括滤镜、混合模式、滚动行为、打印样式、层管理和部分滚动相关属性，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 4：这篇偏现代能力和边缘高频场景，尤其适合做效果和页面打印时查询。</small>

# 一、滤镜与背景混合

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `filter` | `blur()` `grayscale()` `brightness()` | 元素滤镜 |
| `backdrop-filter` | `blur()` | 背景模糊 |
| `mix-blend-mode` | `multiply` `screen` | 与背景混合 |
| `background-blend-mode` | `overlay` `multiply` | 多背景混合 |

```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}
```

# 二、滚动相关属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `scroll-behavior` | `auto` `smooth` | 平滑滚动 |
| `scroll-margin-top` | 长度值 | 锚点定位偏移 |
| `scroll-padding-top` | 长度值 | 容器滚动内边距 |
| `scroll-snap-type` | `x mandatory` | 吸附滚动 |
| `scroll-snap-align` | `start` `center` | 吸附对齐 |
| `overscroll-behavior` | `contain` `none` | 滚动边界行为 |

```css
html {
  scroll-behavior: smooth;
}

.section {
  scroll-margin-top: 80px;
}
```

# 三、打印样式

```css
@media print {
  nav,
  .toolbar,
  .no-print {
    display: none !important;
  }

  body {
    color: #000;
    background: #fff;
  }
}
```

- 原理总结：打印环境和屏幕环境需求不同，通常需要主动隐藏交互区域和装饰样式。
- 注意点：打印样式最好单独考虑分页和黑白可读性。

# 四、层管理与作用域

## 1. `@layer`

```css
@layer reset, base, components, utilities;

@layer base {
  body {
    margin: 0;
  }
}
```

## 2. `:where()` 和 `:is()`

```css
:where(main, section, article) {
  min-width: 0;
}

:is(h1, h2, h3) {
  line-height: 1.2;
}
```

- 原理总结：`@layer` 管样式层级，`:where()`/`:is()` 管选择器组织。
- 注意点：`:where()` 不增加权重，适合作为基础规则。

# 五、媒体能力与用户偏好

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}

@media (prefers-color-scheme: dark) {
  body {
    background: #0f172a;
    color: #f8fafc;
  }
}
```

- 原理总结：现代 CSS 可以直接读取用户系统偏好。
- 注意点：颜色主题和减少动态效果是最值得优先兼容的两项。

# 六、注意点

- `backdrop-filter` 视觉效果强，但性能成本也不低。
- 滚动吸附适合轮播或分屏内容，不适合所有长页面。
- 打印样式不要忘记链接、标题和正文的可读性。
