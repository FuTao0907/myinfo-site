---
title: CSS 属性手册：文本背景动画与响应式
date: 2026/05/19
desc: 逐条整理 CSS 文本、背景、边框、变换、过渡、动画、响应式与现代函数能力，适合作为样式查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 2：视觉和交互向手册，适合查文本、背景、动画和响应式属性。</small>

# 一、文本与字体

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `color` | 颜色值 | 文本颜色 |
| `font-size` | `16px` `1rem` `clamp(...)` | 字号 |
| `font-family` | 字体栈 | 字体族 |
| `font-weight` | `400` `500` `700` | 字重 |
| `font-style` | `normal` `italic` | 字体风格 |
| `line-height` | `1.5` `24px` | 行高 |
| `text-align` | `left` `center` `right` | 文本对齐 |
| `text-decoration` | `none` `underline` | 装饰 |
| `text-transform` | `uppercase` | 大小写转换 |
| `letter-spacing` | 长度值 | 字间距 |
| `white-space` | `normal` `nowrap` `pre-wrap` | 空白处理 |
| `text-overflow` | `ellipsis` | 省略效果 |

# 二、背景与边框

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `background-color` | 颜色值 | 背景色 |
| `background-image` | `url(...)` `linear-gradient(...)` | 背景图 |
| `background-repeat` | `repeat` `no-repeat` | 平铺 |
| `background-position` | `center` | 位置 |
| `background-size` | `cover` `contain` | 尺寸 |
| `border-radius` | `8px` `50%` | 圆角 |
| `border-color` | 颜色值 | 边框颜色 |
| `box-shadow` | 阴影值 | 阴影 |
| `outline` | 边线值 | 外轮廓 |

```css
.card {
  background: linear-gradient(180deg, #fff, #f8fafc);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

# 三、变换与过渡

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `transform` | `translate()` `scale()` `rotate()` | 变换 |
| `transform-origin` | `center` | 变换原点 |
| `transition-property` | `all` `transform` | 过渡属性 |
| `transition-duration` | `0.2s` | 持续时间 |
| `transition-timing-function` | `ease` `linear` | 缓动 |
| `transition-delay` | `0s` | 延迟 |
| `transition` | 简写 | 过渡简写 |

```css
.btn {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
```

# 四、动画属性

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `@keyframes` | 自定义名 | 动画关键帧 |
| `animation-name` | 名称 | 动画名 |
| `animation-duration` | `0.3s` | 时长 |
| `animation-timing-function` | `ease` | 缓动 |
| `animation-delay` | `0s` | 延迟 |
| `animation-iteration-count` | `1` `infinite` | 次数 |
| `animation-direction` | `normal` `alternate` | 方向 |
| `animation-fill-mode` | `forwards` `both` | 填充模式 |
| `animation-play-state` | `running` `paused` | 播放状态 |

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.enter {
  animation: fade-in-up 0.3s ease both;
}
```

# 五、响应式与现代规则

| 规则/属性 | 常见值 | 说明 |
| --- | --- | --- |
| `@media` | `(max-width: 768px)` | 媒体查询 |
| `@container` | `(max-width: 420px)` | 容器查询 |
| `container-type` | `inline-size` | 启用容器查询 |
| `aspect-ratio` | `16 / 9` | 固定宽高比 |
| `object-fit` | `cover` `contain` | 媒体裁切 |
| `scroll-behavior` | `smooth` | 平滑滚动 |
| `accent-color` | 颜色值 | 原生控件强调色 |
| `color-scheme` | `light dark` | 告知浏览器主题支持 |

# 六、函数与变量

| 名称 | 示例 | 说明 |
| --- | --- | --- |
| `var()` | `var(--color-text)` | 读取变量 |
| `calc()` | `calc(100% - 32px)` | 计算 |
| `min()` | `min(100%, 1200px)` | 取最小值 |
| `max()` | `max(16px, 2vw)` | 取最大值 |
| `clamp()` | `clamp(16px, 2vw, 24px)` | 最小-弹性-最大 |

```css
:root {
  --space-4: 16px;
  --color-text: #111827;
}

.title {
  color: var(--color-text);
  font-size: clamp(24px, 4vw, 40px);
  margin-bottom: var(--space-4);
}
```

# 七、可访问性与性能相关规则

减少动态效果：

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

建议：

- 优先动画 `transform` 和 `opacity`
- 避免高频修改 `width`、`height`、`top`、`left`
- 响应式优先考虑组件容器而不是只看视口
