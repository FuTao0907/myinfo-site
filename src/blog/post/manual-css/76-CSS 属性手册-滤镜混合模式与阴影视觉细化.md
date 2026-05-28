---
title: CSS 属性手册：滤镜、混合模式与阴影视觉细化
date: 2026/05/19
desc: 系统整理 CSS 中 filter、backdrop-filter、mix-blend-mode、阴影与常见视觉效果模板，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 14：聚焦视觉效果相关属性，适合做卡片、毛玻璃、滤镜和层次感时查阅。</small>

# 一、`filter`

常见函数：

- `blur()`
- `grayscale()`
- `brightness()`
- `contrast()`
- `drop-shadow()`
- `saturate()`
- `sepia()`

```css
.image-muted {
  filter: grayscale(1) brightness(0.9);
}
```

# 二、`backdrop-filter`

```css
.glass {
  background: rgba(255, 255, 255, 0.18);
  backdrop-filter: blur(12px);
}
```

- 作用：对元素背后的背景进行滤镜处理。
- 注意点：视觉好，但性能成本不低。

# 三、混合模式

## 1. `mix-blend-mode`

```css
.badge {
  mix-blend-mode: multiply;
}
```

## 2. `background-blend-mode`

```css
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url('/cover.jpg');
  background-blend-mode: overlay;
}
```

# 四、阴影

## 1. `box-shadow`

```css
.card {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}
```

## 2. `text-shadow`

```css
.title {
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}
```

## 3. `drop-shadow()`

```css
.icon {
  filter: drop-shadow(0 4px 10px rgba(0, 0, 0, 0.2));
}
```

# 五、常见模板

## 1. 毛玻璃卡片

```css
.glass-card {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.12);
}
```

## 2. 图片悬停发灰

```css
.image {
  transition: filter 0.2s ease;
}

.image:hover {
  filter: grayscale(1);
}
```

## 3. 按钮发光

```css
.glow {
  box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.2), 0 8px 20px rgba(37, 99, 235, 0.3);
}
```

# 六、注意点

- 滤镜和大面积模糊不要滥用。
- 阴影层级最好建立统一设计规范。
- 混合模式在不同背景下视觉差异会很大，落地前要实测。
