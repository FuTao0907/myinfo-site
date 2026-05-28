---
title: CSS 属性手册：颜色、单位、函数与变量系统
date: 2026/05/19
desc: 系统整理 CSS 中颜色表示、尺寸单位、数学函数和变量系统，包含常见取值、使用场景与示例，适合作为查询手册。
tags: ['#CSS手册', '#全部', '#CSS', '#手册']
cover: https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 7：专门整理颜色、长度单位、CSS 函数和变量系统，适合做设计 token 和响应式样式时查询。</small>

# 一、颜色表示方式

| 写法 | 示例 | 说明 |
| --- | --- | --- |
| 关键字 | `red` | 语义简单但不适合设计系统 |
| 十六进制 | `#2563eb` | 最常用 |
| RGB / RGBA | `rgb(37 99 235)` | 适合带透明度场景 |
| HSL / HSLA | `hsl(221 83% 53%)` | 更适合调色思考 |

```css
.primary {
  color: #2563eb;
  background: rgb(37 99 235 / 0.1);
}
```

# 二、常见长度单位

| 单位 | 说明 | 常见场景 |
| --- | --- | --- |
| `px` | 像素单位 | 精准尺寸 |
| `%` | 相对父级 | 流式布局 |
| `em` | 相对当前字体 | 局部相对缩放 |
| `rem` | 相对根字体 | 全局排版尺度 |
| `vw` / `vh` | 视口宽高比例 | 响应式尺寸 |
| `svh` / `lvh` / `dvh` | 视口高度新单位 | 移动端视口适配 |
| `fr` | Grid 轨道分配 | 网格布局 |

```css
.container {
  width: min(100%, 1200px);
  padding: 1rem;
}
```

# 三、角度、时间与比例

| 单位 | 说明 | 示例 |
| --- | --- | --- |
| `deg` | 角度 | `rotate(45deg)` |
| `rad` | 弧度 | `rotate(1rad)` |
| `s` / `ms` | 时间 | `transition: all 200ms ease` |
| `%` | 百分比 | `width: 50%` |

# 四、常见 CSS 函数

| 函数 | 作用 | 示例 |
| --- | --- | --- |
| `var()` | 读取变量 | `var(--color-text)` |
| `calc()` | 计算值 | `calc(100% - 32px)` |
| `min()` | 取最小值 | `min(100%, 1200px)` |
| `max()` | 取最大值 | `max(16px, 2vw)` |
| `clamp()` | 最小-弹性-最大 | `clamp(16px, 2vw, 24px)` |
| `rgb()` | RGB 颜色 | `rgb(37 99 235)` |
| `hsl()` | HSL 颜色 | `hsl(221 83% 53%)` |
| `linear-gradient()` | 线性渐变 | `linear-gradient(180deg, #fff, #eee)` |

# 五、变量系统

## 1. 定义变量

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111827;
  --space-4: 16px;
  --radius-md: 10px;
}
```

## 2. 使用变量

```css
.card {
  background: var(--color-bg);
  color: var(--color-text);
  padding: var(--space-4);
  border-radius: var(--radius-md);
}
```

## 3. 兜底值

```css
.title {
  color: var(--heading-color, #111827);
}
```

- 原理总结：CSS 变量是运行时变量，特别适合主题和设计 token。
- 注意点：变量名尽量用语义命名，而不是只写颜色本身。

# 六、响应式常用写法

## 1. `clamp()`

```css
.title {
  font-size: clamp(24px, 4vw, 40px);
}
```

## 2. `min()` 与 `max()`

```css
.container {
  width: min(100%, 1200px);
}

.subtitle {
  font-size: max(14px, 1.2vw);
}
```

# 七、颜色与主题实践

```css
:root {
  --surface: #ffffff;
  --surface-muted: #f8fafc;
  --text-primary: #111827;
  --brand: #2563eb;
}

[data-theme='dark'] {
  --surface: #0f172a;
  --surface-muted: #1e293b;
  --text-primary: #f8fafc;
}
```

- 原理总结：主题切换最稳的方式之一是切变量值，而不是全量重复写组件样式。
- 注意点：颜色体系最好从一开始就抽象成 token。
