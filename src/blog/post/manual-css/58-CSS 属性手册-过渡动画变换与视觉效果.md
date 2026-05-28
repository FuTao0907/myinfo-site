---
title: CSS 属性手册：过渡、动画、变换与视觉效果
date: 2026/05/19
desc: 系统整理 CSS 中 transition、animation、transform、filter、opacity 等视觉效果相关属性，包含常见值和示例，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>分卷 8：专门整理视觉效果相关属性，便于做交互动效和状态反馈时快速查询。</small>

# 一、过渡 `transition`

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `transition-property` | `all` `transform` | 过渡属性 |
| `transition-duration` | `0.2s` | 持续时间 |
| `transition-timing-function` | `ease` `linear` `ease-in-out` | 缓动函数 |
| `transition-delay` | `0s` | 延迟 |
| `transition` | 简写 | 综合声明 |

```css
.button {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  opacity: 0.95;
}
```

# 二、动画 `animation`

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `animation-name` | 动画名 | 绑定关键帧 |
| `animation-duration` | `0.3s` | 持续时间 |
| `animation-timing-function` | `ease` | 缓动 |
| `animation-delay` | `0s` | 延迟 |
| `animation-iteration-count` | `1` `infinite` | 次数 |
| `animation-direction` | `normal` `alternate` | 方向 |
| `animation-fill-mode` | `forwards` `both` | 填充模式 |
| `animation-play-state` | `running` `paused` | 播放状态 |
| `animation` | 简写 | 综合声明 |

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

# 三、变换 `transform`

| 函数 | 作用 | 示例 |
| --- | --- | --- |
| `translate()` | 位移 | `translate(10px, 20px)` |
| `translateX()` / `translateY()` | 单轴位移 | `translateY(-4px)` |
| `scale()` | 缩放 | `scale(1.05)` |
| `rotate()` | 旋转 | `rotate(45deg)` |
| `skew()` | 倾斜 | `skew(10deg)` |

辅助属性：

- `transform-origin`
- `transform-style`
- `perspective`

```css
.card:hover {
  transform: scale(1.02);
}
```

# 四、透明度、滤镜与混合

| 属性 | 常见值 | 说明 |
| --- | --- | --- |
| `opacity` | `0-1` | 透明度 |
| `filter` | `blur()` `grayscale()` `brightness()` | 滤镜 |
| `backdrop-filter` | `blur(12px)` | 背景模糊 |
| `mix-blend-mode` | `multiply` `screen` | 与背景混合 |

```css
.glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(12px);
}
```

# 五、常见视觉模板

## 1. 毛玻璃

```css
.glass-card {
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(16px);
}
```

## 2. 骨架屏

```css
.skeleton {
  background: linear-gradient(90deg, #eee 25%, #f5f5f5 37%, #eee 63%);
  background-size: 400% 100%;
  animation: skeleton-loading 1.4s ease infinite;
}
```

## 3. 卡片悬浮

```css
.card {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.12);
}
```

# 六、无障碍与性能建议

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
- 少频繁修改 `width`、`height`、`top`、`left`
- 高强度滤镜和大面积模糊慎用
