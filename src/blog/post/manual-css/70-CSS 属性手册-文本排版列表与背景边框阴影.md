---
title: CSS 属性手册：文本排版、列表与背景边框阴影
date: 2026/05/19
desc: 系统整理 CSS 中与文本排版、列表样式、背景、边框、圆角和阴影相关的高频属性与示例，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 12：专门整理排版和视觉基础属性，方便写文章页、列表页和卡片样式时直接查。</small>

# 一、文本排版

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `color` | 颜色值 | 文本颜色 |
| `font-size` | `16px` `1rem` | 字号 |
| `font-family` | 字体栈 | 字体族 |
| `font-weight` | `400` `700` | 字重 |
| `font-style` | `normal` `italic` | 字体风格 |
| `line-height` | `1.5` `24px` | 行高 |
| `letter-spacing` | 长度值 | 字间距 |
| `text-align` | `left` `center` | 对齐 |
| `text-decoration` | `none` `underline` | 装饰 |
| `text-transform` | `uppercase` | 大小写 |
| `white-space` | `normal` `nowrap` `pre-wrap` | 空白处理 |
| `text-overflow` | `ellipsis` | 文本溢出 |

```css
.title {
  color: #111827;
  font-size: 32px;
  font-weight: 700;
  line-height: 1.2;
}
```

# 二、列表样式

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `list-style-type` | `disc` `decimal` `none` | 列表标记类型 |
| `list-style-position` | `outside` `inside` | 标记位置 |
| `list-style-image` | `url(...)` | 自定义标记图 |
| `list-style` | 简写 | 综合声明 |

```css
.plain-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
```

# 三、背景属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `background-color` | 颜色值 | 背景色 |
| `background-image` | `url(...)` `linear-gradient(...)` | 背景图 |
| `background-repeat` | `no-repeat` | 是否平铺 |
| `background-position` | `center` | 背景位置 |
| `background-size` | `cover` `contain` | 背景尺寸 |
| `background-attachment` | `scroll` `fixed` | 背景滚动行为 |
| `background` | 简写 | 综合声明 |

```css
.hero {
  background: linear-gradient(180deg, #0f172a, #1e293b);
  color: white;
}
```

# 四、边框与圆角

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `border-width` | `1px` | 宽度 |
| `border-style` | `solid` `dashed` | 样式 |
| `border-color` | 颜色值 | 颜色 |
| `border` | 简写 | 综合声明 |
| `border-top` 等 | 边单独设置 | 单边控制 |
| `border-radius` | `8px` `50%` | 圆角 |

```css
.panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
}
```

# 五、阴影

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `box-shadow` | 阴影值 | 盒阴影 |
| `text-shadow` | 阴影值 | 文字阴影 |

```css
.card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

# 六、常见模板

单行省略：

```css
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

多行截断：

```css
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
```

# 七、注意点

- `text-overflow: ellipsis` 必须配合溢出隐藏和不换行。
- 背景图大多会带来性能成本，优先压缩。
- 阴影不要层层叠太多，容易显脏且影响性能。
