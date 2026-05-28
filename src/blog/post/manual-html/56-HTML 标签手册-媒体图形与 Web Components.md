---
title: HTML 标签手册：媒体、图形与 Web Components
date: 2026/05/19
desc: 系统整理 HTML 中媒体、图形和组件化相关标签，包括 audio、video、picture、source、track、canvas、svg、template、slot 和自定义元素基础。
tags: ['#HTML手册', '#全部', '#HTML', '#手册']
cover: https://images.unsplash.com/photo-1516321165247-4aa89a48be28?q=80&w=2070&auto=format&fit=crop
---

[[toc]]

<img loading="lazy" decoding="async" data-nimg="fill" src="https://images.unsplash.com/photo-1516321165247-e288fb19713f?q=80&w=2070&auto=format&fit=crop" width=600 />

<small>分卷 8：聚焦图片、音视频、画布、SVG 和 Web Components 相关标签。</small>

# 一、图片与响应式资源

## 1. `img`

```html
<img
  src="/images/cover.webp"
  alt="封面图"
  width="640"
  height="360"
  loading="lazy"
  decoding="async"
/>
```

常用属性：

- `src`
- `alt`
- `width`
- `height`
- `loading`
- `decoding`

## 2. `picture` 和 `source`

```html
<picture>
  <source media="(max-width: 768px)" srcset="/images/mobile.webp" />
  <source type="image/webp" srcset="/images/cover.webp" />
  <img src="/images/cover.jpg" alt="横幅图片" />
</picture>
```

- 原理总结：`picture` 用于响应式图片和多格式回退。
- 注意点：`img` 仍然是最终回退元素，不能省略。

# 二、音频与视频

## 1. `audio`

```html
<audio controls preload="metadata" src="/audio/demo.mp3"></audio>
```

常用属性：

- `controls`
- `autoplay`
- `loop`
- `muted`
- `preload`

## 2. `video`

```html
<video controls preload="metadata" poster="/images/poster.webp" width="640">
  <source src="/video/demo.mp4" type="video/mp4" />
</video>
```

## 3. `track`

```html
<track kind="subtitles" srclang="zh" src="/subtitles.vtt" label="中文" />
```

- 作用：字幕、描述轨道等辅助信息。
- 注意点：视频站点或课程页面最好配 `track`。

# 三、嵌入与图形

## 1. `canvas`

```html
<canvas id="chart" width="300" height="150"></canvas>
```

```ts
/**
 * 在 canvas 上绘制一个矩形。
 */
function drawRect() {
  const canvas = document.getElementById('chart') as HTMLCanvasElement | null
  if (!canvas) return

  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.fillStyle = '#2563eb'
  ctx.fillRect(20, 20, 120, 60)
}
```

## 2. `svg`

```html
<svg viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="40" fill="#2563eb" />
</svg>
```

- `canvas`：适合像素级绘制和高频图形渲染。
- `svg`：适合矢量图、图标、路径和可缩放图形。

# 四、模板与插槽

## 1. `template`

```html
<template id="item-template">
  <li class="item"></li>
</template>
```

- 作用：保存不立即渲染的 DOM 模板。

## 2. `slot`

```html
<slot name="title"></slot>
```

- 作用：Web Components 的内容分发占位点。

# 五、自定义元素入门

```ts
/**
 * 定义一个最小自定义元素。
 */
class HelloCard extends HTMLElement {
  connectedCallback() {
    this.textContent = 'Hello Web Component'
  }
}

customElements.define('hello-card', HelloCard)
```

```html
<hello-card></hello-card>
```

- 原理总结：自定义元素让组件以原生标签的形式复用。
- 注意点：适合跨框架、跨项目封装，不一定适合所有业务页面。

# 六、常见注意点

- 图片必须写 `alt`。
- 视频尽量写 `poster` 和必要字幕。
- `canvas` 需要脚本配合绘制，不会自动展示内容。
- `picture` 与 `source` 更适合响应式图片，而不是普通单图场景全量替代。
