---
title: CSS 动画与过渡笔记
date: 2026/05/19
desc: 按模板方式整理 CSS 动画最常用的写法，包括 transition、keyframes、进入离开和 reduced motion 适配。
tags: ['#CSS与界面', '#全部', '#CSS', '#动画']
cover: https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop" width=600 />

<small>动画最重要的是顺滑和可控，这篇只留最常用的模板。</small>

# 一、过渡动画

```css
.button {
  transition: transform 0.2s ease, opacity 0.2s ease;
}

.button:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}
```

- 原理总结：`transition` 适合状态变化时的平滑过渡。
- 注意点：优先动画 `transform` 和 `opacity`。

# 二、关键帧动画

```css
@keyframes fade-in-up {
  from {
    opacity: 0;
    transform: translateY(12px);
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

- 原理总结：`keyframes` 适合明确的进入、离开和循环动画。
- 注意点：动画别直接改 `width`、`height`、`top`、`left`。

# 三、减少动画影响

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
```

- 原理总结：尊重用户系统里的减少动态效果偏好。
- 注意点：这类适配最好作为全局基础能力保留。
